import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard, Users, ShoppingBag, Package, BarChart3,
  Settings, LogOut, Menu, X, Zap, ChevronRight, Bell, TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users, badge: "24" },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag, badge: "12" },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-background flex">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-64 z-30 flex flex-col transition-transform duration-300",
          "bg-gradient-to-b from-slate-900 to-slate-800 text-white",
          "lg:translate-x-0 lg:static lg:z-auto",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="bg-primary/20 rounded-lg p-1.5">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <div>
              <span className="font-bold text-sm text-white">TechVault Admin</span>
              <p className="text-xs text-white/40">Control Panel</p>
            </div>
          </div>
          <button className="lg:hidden text-white/60" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Admin badge */}
        <div className="px-4 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm shrink-0">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-sm text-white truncate">{user?.name}</p>
              <Badge className="bg-primary/20 text-primary border-0 text-xs mt-0.5">Administrator</Badge>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map(({ href, label, icon: Icon, badge }) => {
            const isActive = location === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                    : "text-white/60 hover:bg-white/10 hover:text-white"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="flex-1">{label}</span>
                {badge && (
                  <Badge className={cn("text-xs px-1.5 py-0 border-0", isActive ? "bg-white/20 text-white" : "bg-white/10 text-white/70")}>
                    {badge}
                  </Badge>
                )}
                {isActive && <ChevronRight className="h-3.5 w-3.5" />}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-white/10 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white transition-all"
          >
            <Zap className="h-4 w-4" />
            View Store
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur border-b border-border px-4 lg:px-6 py-3 flex items-center justify-between">
          <button className="lg:hidden text-muted-foreground hover:text-foreground" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>
          <div className="hidden lg:flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground bg-primary/10 text-primary px-2 py-0.5 rounded-full">Admin Panel</span>
            <span className="text-sm text-muted-foreground">— {user?.name}</span>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </Button>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
