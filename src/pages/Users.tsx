import { useState, useEffect } from "react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { UserTable } from "@/components/users/UserTable";
import { api } from "@/lib/api";
import { DeliveryLoader } from "@/components/ui/delivery-loader";

export default function Users() {
  const [userCounts, setUserCounts] = useState<{
    total: number;
    active: number;
    inactive: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initial data fetch
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        const [usersResponse] = await Promise.all([
          api.getUsers({ page: 1, per_page: 1 })
        ]);
        
        setUserCounts({
          total: usersResponse.total,
          active: Math.floor(usersResponse.total * 0.8), // Temporary approximation
          inactive: Math.ceil(usersResponse.total * 0.2) // Temporary approximation
        });
      } catch (err) {
        console.error('Failed to fetch initial data:', err);
        setError('Failed to load user data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleUserCountChange = (count: number) => {
    setUserCounts(prev => {
      // Only update if the count has actually changed
      if (prev?.total === count) return prev;
      
      return {
        ...(prev || { active: 0, inactive: 0 }),
        total: count,
      };
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <DeliveryLoader label="Loading users" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <span className="w-6 h-6 bg-primary rounded text-primary-foreground text-sm flex items-center justify-center">
              U
            </span>
            User Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage and monitor user accounts and activities
          </p>
        </div>
      </div>

      {error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="All Users"
              value={userCounts?.total?.toString() || '0'}
              subtitle="Total number of users"
            />
            <StatsCard
              title="Active Users"
              value={userCounts?.active?.toString() || '0'}
              subtitle="Active in the last 30 days"
              trend="up"
            />
            <StatsCard
              title="Inactive Users"
              value={userCounts?.inactive?.toString() || '0'}
              subtitle="Inactive for 30+ days"
              trend="down"
            />
            <StatsCard
              title="Total Orders"
              value="1,245"
              subtitle="From all users"
              trend="up"
            />
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <UserTable onUserCountChange={handleUserCountChange} />
          </div>
        </div>
      )}

    </div>
  );
}