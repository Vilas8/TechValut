import { Zap, Shield, Truck, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NavigationHeader } from '@/components/NavigationHeader';
import { Footer } from '@/components/Footer';

const FEATURED_PRODUCTS = [
  {
    name: 'MacBook Pro 16"',
    slug: 'macbook-pro-16',
    price: 249900,
    description: 'Powerful laptop for professionals and creators',
    rating: 4.8,
    image: 'https://private-us-east-1.manuscdn.com/sessionFile/70BeSONjdgQMeROPsWItJC/sandbox/uHQwCBm1WL5LUA5aADjqXp-img-1_1770608381000_na1fn_ZmVhdHVyZWQtbWFjYm9vay1oZXJv.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvNzBCZVNPTmpkZ1FNZVJPUHNXSXRKQy9zYW5kYm94L3VIUXdDQm0xV0w1TFVBNWFBRGpxWHAtaW1nLTFfMTc3MDYwODM4MTAwMF9uYTFmbl9abVZoZEhWeVpXUXRiV0ZqWW05dmF5MW9aWEp2LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Qp1A24INZnOg7fFlwbd1aLAyquHX9DxDlobZe6AKEN8VdSYXUyWfa6uphzFpI-S2gtUvNo2fnY3YweXRJDHTtBR6df45iBlnuubMA1cVDIeag0lofI9nw5rDjeaw7wO7ggpyWthjZkCRBhprL5Wc3TSfRLdIUl8mkiTT-kob7gT5g42e0wBpro8k7-8Cq3PnLr-HaxCgsBWw8LaXOV5e85J~fgjaxDNcOiMte0OlMN3aDxj-U1K-z64JeYKLsEDwe3HYkhufb9STH8z-0W4vUcd1DTVsJrFQd9uPsvZhrfD1Xz6TZBvsXNKNPokGO6YEnr77O74gWjUjDrBkdrExwg__',
  },
  {
    name: 'iPhone 15 Pro Max',
    slug: 'iphone-15-pro-max',
    price: 159900,
    description: 'Latest flagship smartphone with advanced features',
    rating: 4.9,
    image: 'https://private-us-east-1.manuscdn.com/sessionFile/70BeSONjdgQMeROPsWItJC/sandbox/uHQwCBm1WL5LUA5aADjqXp-img-2_1770608384000_na1fn_ZmVhdHVyZWQtaXBob25lLWhlcm8.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvNzBCZVNPTmpkZ1FNZVJPUHNXSXRKQy9zYW5kYm94L3VIUXdDQm0xV0w1TFVBNWFBRGpxWHAtaW1nLTJfMTc3MDYwODM4NDAwMF9uYTFmbl9abVZoZEhWeVpXUXRhWEJvYjI1bExXaGxjbTgucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=o5lxetlasdyY1p1waDsMLA9XskcwATlmZtn~BEKvhxDV2tANzVQHATE71xYrKiuRoXi~dGjkIpFE1lFQC2HVWy8J35y9~J0kU~vyBOvcB4yWvbuVqDwF8J3ddIJxwwL0O5f8xSUR79W-r62VZ~-6ZkRdlGBQCFEpOhCyPJJbDYc3ZswjHHfjSBlH51j3xY5JKkt08AY3eQGo6HRhXHEspbPKp2-Rwb4ofyPFOr~rPH2QPWHJyDpG82LFU6RVVp7dcuVXfktthxwHZuCLmuq4vu68Y3Lwy~spQlgtQ0bNxWwpHzEQ58AuQ7g8dBWX6IDuYS-4wfioX77QePwb31aHGA__',
  },
  {
    name: 'Sony WH-1000XM5',
    slug: 'sony-wh-1000xm5',
    price: 39900,
    description: 'Premium noise-cancelling headphones',
    rating: 4.8,
    image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663050743602/lbIPPOlTeWArjRKW.png',
  },
];

export default function Home() {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Tech Enthusiast',
      content: 'TechVault has the best selection of premium electronics. Fast shipping and excellent customer service!',
      rating: 5,
    },
    {
      name: 'Marcus Johnson',
      role: 'Business Owner',
      content: 'I\'ve been a customer for 2 years. The quality is consistently excellent and prices are competitive.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Content Creator',
      content: 'Amazing products and the support team helped me find exactly what I needed for my setup.',
      rating: 5,
    },
  ];

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Quick delivery and instant support for all your tech needs.',
    },
    {
      icon: Shield,
      title: 'Secure Shopping',
      description: 'Your data is protected with enterprise-grade security.',
    },
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Free shipping on orders over ₹5,000 worldwide.',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavigationHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-48">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 -z-10"></div>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Premium <span className="gradient-text">Technology</span> for Everyone
              </h1>
              <p className="text-lg text-foreground/70 max-w-lg">
                Discover our curated collection of cutting-edge electronics. From laptops to wearables, find everything you need to stay ahead of the curve.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a href="/products">
                  <Button className="btn-primary inline-flex items-center gap-2 w-full sm:w-auto justify-center">
                    Shop Now
                    <ArrowRight size={18} />
                  </Button>
                </a>
                <a href="/about">
                  <Button className="btn-outline inline-flex items-center gap-2 w-full sm:w-auto justify-center">
                    Learn More
                  </Button>
                </a>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative h-96 md:h-full rounded-2xl overflow-hidden border border-border">
              <img
                src={FEATURED_PRODUCTS[0].image}
                alt="Featured Product"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-card border-y border-border">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="text-center space-y-4">
                  <div className="inline-flex p-4 bg-accent/10 rounded-lg">
                    <Icon size={32} className="text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-foreground/60">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products Preview Section */}
      <section className="py-16 md:py-24">
        <div className="container space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Featured Products</h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Handpicked selection of the latest and greatest tech products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_PRODUCTS.map((product) => (
              <div key={product.slug} className="group card-hover p-6 bg-card border border-border rounded-xl transition-all hover:border-accent/50">
                <a href={`/product/${product.slug}`} className="block">
                  <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg mb-4 flex items-center justify-center group-hover:from-primary/20 group-hover:to-accent/20 transition-colors overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </a>
                <a href={`/product/${product.slug}`} className="hover:text-accent transition-colors">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{product.name}</h3>
                </a>
                <p className="text-foreground/60 text-sm mb-4">{product.description}</p>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < Math.round(product.rating) ? 'fill-accent text-accent' : 'text-foreground/20'}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-foreground/60">{product.rating}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-accent">₹{(product.price / 100).toFixed(0)}</span>
                  <a href={`/product/${product.slug}`}>
                    <Button className="btn-primary py-2 px-4">View</Button>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-8">
            <a href="/products">
              <Button className="btn-outline inline-flex items-center gap-2">
                View All Products
                <ArrowRight size={18} />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-card border-y border-border">
        <div className="container space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">What Our Customers Say</h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Join thousands of satisfied customers worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="p-6 bg-background border border-border rounded-xl space-y-4">
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} size={18} className="fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground/80">{testimonial.content}</p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-foreground/60">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary/10 to-accent/10 border-y border-border">
        <div className="container text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Upgrade Your Tech?</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Browse our complete collection of premium electronics and find exactly what you need.
          </p>
          <a href="/products">
            <Button className="btn-primary inline-flex items-center gap-2">
              Start Shopping
              <ArrowRight size={18} />
            </Button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
