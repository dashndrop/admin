import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Star, ChevronRight, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  Area,
  Line,
} from "recharts";

const activityData = [
  { name: "Aug", issued: 60000, redeemed: 40000 },
  { name: "Sep", issued: 80000, redeemed: 50000 },
  { name: "Oct", issued: 70000, redeemed: 45000 },
  { name: "Nov", issued: 95000, redeemed: 70000 },
  { name: "Dec", issued: 90000, redeemed: 80000 },
];

const engagementData = [
  { name: "Aug", users: 1000 },
  { name: "Sep", users: 1800 },
  { name: "Oct", users: 2600 },
  { name: "Nov", users: 3200 },
  { name: "Dec", users: 4000 },
];

const distributionData = [
  { name: "Orders", value: 5000 },
  { name: "Promotions", value: 180000 },
  { name: "Goodwill", value: 72000 },
];

const distributionColors = ["#F28C28", "#6C63FF", "#4CC2FF"];

type TopUser = {
  id: string;
  name: string;
  points: string;
  orders: number;
  last: string;
};

const miniTopUsers: TopUser[] = [
  { id: "Mariam...", name: "Mariam Ajani", points: "5,000", orders: 150, last: "Aug 18." },
  { id: "John D...", name: "John D...", points: "9,820", orders: 87, last: "Aug 18." },
  { id: "Abik K...", name: "Abik K...", points: "5,800", orders: 1100, last: "Aug 18." },
];

const tableUsers: Array<TopUser & { userId: string }> = Array.from({ length: 10 }).map((_, i) => ({
  id: String(i + 1),
  userId: "U-120",
  name: "Mariam Ajani",
  points: "12,300",
  orders: 125,
  last: "Aug 19, 2025",
}));

export default function Loyalty() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Loyalty & Rewards</h1>
        <p className="text-sm text-muted-foreground ">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-5">
            <p className="text-xs text-muted-foreground">Total Points Issued</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold">1.2M</span>
              <span className="text-xs text-muted-foreground">Points</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs text-muted-foreground">Total Points Redeemed</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold">860K</span>
              <span className="text-xs text-muted-foreground">Points</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs text-muted-foreground">Active Users (earning points)</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold">4,320</span>
              <span className="text-xs text-muted-foreground">Users</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs text-muted-foreground">Pending Redemptions</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold">320</span>
              <span className="text-xs text-muted-foreground">Requests</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs text-muted-foreground">Avg. Redemption Rate</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold">72%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <Card className="lg:col-span-1">
          <CardHeader className="pb-0">
            <CardTitle className="text-sm">Activity - Points Issued v Redeemed</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} ticks={[0,25000,50000,100000]} tickFormatter={(v) => v === 0 ? "0" : `${v/1000}k`} />
                  <Tooltip cursor={{ fill: "rgba(0,0,0,0.03)" }} />
                  <Bar dataKey="issued" name="Issued" fill="#F28C28" radius={[4,4,0,0]} barSize={16} />
                  <Bar dataKey="redeemed" name="Redeemed" fill="#22C55E" radius={[4,4,0,0]} barSize={16} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader className="pb-0">
            <CardTitle className="text-sm">Engagements - New Earning Users</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={engagementData}>
                  <defs>
                    <linearGradient id="engageGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6C63FF" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#6C63FF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} domain={[0, 4000]} ticks={[0,1000,2000,3000,4000]} />
                  <Tooltip cursor={{ stroke: "#E5E7EB" }} />
                  <Area type="monotone" dataKey="users" stroke={"#6C63FF"} fillOpacity={1} fill="url(#engageGradient)" />
                  <Line type="monotone" dataKey="users" stroke="#6C63FF" strokeWidth={2} dot={{ r: 3 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader className="pb-0">
            <CardTitle className="text-sm">Points Distribution - By Category</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={distributionData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={76} paddingAngle={3} stroke="none">
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={distributionColors[index % distributionColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 space-y-1 text-xs">
              <div className="flex items-center gap-2"><span className="inline-block w-2 h-2 rounded-sm" style={{backgroundColor: distributionColors[0]}} /> Orders: <span className="ml-auto text-muted-foreground">5000+</span></div>
              <div className="flex items-center gap-2"><span className="inline-block w-2 h-2 rounded-sm" style={{backgroundColor: distributionColors[1]}} /> Promotions: <span className="ml-auto text-muted-foreground">180k+</span></div>
              <div className="flex items-center gap-2"><span className="inline-block w-2 h-2 rounded-sm" style={{backgroundColor: distributionColors[2]}} /> Goodwill: <span className="ml-auto text-muted-foreground">720k+</span></div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader className="pb-0">
            <CardTitle className="text-sm">Top Users</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-xs rounded-md overflow-hidden border">
              <div className="grid grid-cols-4 bg-[#E5E7EB] px-3 py-2 text-muted-foreground">
                <div>User</div>
                <div className="text-right">Point. Bal</div>
                <div className="text-right">Orders</div>
                <div className="text-right">Last Red</div>
              </div>
              {miniTopUsers.map((u, idx) => (
                <div key={idx} className="grid grid-cols-4 items-center px-3 py-3 border-t">
                  <div className="truncate pr-2">{u.name}</div>
                  <div className="flex items-center justify-end gap-1"><span>{u.points}</span><Star className="h-3 w-3 text-yellow-500 fill-current" /></div>
                  <div className="text-right">{u.orders}</div>
                  <div className="text-right">{u.last}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Users Table */}
      <Card>
        <CardHeader className="pb-0">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-sm border flex items-center justify-center text-muted-foreground"><ChevronDown className="h-3 w-3" /></div>
            <div>
              <CardTitle className="text-sm">Top Users</CardTitle>
              <p className="text-xs text-muted-foreground pb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-[#E5E7EB]">
                <TableHead className="w-10"><Checkbox className="h-4 w-4" /></TableHead>
                <TableHead>User ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Points Balance</TableHead>
                <TableHead>Orders Completed</TableHead>
                <TableHead>Last Redemption</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableUsers.map((u, i) => (
                <TableRow key={i} className="hover:bg-muted/50">
                  <TableCell><Checkbox className="h-4 w-4" /></TableCell>
                  <TableCell>{u.userId}</TableCell>
                  <TableCell>{u.name}</TableCell>
                  <TableCell className="flex items-center gap-1">{u.points} <Star className="h-3 w-3 text-yellow-500 fill-current" /></TableCell>
                  <TableCell>{u.orders}</TableCell>
                  <TableCell>{u.last}</TableCell>
                  <TableCell>
                    <button onClick={() => navigate(`/loyalty/${i+1}`)} className="inline-flex items-center gap-1 text-black hover:text-black/70">View <ChevronRight className="h-3 w-3" /></button>
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

