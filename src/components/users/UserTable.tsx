import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Search, Filter, ArrowUpDown, ChevronRight } from "lucide-react";
import { api, User, UserFilterParams } from "@/lib/api";
import { formatDistanceToNow } from "date-fns";
import { toast } from "@/components/ui/use-toast";
import { DeliveryLoader } from "@/components/ui/delivery-loader";

interface UserTableProps {
  onUserCountChange?: (count: number) => void;
}

const ITEMS_PER_PAGE = 10;

export function UserTable({ onUserCountChange }: UserTableProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const navigate = useNavigate();

  // Use a ref to track the previous total count
  const prevTotalRef = useRef<number | undefined>();

  // Memoize the fetch function to prevent unnecessary recreations
  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      const params: UserFilterParams = {
        page: currentPage,
        per_page: ITEMS_PER_PAGE,
        search: searchTerm || undefined,
        is_active: statusFilter === 'all' ? undefined : statusFilter === 'active',
        sort_by: 'created_at',
        sort_order: 'desc'
      };

      const response = await api.getUsers(params);
      setUsers(response.users);
      setTotalPages(response.total_pages);
      
      // Only call onUserCountChange if the total count has changed
      if (onUserCountChange && response.total !== undefined) {
        onUserCountChange(response.total);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
      toast({
        title: "Error",
        description: "Failed to load users. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, searchTerm, statusFilter, onUserCountChange]);

  // Main effect to fetch users
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleStatusToggle = async (userId: string, isActive: boolean) => {
    try {
      await api.toggleUserStatus(userId, isActive);
      setUsers(users.map(user => 
        user._id === userId ? { ...user, is_active: isActive } : user
      ));
      toast({
        title: "Success",
        description: `User ${isActive ? 'activated' : 'deactivated'} successfully`,
      });
    } catch (error) {
      console.error('Failed to update user status:', error);
      toast({
        title: "Error",
        description: "Failed to update user status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getStatusVariant = (isActive: boolean) => {
    return isActive ? "default" : "destructive";
  };

  const getStatusText = (isActive: boolean) => {
    return isActive ? "Active" : "Inactive";
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return isNaN(date.getTime()) 
      ? 'Invalid date' 
      : formatDistanceToNow(date, { addSuffix: true });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by name or email"
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
                <p className="text-sm font-medium mb-2">Status</p>
                <div className="space-y-2 text-sm">
                  <div 
                    className={`cursor-pointer hover:bg-accent p-1 rounded ${statusFilter === 'all' ? 'font-medium' : ''}`}
                    onClick={() => setStatusFilter('all')}
                  >
                    All Users
                  </div>
                  <div 
                    className={`cursor-pointer hover:bg-accent p-1 rounded ${statusFilter === 'active' ? 'font-medium' : ''}`}
                    onClick={() => setStatusFilter('active')}
                  >
                    Active Only
                  </div>
                  <div 
                    className={`cursor-pointer hover:bg-accent p-1 rounded ${statusFilter === 'inactive' ? 'font-medium' : ''}`}
                    onClick={() => setStatusFilter('inactive')}
                  >
                    Inactive Only
                  </div>
                  <div className="cursor-pointer hover:bg-accent p-1 rounded">Suspicious</div>
                  <div className="cursor-pointer hover:bg-accent p-1 rounded">Suspended</div>
                  <div className="cursor-pointer hover:bg-accent p-1 rounded">Loyalty</div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" className="flex items-center gap-2" style={{border: "none"}}>
            <ArrowUpDown className="h-4 w-4" />
            Sort
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="py-12">
          <DeliveryLoader label="Loading users..." />
        </div>
      ) : users.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No users found</p>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Member Since</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="w-12">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id} className="hover:bg-accent/50">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        {user.full_name?.charAt(0) || 'U'}
                      </div>
                      <span>{user.full_name || 'Unnamed User'}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    <div className="max-w-[200px] truncate">{user.email}</div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {user.phone_number || 'N/A'}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${user.is_active ? 'bg-green-500' : 'bg-red-500'}`} />
                      <span>{getStatusText(user.is_active)}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(user.created_at)}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {user.last_login ? formatDate(user.last_login) : 'Never'}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem 
                          onClick={() => navigate(`/users/${user._id}`)}
                          className="cursor-pointer"
                        >
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleStatusToggle(user._id, !user.is_active)}
                          className="cursor-pointer"
                        >
                          {user.is_active ? 'Deactivate User' : 'Activate User'}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      
      {totalPages > 1 && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1 || isLoading}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage >= totalPages || isLoading}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}