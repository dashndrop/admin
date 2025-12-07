import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import VendorDetails from "./pages/VendorDetails";
import UserDetails from "./pages/UserDetails";
import Vendors from "./pages/Vendors";
import Users from "./pages/Users";
import Riders from "./pages/Riders";
import RiderDetails from "./pages/RiderDetails";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import Support from "./pages/Support";
import TicketDetails from "./pages/TicketDetails";
import Loyalty from "./pages/Loyalty";
import LoyaltyDetails from "./pages/LoyaltyDetails";
import Payments from "./pages/Payments";
import PaymentDetails from "./pages/PaymentDetails";
import Analytics from "./pages/Analytics";
import Security from "./pages/Security";
import AdminView from "./pages/AdminView";
import Notifications from "./pages/Notifications";
import Waitlist from "./pages/Waitlist";
import Login from "./pages/Login";
import VerifyIdentity from "./pages/VerifyIdentity";
import ResetPassword from "./pages/ResetPassword";
import CreatePassword from "./pages/CreatePassword";
import PasswordSuccess from "./pages/PasswordSuccess";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/verify" element={<VerifyIdentity />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/create-password" element={<CreatePassword />} />
          <Route path="/password-success" element={<PasswordSuccess />} />
          <Route path="/" element={
            <ProtectedRoute>
              <AdminLayout>
                <Vendors />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/vendors" element={
            <ProtectedRoute>
              <AdminLayout>
                <Vendors />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/vendors/:id" element={
            <ProtectedRoute>
              <AdminLayout>
                <VendorDetails />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/users" element={
            <ProtectedRoute>
              <AdminLayout>
                <Users />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/user/:id" element={
            <ProtectedRoute>
              <AdminLayout>
                <UserDetails />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/riders" element={
            <ProtectedRoute>
              <AdminLayout>
                <Riders />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/riders/:id" element={
            <ProtectedRoute>
              <AdminLayout>
                <RiderDetails />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/orders" element={
            <ProtectedRoute>
              <AdminLayout>
                <Orders />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/orders/:id" element={
            <ProtectedRoute>
              <AdminLayout>
                <OrderDetails />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/payments" element={
            <ProtectedRoute>
              <AdminLayout>
                <Payments />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/payments/:id" element={
            <ProtectedRoute>
              <AdminLayout>
                <PaymentDetails />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/support" element={
            <ProtectedRoute>
              <AdminLayout>
                <Support />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/support/:id" element={
            <ProtectedRoute>
              <AdminLayout>
                <TicketDetails />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/loyalty" element={
            <ProtectedRoute>
              <AdminLayout>
                <Loyalty />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/loyalty/:id" element={
            <ProtectedRoute>
              <AdminLayout>
                <LoyaltyDetails />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/analytics" element={
            <ProtectedRoute>
              <AdminLayout>
                <Analytics />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/security" element={
            <ProtectedRoute>
              <AdminLayout>
                <Security />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/:id" element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminView />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/notifications" element={
            <ProtectedRoute>
              <AdminLayout>
                <Notifications />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/waitlist" element={
            <ProtectedRoute>
              <AdminLayout>
                <Waitlist />
              </AdminLayout>
            </ProtectedRoute>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
