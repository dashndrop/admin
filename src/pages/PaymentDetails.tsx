import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Copy, CreditCard, Filter, ChevronRight, FileText, User } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import vendorIcon from "/img/chickenrep.png";
import riderIcon from "/img/payriders.png";

export default function PaymentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const isRider = (location.state as any)?.type === "rider";

  const payout = {
    id: id || "PAY-001",
    vendorName: isRider ? "Qudus Ajase" : "Chicken Republic - Omole",
    vendorId: "DNDV1000",
    category: isRider ? "" : "Restaurant",
    address: isRider ? "" : "Omole phase 1, Ojodu Berger",
    documentLabel: "Certificate & Licenses",
    contactPerson: isRider ? "" : "Contact Person",
    name: isRider ? "Qudus Ajase" : "Adebayo Yusuf",
    email: isRider ? "Qudusajase@gmail.com" : "Adebayousf@gmail.com",
    phone: isRider ? "+234 802 123 4567" : "+234 90 800 500 0000",
    walletBalance: "₦100,000.00",
    status: "Active",
  };

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({ description: `${label} copied` });
  };

  const payIns = Array.from({ length: 8 }).map((_, i) => ({
    date: `Aug ${18 - i}, 2025`,
    txId: `PTF-${20021 + i}`,
    customer: "Mariam Ajani",
    method: "Bank Transfer",
    amount: "₦30,000.00",
    status: "Successful",
  }));

  const StatusDot = ({ status }: { status: string }) => {
    const color = status === "Successful" ? "bg-green-500" : status === "Failed" ? "bg-red-500" : "bg-yellow-500";
    return (
      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${color}`} />
        <span>{status}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header - Active badge, avatar, entity name */}

      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center">
          <img src={isRider ? riderIcon : vendorIcon} alt={isRider ? "Rider" : "Vendor"} className="w-10 h-10" />
        </div>
        <div>
          <span className="px-2.5 py-1 rounded-md text-xs bg-green-100 text-green-700 border border-green-200 inline-block mb-1">{payout.status}</span>
          <h2 className="text-base font-medium">{isRider ? payout.name : payout.vendorName}</h2>
        </div>
      </div>
      {/* Profile / Vendor Information */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-900 rounded-md flex items-center justify-center">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <div>
              <CardTitle className="text-base">{isRider ? "Profile Information" : "Vendor Information"}</CardTitle>
              <p className="text-xs text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 relative">
            <span className="hidden md:block absolute top-0 bottom-0 w-px bg-gray-200" style={{ left: "20%" }} />
            <span className="hidden md:block absolute top-0 bottom-0 w-px bg-gray-200" style={{ left: "40%" }} />
            <span className="hidden md:block absolute top-0 bottom-0 w-px bg-gray-200" style={{ left: "60%" }} />
            <span className="hidden md:block absolute top-0 bottom-0 w-px bg-gray-200" style={{ left: "80%" }} />

            {/* Row 1 */}
            {isRider ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  <div>
                    <p className="text-xs text-muted-foreground">Rider Name</p>
                    <p className="mt-1">{payout.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">User ID</p>
                    <p className="mt-1">DDRD-101</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Registration Date</p>
                    <p className="mt-1">Aug 2, 2024</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <div className="mt-1 flex items-center gap-2">
                      <p>Qudusajase@gmail.com</p>
                      <button onClick={() => copy("Qudusajase@gmail.com", "Email")} className="text-muted-foreground">
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Phone Number</p>
                    <div className="mt-1 flex items-center gap-2">
                      <p>{payout.phone}</p>
                      <button onClick={() => copy(payout.phone, "Phone number")} className="text-muted-foreground">
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 border-t pt-6">
                  <div>
                    <p className="text-xs text-muted-foreground">Last Active</p>
                    <p className="mt-1">Aug 20, 2025 — 10:32am</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Vehicle Type</p>
                    <p className="mt-1">Motorcycle (Honda 125cc)</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">License Status</p>
                    <p className="mt-1">Verified ✅</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Zone Assigned</p>
                    <p className="mt-1">Lagos Mainland</p>
                  </div>
                  <div />
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  <div>
                    <p className="text-xs text-muted-foreground">Business Name</p>
                    <p className="mt-1">Chicken republic</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Vendor ID</p>
                    <p className="mt-1">{payout.vendorId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Category</p>
                    <p className="mt-1">{payout.category}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Business Address</p>
                    <p className="mt-1">{payout.address}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Document</p>
                    <p className="mt-1 text-blue-600 underline cursor-pointer">{payout.documentLabel}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 border-t pt-6">
                  <div>
                    <p className=" d-block text-xs text-muted-foreground">Contact Person</p>
                    <div className="mt-1 w-9 h-9 rounded-md bg-[#F28C28] text-white flex items-center justify-center"><User className="h-4 w-4" /></div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Name</p>
                    <p className="mt-1">{payout.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <div className="mt-1 flex items-center gap-2">
                      <p>{payout.email}</p>
                      <button onClick={() => copy(payout.email, "Email")} className="text-muted-foreground">
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Phone Number</p>
                    <div className="mt-1 flex items-center gap-2">
                      <p>{payout.phone}</p>
                      <button onClick={() => copy(payout.phone, "Phone number")} className="text-muted-foreground">
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div />
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Wallet Balance / Actions */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-900 rounded-md flex items-center justify-center">
                <CreditCard className="h-4 w-4 text-white" />
              </div>
              <div>
                <CardTitle className="text-base">Wallet Balance</CardTitle>
                <p className="text-xs text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
              </div>
            </div>
            {isRider && (
              <span className="hidden md:inline-block px-3 py-1 rounded-md text-xs bg-yellow-100 text-yellow-800 border border-yellow-200">
                Next Due Payment: Aug 18, 2025
              </span>
            )}
            <div className="flex items-center gap-1">
              {isRider ? (
                <>
                  <Button className="text-white hover:brightness-110" style={{ backgroundColor: "#FF5A3C" }}>Hold Payout</Button>
                  <Button className="text-white hover:brightness-110" style={{ backgroundColor: "#003366" }}>Approve Payout</Button>
                </>
              ) : (
                <>
                  <Button className="text-white hover:brightness-110" style={{ backgroundColor: "#1DB954" }}>Process Payout</Button>
                  <Button className="text-white hover:brightness-110" style={{ backgroundColor: "#003366" }}>Mark as Paid</Button>
                </>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="mt-5">
          {isRider ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="ml-6">
                <p className="text-xs text-muted-foreground">Current Balance</p>
                <div className="text-3xl font-bold">{payout.walletBalance}</div>
              </div>
              <div className="ml-6">
                <p className="text-xs text-muted-foreground">Threshold</p>
                <div className="text-3xl font-bold">₦150,000.00</div>
              </div>
            </div>
          ) : (
            <div className="ml-6">
              <p className="text-xs text-muted-foreground">Current Balance</p>
              <div className="text-3xl font-bold">{payout.walletBalance}</div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Rider/Vendor Pay-Ins */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 bg-gray-900 rounded-md flex items-center justify-center">
                <FileText className="h-4 w-4 text-white" />
              </div>
              <div>
                <CardTitle className="text-base">{isRider ? "Rider Pay-Ins" : "Vendor Pay-Ins"}</CardTitle>
                <p className="text-xs text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="flex items-center gap-2" style={{ border: "none" }}>
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" size="icon" className="h-9 w-9">↗</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-200">
                <TableHead>Date</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payIns.map((r, i) => (
                <TableRow key={i} className="border-t">
                  <TableCell>{r.date}</TableCell>
                  <TableCell>{r.txId}</TableCell>
                  <TableCell>{r.customer}</TableCell>
                  <TableCell>{r.method}</TableCell>
                  <TableCell>{r.amount}</TableCell>
                  <TableCell><StatusDot status={r.status} /></TableCell>
                  <TableCell>
                    <Button variant="ghost" className="p-0 h-auto text-black hover:text-black/70">
                      View order details <ChevronRight className="h-3 w-3 ml-1" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}


