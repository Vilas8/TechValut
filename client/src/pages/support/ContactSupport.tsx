import { NavigationHeader } from '@/components/NavigationHeader';
import { Footer } from '@/components/Footer';
import { ChevronRight, MessageCircle, Phone, Mail, Clock, MapPin, Send, Headphones } from 'lucide-react';
import { Link } from 'wouter';
import { useState } from 'react';

export default function ContactSupport() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    orderNumber: '',
    subject: '',
    priority: 'medium',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        orderNumber: '',
        subject: '',
        priority: 'medium',
        message: '',
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactMethods = [
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our support team in real-time.',
      action: 'Start Chat',
      availability: 'Available 24/7',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak with a support specialist.',
      action: '1-800-TECH-HELP',
      availability: 'Mon-Fri, 8AM-8PM EST',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-950',
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us an email and we\'ll respond within 24 hours.',
      action: 'support@techvault.com',
      availability: 'Response within 24h',
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-950',
    },
  ];

  const officeLocations = [
    {
      city: 'San Francisco',
      address: '123 Tech Street, Suite 456',
      postal: 'San Francisco, CA 94105',
      phone: '+1 (555) 123-4567',
      hours: 'Mon-Fri: 9AM-6PM PST',
    },
    {
      city: 'New York',
      address: '789 Innovation Ave, Floor 12',
      postal: 'New York, NY 10001',
      phone: '+1 (555) 987-6543',
      hours: 'Mon-Fri: 9AM-6PM EST',
    },
    {
      city: 'London',
      address: '456 Commerce Road',
      postal: 'London, EC2A 3AY, UK',
      phone: '+44 20 1234 5678',
      hours: 'Mon-Fri: 9AM-5PM GMT',
    },
  ];

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
              <span className="text-foreground">Contact Support</span>
            </div>
            <div className="inline-block p-4 bg-accent/10 rounded-full mb-6">
              <Headphones size={40} className="text-accent" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              We're Here to Help
            </h1>
            <p className="text-lg text-foreground/70">
              Get in touch with our support team. We're available 24/7 to assist you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Choose Your Preferred Contact Method</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {contactMethods.map((method) => {
              const Icon = method.icon;
              return (
                <div
                  key={method.title}
                  className="bg-card border border-border rounded-xl p-6 hover:border-accent/50 transition-all group"
                >
                  <div className={`inline-block p-3 ${method.bgColor} rounded-lg mb-4`}>
                    <Icon size={28} className={method.color} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
                  <p className="text-sm text-foreground/70 mb-4">{method.description}</p>
                  <div className="font-medium text-accent mb-2">{method.action}</div>
                  <div className="flex items-center gap-2 text-xs text-foreground/60">
                    <Clock size={14} />
                    <span>{method.availability}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Send Us a Message</h2>
              <p className="text-foreground/70">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="orderNumber" className="block text-sm font-medium mb-2">
                    Order Number (Optional)
                  </label>
                  <input
                    type="text"
                    id="orderNumber"
                    name="orderNumber"
                    value={formData.orderNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="#ORD-12345"
                  />
                </div>

                <div>
                  <label htmlFor="priority" className="block text-sm font-medium mb-2">
                    Priority Level
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="low">Low - General Inquiry</option>
                    <option value="medium">Medium - Need Assistance</option>
                    <option value="high">High - Urgent Issue</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="How can we help you?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                  placeholder="Please provide as much detail as possible..."
                />
              </div>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg text-green-800 dark:text-green-200">
                  <p className="font-medium">Message sent successfully!</p>
                  <p className="text-sm mt-1">We'll get back to you within 24 hours.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-200">
                  <p className="font-medium">Something went wrong!</p>
                  <p className="text-sm mt-1">Please try again or contact us directly.</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Our Office Locations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {officeLocations.map((location) => (
              <div
                key={location.city}
                className="bg-card border border-border rounded-xl p-6"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <MapPin size={20} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{location.city}</h3>
                    <p className="text-sm text-foreground/70">{location.address}</p>
                    <p className="text-sm text-foreground/70">{location.postal}</p>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone size={16} className="text-accent" />
                    <span>{location.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground/70">
                    <Clock size={16} className="text-accent" />
                    <span>{location.hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-6">Before You Contact Us</h2>
            <p className="text-foreground/70 mb-8">
              You might find the answer you're looking for in our help resources:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/support/faq"
                className="p-4 bg-background border border-border rounded-lg hover:border-accent/50 transition-all group"
              >
                <h3 className="font-semibold mb-2 group-hover:text-accent transition-colors">FAQ</h3>
                <p className="text-sm text-foreground/70">Browse frequently asked questions</p>
              </Link>
              <Link
                href="/support/help-center"
                className="p-4 bg-background border border-border rounded-lg hover:border-accent/50 transition-all group"
              >
                <h3 className="font-semibold mb-2 group-hover:text-accent transition-colors">Help Center</h3>
                <p className="text-sm text-foreground/70">Search our knowledge base</p>
              </Link>
              <Link
                href="/support/shipping-info"
                className="p-4 bg-background border border-border rounded-lg hover:border-accent/50 transition-all group"
              >
                <h3 className="font-semibold mb-2 group-hover:text-accent transition-colors">Shipping Info</h3>
                <p className="text-sm text-foreground/70">Track your order or learn about delivery</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
