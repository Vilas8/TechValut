import { Users, Search, MoreVertical, Shield, UserX, Mail } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { toast } from "sonner";
import AdminLayout from "./AdminLayout";

const users = [
  { id: 1, name: "Priya Sharma", email: "priya@example.com", orders: 8, spent: "₹3,24,870", status: "Active", joined: "Jan 15, 2025" },
  { id: 2, name: "Rahul Verma", email: "rahul@example.com", orders: 3, spent: "₹89,970", status: "Active", joined: "Jan 22, 2025" },
  { id: 3, name: "Aarti Patel", email: "aarti@example.com", orders: 12, spent: "₹5,19,880", status: "Active", joined: "Dec 10, 2024" },
  { id: 4, name: "Kiran Kumar", email: "kiran@example.com", orders: 5, spent: "₹2,14,950", status: "Active", joined: "Dec 28, 2024" },
  { id: 5, name: "Deepak Singh", email: "deepak@example.com", orders: 1, spent: "₹29,990", status: "Suspended", joined: "Feb 5, 2025" },
  { id: 6, name: "Neha Gupta", email: "neha@example.com", orders: 7, spent: "₹2,89,930", status: "Active", joined: "Nov 18, 2024" },
];

export default function AdminUsers() {
  const [search, setSearch] = useState("");
  const filtered = users.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">Users</h1>
            <p className="text-muted-foreground text-sm mt-0.5">{users.length} total registered users</p>
          </div>
        </div>

        <Card className="border-border">
          <CardHeader className="pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search users by name or email..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-muted-foreground text-left">
                    <th className="pb-3 font-medium">User</th>
                    <th className="pb-3 font-medium">Orders</th>
                    <th className="pb-3 font-medium">Total Spent</th>
                    <th className="pb-3 font-medium">Joined</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map((u) => (
                    <tr key={u.id} className="hover:bg-muted/30 transition-colors">
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-primary font-bold text-xs shrink-0">
                            {u.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{u.name}</p>
                            <p className="text-xs text-muted-foreground">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 pr-4">{u.orders}</td>
                      <td className="py-3 pr-4 font-semibold">{u.spent}</td>
                      <td className="py-3 pr-4 text-muted-foreground">{u.joined}</td>
                      <td className="py-3 pr-4">
                        <Badge className={u.status === "Active" ? "bg-green-500/10 text-green-600 border-0" : "bg-red-500/10 text-red-600 border-0"}>{u.status}</Badge>
                      </td>
                      <td className="py-3">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => toast.success(`Email sent to ${u.name}`)} className="gap-2">
                              <Mail className="h-4 w-4" /> Send Email
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toast.success(`${u.name} promoted to admin`)} className="gap-2">
                              <Shield className="h-4 w-4" /> Make Admin
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toast.error(`${u.name} suspended`)} className="gap-2 text-destructive">
                              <UserX className="h-4 w-4" /> Suspend User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
