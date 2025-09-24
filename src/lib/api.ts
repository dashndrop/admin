// API Configuration
const API_BASE_URL = import.meta.env.DEV 
  ? '/api/v1'  // Use proxy in development
  : 'https://dashndrop.onrender.com/api/v1';  // Direct URL in production

// API Client
class ApiClient {
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
    
    const config: RequestInit = {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'client-id': 'admin', // Admin client type
        'Accept': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      mode: 'cors', // Explicitly set CORS mode
      credentials: 'omit', // Don't send cookies
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      // Handle empty responses
      const text = await response.text();
      if (!text) {
        return {} as T;
      }
      
      const data = JSON.parse(text);
      
      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}`;
        errorMessage = data.detail || data.message || errorMessage;
        throw new Error(errorMessage);
      }
      
      return data;
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Authentication
  async login(username: string, password: string) {
    try {
      const response = await this.request<{
        access_token: string;
        token_type: string;
        admin_id: string;
      }>('/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'password',
          username: username,
          password: password,
          scope: '',
          client_id: 'admin',
          client_secret: 'admin_secret'
        }).toString(),
      });

      console.log('Login response:', response);

      this.token = response.access_token;
      localStorage.setItem('admin_token', response.access_token);
      localStorage.setItem('admin_id', response.admin_id);
      
      return response;
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
    return this.request(`/admin/restaurant/${id}`);
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
}

// Create API instance
export const api = new ApiClient(API_BASE_URL);

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
