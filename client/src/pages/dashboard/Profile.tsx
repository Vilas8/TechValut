import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { User, Mail, Phone, MapPin, Edit3, Save, X, Camera } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import DashboardLayout from "./DashboardLayout";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  const handleSave = () => {
    updateProfile({ name: form.name, phone: form.phone, address: form.address });
    setEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleCancel = () => {
    setForm({ name: user?.name || "", email: user?.email || "", phone: user?.phone || "", address: user?.address || "" });
    setEditing(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-3xl">
        <div>
          <h1 className="text-2xl font-bold">My Profile</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Manage your personal information</p>
        </div>

        {/* Avatar card */}
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/60 flex items-center justify-center text-3xl font-bold text-primary">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <button className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1.5 text-white shadow">
                  <Camera className="h-3 w-3" />
                </button>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold">{user?.name}</h2>
                <p className="text-muted-foreground text-sm">{user?.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary" className="capitalize text-xs">{user?.role}</Badge>
                  <span className="text-xs text-muted-foreground">Member since {user?.joinedAt}</span>
                </div>
              </div>
              {!editing && (
                <Button variant="outline" size="sm" className="gap-2" onClick={() => setEditing(true)}>
                  <Edit3 className="h-4 w-4" /> Edit Profile
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Info form */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base">Personal Information</CardTitle>
            <CardDescription>Update your personal details below</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input className="pl-9" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} disabled={!editing} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input className="pl-9" value={form.email} disabled type="email" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input className="pl-9" placeholder="+91 98765 43210" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} disabled={!editing} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input className="pl-9" placeholder="Your address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} disabled={!editing} />
                </div>
              </div>
            </div>

            {editing && (
              <div className="flex gap-3 pt-2">
                <Button onClick={handleSave} className="gap-2">
                  <Save className="h-4 w-4" /> Save Changes
                </Button>
                <Button variant="outline" onClick={handleCancel} className="gap-2">
                  <X className="h-4 w-4" /> Cancel
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
