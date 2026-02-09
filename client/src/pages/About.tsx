import { Award, Users, Zap, Globe } from 'lucide-react';
import { NavigationHeader } from '@/components/NavigationHeader';
import { Footer } from '@/components/Footer';

export default function About() {
  const values = [
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'We curate only the finest electronics from trusted brands worldwide.',
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Your satisfaction is our priority. Exceptional support every step of the way.',
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Cutting-edge technology and the latest products for tech enthusiasts.',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Serving customers worldwide with fast, reliable shipping and support.',
    },
  ];

  const timeline = [
    {
      year: '2020',
      event: 'TechVault Founded',
      description: 'Started with a passion for premium electronics',
    },
    {
      year: '2021',
      event: '1M+ Customers',
      description: 'Reached milestone of serving over 1 million customers',
    },
    {
      year: '2022',
      event: 'Global Expansion',
      description: 'Expanded operations to 25+ countries',
    },
    {
      year: '2024',
      event: 'Industry Leader',
      description: 'Recognized as a top electronics retailer in Asia',
    },
  ];

  const stats = [
    { value: '1M+', label: 'Happy Customers' },
    { value: '500+', label: 'Premium Products' },
    { value: '25+', label: 'Countries Served' },
    { value: '4.8★', label: 'Average Rating' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavigationHeader />



      {/* Mission & Vision */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">Our Mission</h2>
                <p className="text-lg text-foreground/70 leading-relaxed">
                  To empower tech enthusiasts by providing access to premium, innovative electronics at competitive prices. We believe everyone deserves quality technology that enhances their digital lifestyle.
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">Our Vision</h2>
                <p className="text-lg text-foreground/70 leading-relaxed">
                  To become the world's most trusted electronics retailer, known for exceptional products, outstanding service, and a genuine commitment to our customers' success.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-12 border border-border space-y-6">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-start gap-4">
                  <div className="text-4xl font-bold text-accent">{stat.value}</div>
                  <div>
                    <div className="font-semibold text-foreground">{stat.label}</div>
                    <div className="text-sm text-foreground/60">Worldwide</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-24 bg-card border-y border-border">
        <div className="container space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Our Core Values</h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              These principles guide everything we do at TechVault.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="group card-hover p-8 bg-background border border-border rounded-xl"
                >
                  <div className="mb-6 inline-block p-4 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                    <Icon size={28} className="text-accent" />
                  </div>
                  <h3 className="font-semibold text-xl text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24">
        <div className="container space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Our Journey</h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Key milestones in TechVault's growth and success.
            </p>
          </div>

          <div className="space-y-8">
            {timeline.map((item, idx) => (
              <div
                key={item.year}
                className={`flex gap-8 ${idx % 2 === 1 ? 'flex-row-reverse' : ''}`}
              >
                <div className="flex-1">
                  <div className="p-6 bg-card border border-border rounded-lg hover:border-accent/50 transition-colors">
                    <div className="text-accent font-bold text-lg mb-2">{item.year}</div>
                    <h3 className="font-semibold text-xl text-foreground mb-2">
                      {item.event}
                    </h3>
                    <p className="text-foreground/70">{item.description}</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-4 h-4 bg-accent rounded-full mt-6 ring-4 ring-accent/20" />
                </div>
                <div className="flex-1" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 to-accent/10 border-y border-border">
        <div className="container text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Join Our Community</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Experience the TechVault difference. Discover premium electronics and exceptional service.
          </p>
          <button className="btn-primary inline-flex items-center gap-2">
            Start Shopping
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
