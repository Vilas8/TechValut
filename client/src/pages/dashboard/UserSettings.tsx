import { useState } from "react";
import { Bell, Lock, Shield, Moon, Sun, Globe, Trash2, Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "./DashboardLayout";

export default function UserSettings() {
  const { logout } = useAuth();
  const [notifications, setNotifications] = useState({ orders: true, promo: false, security: true, newsletter: false });
  const [passwords, setPasswords] = useState({ current: "", next: "", confirm: "" });
  const [show, setShow] = useState({ current: false, next: false });
  const [darkMode, setDarkMode] = useState(false);

  const toggleDark = (val: boolean) => {
    setDarkMode(val);
    document.documentElement.classList.toggle("dark", val);
    toast.success(val ? "Dark mode enabled" : "Light mode enabled");
  };

  const handlePasswordSave = () => {
    if (!passwords.current || !passwords.next) { toast.error("Fill all fields"); return; }
    if (passwords.next !== passwords.confirm) { toast.error("Passwords don't match"); return; }
    if (passwords.next.length < 6) { toast.error("Password too short"); return; }
    setPasswords({ current: "", next: "", confirm: "" });
    toast.success("Password updated!");
  };

  const handleDeleteAccount = () => {
    toast.error("Contact support to delete your account.");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Manage your account preferences</p>
        </div>

        {/* Appearance */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2"><Sun className="h-4 w-4" /> Appearance</CardTitle>
            <CardDescription>Customize how TechVault looks for you</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {darkMode ? <Moon className="h-5 w-5 text-primary" /> : <Sun className="h-5 w-5 text-primary" />}
                <div>
                  <p className="font-medium text-sm">Dark Mode</p>
                  <p className="text-xs text-muted-foreground">Switch between light and dark themes</p>
                </div>
              </div>
              <Switch checked={darkMode} onCheckedChange={toggleDark} />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2"><Bell className="h-4 w-4" /> Notifications</CardTitle>
            <CardDescription>Choose what you want to be notified about</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { key: "orders" as const, label: "Order Updates", desc: "Shipping and delivery notifications" },
              { key: "promo" as const, label: "Promotions & Deals", desc: "Exclusive offers and discounts" },
              { key: "security" as const, label: "Security Alerts", desc: "Login and security notifications" },
              { key: "newsletter" as const, label: "Newsletter", desc: "Weekly tech news and product updates" },
            ].map(({ key, label, desc }) => (
              <div key={key}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{label}</p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                  <Switch checked={notifications[key]} onCheckedChange={(val) => setNotifications((p) => ({ ...p, [key]: val }))} />
                </div>
                <Separator className="mt-3" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2"><Lock className="h-4 w-4" /> Change Password</CardTitle>
            <CardDescription>Use a strong password to keep your account secure</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { key: "current" as const, label: "Current Password", showKey: "current" as const },
              { key: "next" as const, label: "New Password", showKey: "next" as const },
            ].map(({ key, label, showKey }) => (
              <div key={key} className="space-y-2">
                <Label>{label}</Label>
                <div className="relative">
                  <Input
                    type={show[showKey] ? "text" : "password"}
                    placeholder="••••••••"
                    value={passwords[key]}
                    onChange={(e) => setPasswords((p) => ({ ...p, [key]: e.target.value }))}
                  />
                  <button type="button" onClick={() => setShow((p) => ({ ...p, [showKey]: !p[showKey] }))} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {show[showKey] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            ))}
            <div className="space-y-2">
              <Label>Confirm New Password</Label>
              <Input type="password" placeholder="••••••••" value={passwords.confirm} onChange={(e) => setPasswords((p) => ({ ...p, confirm: e.target.value }))} />
            </div>
            <Button onClick={handlePasswordSave} className="gap-2">
              <Shield className="h-4 w-4" /> Update Password
            </Button>
          </CardContent>
        </Card>

        {/* Danger zone */}
        <Card className="border-destructive/30">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2 text-destructive"><Trash2 className="h-4 w-4" /> Danger Zone</CardTitle>
            <CardDescription>These actions are irreversible. Please proceed with caution.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/5" onClick={() => { logout(); window.location.href = "/login"; }}>
              Sign Out All Devices
            </Button>
            <Button variant="destructive" onClick={handleDeleteAccount}>
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
