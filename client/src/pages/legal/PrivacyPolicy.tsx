import { NavigationHeader } from '@/components/NavigationHeader';
import { Footer } from '@/components/Footer';
import { Shield } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <NavigationHeader />
      <main className="flex-1 container max-w-3xl py-12 px-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
        </div>
        <p className="text-muted-foreground text-sm mb-8">Last updated: February 2026</p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-foreground/80 text-sm leading-relaxed">

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">1. Information We Collect</h2>
            <p>We collect information you provide directly to us when you create an account, make a purchase, or contact us for support. This includes your name, email address, shipping address, and payment information.</p>
            <p className="mt-2">We also automatically collect certain information about your device and how you interact with our platform, including IP address, browser type, pages visited, and time spent on those pages.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">2. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>To process and fulfil your orders</li>
              <li>To send you order confirmations and shipping updates</li>
              <li>To respond to your customer service requests</li>
              <li>To personalise your shopping experience</li>
              <li>To improve our website and services</li>
              <li>To send you promotional offers (with your consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">3. Sharing of Information</h2>
            <p>We do not sell or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website, processing payments, or delivering orders — all under strict confidentiality agreements.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">4. Cookies</h2>
            <p>We use cookies and similar tracking technologies to enhance your experience on our site. You can control cookie preferences at any time through our <a href="/cookie-settings" className="text-primary hover:underline">Cookie Settings</a> page.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">5. Data Security</h2>
            <p>We implement industry-standard security measures to protect your personal data. All payment transactions are encrypted using SSL technology. However, no method of transmission over the internet is 100% secure.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">6. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal data at any time. You may also withdraw consent for marketing communications. To exercise these rights, contact us at <a href="/contact" className="text-primary hover:underline">our contact page</a>.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">7. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by posting a notice on our website or sending you an email.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">8. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please <a href="/contact" className="text-primary hover:underline">contact us</a>.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
