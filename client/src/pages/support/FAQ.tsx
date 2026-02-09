import { NavigationHeader } from '@/components/NavigationHeader';
import { Footer } from '@/components/Footer';
import { ChevronRight, ChevronDown, HelpCircle, Search, Package, CreditCard, Truck, RotateCcw, Shield, Settings } from 'lucide-react';
import { Link } from 'wouter';
import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  category: string;
  icon: React.ElementType;
  faqs: FAQItem[];
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqData: FAQCategory[] = [
    {
      category: 'Orders & Purchases',
      icon: Package,
      faqs: [
        {
          question: 'How do I place an order?',
          answer: 'To place an order, browse our products, add items to your cart, and proceed to checkout. You\'ll need to provide shipping information and payment details. Once confirmed, you\'ll receive an order confirmation email.',
        },
        {
          question: 'Can I modify or cancel my order after placing it?',
          answer: 'You can modify or cancel your order within 1 hour of placing it by contacting our support team. After this window, the order enters processing and cannot be changed. Please reach out to us immediately if you need to make changes.',
        },
        {
          question: 'Do you offer bulk or corporate discounts?',
          answer: 'Yes! We offer special pricing for bulk orders (10+ units) and corporate accounts. Contact our business sales team at business@techvault.com or call 1-800-TECH-BUY for a custom quote.',
        },
        {
          question: 'What happens if an item is out of stock?',
          answer: 'Out of stock items will show "Notify Me" button. Click it to get email alerts when the product is back in stock. Alternatively, we can suggest similar available products that may suit your needs.',
        },
      ],
    },
    {
      category: 'Payment & Billing',
      icon: CreditCard,
      faqs: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover), debit cards, PayPal, Apple Pay, Google Pay, and bank transfers for large orders. All transactions are encrypted and secure.',
        },
        {
          question: 'Is my payment information secure?',
          answer: 'Absolutely! We use industry-standard 256-bit SSL encryption for all transactions. We do not store your complete credit card details on our servers. All payment processing is handled through PCI-compliant payment gateways.',
        },
        {
          question: 'When will I be charged for my order?',
          answer: 'Your payment method is charged immediately when you place your order. For pre-orders, you\'ll be charged when the item ships. If using bank transfer, your order will be held until payment is received and verified.',
        },
        {
          question: 'Can I get an invoice or receipt?',
          answer: 'Yes, an invoice is automatically sent to your email after order confirmation. You can also download invoices from your account dashboard under "Order History." For business purchases, we can provide detailed tax invoices.',
        },
      ],
    },
    {
      category: 'Shipping & Delivery',
      icon: Truck,
      faqs: [
        {
          question: 'How long does shipping take?',
          answer: 'Standard shipping takes 3-5 business days, Express shipping 1-2 business days, and Same-day delivery is available in select metro areas. International shipping varies by location (7-14 business days typically).',
        },
        {
          question: 'How can I track my order?',
          answer: 'Once your order ships, you\'ll receive a tracking number via email. You can also track your order in real-time by logging into your account and visiting the "Orders" section. Click on any order to see detailed tracking information.',
        },
        {
          question: 'Do you ship internationally?',
          answer: 'Yes, we ship to over 100 countries worldwide. International shipping costs and delivery times vary by destination. Customs duties and import taxes are the responsibility of the recipient. Check our shipping calculator at checkout for exact rates.',
        },
        {
          question: 'What if my package is damaged or lost in transit?',
          answer: 'All shipments are insured. If your package arrives damaged, refuse delivery or take photos and contact us within 48 hours. For lost packages, wait until the expected delivery date passes, then contact us immediately. We\'ll file a claim and send a replacement.',
        },
      ],
    },
    {
      category: 'Returns & Refunds',
      icon: RotateCcw,
      faqs: [
        {
          question: 'What is your return policy?',
          answer: 'We offer a 30-day return policy on most items. Products must be unused, in original packaging with all accessories. Digital products and personalized items are non-returnable. Return shipping is free if the item is defective or we made an error.',
        },
        {
          question: 'How do I initiate a return?',
          answer: 'Log into your account, go to "Order History," select the order, and click "Return Items." Choose the items you want to return, select a reason, and submit. You\'ll receive a prepaid return label via email within 24 hours.',
        },
        {
          question: 'When will I receive my refund?',
          answer: 'Refunds are processed within 3-5 business days after we receive and inspect your return. The refund will be credited to your original payment method. Bank processing times may add 5-10 business days for the funds to appear in your account.',
        },
        {
          question: 'Can I exchange an item instead of returning it?',
          answer: 'Yes! During the return process, select "Exchange" and choose the replacement item. If there\'s a price difference, we\'ll charge or refund accordingly. Exchanges are prioritized for faster processing than return-and-repurchase.',
        },
      ],
    },
    {
      category: 'Warranty & Technical Support',
      icon: Shield,
      faqs: [
        {
          question: 'Do products come with a warranty?',
          answer: 'All products come with manufacturer\'s warranty (typically 1-3 years depending on the product). We also offer optional extended warranty plans at checkout. Check individual product pages for specific warranty details.',
        },
        {
          question: 'How do I claim warranty service?',
          answer: 'Contact our technical support team with your order number and issue description. For hardware issues, we may ask you to perform basic troubleshooting. Approved warranty claims receive a replacement or repair at no cost.',
        },
        {
          question: 'What if my product stops working after the warranty period?',
          answer: 'We offer out-of-warranty repair services at competitive rates. Contact our support team for a quote. Some repairs can be done in-house, while others are sent to authorized service centers. Turnaround time is typically 7-14 business days.',
        },
        {
          question: 'Do you offer technical support for setup and troubleshooting?',
          answer: 'Yes! We provide free technical support via phone, email, and live chat. Our team can help with product setup, configuration, troubleshooting, and basic how-to questions. Premium support plans with priority response times are also available.',
        },
      ],
    },
    {
      category: 'Account & Privacy',
      icon: Settings,
      faqs: [
        {
          question: 'How do I create an account?',
          answer: 'Click "Sign In" at the top of any page, then select "Create Account." Enter your email, create a password, and fill in basic information. You\'ll receive a verification email—click the link to activate your account and start shopping.',
        },
        {
          question: 'I forgot my password. How do I reset it?',
          answer: 'Click "Sign In," then "Forgot Password." Enter your email address, and we\'ll send you a password reset link. Click the link in your email and create a new password. The reset link expires after 1 hour for security.',
        },
        {
          question: 'How is my personal information protected?',
          answer: 'We take privacy seriously. Your data is encrypted, stored securely, and never shared with third parties without consent. We comply with GDPR, CCPA, and other privacy regulations. Read our detailed Privacy Policy for complete information.',
        },
        {
          question: 'Can I delete my account?',
          answer: 'Yes, you can request account deletion from your account settings. Note that this will permanently delete your order history, saved addresses, and preferences. Active orders must be completed before deletion. Contact support if you need assistance.',
        },
      ],
    },
  ];

  const toggleFAQ = (categoryIndex: number, faqIndex: number) => {
    const key = `${categoryIndex}-${faqIndex}`;
    setOpenIndex(openIndex === key ? null : key);
  };

  // Filter FAQs based on search query
  const filteredFAQData = faqData.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq =>
      searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(category => category.faqs.length > 0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavigationHeader />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 to-accent/10 border-b border-border py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-foreground/60 mb-4">
              <Link href="/">Home</Link>
              <ChevronRight size={16} />
              <Link href="/support/help-center">Help Center</Link>
              <ChevronRight size={16} />
              <span className="text-foreground">FAQ</span>
            </div>
            <div className="inline-block p-4 bg-accent/10 rounded-full mb-6">
              <HelpCircle size={40} className="text-accent" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-foreground/70 mb-8">
              Find quick answers to common questions about ordering, shipping, returns, and more.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" size={20} />
              <input
                type="text"
                placeholder="Search FAQ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {filteredFAQData.length === 0 ? (
              <div className="text-center py-12">
                <HelpCircle size={48} className="mx-auto text-foreground/30 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No results found</h3>
                <p className="text-foreground/60">
                  Try different keywords or{' '}
                  <Link href="/support/contact" className="text-accent hover:underline">
                    contact our support team
                  </Link>
                </p>
              </div>
            ) : (
              <div className="space-y-12">
                {filteredFAQData.map((category, categoryIndex) => {
                  const Icon = category.icon;
                  return (
                    <div key={category.category}>
                      {/* Category Header */}
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-accent/10 rounded-lg">
                          <Icon size={24} className="text-accent" />
                        </div>
                        <h2 className="text-2xl font-bold">{category.category}</h2>
                      </div>

                      {/* FAQ Items */}
                      <div className="space-y-4">
                        {category.faqs.map((faq, faqIndex) => {
                          const key = `${categoryIndex}-${faqIndex}`;
                          const isOpen = openIndex === key;

                          return (
                            <div
                              key={faqIndex}
                              className="bg-card border border-border rounded-lg overflow-hidden"
                            >
                              <button
                                onClick={() => toggleFAQ(categoryIndex, faqIndex)}
                                className="w-full flex items-center justify-between p-5 text-left hover:bg-accent/5 transition-colors"
                              >
                                <span className="font-semibold pr-4">{faq.question}</span>
                                <ChevronDown
                                  size={20}
                                  className={`flex-shrink-0 text-accent transition-transform ${
                                    isOpen ? 'rotate-180' : ''
                                  }`}
                                />
                              </button>

                              {isOpen && (
                                <div className="px-5 pb-5 text-foreground/80 border-t border-border pt-4">
                                  {faq.answer}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-lg text-foreground/70 mb-8">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/support/contact" className="btn-primary">
                Contact Support
              </Link>
              <Link href="/support/help-center" className="btn-outline">
                Visit Help Center
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
