import { NavigationHeader } from '@/components/NavigationHeader';
import { Footer } from '@/components/Footer';
import { Calendar, User, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

export default function Blog() {
  const featuredPost = {
    title: 'The Future of AI in Consumer Electronics',
    excerpt: 'Exploring how artificial intelligence is revolutionizing the way we interact with our devices and what to expect in the coming years.',
    author: 'Sarah Johnson',
    date: 'February 5, 2026',
    category: 'Technology',
    image: '🤖',
    readTime: '8 min read',
  };

  const blogPosts = [
    {
      title: 'Top 10 Laptops for Remote Work in 2026',
      excerpt: 'Our comprehensive guide to choosing the perfect laptop for working from home, featuring performance benchmarks and real-world testing.',
      author: 'Michael Chen',
      date: 'February 8, 2026',
      category: 'Reviews',
      readTime: '6 min read',
    },
    {
      title: 'How to Choose the Right Smartphone',
      excerpt: 'Navigate the complex world of smartphone specifications with our expert buying guide covering everything from cameras to battery life.',
      author: 'Emma Williams',
      date: 'February 7, 2026',
      category: 'Buying Guides',
      readTime: '5 min read',
    },
    {
      title: 'Audio Quality Explained: Understanding Specs',
      excerpt: 'Decode audio specifications and learn what really matters when choosing headphones, speakers, and other audio devices.',
      author: 'David Rodriguez',
      date: 'February 6, 2026',
      category: 'Education',
      readTime: '7 min read',
    },
    {
      title: 'The Rise of Wearable Health Technology',
      excerpt: 'How smartwatches and fitness trackers are transforming personal health monitoring and what features to look for.',
      author: 'Lisa Anderson',
      date: 'February 4, 2026',
      category: 'Technology',
      readTime: '6 min read',
    },
    {
      title: 'Essential Tech Accessories for 2026',
      excerpt: 'Discover must-have accessories that enhance your devices and improve your daily tech experience.',
      author: 'James Taylor',
      date: 'February 3, 2026',
      category: 'Buying Guides',
      readTime: '4 min read',
    },
    {
      title: 'Gaming Laptop Showdown: Performance Comparison',
      excerpt: 'We put the latest gaming laptops through their paces with intensive benchmarks and real-world gaming tests.',
      author: 'Alex Thompson',
      date: 'February 2, 2026',
      category: 'Reviews',
      readTime: '10 min read',
    },
  ];

  const categories = [
    { name: 'All Posts', count: 142 },
    { name: 'Reviews', count: 45 },
    { name: 'Buying Guides', count: 38 },
    { name: 'Technology', count: 32 },
    { name: 'Education', count: 27 },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavigationHeader />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 to-accent/10 border-b border-border py-16">
        <div className="container">
          <div className="flex items-center gap-2 text-sm text-foreground/60 mb-4">
            <Link href="/">Home</Link>
            <ChevronRight size={16} />
            <span className="text-foreground">Blog</span>
          </div>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">TechVault Blog</h1>
            <p className="text-lg text-foreground/70">
              Stay updated with the latest technology trends, product reviews, buying guides, 
              and expert insights from our team.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16">
        <div className="container">
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-border rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 text-sm font-medium text-accent mb-4">
                  <span className="px-3 py-1 bg-accent/10 rounded-full">Featured Post</span>
                  <span>•</span>
                  <span>{featuredPost.category}</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-lg text-foreground/70 mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-6 text-sm text-foreground/60 mb-6">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{featuredPost.date}</span>
                  </div>
                  <span>{featuredPost.readTime}</span>
                </div>
                <button className="btn-primary inline-flex items-center gap-2 w-fit">
                  Read Article
                  <ArrowRight size={16} />
                </button>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-accent/20 flex items-center justify-center text-9xl lg:min-h-[400px]">
                {featuredPost.image}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="bg-background border border-border rounded-lg p-6 sticky top-24">
                <h3 className="font-semibold text-lg mb-6">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      className="w-full flex items-center justify-between px-4 py-2 rounded-lg hover:bg-accent/10 transition-colors text-left group"
                    >
                      <span className="group-hover:text-accent transition-colors">
                        {category.name}
                      </span>
                      <span className="text-sm text-foreground/40">({category.count})</span>
                    </button>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-border">
                  <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
                  <p className="text-sm text-foreground/60 mb-4">
                    Get the latest articles delivered to your inbox.
                  </p>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <button className="btn-primary w-full">Subscribe</button>
                </div>
              </div>
            </aside>

            {/* Posts Grid */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blogPosts.map((post, index) => (
                  <article
                    key={index}
                    className="bg-background border border-border rounded-lg overflow-hidden hover:border-accent/50 transition-all group"
                  >
                    <div className="aspect-video bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center text-6xl">
                      📱
                    </div>
                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-3 text-xs">
                        <span className="px-3 py-1 bg-accent/10 text-accent rounded-full font-medium">
                          {post.category}
                        </span>
                        <span className="text-foreground/40">{post.readTime}</span>
                      </div>
                      <h3 className="font-semibold text-xl line-clamp-2 group-hover:text-accent transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-foreground/60 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-foreground/60 pt-3 border-t border-border">
                        <div className="flex items-center gap-2">
                          <User size={14} />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={14} />
                          <span>{post.date}</span>
                        </div>
                      </div>
                      <button className="text-accent font-medium text-sm inline-flex items-center gap-2 hover:gap-3 transition-all">
                        Read More
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center gap-2 mt-12">
                <button className="px-4 py-2 border border-border rounded-lg hover:border-accent hover:text-accent transition-colors">
                  Previous
                </button>
                {[1, 2, 3, 4, 5].map((page) => (
                  <button
                    key={page}
                    className={`px-4 py-2 border rounded-lg transition-colors ${
                      page === 1
                        ? 'bg-accent text-white border-accent'
                        : 'border-border hover:border-accent hover:text-accent'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button className="px-4 py-2 border border-border rounded-lg hover:border-accent hover:text-accent transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container">
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-border rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Informed</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto mb-6">
              Subscribe to our newsletter for weekly updates on tech trends, product launches, 
              and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button className="btn-primary px-8">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
