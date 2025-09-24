import { useState, useEffect } from "react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { VendorTable } from "@/components/vendors/VendorTable";
import { apiServices } from "@/lib/api-services";
import { Store } from "lucide-react";

export default function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    allVendors: 0,
    pendingVendors: 0,
    suspendedVendors: 0,
    totalRevenue: "₦0"
  });

  const fetchVendors = async () => {
    try {
      setLoading(true);
      const vendorData = await apiServices.getVendors();
      console.log('Vendor data loaded:', vendorData);
      setVendors(vendorData);
      
      // Calculate stats from vendor data
      const activeVendors = vendorData.filter((v: any) => v.status === "Active").length;
      const inactiveVendors = vendorData.filter((v: any) => v.status === "Inactive").length;
      const totalLocations = vendorData.reduce((sum: number, v: any) => sum + (v.locations?.length || 0), 0);

      setStats({
        allVendors: vendorData.length,
        pendingVendors: 0, // No pending status in current API
        suspendedVendors: inactiveVendors,
        totalRevenue: `${totalLocations} Locations` // Show total locations instead of revenue
      });
    } catch (error) {
      console.error('Failed to fetch vendors:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-[#F28C28] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading vendors...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-900 rounded-md flex items-center justify-center">
              <Store className="h-4 w-4 text-white" />
            </div>
            Vendor Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage and monitor all restaurant vendors on the platform
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="All Vendors"
          value={stats.allVendors.toString()}
        />
        <StatsCard
          title="Active Vendors"
          value={(stats.allVendors - stats.suspendedVendors).toString()}
        />
        <StatsCard
          title="Suspended vendors"
          value={stats.suspendedVendors.toString()}
        />
        <StatsCard
          title="Total Locations"
          value={stats.totalRevenue}
        />
      </div>

      <VendorTable vendors={vendors} onRefresh={fetchVendors} />
    </div>
  );
}