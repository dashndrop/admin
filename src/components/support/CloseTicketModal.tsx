import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { X, CheckCircle } from "lucide-react";

interface CloseTicketModalProps {
  ticket: any;
  isOpen: boolean;
  onClose: () => void;
}

export function CloseTicketModal({ ticket, isOpen, onClose }: CloseTicketModalProps) {
  const [resolution, setResolution] = useState("");
  const [category, setCategory] = useState("");
  const [sendEmail, setSendEmail] = useState(true);

  if (!ticket) return null;

  const resolutionCategories = [
    "Issue Resolved",
    "Duplicate Ticket",
    "User Error",
    "Feature Request",
    "Won't Fix",
    "Other"
  ];

  const handleCloseTicket = () => {
    // Handle ticket closure logic here
    console.log("Closing ticket:", { 
      ticketId: ticket.id, 
      resolution, 
      category, 
      sendEmail 
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Close Ticket
          </DialogTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-6">
          {/* Ticket Info */}
          <div className="bg-muted/30 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Ticket Details</h4>
            <div className="space-y-1 text-sm">
              <p><span className="text-muted-foreground">ID:</span> {ticket.id}</p>
              <p><span className="text-muted-foreground">Subject:</span> {ticket.subject}</p>
              <p><span className="text-muted-foreground">User:</span> {ticket.user}</p>
            </div>
          </div>

          {/* Resolution Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Resolution Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category..." />
              </SelectTrigger>
              <SelectContent>
                {resolutionCategories.map((cat) => (
                  <SelectItem key={cat} value={cat.toLowerCase().replace(/\s+/g, '-')}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Resolution Notes */}
          <div className="space-y-2">
            <Label htmlFor="resolution">Resolution Notes</Label>
            <Textarea
              id="resolution"
              placeholder="Describe how the issue was resolved..."
              value={resolution}
              onChange={(e) => setResolution(e.target.value)}
              rows={4}
            />
          </div>

          {/* Email Notification */}
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="sendEmail" 
              checked={sendEmail}
              onCheckedChange={(checked) => setSendEmail(checked as boolean)}
            />
            <Label 
              htmlFor="sendEmail"
              className="text-sm font-normal cursor-pointer"
            >
              Send email notification to user
            </Label>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleCloseTicket}
              disabled={!category || !resolution}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Close Ticket
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}