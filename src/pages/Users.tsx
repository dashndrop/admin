import { StatsCard } from "@/components/dashboard/StatsCard";
import { UserTable } from "@/components/users/UserTable";

export default function Users() {
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="All Users"
          value="5000"
        />
        <StatsCard
          title="Active Users"
          value="50"
        />
        <StatsCard
          title="Suspended users"
          value="50"
        />
        <StatsCard
          title="Total Revenue"
          value="₦30.5M"
        />
      </div>

      <UserTable />
    </div>
  );
}