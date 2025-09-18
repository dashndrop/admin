import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminLayout } from "@/components/layout/AdminLayout";
import Index from "./pages/Index";
import VendorDetails from "./pages/VendorDetails";
import UserDetails from "./pages/UserDetails";
import Vendors from "./pages/Vendors";
import Users from "./pages/Users";
import Riders from "./pages/Riders";
import RiderDetails from "./pages/RiderDetails";
import Orders from "./pages/Orders";
import Support from "./pages/Support";
import TicketDetails from "./pages/TicketDetails";
import Loyalty from "./pages/Loyalty";
import LoyaltyDetails from "./pages/LoyaltyDetails";
import Payments from "./pages/Payments";
import PaymentDetails from "./pages/PaymentDetails";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AdminLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/vendors/:id" element={<VendorDetails />} />
            <Route path="/users" element={<Users />} />
            <Route path="/user/:id" element={<UserDetails />} />
            <Route path="/riders" element={<Riders />} />
            <Route path="/riders/:id" element={<RiderDetails />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/payments/:id" element={<PaymentDetails />} />
            <Route path="/support" element={<Support />} />
            <Route path="/support/:id" element={<TicketDetails />} />
            <Route path="/loyalty" element={<Loyalty />} />
            <Route path="/loyalty/:id" element={<LoyaltyDetails />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AdminLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
