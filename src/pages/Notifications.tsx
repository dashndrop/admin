import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DeliveryLoader } from "@/components/ui/delivery-loader";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Bell, Filter, ChevronDown, MoreHorizontal, X, Star, Eye, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { api } from "@/lib/api";
import { formatDistanceToNow } from "date-fns";
import { toast } from "@/components/ui/use-toast";

type NotificationStatus = 'all' | 'unread';
type NotificationType = 'all' | 'refund' | 'system' | 'application' | 'payouts' | 'security';

interface NotificationData {
  _id: string;
  title?: string;
  body?: string;
  message?: string;
  read: boolean;
  read_at: string | null;
  created_at: string;
  data?: {
    order_id?: string;
    status?: string;
    type?: string;
    [key: string]: any;
  };
  recipient_type: string;
  recipient_id: string;
  [key: string]: any;
}

export default function Notifications() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
  const [selectedRefund, setSelectedRefund] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState<NotificationStatus>('all');
  const [typeFilter, setTypeFilter] = useState<NotificationType>('all');
  const pageSize = 10;

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
      const params: any = {
        page: currentPage,
        per_page: pageSize,
      };

      if (statusFilter === 'unread') {
        params.read = false;
      }

      if (typeFilter !== 'all') {
        // Map the UI filter to the API's data.type
        params['data.type'] = typeFilter;
      }

      console.log('Fetching notifications with params:', params);
      const response = await api.getNotifications(params);
      console.log('API Response:', response);
      
      // Handle the API response which contains notifications in a 'notifications' array
      const items: NotificationData[] = response?.notifications || [];
      const total = response?.total || 0;
      
      console.log('Processed items:', items);
      setNotifications(items);
      // Calculate total pages based on total count and page size
      setTotalPages(Math.ceil(total / pageSize) || 1);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      setNotifications([]);
      setTotalPages(1);
      toast({
        title: "Error",
        description: "Failed to load notifications. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Mark notification as read
  const markAsRead = async (notificationId: string) => {
    try {
      await api.markNotificationAsRead(notificationId);
      // Update local state
      setNotifications(notifications.map(notif => 
        notif._id === notificationId ? { 
          ...notif, 
          read: true,
          read_at: new Date().toISOString()
        } : notif
      ));
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      await api.markAllNotificationsAsRead();
      // Update local state
      const now = new Date().toISOString();
      setNotifications(notifications.map(notif => ({ 
        ...notif, 
        read: true,
        read_at: now 
      })));
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Fetch notifications when component mounts or filters change
  useEffect(() => {
    fetchNotifications();
  }, [currentPage, statusFilter, typeFilter]);

  const handleViewRefund = async (notification: any) => {
    // Mark as read when viewing
    if (!notification.is_read) {
      await markAsRead(notification.id);
    }

    // For refund notifications, show the refund modal
    if (notification.type === 'refund' && notification.metadata) {
      const metadata = notification.metadata;
      setSelectedRefund({
        id: metadata.refundId || "N/A",
        orderId: metadata.orderId || "N/A",
        vendor: metadata.vendorName || "Unknown Vendor",
        vendorId: metadata.vendorId || "N/A",
        rider: metadata.riderName ? `Rider ${metadata.riderId} - ${metadata.riderName}` : "N/A",
        rating: metadata.riderRating || "0.0",
        items: metadata.items || [],
        total: metadata.totalAmount ? `₦${parseFloat(metadata.totalAmount).toLocaleString('en-NG', { minimumFractionDigits: 2 })}` : "₦0.00",
        refundAmount: metadata.refundAmount ? `₦${parseFloat(metadata.refundAmount).toLocaleString('en-NG', { minimumFractionDigits: 2 })}` : "₦0.00",
        reason: metadata.reason || "No reason provided",
        requestedOn: notification.created_at ? new Date(notification.created_at).toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }) : "N/A",
        refundType: metadata.refundType || "Full refund (100%)",
        attachments: metadata.attachments ? metadata.attachments.length : 0
      });
      setIsRefundModalOpen(true);
    }
  };

  useEffect(() => {
    console.log('Notifications state updated:', {
      hasNotifications: !!notifications?.length,
      notificationCount: notifications?.length,
      firstNotification: notifications?.[0],
      isLoading
    });
  }, [notifications, isLoading]);
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-900 rounded-md flex items-center justify-center">
            <Bell className="h-4 w-4 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Notifications</h1>
            <p className="text-muted-foreground">
              View and manage your notifications
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as NotificationType)}
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 appearance-none pr-8"
            >
              <option value="all">All Types</option>
              <option value="refund">Refund</option>
              <option value="system">System</option>
              <option value="application">Application</option>
              <option value="payouts">Payouts</option>
              <option value="security">Security</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          </div>
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as NotificationStatus)}
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 appearance-none pr-8"
            >
              <option value="all">All Status</option>
              <option value="unread">Unread Only</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          </div>
          <Button 
            variant="outline" 
            onClick={markAllAsRead}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
            Mark all as read
          </Button>
        </div>
      </div>

      {/* Notifications List */}
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="py-12">
              <DeliveryLoader label="Loading notifications" />
            </div>
          ) : !notifications?.length ? (
            <div className="flex flex-col items-center justify-center p-12">
              <Bell className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-1">No notifications found</h3>
              <p className="text-muted-foreground text-center">
                {statusFilter === 'unread' 
                  ? 'You have no unread notifications.' 
                  : 'No notifications to display.'}
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-0">
                {notifications?.map((notification) => (
                  <div 
                    key={notification._id} 
                    className={`flex items-start md:items-center justify-between p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50' : ''}`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                            !notification.read ? "bg-blue-500" : "bg-gray-300"
                          }`} />
                          <h3 className="font-semibold text-sm capitalize">
                            {notification.data?.type || notification.recipient_type || 'Notification'}
                          </h3>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {notification.body || notification.title || 'No message content'}
                        </p>
                      </div>
                      {notification.data?.status && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          Status: {notification.data.status}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2 pl-2">
                      <p className="text-xs text-muted-foreground whitespace-nowrap">
                        {notification.created_at 
                          ? formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })
                          : 'Just now'}
                      </p>
                      {notification.type === 'refund' && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 text-xs bg-[#003366] text-white hover:bg-[#003366]/90"
                          onClick={() => handleViewRefund(notification)}
                        >
                          View Details
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center py-4 border-t">
                  <PaginationControls
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    isLoading={isLoading}
                  />
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Refund Modal */}
      <Dialog open={isRefundModalOpen} onOpenChange={setIsRefundModalOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="bg-[#003366] text-white p-6 -m-6 mb-6 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-xl font-semibold">
                  Refund Request - {selectedRefund?.id} (Order {selectedRefund?.orderId})
                </DialogTitle>
                <div className="flex items-center gap-2 mt-2">
                  <span className="bg-yellow-500 text-yellow-900 px-2 py-1 rounded text-sm font-medium">
                    Pending
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsRefundModalOpen(false)}
                className="text-white hover:bg-white/20 p-2"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
          
          {selectedRefund && (
            <div className="space-y-6">
              {/* Vendor and Rider Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">Vendor</h3>
                  <p className="font-medium">{selectedRefund.vendor} (Vendor ID: {selectedRefund.vendorId})</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">Rider</h3>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{selectedRefund.rider}</p>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span className="text-sm">{selectedRefund.rating}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items Table */}
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground mb-3">Order Items</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedRefund.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.price}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="font-semibold">
                      <TableCell colSpan={2}>Total</TableCell>
                      <TableCell>{selectedRefund.total}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              {/* Refund Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">Refund Amount Requested</h3>
                  <p className="font-medium text-lg">{selectedRefund.refundAmount}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">Refund Type</h3>
                  <p className="font-medium">{selectedRefund.refundType}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">Refund Reason (user-provided)</h3>
                  <p className="font-medium">{selectedRefund.reason}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground">Requested On</h3>
                  <p className="font-medium">{selectedRefund.requestedOn}</p>
                </div>
              </div>

              {/* Attachments */}
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground mb-3">Attachments</h3>
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    {Array.from({ length: selectedRefund.attachments }).map((_, index) => (
                      <div key={index} className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-xs text-gray-500">IMG</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="bg-[#003366] text-white hover:bg-[#003366]/90">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                </div>
              </div>

              {/* Partial Refund */}
              <div>
                <Label htmlFor="partialRefund" className="text-sm font-medium">Partial Refund</Label>
                <Input
                  id="partialRefund"
                  placeholder="₦00.00"
                  className="mt-1"
                />
              </div>

              {/* Note */}
              <div>
                <Label htmlFor="note" className="text-sm font-medium">Note</Label>
                <Textarea
                  id="note"
                  placeholder="Type here"
                  className="mt-1 min-h-[100px]"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => setIsRefundModalOpen(false)}
                >
                  Reject request
                </Button>
                <Button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white"
                  onClick={() => setIsRefundModalOpen(false)}
                >
                  Approve partial refund
                </Button>
                <Button
                  className="bg-[#003366] hover:bg-[#003366]/90 text-white"
                  onClick={() => setIsRefundModalOpen(false)}
                >
                  Approve full refund
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
