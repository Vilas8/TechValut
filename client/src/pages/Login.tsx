import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff, Zap, Lock, Mail, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Login() {
  const { login, isLoading } = useAuth();
  const [, navigate] = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    const result = await login(form.email, form.password);
    if (!result.success) {
      setError(result.error || "Login failed.");
    } else {
      // redirect admin to admin panel, users to dashboard
      if (form.email.toLowerCase() === "admin@techvault.com") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/90 to-primary/60 flex-col justify-between p-12 text-white">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2">
            <Zap className="h-7 w-7 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight">TechVault Pro</span>
        </div>
        <div>
          <h1 className="text-4xl font-bold leading-tight mb-4">
            Your Premium Tech
            <br />
            Destination Awaits
          </h1>
          <p className="text-white/80 text-lg">
            Access exclusive deals, track your orders, and manage your wishlist — all in one place.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {["10K+ Products", "Free Shipping", "Easy Returns", "24/7 Support"].map((f) => (
              <div key={f} className="bg-white/10 rounded-lg px-4 py-3 text-sm font-medium">{f}</div>
            ))}
          </div>
        </div>
        <p className="text-white/50 text-sm">© 2025 TechVault Pro. All rights reserved.</p>
      </div>

      {/* Right login form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <Zap className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">TechVault Pro</span>
          </div>

          <Card className="border-border shadow-lg">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
              <CardDescription>Sign in to your TechVault account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-9"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-9 pr-9"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>

                <div className="relative my-2">
                  <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or</span>
                  </div>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link href="/register" className="text-primary font-medium hover:underline">
                    Create one
                  </Link>
                </p>

                <div className="mt-4 p-3 bg-muted/50 rounded-lg border border-border">
                  <p className="text-xs text-muted-foreground font-semibold mb-1">Admin Access</p>
                  <p className="text-xs text-muted-foreground">Email: <span className="text-foreground font-mono">admin@techvault.com</span></p>
                  <p className="text-xs text-muted-foreground">Password: <span className="text-foreground font-mono">TechVault@Admin2025</span></p>
                </div>
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
