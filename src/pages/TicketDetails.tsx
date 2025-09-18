import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Clipboard, Mail, Download, Maximize2, User2, Ticket, FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ReassignTicketModal } from "@/components/support/ReassignTicketModal";
import { CloseTicketModal } from "@/components/support/CloseTicketModal";

export default function TicketDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [reassignOpen, setReassignOpen] = useState(false as any);
  const [closeOpen, setCloseOpen] = useState(false as any);

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ description: "Copied" });
  };

  return (
    <div className="space-y-6">
      {/* Ticket Details */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                <Ticket className="h-4 w-4 text-white" />
              </div>
              <div>
                <CardTitle>Ticket Details</CardTitle>
                <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button className="text-white hover:brightness-110" style={{ backgroundColor: "#3F3F3F" }} onClick={() => setReassignOpen(true)}>Re-assign Admin</Button>
              <Button className="bg-red-600 hover:bg-red-700 text-white">Escalate</Button>
              <Button className="text-white hover:brightness-110" style={{ backgroundColor: "#003366" }} onClick={() => setCloseOpen(true)}>Close ticket</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative grid grid-cols-1 md:grid-cols-5 gap-8 pt-8">
            {/* vertical dividers */}
            <span className="hidden md:block absolute top-0 bottom-0 w-px bg-gray-200" style={{ left: "20%" }} />
            <span className="hidden md:block absolute top-0 bottom-0 w-px bg-gray-200" style={{ left: "40%" }} />
            <span className="hidden md:block absolute top-0 bottom-0 w-px bg-gray-200" style={{ left: "60%" }} />
            <span className="hidden md:block absolute top-0 bottom-0 w-px bg-gray-200" style={{ left: "80%" }} />
            <div>
              <p className="text-sm text-muted-foreground mb-1">Ticket ID</p>
              <p className="font-medium">TCK-1043</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Priority</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <p className="font-medium">High</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Status</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-400" />
                <p className="font-medium">In Progress</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Created on</p>
              <p className="font-medium">30|06|2025 08:55PM</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">Related Order</p>
              <Button variant="link" className="h-auto p-0">Certificate & Licenses</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Info */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
              <User2 className="h-4 w-4 text-white" />
            </div>
            <div>
              <CardTitle>User Info</CardTitle>
              <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8 pt-8">
            {/* vertical dividers */}
            <span className="hidden md:block absolute top-0 bottom-0 w-px bg-gray-200" style={{ left: "25%" }} />
            <span className="hidden md:block absolute top-0 bottom-0 w-px bg-gray-200" style={{ left: "50%" }} />
            <span className="hidden md:block absolute top-0 bottom-0 w-px bg-gray-200" style={{ left: "75%" }} />
            <div>
              <p className="text-sm text-muted-foreground mb-1">Name</p>
              <p className="font-medium">Mariam Ajani</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">User ID</p>
              <p className="font-medium">102938</p>
            </div>
            <div className="flex items-start gap-2">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Email</p>
                <p className="font-medium">Mariam@gmail.com</p>
              </div>
              <button className="p-1 rounded hover:bg-muted text-muted-foreground mt-5" onClick={() => copy("Mariam@gmail.com")}> 
                <Clipboard className="h-4 w-4" />
              </button>
            </div>
            <div className="flex items-start gap-2">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Phone Number</p>
                <p className="font-medium">+234 802 123 4567</p>
              </div>
              <button className="p-1 rounded hover:bg-muted text-muted-foreground mt-5" onClick={() => copy("+234 802 123 4567")}> 
                <Clipboard className="h-4 w-4" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Issue Details */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                <FileText className="h-4 w-4 text-white" />
              </div>
              <div>
                <CardTitle>Issue Details</CardTitle>
                <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
              </div>
            </div>
            <Button className="text-white hover:brightness-110" style={{ backgroundColor: "#003366" }}>Mark as resolved</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="pt-8">
            <p className="text-sm text-muted-foreground mb-1">Complaint</p>
            <p className="font-medium">Food missing from order</p>
          </div>
          <div className="flex items-center gap-4">
            {[1,2,3].map((i) => (
              <div key={i} className="w-14 h-20 bg-muted rounded-md" />
            ))}
            <Button variant="outline" className="flex items-center gap-2" style={{ borderColor: "#003366", color: "#003366" }}>
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                <FileText className="h-4 w-4 text-white" />
              </div>
              <div>
                <CardTitle>Notes</CardTitle>
                <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-8">
              <Button variant="outline" style={{ borderColor: "#003366", color: "#003366" }}>Export</Button>
              <Button variant="outline" size="icon"><Maximize2 className="h-4 w-4" /></Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Date</TableHead>
                <TableHead>Admin</TableHead>
                <TableHead>Note</TableHead>
                <TableHead className="w-24"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { date: "Aug 18, 2025", admin: "Mary", note: "Vendor confirmed item missing." },
                { date: "Aug 15, 2025", admin: "Mary", note: "Suggested Refund" },
              ].map((n) => (
                <TableRow key={n.date}>
                  <TableCell>{n.date}</TableCell>
                  <TableCell>{n.admin}</TableCell>
                  <TableCell>{n.note}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 flex justify-end">
            <Button className="text-white hover:brightness-110" style={{ backgroundColor: "#003366" }}>Save</Button>
          </div>
        </CardContent>
      </Card>
      <ReassignTicketModal
        ticket={{ id: "TCK-1043", subject: "Missing item", assignedTo: "Admin Mary" }}
        isOpen={reassignOpen}
        onClose={() => setReassignOpen(false)}
      />
      <CloseTicketModal
        ticket={{ id: "TCK-1043", subject: "Missing item", user: "Mariam Ajani" }}
        isOpen={closeOpen}
        onClose={() => setCloseOpen(false)}
      />
    </div>
  );
}


