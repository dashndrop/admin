import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Bell, Filter, ChevronDown, MoreHorizontal, X, Star, Eye } from "lucide-react";
import { useState } from "react";
import { PaginationControls } from "@/components/ui/pagination-controls";

export default function Notifications() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
  const [selectedRefund, setSelectedRefund] = useState(null);

  const notifications = [
    {
      category: "Refund",
      description: "Refund Request RFND-220 awaiting review",
      date: "Sept 17, 2025 - 09:15 AM",
      status: "unread"
    },
    {
      category: "System",
      description: "Refund Request RFND-220 awaiting review",
      date: "Sept 17, 2025 - 09:15 AM",
      status: "unread"
    },
    {
      category: "Application",
      description: "FreshMart vendor application pending approval",
      date: "Sept 17, 2025 - 09:15 AM",
      status: "unread"
    },
    {
      category: "Payouts",
      description: "Refund Request RFND-220 awaiting review",
      date: "Sept 17, 2025 - 09:15 AM",
      status: "unread"
    },
    {
      category: "Security",
      description: "3 failed login attempts by Admin John",
      date: "Sept 17, 2025 - 09:15 AM",
      status: "read"
    },
    {
      category: "Application",
      description: "New rider Application",
      date: "Sept 17, 2025 - 09:15 AM",
      status: "read"
    },
    {
      category: "Application",
      description: "FreshMart vendor application pending approval",
      date: "Sept 17, 2025 - 09:15 AM",
      status: "read"
    },
    {
      category: "Application",
      description: "New rider Application",
      date: "Sept 17, 2025 - 09:15 AM",
      status: "read"
    },
    {
      category: "Application",
      description: "FreshMart vendor application pending approval",
      date: "Sept 17, 2025 - 09:15 AM",
      status: "read"
    },
    {
      category: "Application",
      description: "New rider Application",
      date: "Sept 17, 2025 - 09:15 AM",
      status: "read"
    }
  ];

  const handleViewRefund = (notification) => {
    if (notification.category === "Refund") {
      setSelectedRefund({
        id: "RFND-202",
        orderId: "ORD-870",
        vendor: "ChopLife Kitchen",
        vendorId: "V-102",
        rider: "Rider 210 - James Okon",
        rating: "4.6",
        items: [
          { name: "Jollof Rice", quantity: "2x", price: "₦10,000.00" },
          { name: "Chicken", quantity: "2x", price: "₦10,000.00" },
          { name: "Pack", quantity: "2x", price: "₦10,000.00" }
        ],
        total: "₦30,000.00",
        refundAmount: "₦30,000.00",
        reason: "Missing drink in my order",
        requestedOn: "Aug 18, 2025 - 09:15 AM",
        refundType: "Full refund (100%)",
        attachments: 3
      });
      setIsRefundModalOpen(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-900 rounded-md flex items-center justify-center">
            <Bell className="h-4 w-4 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Notifications</h1>
            <p className="text-muted-foreground">Here you can see all your notifications and easily access your tasks</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Type
            <ChevronDown className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <MoreHorizontal className="h-4 w-4" />
            Status
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Notifications List */}
      <Card>
        <CardContent className="p-0">
          <div className="space-y-0">
            {notifications.map((notification, index) => (
              <div key={index} className="flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-sm">{notification.category}</h3>
                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                  </div>
                </div>
                <div className="flex-1 text-center">
                  <p className="text-xs text-muted-foreground">{notification.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="bg-[#003366] text-white hover:bg-[#003366]/90"
                    onClick={() => handleViewRefund(notification)}
                  >
                    View
                  </Button>
                  <div className={`w-2 h-2 rounded-full ${
                    notification.status === "unread" ? "bg-orange-500" : "bg-gray-400"
                  }`} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex justify-center">
        <PaginationControls
          currentPage={currentPage}
          totalPages={10}
          onPageChange={setCurrentPage}
        />
      </div>

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
