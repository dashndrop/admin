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

interface VendorTableProps {
  restaurants: any[];
  loading: boolean;
}

export function VendorTable({ restaurants, loading }: VendorTableProps) {
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
    if (selectedVendors.length === restaurants.length) {
      setSelectedVendors([]);
    } else {
      setSelectedVendors(restaurants.map((restaurant: any) => restaurant.id));
    }
  };

  // Use only real restaurants data from API
  const displayData = restaurants;
  const totalPages = Math.ceil(displayData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentVendors = displayData.slice(startIndex, startIndex + itemsPerPage);
  
  console.log('VendorTable - restaurants:', restaurants);
  console.log('VendorTable - displayData:', displayData);
  console.log('VendorTable - currentVendors:', currentVendors);

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
          <Button variant="outline" size="sm" style={{border: "none"}}>
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm" style={{border: "none"}}>
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
                  checked={selectedVendors.length === displayData.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Restaurant Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-[#F28C28] border-t-transparent rounded-full animate-spin mr-2"></div>
                    Loading restaurants...
                  </div>
                </TableCell>
              </TableRow>
            ) : currentVendors.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No restaurants found
                </TableCell>
              </TableRow>
            ) : (
              currentVendors.map((restaurant) => (
                <TableRow key={restaurant.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedVendors.includes(restaurant.id)}
                      onCheckedChange={() => handleSelectVendor(restaurant.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{restaurant.name}</TableCell>
                  <TableCell>{restaurant.description}</TableCell>
                  <TableCell>{restaurant.email}</TableCell>
                  <TableCell>{restaurant.phone}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${restaurant.isOpen ? 'bg-green-500' : 'bg-red-500'}`} />
                      <span className="text-sm">{restaurant.isOpen ? 'Open' : 'Closed'}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-muted-foreground hover:text-foreground"
                      onClick={() => window.location.href = `/vendors/${restaurant.id}`}
                    >
                      View
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
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