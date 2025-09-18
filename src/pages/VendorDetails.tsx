import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, User, BarChart3, DollarSign, TrendingUp, TrendingDown, Clock, Star, Building2, Mail, Phone } from "lucide-react";
import profileIcon from "/img/profile.png";
import { VendorActionModal } from "@/components/vendors/VendorActionModal";
import { VendorSettingsModal } from "@/components/vendors/VendorSettingsModal";

interface VendorDetails {
  id: string;
  name: string;
  location: string;
  status: "Active" | "Pending Approval" | "Suspended";
  businessName: string;
  vendorId: string;
  category: string;
  businessAddress: string;
  contactPerson: {
    name: string;
    email: string;
    phone: string;
  };
  performance: {
    salesVolume: string;
    totalOrders: number;
    cancellationRate: string;
    avgDeliveryTime: string;
    customerRating: string;
  };
  financial: {
    commissionRate: string;
    payoutThreshold: string;
    lastPayout: {
      date: string;
      amount: string;
    };
  };
}

// Sample data - would come from API in real app
const vendorDetails: VendorDetails = {
  id: "1",
  name: "Chicken Republic - Omole",
  location: "Omole",
  status: "Active",
  businessName: "Chicken republic",
  vendorId: "DNDV1000",
  category: "Restaurant",
  businessAddress: "Omole phase 1, Ojodu Berger",
  contactPerson: {
    name: "Adebayo Yusuf",
    email: "Adebayosuf@gmail.com",
    phone: "+234 90 800 500 0000",
  },
  performance: {
    salesVolume: "₦300,000.00",
    totalOrders: 1230,
    cancellationRate: "3.2%",
    avgDeliveryTime: "27 mins",
    customerRating: "4.6 / 5.0",
  },
  financial: {
    commissionRate: "15%",
    payoutThreshold: "₦300,000.00",
    lastPayout: {
      date: "Aug 12, 2025",
      amount: "₦300,000.00",
    },
  },
};

