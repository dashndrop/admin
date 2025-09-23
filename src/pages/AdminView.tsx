import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Filter, Mail, Phone, Copy, User, Users, Shield } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import profileIcon from "/img/profile.png";
import securityIcon from "/img/profile.png"; // Using same icon for now
import activityIcon from "/img/profile.png"; // Using same icon for now
import exportIcon from "/img/exporrt.png";

export default function AdminView() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();

  // Mock admin data - in real app, this would come from API based on ID
  const admin = {
    name: id === "john-doe" ? "John Doe" : "Mary Slessor",
    email: id === "john-doe" ? "John@dashndrop.com" : "Mary@dashndrop.com",
    phone: "+234 802 123 4567",
    role: id === "john-doe" ? "Super Admin" : "Support Admin",
    status: id === "john-doe" ? "Active" : "Suspended",
    userId: "102938",
    createdOn: "Aug 18, 2025 - 09:42am",
    lastLogin: "Aug 20, 2025 - 09:42am",
    createdBy: "Super Admin - John",
    permissions: "Refund Approval, Vendor Management",
    lastPasswordReset: "Aug 18, 2025 - 09:42am",
    twoFAStatus: "Enabled",
    loginAlert: "Enabled",
    mfaMethod: "Email OTP"
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/security")} className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
              {admin.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded ${
                admin.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}>
                {admin.status}
              </span>
              <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold">{admin.name} | </h1> <span> {admin.role}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button className="bg-gray-700 hover:bg-gray-800 text-white">Suspend Admin</Button>
          <Button className="bg-red-600 hover:bg-red-700 text-white">Delete Account</Button>
          <Button className="text-white hover:brightness-110" style={{ backgroundColor: "#003366" }}>Edit Admin</Button>
        </div>
      </div>

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
            {/* Vertical dividers spanning both rows (desktop) */}
            <span className="hidden md:block absolute top-0 bottom-0 w-px bg-gray-200" style={{ left: "20%" }} />
            <span className="hidden md:block absolute top-0 bottom-0 w-px bg-gray-200" style={{ left: "40%" }} />
            <span className="hidden md:block absolute top-0 bottom-0 w-px bg-gray-200" style={{ left: "60%" }} />
            <span className="hidden md:block absolute top-0 bottom-0 w-px bg-gray-200" style={{ left: "80%" }} />
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">User Name</p>
                <p className="font-medium">{admin.name}</p>
              </div>
              <div className="relative md:pl-8">
                <p className="text-sm text-muted-foreground">User ID</p>
                <p className="font-medium">{admin.userId}</p>
              </div>
              <div className="relative md:pl-8">
                <p className="text-sm text-muted-foreground">Role</p>
                <p className="font-medium">{admin.role}</p>
              </div>
              <div className="flex items-center gap-2 relative md:pl-8">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{admin.email}</p>
                </div>
                <button
                  aria-label="Copy email"
                  className="p-1 rounded hover:bg-muted text-muted-foreground"
                  onClick={() => {
                    navigator.clipboard.writeText(admin.email);
                    toast({ description: "Email copied" });
                  }}
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-center gap-2 relative md:pl-8">
                <div>
                  <p className="text-sm text-muted-foreground">Phone Number</p>
                  <p className="font-medium">{admin.phone}</p>
                </div>
                <button
                  aria-label="Copy phone number"
                  className="p-1 rounded hover:bg-muted text-muted-foreground"
                  onClick={() => {
                    navigator.clipboard.writeText(admin.phone);
                    toast({ description: "Phone number copied" });
                  }}
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Row 2 (aligned under the 5 columns above) */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 border-t pt-6">
              <div className="md:col-start-1">
                <p className="text-sm text-muted-foreground">Created on</p>
                <p className="font-medium">{admin.createdOn}</p>
              </div>
              <div className="relative md:pl-8 md:col-start-2">
                <p className="text-sm text-muted-foreground">Last Login</p>
                <p className="font-medium">{admin.lastLogin}</p>
              </div>
              <div className="relative md:pl-8 md:col-start-3">
                <p className="text-sm text-muted-foreground">Created By</p>
                <p className="font-medium">{admin.createdBy}</p>
              </div>
              <div className="relative md:pl-8 md:col-start-4">
                <p className="text-sm text-muted-foreground">Permissions</p>
                <p className="font-medium">{admin.permissions}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <img src={securityIcon} alt="Security Settings" className="w-10 h-10" />
            <div>
              <CardTitle className="text-lg">Security Settings</CardTitle>
              <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Last Password Reset:</p>
                <p className="font-medium">{admin.lastPasswordReset}</p>
              </div>
              <div className="flex gap-2">
                <Button className="bg-gray-700 hover:bg-gray-800 text-white">Disable 2FA</Button>
                <Button className="text-white hover:brightness-110" style={{ backgroundColor: "#003366" }}>Force Password Reset</Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">2FA Status</p>
                <p className="font-medium">{admin.twoFAStatus}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Login Alert</p>
                <p className="font-medium">{admin.loginAlert}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">MFA Method</p>
                <p className="font-medium">{admin.mfaMethod}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={activityIcon} alt="Activity Logs" className="w-10 h-10" />
              <div>
                <CardTitle className="text-lg">Activity Logs</CardTitle>
                <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button className="text-white hover:brightness-110" style={{ backgroundColor: "#003366" }}>Export</Button>
              <img src={exportIcon} alt="Export" className="w-5 h-5" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Result</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { date: "2025-08-15", time: "14:32", action: "Approved Refund", target: "ORD-884", result: "Success" },
                { date: "2025-08-15", time: "14:32", action: "Created New Admin", target: "Finance Role", result: "Success" },
                { date: "2025-08-15", time: "14:32", action: "Suspended Rider 210", target: "Rider Account", result: "Success" },
              ].map((row, index) => (
                <TableRow key={index} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{row.date}</TableCell>
                  <TableCell>{row.time}</TableCell>
                  <TableCell>{row.action}</TableCell>
                  <TableCell>{row.target}</TableCell>
                  <TableCell>{row.result}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
