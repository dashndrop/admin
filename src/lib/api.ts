// API Configuration
const API_BASE_URL = '/api/v1';

const ITEMS_PER_PAGE = 10;

// API Client
export class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('admin_token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    // Don't include token for login and token refresh endpoints
    const isAuthEndpoint = ['/admin/login', '/users/refresh-token'].some(path => endpoint.startsWith(path));
    
    const config: RequestInit = {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'client-id': 'admin', // Admin client type
        'Accept': 'application/json',
        ...(!isAuthEndpoint && this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      mode: 'cors', // Explicitly set CORS mode
      credentials: 'omit', // Don't send cookies
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      // Handle 401 Unauthorized - token is invalid or expired
      if (response.status === 401) {
        this.logout();
        // Only redirect if we're not already on the login page
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
        throw new Error('Your session has expired. Please log in again.');
      }
      
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        let errorMessage = 'An error occurred';
        const detail = (data as any)?.detail;
        
        if (Array.isArray(detail)) {
          errorMessage = detail.map((d: any) => d?.msg || d?.message || JSON.stringify(d)).join("; ");
        } else if (typeof detail === 'object' && detail !== null) {
          errorMessage = (detail.msg || detail.message || JSON.stringify(detail));
        } else if ((data as any)?.message) {
          errorMessage = (data as any).message;
        } else if ((data as any)?.error) {
          errorMessage = (data as any).error;
        }
        throw new Error(errorMessage);
      }
      
      const data = await response.json().catch(() => ({}));
      return data as T;
    } catch (error) {
      console.error('API Request failed:', error);
      // Only redirect for 401 errors that weren't already handled
      if (error.message.includes('401') && !window.location.pathname.includes('/login')) {
        this.logout();
        window.location.href = '/login';
      }
      throw error;
    }
  }

  // Authentication
  async login(username: string, password: string) {
    try {
      // Create form data for x-www-form-urlencoded
      const formData = new URLSearchParams();
      formData.append('grant_type', 'password');
      formData.append('username', username);
      formData.append('password', password);
      formData.append('scope', '');
      formData.append('client_id', 'admin');
      formData.append('client_secret', 'admin_secret');

      // Make the login request with form-urlencoded content type
      const response = await fetch(`${this.baseURL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        },
        body: formData.toString(),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Login failed');
      }

      const data = await response.json();
      
      // Store tokens
      this.token = data.access_token;
      localStorage.setItem('admin_token', data.access_token);
      localStorage.setItem('admin_id', data.admin_id);
      
      console.log('Login successful for user:', username);
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async refreshToken() {
    const refreshToken = localStorage.getItem('admin_refresh_token');
    if (!refreshToken) throw new Error('No refresh token');

    const response = await this.request<{
      token: string;
      refresh_token: string;
    }>('/users/refresh-token', {
      method: 'POST',
      body: JSON.stringify({
        refresh_token: refreshToken,
      }),
    });

    this.token = response.token;
    localStorage.setItem('admin_token', response.token);
    localStorage.setItem('admin_refresh_token', response.refresh_token);
    
    return response;
  }

  // Admin Profile Management
  async getAdminProfile() {
    // For now, return a mock profile since the endpoint might not exist
    const adminId = localStorage.getItem('admin_id');
    return {
      id: adminId || 'unknown',
      name: 'Admin User',
      email: 'admin@dashndrop.com',
      phone_number: '+234 802 123 4567',
      role: 'admin',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  }

  async updateAdminProfile(data: any) {
    return this.request('/users/profile', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  // Logout
  logout() {
    this.token = null;
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_refresh_token');
    localStorage.removeItem('admin_id');
  }

  // Check if authenticated
  isAuthenticated(): boolean {
    return !!this.token;
  }

  // Admin Endpoints
  async getRestaurants() {
    return this.request('/admin/restaurants');
  }

  async getRestaurant(id: string) {
    // Backend details endpoint per docs: /api/v1/admin/restaurant/{restaurant_id}/details
    return this.request(`/admin/restaurant/${id}/details`);
  }

  // Restaurant Management Actions
  async approveRestaurant(restaurantId: string) {
    return this.request(`/admin/restaurant/${restaurantId}/approve`, {
      method: 'POST'
    });
  }

  async suspendRestaurant(restaurantId: string) {
    return this.request(`/admin/restaurant/${restaurantId}/suspend`, {
      method: 'POST'
    });
  }

  async deleteRestaurant(restaurantId: string) {
    return this.request(`/admin/restaurant/${restaurantId}`, {
      method: 'DELETE'
    });
  }

  // Riders
  async getRiders(params?: {
    page?: number;
    page_size?: number;
    search?: string;
    available?: boolean;
    status?: string;
  }) {
    const query = params
      ? `?${new URLSearchParams(
          Object.entries(params)
            .filter(([, v]) => v !== undefined && v !== null && v !== '')
            .reduce((acc, [k, v]) => {
              acc[k] = String(v);
              return acc;
            }, {} as Record<string, string>)
        ).toString()}`
      : '';
    return this.request(`/admin/riders${query}`);
  }

  // Orders
  async getOrders(params?: {
    page?: number;
    page_size?: number;
    search?: string;
    status?: string;
    rider_id?: string;
  }) {
    const query = params
      ? `?${new URLSearchParams(
          Object.entries(params)
            .filter(([, v]) => v !== undefined && v !== null && v !== '')
            .reduce((acc, [k, v]) => {
              acc[k] = String(v);
              return acc;
            }, {} as Record<string, string>)
        ).toString()}`
      : '';
    return this.request(`/admin/orders${query}`);
  }

  async assignRiderToOrder(orderId: string, riderId: string) {
    return this.request(`/admin/order/${orderId}/assign-rider`, {
      method: 'POST',
      body: JSON.stringify({ rider_id: riderId })
    });
  }

  async completeOrder(orderId: string) {
    return this.request(`/admin/order/${orderId}/complete`, {
      method: 'POST'
    });
  }

  // Notifications
  async getNotifications(params?: {
    page?: number;
    page_size?: number;
    unread_only?: boolean;
    type?: string;
  }) {
    const query = params
      ? `?${new URLSearchParams(
          Object.entries(params)
            .filter(([_, v]) => v !== undefined && v !== null && v !== '')
            .map(([k, v]) => [k, String(v)])
            .reduce((acc, [k, v]) => ({
              ...acc,
              [k]: v
            }), {} as Record<string, string>)
        ).toString()}`
      : '';
    return this.request<{
      items: Notification[];
      total: number;
      page: number;
      page_size: number;
      total_pages: number;
    }>(`/admin/notifications${query}`);
  }

  async markNotificationAsRead(notificationId: string) {
    return this.request(`/admin/notifications/${notificationId}/read`, {
      method: 'PATCH',
    });
  }

  async markAllNotificationsAsRead() {
    return this.request('/admin/notifications/mark-all-read', {
      method: 'PATCH',
    });
  }

  // Waitlist Management
  async getWaitlist(params?: WaitlistFilterParams): Promise<WaitlistResponse> {
    const query = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          query.append(key, String(value));
        }
      });
    }
    
    return this.request<WaitlistResponse>(`/admin/waitlist?${query.toString()}`);
  }

  async getWaitlistStats(): Promise<WaitlistStats> {
    return this.request<WaitlistStats>('/admin/waitlist/stats');
  }

  async updateWaitlistStatus(id: string, status: 'approved' | 'rejected' | 'pending'): Promise<void> {
    return this.request(`/admin/waitlist/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
  }

  async addToWaitlist(entry: Omit<WaitlistEntry, '_id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<WaitlistEntry> {
    return this.request<WaitlistEntry>('/admin/waitlist', {
      method: 'POST',
      body: JSON.stringify(entry)
    });
  }

  async removeFromWaitlist(id: string): Promise<void> {
    return this.request(`/admin/waitlist/${id}`, {
      method: 'DELETE'
    });
  }

  // User Management
  async getUsers(params?: UserFilterParams) {
    try {
      const queryParams = new URLSearchParams();
      
      // Add only defined parameters to the query
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            queryParams.append(key, String(value));
          }
        });
      }
      
      const url = `/admin/users${queryParams.toString() ? `?${queryParams}` : ''}`;
      console.log('Fetching users from:', url);
      
      const response = await fetch(`${this.baseURL}${url}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(this.token && { 'Authorization': `Bearer ${this.token}` }),
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to fetch users');
      }

      const data = await response.json();
      console.log('Users API response:', data);
      
      // Transform the response to match the expected structure
      return {
        users: Array.isArray(data) ? data : [],
        total: data.total || (Array.isArray(data) ? data.length : 0),
        page: data.page || 1,
        per_page: data.per_page || ITEMS_PER_PAGE,
        total_pages: data.total_pages || 1,
      };
    } catch (error) {
      console.error('Error in getUsers:', error);
      throw error;
    }
  }

  async getUser(userId: string) {
    return this.request<User>(`/admin/users/${userId}`);
  }

  async updateUser(userId: string, data: Partial<User>) {
    return this.request<User>(`/admin/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteUser(userId: string) {
    return this.request(`/admin/users/${userId}`, {
      method: 'DELETE',
    });
  }

  async toggleUserStatus(userId: string, isActive: boolean) {
    return this.request<User>(`/admin/users/${userId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ is_active: isActive }),
    });
  }
}

// Create API instance
export const api = new ApiClient(API_BASE_URL);

// User Management Types
export interface User {
  _id: string;
  full_name: string;
  email: string;
  phone_number: string;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
  last_login?: string;
  profile_picture?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postal_code?: string;
  };
  preferences?: {
    notifications_enabled: boolean;
    language: string;
    theme: 'light' | 'dark' | 'system';
  };
  [key: string]: any;
}

export interface UsersResponse {
  users: User[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export interface UserFilterParams {
  page?: number;
  per_page?: number;
  search?: string;
  is_active?: boolean;
  is_verified?: boolean;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
  [key: string]: any;
}

// Waitlist Types
export interface WaitlistEntry {
  id: string;
  email: string;
  created_at: string;
  status?: 'pending' | 'approved' | 'rejected';
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  updated_at?: string;
}

export interface WaitlistResponse {
  entries: WaitlistEntry[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export interface WaitlistStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

export type WaitlistFilterParams = {
  page?: number;
  per_page?: number;
  search?: string;
  status?: 'pending' | 'approved' | 'rejected';
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
};

// API Types
export interface LoginRequest {
  grant_type: string;
  username: string;
  password: string;
  scope: string;
  client_id: string;
  client_secret: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  admin_id: string;
}

export interface VerificationRequest {
  phone_number: string;
}

export interface AdminProfile {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  is_read: boolean;
  created_at: string;
  read_at: string | null;
  metadata?: Record<string, any>;
  action_url?: string;
}
