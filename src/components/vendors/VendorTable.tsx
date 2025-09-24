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
import { Search, Filter, ArrowUpDown, ChevronRight, MoreHorizontal, Eye, Pause, Play, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { apiServices } from "@/lib/api-services";
import { useToast } from "@/components/ui/use-toast";
import { VendorActionModal } from "./VendorActionModal";
import { ConfirmDialog } from "./ConfirmDialog";
import { PaginationControls } from "@/components/ui/pagination-controls";

interface Vendor {
  id: string;
  name: string;
  description: string;
  email: string;
  phone: string;
  status: string;
  category: string;
  locations: any[];
  operating_hours: any[];
  cover_image_url?: string;
  created_at?: string;
  updated_at?: string;
  revenue?: string;
  rating?: number;
  orders?: number;
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
  vendors: Vendor[];
  onRefresh?: () => void;
}

export function VendorTable({ vendors = [], onRefresh }: VendorTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [actionType, setActionType] = useState<"approve" | "reject" | "suspend" | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: "",
    description: "",
    action: () => {},
    variant: "default" as "default" | "destructive"
  });
  const itemsPerPage = 10;
  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500";
      case "Pending Approval":
        return "bg-yellow-500";
      case "Suspended":
      case "Inactive":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleAction = (vendor: Vendor, action: "approve" | "reject" | "suspend") => {
    setSelectedVendor(vendor);
    setActionType(action);
  };

  const handleApproveRestaurant = async (restaurantId: string) => {
    setIsLoading(true);
    try {
      await apiServices.approveRestaurant(restaurantId);
      toast({ description: "Restaurant approved successfully!" });
      if (onRefresh) onRefresh();
    } catch (error) {
      toast({ 
        description: "Failed to approve restaurant", 
        variant: "destructive" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuspendRestaurant = async (restaurantId: string) => {
    setIsLoading(true);
    try {
      await apiServices.suspendRestaurant(restaurantId);
      toast({ description: "Restaurant suspended successfully!" });
      if (onRefresh) onRefresh();
    } catch (error) {
      toast({ 
        description: "Failed to suspend restaurant", 
        variant: "destructive" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteRestaurant = async (restaurantId: string) => {
    setIsLoading(true);
    try {
      await apiServices.deleteRestaurant(restaurantId);
      toast({ description: "Restaurant deleted successfully!" });
      if (onRefresh) onRefresh();
    } catch (error) {
      toast({ 
        description: "Failed to delete restaurant", 
        variant: "destructive" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const openDeleteConfirmation = (restaurant: Vendor) => {
    setConfirmDialog({
      open: true,
      title: "Delete Restaurant",
      description: `Are you sure you want to delete "${restaurant.name}"? This action cannot be undone.`,
      action: () => handleDeleteRestaurant(restaurant.id),
      variant: "destructive"
    });
  };

  const openSuspendConfirmation = (restaurant: Vendor) => {
    setConfirmDialog({
      open: true,
      title: "Suspend Restaurant",
      description: `Are you sure you want to suspend "${restaurant.name}"? This will change their status to Inactive and prevent them from receiving new orders.`,
      action: () => handleSuspendRestaurant(restaurant.id),
      variant: "default"
    });
  };

  const openApproveConfirmation = (restaurant: Vendor) => {
    setConfirmDialog({
      open: true,
      title: "Approve Restaurant",
      description: `Are you sure you want to approve "${restaurant.name}"? This will change their status to Active and allow them to receive new orders.`,
      action: () => handleApproveRestaurant(restaurant.id),
      variant: "default"
    });
  };

  const handleSelectVendor = (vendorId: string) => {
    setSelectedVendors(prev => 
      prev.includes(vendorId) 
        ? prev.filter(id => id !== vendorId)
        : [...prev, vendorId]
    );
  };

  const handleSelectAll = () => {
    if (selectedVendors.length === vendors.length) {
      setSelectedVendors([]);
    } else {
      setSelectedVendors(vendors.map(vendor => vendor.id));
    }
  };

  // Filter vendors based on search term
  const filteredVendors = vendors.filter(vendor =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredVendors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentVendors = filteredVendors.slice(startIndex, startIndex + itemsPerPage);

  // Format date function
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB');
    } catch {
      return "N/A";
    }
  };

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
                  checked={selectedVendors.length === vendors.length && vendors.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Vendor Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Locations</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentVendors.length > 0 ? currentVendors.map((vendor) => (
              <TableRow key={vendor.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedVendors.includes(vendor.id)}
                    onCheckedChange={() => handleSelectVendor(vendor.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{vendor.name}</TableCell>
                <TableCell className="max-w-[200px] truncate" title={vendor.description}>
                  {vendor.description}
                </TableCell>
                <TableCell>{vendor.email}</TableCell>
                <TableCell>{vendor.phone}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(vendor.status)}`} />
                    <span className="text-sm">{vendor.status}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {vendor.locations.length > 0 ? `${vendor.locations.length} location(s)` : "No locations"}
                  </span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        disabled={isLoading}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => window.location.href = `/vendors/${vendor.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {vendor.status === "Active" ? (
                        <DropdownMenuItem 
                          onClick={() => openSuspendConfirmation(vendor)}
                          disabled={isLoading}
                        >
                          <Pause className="mr-2 h-4 w-4" />
                          Suspend Restaurant
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem 
                          onClick={() => openApproveConfirmation(vendor)}
                          disabled={isLoading}
                        >
                          <Play className="mr-2 h-4 w-4" />
                          Approve Restaurant
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => openDeleteConfirmation(vendor)}
                        disabled={isLoading}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Restaurant
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No vendors found
                </TableCell>
              </TableRow>
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

      <ConfirmDialog
        open={confirmDialog.open}
        onOpenChange={(open) => setConfirmDialog(prev => ({ ...prev, open }))}
        title={confirmDialog.title}
        description={confirmDialog.description}
        confirmText={confirmDialog.variant === "destructive" ? "Delete" : "Confirm"}
        variant={confirmDialog.variant}
        onConfirm={confirmDialog.action}
        loading={isLoading}
      />
    </div>
  );
}