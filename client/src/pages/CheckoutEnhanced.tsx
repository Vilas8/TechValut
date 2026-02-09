import { useState } from 'react';
import { useLocation } from 'wouter';
import { ChevronRight, Loader } from 'lucide-react';
import { NavigationHeader } from '@/components/NavigationHeader';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/_core/hooks/useAuth';
import { trpc } from '@/lib/trpc';

type CheckoutStep = 'shipping' | 'payment' | 'confirmation';

interface ShippingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface PaymentFormData {
  cardName: string;
  cardNumber: string;
  cardExpiry: string;
  cardCVC: string;
}

export default function CheckoutEnhanced() {
  const [location, setLocation] = useLocation();
  const { items, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [confirmationOrderId, setConfirmationOrderId] = useState<string>('');
  const [confirmationOrderNumber, setConfirmationOrderNumber] = useState<string>('');

  const [shippingForm, setShippingForm] = useState<ShippingFormData>({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Japan',
  });

  const [paymentForm, setPaymentForm] = useState<PaymentFormData>({
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
  });

  const createOrderMutation = trpc.orders.create.useMutation({
    onSuccess: (data) => {
      setConfirmationOrderId(data.orderId.toString());
      setConfirmationOrderNumber(data.orderNumber);
      clearCart();
      setCurrentStep('confirmation');
    },
  });

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const tax = Math.round(subtotal * 0.1);
  const shipping = subtotal > 5000 ? 0 : 999;
  const total = subtotal + tax + shipping;

  const handleShippingSubmit = () => {
    if (!shippingForm.firstName || !shippingForm.lastName || !shippingForm.address || !shippingForm.city || !shippingForm.zipCode) {
      alert('Please fill in all required fields');
      return;
    }
    setCurrentStep('payment');
  };

  const handlePaymentSubmit = () => {
    if (!paymentForm.cardName || !paymentForm.cardNumber || !paymentForm.cardExpiry || !paymentForm.cardCVC) {
      alert('Please fill in all payment details');
      return;
    }

    if (!isAuthenticated) {
      alert('Please log in to complete your order');
      return;
    }

    createOrderMutation.mutate({
      shippingFirstName: shippingForm.firstName,
      shippingLastName: shippingForm.lastName,
      shippingEmail: shippingForm.email,
      shippingPhone: shippingForm.phone,
      shippingAddress: shippingForm.address,
      shippingCity: shippingForm.city,
      shippingState: shippingForm.state,
      shippingZipCode: shippingForm.zipCode,
      shippingCountry: shippingForm.country,
      subtotal,
      tax,
      shipping,
      total,
      paymentMethod: 'credit_card',
      items: items.map((item) => ({
        productId: item.id,
        productName: item.name,
        productImage: item.image,
        price: item.price,
        quantity: item.quantity || 1,
        subtotal: item.price * (item.quantity || 1),
      })),
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <NavigationHeader />
        <div className="container py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Please log in</h1>
          <p className="text-foreground/60 mb-6">You need to be logged in to checkout.</p>
          <Button className="btn-primary">
            <a href="/">Back to Home</a>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  if (items.length === 0 && currentStep !== 'confirmation') {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <NavigationHeader />
        <div className="container py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-foreground/60 mb-6">Add items to your cart before checking out.</p>
          <Button className="btn-primary">
            <a href="/products">Continue Shopping</a>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavigationHeader />

      <div className="container py-12">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-2xl">
            <div className={`flex flex-col items-center ${currentStep === 'shipping' ? 'text-accent' : 'text-foreground/50'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold mb-2 ${
                currentStep === 'shipping' ? 'bg-accent text-accent-foreground' : 'bg-secondary'
              }`}>
                1
              </div>
              <span className="text-sm font-medium">Shipping</span>
            </div>
            <div className={`flex-1 h-1 mx-4 ${currentStep === 'payment' || currentStep === 'confirmation' ? 'bg-accent' : 'bg-secondary'}`}></div>
            <div className={`flex flex-col items-center ${currentStep === 'payment' || currentStep === 'confirmation' ? 'text-accent' : 'text-foreground/50'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold mb-2 ${
                currentStep === 'payment' || currentStep === 'confirmation' ? 'bg-accent text-accent-foreground' : 'bg-secondary'
              }`}>
                2
              </div>
              <span className="text-sm font-medium">Payment</span>
            </div>
            <div className={`flex-1 h-1 mx-4 ${currentStep === 'confirmation' ? 'bg-accent' : 'bg-secondary'}`}></div>
            <div className={`flex flex-col items-center ${currentStep === 'confirmation' ? 'text-accent' : 'text-foreground/50'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold mb-2 ${
                currentStep === 'confirmation' ? 'bg-accent text-accent-foreground' : 'bg-secondary'
              }`}>
                3
              </div>
              <span className="text-sm font-medium">Confirmation</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 'shipping' && (
              <div className="bg-card border border-border rounded-xl p-8 space-y-6">
                <h2 className="text-2xl font-bold">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">First Name *</label>
                    <input
                      type="text"
                      value={shippingForm.firstName}
                      onChange={(e) => setShippingForm({ ...shippingForm, firstName: e.target.value })}
                      className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Last Name *</label>
                    <input
                      type="text"
                      value={shippingForm.lastName}
                      onChange={(e) => setShippingForm({ ...shippingForm, lastName: e.target.value })}
                      className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                    <input
                      type="email"
                      value={shippingForm.email}
                      onChange={(e) => setShippingForm({ ...shippingForm, email: e.target.value })}
                      className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                    <input
                      type="tel"
                      value={shippingForm.phone}
                      onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                      className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">Address *</label>
                    <input
                      type="text"
                      value={shippingForm.address}
                      onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                      className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">City *</label>
                    <input
                      type="text"
                      value={shippingForm.city}
                      onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                      className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">State/Province</label>
                    <input
                      type="text"
                      value={shippingForm.state}
                      onChange={(e) => setShippingForm({ ...shippingForm, state: e.target.value })}
                      className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Zip Code *</label>
                    <input
                      type="text"
                      value={shippingForm.zipCode}
                      onChange={(e) => setShippingForm({ ...shippingForm, zipCode: e.target.value })}
                      className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Country *</label>
                    <input
                      type="text"
                      value={shippingForm.country}
                      onChange={(e) => setShippingForm({ ...shippingForm, country: e.target.value })}
                      className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-6">
                  <Button onClick={handleShippingSubmit} className="btn-primary inline-flex items-center gap-2">
                    Continue to Payment
                    <ChevronRight size={18} />
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 'payment' && (
              <div className="bg-card border border-border rounded-xl p-8 space-y-6">
                <h2 className="text-2xl font-bold">Payment Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Cardholder Name *</label>
                    <input
                      type="text"
                      value={paymentForm.cardName}
                      onChange={(e) => setPaymentForm({ ...paymentForm, cardName: e.target.value })}
                      className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Card Number *</label>
                    <input
                      type="text"
                      value={paymentForm.cardNumber}
                      onChange={(e) => setPaymentForm({ ...paymentForm, cardNumber: e.target.value.replace(/\D/g, '').slice(0, 16) })}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Expiry Date *</label>
                      <input
                        type="text"
                        value={paymentForm.cardExpiry}
                        onChange={(e) => setPaymentForm({ ...paymentForm, cardExpiry: e.target.value })}
                        placeholder="MM/YY"
                        className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:border-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">CVC *</label>
                      <input
                        type="text"
                        value={paymentForm.cardCVC}
                        onChange={(e) => setPaymentForm({ ...paymentForm, cardCVC: e.target.value.replace(/\D/g, '').slice(0, 3) })}
                        placeholder="123"
                        className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:border-accent"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between pt-6">
                  <Button onClick={() => setCurrentStep('shipping')} className="btn-outline">
                    Back
                  </Button>
                  <Button
                    onClick={handlePaymentSubmit}
                    disabled={createOrderMutation.isPending}
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    {createOrderMutation.isPending ? (
                      <>
                        <Loader size={18} className="animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Place Order
                        <ChevronRight size={18} />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 'confirmation' && (
              <div className="bg-card border border-border rounded-xl p-8 space-y-6 text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
                  <p className="text-foreground/60">Thank you for your purchase</p>
                </div>
                <div className="bg-secondary p-6 rounded-lg space-y-2">
                  <p className="text-sm text-foreground/60">Order Number</p>
                  <p className="text-xl font-bold text-accent">{confirmationOrderNumber}</p>
                </div>
                <p className="text-foreground/60">
                  A confirmation email has been sent to <span className="font-semibold">{shippingForm.email}</span>
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                  <Button className="btn-outline" onClick={() => setLocation('/account')}>
                    View Order
                  </Button>
                  <Button className="btn-primary" onClick={() => setLocation('/products')}>
                    Continue Shopping
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-xl p-6 space-y-6 sticky top-24">
              <h3 className="font-semibold text-foreground text-lg">Order Summary</h3>

              {/* Items */}
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={`${item.id}-${item.name}`} className="flex justify-between text-sm">
                    <div>
                      <p className="text-foreground font-medium">{item.name}</p>
                      <p className="text-foreground/60">Qty: {item.quantity || 1}</p>
                    </div>
                    <p className="text-foreground font-semibold">₹{((item.price * (item.quantity || 1)) / 100).toFixed(0)}</p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 pt-6 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/60">Subtotal</span>
                  <span className="text-foreground">₹{(subtotal / 100).toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/60">Tax (10%)</span>
                  <span className="text-foreground">₹{(tax / 100).toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/60">Shipping</span>
                  <span className="text-foreground">
                    {shipping === 0 ? 'Free' : `₹${(shipping / 100).toFixed(0)}`}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                  <span>Total</span>
                  <span className="text-accent">₹{(total / 100).toFixed(0)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
