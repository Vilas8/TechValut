import { NavigationHeader } from '@/components/NavigationHeader';
import { Footer } from '@/components/Footer';
import { Search, HelpCircle, ShoppingBag, Package, CreditCard, Shield, Headphones, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';

export default function HelpCenter() {
  const popularTopics = [
    {
      icon: ShoppingBag,
      title: 'Orders & Tracking',
      description: 'Track your order, modify details, or check delivery status.',
      articles: 12,
    },
    {
      icon: Package,
      title: 'Shipping & Delivery',
      description: 'Learn about shipping options, costs, and delivery times.',
      articles: 8,
    },
    {
      icon: CreditCard,
      title: 'Payments & Billing',
      description: 'Payment methods, invoices, and billing questions.',
      articles: 10,
    },
    {
      icon: Shield,
      title: 'Returns & Refunds',
      description: 'Return policy, refund process, and warranty information.',
      articles: 15,
    },
    {
      icon: HelpCircle,
      title: 'Product Information',
      description: 'Product specifications, compatibility, and recommendations.',
      articles: 25,
    },
    {
      icon: Headphones,
      title: 'Technical Support',
      description: 'Troubleshooting, setup guides, and technical assistance.',
      articles: 18,
    },
  ];

  const quickLinks = [
    { question: 'How do I track my order?', link: '#' },
    { question: 'What is your return policy?', link: '#' },
    { question: 'How long does shipping take?', link: '#' },
    { question: 'Do you ship internationally?', link: '#' },
    { question: 'How can I cancel my order?', link: '#' },
    { question: 'What payment methods do you accept?', link: '#' },
    { question: 'How do I check product warranty?', link: '#' },
    { question: 'Can I modify my order after placing it?', link: '#' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavigationHeader />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 to-accent/10 border-b border-border py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-foreground/60 mb-4">
              <Link href="/">Home</Link>
              <ChevronRight size={16} />
              <span className="text-foreground">Help Center</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">How Can We Help You?</h1>
            <p className="text-lg text-foreground/70 mb-8">
              Search our knowledge base or browse categories to find answers.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" size={20} />
              <input
                type="text"
                placeholder="Search for help..."
                className="w-full pl-12 pr-4 py-4 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Browse by Topic</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularTopics.map((topic) => {
              const Icon = topic.icon;
              return (
                <Link
                  key={topic.title}
                  href="#"
                  className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                      <Icon size={24} className="text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-accent transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-sm text-foreground/70 mb-3">{topic.description}</p>
                      <div className="text-xs text-accent font-medium">
                        {topic.articles} articles
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickLinks.map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  className="p-4 bg-background border border-border rounded-lg hover:border-accent/50 transition-all group flex items-center gap-3"
                >
                  <HelpCircle size={20} className="text-accent flex-shrink-0" />
                  <span className="text-sm group-hover:text-accent transition-colors">
                    {item.question}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Support CTA */}
      <section className="py-16">
        <div className="container">
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-border rounded-2xl p-12 text-center">
            <div className="inline-block p-4 bg-accent/10 rounded-full mb-6">
              <Headphones size={32} className="text-accent" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto mb-6">
              Can't find what you're looking for? Our support team is here to assist you 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/support/contact" className="btn-primary inline-flex items-center gap-2">
                <Headphones size={20} />
                Contact Support
              </Link>
              <Link href="/contact" className="btn-outline inline-flex items-center gap-2">
                Send Email
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
