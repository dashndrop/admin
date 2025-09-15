import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

interface Vendor {
  id: string;
  name: string;
  category: string;
  salesVolume: string;
  status: "Active" | "Pending Approval" | "Suspended";
  rating: number;
  lastLogin: string;
  joinedOn: string;
}

interface VendorActionModalProps {
  vendor: Vendor;
  action: "approve" | "reject" | "suspend";
  open: boolean;
  onClose: () => void;
}

export function VendorActionModal({ vendor, action, open, onClose }: VendorActionModalProps) {
  const [formData, setFormData] = useState({
    commissionRate: "15",
    category: vendor.category,
    reason: "",
    suspensionReason: "Fraud",
    notes: "",
    sendEmailNotification: false,
  });

  const getModalConfig = () => {
    switch (action) {
      case "approve":
        return {
          title: "Approve vendor!",
          description: "Lorem ipsum dolor adipiscat coartem",
          buttonText: "Approve",
          buttonVariant: "default" as const,
          headerColor: "bg-blue-600",
        };
      case "reject":
        return {
          title: "Reject vendor!",
          description: "Lorem ipsum dolor adipiscat coartem",
          buttonText: "Reject",
          buttonVariant: "destructive" as const,
          headerColor: "bg-blue-600",
        };
      case "suspend":
        return {
          title: "Suspend vendor!",
          description: "Lorem ipsum dolor adipiscat coartem",
          buttonText: "Suspend",
          buttonVariant: "secondary" as const,
          headerColor: "bg-blue-600",
        };
    }
  };

  const config = getModalConfig();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader className={`${config.headerColor} text-white p-6 -m-6 mb-6 rounded-t-lg`}>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-lg font-semibold">{config.title}</DialogTitle>
              <p className="text-sm text-slate-300 mt-1">{config.description}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-slate-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label className="text-sm text-muted-foreground">Business Name</Label>
            <p className="font-medium">Chicken republic</p>
          </div>

          {action === "approve" && (
            <>
              <div>
                <Label htmlFor="commission">Commission Rate (%)</Label>
                <Input
                  id="commission"
                  value={formData.commissionRate}
                  onChange={(e) => setFormData(prev => ({ ...prev, commissionRate: e.target.value }))}
                />
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <span className="w-1 h-1 bg-muted-foreground rounded-full"></span>
                  Applied on all orders
                </p>
              </div>

              <div>
                <Label htmlFor="category">Select Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Restaurant">Restaurant</SelectItem>
                    <SelectItem value="Pharmacy">Pharmacy</SelectItem>
                    <SelectItem value="Grocery">Grocery</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {action === "reject" && (
            <>
              <div>
                <Label htmlFor="reason">Reason for Rejection</Label>
                <Textarea
                  id="reason"
                  placeholder="Type here"
                  value={formData.reason}
                  onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="email-notification"
                  checked={formData.sendEmailNotification}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, sendEmailNotification: checked as boolean }))}
                />
                <Label htmlFor="email-notification" className="text-sm">
                  Send email notification
                </Label>
              </div>
            </>
          )}

          {action === "suspend" && (
            <>
              <div>
                <Label htmlFor="suspensionReason">Reason for Suspension</Label>
                <Select
                  value={formData.suspensionReason}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, suspensionReason: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fraud">Fraud</SelectItem>
                    <SelectItem value="Policy Violation">Policy Violation</SelectItem>
                    <SelectItem value="Quality Issues">Quality Issues</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="notes">Notes (optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Type here"
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="email-notification"
                  checked={formData.sendEmailNotification}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, sendEmailNotification: checked as boolean }))}
                />
                <Label htmlFor="email-notification" className="text-sm">
                  Send email notification
                </Label>
              </div>
            </>
          )}

          <div className="flex gap-2 pt-4">
            <Button
              variant={config.buttonVariant}
              className={`flex-1 ${
                action === "approve" 
                  ? "bg-green-500 hover:bg-green-600 text-white" 
                  : action === "suspend" 
                    ? "bg-blue-600 hover:bg-blue-700 text-white" 
                    : ""
              }`}
              onClick={() => {
                // Handle action
                onClose();
              }}
            >
              {config.buttonText}
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}