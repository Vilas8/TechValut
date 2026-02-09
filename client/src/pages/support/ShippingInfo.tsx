import { NavigationHeader } from '@/components/NavigationHeader';
import { Footer } from '@/components/Footer';
import { Package, Truck, Globe, Clock, MapPin, ChevronRight, Check } from 'lucide-react';
import { Link } from 'wouter';

export default function ShippingInfo() {
  const shippingOptions = [
    {
      name: 'Standard Shipping',
      duration: '5-7 business days',
      cost: 'FREE on orders over ₹500',
      icon: Package,
      features: ['Order tracking', 'Signature required', 'Insurance included'],
    },
    {
      name: 'Express Shipping',
      duration: '2-3 business days',
      cost: '₹199 flat rate',
      icon: Truck,
      features: ['Priority handling', 'Real-time tracking', 'Signature required', 'Insurance included'],
    },
    {
      name: 'Next-Day Delivery',
      duration: 'Next business day',
      cost: '₹399 flat rate',
      icon: Clock,
      features: ['Fastest delivery', 'Priority handling', 'Real-time tracking', 'Premium insurance'],
    },
  ];

  const internationalShipping = [
    { region: 'Asia Pacific', duration: '7-12 business days', cost: 'From ₹999' },
    { region: 'Middle East', duration: '8-14 business days', cost: 'From ₹1,299' },
    { region: 'Europe', duration: '10-15 business days', cost: 'From ₹1,499' },
    { region: 'North America', duration: '10-15 business days', cost: 'From ₹1,699' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavigationHeader />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 to-accent/10 border-b border-border py-16">
        <div className="container">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-sm text-foreground/60 mb-4">
              <Link href="/">Home</Link>
              <ChevronRight size={16} />
              <Link href="/support">Support</Link>
              <ChevronRight size={16} />
              <span className="text-foreground">Shipping Info</span>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Package size={32} className="text-accent" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Shipping Information</h1>
            </div>
            <p className="text-lg text-foreground/70">
              Fast, reliable shipping to your doorstep. Learn about our shipping options, 
              delivery times, and tracking process.
            </p>
          </div>
        </div>
      </section>

      {/* Shipping Options */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Domestic Shipping Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {shippingOptions.map((option) => {
              const Icon = option.icon;
              return (
                <div
                  key={option.name}
                  className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-all"
                >
                  <div className="inline-block p-3 bg-accent/10 rounded-lg mb-4">
                    <Icon size={24} className="text-accent" />
                  </div>
                  <h3 className="font-semibold text-xl mb-2">{option.name}</h3>
                  <div className="text-2xl font-bold text-accent mb-1">{option.duration}</div>
                  <div className="text-foreground/60 mb-4">{option.cost}</div>
                  <div className="space-y-2">
                    {option.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <Check size={16} className="text-accent" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* International Shipping */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container">
          <div className="flex items-center justify-center gap-3 mb-12">
            <Globe className="text-accent" size={32} />
            <h2 className="text-3xl font-bold">International Shipping</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <p className="text-center text-foreground/70 mb-8">
              We ship to over 25 countries worldwide. International shipping rates and delivery times vary by destination.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {internationalShipping.map((region) => (
                <div
                  key={region.region}
                  className="bg-background border border-border rounded-lg p-6"
                >
                  <div className="flex items-start gap-3">
                    <MapPin className="text-accent mt-1" size={20} />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{region.region}</h3>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-foreground/60">Delivery Time:</span>
                          <span className="font-medium">{region.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-foreground/60">Starting Cost:</span>
                          <span className="font-medium text-accent">{region.cost}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-lg">
              <p className="text-sm text-foreground/80">
                <strong>Note:</strong> International orders may be subject to customs duties and import taxes. 
                These charges are the responsibility of the recipient.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Shipping Process */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Our Shipping Process</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  step: '1',
                  title: 'Order Confirmation',
                  description: 'You\'ll receive an email confirmation immediately after placing your order with order details and estimated delivery date.',
                },
                {
                  step: '2',
                  title: 'Processing & Packaging',
                  description: 'Our warehouse team carefully picks, packs, and prepares your order for shipment. This usually takes 1-2 business days.',
                },
                {
                  step: '3',
                  title: 'Shipment & Tracking',
                  description: 'Once shipped, you\'ll receive a tracking number via email. Track your package in real-time through our website or carrier app.',
                },
                {
                  step: '4',
                  title: 'Delivery',
                  description: 'Your order arrives at your doorstep. Signature may be required for high-value items. Enjoy your new tech!',
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {item.step}
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                    <p className="text-foreground/70">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Important Information */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5 border-y border-border">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Important Shipping Information</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                title: 'Order Processing Time',
                content: 'Orders are processed Monday-Friday, excluding public holidays. Orders placed after 2 PM will be processed the next business day.',
              },
              {
                title: 'Tracking Your Order',
                content: 'Track your order anytime through your account dashboard or using the tracking link in your shipment confirmation email.',
              },
              {
                title: 'Delivery Attempts',
                content: 'If delivery is unsuccessful, the carrier will make up to 3 attempts. After that, the package will be returned to our warehouse.',
              },
              {
                title: 'Address Accuracy',
                content: 'Please ensure your shipping address is complete and accurate. We cannot be responsible for packages sent to incorrect addresses.',
              },
              {
                title: 'Package Insurance',
                content: 'All shipments are insured for their full value. In case of loss or damage, we\'ll work with you to resolve the issue quickly.',
              },
            ].map((info, idx) => (
              <div key={idx} className="bg-background border border-border rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">{info.title}</h3>
                <p className="text-foreground/70">{info.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16">
        <div className="container">
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-border rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Questions About Shipping?</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto mb-6">
              Our support team is here to help with any shipping-related questions.
            </p>
            <Link href="/support/contact" className="btn-primary inline-flex items-center gap-2">
              Contact Support
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
