import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Filter, Mail, Phone, Copy, Star, TrendingUp, TrendingDown } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import profileIcon from "/img/profile.png";
import riderPerformanceIcon from "/img/riderperformance.png";
import deliveryIcon from "/img/delivery.png";
import onTimeIcon from "/img/On-TimeDeliveryRate.png";
import avgTimeIcon from "/img/AvgDeliveryTime.png";
import cancellationIcon from "/img/CancellationRate.png";
import customerRatingIcon from "/img/CustomerRating.png";
import deliveryHistoryIcon from "/img/deliveryhistory.png";
import exportIcon from "/img/exporrt.png";

export default function RiderDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/riders")} className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
              RD
            </div>
            <div>
            <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                Active
              </span>
              <h1 className="text-xl font-semibold">Rider {id}</h1>
            
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button className="bg-gray-700 hover:bg-gray-800 text-white">Suspend Rider</Button>
          <Button className="bg-red-600 hover:bg-red-700 text-white">Reset password</Button>
          <Button className="text-white hover:brightness-110" style={{ backgroundColor: "#003366" }}>Send Notification</Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <img src={profileIcon} alt="Profile" className="w-10 h-10" />
            Profile Information
          </CardTitle>
          <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
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
                <p className="text-sm text-muted-foreground">Rider Name</p>
                <p className="font-medium">Qudus Ajase</p>
              </div>
              <div className="relative md:pl-8">
                <p className="text-sm text-muted-foreground">User ID</p>
                <p className="font-medium">DRDR-101</p>
              </div>
              <div className="relative md:pl-8">
                <p className="text-sm text-muted-foreground">Registration Date</p>
                <p className="font-medium">Aug 2, 2024</p>
              </div>
              <div className="flex items-center gap-2 relative md:pl-8">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">Qudusajase@gmail.com</p>
                </div>
                <Mail className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex items-center gap-2 relative md:pl-8">
                <div>
                  <p className="text-sm text-muted-foreground">Phone Number</p>
                  <p className="font-medium">+234 802 123 4567</p>
                </div>
                <button
                  aria-label="Copy phone number"
                  className="p-1 rounded hover:bg-muted text-muted-foreground"
                  onClick={() => {
                    navigator.clipboard.writeText("+234 802 123 4567");
                    toast({ description: "Phone number copied" });
                  }}
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Row 2 (aligned under the 5 columns above) */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 border-t pt-6">
              <div className="md:col-start-1">
                <p className="text-sm text-muted-foreground">Last Active</p>
                <p className="font-medium">Aug 20, 2025 – 10:32am</p>
              </div>
              <div className="relative md:pl-8 md:col-start-2">
                <p className="text-sm text-muted-foreground">Vehicle Type</p>
                <p className="font-medium">Motorcycle (Honda 125cc)</p>
              </div>
              <div className="relative md:pl-8 md:col-start-3">
                <p className="text-sm text-muted-foreground">License Status</p>
                <p className="font-medium">Verified ✅</p>
              </div>
              <div className="relative md:pl-8 md:col-start-4">
                <p className="text-sm text-muted-foreground">Zone Assigned</p>
                <p className="font-medium">Lagos Mainland</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <img src={riderPerformanceIcon} alt="Rider Performance" className="w-10 h-10" />
            <div>
              <CardTitle className="text-lg">Rider Performance</CardTitle>
              <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mt-5">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <img src={deliveryIcon} alt="Deliveries" className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Deliveries Completed</p>
                <div className="flex items-center gap-2">
                  <p className=" font-semibold">1,230</p>
                  <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs text-white bg-green-500">
                    <TrendingUp className="h-3 w-3" /> 5.3%
                  </span>
                </div>
              </div>
            </div>

            <div className="relative flex items-center gap-4 pl-6 md:pl-8">
              <span className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-gray-200" />
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <img src={onTimeIcon} alt="On-Time Delivery" className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">On-Time Delivery Rate</p>
                <div className="flex items-center gap-2">
                  <p className=" font-semibold">92%</p>
                  <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs text-white bg-red-500">
                    <TrendingDown className="h-3 w-3" /> 5.3%
                  </span>
                </div>
              </div>
            </div>

            <div className="relative flex items-center gap-4 pl-6 md:pl-8">
              <span className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-gray-200" />
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <img src={avgTimeIcon} alt="Avg Delivery Time" className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Delivery Time</p>
                <div className="flex items-center gap-2">
                  <p className=" font-semibold">10 mins</p>
                  <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs text-white bg-green-500">
                    <TrendingUp className="h-3 w-3" /> 5.3%
                  </span>
                </div>
              </div>
            </div>

            <div className="relative flex items-center gap-4 pl-6 md:pl-8">
              <span className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-gray-200" />
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <img src={cancellationIcon} alt="Cancellation Rate" className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cancellation Rate</p>
                <div className="flex items-center gap-2">
                  <p className="font-semibold">3.5%</p>
                  <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs text-white bg-red-500">
                    <TrendingDown className="h-3 w-3" /> 5.3%
                  </span>
                </div>
              </div>
            </div>

            <div className="relative flex items-center gap-4 pl-6 md:pl-8">
              <span className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-gray-200" />
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <img src={customerRatingIcon} alt="Customer Rating" className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Customer Rating</p>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <p className=" font-semibold">4.6 (540 reviews)</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={deliveryHistoryIcon} alt="Delivery History" className="w-10 h-10" />
              <div>
                <CardTitle className="text-lg">Delivery History</CardTitle>
                <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <img src={exportIcon} alt="Export" className="w-5 h-5" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Pickup → Dropoff</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Time Taken</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { id: "ORD-993", date: "Aug 18, 2025", pickup: "ChopLife Kitchen → Customer", status: "Delivered", amount: "₦30,000.00", time: "24 mins" },
                { id: "ORD-987", date: "Aug 17, 2025", pickup: "FreshMart → Customer", status: "Cancelled", amount: "₦10,000.00", time: "-" },
                { id: "ORD-976", date: "Aug 15, 2025", pickup: "Medix Pharmacy → Customer", status: "Delivered", amount: "₦12,000.00", time: "29 mins" },
              ].map((row) => (
                <TableRow key={row.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{row.id}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.pickup}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>{row.time}</TableCell>
                  <TableCell>
                    <Button variant="ghost" className="text-black hover:text-black/70 p-0 h-auto">View →</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}


