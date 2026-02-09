import { NavigationHeader } from '@/components/NavigationHeader';
import { Footer } from '@/components/Footer';
import { Newspaper, Download, Mail, ChevronRight, ExternalLink } from 'lucide-react';
import { Link } from 'wouter';

export default function Press() {
  const pressReleases = [
    {
      title: 'TechVault Expands Operations to Southeast Asia',
      date: 'February 6, 2026',
      category: 'Expansion',
      excerpt: 'Company announces major expansion with new fulfillment centers in Singapore, Malaysia, and Thailand, bringing premium electronics to millions more customers.',
    },
    {
      title: 'TechVault Launches AI-Powered Shopping Assistant',
      date: 'January 28, 2026',
      category: 'Product Launch',
      excerpt: 'Revolutionary AI assistant helps customers find the perfect electronics with personalized recommendations and instant expert advice.',
    },
    {
      title: 'Q4 2025 Results: Record-Breaking Quarter',
      date: 'January 15, 2026',
      category: 'Financial',
      excerpt: 'TechVault reports 145% year-over-year growth, reaching 2 million active customers and $500M in annual revenue.',
    },
    {
      title: 'TechVault Partners with Leading Electronics Manufacturers',
      date: 'December 20, 2025',
      category: 'Partnership',
      excerpt: 'Strategic partnerships with Apple, Samsung, and Sony bring exclusive products and early access to TechVault customers.',
    },
    {
      title: 'TechVault Commits to Carbon Neutral Shipping',
      date: 'December 10, 2025',
      category: 'Sustainability',
      excerpt: 'Company announces ambitious sustainability initiative to achieve 100% carbon-neutral shipping by end of 2026.',
    },
    {
      title: 'TechVault Named Best E-Commerce Platform',
      date: 'November 22, 2025',
      category: 'Awards',
      excerpt: 'Recognized by Tech Innovation Awards for outstanding customer experience and technology leadership in electronics retail.',
    },
  ];

  const mediaKit = [
    { name: 'Company Logo (PNG)', size: '2.4 MB', type: 'Images' },
    { name: 'Company Logo (SVG)', size: '124 KB', type: 'Images' },
    { name: 'Brand Guidelines PDF', size: '8.7 MB', type: 'Documents' },
    { name: 'Product Images Archive', size: '156 MB', type: 'Images' },
    { name: 'Executive Headshots', size: '45 MB', type: 'Images' },
    { name: 'Company Fact Sheet', size: '450 KB', type: 'Documents' },
  ];

  const mediaContact = {
    name: 'Sarah Thompson',
    title: 'Head of Communications',
    email: 'press@techvault.com',
    phone: '+91 80 1234 5678',
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavigationHeader />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 to-accent/10 border-b border-border py-16">
        <div className="container">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-sm text-foreground/60 mb-4">
              <Link href="/">Home</Link>
              <ChevronRight size={16} />
              <span className="text-foreground">Press</span>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Newspaper size={32} className="text-accent" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">Press & Media</h1>
            </div>
            <p className="text-lg text-foreground/70">
              Get the latest news, press releases, and media resources from TechVault.
            </p>
          </div>
        </div>
      </section>

      {/* Featured News */}
      <section className="py-16">
        <div className="container">
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-border rounded-2xl p-8 md:p-12">
            <div className="flex items-center gap-2 text-sm font-medium text-accent mb-4">
              <span className="px-3 py-1 bg-accent/10 rounded-full">Latest News</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {pressReleases[0].title}
            </h2>
            <p className="text-lg text-foreground/70 mb-6">
              {pressReleases[0].excerpt}
            </p>
            <div className="flex items-center gap-4 text-sm text-foreground/60 mb-6">
              <span>{pressReleases[0].date}</span>
              <span>•</span>
              <span>{pressReleases[0].category}</span>
            </div>
            <button className="btn-primary inline-flex items-center gap-2">
              Read Full Release
              <ExternalLink size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Recent Press Releases</h2>
          <div className="space-y-6">
            {pressReleases.slice(1).map((release, index) => (
              <article
                key={index}
                className="bg-background border border-border rounded-lg p-6 hover:border-accent/50 transition-all group"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">
                        {release.category}
                      </span>
                      <span className="text-sm text-foreground/60">{release.date}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                      {release.title}
                    </h3>
                    <p className="text-foreground/70">{release.excerpt}</p>
                  </div>
                  <button className="btn-outline inline-flex items-center gap-2 whitespace-nowrap">
                    Read More
                    <ExternalLink size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-4">Media Kit</h2>
              <p className="text-foreground/70 mb-8">
                Download our logos, brand assets, product images, and company information.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mediaKit.map((item, index) => (
                  <div
                    key={index}
                    className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="text-xs text-accent mb-2 font-medium">{item.type}</div>
                        <h3 className="font-semibold group-hover:text-accent transition-colors">
                          {item.name}
                        </h3>
                        <div className="text-sm text-foreground/60 mt-1">{item.size}</div>
                      </div>
                      <button className="p-2 hover:bg-accent/10 rounded-lg transition-colors">
                        <Download size={20} className="text-accent" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <button className="btn-primary inline-flex items-center gap-2">
                  <Download size={20} />
                  Download Complete Media Kit
                </button>
              </div>
            </div>

            {/* Media Contact */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
                <div className="flex items-center gap-2 mb-6">
                  <Mail size={20} className="text-accent" />
                  <h3 className="font-semibold text-lg">Media Contact</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-foreground/60 mb-1">Name</div>
                    <div className="font-medium">{mediaContact.name}</div>
                  </div>
                  <div>
                    <div className="text-sm text-foreground/60 mb-1">Title</div>
                    <div className="font-medium">{mediaContact.title}</div>
                  </div>
                  <div>
                    <div className="text-sm text-foreground/60 mb-1">Email</div>
                    <a
                      href={`mailto:${mediaContact.email}`}
                      className="font-medium text-accent hover:underline"
                    >
                      {mediaContact.email}
                    </a>
                  </div>
                  <div>
                    <div className="text-sm text-foreground/60 mb-1">Phone</div>
                    <a
                      href={`tel:${mediaContact.phone}`}
                      className="font-medium text-accent hover:underline"
                    >
                      {mediaContact.phone}
                    </a>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="font-semibold mb-3">Media Inquiries</h4>
                  <p className="text-sm text-foreground/70 mb-4">
                    For press inquiries, interviews, or media partnerships, please contact our 
                    communications team.
                  </p>
                  <button className="btn-primary w-full">
                    Contact Media Team
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured In */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5 border-y border-border">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Featured In</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['TechCrunch', 'Forbes', 'The Verge', 'Wired', 'Business Insider', 'CNBC', 'Bloomberg', 'Reuters'].map(
              (publication) => (
                <div
                  key={publication}
                  className="flex items-center justify-center p-6 bg-background/50 rounded-lg border border-border hover:border-accent/50 transition-all"
                >
                  <span className="text-lg font-semibold text-foreground/70">{publication}</span>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
