import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import Products from "./pages/Products";
import UsedEngines from "./pages/UsedEngines";
import CheckoutPage from "./pages/CheckoutPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import HelpCenter from "./pages/HelpCenter";
import ReturnsRefunds from "./pages/ReturnsRefunds";
import ShippingInfo from "./pages/ShippingInfo";
import PaymentMethods from "./pages/PaymentMethods";
import TechnicalSupport from "./pages/TechnicalSupport";
import LiveChat from "./pages/LiveChat";
import FAQs from "./pages/FAQs";
import Login from "./pages/Login";
import Wishlist from "./pages/Wishlist";
import NotFound from "./pages/NotFound";
import BrandNewEngines from "./pages/BrandNewEngines";
import RebuiltEngines from "./pages/RebuiltEngines";
import Heads from "./pages/Heads";
import TimingComponents from "./pages/TimingComponents";
import Parts from "./pages/Parts";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import AdminSettings from "./pages/AdminSettings";
import AdminCategories from "./pages/AdminCategories";
import AdminCustomers from "./pages/AdminCustomers";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancelled from "./pages/PaymentCancelled";
import CartPage from "./pages/CartPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="enginecore-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/products" element={<Products />} />
          <Route path="/brand-new-engines" element={<BrandNewEngines />} />
          <Route path="/rebuilt-engines" element={<RebuiltEngines />} />
          <Route path="/heads" element={<Heads />} />
          <Route path="/timing-components" element={<TimingComponents />} />
          <Route path="/parts" element={<Parts />} />
          <Route path="/used-engines" element={<UsedEngines />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/returns-refunds" element={<ReturnsRefunds />} />
          <Route path="/shipping-info" element={<ShippingInfo />} />
          <Route path="/payment-methods" element={<PaymentMethods />} />
          <Route path="/technical-support" element={<TechnicalSupport />} />
          <Route path="/live-chat" element={<LiveChat />} />
          <Route path="/faqs" element={<FAQs />} />
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/categories" element={<AdminCategories />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/customers" element={<AdminCustomers />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          {/* Payment Routes */}
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-cancelled" element={<PaymentCancelled />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </ThemeProvider>
  </QueryClientProvider>
);

export default App;
