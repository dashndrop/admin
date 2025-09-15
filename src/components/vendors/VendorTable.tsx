import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Filter, ArrowUpDown, ChevronRight } from "lucide-react";
import { VendorActionModal } from "./VendorActionModal";
import { PaginationControls } from "@/components/ui/pagination-controls";

interface Vendor {
  id: string;
  name: string;
  category: string;
  salesVolume: string;
  status: "Active" | "Pending Approval" | "Suspended";
  rating: number;
  lastLogin: string;
  joinedOn: string;
}

const vendors: Vendor[] = [
  {
    id: "1",
    name: "Chicken Republic",
    category: "Restaurant",
    salesVolume: "₦300,000.00",
    status: "Active",
    rating: 4.5,
    lastLogin: "30/06/2025",
    joinedOn: "30/06/2025",
  },
  {
    id: "2",
    name: "MedPlus",
    category: "Pharmacy",
    salesVolume: "₦30,000,000.00",
    status: "Active",
    rating: 3.5,
    lastLogin: "30/06/2025",
    joinedOn: "30/06/2025",
  },
  {
    id: "3",
    name: "Mega Chicken",
    category: "Restaurant",
    salesVolume: "₦300,000.00",
    status: "Pending Approval",
    rating: 4.5,
    lastLogin: "30/06/2025",
    joinedOn: "30/06/2025",
  },
  {
    id: "4",
    name: "MedPlus",
    category: "Pharmacy",
    salesVolume: "₦30,000,000.00",
    status: "Suspended",
    rating: 3.5,
    lastLogin: "30/06/2025",
    joinedOn: "30/06/2025",
  },
];

// Expanded vendor data to match the UI
const expandedVendors: Vendor[] = [
  ...vendors,
  {
    id: "5",
    name: "Chicken Republic",
    category: "Restaurant", 
    salesVolume: "₦300,000.00",
    status: "Pending Approval",
    rating: 4.5,
    lastLogin: "30/06/2025",
    joinedOn: "30/06/2025",
  },
  {
    id: "6",
    name: "Mega Chicken",
    category: "Restaurant",
    salesVolume: "₦300,000.00", 
    status: "Pending Approval",
    rating: 4.5,
    lastLogin: "30/06/2025",
    joinedOn: "30/06/2025",
  },
  {
    id: "7",
    name: "MedPlus",
    category: "Pharmacy",
    salesVolume: "₦30,000,000.00",
    status: "Active",
    rating: 3.5,
    lastLogin: "30/06/2025",
    joinedOn: "30/06/2025",
  },
  {
    id: "8",
    name: "Mega Chicken", 
    category: "Restaurant",
    salesVolume: "₦300,000.00",
    status: "Pending Approval",
    rating: 4.5,
    lastLogin: "30/06/2025",
    joinedOn: "30/06/2025",
  },
  {
    id: "9",
    name: "MedPlus",
    category: "grocery",
    salesVolume: "₦30,000,000.00",
    status: "Active", 
    rating: 3.5,
    lastLogin: "30/06/2025",
    joinedOn: "30/06/2025",
  },
  {
    id: "10",
    name: "Ile Iyan",
    category: "Restaurant",
    salesVolume: "₦30,000,000.00",
    status: "Active",
    rating: 3.5,
    lastLogin: "30/06/2025",
    joinedOn: "30/06/2025",
  },
  {
    id: "11",
    name: "Mega Chicken",
    category: "Restaurant", 
    salesVolume: "₦300,000.00",
    status: "Pending Approval",
    rating: 4.5,
    lastLogin: "30/06/2025",
    joinedOn: "30/06/2025",
  },
  {
    id: "12",
    name: "MedPlus",
    category: "Pharmacy",
    salesVolume: "₦30,000,000.00",
    status: "Active",
    rating: 3.5,
    lastLogin: "30/06/2025",
    joinedOn: "30/06/2025",
  },
];

export function VendorTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [actionType, setActionType] = useState<"approve" | "reject" | "suspend" | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
  const itemsPerPage = 10;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500";
      case "Pending Approval":
        return "bg-yellow-500";
      case "Suspended":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleAction = (vendor: Vendor, action: "approve" | "reject" | "suspend") => {
    setSelectedVendor(vendor);
    setActionType(action);
  };

  const handleSelectVendor = (vendorId: string) => {
    setSelectedVendors(prev => 
      prev.includes(vendorId) 
        ? prev.filter(id => id !== vendorId)
        : [...prev, vendorId]
    );
  };

  const handleSelectAll = () => {
    if (selectedVendors.length === expandedVendors.length) {
      setSelectedVendors([]);
    } else {
      setSelectedVendors(expandedVendors.map(vendor => vendor.id));
    }
  };

  const totalPages = Math.ceil(expandedVendors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentVendors = expandedVendors.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by Vendor Name/ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <ArrowUpDown className="h-4 w-4 mr-2" />
            Sort
          </Button>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedVendors.length === expandedVendors.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Vendor Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Sales Volume</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead>Joined On</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentVendors.map((vendor) => (
              <TableRow key={vendor.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedVendors.includes(vendor.id)}
                    onCheckedChange={() => handleSelectVendor(vendor.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{vendor.name}</TableCell>
                <TableCell>{vendor.category}</TableCell>
                <TableCell>{vendor.salesVolume}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(vendor.status)}`} />
                    <span className="text-sm">{vendor.status}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <span>{vendor.rating}</span>
                    <span className="text-yellow-500">★</span>
                  </div>
                </TableCell>
                <TableCell>{vendor.lastLogin}</TableCell>
                <TableCell>{vendor.joinedOn}</TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-muted-foreground hover:text-foreground"
                    onClick={() => window.location.href = `/vendors/${vendor.id}`}
                  >
                    View
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {selectedVendor && actionType && (
        <VendorActionModal
          vendor={selectedVendor}
          action={actionType}
          open={true}
          onClose={() => {
            setSelectedVendor(null);
            setActionType(null);
          }}
        />
      )}
    </div>
  );
}