import { NavigationHeader } from '@/components/NavigationHeader';
import { Footer } from '@/components/Footer';
import { FileText } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <NavigationHeader />
      <main className="flex-1 container max-w-3xl py-12 px-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Terms of Service</h1>
        </div>
        <p className="text-muted-foreground text-sm mb-8">Last updated: February 2026</p>

        <div className="space-y-8 text-foreground/80 text-sm leading-relaxed">

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">1. Acceptance of Terms</h2>
            <p>By accessing or using TechVault, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">2. Use of the Platform</h2>
            <p>You agree to use TechVault only for lawful purposes. You must not use our platform in any way that breaches applicable local, national, or international laws or regulations.</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>You must be at least 18 years old to make a purchase</li>
              <li>You are responsible for maintaining the security of your account</li>
              <li>You must not attempt to gain unauthorised access to our systems</li>
              <li>You must not engage in fraudulent activity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">3. Orders and Payments</h2>
            <p>When you place an order, you are making an offer to purchase the product at the listed price. We reserve the right to refuse or cancel any order at our discretion. Payment must be made in full at the time of purchase.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">4. Shipping and Delivery</h2>
            <p>Estimated delivery times are provided at checkout. TechVault is not responsible for delays caused by courier services or customs processing. Risk of loss and title for items purchased pass to you upon delivery.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">5. Returns and Refunds</h2>
            <p>We accept returns within 30 days of delivery for most products in original, unopened condition. Please visit our <a href="/support/returns" className="text-primary hover:underline">Returns page</a> for detailed instructions. Refunds are processed within 5–7 business days.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">6. Product Descriptions</h2>
            <p>We strive to display accurate product information. However, we do not warrant that product descriptions, prices, or other content is error-free. We reserve the right to correct any errors and update information at any time.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">7. Intellectual Property</h2>
            <p>All content on TechVault, including text, images, logos, and software, is the property of TechVault and is protected by applicable intellectual property laws. You may not reproduce or distribute any content without our express written permission.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">8. Limitation of Liability</h2>
            <p>To the fullest extent permitted by law, TechVault shall not be liable for any indirect, incidental, or consequential damages arising from your use of our platform or products purchased through it.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">9. Changes to Terms</h2>
            <p>We reserve the right to modify these Terms of Service at any time. Continued use of TechVault after changes are posted constitutes your acceptance of the revised terms.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">10. Contact</h2>
            <p>For any questions regarding these Terms, please <a href="/contact" className="text-primary hover:underline">contact us</a>.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
