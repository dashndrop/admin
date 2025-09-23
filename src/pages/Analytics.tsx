import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Star } from "lucide-react";
import { useState } from "react";

export default function Analytics() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("vendor");

  const platformMetrics = [
    { title: "Total Revenue (MTD)", value: "₦100k", subtitle: "Points" },
    { title: "Orders Completed (MTD)", value: "12.6K", subtitle: "Points" },
    { title: "Active Vendors", value: "1,240", subtitle: "Users" },
    { title: "Active Riders", value: "320", subtitle: "Requests" },
    { title: "Customer Satisfaction", value: "72%", subtitle: "" },
  ];

  const chartPlaceholders = [
    { title: "Revenue Over Time" },
    { title: "Orders by Category" },
    { title: "Satisfaction Index" },
    { title: "Geographic Heatmap" },
  ];

  const topVendor = {
    name: "ChopLife Kitchen",
    revenue: "₦100k",
    orders: "1,240",
    rating: "4.6",
    commission: "₦100k",
  };

  const topRider = {
    name: "DDRD-101 Qudus",
    avgDeliveryTime: "26 mins",
    onTimeDelivery: "92%",
    churnRate: "80%",
    completedDeliveries: "340",
  };

  const riderData = [
    { rider: "Rider 210", deliveries: "340", avgTime: "26 mins", onTime: "92%", rating: "4.6", complaints: "1" },
    { rider: "Rider 230", deliveries: "340", avgTime: "26 mins", onTime: "92%", rating: "4.6", complaints: "1" },
    { rider: "Rider 110", deliveries: "340", avgTime: "26 mins", onTime: "92%", rating: "4.6", complaints: "1" },
    { rider: "Rider 080", deliveries: "340", avgTime: "26 mins", onTime: "92%", rating: "4.6", complaints: "1" },
    { rider: "Rider 405", deliveries: "340", avgTime: "26 mins", onTime: "92%", rating: "4.6", complaints: "1" },
    { rider: "Rider 333", deliveries: "340", avgTime: "26 mins", onTime: "92%", rating: "4.6", complaints: "1" },
    { rider: "Rider 001", deliveries: "340", avgTime: "26 mins", onTime: "92%", rating: "4.6", complaints: "1" },
    { rider: "Rider 210", deliveries: "340", avgTime: "26 mins", onTime: "92%", rating: "4.6", complaints: "1" },
    { rider: "Rider 210", deliveries: "340", avgTime: "26 mins", onTime: "92%", rating: "4.6", complaints: "1" },
  ];

  const vendorRevenueData = [
    { name: "Choplife", revenue: 380000 },
    { name: "Fresh Mart", revenue: 320000 },
    { name: "Medwin", revenue: 280000 },
    { name: "Chicken", revenue: 250000 },
    { name: "Dominos", revenue: 220000 },
    { name: "Book Us", revenue: 200000 },
    { name: "Tasty Fri", revenue: 180000 },
    { name: "Sunny D", revenue: 150000 },
    { name: "Lorem", revenue: 120000 },
    { name: "Delicio", revenue: 100000 },
  ];

  const vendorGrowthData = [
    { month: "Jan", growth: 50000 },
    { month: "Feb", growth: 75000 },
    { month: "Mar", growth: 60000 },
    { month: "April", growth: 90000 },
    { month: "May", growth: 110000 },
    { month: "June", growth: 130000 },
    { month: "July", growth: 180000 },
    { month: "Aug", growth: 200000 },
    { month: "Sep", growth: 150000 },
    { month: "Nov", growth: 120000 },
  ];

  return (
    <div className="space-y-6">
      {/* Platform Performance */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-900 rounded-md flex items-center justify-center">
              <Star className="h-4 w-4 text-white" />
            </div>
            <div>
              <CardTitle className="text-base">Platform Performance</CardTitle>
              <p className="text-xs text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {platformMetrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground">{metric.title}</p>
                  <div className="text-2xl font-bold mt-1">{metric.value}</div>
                  {metric.subtitle && (
                    <p className="text-xs text-muted-foreground mt-1">{metric.subtitle}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {chartPlaceholders.map((chart, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">{chart.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 bg-gray-50 rounded-md flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Chart placeholder</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Insights Section */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-900 rounded-md flex items-center justify-center">
              <Star className="h-4 w-4 text-white" />
            </div>
            <div>
              <CardTitle className="text-base">Insights</CardTitle>
              <p className="text-xs text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="vendor">Vendor</TabsTrigger>
              <TabsTrigger value="rider">Rider</TabsTrigger>
              <TabsTrigger value="user">User</TabsTrigger>
            </TabsList>
            <TabsContent value="vendor" className="mt-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Top Vendor</span>
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{topVendor.name}</span>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div>
                      <span className="text-muted-foreground">Revenue: </span>
                      <span className="font-medium">{topVendor.revenue}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Orders: </span>
                      <span className="font-medium">{topVendor.orders}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground">Avg Rating: </span>
                      <span className="font-medium">{topVendor.rating}</span>
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    </div>
                    <div>
                      <span className="text-muted-foreground">Commission Paid: </span>
                      <span className="font-medium">{topVendor.commission}</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="rider" className="mt-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Top Rider</span>
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{topRider.name}</span>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div>
                      <span className="text-muted-foreground">Avg Delivery Time: </span>
                      <span className="font-medium">{topRider.avgDeliveryTime}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">On-Time Delivery %: </span>
                      <span className="font-medium">{topRider.onTimeDelivery}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Rider Churn Rate (%): </span>
                      <span className="font-medium">{topRider.churnRate}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Completed Deliveries: </span>
                      <span className="font-medium">{topRider.completedDeliveries}</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="user" className="mt-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">User insights coming soon...</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Performance Table - Shows based on active tab */}
      {activeTab === "rider" && (
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-900 rounded-md flex items-center justify-center">
                <Star className="h-4 w-4 text-white" />
              </div>
              <div>
                <CardTitle className="text-base">Vendors Performance</CardTitle>
                <p className="text-xs text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-200">
                  <TableHead>Rider</TableHead>
                  <TableHead>Completed Deliveries</TableHead>
                  <TableHead>Avg. Time</TableHead>
                  <TableHead>On-Time %</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Complaints</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {riderData.map((rider, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{rider.rider}</TableCell>
                    <TableCell>{rider.deliveries}</TableCell>
                    <TableCell>{rider.avgTime}</TableCell>
                    <TableCell>{rider.onTime}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span>{rider.rating}</span>
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      </div>
                    </TableCell>
                    <TableCell>{rider.complaints}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4">
              <PaginationControls
                currentPage={currentPage}
                totalPages={10}
                onPageChange={setCurrentPage}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top 10 Vendors by Revenue */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Top 10 Vendors by Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={vendorRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* New Vendor Growth */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">New Vendor Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={vendorGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="growth" stroke="#f59e0b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
