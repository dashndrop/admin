import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Package, 
  Search, 
  Filter, 
  SortAsc, 
  Eye,
  ChevronRight,
  X
} from "lucide-react";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { apiServices } from "@/lib/api-services";
import { DeliveryLoader } from "@/components/ui/delivery-loader";

const Orders = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("orders");
  const [isViewDisputeOpen, setIsViewDisputeOpen] = useState(false);
  const [isReviewDisputeOpen, setIsReviewDisputeOpen] = useState(false);
  const [selectedDispute, setSelectedDispute] = useState<any>(null);

  const { data: ordersResp, isLoading: ordersLoading, isError: ordersError } = useQuery({
    queryKey: ["orders", currentPage],
    queryFn: () => apiServices.getOrders({ page: currentPage, page_size: 10 }),
    staleTime: 30_000
  });
  const ordersData = (ordersResp?.list as any[]) || [];

  const disputesData = [
    {
      disputeId: "DISP-101",
      orderId: "ORD-884",
      user: "U-120 Mariam Ajani",
      vendor: "Chicken Republic",
      issue: "Missing Item",
      status: "Open",
      statusColor: "yellow"
    },
    {
      disputeId: "DISP-101",
      orderId: "ORD-884",
      user: "U-120 Mariam Ajani",
      vendor: "Medplus Pharmacy",
      issue: "Rider Late",
      status: "Resolved",
      statusColor: "green"
    },
    {
      disputeId: "DISP-101",
      orderId: "ORD-884",
      user: "U-120 Mariam Ajani",
      vendor: "Medplus Pharmacy",
      issue: "Rider Late",
      status: "Resolved",
      statusColor: "green"
    },
    {
      disputeId: "DISP-101",
      orderId: "ORD-884",
      user: "U-120 Mariam Ajani",
      vendor: "Medplus Pharmacy",
      issue: "Rider Late",
      status: "Resolved",
      statusColor: "green"
    },
    {
      disputeId: "DISP-101",
      orderId: "ORD-884",
      user: "U-120 Mariam Ajani",
      vendor: "Medplus Pharmacy",
      issue: "Rider Late",
      status: "Resolved",
      statusColor: "green"
    },
    {
      disputeId: "DISP-101",
      orderId: "ORD-884",
      user: "U-120 Mariam Ajani",
      vendor: "Medplus Pharmacy",
      issue: "Rider Late",
      status: "Resolved",
      statusColor: "green"
    },
    {
      disputeId: "DISP-101",
      orderId: "ORD-884",
      user: "U-120 Mariam Ajani",
      vendor: "Medplus Pharmacy",
      issue: "Rider Late",
      status: "Resolved",
      statusColor: "green"
    },
    {
      disputeId: "DISP-101",
      orderId: "ORD-884",
      user: "U-120 Mariam Ajani",
      vendor: "Chicken Republic",
      issue: "Missing Item",
      status: "Open",
      statusColor: "yellow"
    },
    {
      disputeId: "DISP-101",
      orderId: "ORD-884",
      user: "U-120 Mariam Ajani",
      vendor: "Chicken Republic",
      issue: "Missing Item",
      status: "Open",
      statusColor: "yellow"
    },
    {
      disputeId: "DISP-101",
      orderId: "ORD-884",
      user: "U-120 Mariam Ajani",
      vendor: "Chicken Republic",
      issue: "Missing Item",
      status: "Open",
      statusColor: "yellow"
    },
    {
      disputeId: "DISP-101",
      orderId: "ORD-884",
      user: "U-120 Mariam Ajani",
      vendor: "Chicken Republic",
      issue: "Missing Item",
      status: "Open",
      statusColor: "yellow"
    },
    {
      disputeId: "DISP-101",
      orderId: "ORD-884",
      user: "U-120 Mariam Ajani",
      vendor: "Chicken Republic",
      issue: "Missing Item",
      status: "Open",
      statusColor: "yellow"
    }
  ];

  const getStatusDot = (color: string) => {
    const colorClasses = {
      green: "bg-green-500",
      yellow: "bg-yellow-500",
      red: "bg-red-500",
      orange: "bg-orange-500",
      blue: "bg-blue-500"
    };
    return <div className={`w-2 h-2 rounded-full ${colorClasses[color as keyof typeof colorClasses]}`} />;
  };

  const handleDisputeAction = (dispute: any, action: string) => {
    setSelectedDispute(dispute);
    if (action === "view") {
      setIsViewDisputeOpen(true);
    } else if (action === "review") {
      setIsReviewDisputeOpen(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gray-900 rounded-md flex items-center justify-center">
          <Package className="h-4 w-4 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Orders & Deliveries</h1>
          <p className="text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        </div>
      </div>

          {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
          <CardContent className="p-4">
            <CardTitle className="text-sm text-muted-foreground">All Orders</CardTitle>
            <p className="text-2xl font-bold mt-1">50K</p>
              </CardContent>
            </Card>
            <Card>
          <CardContent className="p-4">
            <CardTitle className="text-sm text-muted-foreground">Delivered</CardTitle>
            <p className="text-2xl font-bold mt-1">48k</p>
              </CardContent>
            </Card>
            <Card>
          <CardContent className="p-4">
            <CardTitle className="text-sm text-muted-foreground">Cancelled</CardTitle>
            <p className="text-2xl font-bold mt-1">1,000</p>
              </CardContent>
            </Card>
            <Card>
          <CardContent className="p-4">
            <CardTitle className="text-sm text-muted-foreground">Ongoing</CardTitle>
            <p className="text-2xl font-bold mt-1">20</p>
              </CardContent>
            </Card>
          </div>

      {/* Tabs and Search */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between">
          <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
            <TabsTrigger 
              value="orders"
              className="data-[state=active]:bg-[#F28C28] data-[state=active]:text-white"
            >
              Orders
            </TabsTrigger>
            <TabsTrigger 
              value="disputes"
              className="data-[state=active]:bg-[#F28C28] data-[state=active]:text-white"
            >
              Disputes
            </TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by User Name | Email" className="pl-10 w-80" />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <SortAsc className="h-4 w-4" />
              Sort
            </Button>
          </div>
          </div>

        <TabsContent value="orders" className="mt-6">
          {/* Orders Table */}
          <Card>
            <CardContent className="p-0">
            {ordersLoading && <DeliveryLoader label="Fetching orders" />}
            {ordersError && <div className="p-6 text-sm text-red-600">Failed to load orders.</div>}
            <Table>
              <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-medium">
                      <Checkbox />
                    </TableHead>
                    <TableHead className="font-medium">Order ID</TableHead>
                    <TableHead className="font-medium">Date/Time</TableHead>
                    <TableHead className="font-medium">Customer</TableHead>
                    <TableHead className="font-medium">Vendor</TableHead>
                    <TableHead className="font-medium">Rider</TableHead>
                    <TableHead className="font-medium">Amount</TableHead>
                    <TableHead className="font-medium">Status</TableHead>
                    <TableHead className="font-medium">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(ordersData as any[]).map((order) => (
                  <TableRow key={order.id}>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                    <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.dateTime}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.vendor}</TableCell>
                      <TableCell>{order.rider}</TableCell>
                    <TableCell>{order.amount}</TableCell>
                    <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusDot(order.statusColor)}
                          <span>{order.status}</span>
                        </div>
                    </TableCell>
                    <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-black hover:bg-gray-100"
                          onClick={() => navigate(`/orders/${order.id}`)}
                        >
                          View <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </CardContent>
          </Card>

          {/* Pagination */}
          <div className="flex justify-center">
          <PaginationControls
            currentPage={currentPage}
            totalPages={Math.max(1, Math.ceil((ordersResp?.meta?.total || ordersData.length || 1) / (ordersResp?.meta?.page_size || 10)))}
            onPageChange={setCurrentPage}
          />
          </div>
        </TabsContent>

        <TabsContent value="disputes" className="mt-6">
          {/* Disputes Table */}
          <Card>
            <CardContent className="p-0">
            <Table>
              <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-medium">Dispute ID</TableHead>
                    <TableHead className="font-medium">Order ID</TableHead>
                    <TableHead className="font-medium">User</TableHead>
                    <TableHead className="font-medium">Vendor</TableHead>
                    <TableHead className="font-medium">Issue</TableHead>
                    <TableHead className="font-medium">Status</TableHead>
                    <TableHead className="font-medium">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                  {disputesData.map((dispute, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{dispute.disputeId}</TableCell>
                    <TableCell>{dispute.orderId}</TableCell>
                    <TableCell>{dispute.user}</TableCell>
                    <TableCell>{dispute.vendor}</TableCell>
                      <TableCell>{dispute.issue}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusDot(dispute.statusColor)}
                          <span>{dispute.status}</span>
                        </div>
                      </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm"
                          className="text-black hover:bg-gray-100"
                          onClick={() => handleDisputeAction(dispute, dispute.status === "Open" ? "review" : "view")}
                      >
                          {dispute.status === "Open" ? "Review" : "View"} <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
        </TabsContent>
      </Tabs>

      {/* View Dispute Modal */}
      <Dialog open={isViewDisputeOpen} onOpenChange={setIsViewDisputeOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader className="bg-[#003366] text-white p-6 -m-6 mb-6 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-xl font-semibold">Review dispute - Disp-101</DialogTitle>
                <p className="text-sm text-blue-100 mt-1">Lorem ipsum dolor adiuvat coartem</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsViewDisputeOpen(false)}
                className="text-white hover:bg-white/20 p-2"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Complaint */}
            <div>
              <h3 className="text-sm text-muted-foreground mb-2">Complaint</h3>
              <p className="font-medium">User reported missing drink from order</p>
            </div>

            {/* Attachments */}
            <div>
              <h3 className="text-sm text-muted-foreground mb-3">Attachments:</h3>
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center relative">
                      <span className="text-xs text-gray-500">IMG</span>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="bg-[#003366] text-white hover:bg-[#003366]/90">
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <h3 className="text-sm font-medium mb-3">Order summary</h3>
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-2 border-b">
                  <div className="grid grid-cols-3 gap-4 text-sm font-medium">
                    <div>Items</div>
                    <div>Vendor</div>
                    <div>Rider</div>
                  </div>
                </div>
                <div className="px-4 py-3">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="space-y-1">
                      <div>2x Coke</div>
                      <div>2x Fried rice,</div>
                      <div>2x Chicken,</div>
                      <div>2x Coleslaw</div>
                    </div>
                    <div className="space-y-1">
                      <div>Chicken Republic</div>
                      <div>Chicken Republic</div>
                      <div>Chicken Republic</div>
                      <div>Chicken Republic</div>
                    </div>
                    <div className="space-y-1">
                      <div>RID-101 Usman Habeeb</div>
                      <div>RID-101 Usman Habeeb</div>
                      <div>RID-101 Usman Habeeb</div>
                      <div>RID-101 Usman Habeeb</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action */}
            <div>
              <h3 className="text-sm text-muted-foreground mb-2">Action</h3>
              <p className="font-medium">Partial Refunded - ₦10,000.00</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Review Dispute Modal */}
      <Dialog open={isReviewDisputeOpen} onOpenChange={setIsReviewDisputeOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader className="bg-[#003366] text-white p-6 -m-6 mb-6 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-xl font-semibold">Review dispute - Disp-101</DialogTitle>
                <p className="text-sm text-blue-100 mt-1">Lorem ipsum dolor adiuvat coartem</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsReviewDisputeOpen(false)}
                className="text-white hover:bg-white/20 p-2"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Complaint */}
            <div>
              <h3 className="text-sm text-muted-foreground mb-2">Complaint</h3>
              <p className="font-medium">User reported missing drink from order</p>
            </div>

            {/* Attachments */}
            <div>
              <h3 className="text-sm text-muted-foreground mb-3">Attachments:</h3>
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center relative">
                      <span className="text-xs text-gray-500">IMG</span>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="bg-[#003366] text-white hover:bg-[#003366]/90">
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <h3 className="text-sm font-medium mb-3">Order summary</h3>
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-2 border-b">
                  <div className="grid grid-cols-3 gap-4 text-sm font-medium">
                    <div>Items</div>
                    <div>Vendor</div>
                    <div>Rider</div>
                  </div>
                </div>
                <div className="px-4 py-3">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="space-y-1">
                      <div>2x Coke</div>
                      <div>2x Fried rice,</div>
                      <div>2x Chicken,</div>
                      <div>2x Coleslaw</div>
                    </div>
                    <div className="space-y-1">
                      <div>Chicken Republic</div>
                      <div>Chicken Republic</div>
                      <div>Chicken Republic</div>
                      <div>Chicken Republic</div>
                    </div>
                    <div className="space-y-1">
                      <div>RID-101 Usman Habeeb</div>
                      <div>RID-101 Usman Habeeb</div>
                      <div>RID-101 Usman Habeeb</div>
                      <div>RID-101 Usman Habeeb</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button
                className="bg-gray-700 hover:bg-gray-800 text-white"
                onClick={() => setIsReviewDisputeOpen(false)}
              >
                Refund Order
              </Button>
              <Button
                variant="outline"
                className="bg-gray-100 hover:bg-gray-200 text-gray-700"
                onClick={() => setIsReviewDisputeOpen(false)}
              >
                Partial Refund
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={() => setIsReviewDisputeOpen(false)}
              >
                Reject Refund
              </Button>
              <Button
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-800"
                onClick={() => setIsReviewDisputeOpen(false)}
              >
                Issue Credit / Gift Card
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Orders;