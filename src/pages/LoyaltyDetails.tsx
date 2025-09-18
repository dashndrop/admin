import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Copy, Star } from "lucide-react";
import profileIcon from "/img/profile.png";
import { useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export default function LoyaltyDetails() {
  const { id } = useParams();
  const { toast } = useToast();

  const user = {
    id: id || "102938",
    name: "Mariam Ajani",
    email: "Mariam@gmail.com",
    phone: "+234 802 123 4567",
    lastActive: "Aug 20, 2025 — 10:32am",
    pointsBalance: "12,300",
    totalEarned: "17,300",
    redeemed: "5,000",
  };

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({ description: `${label} copied` });
  };

  const rows = [
    { date: "Aug 18, 2025", action: "Earned", points: "+ 50", reason: "Order ORD-993", admin: "System" },
    { date: "Aug 10, 2025", action: "Deducted", points: "- 200", reason: "Refund Adjustment", admin: "Admin Mary" },
    { date: "Jul 10, 2025", action: "Manual Add", points: "+ 100", reason: "Goodwill Credit", admin: "Super Admin tunde" },
  ];

  return (
    <div className="space-y-6">
      {/* Profile Summary */}
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
            <span className="hidden md:block absolute top-0 bottom-0 w-px bg-gray-200" style={{ left: "20%" }} />
            <span className="hidden md:block absolute top-0 bottom-0 w-px bg-gray-200" style={{ left: "40%" }} />
            <span className="hidden md:block absolute top-0 bottom-0 w-px bg-gray-200" style={{ left: "60%" }} />
            <span className="hidden md:block absolute top-0 bottom-0 w-px bg-gray-200" style={{ left: "80%" }} />
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div>
              <p className="text-xs text-muted-foreground">Name</p>
              <p className="mt-1">{user.name}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">User ID</p>
              <p className="mt-1">{user.id}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <div className="mt-1 flex items-center gap-2">
                <p>{user.email}</p>
                <button onClick={() => copy(user.email, "Email")} className="text-muted-foreground">
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Phone Number</p>
              <div className="mt-1 flex items-center gap-2">
                <p>{user.phone}</p>
                <button onClick={() => copy(user.phone, "Phone number")} className="text-muted-foreground">
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Last Active</p>
              <p className="mt-1">{user.lastActive}</p>
            </div>
          </div>

          {/* Row 2 aligned under 5 columns */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 border-t pt-6">
            {/* <div className="md:col-start-1">
              <p className="text-xs text-muted-foreground">Last Active</p>
              <p className="mt-1">{user.lastActive}</p>
            </div> */}
          </div>

          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
            <div className="flex items-center justify-between p-4 rounded-md bg-muted/30">
              <div>
                <p className="text-xs text-muted-foreground">Points Balance</p>
                <p className="mt-1 flex items-center gap-1">{user.pointsBalance}<Star className="h-4 w-4 text-yellow-500 fill-current" /></p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-md bg-muted/30">
              <div>
                <p className="text-xs text-muted-foreground">Total Earned</p>
                <p className="mt-1 flex items-center gap-1">{user.totalEarned}<Star className="h-4 w-4 text-yellow-500 fill-current" /></p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-md bg-muted/30">
              <div>
                <p className="text-xs text-muted-foreground">redeemed</p>
                <p className="mt-1 flex items-center gap-1">{user.redeemed}<Star className="h-4 w-4 text-yellow-500 fill-current" /></p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* History Table */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center">
                <span className="text-lg">📄</span>
              </div>
              <div>
                <CardTitle className="text-base">History Table</CardTitle>
                <p className="text-xs text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button className="text-white" style={{ backgroundColor: "#003366" }}>Adjust Points</Button>
              <Button variant="outline" size="icon" className="h-9 w-9">↗</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-200">
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Points</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Admin</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r, i) => (
                <TableRow key={i} className="border-t">
                  <TableCell>{r.date}</TableCell>
                  <TableCell>{r.action}</TableCell>
                  <TableCell>{r.points}</TableCell>
                  <TableCell>{r.reason}</TableCell>
                  <TableCell>{r.admin}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}


