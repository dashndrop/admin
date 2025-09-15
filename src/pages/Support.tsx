import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  HelpCircle, 
  Search, 
  Filter, 
  SortAsc, 
  Eye,
  UserCheck,
  X
} from "lucide-react";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { ReassignTicketModal } from "@/components/support/ReassignTicketModal";
import { CloseTicketModal } from "@/components/support/CloseTicketModal";

const Support = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [isReassignModalOpen, setIsReassignModalOpen] = useState(false);
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);

  const ticketsData = [
    {
      id: "TKT-001",
      subject: "Unable to place order",
      user: "John Smith",
      department: "Technical Support",
      priority: "High",
      status: "Open",
      assignedTo: "Sarah Johnson",
      dateCreated: "10 Dec 2024",
      description: "Customer cannot complete checkout process",
    },
    {
      id: "TKT-002",
      subject: "Payment failed",
      user: "Mike Brown",
      department: "Billing",
      priority: "Medium", 
      status: "In Progress",
      assignedTo: "David Wilson",
      dateCreated: "09 Dec 2024",
      description: "Card payment failing during checkout",
    },
    {
      id: "TKT-003",
      subject: "App crashes on startup",
      user: "Sarah Davis",
      department: "Technical Support",
      priority: "High",
      status: "Resolved",
      assignedTo: "Tom Anderson",
      dateCreated: "08 Dec 2024",
      description: "Mobile app crashing when user tries to open",
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      "Open": "destructive",
      "In Progress": "secondary",
      "Resolved": "default",
      "Closed": "outline",
    };
    return <Badge variant={variants[status] || "outline"}>{status}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      "High": "destructive",
      "Medium": "secondary", 
      "Low": "default",
    };
    return <Badge variant={variants[priority] || "default"}>{priority}</Badge>;
  };

  const handleReassign = (ticket: any) => {
    setSelectedTicket(ticket);
    setIsReassignModalOpen(true);
  };

  const handleClose = (ticket: any) => {
    setSelectedTicket(ticket);
    setIsCloseModalOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Support Tickets</h1>
          <p className="text-muted-foreground">Manage customer support requests and tickets</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">500</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open</CardTitle>
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">20</div>
            <p className="text-xs text-muted-foreground">-2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">50</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">150</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search tickets..." className="pl-10" />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
        <Button variant="outline" size="sm">
          <SortAsc className="h-4 w-4 mr-2" />
          Sort
        </Button>
      </div>

      {/* Tickets Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ticket ID</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ticketsData.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell className="font-medium">{ticket.id}</TableCell>
                <TableCell>{ticket.subject}</TableCell>
                <TableCell>{ticket.user}</TableCell>
                <TableCell>{ticket.department}</TableCell>
                <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                <TableCell>{ticket.assignedTo}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleReassign(ticket)}
                    >
                      <UserCheck className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleClose(ticket)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
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

      <ReassignTicketModal
        ticket={selectedTicket}
        isOpen={isReassignModalOpen}
        onClose={() => setIsReassignModalOpen(false)}
      />

      <CloseTicketModal
        ticket={selectedTicket}
        isOpen={isCloseModalOpen}
        onClose={() => setIsCloseModalOpen(false)}
      />
    </div>
  );
};

export default Support;