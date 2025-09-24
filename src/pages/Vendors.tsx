import { useState, useEffect } from "react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { VendorTable } from "@/components/vendors/VendorTable";
import { apiServices } from "@/lib/api-services";
import vendorsIcon from "/img/vendors.png";

export default function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    allVendors: 0,
    pendingVendors: 0,
    suspendedVendors: 0,
    totalRevenue: "₦0"
  });

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        setLoading(true);
        const vendorData = await apiServices.getVendors();
        console.log('Vendor data loaded:', vendorData);
        setVendors(vendorData);
        
        // Calculate stats from vendor data
        const activeVendors = vendorData.filter((v: any) => v.status === "Active").length;
        const suspendedVendors = vendorData.filter((v: any) => v.status === "Inactive").length;
        const totalRevenue = vendorData.reduce((sum: number, v: any) => {
          const revenue = typeof v.revenue === 'string' ? 
            parseFloat(v.revenue.replace(/[₦,]/g, '')) : v.revenue;
          return sum + (revenue || 0);
        }, 0);

        setStats({
          allVendors: vendorData.length,
          pendingVendors: 0, // We might need a separate API for pending
          suspendedVendors: suspendedVendors,
          totalRevenue: `₦${totalRevenue.toLocaleString()}`
        });
      } catch (error) {
        console.error('Failed to fetch vendors:', error);
      } finally {
        setLoading(false);
      }
    };

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
            <img src={vendorsIcon} alt="Vendors" className="w-6 h-6" />
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
          title="Total Revenue"
          value={stats.totalRevenue}
        />
      </div>

      <VendorTable vendors={vendors} />
    </div>
  );
}