import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, ShieldCheck, AlertTriangle, Lock, X, Filter, Download, ChevronDown, MoreHorizontal, Check } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Security() {
  const [activeTab, setActiveTab] = useState("2fa");
  const [isCreateNoticeOpen, setIsCreateNoticeOpen] = useState(false);
  const [isAddAdminOpen, setIsAddAdminOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const adminMetrics = [
    { title: "Total Admins", value: "10" },
    { title: "Super Admins", value: "2" },
    { title: "Support Admins", value: "8" },
    { title: "Active Admins", value: "6" },
    { title: "Suspended Admins", value: "4" },
  ];

  const securityMetrics = [
    {
      title: "Admins with 2FA Enabled",
      value: "87%",
      icon: <ShieldCheck className="h-6 w-6 text-green-500" />,
    },
    {
      title: "Failed Login Attempts (30 days)",
      value: "30",
      icon: <AlertTriangle className="h-6 w-6 text-red-500" />,
    },
    {
      title: "Locked Accounts",
      value: "4/10",
      icon: <Lock className="h-6 w-6 text-red-500" />,
    },
  ];

  const securityControls = [
    {
      title: "Require 2FA",
      description: "Lorem ipsum dolor adiuvat testing",
      control: (
        <Select defaultValue="all">
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Admins</SelectItem>
            <SelectItem value="super">Super Admins Only</SelectItem>
            <SelectItem value="none">None</SelectItem>
          </SelectContent>
        </Select>
      ),
    },
    {
      title: "Session Timeout",
      description: "Lorem ipsum dolor adiuvat testing",
      control: (
        <Select defaultValue="30">
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="15">15 Minutes</SelectItem>
            <SelectItem value="30">30 Minutes</SelectItem>
            <SelectItem value="60">1 Hour</SelectItem>
            <SelectItem value="120">2 Hours</SelectItem>
          </SelectContent>
        </Select>
      ),
    },
    {
      title: "Login Alerts",
      description: "Lorem ipsum dolor adiuvat testing",
      control: (
        <Select defaultValue="email">
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="sms">SMS</SelectItem>
            <SelectItem value="both">Both</SelectItem>
            <SelectItem value="none">None</SelectItem>
          </SelectContent>
        </Select>
      ),
    },
    {
      title: "IP Whitelist",
      description: "Lorem ipsum dolor adiuvat testing",
      control: (
        <Button className="w-40 bg-[#003366] hover:bg-[#003366]/90">
          Manage List
        </Button>
      ),
    },
  ];

  const announcements = [
    {
      title: "System Upgrade Scheduled",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi molestie a tortor eget tempor. Suspendisse mollis erat non tortor elementum auctor. Maecenas eu turpis nec ex porta vehicula. Mauris quis vestibulum elit. Vivamus pharetra vitae tellus suscipit tincidunt. Aenean eget nulla",
      date: "Sept 17, 2025",
      status: "Active"
    },
    {
      title: "System Upgrade Scheduled",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi molestie a tortor eget tempor. Suspendisse mollis erat non tortor elementum auctor. Maecenas eu turpis nec ex porta vehicula. Mauris quis vestibulum elit. Vivamus pharetra vitae tellus suscipit tincidunt. Aenean eget nulla",
      date: "Sept 17, 2025",
      status: "Expired"
    },
    {
      title: "System Upgrade Scheduled",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi molestie a tortor eget tempor. Suspendisse mollis erat non tortor elementum auctor. Maecenas eu turpis nec ex porta vehicula. Mauris quis vestibulum elit. Vivamus pharetra vitae tellus suscipit tincidunt. Aenean eget nulla",
      date: "Sept 17, 2025",
      status: "Active"
    },
    {
      title: "System Upgrade Scheduled",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi molestie a tortor eget tempor. Suspendisse mollis erat non tortor elementum auctor. Maecenas eu turpis nec ex porta vehicula. Mauris quis vestibulum elit. Vivamus pharetra vitae tellus suscipit tincidunt. Aenean eget nulla",
      date: "Sept 17, 2025",
      status: "Active"
    },
    {
      title: "System Upgrade Scheduled",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi molestie a tortor eget tempor. Suspendisse mollis erat non tortor elementum auctor. Maecenas eu turpis nec ex porta vehicula. Mauris quis vestibulum elit. Vivamus pharetra vitae tellus suscipit tincidunt. Aenean eget nulla",
      date: "Sept 17, 2025",
      status: "Active"
    }
  ];

  const auditLogData = [
    { date: "Sept 17, 2025", time: "09:12", admin: "John Doe", role: "Super Admin", action: "Created New Admin", result: "Success" },
    { date: "Sept 17, 2025", time: "09:12", admin: "John Doe", role: "Support Admin", action: "Suspended rider 210", result: "Failed" },
    { date: "Sept 17, 2025", time: "09:12", admin: "John Doe", role: "Analytics Admin", action: "Refunded ORD-210", result: "Success" },
    { date: "Sept 17, 2025", time: "09:12", admin: "John Doe", role: "Finance Admin", action: "Created New Admin", result: "Failed" },
    { date: "Sept 17, 2025", time: "09:12", admin: "John Doe", role: "Super Admin", action: "Suspended rider 210", result: "Success" },
    { date: "Sept 17, 2025", time: "09:12", admin: "John Doe", role: "Support Admin", action: "Refunded ORD-210", result: "Failed" },
    { date: "Sept 17, 2025", time: "09:12", admin: "John Doe", role: "Analytics Admin", action: "Created New Admin", result: "Success" },
    { date: "Sept 17, 2025", time: "09:12", admin: "John Doe", role: "Finance Admin", action: "Suspended rider 210", result: "Failed" },
    { date: "Sept 17, 2025", time: "09:12", admin: "John Doe", role: "Super Admin", action: "Refunded ORD-210", result: "Success" },
    { date: "Sept 17, 2025", time: "09:12", admin: "John Doe", role: "Support Admin", action: "Created New Admin", result: "Failed" },
  ];

  const adminAccountsData = [
    { name: "Mary Slessor", email: "Mary@dashndrop.com", role: "Support Admin", login: "Sept 25, 2025", status: "Suspended" },
    { name: "John Doe", email: "John@dashndrop.com", role: "Super Admin", login: "Sept 25, 2025", status: "Active" },
    { name: "Mary Slessor", email: "Mary@dashndrop.com", role: "Support Admin", login: "Sept 25, 2025", status: "Suspended" },
    { name: "John Doe", email: "John@dashndrop.com", role: "Super Admin", login: "Sept 25, 2025", status: "Active" },
    { name: "Mary Slessor", email: "Mary@dashndrop.com", role: "Support Admin", login: "Sept 25, 2025", status: "Suspended" },
    { name: "John Doe", email: "John@dashndrop.com", role: "Super Admin", login: "Sept 25, 2025", status: "Active" },
    { name: "Mary Slessor", email: "Mary@dashndrop.com", role: "Support Admin", login: "Sept 25, 2025", status: "Suspended" },
    { name: "John Doe", email: "John@dashndrop.com", role: "Super Admin", login: "Sept 25, 2025", status: "Active" },
    { name: "Mary Slessor", email: "Mary@dashndrop.com", role: "Support Admin", login: "Sept 25, 2025", status: "Suspended" },
    { name: "John Doe", email: "John@dashndrop.com", role: "Super Admin", login: "Sept 25, 2025", status: "Active" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-900 rounded-md flex items-center justify-center">
            <Shield className="h-4 w-4 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">System & Security</h1>
            <p className="text-muted-foreground">Manage admin roles, monitor activity, and enforce security policies</p>
          </div>
        </div>
        <Button 
          className="bg-[#003366] hover:bg-[#003366]/90"
          onClick={() => setIsAddAdminOpen(true)}
        >
          Add New Admin
        </Button>
      </div>

      {/* Admin Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {adminMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#003366]">{metric.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{metric.title}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between">
          <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
            <TabsTrigger 
              value="admin"
              className="data-[state=active]:bg-[#F28C28] data-[state=active]:text-white"
            >
              Admin accounts
            </TabsTrigger>
            <TabsTrigger 
              value="audit"
              className="data-[state=active]:bg-[#F28C28] data-[state=active]:text-white"
            >
              Audits Log
            </TabsTrigger>
            <TabsTrigger 
              value="2fa"
              className="data-[state=active]:bg-[#F28C28] data-[state=active]:text-white"
            >
              2FA & Login Control
            </TabsTrigger>
            <TabsTrigger 
              value="announcements"
              className="data-[state=active]:bg-[#F28C28] data-[state=active]:text-white"
            >
              Announcements
            </TabsTrigger>
          </TabsList>
          {activeTab === "announcements" && (
            <Button 
              className="bg-[#003366] hover:bg-[#003366]/90"
              onClick={() => setIsCreateNoticeOpen(true)}
            >
              Create Notice
            </Button>
          )}
        </div>
        <TabsContent value="admin" className="mt-6">
          <div className="space-y-4">
            {/* Filter Buttons */}
            <div className="flex justify-end gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Role
                <ChevronDown className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <MoreHorizontal className="h-4 w-4" />
                Status
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>

            {/* Admin Accounts Table */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-medium">Name</TableHead>
                      <TableHead className="font-medium">Email</TableHead>
                      <TableHead className="font-medium">Role</TableHead>
                      <TableHead className="font-medium">Login</TableHead>
                      <TableHead className="font-medium">Status</TableHead>
                      <TableHead className="font-medium">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {adminAccountsData.map((admin, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{admin.name}</TableCell>
                        <TableCell>{admin.email}</TableCell>
                        <TableCell>{admin.role}</TableCell>
                        <TableCell>{admin.login}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className={`h-2 w-2 rounded-full ${
                              admin.status === "Active" ? "bg-green-500" : "bg-red-500"
                            }`} />
                            <span>{admin.status}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-black hover:bg-gray-100"
                            onClick={() => navigate(`/admin/${admin.name.toLowerCase().replace(' ', '-')}`)}
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

            {/* Pagination */}
            <div className="flex justify-center">
              <PaginationControls
                currentPage={currentPage}
                totalPages={10}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="audit" className="mt-6">
          <div className="space-y-4">
            {/* Filter and Export Buttons */}
            <div className="flex justify-end gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button className="bg-[#003366] hover:bg-[#003366]/90 flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>

            {/* Filter Options */}
            <div className="flex gap-4">
              <Button variant="outline" size="sm">All</Button>
              <Button variant="outline" size="sm">Date Range</Button>
              <Button variant="outline" size="sm">Admin</Button>
              <Button variant="outline" size="sm">Action Type</Button>
            </div>

            {/* Audit Log Table */}
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-medium">Date</TableHead>
                      <TableHead className="font-medium">Time</TableHead>
                      <TableHead className="font-medium">Admin</TableHead>
                      <TableHead className="font-medium">Role</TableHead>
                      <TableHead className="font-medium">Action</TableHead>
                      <TableHead className="font-medium">Result</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditLogData.map((log, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{log.date}</TableCell>
                        <TableCell>{log.time}</TableCell>
                        <TableCell>{log.admin}</TableCell>
                        <TableCell>{log.role}</TableCell>
                        <TableCell>{log.action}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            log.result === "Success" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-red-100 text-red-800"
                          }`}>
                            {log.result}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Pagination */}
            <div className="flex justify-center">
              <PaginationControls
                currentPage={currentPage}
                totalPages={10}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="2fa" className="mt-6">
          <div className="space-y-6">
            {/* Security Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {securityMetrics.map((metric, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-muted-foreground">{metric.title}</div>
                        <div className="text-2xl font-bold mt-1">{metric.value}</div>
                      </div>
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
                        {metric.icon}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Security Controls */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-900 rounded-md flex items-center justify-center">
                    <Shield className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Security Controls</CardTitle>
                    <p className="text-xs text-muted-foreground">Manage Admin roles, monitor activity, and enforce security policies</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-0">
                {securityControls.map((control, index) => (
                  <div key={index} className="flex items-center justify-between py-4 border-b last:border-b-0">
                    <div className="flex-1">
                      <div className="font-medium">{control.title}</div>
                      <div className="text-sm text-muted-foreground mt-1">{control.description}</div>
                    </div>
                    <div className="ml-4">
                      {control.control}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="announcements" className="mt-6">
          <div className="space-y-4">
            {announcements.map((announcement, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{announcement.title}</h3>
                      <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                        {announcement.description}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{announcement.date}</span>
                        <span>|</span>
                        <span className={announcement.status === "Active" ? "text-green-600" : "text-red-600"}>
                          {announcement.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="bg-[#003366] text-white hover:bg-[#003366]/90 border-[#003366]"
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-red-600 border-red-600 hover:bg-red-50"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Notice Modal */}
      <Dialog open={isCreateNoticeOpen} onOpenChange={setIsCreateNoticeOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="bg-[#003366] text-white p-6 -m-6 mb-6 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-xl font-semibold">Create Notice</DialogTitle>
                <p className="text-sm text-blue-100 mt-1">Lorem ipsum dolor adiuvat coartem</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCreateNoticeOpen(false)}
                className="text-white hover:bg-white/20 p-2"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-sm font-medium">Title</Label>
              <Input
                id="title"
                placeholder="Type here"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="message" className="text-sm font-medium">Message Body</Label>
              <Textarea
                id="message"
                placeholder="Type here"
                className="mt-1 min-h-[100px]"
              />
            </div>
            
            <div>
              <Label htmlFor="visibility" className="text-sm font-medium">Visibility</Label>
              <Select defaultValue="all">
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Admins</SelectItem>
                  <SelectItem value="super">Super Admins Only</SelectItem>
                  <SelectItem value="support">Support Admins Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="expiry" className="text-sm font-medium">Expiry Date</Label>
              <Input
                id="expiry"
                placeholder="00 | 00 | 0000"
                className="mt-1"
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-3 mt-6">
            <Button
              className="bg-[#003366] hover:bg-[#003366]/90"
              onClick={() => setIsCreateNoticeOpen(false)}
            >
              Publish
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add New Admin Modal */}
      <Dialog open={isAddAdminOpen} onOpenChange={setIsAddAdminOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="bg-[#003366] text-white p-6 -m-6 mb-6 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-xl font-semibold">Add New Admin</DialogTitle>
                <p className="text-sm text-blue-100 mt-1">Lorem ipsum dolor adiuvat coartem</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsAddAdminOpen(false)}
                className="text-white hover:bg-white/20 p-2"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="adminName" className="text-sm font-medium">Admin Name</Label>
              <Input
                id="adminName"
                placeholder="Type here"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
              <Input
                id="email"
                placeholder="Type here"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
              <Input
                id="phone"
                placeholder="Type here"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="role" className="text-sm font-medium">Role</Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="super">Super Admin</SelectItem>
                  <SelectItem value="support">Support Admin</SelectItem>
                  <SelectItem value="analytics">Analytics Admin</SelectItem>
                  <SelectItem value="finance">Finance Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-sm font-medium">Permissions</Label>
              <div className="space-y-2 mt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="refund" />
                  <Label htmlFor="refund" className="text-sm">Refund Approval</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="vendor" />
                  <Label htmlFor="vendor" className="text-sm">Vendor Management</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="rider" />
                  <Label htmlFor="rider" className="text-sm">Rider Management</Label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="outline"
              onClick={() => setIsAddAdminOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-[#003366] hover:bg-[#003366]/90"
              onClick={() => setIsAddAdminOpen(false)}
            >
              Add Admin
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
