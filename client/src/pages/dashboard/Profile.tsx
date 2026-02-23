import DashboardLayout from './DashboardLayout';
import { trpc } from '@/lib/trpc';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { User, Save, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export default function Profile() {
  const { user } = useAuth();
  const { data: profile, isLoading, refetch } = trpc.user.profile.useQuery();
  const updateProfile = trpc.user.updateProfile.useMutation({
    onSuccess: () => { toast.success('Profile updated successfully!'); refetch(); },
    onError: () => toast.error('Failed to update profile'),
  });

  const [form, setForm] = useState({
    name: '', phone: '', address: '', city: '', state: '', zipCode: '', country: '',
  });

  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name ?? '',
        phone: profile.phone ?? '',
        address: profile.address ?? '',
        city: profile.city ?? '',
        state: profile.state ?? '',
        zipCode: profile.zipCode ?? '',
        country: profile.country ?? '',
      });
    }
  }, [profile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile.mutate(form);
  };

  const fields = [
    { key: 'name', label: 'Full Name', placeholder: 'Your full name', span: 'col-span-2' },
    { key: 'phone', label: 'Phone Number', placeholder: '+91 98765 43210', span: '' },
    { key: 'address', label: 'Address', placeholder: 'Street address', span: 'col-span-2' },
    { key: 'city', label: 'City', placeholder: 'City', span: '' },
    { key: 'state', label: 'State', placeholder: 'State', span: '' },
    { key: 'zipCode', label: 'ZIP Code', placeholder: '560001', span: '' },
    { key: 'country', label: 'Country', placeholder: 'India', span: '' },
  ] as const;

  return (
    <DashboardLayout>
      <div className="max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2"><User className="text-primary" size={24} /> My Profile</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage your personal information</p>
          </div>
          <button onClick={() => refetch()} className="flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-lg hover:bg-secondary transition-colors">
            <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} /> Refresh
          </button>
        </div>

        {/* Avatar Card */}
        <div className="bg-card border border-border rounded-xl p-6 mb-5 flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center text-primary font-bold text-2xl">
            {(user?.name ?? user?.email ?? 'U')[0].toUpperCase()}
          </div>
          <div>
            <p className="text-lg font-bold text-foreground">{profile?.name ?? user?.name ?? 'User'}</p>
            <p className="text-sm text-muted-foreground">{profile?.email ?? user?.email}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Member since {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) : '—'}
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6">
          <h2 className="font-semibold text-foreground mb-5">Edit Information</h2>
          {isLoading ? (
            <div className="grid grid-cols-2 gap-4">{[...Array(6)].map((_, i) => <div key={i} className="h-12 bg-muted rounded-lg animate-pulse" />)}</div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {fields.map(({ key, label, placeholder, span }) => (
                <div key={key} className={span}>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">{label}</label>
                  <input
                    type="text"
                    placeholder={placeholder}
                    value={form[key]}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    className="w-full px-3.5 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              ))}
            </div>
          )}
          <div className="mt-5 flex justify-end">
            <button
              type="submit"
              disabled={updateProfile.isPending || isLoading}
              className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:bg-primary/90 disabled:opacity-60 transition-colors"
            >
              {updateProfile.isPending ? <RefreshCw size={15} className="animate-spin" /> : <Save size={15} />}
              {updateProfile.isPending ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
