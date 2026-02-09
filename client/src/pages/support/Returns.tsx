import { NavigationHeader } from '@/components/NavigationHeader';
import { Footer } from '@/components/Footer';
import { RotateCcw, CheckCircle, XCircle, Clock, Package, CreditCard, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';

export default function Returns() {
  const returnProcess = [
    {
      step: '1',
      title: 'Initiate Return',
      description: 'Log into your account and select the item you wish to return. Choose a reason and submit your return request.',
    },
    {
      step: '2',
      title: 'Get Return Label',
      description: 'Receive a prepaid return shipping label via email. Print and attach it to the package.',
    },
    {
      step: '3',
      title: 'Ship the Item',
      description: 'Package the item securely with all original accessories and drop it off at any authorized carrier location.',
    },
    {
      step: '4',
      title: 'Refund Processing',
      description: 'Once we receive and inspect your return, your refund will be processed within 5-7 business days.',
    },
  ];

  const eligibleReasons = [
    { icon: CheckCircle, text: 'Product defective or damaged', eligible: true },
    { icon: CheckCircle, text: 'Wrong item received', eligible: true },
    { icon: CheckCircle, text: 'Item not as described', eligible: true },
    { icon: CheckCircle, text: 'Changed mind (within 30 days)', eligible: true },
    { icon: XCircle, text: 'Opened software or media', eligible: false },
    { icon: XCircle, text: 'Missing original packaging', eligible: false },
    { icon: XCircle, text: 'Beyond 30-day return window', eligible: false },
    { icon: XCircle, text: 'Damaged due to misuse', eligible: false },
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
              <span className="text-foreground">Returns</span>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <RotateCcw size={32} className="text-accent" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Returns & Refunds</h1>
            </div>
            <p className="text-lg text-foreground/70">
              Easy returns within 30 days. Your satisfaction is our priority.
            </p>
          </div>
        </div>
      </section>

      {/* Return Policy Highlights */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="inline-block p-3 bg-accent/10 rounded-lg mb-4">
                <Clock size={32} className="text-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-2">30-Day Returns</h3>
              <p className="text-foreground/70">Return eligible items within 30 days of delivery for a full refund.</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="inline-block p-3 bg-accent/10 rounded-lg mb-4">
                <Package size={32} className="text-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Free Return Shipping</h3>
              <p className="text-foreground/70">We provide a prepaid return label for hassle-free returns.</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="inline-block p-3 bg-accent/10 rounded-lg mb-4">
                <CreditCard size={32} className="text-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Quick Refunds</h3>
              <p className="text-foreground/70">Refunds processed within 5-7 business days to your original payment method.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Return Process */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">How to Return an Item</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {returnProcess.map((item) => (
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
            <div className="mt-12 text-center">
              <Link href="/account" className="btn-primary inline-flex items-center gap-2">
                <RotateCcw size={20} />
                Start a Return
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Eligible Returns */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Return Eligibility</h2>
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {eligibleReasons.map((reason, idx) => {
                const Icon = reason.icon;
                return (
                  <div
                    key={idx}
                    className="bg-card border border-border rounded-lg p-4 flex items-center gap-3"
                  >
                    <Icon
                      size={20}
                      className={reason.eligible ? 'text-green-500' : 'text-red-500'}
                    />
                    <span className="text-sm">{reason.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Important Information */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5 border-y border-border">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Important Return Information</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                title: 'Condition Requirements',
                content: 'Items must be in original condition with all accessories, manuals, and packaging included. Product seals should be unbroken unless the item is defective.',
              },
              {
                title: 'Non-Returnable Items',
                content: 'Opened software, digital downloads, personal care items, and customized products cannot be returned unless defective.',
              },
              {
                title: 'Refund Method',
                content: 'Refunds are issued to the original payment method. If paid by credit card, it may take 7-10 business days for the credit to appear on your statement.',
              },
              {
                title: 'Exchanges',
                content: 'We don\'t offer direct exchanges. If you need a different item, please return the original and place a new order.',
              },
              {
                title: 'International Returns',
                content: 'International customers are responsible for return shipping costs. We recommend using a trackable shipping service.',
              },
              {
                title: 'Warranty Claims',
                content: 'For defective items under warranty, contact our support team first. Warranty service may differ from standard returns.',
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

      {/* Refund Timeline */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Refund Timeline</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { day: 'Day 0', event: 'Return Initiated', description: 'You request a return through your account' },
                { day: 'Day 1-3', event: 'Item Shipped', description: 'You ship the item using our prepaid label' },
                { day: 'Day 4-6', event: 'Item Received', description: 'We receive and inspect your return' },
                { day: 'Day 7-10', event: 'Refund Issued', description: 'Refund processed to your payment method' },
              ].map((stage, idx) => (
                <div key={idx} className="text-center">
                  <div className="bg-accent/10 border-2 border-accent/20 rounded-lg p-4 mb-3">
                    <div className="font-bold text-accent text-lg mb-1">{stage.day}</div>
                    <div className="font-semibold text-sm">{stage.event}</div>
                  </div>
                  <p className="text-xs text-foreground/60">{stage.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16">
        <div className="container">
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-border rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Need Help with a Return?</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto mb-6">
              Our customer support team is ready to assist you with your return or answer any questions.
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
