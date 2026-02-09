import { useState } from 'react';
import { useLocation } from 'wouter';
import { User, LogOut, Package, Settings, Loader } from 'lucide-react';
import { NavigationHeader } from '@/components/NavigationHeader';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/_core/hooks/useAuth';
import { trpc } from '@/lib/trpc';

export default function Account() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'orders' | 'profile'>('orders');
  const [, setLocation] = useLocation();

  // Fetch user orders
  const { data: orders = [], isLoading: ordersLoading } = trpc.orders.list.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  // Fetch user profile
  const { data: profile, isLoading: profileLoading } = trpc.user.profile.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const [profileForm, setProfileForm] = useState({
    phone: profile?.phone || '',
    address: profile?.address || '',
    city: profile?.city || '',
    state: profile?.state || '',
    zipCode: profile?.zipCode || '',
    country: profile?.country || '',
  });

  const updateProfileMutation = trpc.user.updateProfile.useMutation({
    onSuccess: () => {
      alert('Profile updated successfully!');
    },
  });

  const handleProfileUpdate = () => {
    updateProfileMutation.mutate(profileForm);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <NavigationHeader />
        <div className="container py-16 flex-1 flex items-center justify-center">
          <Loader size={48} className="animate-spin text-accent" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <NavigationHeader />
        <div className="container py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Please log in</h1>
          <p className="text-foreground/60 mb-6">You need to be logged in to view your account.</p>
          <Button className="btn-primary">
            <a href="/">Back to Home</a>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavigationHeader />

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-xl p-6 space-y-6 sticky top-24">
              {/* User Info */}
              <div className="space-y-3">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <User size={32} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{user?.name || 'User'}</p>
                  <p className="text-sm text-foreground/60">{user?.email}</p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
                    activeTab === 'orders'
                      ? 'bg-accent text-accent-foreground'
                      : 'hover:bg-secondary text-foreground'
                  }`}
                >
                  <Package size={18} />
                  <span>My Orders</span>
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
                    activeTab === 'profile'
                      ? 'bg-accent text-accent-foreground'
                      : 'hover:bg-secondary text-foreground'
                  }`}
                >
                  <Settings size={18} />
                  <span>Profile Settings</span>
                </button>
              </nav>

              {/* Logout */}
              <button
                onClick={() => {
                  logout();
                  setLocation('/');
                }}
                className="w-full px-4 py-3 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors flex items-center gap-3"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">My Orders</h2>
                  <p className="text-foreground/60">View and track your orders</p>
                </div>

                {ordersLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader size={32} className="animate-spin text-accent" />
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-12 bg-card border border-border rounded-xl">
                    <Package size={48} className="mx-auto mb-4 text-foreground/30" />
                    <p className="text-foreground/60 mb-4">No orders yet</p>
                    <Button className="btn-primary">
                      <a href="/products">Start Shopping</a>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="bg-card border border-border rounded-xl p-6 hover:border-accent/50 transition-colors cursor-pointer"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-sm text-foreground/60 mb-1">Order Number</p>
                            <p className="font-semibold text-foreground">{order.orderNumber}</p>
                          </div>
                          <div>
                            <p className="text-sm text-foreground/60 mb-1">Date</p>
                            <p className="font-semibold text-foreground">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-foreground/60 mb-1">Total</p>
                            <p className="font-semibold text-accent">₹{(order.total / 100).toFixed(0)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-foreground/60 mb-1">Status</p>
                            <div className="inline-block">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  order.status === 'delivered'
                                    ? 'bg-green-500/20 text-green-600'
                                    : order.status === 'shipped'
                                    ? 'bg-blue-500/20 text-blue-600'
                                    : order.status === 'cancelled'
                                    ? 'bg-red-500/20 text-red-600'
                                    : 'bg-yellow-500/20 text-yellow-600'
                                }`}
                              >
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Profile Settings</h2>
                  <p className="text-foreground/60">Update your personal information</p>
                </div>

                {profileLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader size={32} className="animate-spin text-accent" />
                  </div>
                ) : (
                  <div className="bg-card border border-border rounded-xl p-6 space-y-6">
                    {/* Account Info */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-foreground">Account Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                          <input
                            type="text"
                            value={user?.name || ''}
                            disabled
                            className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground/60 cursor-not-allowed"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                          <input
                            type="email"
                            value={user?.email || ''}
                            disabled
                            className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground/60 cursor-not-allowed"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="space-y-4 pt-6 border-t border-border">
                      <h3 className="font-semibold text-foreground">Shipping Address</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                          <input
                            type="tel"
                            value={profileForm.phone}
                            onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                            className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:border-accent"
                            placeholder="+1 (555) 000-0000"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Country</label>
                          <input
                            type="text"
                            value={profileForm.country}
                            onChange={(e) => setProfileForm({ ...profileForm, country: e.target.value })}
                            className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:border-accent"
                            placeholder="Japan"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-foreground mb-2">Address</label>
                          <input
                            type="text"
                            value={profileForm.address}
                            onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                            className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:border-accent"
                            placeholder="123 Main Street"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">City</label>
                          <input
                            type="text"
                            value={profileForm.city}
                            onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                            className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:border-accent"
                            placeholder="Tokyo"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">State/Province</label>
                          <input
                            type="text"
                            value={profileForm.state}
                            onChange={(e) => setProfileForm({ ...profileForm, state: e.target.value })}
                            className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:border-accent"
                            placeholder="Shibuya"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Zip Code</label>
                          <input
                            type="text"
                            value={profileForm.zipCode}
                            onChange={(e) => setProfileForm({ ...profileForm, zipCode: e.target.value })}
                            className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:border-accent"
                            placeholder="150-0001"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end pt-6 border-t border-border">
                      <Button
                        onClick={handleProfileUpdate}
                        disabled={updateProfileMutation.isPending}
                        className="btn-primary"
                      >
                        {updateProfileMutation.isPending ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
