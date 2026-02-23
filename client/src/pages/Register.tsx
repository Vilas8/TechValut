import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff, Zap, Lock, Mail, User, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Register() {
  const { register, isLoading } = useAuth();
  const [, navigate] = useLocation();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const passwordStrength = (p: string) => {
    if (p.length === 0) return null;
    if (p.length < 6) return "weak";
    if (p.length < 10 || !/[A-Z]/.test(p) || !/[0-9]/.test(p)) return "medium";
    return "strong";
  };

  const strength = passwordStrength(form.password);
  const strengthColor = { weak: "bg-destructive", medium: "bg-yellow-400", strong: "bg-green-500" };
  const strengthWidth = { weak: "w-1/3", medium: "w-2/3", strong: "w-full" };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    const result = await register(form.name, form.email, form.password);
    if (!result.success) {
      setError(result.error || "Registration failed.");
    } else {
      setSuccess(true);
      setTimeout(() => navigate("/dashboard"), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/90 to-primary/60 flex-col justify-between p-12 text-white">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2">
            <Zap className="h-7 w-7 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight">TechVault Pro</span>
        </div>
        <div>
          <h1 className="text-4xl font-bold leading-tight mb-4">
            Join the Future
            <br />
            of Tech Shopping
          </h1>
          <p className="text-white/80 text-lg">
            Create your account and unlock personalized deals, order tracking, and exclusive member benefits.
          </p>
          <div className="mt-8 space-y-3">
            {["Personalized recommendations", "Order tracking & history", "Exclusive member discounts", "Wishlist & saved items"].map((f) => (
              <div key={f} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-white/70" />
                <span className="text-white/90">{f}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-white/50 text-sm">© 2025 TechVault Pro. All rights reserved.</p>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <Zap className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">TechVault Pro</span>
          </div>

          <Card className="border-border shadow-lg">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-2xl font-bold">Create account</CardTitle>
              <CardDescription>Join TechVault Pro today — it's free</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                {success && (
                  <Alert className="border-green-500 text-green-700 bg-green-50 dark:bg-green-950 dark:text-green-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertDescription>Account created! Redirecting to dashboard...</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="name" placeholder="John Doe" className="pl-9" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} disabled={isLoading} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="email" type="email" placeholder="you@example.com" className="pl-9" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} disabled={isLoading} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="password" type={showPassword ? "text" : "password"} placeholder="Min. 6 characters" className="pl-9 pr-9" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} disabled={isLoading} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {strength && (
                    <div className="space-y-1">
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all ${strengthColor[strength]} ${strengthWidth[strength]}`} />
                      </div>
                      <p className="text-xs text-muted-foreground capitalize">Password strength: <span className="font-medium text-foreground">{strength}</span></p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="confirm" type="password" placeholder="Repeat your password" className="pl-9" value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} disabled={isLoading} />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading || success}>
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link href="/login" className="text-primary font-medium hover:underline">Sign in</Link>
                </p>
              </form>
            </CardContent>
          </Card>

          <p className="text-center text-xs text-muted-foreground mt-6">
            <Link href="/" className="hover:text-primary">← Back to Store</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
