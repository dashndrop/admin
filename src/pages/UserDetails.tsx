import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Filter, ExternalLink, Star, Mail } from "lucide-react";

interface UserDetails {
  id: string;
  name: string;
  status: "Active" | "Suspended" | "Flagged";
  userId: string;
  registrationDate: string;
  email: string;
  phoneNumber: string;
  lastLogin: string;
  totalOrders: number;
  loyaltyBalance: number;
}

interface Order {
  id: string;
  date: string;
  vendor: string;
  status: "Delivered" | "Cancelled" | "Refunded";
  amount: string;
  rider: string;
}

const userDetails: UserDetails = {
  id: "1",
  name: "Mariam Ajani",
  status: "Active",
  userId: "102938",
  registrationDate: "Aug 2, 2024",
  email: "Mariam@gmail.com",
  phoneNumber: "+234 802 123 4567",
  lastLogin: "Aug 18, 2025 – 09:42am",
  totalOrders: 152,
  loyaltyBalance: 450
};

const orders: Order[] = [
  {
    id: "100987",
    date: "Aug 18, 2025",
    vendor: "ChopLife Kitchen",
    status: "Delivered",
    amount: "₦10,000.00",
    rider: "Rider 210"
  },
  {
    id: "100982",
    date: "Aug 16, 2025",
    vendor: "FreshMart Grocery",
    status: "Cancelled",
    amount: "₦10,000.00",
    rider: "Rider 100"
  },
  {
    id: "100982",
    date: "Aug 13, 2025",
    vendor: "Medix Pharmacy",
    status: "Refunded",
    amount: "₦10,000.00",
    rider: "Rider 218"
  }
];

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user] = useState<UserDetails>(userDetails);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Suspended":
        return "bg-red-100 text-red-800";
      case "Flagged":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-gray-100 text-gray-800";
      case "Refunded":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/users")}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h1 className="text-xl font-semibold">{user.name}</h1>
              <Badge className={`${getStatusColor(user.status)} text-xs`}>
                {user.status}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button className="bg-gray-700 hover:bg-gray-800 text-white">
            Suspend User
          </Button>
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            Reset password
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Send Email
          </Button>
        </div>
      </div>

      {/* Profile Information */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="w-6 h-6 bg-primary rounded text-primary-foreground text-sm flex items-center justify-center">
              👤
            </div>
            Profile Information
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">User Name</p>
              <p className="font-medium">{user.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">User ID</p>
              <p className="font-medium">{user.userId}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Registration Date</p>
              <p className="font-medium">{user.registrationDate}</p>
            </div>
            <div className="flex items-center gap-2">
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-center gap-2">
              <div>
                <p className="text-sm text-muted-foreground">Phone Number</p>
                <p className="font-medium">{user.phoneNumber}</p>
              </div>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </div>
            <div></div>
            <div>
              <p className="text-sm text-muted-foreground">Last Login</p>
              <p className="font-medium">{user.lastLogin}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Orders</p>
              <p className="font-medium">{user.totalOrders}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order History */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="w-6 h-6 bg-primary rounded text-primary-foreground text-sm flex items-center justify-center">
                  📋
                </div>
                Order History
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
                Export
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Rider</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.vendor}</TableCell>
                  <TableCell>
                    <Badge className={`${getOrderStatusColor(order.status)} text-xs`}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.amount}</TableCell>
                  <TableCell>{order.rider}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      className="text-blue-600 hover:text-blue-700 p-0 h-auto"
                    >
                      View →
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Loyalty Balance & Adjustments */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="w-6 h-6 bg-primary rounded text-primary-foreground text-sm flex items-center justify-center">
                  💰
                </div>
                Loyalty Balance & Adjustments
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Adjust point
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Balance Card:</p>
            <div className="flex items-center gap-2 text-2xl font-bold">
              <span>{user.loyaltyBalance}</span>
              <Star className="h-6 w-6 text-yellow-500 fill-current" />
            </div>
          </div>
          
          <div className="mt-6">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Date</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Points</TableHead>
                  <TableHead>Reason</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* No data shown in the design */}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}