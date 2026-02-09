import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetailDynamic from "./pages/ProductDetailDynamic";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CheckoutEnhanced from "./pages/CheckoutEnhanced";
import Account from "./pages/Account";

// Support Pages
import HelpCenter from "./pages/support/HelpCenter";
import ShippingInfo from "./pages/support/ShippingInfo";
import Returns from "./pages/support/Returns";
import FAQ from "./pages/support/FAQ";
import ContactSupport from "./pages/support/ContactSupport";

// Company Pages
import Blog from "./pages/company/Blog";
import Careers from "./pages/company/Careers";
import Press from "./pages/company/Press";

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
      <Route path={"/"} component={Home} />
      <Route path={"/products"} component={Products} />
      <Route path="/product/:slug" component={ProductDetailDynamic} />
      <Route path={"/about"} component={About} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/cart"} component={Cart} />
      <Route path={"/checkout"} component={Checkout} />
      <Route path={"/checkout-enhanced"} component={CheckoutEnhanced} />
      <Route path={"/account"} component={Account} />

      {/* Category Pages */}
      <Route path={"/products/laptops"} component={Laptops} />
      <Route path={"/products/smartphones"} component={Smartphones} />
      <Route path={"/products/audio"} component={Audio} />
      <Route path={"/products/wearables"} component={Wearables} />
      <Route path={"/products/accessories"} component={Accessories} />

      {/* Company Pages */}
      <Route path={"/company/blog"} component={Blog} />
      <Route path={"/company/careers"} component={Careers} />
      <Route path={"/company/press"} component={Press} />

      {/* Support Pages */}
      <Route path={"/support/help-center"} component={HelpCenter} />
      <Route path={"/support/shipping-info"} component={ShippingInfo} />
      <Route path={"/support/returns"} component={Returns} />
      <Route path={"/support/faq"} component={FAQ} />
      <Route path={"/support/contact"} component={ContactSupport} />

      {/* 404 */}
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <CartProvider>
        <ThemeProvider
          defaultTheme="light"
          switchable
        >
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </CartProvider>
    </ErrorBoundary>
  );
}

export default App;
