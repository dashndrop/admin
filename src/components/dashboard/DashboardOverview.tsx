import { StatsCard } from "./StatsCard";

export function DashboardOverview() {
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
          value="5000"
          className="hover:shadow-md transition-shadow"
        />
        <StatsCard
          title="Pending Vendors"
          value="50"
          className="hover:shadow-md transition-shadow"
        />
        <StatsCard
          title="Suspended Vendors"
          value="50"
          className="hover:shadow-md transition-shadow"
        />
        <StatsCard
          title="Total Revenue"
          value="₦30.5M"
          className="hover:shadow-md transition-shadow"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="All Users"
          value="5000"
          className="hover:shadow-md transition-shadow"
        />
        <StatsCard
          title="Active Users"
          value="50"
          className="hover:shadow-md transition-shadow"
        />
        <StatsCard
          title="Suspended Users"
          value="50"
          className="hover:shadow-md transition-shadow"
        />
        <StatsCard
          title="Total Revenue"
          value="₦30.5M"
          className="hover:shadow-md transition-shadow"
        />
      </div>
    </div>
  );
}