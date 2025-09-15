import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Eye, Download } from "lucide-react";

interface VendorSettingsModalProps {
  vendor: {
    id: string;
    name: string;
  };
  type: "commission" | "threshold" | "documents";
  open: boolean;
  onClose: () => void;
}

export function VendorSettingsModal({ vendor, type, open, onClose }: VendorSettingsModalProps) {
  const [formData, setFormData] = useState({
    newRate: "",
    newThreshold: "",
    effectiveDate: ""
  });

  const getModalConfig = () => {
    switch (type) {
      case "commission":
        return {
          title: "Adjust Commission Rate",
          description: "Lorem ipsum dolor adipiscat coartem",
          currentLabel: "Current rate",
          currentValue: "15%",
          newLabel: "New rate",
          placeholder: "%",
          buttonText: "Update Rate"
        };
      case "threshold":
        return {
          title: "Adjust Payout threshold",
          description: "Lorem ipsum dolor adipiscat coartem",
          currentLabel: "Current threshold",
          currentValue: "₦300,000.00",
          newLabel: "New threshold",
          placeholder: "₦0",
          buttonText: "Update Threshold"
        };
      case "documents":
        return {
          title: "Vendor Documents",
          description: "Lorem ipsum dolor adipiscat coartem"
        };
      default:
        return {};
    }
  };

  const config = getModalConfig();

  if (type === "documents") {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader className="bg-slate-800 text-white p-6 -m-6 mb-6 rounded-t-lg">
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
              <p className="font-medium">{vendor.name}</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Business Licenses</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Registration Certificate</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Tax Identification</p>
                  <p className="text-sm text-orange-500 flex items-center gap-1">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    Missing
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader className="bg-slate-800 text-white p-6 -m-6 mb-6 rounded-t-lg">
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
            <p className="font-medium">{vendor.name}</p>
          </div>

          <div>
            <Label className="text-sm text-muted-foreground">{config.currentLabel}</Label>
            <div className="mt-1 p-3 bg-muted rounded-md">
              <p className="font-medium">{config.currentValue}</p>
            </div>
          </div>

          <div>
            <Label htmlFor={type === "commission" ? "newRate" : "newThreshold"} className="text-sm font-medium">
              {config.newLabel}
            </Label>
            <Input
              id={type === "commission" ? "newRate" : "newThreshold"}
              placeholder={config.placeholder}
              value={type === "commission" ? formData.newRate : formData.newThreshold}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                [type === "commission" ? "newRate" : "newThreshold"]: e.target.value
              }))}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="effectiveDate" className="text-sm font-medium">
              Effective Date
            </Label>
            <Input
              id="effectiveDate"
              placeholder="00 | 00 | 0000"
              value={formData.effectiveDate}
              onChange={(e) => setFormData(prev => ({ ...prev, effectiveDate: e.target.value }))}
              className="mt-1"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button className="flex-1 bg-slate-800 hover:bg-slate-700 text-white">
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