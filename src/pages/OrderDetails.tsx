import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Copy, User, Store, Truck, ClipboardList, CreditCard, CheckCircle, MapPin, Clock, ShoppingBag, User as UserIcon, Phone, Mail, ChevronDown } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiServices } from "@/lib/api-services";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DeliveryLoader } from "@/components/ui/delivery-loader";

export default function OrderDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [assignOpen, setAssignOpen] = useState(false);
  const [selectedRider, setSelectedRider] = useState<string>("");

  const { data: riders = [], isLoading: ridersLoading } = useQuery({
    queryKey: ["riders-for-assign"],
    queryFn: () => apiServices.getRiders({ page: 1, page_size: 50, available: true })
  });

  const assignMutation = useMutation({
    mutationFn: () => apiServices.assignOrderToRider(id as string, selectedRider),
    onSuccess: () => {
      toast({ description: "Rider assigned successfully" });
      setAssignOpen(false);
      setSelectedRider("");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (e: any) => toast({ description: typeof e?.message === 'string' ? e.message : JSON.stringify(e) })
  });

  const completeMutation = useMutation({
    mutationFn: () => apiServices.completeOrder(id as string),
    onSuccess: () => {
      toast({ description: "Order marked complete" });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (e: any) => toast({ description: e?.message || "Failed to complete order" })
  });

  const orderData = {
    id: "DDRD-101",
    status: "In Transit",
    pickupTime: "09:30",
    estimatedDropOff: "09:50",
    timeRemaining: "00:10",
    overtime: "00:00",
    customer: {
      name: "Mariam Ajani",
      userId: "102938",
      email: "Mariam@gmail.com",
      phone: "+234 802 123 4567",
      location: "9. Osayemi Street, Aguda Oke-Ira ogba"
    },
    vendor: {
      name: "Chicken Republic",
      vendorId: "DNDV1000",
      category: "Restaurant",
      phone: "+234 802 123 4567",
      location: "Omole phase 1, Ojodu Berger"
    },
    rider: {
      name: "Qudus Ajase",
      riderId: "DDRD-101",
      email: "Qudusajase@gmail.com",
      phone: "+234 802 123 4567"
    },
    items: [
      { sn: 1, item: "Jollof rice combo", quantity: 2, unitPrice: "₦300.00", amount: "₦600.00" },
      { sn: 2, item: "Fried rice combo", quantity: 2, unitPrice: "₦300.00", amount: "₦10,000.00" },
      { sn: 3, item: "Chicken", quantity: 2, unitPrice: "₦1000.00", amount: "₦12,000.00" },
      { sn: 4, item: "Malt", quantity: 2, unitPrice: "₦300.00", amount: "₦12,000.00" },
      { sn: 5, item: "Pack", quantity: 2, unitPrice: "₦300.00", amount: "₦12,000.00" }
    ],
    payment: {
      amount: "₦30,000.00",
      method: "Bank transfer",
      transactionId: "1120gh76ytuio231hj72gh"
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({ description: `${label} copied` });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/orders")} className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Active Order</h1>
            <p className="text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
          </div>
        </div>
      </div>

      {/* Map & Order Status */}
      <Card>
        <CardContent className="p-0">
          <div className="relative">
            {/* Google Map */}
            <div className="h-64 relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.4!2d3.3792!3d6.5244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMzEnMjcuOCJOIDPCsDIyJzQ1LjEiRQ!5e0!3m2!1sen!2sng!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-t-lg"
              />
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <span className="bg-yellow-500 text-yellow-900 px-2 py-1 rounded text-sm font-medium">
                  {orderData.status}
                </span>
              </div>
            </div>
            
            {/* Order Metrics */}
            <div className="p-6 border-t">
              <div className="flex items-center justify-between">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Order ID</p>
                    <p className="font-medium">{orderData.id}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-black" />
                    <div>
                      <p className="text-sm text-muted-foreground">Pick up</p>
                      <p className="font-medium">{orderData.pickupTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-black" />
                    <div>
                      <p className="text-sm text-muted-foreground">Estd Drop Off</p>
                      <p className="font-medium">{orderData.estimatedDropOff}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-black" />
                    <div>
                      <p className="text-sm text-muted-foreground">Time Remaining</p>
                      <p className="font-medium text-red-600">{orderData.timeRemaining}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-black" />
                    <div>
                      <p className="text-sm text-muted-foreground">Overtime</p>
                      <p className="font-medium text-red-600">{orderData.overtime}</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="bg-[#003366] hover:bg-[#003366]/90 text-white" onClick={() => setAssignOpen(true)}>
                    Re-assign Rider
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => completeMutation.mutate()}>
                    Mark as Complete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assign Rider Modal */}
      <Dialog open={assignOpen} onOpenChange={setAssignOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Rider</DialogTitle>
          </DialogHeader>
          {ridersLoading ? (
            <DeliveryLoader label="Loading riders" />
          ) : (
            <div className="space-y-4">
              <Select value={selectedRider} onValueChange={setSelectedRider}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select rider" />
                </SelectTrigger>
                <SelectContent>
                  {(riders as any[]).map((r) => (
                    <SelectItem key={r.id} value={r.id}>{r.name} — {r.phone}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button className="bg-[#003366] hover:bg-[#003366]/90 text-white w-full" disabled={!selectedRider || assignMutation.isPending} onClick={() => assignMutation.mutate()}>
                {assignMutation.isPending ? "Assigning..." : "Assign Rider"}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Customer Info */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <User className="h-5 w-5" />
            Customer Info
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 relative">
            {/* Vertical dividers spanning both rows (desktop) */}
            <span className="hidden md:block absolute top-0 bottom-0 w-px bg-gray-200" style={{ left: "20%" }} />
            <span className="hidden md:block absolute top-0 bottom-0 w-px bg-gray-200" style={{ left: "40%" }} />
            <span className="hidden md:block absolute top-0 bottom-0 w-px bg-gray-200" style={{ left: "60%" }} />
            <span className="hidden md:block absolute top-0 bottom-0 w-px bg-gray-200" style={{ left: "80%" }} />
            
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{orderData.customer.name}</p>
              </div>
              <div className="relative md:pl-8">
                <p className="text-sm text-muted-foreground">User ID</p>
                <p className="font-medium">{orderData.customer.userId}</p>
              </div>
              <div className="flex items-center gap-2 relative md:pl-8">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{orderData.customer.email}</p>
                </div>
                <button
                  aria-label="Copy email"
                  className="p-1 rounded hover:bg-muted text-muted-foreground"
                  onClick={() => copyToClipboard(orderData.customer.email, "Email")}
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-center gap-2 relative md:pl-8">
                <div>
                  <p className="text-sm text-muted-foreground">Phone Number</p>
                  <p className="font-medium">{orderData.customer.phone}</p>
                </div>
                <button
                  aria-label="Copy phone number"
                  className="p-1 rounded hover:bg-muted text-muted-foreground"
                  onClick={() => copyToClipboard(orderData.customer.phone, "Phone number")}
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
              <div className="relative md:pl-8">
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{orderData.customer.location}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vendor Info */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Store className="h-5 w-5" />
            Vendor Info
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 relative">
            {/* Vertical dividers spanning both rows (desktop) */}
            <span className="hidden md:block absolute top-0 bottom-0 w-px bg-gray-200" style={{ left: "20%" }} />
            <span className="hidden md:block absolute top-0 bottom-0 w-px bg-gray-200" style={{ left: "40%" }} />
            <span className="hidden md:block absolute top-0 bottom-0 w-px bg-gray-200" style={{ left: "60%" }} />
            <span className="hidden md:block absolute top-0 bottom-0 w-px bg-gray-200" style={{ left: "80%" }} />
            
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{orderData.vendor.name}</p>
              </div>
              <div className="relative md:pl-8">
                <p className="text-sm text-muted-foreground">Vendor ID</p>
                <p className="font-medium">{orderData.vendor.vendorId}</p>
              </div>
              <div className="relative md:pl-8">
                <p className="text-sm text-muted-foreground">Category</p>
                <p className="font-medium">{orderData.vendor.category}</p>
              </div>
              <div className="flex items-center gap-2 relative md:pl-8">
                <div>
                  <p className="text-sm text-muted-foreground">Store Phone Number</p>
                  <p className="font-medium">{orderData.vendor.phone}</p>
                </div>
                <button
                  aria-label="Copy phone number"
                  className="p-1 rounded hover:bg-muted text-muted-foreground"
                  onClick={() => copyToClipboard(orderData.vendor.phone, "Phone number")}
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
              <div className="relative md:pl-8">
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{orderData.vendor.location}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rider Info */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Truck className="h-5 w-5" />
              Rider Info
            </CardTitle>
            <Button className="bg-[#003366] hover:bg-[#003366]/90 text-white">
              Re-assign Rider
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 relative">
            {/* Vertical dividers spanning both rows (desktop) */}
            <span className="hidden md:block absolute top-0 bottom-0 w-px bg-gray-200" style={{ left: "20%" }} />
            <span className="hidden md:block absolute top-0 bottom-0 w-px bg-gray-200" style={{ left: "40%" }} />
            <span className="hidden md:block absolute top-0 bottom-0 w-px bg-gray-200" style={{ left: "60%" }} />
            <span className="hidden md:block absolute top-0 bottom-0 w-px bg-gray-200" style={{ left: "80%" }} />
            
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{orderData.rider.name}</p>
              </div>
              <div className="relative md:pl-8">
                <p className="text-sm text-muted-foreground">Rider ID</p>
                <p className="font-medium">{orderData.rider.riderId}</p>
              </div>
              <div className="flex items-center gap-2 relative md:pl-8">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{orderData.rider.email}</p>
                </div>
                <button
                  aria-label="Copy email"
                  className="p-1 rounded hover:bg-muted text-muted-foreground"
                  onClick={() => copyToClipboard(orderData.rider.email, "Email")}
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-center gap-2 relative md:pl-8">
                <div>
                  <p className="text-sm text-muted-foreground">Phone Number</p>
                  <p className="font-medium">{orderData.rider.phone}</p>
                </div>
                <button
                  aria-label="Copy phone number"
                  className="p-1 rounded hover:bg-muted text-muted-foreground"
                  onClick={() => copyToClipboard(orderData.rider.phone, "Phone number")}
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
              <div className="relative md:pl-8">
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-medium">Active</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Details */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <ClipboardList className="h-5 w-5" />
              Order details
            </CardTitle>
            <Button variant="ghost" size="sm">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SN</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Unit Price</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderData.items.map((item) => (
                <TableRow key={item.sn}>
                  <TableCell>{item.sn}</TableCell>
                  <TableCell className="font-medium">{item.item}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.unitPrice}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                </TableRow>
              ))}
              <TableRow className="font-semibold">
                <TableCell colSpan={4}>VAT</TableCell>
                <TableCell>₦12.0</TableCell>
              </TableRow>
              <TableRow className="font-semibold">
                <TableCell colSpan={4}>Total</TableCell>
                <TableCell>₦12.0</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Payment Info */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <CreditCard className="h-5 w-5" />
              Payment Info
            </CardTitle>
            <Button className="bg-[#003366] hover:bg-[#003366]/90 text-white">
              Refund
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 relative">
            {/* Vertical dividers spanning both rows (desktop) */}
            <span className="hidden md:block absolute top-0 bottom-0 w-px bg-gray-200" style={{ left: "20%" }} />
            <span className="hidden md:block absolute top-0 bottom-0 w-px bg-gray-200" style={{ left: "40%" }} />
            <span className="hidden md:block absolute top-0 bottom-0 w-px bg-gray-200" style={{ left: "60%" }} />
            <span className="hidden md:block absolute top-0 bottom-0 w-px bg-gray-200" style={{ left: "80%" }} />
            
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Amount</p>
                <p className="font-medium text-lg">{orderData.payment.amount}</p>
              </div>
              <div className="relative md:pl-8">
                <p className="text-sm text-muted-foreground">Method</p>
                <p className="font-medium">{orderData.payment.method}</p>
              </div>
              <div className="relative md:pl-8">
                <p className="text-sm text-muted-foreground">Transaction ID</p>
                <p className="font-medium">{orderData.payment.transactionId}</p>
              </div>
              <div className="relative md:pl-8">
                <p className="text-sm text-muted-foreground">Status</p>
                <p className="font-medium">Completed</p>
              </div>
              <div className="relative md:pl-8">
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium">Aug 18, 2025</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Timeline */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <CheckCircle className="h-5 w-5" />
            Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            {["Order Placed", "Order Accepted", "Rider Assigned", "In transit", "Delivered"].map((status, index) => (
              <div key={status} className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">{status}</span>
                </div>
                {index < 4 && (
                  <div className="w-16 h-0.5 bg-green-500 mx-4"></div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
