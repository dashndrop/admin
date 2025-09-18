import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import supportIcon from "/img/supportTv.png"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Search, 
  Filter, 
  SortAsc, 
  ChevronRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { Checkbox } from "@/components/ui/checkbox";

const Support = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<"User" | "Vendor" | "Rider">("User");
  const navigate = useNavigate();

  const ticketsData = [
    {
      id: "TKT-001",
      ticketId: "TCK-1043",
      date: "Aug 19",
      user: "Mariam Ajani",
      issue: "Missing item in order ORD-887",
      priority: "High",
      status: "In Progress",
      assignedTo: "Admin Mary",
    },
    {
      id: "TKT-002",
      ticketId: "TCK-1043",
      date: "Aug 19",
      user: "Mariam Ajani",
      issue: "Missing item in order ORD-887",
      priority: "Medium", 
      status: "Open",
      assignedTo: "unassigned",
    },
    {
      id: "TKT-003",
      ticketId: "TCK-1043",
      date: "Aug 19",
      user: "Mariam Ajani",
      issue: "Missing item in order ORD-887",
      priority: "High",
      status: "Resolved",
      assignedTo: "Admin John",
    },
  ];

  const rows = useMemo(() => {
    const base = ticketsData;
    const copies = Array.from({ length: 12 }, (_, i) => ({ ...base[i % base.length], id: `${base[i % base.length].id}-${i}` }));
    return copies;
  }, [ticketsData]);

  const Priority = ({ value }: { value: string }) => {
    const color = value === "High" ? "bg-red-500" : value === "Medium" ? "bg-orange-400" : "bg-yellow-400";
    return (
      <div className="flex items-center gap-2">
        <span className={`w-3 h-3 rounded-full ${color}`} />
        <span>{value}</span>
      </div>
    );
  };

  const Status = ({ value }: { value: string }) => {
    const color = value === "In Progress" ? "bg-yellow-400" : value === "Open" ? "bg-green-500" : value === "Closed" ? "bg-red-500" : "bg-gray-400";
    return (
      <div className="flex items-center gap-2">
        <span className={`w-3 h-3 rounded-full ${color}`} />
        <span>{value}</span>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <img src={supportIcon} alt="Riders" className="w-15 h-15 rounded" />
            Riders Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: "All Tickets", value: "500" },
          { title: "Resolved", value: "300" },
          { title: "In-Progress", value: "50" },
          { title: "Closed", value: "150" },
        ].map((m) => (
          <Card key={m.title}>
            <CardContent className="py-6">
              <p className="text-sm text-muted-foreground">{m.title}</p>
              <p className="text-3xl font-bold">{m.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs + Search + Actions */}
      <div className="flex items-center gap-4">
        <div className="flex border rounded-md p-1">
          {(["User","Vendor","Rider"] as const).map((t) => (
            <Button
              key={t}
              variant={activeTab === t ? "default" : "ghost"}
              className={`${activeTab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground"} h-8 px-3`}
              onClick={() => setActiveTab(t)}
            >
              {t}
            </Button>
          ))}
        </div>

        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Ticket ID / User Email / Order ID" className="pl-10" />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2"  style={{border: "none"}}>
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2" style={{border: "none"}}>
            <SortAsc className="h-4 w-4" />
            Sort
          </Button>
        </div>
      </div>

      {/* Tickets Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8">
                <Checkbox className="h-4 w-4" />
              </TableHead>
              <TableHead>Ticket ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Issue Summary</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assigned to</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Checkbox className="h-4 w-4" />
                </TableCell>
                <TableCell className="font-medium">{row.ticketId}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.user}</TableCell>
                <TableCell className="truncate max-w-[260px]">{row.issue}</TableCell>
                <TableCell><Priority value={row.priority} /></TableCell>
                <TableCell><Status value={row.status} /></TableCell>
                <TableCell>{row.assignedTo}</TableCell>
                <TableCell>
                  <Button variant="ghost" className="text-black hover:text-black/70 p-0 h-auto" onClick={() => navigate(`/support/${row.ticketId}`)}>
                    <span>View</span>
                    <ChevronRight className="h-3 w-3 ml-1" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <PaginationControls
        currentPage={currentPage}
        totalPages={8}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Support;