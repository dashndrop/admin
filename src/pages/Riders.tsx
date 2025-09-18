import { StatsCard } from "@/components/dashboard/StatsCard";
import { RiderTable } from "@/components/riders/RiderTable";
import ridersIcon from "/img/riders.png";

export default function Riders() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <img src={ridersIcon} alt="Riders" className="w-15 h-15 rounded" />
            Riders Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="All riders" value="500" />
        <StatsCard title="Active Riders" value="250" />
        <StatsCard title="Suspended Riders" value="50" />
        <StatsCard title="Pending Verification" value="200" />
      </div>

      <RiderTable />
    </div>
  );
}


