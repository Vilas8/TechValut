import { useState, useEffect, useRef } from 'react';
import { Menu, X, ShoppingCart, Search, Moon, Sun, User, LogOut, LayoutDashboard, Settings, Shield } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';

export function NavigationHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { totalItems } = useCart();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [location, setLocation] = useLocation();
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Sync search input with URL parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const search = params.get('search') || '';
    setSearchQuery(search);
  }, [location]);

  // Close user dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    setLocation('/');
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
          <div className="flex items-center gap-2">
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

            {/* ── AUTH BUTTON / USER DROPDOWN ── */}
            {!isAuthenticated ? (
              // Not logged in — show Sign In button with icon
              <div className="hidden sm:flex items-center gap-1.5">
                <a
                  href="/login"
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-foreground/70 hover:text-accent hover:bg-secondary rounded-lg transition-all duration-200"
                >
                  <User size={18} />
                  <span>Sign In</span>
                </a>
                <a
                  href="/register"
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg transition-all duration-200 shadow-sm"
                >
                  Sign Up
                </a>
              </div>
            ) : (
              // Logged in — show avatar with dropdown
              <div className="relative hidden sm:block" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-secondary transition-all duration-200 group"
                  aria-label="User menu"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-primary/60 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="hidden md:flex flex-col items-start">
                    <span className="text-xs font-semibold text-foreground leading-tight">{user?.name?.split(' ')[0]}</span>
                    {isAdmin && (
                      <span className="text-[10px] text-primary font-medium leading-tight">Admin</span>
                    )}
                  </div>
                </button>

                {/* Dropdown */}
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-card border border-border rounded-xl shadow-xl overflow-hidden z-50">
                    {/* User info header */}
                    <div className="px-4 py-3 border-b border-border bg-muted/40">
                      <p className="text-sm font-semibold text-foreground">{user?.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                      {isAdmin && (
                        <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">
                          <Shield size={10} /> Administrator
                        </span>
                      )}
                    </div>

                    {/* Menu items */}
                    <div className="py-1">
                      {isAdmin ? (
                        <a
                          href="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground/80 hover:text-accent hover:bg-muted transition-colors"
                        >
                          <Shield size={15} className="text-primary" />
                          Admin Panel
                        </a>
                      ) : null}
                      <a
                        href="/dashboard"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground/80 hover:text-accent hover:bg-muted transition-colors"
                      >
                        <LayoutDashboard size={15} className="text-muted-foreground" />
                        Dashboard
                      </a>
                      <a
                        href="/dashboard/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground/80 hover:text-accent hover:bg-muted transition-colors"
                      >
                        <User size={15} className="text-muted-foreground" />
                        My Profile
                      </a>
                      <a
                        href="/dashboard/settings"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground/80 hover:text-accent hover:bg-muted transition-colors"
                      >
                        <Settings size={15} className="text-muted-foreground" />
                        Settings
                      </a>
                    </div>

                    <div className="border-t border-border py-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                      >
                        <LogOut size={15} />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

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
          <div className="lg:hidden mt-4 pt-4 border-t border-border space-y-1">
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
            <form onSubmit={handleSearch} className="px-1 py-2">
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
              onClick={() => { if (toggleTheme) toggleTheme(); setIsMenuOpen(false); }}
              className="w-full px-4 py-2.5 text-foreground/70 hover:text-accent hover:bg-secondary rounded-lg transition-all duration-300 font-medium flex items-center gap-2"
            >
              {theme === 'light' ? <><Moon size={18} /> Dark Mode</> : <><Sun size={18} /> Light Mode</>}
            </button>

            {/* Mobile Auth Section */}
            <div className="pt-2 border-t border-border">
              {!isAuthenticated ? (
                <div className="flex gap-2 px-1">
                  <a
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium border border-border rounded-lg text-foreground/80 hover:bg-secondary transition-colors"
                  >
                    <User size={16} /> Sign In
                  </a>
                  <a
                    href="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg transition-colors"
                  >
                    Sign Up
                  </a>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 px-4 py-3 bg-muted/40 rounded-lg mx-1 mb-1">
                    <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center text-primary font-bold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                  {isAdmin && (
                    <a href="/admin" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-primary hover:bg-secondary rounded-lg transition-colors">
                      <Shield size={16} /> Admin Panel
                    </a>
                  )}
                  <a href="/dashboard" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-foreground/80 hover:bg-secondary rounded-lg transition-colors">
                    <LayoutDashboard size={16} /> Dashboard
                  </a>
                  <a href="/dashboard/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-foreground/80 hover:bg-secondary rounded-lg transition-colors">
                    <User size={16} /> My Profile
                  </a>
                  <button
                    onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
