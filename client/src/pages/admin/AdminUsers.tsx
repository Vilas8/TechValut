import AdminLayout from './AdminLayout';
import { trpc } from '@/lib/trpc';
import { Search, RefreshCw, MoreVertical } from 'lucide-react';
import { useState } from 'react';

export default function AdminUsers() {
  const [search, setSearch] = useState('');
  const { data: users, isLoading, refetch } = trpc.admin.allUsers.useQuery();

  const filtered = (users ?? []).filter((u) => {
    const q = search.toLowerCase();
    return (
      (u.name ?? '').toLowerCase().includes(q) ||
      (u.email ?? '').toLowerCase().includes(q)
    );
  });

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Users</h1>
          <p className="text-sm text-muted-foreground mt-1">{users?.length ?? 0} total registered users</p>
        </div>
        <button onClick={() => refetch()} className="flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-lg hover:bg-secondary transition-colors">
          <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} /> Refresh
        </button>
      </div>

      <div className="bg-card border border-border rounded-xl">
        {/* Search */}
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {['User', 'Role', 'Joined', 'Last Seen', 'Actions'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                [...Array(6)].map((_, i) => (
                  <tr key={i}>
                    {[...Array(5)].map((_, j) => (
                      <td key={j} className="px-5 py-4">
                        <div className="h-4 bg-muted rounded animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr><td colSpan={5} className="px-5 py-10 text-center text-muted-foreground">No users found</td></tr>
              ) : (
                filtered.map((u) => (
                  <tr key={u.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/15 text-primary font-bold text-sm flex items-center justify-center">
                          {(u.name ?? u.email ?? '?')[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{u.name ?? 'Unknown'}</p>
                          <p className="text-xs text-muted-foreground">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        u.role === 'admin' ? 'bg-primary/10 text-primary' : 'bg-green-100 text-green-700'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">
                      {new Date(u.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">
                      {new Date(u.lastSignedIn).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-5 py-4">
                      <button className="p-1.5 hover:bg-muted rounded-lg transition-colors">
                        <MoreVertical size={16} className="text-muted-foreground" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
