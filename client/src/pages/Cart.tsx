import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { NavigationHeader } from '@/components/NavigationHeader';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

export default function Cart() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();
  const [, setLocation] = useLocation();

  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 5000 ? 0 : 999; // Free shipping over ₹5000
  const total = subtotal + tax + shipping;

  const handleCheckout = () => {
    if (items.length > 0) {
      setLocation('/checkout');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <NavigationHeader />

      <div className="container py-8 flex-1">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-16 space-y-6">
            <ShoppingCart size={64} className="text-foreground/20 mx-auto" />
            <div className="space-y-2">
              <p className="text-xl font-semibold text-foreground">Your cart is empty</p>
              <p className="text-foreground/60">Start shopping to add items to your cart</p>
            </div>
            <Button className="btn-primary inline-flex items-center gap-2">
              <a href="/products" className="flex items-center gap-2">
                Continue Shopping
                <ArrowRight size={18} />
              </a>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-6 bg-card border border-border rounded-xl hover:border-accent/50 transition-colors"
                >
                  {/* Product Image */}
                  <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex-shrink-0 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-accent font-medium">{item.category}</p>
                        <h3 className="font-semibold text-foreground">{item.name}</h3>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 hover:bg-secondary rounded-lg transition-colors text-foreground/60 hover:text-accent"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-lg font-bold text-accent">
                        ₹{(item.price / 100).toFixed(0)}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center border border-border rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, Math.max(1, item.quantity - 1))
                          }
                          className="px-3 py-1 hover:bg-secondary transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 py-1 border-l border-r border-border">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-secondary transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    <p className="text-sm text-foreground/60 pt-2">
                      Subtotal: ₹{((item.price * item.quantity) / 100).toFixed(0)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 p-6 bg-card border border-border rounded-xl space-y-6">
                <h2 className="text-xl font-bold text-foreground">Order Summary</h2>

                <div className="space-y-3 pb-6 border-b border-border">
                  <div className="flex justify-between text-foreground/70">
                    <span>Subtotal</span>
                    <span>₹{(subtotal / 100).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-foreground/70">
                    <span>Tax (10%)</span>
                    <span>₹{(tax / 100).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-foreground/70">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? 'text-green-500 font-semibold' : ''}>
                      {shipping === 0 ? 'FREE' : `₹${(shipping / 100).toFixed(0)}`}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="text-2xl font-bold text-accent">
                    ₹{(total / 100).toFixed(0)}
                  </span>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={handleCheckout}
                    className="btn-primary w-full inline-flex items-center justify-center gap-2"
                  >
                    Proceed to Checkout
                    <ArrowRight size={18} />
                  </Button>
                  <Button className="btn-outline w-full">
                    <a href="/products">Continue Shopping</a>
                  </Button>
                </div>

                {/* Promo Code */}
                <div className="space-y-2 pt-4 border-t border-border">
                  <label className="text-sm font-medium text-foreground">Promo Code</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent transition-colors text-sm"
                    />
                    <Button className="btn-outline py-2 px-4">Apply</Button>
                  </div>
                </div>

                {/* Info */}
                <div className="text-xs text-foreground/60 space-y-1 pt-4 border-t border-border">
                  <p>✓ Free shipping on orders over ₹5000</p>
                  <p>✓ 30-day money-back guarantee</p>
                  <p>✓ Secure checkout</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
