import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { ScrollToTop } from "./components/ScrollToTop";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetailDynamic from "./pages/ProductDetailDynamic";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CheckoutEnhanced from "./pages/CheckoutEnhanced";
import Account from "./pages/Account";

// Auth Pages
import Login from "./pages/Login";
import Register from "./pages/Register";

// User Dashboard Pages
import DashboardHome from "./pages/dashboard/DashboardHome";
import Profile from "./pages/dashboard/Profile";
import Orders from "./pages/dashboard/Orders";
import Wishlist from "./pages/dashboard/Wishlist";
import History from "./pages/dashboard/History";
import UserSettings from "./pages/dashboard/UserSettings";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminSettings from "./pages/admin/AdminSettings";

// Support Pages
import HelpCenter from "./pages/support/HelpCenter";
import ShippingInfo from "./pages/support/ShippingInfo";
import Returns from "./pages/support/Returns";
import FAQ from "./pages/support/FAQ";
import ContactSupport from "./pages/support/ContactSupport";

// Legal Pages
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsOfService from "./pages/legal/TermsOfService";
import CookieSettings from "./pages/legal/CookieSettings";

// Category Pages
import Laptops from "./pages/categories/Laptops";
import Smartphones from "./pages/categories/Smartphones";
import Audio from "./pages/categories/Audio";
import Wearables from "./pages/categories/Wearables";
import Accessories from "./pages/categories/Accessories";

function Router() {
  return (
    <Switch>
      {/* Main Pages */}
      <Route path="/" component={Home} />
      <Route path="/products" component={Products} />
      <Route path="/product/:slug" component={ProductDetailDynamic} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/cart" component={Cart} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/checkout-enhanced" component={CheckoutEnhanced} />
      <Route path="/account" component={Account} />

      {/* Auth Pages */}
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />

      {/* User Dashboard — protected */}
      <Route path="/dashboard">
        <ProtectedRoute>
          <DashboardHome />
        </ProtectedRoute>
      </Route>
      <Route path="/dashboard/profile">
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      </Route>
      <Route path="/dashboard/orders">
        <ProtectedRoute>
          <Orders />
        </ProtectedRoute>
      </Route>
      <Route path="/dashboard/wishlist">
        <ProtectedRoute>
          <Wishlist />
        </ProtectedRoute>
      </Route>
      <Route path="/dashboard/history">
        <ProtectedRoute>
          <History />
        </ProtectedRoute>
      </Route>
      <Route path="/dashboard/settings">
        <ProtectedRoute>
          <UserSettings />
        </ProtectedRoute>
      </Route>

      {/* Admin Panel — protected + admin only */}
      <Route path="/admin">
        <ProtectedRoute adminOnly>
          <AdminDashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/users">
        <ProtectedRoute adminOnly>
          <AdminUsers />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/orders">
        <ProtectedRoute adminOnly>
          <AdminOrders />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/products">
        <ProtectedRoute adminOnly>
          <AdminProducts />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/analytics">
        <ProtectedRoute adminOnly>
          <AdminAnalytics />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/settings">
        <ProtectedRoute adminOnly>
          <AdminSettings />
        </ProtectedRoute>
      </Route>

      {/* Category Pages */}
      <Route path="/products/laptops" component={Laptops} />
      <Route path="/products/smartphones" component={Smartphones} />
      <Route path="/products/audio" component={Audio} />
      <Route path="/products/wearables" component={Wearables} />
      <Route path="/products/accessories" component={Accessories} />

      {/* Support Pages */}
      <Route path="/support/help-center" component={HelpCenter} />
      <Route path="/support/shipping-info" component={ShippingInfo} />
      <Route path="/support/returns" component={Returns} />
      <Route path="/support/faq" component={FAQ} />
      <Route path="/support/contact" component={ContactSupport} />

      {/* Legal Pages */}
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/cookie-settings" component={CookieSettings} />

      {/* 404 */}
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <ThemeProvider defaultTheme="light" switchable>
            <TooltipProvider>
              <Toaster />
              <ScrollToTop />
              <Router />
            </TooltipProvider>
          </ThemeProvider>
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
