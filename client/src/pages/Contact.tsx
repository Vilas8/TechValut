import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { NavigationHeader } from '@/components/NavigationHeader';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'support@techvault.com',
      description: 'We\'ll respond within 24 hours',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      description: 'Available 9am - 6pm EST',
    },
    {
      icon: MapPin,
      title: 'Address',
      value: 'San Francisco, CA',
      description: 'Headquarters & Support Center',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavigationHeader />



      {/* Contact Info Cards */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {contactInfo.map((info) => {
              const Icon = info.icon;
              return (
                <div key={info.title} className="p-6 bg-card border border-border rounded-xl text-center space-y-4">
                  <div className="inline-flex p-4 bg-accent/10 rounded-lg">
                    <Icon size={32} className="text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{info.title}</h3>
                  <div>
                    <p className="font-semibold text-foreground">{info.value}</p>
                    <p className="text-sm text-foreground/60">{info.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <div className="p-8 bg-card border border-border rounded-xl">
              <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>

              {submitted && (
                <div className="mb-6 p-4 bg-accent/10 border border-accent/30 rounded-lg text-accent">
                  <p className="font-semibold">Thank you for your message!</p>
                  <p className="text-sm">We'll get back to you as soon as possible.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-foreground">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-foreground">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent transition-colors"
                    placeholder="How can we help?"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-foreground">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent transition-colors resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary w-full inline-flex items-center justify-center gap-2"
                >
                  {isLoading ? 'Sending...' : (
                    <>
                      Send Message
                      <Send size={18} />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-card border-y border-border">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
            <p className="text-lg text-foreground/60">Find answers to common questions</p>
          </div>

          <div className="max-w-2xl mx-auto space-y-4">
            {[
              {
                q: 'What is your return policy?',
                a: 'We offer a 30-day money-back guarantee on all products. If you\'re not satisfied, simply contact our support team.',
              },
              {
                q: 'How long does shipping take?',
                a: 'Standard shipping takes 5-7 business days. Express shipping is available for 2-3 business day delivery.',
              },
              {
                q: 'Do you offer international shipping?',
                a: 'Yes, we ship to over 25 countries worldwide. Shipping costs and times vary by location.',
              },
              {
                q: 'What warranty do your products come with?',
                a: 'All products come with manufacturer warranties. Most electronics include 1-2 year coverage.',
              },
            ].map((faq, idx) => (
              <details
                key={idx}
                className="group p-4 bg-background border border-border rounded-lg cursor-pointer hover:border-accent/50 transition-colors"
              >
                <summary className="flex items-center justify-between font-semibold text-foreground">
                  {faq.q}
                  <span className="text-accent group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-foreground/70">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
