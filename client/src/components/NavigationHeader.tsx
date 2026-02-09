import { useState } from 'react';
import { Menu, X, ShoppingCart, Search, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useCart } from '@/contexts/CartContext';
import { useLocation } from 'wouter';

export function NavigationHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, toggleTheme } = useTheme();
  const { totalItems } = useCart();
  const [, setLocation] = useLocation();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/products?search=${encodeURIComponent(searchQuery)}`);
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 flex-shrink-0 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:shadow-lg group-hover:shadow-accent/50 transition-shadow duration-300">
              <span className="font-bold text-lg text-primary-foreground">TV</span>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-bold text-lg text-foreground leading-none">TechVault</span>
              <span className="text-xs text-accent font-medium">Premium Tech</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-4 py-2 text-foreground/70 hover:text-accent transition-colors font-medium text-sm"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xs">
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40 group-focus-within:text-accent transition-colors size-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-secondary/50 border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent focus:bg-secondary transition-all duration-300"
              />
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-lg hover:bg-secondary transition-colors hidden sm:flex items-center justify-center group"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon size={20} className="text-foreground/70 group-hover:text-accent transition-colors" />
              ) : (
                <Sun size={20} className="text-foreground/70 group-hover:text-accent transition-colors" />
              )}
            </button>

            {/* Cart Button */}
            <a href="/cart" className="relative p-2.5 rounded-lg hover:bg-secondary transition-colors hidden sm:flex items-center justify-center group">
              <ShoppingCart size={20} className="text-foreground/70 group-hover:text-accent transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2.5 rounded-lg hover:bg-secondary transition-colors"
            >
              {isMenuOpen ? (
                <X size={20} className="text-accent" />
              ) : (
                <Menu size={20} className="text-foreground/70" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-border space-y-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2.5 text-foreground/70 hover:text-accent hover:bg-secondary rounded-lg transition-all duration-300 font-medium"
              >
                {item.label}
              </a>
            ))}

            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="px-4 py-2">
              <div className="relative w-full group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40 group-focus-within:text-accent transition-colors size-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-secondary/50 border border-border rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent focus:bg-secondary transition-all duration-300"
                />
              </div>
            </form>

            {/* Mobile Theme Toggle */}
            <button
              onClick={() => {
                if (toggleTheme) toggleTheme();
                setIsMenuOpen(false);
              }}
              className="w-full px-4 py-2.5 text-foreground/70 hover:text-accent hover:bg-secondary rounded-lg transition-all duration-300 font-medium flex items-center gap-2"
            >
              {theme === 'light' ? (
                <>
                  <Moon size={18} />
                  Dark Mode
                </>
              ) : (
                <>
                  <Sun size={18} />
                  Light Mode
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
