import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Search, Filter, ArrowUpDown, ChevronRight } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  status: "Active" | "Suspended" | "Flagged";
  orders: number;
  loyaltyPoints: string;
  lastActivity: string;
}

const users: User[] = [
  {
    id: "1",
    name: "Mariam Ajani",
    email: "Mariam101@gm...",
    phoneNumber: "+234 800 9175...",
    status: "Active",
    orders: 50,
    loyaltyPoints: "₦30,000.00",
    lastActivity: "30|06|2025"
  },
  {
    id: "2",
    name: "Clinton Aji",
    email: "Mariam101@gm...",
    phoneNumber: "+234 800 9175...",
    status: "Flagged",
    orders: 10,
    loyaltyPoints: "₦10,000.00",
    lastActivity: "30|06|2025"
  },
  {
    id: "3",
    name: "Ahmed Musa",
    email: "Mariam101@gm...",
    phoneNumber: "+234 800 9175...",
    status: "Flagged",
    orders: 23,
    loyaltyPoints: "₦20,000.00",
    lastActivity: "30|06|2025"
  },
  {
    id: "4",
    name: "Mary Ajasa",
    email: "Mariam101@gm...",
    phoneNumber: "+234 800 9175...",
    status: "Suspended",
    orders: 15,
    loyaltyPoints: "₦15,000.00",
    lastActivity: "30|06|2025"
  },
  {
    id: "5",
    name: "Sunday Ronke",
    email: "Mariam101@gm...",
    phoneNumber: "+234 800 9175...",
    status: "Flagged",
    orders: 3,
    loyaltyPoints: "₦30,000.00",
    lastActivity: "30|06|2025"
  },
  {
    id: "6",
    name: "Mark Matthews",
    email: "Mariam101@gm...",
    phoneNumber: "+234 800 9175...",
    status: "Active",
    orders: 1,
    loyaltyPoints: "₦30,100.00",
    lastActivity: "30|06|2025"
  },
  {
    id: "7",
    name: "Musiliu Ishola",
    email: "Mariam101@gm...",
    phoneNumber: "+234 800 9175...",
    status: "Active",
    orders: 0,
    loyaltyPoints: "₦45,600.00",
    lastActivity: "30|06|2025"
  },
  {
    id: "8",
    name: "Oladimeji Peters",
    email: "Mariam101@gm...",
    phoneNumber: "+234 800 9175...",
    status: "Active",
    orders: 20,
    loyaltyPoints: "₦16,000.00",
    lastActivity: "30|06|2025"
  },
  {
    id: "9",
    name: "Rotimi Philips",
    email: "Mariam101@gm...",
    phoneNumber: "+234 800 9175...",
    status: "Active",
    orders: 6,
    loyaltyPoints: "₦22,100.00",
    lastActivity: "30|06|2025"
  },
  {
    id: "10",
    name: "Ajani Pokipoki",
    email: "Mariam101@gm...",
    phoneNumber: "+234 800 9175...",
    status: "Suspended",
    orders: 42,
    loyaltyPoints: "₦3,000.00",
    lastActivity: "30|06|2025"
  },
  {
    id: "11",
    name: "Kunle Afolayan",
    email: "Mariam101@gm...",
    phoneNumber: "+234 800 9175...",
    status: "Active",
    orders: 11,
    loyaltyPoints: "₦3,500.00",
    lastActivity: "30|06|2025"
  },
  {
    id: "12",
    name: "Afolabi Ogunba...",
    email: "Mariam101@gm...",
    phoneNumber: "+234 800 9175...",
    status: "Suspended",
    orders: 8,
    loyaltyPoints: "₦60,000.00",
    lastActivity: "30|06|2025"
  }
];

export function UserTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const navigate = useNavigate();

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Active":
        return "default";
      case "Suspended":
        return "destructive";
      case "Flagged":
        return "secondary";
      default:
        return "default";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "text-green-600";
      case "Suspended":
        return "text-red-600";
      case "Flagged":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="space-y-4">
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
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <div className="p-2">
                <p className="text-sm font-medium mb-2">Filter</p>
                <div className="space-y-2 text-sm">
                  <div className="cursor-pointer hover:bg-accent p-1 rounded">All</div>
                  <div className="cursor-pointer hover:bg-accent p-1 rounded">Suspicious</div>
                  <div className="cursor-pointer hover:bg-accent p-1 rounded">Suspended</div>
                  <div className="cursor-pointer hover:bg-accent p-1 rounded">Loyalty</div>
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
              <input type="checkbox" className="rounded" />
            </TableHead>
            <TableHead>User Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead>Loyalty Points</TableHead>
            <TableHead>Last Activity</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users
            .filter(user =>
              user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              user.email.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((user) => (
              <TableRow key={user.id} className="hover:bg-muted/50">
                <TableCell>
                  <input type="checkbox" className="rounded" />
                </TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      user.status === 'Active' ? 'bg-green-500' :
                      user.status === 'Suspended' ? 'bg-red-500' :
                      'bg-yellow-500'
                    }`} />
                    <span className={getStatusColor(user.status)}>{user.status}</span>
                  </div>
                </TableCell>
                <TableCell>{user.orders}</TableCell>
                <TableCell>{user.loyaltyPoints}</TableCell>
                <TableCell>{user.lastActivity}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700 p-0 h-auto"
                    onClick={() => navigate(`/user/${user.id}`)}
                  >
                    View
                    <ChevronRight className="h-3 w-3" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}