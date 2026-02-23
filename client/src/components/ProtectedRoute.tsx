import { useAuth } from "@/contexts/AuthContext";
import { Redirect } from "wouter";
import { ReactNode } from "react";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
  redirectTo?: string;
}

export default function ProtectedRoute({ children, adminOnly = false, redirectTo = "/login" }: ProtectedRouteProps) {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return <Redirect to={redirectTo} />;
  if (adminOnly && !isAdmin) return <Redirect to="/dashboard" />;

  return <>{children}</>;
}
