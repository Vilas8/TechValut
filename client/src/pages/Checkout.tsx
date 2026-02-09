import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { NavigationHeader } from '@/components/NavigationHeader';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { Check, Lock } from 'lucide-react';

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    // Shipping
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    // Payment
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const tax = subtotal * 0.1;
  const shipping = subtotal > 5000 ? 0 : 999;
  const total = subtotal + tax + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.address &&
      formData.city &&
      formData.zipCode
    ) {
      setStep('payment');
    }
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.cardName && formData.cardNumber && formData.expiry && formData.cvv) {
      setIsProcessing(true);
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsProcessing(false);
      setStep('confirmation');
      // Clear cart after successful order
      clearCart();
    }
  };

  if (items.length === 0 && step !== 'confirmation') {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <NavigationHeader />
        <div className="container py-16 text-center">
          <p className="text-lg text-foreground/60 mb-6">Your cart is empty</p>
          <Button className="btn-primary">
            <a href="/products">Back to Shopping</a>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  if (step === 'confirmation') {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <NavigationHeader />
        <div className="container py-16 flex-1">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="inline-flex p-6 bg-green-500/10 rounded-full">
              <Check size={48} className="text-green-500" />
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-foreground">Order Confirmed!</h1>
              <p className="text-lg text-foreground/70">
                Thank you for your purchase. Your order has been successfully placed.
              </p>
            </div>

            <div className="p-8 bg-card border border-border rounded-xl space-y-6 text-left">
              <div>
                <p className="text-sm text-foreground/60 mb-2">Order Number</p>
                <p className="text-2xl font-bold text-accent">#TV-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
              </div>

              <div className="border-t border-border pt-6 space-y-4">
                <h3 className="font-semibold text-foreground mb-4">Order Summary</h3>
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-foreground/70">
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>₹{((item.price * item.quantity) / 100).toFixed(0)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-6 space-y-3">
                <div className="flex justify-between text-foreground/70">
                  <span>Subtotal</span>
                  <span>₹{(subtotal / 100).toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-foreground/70">
                  <span>Tax</span>
                  <span>₹{(tax / 100).toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-foreground/70">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `₹${(shipping / 100).toFixed(0)}`}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-accent pt-3 border-t border-border">
                  <span>Total</span>
                  <span>₹{(total / 100).toFixed(0)}</span>
                </div>
              </div>

              <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 space-y-2">
                <p className="text-sm text-foreground/70">
                  A confirmation email has been sent to <span className="font-semibold">{formData.email}</span>
                </p>
                <p className="text-sm text-foreground/70">
                  You can track your order status in your account dashboard.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <Button className="btn-primary w-full">
                <a href="/">Back to Home</a>
              </Button>
              <Button className="btn-outline w-full">
                <a href="/products">Continue Shopping</a>
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <NavigationHeader />

      <div className="container py-8 flex-1">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Steps */}
            <div className="flex gap-4 mb-8">
              {(['shipping', 'payment'] as const).map((s, idx) => (
                <div key={s} className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      step === s || (step === 'payment' && s === 'shipping')
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-secondary text-foreground/60'
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <span className="font-medium text-foreground capitalize hidden sm:inline">
                    {s}
                  </span>
                  {idx < 1 && <div className="hidden sm:block w-8 h-0.5 bg-border" />}
                </div>
              ))}
            </div>

            {/* Shipping Form */}
            {step === 'shipping' && (
              <form onSubmit={handleShippingSubmit} className="space-y-6">
                <div className="p-6 bg-card border border-border rounded-xl space-y-6">
                  <h2 className="text-xl font-bold text-foreground">Shipping Address</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent transition-colors"
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent transition-colors"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent transition-colors"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Address *</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent transition-colors"
                      placeholder="123 Main St"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent transition-colors"
                        placeholder="San Francisco"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">State/Province</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent transition-colors"
                        placeholder="CA"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">ZIP Code *</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent transition-colors"
                        placeholder="94102"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Country</label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent transition-colors"
                        placeholder="United States"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button className="btn-outline flex-1">
                    <a href="/cart">Back to Cart</a>
                  </Button>
                  <Button type="submit" className="btn-primary flex-1">
                    Continue to Payment
                  </Button>
                </div>
              </form>
            )}

            {/* Payment Form */}
            {step === 'payment' && (
              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                <div className="p-6 bg-card border border-border rounded-xl space-y-6">
                  <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <Lock size={20} className="text-accent" />
                    Payment Information
                  </h2>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Cardholder Name *</label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Card Number *</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      required
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Expiry Date *</label>
                      <input
                        type="text"
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        required
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">CVV *</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        required
                        placeholder="123"
                        maxLength={4}
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>
                  </div>

                  <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 text-sm text-foreground/70">
                    Your payment information is secure and encrypted. We never store your full card details.
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    onClick={() => setStep('shipping')}
                    className="btn-outline flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={isProcessing}
                    className="btn-primary flex-1"
                  >
                    {isProcessing ? 'Processing...' : 'Complete Order'}
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-6 bg-card border border-border rounded-xl space-y-6">
              <h2 className="text-xl font-bold text-foreground">Order Summary</h2>

              <div className="space-y-3 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm text-foreground/70">
                    <span>
                      {item.name} <span className="text-foreground/50">x{item.quantity}</span>
                    </span>
                    <span>₹{((item.price * item.quantity) / 100).toFixed(0)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-2 text-sm">
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

              <div className="border-t border-border pt-4 flex justify-between items-center">
                <span className="font-semibold text-foreground">Total</span>
                <span className="text-2xl font-bold text-accent">
                  ₹{(total / 100).toFixed(0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
