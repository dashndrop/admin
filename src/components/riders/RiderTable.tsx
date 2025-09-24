import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, Filter, ArrowUpDown, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { apiServices } from "@/lib/api-services";

interface Rider {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "Active" | "Suspended";
  vehicleType: string;
}

export function RiderTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const { data: apiRiders = [], isLoading, isError } = useQuery({
    queryKey: ["riders", currentPage, searchTerm],
    queryFn: () => apiServices.getRiders({ page: currentPage, page_size: 10, search: searchTerm }),
    staleTime: 30_000
  });

  const riders: Rider[] = (apiRiders as any[]).map((r: any) => ({
    id: r.id,
    name: r.name ?? "",
    email: r.email ?? "",
    phone: r.phone ?? "",
    status: (r.status === "Suspended" ? "Suspended" : "Active") as Rider["status"],
    vehicleType: r.vehicleType ?? "-",
  }));

  const query = (searchTerm || "").toLowerCase();
  const filtered = riders.filter(r =>
    (r.name || "").toLowerCase().includes(query) ||
    (r.id || "").toLowerCase().includes(query) ||
    (r.email || "").toLowerCase().includes(query) ||
    (r.phone || "").toLowerCase().includes(query)
  );

  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const statusDot = (status: Rider["status"]) => {
    const color = status === "Active" ? "bg-green-500" : "bg-red-500";
    return <div className={`w-2 h-2 rounded-full ${color}`} />;
  };

  return (
    <div className="space-y-4">
      {isLoading && <div className="text-sm text-muted-foreground">Loading riders...</div>}
      {isError && <div className="text-sm text-red-600">Failed to load riders.</div>}
      <div className="flex items-center justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by User Name | Email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-80"
          />
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu open={filterOpen} onOpenChange={setFilterOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2" style={{border: "none"}}>
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <div className="p-2">
                <p className="text-sm font-medium mb-2">Filter</p>
                <div className="space-y-2 text-sm">
                  <div className="cursor-pointer hover:bg-accent p-1 rounded">All</div>
                  <div className="cursor-pointer hover:bg-accent p-1 rounded">Active</div>
                  <div className="cursor-pointer hover:bg-accent p-1 rounded">Suspended</div>
                  <div className="cursor-pointer hover:bg-accent p-1 rounded">Pending</div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4" />
            Sort
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-12">
              <Checkbox className="h-4 w-4" />
            </TableHead>
            <TableHead>Rider Name</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Vehicle Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pageItems.map((rider) => (
            <TableRow key={rider.id} className="hover:bg-muted/50">
              <TableCell>
                <Checkbox className="h-4 w-4" />
              </TableCell>
              <TableCell>{rider.name}</TableCell>
              <TableCell>{rider.phone || '-'}</TableCell>
              <TableCell>{rider.email || '-'}</TableCell>
              <TableCell>{rider.vehicleType || '-'}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {statusDot(rider.status)}
                  <span>{rider.status}</span>
                </div>
              </TableCell>
              <TableCell>
                <Button variant="ghost" className="flex items-center gap-1 text-black hover:text-black/70 p-0 h-auto" onClick={() => navigate(`/riders/${rider.id}`)}>
                  View
                  <ChevronRight className="h-3 w-3" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
}


