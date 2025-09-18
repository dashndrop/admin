import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, SortAsc, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PaginationControls } from "@/components/ui/pagination-controls";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

type Row = {
  id: string;
  entity: string;
  balance: string;
  lastPayout: string;
  method: string;
  status: "Pending" | "Paid" | "Failed";
};

type RefundRow = {
  refundId: string;
  orderId: string;
  user: string;
  vendor: string;
  amount: string;
  status: "Pending" | "Completed";
};

type ActiveTab = "vendor" | "rider" | "refund";

const StatusDot = ({ status }: { status: Row["status"] }) => {
  const color = status === "Paid" ? "bg-green-500" : status === "Failed" ? "bg-red-500" : "bg-yellow-500";
  return (
    <div className="flex items-center gap-2">
      <span className={`h-2 w-2 rounded-full ${color}`} />
      <span>{status}</span>
    </div>
  );
};

export default function Payments() {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ActiveTab>("vendor");
  const [isRefundDialogOpen, setIsRefundDialogOpen] = useState(false);
  const [selectedRefund, setSelectedRefund] = useState<RefundRow | null>(null);

  const metrics = useMemo(() => {
    if (activeTab === "vendor") {
      return [
        { t: "All Payouts", v: "500" },
        { t: "Resolved", v: "300" },
        { t: "In-Progress", v: "50" },
        { t: "Open", v: "50" },
        { t: "Closed", v: "150" },
      ];
    }
    if (activeTab === "rider") {
      return [
        { t: "All Payouts", v: "420" },
        { t: "Resolved", v: "250" },
        { t: "In-Progress", v: "60" },
        { t: "Open", v: "40" },
        { t: "Closed", v: "70" },
      ];
    }
    return [
      { t: "All Refunds", v: "500" },
      { t: "Resolved", v: "300" },
      { t: "Pending", v: "50" },
      { t: "Open", v: "" },
      { t: "Closed", v: "" },
    ];
  }, [activeTab]);

  const rows: Row[] = useMemo(() => {
    if (activeTab === "vendor") {
      return Array.from({ length: 12 }).map((_, i) => ({
        id: `PAY-${100 + i}`,
        entity: i % 2 ? "Fresh Mart" : "ChopLife Kitchen",
        balance: "₦30,000.00",
        lastPayout: "Aug 18, 2025 — ₦30,000.00",
        method: "Bank Transfer",
        status: (i % 5 === 0 ? "Failed" : i % 3 === 0 ? "Paid" : "Pending") as Row["status"],
      }));
    }
    if (activeTab === "rider") {
      return Array.from({ length: 12 }).map((_, i) => ({
        id: `RID-PAY-${100 + i}`,
        entity: `Rider ${i % 2 ? 210 + i : 110 + i}`,
        balance: "₦30,000.00",
        lastPayout: "Aug 18, 2025 — ₦30,000.00",
        method: i % 4 === 0 ? "Mobile Wallet" : "Bank Transfer",
        status: (i % 5 === 0 ? "Failed" : i % 3 === 0 ? "Paid" : "Pending") as Row["status"],
      }));
    }
    // refund
    return [];
  }, [activeTab]);

  const refundRows: RefundRow[] = useMemo(() => {
    if (activeTab !== "refund") return [];
    return Array.from({ length: 12 }).map((_, i) => ({
      refundId: `RFND-${200 + i}`,
      orderId: `ORD-${870 + (i % 5)}`,
      user: "John Doe",
      vendor: i % 2 ? "ChopLife" : "FreshMart",
      amount: "₦30,000.00",
      status: (i % 3 === 0 ? "Completed" : "Pending") as RefundRow["status"],
    }));
  }, [activeTab]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center">💳</div>
            <div>
              <CardTitle className="text-base">Payment & Finances</CardTitle>
              <p className="text-xs text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {metrics.map((s, idx) => (
            <Card key={idx}>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">{s.t}</p>
                <div className="text-2xl font-bold mt-1">{s.v}</div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Tabs + Search + Actions */}
      <div className="flex items-center gap-3">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as ActiveTab)} className="flex-1">
          <TabsList>
            <TabsTrigger value="vendor">Vendor</TabsTrigger>
            <TabsTrigger value="rider">Rider</TabsTrigger>
            <TabsTrigger value="refund">Refund</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder={activeTab === "refund" ? "Refund ID / Order ID" : "Transaction ID / Vendor / Rider"} className="pl-10" />
        </div>
        <Button variant="outline" className="flex items-center gap-2" style={{ border: "none" }}>
          <Filter className="h-4 w-4" />
          Filter
        </Button>
        <Button variant="outline" className="flex items-center gap-2" style={{ border: "none" }}>
          <SortAsc className="h-4 w-4" />
          Sort
        </Button>
      </div>

      {/* Table */}
      <Card>
        <Table>
          <TableHeader>
            {activeTab !== "refund" ? (
              <TableRow className="bg-gray-200">
                <TableHead>{activeTab === "vendor" ? "Vendor" : "Rider"}</TableHead>
                <TableHead>Pending Balance</TableHead>
                <TableHead>Last Payout</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            ) : (
              <TableRow className="bg-gray-200">
                <TableHead>Refund ID</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            )}
          </TableHeader>
          <TableBody>
            {activeTab !== "refund"
              ? rows.map((r, i) => (
                  <TableRow key={i} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{r.entity}</TableCell>
                    <TableCell>{r.balance}</TableCell>
                    <TableCell>{r.lastPayout}</TableCell>
                    <TableCell>{r.method}</TableCell>
                    <TableCell><StatusDot status={r.status} /></TableCell>
                    <TableCell>
                      {r.status === "Pending" ? (
                        <Button
                          variant="ghost"
                          className="p-0 h-auto text-black hover:text-black/70"
                          onClick={() => navigate(`/payments/${r.id}`, { state: { type: activeTab } })}
                        >
                          Pay Now <ChevronRight className="h-3 w-3 ml-1" />
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          className="p-0 h-auto text-black hover:text-black/70"
                          onClick={() => navigate(`/payments/${r.id}`, { state: { type: activeTab } })}
                        >
                          View <ChevronRight className="h-3 w-3 ml-1" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              : refundRows.map((rr, i) => (
                  <TableRow key={i} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{rr.refundId}</TableCell>
                    <TableCell>{rr.orderId}</TableCell>
                    <TableCell>{rr.user}</TableCell>
                    <TableCell>{rr.vendor}</TableCell>
                    <TableCell>{rr.amount}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${rr.status === "Pending" ? "bg-yellow-500" : "bg-green-500"}`} />
                        <span>{rr.status}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        className="p-0 h-auto text-black hover:text-black/70"
                        onClick={() => {
                          setSelectedRefund(rr);
                          setIsRefundDialogOpen(true);
                        }}
                      >
                        {rr.status === "Pending" ? "Review" : "View"} <ChevronRight className="h-3 w-3 ml-1" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </Card>

      <PaginationControls currentPage={currentPage} totalPages={10} onPageChange={setCurrentPage} />

      {/* Refund Modal */}
      <Dialog open={isRefundDialogOpen} onOpenChange={setIsRefundDialogOpen}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          <div className="bg-[#003366] text-white px-6 py-3 text-sm flex items-center gap-3">
            <span className={`h-2 w-2 rounded-full ${selectedRefund?.status === "Pending" ? "bg-yellow-400" : "bg-green-400"}`} />
            <span>Refund Request — {selectedRefund?.refundId} (Order {selectedRefund?.orderId})</span>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-muted-foreground">Vendor</p>
                <p className="mt-1">ChopLife Kitchen (Vendor ID: V-102)</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Rider</p>
                <p className="mt-1">Rider 210 — James Okon (⭐ 4.6)</p>
              </div>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-2">Order Items Table</p>
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-200">
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { item: "Jollof Rice", qty: "2x", price: "₦10,000.00" },
                    { item: "Chicken", qty: "2x", price: "₦10,000.00" },
                    { item: "Pack", qty: "2x", price: "₦10,000.00" },
                  ].map((r, idx) => (
                    <TableRow key={idx} className="border-t">
                      <TableCell>{r.item}</TableCell>
                      <TableCell>{r.qty}</TableCell>
                      <TableCell>{r.price}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="border-t">
                    <TableCell className="font-medium">-</TableCell>
                    <TableCell className="font-medium">Total</TableCell>
                    <TableCell className="font-medium">₦30,000.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-muted-foreground">Refund Amount Requested</p>
                <p className="mt-1">₦30,000.00</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Refund Reason (user-provided)</p>
                <p className="mt-1">Missing drink in my order</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Requested On</p>
                <p className="mt-1">Aug 18, 2025 — 09:15 AM</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Refund Type (system detected)</p>
                <p className="mt-1">Full refund (100%)</p>
              </div>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-2">Attachments</p>
              <div className="flex items-center gap-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="w-12 h-16 rounded-md bg-gray-200" />
                ))}
                <Button variant="outline" className="h-8">View</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Partial Refund</p>
                <Input placeholder="₦0.00" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Note</p>
                <Textarea placeholder="Type here" className="min-h-[110px]" />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button className="text-white" style={{ backgroundColor: "#003366" }}>Approve full refund</Button>
              <Button className="text-black" style={{ backgroundColor: "#FAD02C" }}>Approve partial refund</Button>
              <Button className="text-white" style={{ backgroundColor: "#FF5A3C" }}>Reject request</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}


