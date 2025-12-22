import { useQuery } from "@tanstack/react-query";
import { apiServices } from "@/lib/api-services";
import { formatCurrency } from "@/lib/utils";
import { StatsCard } from "./StatsCard";

export function DashboardOverview() {
  const { data: vendors } = useQuery({
    queryKey: ["vendors-all"],
    queryFn: () => apiServices.getVendors(),
  });

  const { data: ordersResp } = useQuery({
    queryKey: ["orders-all-stats"],
    queryFn: () => apiServices.getOrders({ page: 1, page_size: 1000 }),
  });

  const { data: usersData } = useQuery({
    queryKey: ["users-all"],
    queryFn: () => apiServices.getUsers({ page: 1, per_page: 1 }),
  }) as { data: { list: any[], total: number } | undefined };

  const totalRevenue = (ordersResp?.list || []).reduce((acc: number, order: any) => {
    const val = typeof order.amount === 'string'
      ? parseFloat(order.amount.replace(/[^0-9.-]+/g, "")) || 0
      : order.amount;
    return acc + val;
  }, 0);

  const pendingVendors = (vendors || []).filter((v: any) => v.status === 'Inactive' || !v.is_approved).length;
  const suspendedVendors = (vendors || []).filter((v: any) => v.status === 'Suspended').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of your platform's performance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="All Vendors"
          value={(vendors || []).length.toString()}
          className="hover:shadow-md transition-shadow"
        />
        <StatsCard
          title="Pending Vendors"
          value={pendingVendors.toString()}
          className="hover:shadow-md transition-shadow"
        />
        <StatsCard
          title="Suspended Vendors"
          value={suspendedVendors.toString()}
          className="hover:shadow-md transition-shadow"
        />
        <StatsCard
          title="Total Order Value"
          value={formatCurrency(totalRevenue)}
          className="hover:shadow-md transition-shadow"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="All Users"
          value={usersData?.total?.toString() || "0"}
          className="hover:shadow-md transition-shadow"
        />
        <StatsCard
          title="Recent Orders"
          value={(ordersResp?.meta?.total || 0).toString()}
          className="hover:shadow-md transition-shadow"
        />
        <StatsCard
          title="Delivered Orders"
          value={(ordersResp?.list || []).filter((o: any) => o.status === 'delivered' || o.status === 'completed').length.toString()}
          className="hover:shadow-md transition-shadow"
        />
        <StatsCard
          title="Average Order Value"
          value={formatCurrency((ordersResp?.meta?.total || 0) > 0 ? totalRevenue / (ordersResp?.meta?.total || 1) : 0)}
          className="hover:shadow-md transition-shadow"
        />
      </div>
    </div>
  );
}