import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Search, Filter, ArrowUpDown, Mail, Phone, User, Check, X, Clock } from "lucide-react";
import { api, WaitlistEntry } from "@/lib/api";
import { formatDistanceToNow } from "date-fns";
import { toast } from "@/components/ui/use-toast";
import { DeliveryLoader } from "@/components/ui/delivery-loader";

interface WaitlistTableProps {
  onEntryUpdate?: () => void;
}

const ITEMS_PER_PAGE = 10;

export function WaitlistTable({ onEntryUpdate }: WaitlistTableProps) {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>("all");

  const fetchWaitlist = async () => {
    try {
      console.log('Fetching waitlist with params:', {
        page: currentPage,
        per_page: ITEMS_PER_PAGE,
        search: searchTerm || undefined,
        status: statusFilter === 'all' ? undefined : statusFilter
      });
      
      setIsLoading(true);
      const response = await api.getWaitlist({
        page: currentPage,
        per_page: ITEMS_PER_PAGE,
        search: searchTerm || undefined,
        status: statusFilter === 'all' ? undefined : statusFilter as 'pending' | 'approved' | 'rejected'
      });
      
      console.log('Waitlist API response:', response);
      
      // The API returns a WaitlistResponse object with entries array and pagination info
      if (response && Array.isArray(response.entries)) {
        setEntries(response.entries);
        setTotalPages(response.total_pages || 1);
      } else {
        console.error('Unexpected API response format:', response);
        setEntries([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error('Error fetching waitlist:', error);
      console.error('Failed to fetch waitlist:', error);
      toast({
        title: "Error",
        description: "Failed to load waitlist entries. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWaitlist();
  }, [currentPage, searchTerm, statusFilter]);

  const handleStatusChange = async (id: string, status: 'approved' | 'rejected' | 'pending') => {
    try {
      await api.updateWaitlistStatus(id, status);
      toast({
        title: "Success",
        description: `Entry ${status} successfully`,
      });
      fetchWaitlist();
      onEntryUpdate?.();
    } catch (error) {
      console.error('Failed to update status:', error);
      toast({
        title: "Error",
        description: "Failed to update entry status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getStatusVariant = (status: string | undefined) => {
    switch (status) {
      case 'approved':
        return 'default';
      case 'rejected':
        return 'destructive';
      case 'pending':
      default:
        return 'outline';
    }
  };

  const formatDateSafely = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? 'Invalid date' : formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  console.log('Rendering WaitlistTable with:', { entries, isLoading, totalPages });
  
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                {statusFilter === 'all' ? 'All Status' : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setStatusFilter('all')}>
                All Status
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('pending')}>
                Pending
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('approved')}>
                Approved
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('rejected')}>
                Rejected
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {isLoading ? (
        <div className="py-12">
          <DeliveryLoader label="Loading waitlist..." />
        </div>
      ) : entries.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No waitlist entries found</p>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead className="w-12">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="font-mono text-sm">
                    {entry.id.substring(0, 8)}...
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{entry.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(entry.status || 'pending')}>
                      {(entry.status || 'pending').charAt(0).toUpperCase() + (entry.status || 'pending').slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {formatDateSafely(entry.created_at)}
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
                        {entry.status !== 'approved' && (
                          <DropdownMenuItem onClick={() => handleStatusChange(entry.id, 'approved')}>
                            <Check className="mr-2 h-4 w-4 text-green-600" />
                            Approve
                          </DropdownMenuItem>
                        )}
                        {entry.status !== 'rejected' && (
                          <DropdownMenuItem onClick={() => handleStatusChange(entry.id, 'rejected')}>
                            <X className="mr-2 h-4 w-4 text-red-600" />
                            Reject
                          </DropdownMenuItem>
                        )}
                        {entry.status !== 'pending' && (
                          <DropdownMenuItem onClick={() => handleStatusChange(entry.id, 'pending')}>
                            <Clock className="mr-2 h-4 w-4 text-yellow-600" />
                            Set as Pending
                          </DropdownMenuItem>
                        )}
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
            disabled={currentPage === 1}
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
            disabled={currentPage >= totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
