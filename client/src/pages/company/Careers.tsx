import { NavigationHeader } from '@/components/NavigationHeader';
import { Footer } from '@/components/Footer';
import { Briefcase, MapPin, Clock, ChevronRight, ArrowRight, Heart, Zap, Users, TrendingUp } from 'lucide-react';
import { Link } from 'wouter';

export default function Careers() {
  const openPositions = [
    {
      title: 'Senior Full Stack Developer',
      department: 'Engineering',
      location: 'Bengaluru, India',
      type: 'Full-time',
      level: 'Senior',
      description: 'Build scalable e-commerce solutions using React, Node.js, and modern web technologies.',
    },
    {
      title: 'Product Manager',
      department: 'Product',
      location: 'Remote',
      type: 'Full-time',
      level: 'Mid-Senior',
      description: 'Lead product strategy and roadmap for our consumer electronics platform.',
    },
    {
      title: 'UX/UI Designer',
      department: 'Design',
      location: 'Hybrid - Bengaluru',
      type: 'Full-time',
      level: 'Mid-level',
      description: 'Create beautiful and intuitive user experiences for our customers.',
    },
    {
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Bengaluru, India',
      type: 'Full-time',
      level: 'Senior',
      description: 'Manage cloud infrastructure, CI/CD pipelines, and ensure system reliability.',
    },
    {
      title: 'Digital Marketing Manager',
      department: 'Marketing',
      location: 'Remote',
      type: 'Full-time',
      level: 'Mid-Senior',
      description: 'Drive growth through digital marketing campaigns and analytics.',
    },
    {
      title: 'Customer Support Specialist',
      department: 'Support',
      location: 'Bengaluru, India',
      type: 'Full-time',
      level: 'Entry-level',
      description: 'Provide exceptional support to our customers via chat, email, and phone.',
    },
  ];

  const benefits = [
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance, mental health support, and fitness benefits.',
    },
    {
      icon: Zap,
      title: 'Growth & Learning',
      description: 'Learning budget, conference attendance, and career development programs.',
    },
    {
      icon: Users,
      title: 'Work-Life Balance',
      description: 'Flexible work hours, remote options, and generous paid time off.',
    },
    {
      icon: TrendingUp,
      title: 'Competitive Compensation',
      description: 'Market-leading salaries, equity options, and performance bonuses.',
    },
  ];

  const departments = [
    { name: 'All Departments', count: 15 },
    { name: 'Engineering', count: 6 },
    { name: 'Product', count: 2 },
    { name: 'Design', count: 2 },
    { name: 'Marketing', count: 3 },
    { name: 'Support', count: 2 },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavigationHeader />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 to-accent/10 border-b border-border py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-foreground/60 mb-4">
              <Link href="/">Home</Link>
              <ChevronRight size={16} />
              <span className="text-foreground">Careers</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Team</h1>
            <p className="text-lg md:text-xl text-foreground/70">
              Build the future of electronics retail with a passionate team. 
              We're looking for talented individuals who share our vision.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-b border-border">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '150+', label: 'Team Members' },
              { value: '15', label: 'Open Positions' },
              { value: '25+', label: 'Countries' },
              { value: '4.8★', label: 'Glassdoor Rating' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">{stat.value}</div>
                <div className="text-foreground/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-card">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Join TechVault?</h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              We invest in our people and create an environment where everyone can thrive.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="bg-background border border-border rounded-lg p-6 hover:border-accent/50 transition-all"
                >
                  <div className="inline-block p-3 bg-accent/10 rounded-lg mb-4">
                    <Icon size={24} className="text-accent" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-sm text-foreground/70">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Open Positions</h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Find your perfect role and make an impact.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters */}
            <aside className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
                <h3 className="font-semibold text-lg mb-4">Departments</h3>
                <div className="space-y-2">
                  {departments.map((dept) => (
                    <button
                      key={dept.name}
                      className="w-full flex items-center justify-between px-4 py-2 rounded-lg hover:bg-accent/10 transition-colors text-left group"
                    >
                      <span className="group-hover:text-accent transition-colors">
                        {dept.name}
                      </span>
                      <span className="text-sm text-foreground/40">({dept.count})</span>
                    </button>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <h3 className="font-semibold mb-4">Location</h3>
                  <div className="space-y-2">
                    {['All Locations', 'Bengaluru', 'Remote', 'Hybrid'].map((loc) => (
                      <label key={loc} className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" className="rounded border-border" />
                        <span className="text-sm">{loc}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <h3 className="font-semibold mb-4">Experience Level</h3>
                  <div className="space-y-2">
                    {['All Levels', 'Entry-level', 'Mid-level', 'Senior'].map((level) => (
                      <label key={level} className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" className="rounded border-border" />
                        <span className="text-sm">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Job Listings */}
            <div className="lg:col-span-3 space-y-4">
              {openPositions.map((position, index) => (
                <article
                  key={index}
                  className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-all group"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">
                          {position.department}
                        </span>
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                          {position.level}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold group-hover:text-accent transition-colors">
                        {position.title}
                      </h3>
                      <p className="text-foreground/70">{position.description}</p>
                      <div className="flex items-center gap-6 text-sm text-foreground/60">
                        <div className="flex items-center gap-2">
                          <MapPin size={16} />
                          <span>{position.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={16} />
                          <span>{position.type}</span>
                        </div>
                      </div>
                    </div>
                    <button className="btn-primary inline-flex items-center gap-2 whitespace-nowrap">
                      Apply Now
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-primary/10 to-accent/10 border-y border-border">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Don't See the Right Role?</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto mb-6">
            We're always looking for talented people. Send us your resume and we'll keep you 
            in mind for future opportunities.
          </p>
          <button className="btn-primary inline-flex items-center gap-2">
            Send General Application
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
