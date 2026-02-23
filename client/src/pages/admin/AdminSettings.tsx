import { Settings, Bell, Shield, Globe, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { toast } from "sonner";
import AdminLayout from "./AdminLayout";

export default function AdminSettings() {
  const [storeSettings, setStoreSettings] = useState({
    storeName: "TechVault Pro",
    storeEmail: "support@techvault.com",
    currency: "INR",
    timezone: "Asia/Kolkata",
  });
  const [toggles, setToggles] = useState({
    maintenance: false,
    guestCheckout: true,
    reviewsEnabled: true,
    emailNotifications: true,
    orderAlerts: true,
  });

  const toggle = (key: keyof typeof toggles) =>
    setToggles((p) => ({ ...p, [key]: !p[key] }));

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="text-2xl font-bold">Admin Settings</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Configure global store settings</p>
        </div>

        {/* Store info */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2"><Globe className="h-4 w-4" /> Store Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(Object.entries(storeSettings) as [keyof typeof storeSettings, string][]).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <Label className="capitalize">{key.replace(/([A-Z])/g, " $1")}</Label>
                  <Input value={value} onChange={(e) => setStoreSettings((p) => ({ ...p, [key]: e.target.value }))} />
                </div>
              ))}
            </div>
            <Button className="gap-2" onClick={() => toast.success("Store settings saved!")}
            >
              <Save className="h-4 w-4" /> Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Store toggles */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2"><Settings className="h-4 w-4" /> Store Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { key: "maintenance" as const, label: "Maintenance Mode", desc: "Put the store offline for maintenance" },
              { key: "guestCheckout" as const, label: "Guest Checkout", desc: "Allow purchases without account" },
              { key: "reviewsEnabled" as const, label: "Product Reviews", desc: "Enable customer product reviews" },
            ].map(({ key, label, desc }) => (
              <div key={key}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{label}</p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                  <Switch checked={toggles[key]} onCheckedChange={() => toggle(key)} />
                </div>
                <Separator className="mt-3" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2"><Bell className="h-4 w-4" /> Admin Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { key: "emailNotifications" as const, label: "Email Alerts", desc: "Receive admin notifications via email" },
              { key: "orderAlerts" as const, label: "New Order Alerts", desc: "Get notified on every new order" },
            ].map(({ key, label, desc }) => (
              <div key={key}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{label}</p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                  <Switch checked={toggles[key]} onCheckedChange={() => toggle(key)} />
                </div>
                <Separator className="mt-3" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
