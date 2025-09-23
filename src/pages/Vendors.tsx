import { useState, useEffect } from "react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { VendorTable } from "@/components/vendors/VendorTable";
import { apiServices } from "@/lib/api-services";

export default function Vendors() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    suspended: 0,
    revenue: "₦0"
  });

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const data = await apiServices.getRestaurants();
        setRestaurants(data);
        
        // Calculate stats from the data - only use real API fields
        console.log('Calculating stats for:', data);
        setStats({
          total: data.length,
          pending: 0, // API doesn't have pending status
          suspended: data.filter((r: any) => !r.isOpen).length, // Use isOpen field
          revenue: "₦0.00" // API doesn't have revenue data
        });
      } catch (error) {
        console.error('Failed to fetch restaurants:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <span className="w-6 h-6 bg-primary rounded text-primary-foreground text-sm flex items-center justify-center">
              V
            </span>
            Restaurant Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage restaurants (vendors) and their profiles
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="All Restaurants"
          value={stats.total.toString()}
          loading={loading}
        />
        <StatsCard
          title="Pending Restaurants"
          value={stats.pending.toString()}
          loading={loading}
        />
        <StatsCard
          title="Suspended Restaurants"
          value={stats.suspended.toString()}
          loading={loading}
        />
        <StatsCard
          title="Total Revenue"
          value={stats.revenue}
          loading={loading}
        />
      </div>

      <VendorTable restaurants={restaurants} loading={loading} />
    </div>
  );
}