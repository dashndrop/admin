import { StatsCard } from "@/components/dashboard/StatsCard";
import { RiderTable } from "@/components/riders/RiderTable";
import { useQuery } from "@tanstack/react-query";
import { apiServices } from "@/lib/api-services";
import ridersIcon from "/img/riders.png";

export default function Riders() {
  const { data: allRiders } = useQuery({
    queryKey: ["riders-count-all"],
    queryFn: () => apiServices.getRiders({ page: 1, page_size: 1 }),
  });

  const { data: activeRiders } = useQuery({
    queryKey: ["riders-count-active"],
    queryFn: () => apiServices.getRiders({ page: 1, page_size: 1, status: "Active" }),
  });

  const { data: suspendedRiders } = useQuery({
    queryKey: ["riders-count-suspended"],
    queryFn: () => apiServices.getRiders({ page: 1, page_size: 1, status: "Suspended" }),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <img src={ridersIcon} alt="Riders" className="w-15 h-15 rounded" />
            Riders Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage and monitor all delivery riders on the platform
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="All riders" value={allRiders?.total?.toString() || "0"} />
        <StatsCard title="Active Riders" value={activeRiders?.total?.toString() || "0"} />
        <StatsCard title="Suspended Riders" value={suspendedRiders?.total?.toString() || "0"} />
        <StatsCard title="Pending Verification" value="0" />
      </div>

      <RiderTable />
    </div>
  );
}