export default function VendorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vendor] = useState<VendorDetails>(vendorDetails);
  const [modalState, setModalState] = useState<{
    open: boolean;
    action: "approve" | "reject" | "suspend" | null;
  }>({ open: false, action: null });
  const [settingsModal, setSettingsModal] = useState<{
    open: boolean;
    type: "commission" | "threshold" | "documents" | null;
  }>({ open: false, type: null });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 border-green-200";
      case "Pending Approval":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Suspended":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Vendor Header Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-orange-500 rounded-lg flex items-center justify-center">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <div className="flex items-center gap-3">
                <Badge className={`px-3 py-1 ${getStatusColor(vendor.status)}`}>
                  {vendor.status}
                </Badge>
                <h2 className="text-xl font-semibold">{vendor.name}</h2>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                className="bg-green-500 hover:bg-green-600 text-white"
                onClick={() => setModalState({ open: true, action: "approve" })}
              >
                Approve
              </Button>
              <Button 
                variant="destructive"
                onClick={() => setModalState({ open: true, action: "reject" })}
              >
                Reject
              </Button>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => setModalState({ open: true, action: "suspend" })}
              >
                Suspend
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Information */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <img src={profileIcon} alt="Profile" className="w-5 h-5" />
            <div>
              <CardTitle>Profile Information</CardTitle>
              <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-4 gap-8">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Business Name</p>
              <p className="font-medium">{vendor.businessName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Vendor ID</p>
              <p className="font-medium">{vendor.vendorId}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Category</p>
              <p className="font-medium">{vendor.category}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Business Address</p>
              <p className="font-medium">{vendor.businessAddress}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center shrink-0">
              <span className="text-white font-semibold text-lg">A</span>
            </div>
            <div className="grid grid-cols-3 gap-8 flex-1">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Name</p>
                <p className="font-medium">{vendor.contactPerson.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Email</p>
                <div className="flex items-center gap-2">
                  <p className="font-medium">{vendor.contactPerson.email}</p>
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Phone Number</p>
                <div className="flex items-center gap-2">
                  <p className="font-medium">{vendor.contactPerson.phone}</p>
                  <Phone className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm text-muted-foreground mb-1">Document</p>
              <Button variant="link" className="h-auto p-0 text-blue-600">
                Certificate & Licenses
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Stats */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
              <BarChart3 className="h-4 w-4 text-white" />
            </div>
            <div>
              <CardTitle>Performance Stats</CardTitle>
              <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-white" />
                </div>
                <p className="text-sm font-medium">Sales Volume</p>
              </div>
              <p className="text-2xl font-bold mb-2">{vendor.performance.salesVolume}</p>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">Last 30 Days</span>
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-4 w-4 text-white" />
                </div>
                <p className="text-sm font-medium">Total Orders Completed</p>
              </div>
              <p className="text-2xl font-bold mb-2">{vendor.performance.totalOrders.toLocaleString()}</p>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">All-Time Orders</span>
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                  <TrendingDown className="h-4 w-4 text-white" />
                </div>
                <p className="text-sm font-medium">Cancellation Rate</p>
              </div>
              <p className="text-2xl font-bold text-green-500 mb-2">{vendor.performance.cancellationRate}</p>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">of total orders</span>
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                  <Clock className="h-4 w-4 text-white" />
                </div>
                <p className="text-sm font-medium">Avg. Delivery Time</p>
              </div>
              <p className="text-2xl font-bold text-yellow-500 mb-2">{vendor.performance.avgDeliveryTime}</p>
              <div className="flex items-center gap-1">
                <span className="h-3 w-3 text-yellow-500">↓</span>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">Across 312 orders</span>
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                  <Star className="h-4 w-4 text-white" />
                </div>
                <p className="text-sm font-medium">Customer Rating</p>
              </div>
              <p className="text-2xl font-bold text-green-500 mb-2">{vendor.performance.customerRating}</p>
              <div className="flex items-center gap-1">
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">Based on 540 reviews</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-white" />
            </div>
            <div>
              <CardTitle>Financial Settings</CardTitle>
              <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-sm text-muted-foreground mb-3">Commission Rate (%)</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold mb-1">{vendor.financial.commissionRate}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                    Applied on all orders
                  </p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Edit</Button>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-3">Payout Threshold (₦)</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold mb-1">{vendor.financial.payoutThreshold}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                    Vendors receive payout once balance exceeds threshold
                  </p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Edit</Button>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-6 pt-4 border-t">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center shrink-0">
              <DollarSign className="h-5 w-5 text-white" />
            </div>
            <div className="grid grid-cols-3 gap-8 flex-1">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Last Payout</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Date</p>
                <p className="font-medium">{vendor.financial.lastPayout.date}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Amount</p>
                <p className="font-medium">{vendor.financial.lastPayout.amount}</p>
              </div>
            </div>
            <div className="shrink-0">
              <p className="text-sm text-muted-foreground mb-1">Action</p>
              <Button variant="link" className="h-auto p-0 text-blue-600">
                View Payout History
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {modalState.action && (
        <VendorActionModal
          vendor={{
            id: vendor.id,
            name: vendor.name,
            category: vendor.category,
            salesVolume: vendor.performance.salesVolume,
            status: vendor.status,
            rating: parseFloat(vendor.performance.customerRating.split(' ')[0]),
            lastLogin: "2 hours ago",
            joinedOn: "Jan 15, 2024"
          }}
          action={modalState.action}
          open={modalState.open}
          onClose={() => setModalState({ open: false, action: null })}
        />
      )}

      {settingsModal.type && (
        <VendorSettingsModal
          vendor={{
            id: vendor.id,
            name: vendor.name
          }}
          type={settingsModal.type}
          open={settingsModal.open}
          onClose={() => setSettingsModal({ open: false, type: null })}
        />
      )}
    </div>
  );
}