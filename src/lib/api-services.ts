import { api } from './api';

// Restaurant/Vendor API service functions
export const apiServices = {
  // Restaurants (Vendors)
  async getRestaurants() {
    try {
      const response = await api.request('/restaurants/all');
      console.log('API Response:', response);
      
      // Map API data to UI format - ONLY use fields that exist in API response
      const restaurants = (response.restaurants || response || []).map((restaurant: any) => ({
        id: restaurant.id,
        name: restaurant.name,
        description: restaurant.description,
        email: restaurant.email,
        phone: restaurant.phone_number,
        isOpen: restaurant.is_open,
        coverImage: restaurant.cover_image_url,
        locations: restaurant.locations,
        operatingHours: restaurant.operating_hours
      }));
      
      console.log('Mapped restaurants:', restaurants);
      return restaurants;
    } catch (error) {
      console.error('Failed to fetch restaurants:', error);
      // Return empty array if API fails
      return [];
    }
  },

  async getRestaurant(id: string) {
    try {
      const response = await api.request(`/restaurants/profile?restaurant_id=${id}`);
      return response;
    } catch (error) {
      console.error('Failed to fetch restaurant:', error);
      // Return mock data as fallback
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

  async getRestaurantMenu(restaurantId: string) {
    try {
      const response = await api.request(`/restaurants/${restaurantId}/menu`);
      return response.menu_items || [];
    } catch (error) {
      console.error('Failed to fetch restaurant menu:', error);
      return [];
    }
  },

  async createRestaurant(data: any) {
    try {
      const response = await api.request('/restaurants/new', {
        method: 'POST',
        body: JSON.stringify(data)
      });
      return response;
    } catch (error) {
      console.error('Failed to create restaurant:', error);
      throw error;
    }
  },

  async updateRestaurant(restaurantId: string, data: any) {
    try {
      const response = await api.request(`/restaurants/${restaurantId}/profile`, {
        method: 'PATCH',
        body: JSON.stringify(data)
      });
      return response;
    } catch (error) {
      console.error('Failed to update restaurant:', error);
      throw error;
    }
  },

  async deleteRestaurant(restaurantId: string) {
    try {
      const response = await api.request(`/restaurants/${restaurantId}/profile`, {
        method: 'DELETE'
      });
      return response;
    } catch (error) {
      console.error('Failed to delete restaurant:', error);
      throw error;
    }
  },

  // Menu Management
  async createMenuItem(restaurantId: string, data: any) {
    try {
      const response = await api.request(`/restaurants/${restaurantId}/menu`, {
        method: 'POST',
        body: JSON.stringify(data)
      });
      return response;
    } catch (error) {
      console.error('Failed to create menu item:', error);
      throw error;
    }
  },

  async updateMenuItem(itemId: string, data: any) {
    try {
      const response = await api.request(`/restaurants/menu/${itemId}`, {
        method: 'PATCH',
        body: JSON.stringify(data)
      });
      return response;
    } catch (error) {
      console.error('Failed to update menu item:', error);
      throw error;
    }
  },

  async deleteMenuItem(itemId: string) {
    try {
      const response = await api.request(`/restaurants/menu/${itemId}`, {
        method: 'DELETE'
      });
      return response;
    } catch (error) {
      console.error('Failed to delete menu item:', error);
      throw error;
    }
  },

  // Search & Filter
  async searchRestaurantsByCategory(category: string) {
    try {
      const response = await api.request(`/restaurants/search/by-categories?category=${category}`);
      return response.restaurants || [];
    } catch (error) {
      console.error('Failed to search restaurants by category:', error);
      return [];
    }
  },

  // Users
  async getUsers() {
    return [
      {
        id: "U-120",
        name: "Mariam Ajani",
        email: "mariam@mail.com",
        phone: "+234 802 123 4567",
        status: "Active",
        orders: 25,
        totalSpent: "₦150,000",
        registrationDate: "2023-06-15",
        lastActive: "2024-01-15"
      },
      // Add more mock data
    ];
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
  async getRiders() {
    return [
      {
        id: "RID-101",
        name: "Qudus Ajase",
        email: "qudus@mail.com",
        phone: "+234 701 987 6543",
        status: "Active",
        vehicleType: "Motorcycle",
        zone: "Ikeja",
        totalDeliveries: 450,
        rating: 4.8,
        joinDate: "2023-03-10"
      },
      // Add more mock data
    ];
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
  async getOrders() {
    return [
      {
        id: "DDRD-101",
        dateTime: "30/06/2025 08:55PM",
        customer: "Mariam Ajani",
        vendor: "Chicken Republic - Ikeja",
        rider: "Qudus Ajase",
        amount: "₦30,000.00",
        status: "Delivered",
        statusColor: "green"
      },
      // Add more mock data
    ];
  },

  async getOrder(id: string) {
    return {
      id,
      status: "In Transit",
      pickupTime: "09:30",
      estimatedDropOff: "09:50",
      timeRemaining: "00:10",
      overtime: "00:00",
      customer: {
        name: "Mariam Ajani",
        userId: "U-120",
        email: "mariam@mail.com",
        phone: "+234 802 123 4567",
        location: "123, Lagos Street, Lagos"
      },
      vendor: {
        name: "Chicken Republic - Ikeja",
        vendorId: "V-101",
        category: "Food & Beverages",
        phone: "+234 802 765 4321",
        location: "456, Ikeja Road, Lagos"
      },
      rider: {
        name: "Qudus Ajase",
        riderId: "RID-101",
        email: "qudus@mail.com",
        phone: "+234 701 987 6543",
        status: "Active"
      },
      items: [
        { sn: 1, item: "Jollof rice combo", quantity: "2x", unitPrice: "₦5,000.00", amount: "₦10,000.00" },
        { sn: 2, item: "Fried rice combo", quantity: "1x", unitPrice: "₦5,000.00", amount: "₦5,000.00" },
        { sn: 3, item: "Chicken", quantity: "3x", unitPrice: "₦2,000.00", amount: "₦6,000.00" },
        { sn: 4, item: "Malt", quantity: "2x", unitPrice: "₦500.00", amount: "₦1,000.00" },
        { sn: 5, item: "Pack", quantity: "1x", unitPrice: "₦1,000.00", amount: "₦1,000.00" },
      ],
      subtotal: "₦23,000.00",
      vat: "₦1,000.00",
      total: "₦24,000.00",
      payment: {
        amount: "₦24,000.00",
        method: "Card",
        transactionId: "TRX-987654",
        status: "Completed",
        date: "2024-01-15"
      }
    };
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
    return {
      id,
      type: "vendor", // or "rider"
      vendor: {
        name: "Chicken Republic - Omole",
        vendorId: "V-101",
        category: "Food & Beverages",
        businessAddress: "123 Allen Avenue, Ikeja, Lagos",
        contactPerson: "John Doe",
        email: "john@chickenrepublic.com",
        phone: "+234 802 123 4567",
        documents: ["Certificate & Licenses"]
      },
      walletBalance: "₦125,000.00",
      payIns: [
        {
          date: "2024-01-15",
          transactionId: "TRX-123456",
          customer: "Mariam Ajani",
          paymentMethod: "Card",
          amount: "₦15,000.00",
          status: "Successful"
        }
      ]
    };
  }
};
