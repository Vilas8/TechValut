import { useState } from 'react';
import { NavigationHeader } from '@/components/NavigationHeader';
import { Footer } from '@/components/Footer';
import { Cookie, Check } from 'lucide-react';
import { toast } from 'sonner';

type CookiePrefs = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
};

export default function CookieSettings() {
  const [prefs, setPrefs] = useState<CookiePrefs>({
    necessary: true,
    analytics: true,
    marketing: false,
    preferences: true,
  });
  const [saved, setSaved] = useState(false);

  const toggle = (key: keyof CookiePrefs) => {
    if (key === 'necessary') return;
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    toast.success('Cookie preferences saved!');
  };

  const handleAcceptAll = () => {
    setPrefs({ necessary: true, analytics: true, marketing: true, preferences: true });
    setSaved(true);
    toast.success('All cookies accepted!');
  };

  const handleRejectAll = () => {
    setPrefs({ necessary: true, analytics: false, marketing: false, preferences: false });
    setSaved(true);
    toast.success('Optional cookies rejected.');
  };

  const cookieTypes = [
    {
      key: 'necessary' as const,
      title: 'Strictly Necessary',
      description: 'These cookies are essential for the website to function. They enable core features like shopping cart, account login, and checkout. They cannot be disabled.',
      required: true,
    },
    {
      key: 'preferences' as const,
      title: 'Preference Cookies',
      description: 'These cookies remember your settings and choices (such as language and theme) to provide a more personalised experience.',
      required: false,
    },
    {
      key: 'analytics' as const,
      title: 'Analytics Cookies',
      description: 'These cookies help us understand how visitors use TechVault — which pages are most visited and where errors occur — so we can improve our service.',
      required: false,
    },
    {
      key: 'marketing' as const,
      title: 'Marketing Cookies',
      description: 'These cookies track your browsing habits to deliver targeted advertisements relevant to your interests. They may be set by third-party advertising partners.',
      required: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <NavigationHeader />
      <main className="flex-1 container max-w-3xl py-12 px-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Cookie className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Cookie Settings</h1>
        </div>
        <p className="text-muted-foreground text-sm mb-8">Last updated: February 2026</p>

        <p className="text-foreground/70 text-sm leading-relaxed mb-8">
          We use cookies to enhance your browsing experience, serve personalised content, and analyse site traffic.
          You can choose which categories of cookies you allow below. Your choices are saved in your browser.
          Read our <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a> to learn more.
        </p>

        {/* Quick action buttons */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={handleAcceptAll}
            className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition"
          >
            Accept All
          </button>
          <button
            onClick={handleRejectAll}
            className="px-5 py-2.5 border border-border rounded-lg text-sm font-medium hover:bg-muted transition"
          >
            Reject Optional
          </button>
        </div>

        {/* Cookie preference cards */}
        <div className="space-y-4 mb-8">
          {cookieTypes.map(({ key, title, description, required }) => (
            <div
              key={key}
              className="flex items-start justify-between gap-4 p-5 bg-card border border-border rounded-xl hover:shadow-sm transition"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-foreground">{title}</h3>
                  {required && (
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">Required</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
              </div>
              <button
                type="button"
                onClick={() => toggle(key)}
                disabled={required}
                aria-label={`Toggle ${title}`}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors shrink-0 mt-0.5
                  focus:outline-none focus:ring-2 focus:ring-primary/30
                  ${ prefs[key] ? 'bg-primary' : 'bg-muted-foreground/30' }
                  ${ required ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer' }
                `}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
                    prefs[key] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition shadow-sm"
        >
          {saved && <Check className="w-4 h-4" />}
          {saved ? 'Preferences Saved' : 'Save Preferences'}
        </button>
      </main>
      <Footer />
    </div>
  );
}
