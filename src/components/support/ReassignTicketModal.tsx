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
import { X, UserCheck } from "lucide-react";

interface ReassignTicketModalProps {
  ticket: any;
  isOpen: boolean;
  onClose: () => void;
}

export function ReassignTicketModal({ ticket, isOpen, onClose }: ReassignTicketModalProps) {
  const [assignTo, setAssignTo] = useState("");
  const [reason, setReason] = useState("");

  if (!ticket) return null;

  const agents = [
    { id: "1", name: "Sarah Johnson", department: "Technical Support" },
    { id: "2", name: "David Wilson", department: "Billing" },
    { id: "3", name: "Tom Anderson", department: "Technical Support" },
    { id: "4", name: "Lisa Brown", department: "Customer Service" },
  ];

  const handleReassign = () => {
    // Handle reassignment logic here
    console.log("Reassigning ticket:", { ticketId: ticket.id, assignTo, reason });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-primary" />
            Re-Assign Ticket
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
              <p><span className="text-muted-foreground">Current Assignee:</span> {ticket.assignedTo}</p>
            </div>
          </div>

          {/* Assign To */}
          <div className="space-y-2">
            <Label htmlFor="assignTo">Assign To</Label>
            <Select value={assignTo} onValueChange={setAssignTo}>
              <SelectTrigger>
                <SelectValue placeholder="Select agent..." />
              </SelectTrigger>
              <SelectContent>
                {agents.map((agent) => (
                  <SelectItem key={agent.id} value={agent.id}>
                    <div className="flex flex-col items-start">
                      <span>{agent.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {agent.department}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Reason */}
          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Reassignment</Label>
            <Textarea
              id="reason"
              placeholder="Explain why this ticket is being reassigned..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleReassign}
              disabled={!assignTo}
              className="bg-primary hover:bg-primary/90"
            >
              Re-Assign Ticket
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}