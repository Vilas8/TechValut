import { Link } from 'wouter';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const productLinks = [
    { name: 'Laptops', href: '/products/laptops' },
    { name: 'Smartphones', href: '/products/smartphones' },
    { name: 'Audio', href: '/products/audio' },
    { name: 'Wearables', href: '/products/wearables' },
    { name: 'Accessories', href: '/products/accessories' },
  ];

  const companyLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Blog', href: '/company/blog' },
    { name: 'Careers', href: '/company/careers' },
    { name: 'Press', href: '/company/press' },
  ];

  const supportLinks = [
    { name: 'Help Center', href: '/support/help-center' },
    { name: 'Shipping Info', href: '/support/shipping-info' },
    { name: 'Returns', href: '/support/returns' },
    { name: 'FAQ', href: '/support/faq' },
    { name: 'Contact Support', href: '/support/contact' },
  ];

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/">
              <a className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="font-bold text-lg text-primary-foreground">TV</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-foreground">TechVault</span>
                  <span className="text-xs text-accent font-medium">Premium Tech</span>
                </div>
              </a>
            </Link>
            <p className="text-foreground/60 text-sm">
              Your trusted destination for premium electronics and cutting-edge technology.
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Products</h3>
            <ul className="space-y-2">
              {productLinks.map((item) => (
                <li key={item.name}>
                  <Link href={item.href}>
                    <a className="text-foreground/60 hover:text-accent transition-colors text-sm">
                      {item.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((item) => (
                <li key={item.name}>
                  <Link href={item.href}>
                    <a className="text-foreground/60 hover:text-accent transition-colors text-sm">
                      {item.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-2">
              {supportLinks.map((item) => (
                <li key={item.name}>
                  <Link href={item.href}>
                    <a className="text-foreground/60 hover:text-accent transition-colors text-sm">
                      {item.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-8"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-foreground/60">
          <p>&copy; {currentYear} TechVault. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-accent transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
