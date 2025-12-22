import { api } from './api';
import { formatCurrency } from "./utils";

// Generic API service functions
export const apiServices = {
  // Vendors
  async getVendors() {
    try {
      const restaurants = await api.getRestaurants() as any[];
      console.log('Fetched restaurants from API:', restaurants);

      // Transform API response to match our UI expectations
      return restaurants.map((restaurant: any) => {
        // Backend returns flags, not a direct status string.
        // Precedence: Suspended > Active (is_open) > Inactive
        const status: "Suspended" | "Active" | "Inactive" = restaurant?.is_suspended
          ? "Suspended"
          : restaurant?.is_open
            ? "Active"
            : "Inactive";

        return {
          id: restaurant.id,
          name: restaurant.name,
          description: restaurant.description,
          email: restaurant.email,
          phone: restaurant.phone_number,
          phone_number: restaurant.phone_number,
          status,
          category: restaurant.category || "Food & Beverages",
          locations: restaurant.locations || [],
          operating_hours: restaurant.operating_hours || [],
          cover_image_url: restaurant.cover_image_url,
          is_approved: restaurant.is_approved,
          is_open: restaurant.is_open,
          is_suspended: restaurant.is_suspended,
          created_at: restaurant.created_at,
          updated_at: restaurant.updated_at,
          rating: restaurant.average_rating || 0,
          total_reviews: restaurant.total_reviews || 0,
          revenue: "₦0",
          orders: 0
        };
      });
    } catch (error) {
      console.error('Failed to fetch restaurants:', error);
      // Fallback to mock data if API fails
      return [
        {
          id: "V-101",
          name: "Chicken Republic - Ikeja",
          category: "Food & Beverages",
          status: "Active",
          orders: 1250,
          revenue: "₦2,500,000",
          rating: 4.5,
          location: "Ikeja, Lagos"
        },
      ];
    }
  },

  async getVendor(id: string) {
    try {
      const restaurant = await api.getRestaurant(id) as any;
      console.log('Fetched restaurant details:', restaurant);

      // Transform single restaurant response
      const status: "Suspended" | "Active" | "Inactive" = restaurant?.is_suspended
        ? "Suspended"
        : restaurant?.is_open
          ? "Active"
          : "Inactive";

      const formatDocumentUrl = (url?: string) => {
        if (!url) return undefined;
        if (url.startsWith('http') || url.startsWith('data:')) return url;
        // Assume PNG for base64 strings starting with iVBOR
        if (url.startsWith('iVBOR')) return `data:image/png;base64,${url}`;
        // Default to generic base64 image if it looks like base64
        return `data:image/jpeg;base64,${url}`;
      };

      return {
        id: restaurant.id,
        name: restaurant.name,
        description: restaurant.description,
        email: restaurant.email,
        phone: restaurant.phone_number,
        phone_number: restaurant.phone_number,
        status,
        category: restaurant.category || "Food & Beverages",
        locations: restaurant.locations || [],
        operating_hours: restaurant.operating_hours || [],
        cover_image_url: formatDocumentUrl(restaurant.cover_image_url),
        is_approved: restaurant.is_approved,
        is_open: restaurant.is_open,
        is_suspended: restaurant.is_suspended,
        business_registration_number: restaurant.business_registration_number,
        tax_id: restaurant.tax_id,
        business_entity_type: restaurant.business_entity_type,
        business_registration_certificate: formatDocumentUrl(restaurant.business_registration_certificate),
        restaurant_owner_valid_id: formatDocumentUrl(restaurant.restaurant_owner_valid_id),
        proof_of_business_operation: formatDocumentUrl(restaurant.proof_of_business_operation),
        rating: restaurant.average_rating || 0,
        total_reviews: restaurant.total_reviews || 0,
        created_at: restaurant.created_at,
        updated_at: restaurant.updated_at
      };
    } catch (error) {
      console.error('Failed to fetch restaurant details:', error);
      // Fallback to mock data
      return {
        id,
        name: "Chicken Republic - Ikeja",
        category: "Food & Beverages",
        status: "Active",
        businessName: "Chicken Republic Nigeria Ltd",
        vendorId: "V-101",
        businessAddress: "123 Allen Avenue, Ikeja, Lagos",
        contactPerson: "John Doe",
        email: "john@chickenrepublic.com",
        phone: "+234 802 123 4567",
        registrationDate: "2023-01-15",
        lastActive: "2024-01-15",
        totalOrders: 1250,
        totalRevenue: "₦2,500,000",
        averageRating: 4.5,
        documents: ["Certificate & Licenses"]
      };
    }
  },

  // Restaurant Management Actions
  async approveRestaurant(restaurantId: string) {
    try {
      const response = await api.request(`/admin/restaurant/${restaurantId}/approve`, {
        method: 'POST'
      });
      return response;
    } catch (error) {
      console.error('Error approving restaurant:', error);
      throw error;
    }
  },

  async suspendRestaurant(restaurantId: string) {
    try {
      const response = await api.request(`/admin/restaurant/${restaurantId}/suspend`, {
        method: 'POST'
      });
      return response;
    } catch (error) {
      console.error('Error suspending restaurant:', error);
      throw error;
    }
  },

  async rejectRestaurant(restaurantId: string, reviewNotes: string = '') {
    try {
      const response = await api.request(`/admin/restaurant/${restaurantId}/reject`, {
        method: 'POST',
        body: JSON.stringify({ review_notes: reviewNotes })
      });
      return response;
    } catch (error) {
      console.error('Error rejecting restaurant:', error);
      throw error;
    }
  },

  async deleteRestaurant(restaurantId: string) {
    try {
      const result = await api.deleteRestaurant(restaurantId);
      console.log('Restaurant deleted:', result);
      return result;
    } catch (error) {
      console.error('Failed to delete restaurant:', error);
      throw error;
    }
  },

  // Users
  async getUsers(params?: { page?: number; per_page?: number; search?: string; }) {
    try {
      const response = await api.getUsers(params);
      const list = (response.users || []).map((user: any) => ({
        id: user._id ?? user.id,
        name: user.full_name ?? user.name ?? '-',
        email: user.email ?? '-',
        phone: user.phone_number ?? '-',
        status: user.is_active ? "Active" : "Inactive",
        orders: user.total_orders ?? 0,
        totalSpent: formatCurrency(user.total_spent ?? 0),
        registrationDate: user.created_at ?? '-',
        lastActive: user.updated_at ?? user.last_login ?? '-'
      }));
      return { list, total: response.total ?? list.length };
    } catch (error) {
      console.error('Failed to fetch users:', error);
      return { list: [], total: 0 };
    }
  },

  async getUser(id: string) {
    return {
      id,
      name: "Mariam Ajani",
      email: "mariam@mail.com",
      phone: "+234 802 123 4567",
      status: "Active",
      registrationDate: "2023-06-15",
      lastActive: "2024-01-15",
      totalOrders: 25,
      totalSpent: "₦150,000",
      averageOrderValue: "₦6,000",
      favoriteCategories: ["Food & Beverages", "Groceries"],
      addresses: [
        {
          type: "Home",
          address: "123 Lagos Street, Lagos",
          isDefault: true
        }
      ]
    };
  },

  // Riders
  async getRiders(params?: { page?: number; page_size?: number; search?: string; available?: boolean; status?: string; }) {
    try {
      const response: any = await api.getRiders(params);
      // If backend returns pagination structure, normalize list
      const rawList = Array.isArray(response) ? response : response.items || response.results || [];
      const list = rawList.map((rider: any) => ({
        id: rider._id ?? rider.id ?? rider.rider_id,
        name: rider.full_name ?? rider.name ?? '',
        email: rider.email ?? '',
        phone: rider.phone_number ?? rider.phone ?? '',
        status: rider.is_suspended ? 'Suspended' : 'Active',
        vehicleType: rider.vehicle_type ?? rider.vehicleType ?? '-',
        zone: rider.area_of_operation ?? rider.zone ?? rider.area ?? '-',
        totalDeliveries: rider.total_deliveries ?? rider.completed_orders ?? 0,
        rating: rider.rating ?? rider.customer_rating ?? 0,
        joinDate: rider.created_at ?? rider.join_date,
        last_login: rider.updated_at ?? rider.last_login,
      }));

      return {
        list,
        total: response?.total ?? (Array.isArray(response) ? response.length : list.length),
        page: response?.page ?? params?.page ?? 1,
        page_size: response?.page_size ?? params?.page_size ?? list.length
      };
    } catch (error) {
      console.error('Failed to fetch riders:', error);
      return { list: [], total: 0, page: params?.page ?? 1, page_size: params?.page_size ?? 10 };
    }
  },

  async getRider(id: string) {
    return {
      id,
      name: "Qudus Ajase",
      email: "qudus@mail.com",
      phone: "+234 701 987 6543",
      status: "Active",
      vehicleType: "Motorcycle",
      licenseNumber: "LIC-12345",
      zone: "Ikeja",
      joinDate: "2023-03-10",
      lastActive: "2024-01-15",
      totalDeliveries: 450,
      onTimeDeliveries: 420,
      averageDeliveryTime: "25 mins",
      cancellationRate: "2%",
      customerRating: 4.8,
      performance: {
        deliveries: 450,
        onTimeRate: "93%",
        avgTime: "25 mins",
        cancellationRate: "2%",
        rating: 4.8
      }
    };
  },

  // Orders
  async getOrders(params?: { page?: number; page_size?: number; search?: string; status?: string; rider_id?: string; }) {
    try {
      const response: any = await api.getOrders(params);
      const rawList = Array.isArray(response)
        ? response
        : response.orders || response.items || response.results || [];

      const list = rawList.map((order: any) => {
        const status: string = order.status ?? 'unknown';
        const statusColor = (
          status === 'delivered' || status === 'completed' ? 'green' :
            status === 'in_transit' || status === 'pending' || status === 'pending_payment' ? 'yellow' :
              status === 'cancelled' ? 'red' :
                status === 'refunded' ? 'orange' : 'gray'
        );
        return {
          id: order._id ?? order.id ?? order.order_id,
          dateTime: order.created_at ?? order.date_time,
          customer: order.user_id ?? order.customer_name ?? '-',
          vendor: order.restaurant_id ?? order.vendor_name ?? '-',
          rider: order.rider_id ?? order.rider_name ?? '-',
          amount: formatCurrency(order.total_price ?? order.amount ?? order.total_amount),
          status,
          statusColor
        };
      });

      const meta = {
        total: response?.total ?? (Array.isArray(response) ? response.length : list.length),
        page: response?.page ?? params?.page ?? 1,
        page_size: response?.limit ?? response?.page_size ?? params?.page_size ?? list.length
      };

      return { list, meta };
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      return { list: [], meta: { total: 0, page: params?.page ?? 1, page_size: params?.page_size ?? 10 } };
    }
  },

  async getOrder(id: string) {
    try {
      // Backend doesn't expose a dedicated endpoint yet. Build a minimal shape
      // by reading the paginated list and matching by both id and _id.
      const { list: orders } = await this.getOrders({ page: 1, page_size: 50 });
      const found = (orders as any[]).find((o: any) => (o.id ?? o._id ?? o.order_id) === id);
      if (found) return found;
      return { id } as any;
    } catch (error) {
      console.error('Failed to fetch order details:', error);
      return { id } as any;
    }
  },

  // Order Actions
  async assignOrderToRider(orderId: string, riderId: string) {
    try {
      return await api.assignRiderToOrder(orderId, riderId);
    } catch (error) {
      console.error('Failed to assign rider to order:', error);
      throw error;
    }
  },

  async completeOrder(orderId: string) {
    try {
      return await api.completeOrder(orderId);
    } catch (error) {
      console.error('Failed to complete order:', error);
      throw error;
    }
  },

  // Payments
  async getPayments() {
    return [
      {
        id: "PAY-101",
        vendor: "Chicken Republic",
        rider: "Qudus Ajase",
        amount: "₦50,000",
        status: "Pending",
        date: "2024-01-15",
        type: "vendor"
      },
      // Add more mock data
    ];
  },

  async getPayment(id: string) {
    // Current backend doesn't have a dedicated payment details endpoint
    // Returning formatted mock data for now
    return {
      id,
      type: "vendor",
      vendor: {
        name: "Chicken Republic - Omole",
        vendorId: "V-101",
        category: "Food & Beverages",
        businessAddress: "Omole phase 1, Ojodu Berger",
        contactPerson: "Adebayo Yusuf",
        email: "adebayousf@gmail.com",
        phone: "+234 908 005 0000",
        documents: ["Certificate & Licenses"]
      },
      walletBalance: formatCurrency(125000),
      threshold: formatCurrency(150000),
      payIns: [
        {
          date: "Aug 18, 2025",
          transactionId: "PTF-20021",
          customer: "Mariam Ajani",
          paymentMethod: "Bank Transfer",
          amount: formatCurrency(30000),
          status: "Successful"
        }
      ]
    };
  },
  async getDisputes(params?: { page?: number; page_size?: number }) {
    // Current backend doesn't have a dedicated disputes endpoint
    return {
      list: [
        {
          disputeId: "DISP-101",
          orderId: "ORD-884",
          user: "Mariam Ajani",
          vendor: "Chicken Republic",
          issue: "Missing Item",
          status: "Open",
          statusColor: "yellow"
        }
      ],
      total: 1
    };
  }
};
