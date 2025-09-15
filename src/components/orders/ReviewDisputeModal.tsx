import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { X, Package, User, Clock, AlertTriangle } from "lucide-react";
import { useState } from "react";

interface ReviewDisputeModalProps {
  dispute: any;
  isOpen: boolean;
  onClose: () => void;
}

export function ReviewDisputeModal({ dispute, isOpen, onClose }: ReviewDisputeModalProps) {
  const [resolution, setResolution] = useState("");

  if (!dispute) return null;

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      "Open": "destructive",
      "Resolved": "default",
    };
    return <Badge variant={variants[status] || "outline"}>{status}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      "High": "destructive",
      "Medium": "secondary",
      "Low": "default",
    };
    return <Badge variant={variants[priority] || "default"}>{priority}</Badge>;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-xl font-semibold">Review Dispute</DialogTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-6">
          {/* Dispute Header */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  <div>
                    <CardTitle className="text-lg">{dispute.id}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Created on {dispute.dateCreated}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getPriorityBadge(dispute.priority)}
                  {getStatusBadge(dispute.status)}
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Order ID</p>
                  <p className="font-medium">{dispute.orderId}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Amount</p>
                  <p className="font-medium">{dispute.amount}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Customer</p>
                  <p className="font-medium">{dispute.user}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Vendor</p>
                  <p className="font-medium">{dispute.vendor}</p>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Dispute Reason</p>
                <p className="text-sm">{dispute.reason}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Description</p>
                <p className="text-sm">{dispute.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Name</p>
                  <p className="font-medium">{dispute.user}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="font-medium">john.smith@email.com</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Phone</p>
                  <p className="font-medium">+234 810 123 4567</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Orders</p>
                  <p className="font-medium">47 orders</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resolution */}
          <Card>
            <CardHeader>
              <CardTitle>Resolution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Resolution Notes
                </label>
                <Textarea
                  placeholder="Add resolution notes..."
                  value={resolution}
                  onChange={(e) => setResolution(e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              variant="destructive"
              className="bg-destructive hover:bg-destructive/90"
            >
              Reject Claim
            </Button>
            <Button 
              variant="secondary"
              className="bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              Request Info
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              Approve Refund
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}