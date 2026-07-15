import { createFileRoute, Link } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { Droplets, Waves, Sun, CircleDot, Check, Phone, ShieldCheck, Clock, Star, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import heroBgImg from '@/assets/hero1.png';
import tankImg from '@/assets/water-tank.jpg';
import drainImg from '@/assets/drainage.jpg';
import solarImg from '@/assets/solar.jpg';
import wellImg from '@/assets/well.jpg';
import logoImg from '@/assets/logo.jpg';


export const Route = createFileRoute('/')({
  component: Home,
});

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-0.297-0.149-1.758-0.867-2.03-0.967-0.273-0.099-0.471-0.148-0.67 0.15-0.197 0.297-0.767 0.966-0.94 1.164-0.173 0.199-0.347 0.223-0.644 0.075-0.297-0.149-1.255-0.463-2.39-1.475-0.883-0.788-1.48-1.761-1.653-2.059-0.173-0.297-0.018-0.458 0.13-0.606 0.134-0.133 0.298-0.347 0.446-0.52 0.149-0.174 0.198-0.298 0.298-0.497 0.099-0.198 0.05-0.372-0.025-0.52-0.075-0.149-0.669-1.612-0.916-2.207-0.242-0.579-0.487-0.5-0.669-0.51-0.173-0.008-0.371-0.01-0.57-0.01-0.198 0-0.52 0.074-0.792 0.372-0.272 0.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074 0.149 0.198 2.096 3.2 5.077 4.487 0.709 0.306 1.262 0.489 1.694 0.625 0.712 0.227 1.36 0.195 1.871 0.118 0.571-0.085 1.758-0.719 2.006-1.413 0.248-0.694 0.248-1.289 0.173-1.413-0.074-0.124-0.272-0.198-0.57-0.347zm-5.421 7.403h-0.004a9.87 9.87 0 0 1-5.031-1.378l-0.361-0.214-3.741 0.982 0.998-3.648-0.235-0.374a9.86 9.86 0 0 1-1.51-5.26c0.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-0.003 5.45-4.437 9.884-9.885 9.884zm8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 0.16 5.335 0.157 11.893c0 2.096 0.547 4.142 1.588 5.945L0.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h0.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

const iconMap: Record<string, any> = {
  Droplets,
  Waves,
  Sun,
  CircleDot,
};



function Home() {
  const [services, setServices] = useState<any[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    setLoading(true);
    console.log('Fetching services from Supabase...');
    
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Supabase error:', error);
        setServices([]);
      } else {
        console.log('✅ Fetched real services:', data);
        if (data && data.length > 0) {
          const mappedData = data.map((s: any) => ({
            ...s,
            img: s.image_url || undefined, // Only set img if there's an image_url
            video_url: s.video_url || null, // Include video URL if available
            icon: s.icon || 'Droplets',
            fallbackImg: tankImg // Keep a fallbackImg for when there's neither
          }));
          setServices(mappedData);
        } else {
          setServices([]);
        }
      }
    } catch (err) {
      console.error('Error fetching services:', err);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [refreshKey]);

  // Intersection observers for scroll animations
  const servicesSection = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });
  
  const whySection = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });
  
  const testimonialsSection = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });
  
  const contactSection = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-4 font-display font-bold text-3xl">
            <img src={logoImg} alt="HamroDrainage logo" className="w-20 h-20 object-contain" width={80} height={80} />
            <span>Hamro<span className="text-brand">Drainage</span></span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-lg font-medium">
            <a href="#services" className="hover:text-brand transition">Services</a>
            <a href="#why" className="hover:text-brand transition">Why Us</a>
            <a href="#reviews" className="hover:text-brand transition">Reviews</a>
            <a href="#contact" className="hover:text-brand transition">Contact</a>
          </nav>
          <a href="#contact" className="hidden md:flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-lg">
            <Phone className="w-5 h-5" />
            Book Now
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden" style={{ background: 'var(--gradient-hero)', minHeight: '80vh' }}>
        <div className="absolute inset-0">
          <img src={heroBgImg} alt="" className="w-full h-full object-cover" width={1600} height={1200} />
          <div className="absolute inset-0 bg-primary/60" />
        </div>
        <div className="relative px-6 py-24 md:py-32 flex items-center min-h-[80vh] max-w-7xl mx-auto">
          <div className="text-white text-left max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur text-xs font-medium border border-white/20">
              <ShieldCheck className="w-3.5 h-3.5" /> Trusted by 10,000+ homes
            </span>
            <h1 className="mt-6 text-5xl md:text-6xl font-bold leading-[1.05]">
              Cleaner water. <br /><span style={{ color: 'oklch(0.85 0.15 195)' }}>Brighter living.</span></h1>
            <p className="mt-6 text-lg text-white/85 max-w-lg">
              Professional cleaning for water tanks, drainage, solar panels and wells — booked in seconds, done in hours.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="tel:+9779714117380" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#2563EB] text-white font-semibold shadow-lg hover:opacity-90 transition">
                <Phone className="w-4 h-4" /> Call Now
              </a>
              <a href="https://wa.me/9779714117380" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#25D366] text-white font-semibold shadow-lg hover:opacity-90 transition">
                <WhatsAppIcon className="w-4 h-4" /> WhatsApp
              </a>
            </div>
            <div className="mt-10 flex items-center gap-8 text-sm text-white/80">
              <div><div className="text-2xl font-bold text-white">10k+</div>Happy clients</div>
              <div><div className="text-2xl font-bold text-white">4.9★</div>Avg rating</div>
              <div><div className="text-2xl font-bold text-white">24h</div>Quick dispatch</div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section 
        id="services" 
        ref={servicesSection.ref as any}
        className={`py-24 transition-all duration-700 ease-out ${
          servicesSection.isIntersecting 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-left">
            <span className="text-sm font-semibold text-brand uppercase tracking-wider">Our Services</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold">Everything your property needs, sparkling clean.</h2>
          </div>
          
          {loading ? (
            <div className="mt-14 text-center py-12">
              <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p>Loading services...</p>
            </div>
          ) : services.length === 0 ? (
            <div className="mt-14 text-center py-12">
              <p className="text-muted-foreground text-lg mb-4">No services available at the moment</p>
              <p className="text-sm text-muted-foreground">Please check back later or contact us directly</p>
            </div>
          ) : (
            <>
              <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Only show first 4 services on home page */}
                {services.slice(0, 4).map((s) => {
                  const IconComponent = iconMap[s.icon] || Droplets;
                  const truncatedDescription = s.description ? 
                    s.description.split(' ').slice(0, 8).join(' ') + 
                    (s.description.split(' ').length > 8 ? '...' : '') : '';
                  
                  return (
                    <Link
                      key={s.id}
                      to="/services/$serviceId"
                      params={{ serviceId: s.id.toString() }}
                      className="group rounded-2xl bg-card border border-border overflow-hidden hover:-translate-y-1 transition-all duration-300 h-[400px] flex flex-col"
                      style={{ boxShadow: 'var(--shadow-card)' }}
                    >
                      <div className="h-1/2 overflow-hidden">
                        {s.video_url ? (
                          <video 
                            src={s.video_url} 
                            alt={s.title}
                            muted 
                            loop 
                            playsInline 
                            autoPlay
                            className="w-full h-full object-cover"
                          />
                        ) : s.img ? (
                          <img src={s.img} alt={s.title} loading="lazy" width={800} height={600} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <img src={s.fallbackImg} alt={s.title} loading="lazy" width={800} height={600} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        )}
                      </div>
                      <div className="h-1/2 p-6 flex flex-col">
                        <h3 className="text-lg font-bold mb-2 line-clamp-2">{s.title}</h3>
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {truncatedDescription}
                          </p>
                        </div>
                        <div className="mt-auto pt-3 border-t border-border flex items-center justify-between">
                        {s.price && s.price.trim() ? (
                          <>
                            <span className="text-xs text-muted-foreground">Starting at</span>
                            <span className="font-display font-bold text-lg text-foreground">{s.price}</span>
                          </>
                        ) : (
                          <span className="text-sm text-muted-foreground italic">Contact for pricing</span>
                        )}
                      </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* All Services Button - Only show if there are more than 4 services */}
              {services.length > 4 && (
                <div className="mt-10 text-center">
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold text-lg shadow-lg hover:opacity-90 transition"
                  >
                    View All Services
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section 
        id="why" 
        ref={whySection.ref as any}
        className={`bg-accent/5 border-y border-border transition-all duration-700 ease-out ${
          whySection.isIntersecting 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-left mb-14">
            <span className="text-sm font-semibold text-brand uppercase tracking-wider">Why Choose Us</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold">Why customers love HamroDrainage</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-left p-8 rounded-2xl bg-card border border-border">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Certified Experts</h3>
              <p className="text-muted-foreground">Background-checked, trained professionals with 5+ years experience.</p>
            </div>
            <div className="text-left p-8 rounded-2xl bg-card border border-border">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">On-Time Guarantee</h3>
              <p className="text-muted-foreground">We arrive when we say we will — or your next clean is 50% off.</p>
            </div>
            <div className="text-left p-8 rounded-2xl bg-card border border-border">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">100% Satisfaction</h3>
              <p className="text-muted-foreground">Not happy? We'll re-clean for free. No questions asked.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section 
        id="reviews" 
        ref={testimonialsSection.ref as any}
        className={`py-24 transition-all duration-700 ease-out ${
          testimonialsSection.isIntersecting 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-left mb-14">
            <span className="text-sm font-semibold text-brand uppercase tracking-wider">Testimonials</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold">What our customers say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {name: "Priya Sharma", city: "Kathmandu", text: "My tank hadn't been cleaned in 5 years! The team was professional, fast, and left everything spotless. Worth every rupee!", stars: 5},
              {name: "Rajesh Thapa", city: "Pokhara", text: "Solar panels were producing 20% more efficient after their cleaning. Great service, highly recommend!", stars: 5},
              {name: "Sita Magar", city: "Biratnagar", text: "Drainage was completely blocked and smelling terrible. They fixed it in 2 hours. Amazing work!", stars: 5},
            ].map((r) => (
              <article key={r.name} className="rounded-2xl bg-card border border-border p-6 text-left">
                <div className="flex items-center gap-1 mb-4 text-yellow-500">
                  {[...Array(r.stars)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-muted-foreground mb-6">{r.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-bold">{r.name[0]}</div>
                  <div>
                    <h4 className="font-bold">{r.name}</h4>
                    <p className="text-sm text-muted-foreground">{r.city}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section 
        id="contact" 
        ref={contactSection.ref as any}
        className={`bg-accent/5 border-t border-border transition-all duration-700 ease-out ${
          contactSection.isIntersecting 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-24 text-left">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready for cleaner water today?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl">
            Book a service in 60 seconds or call us for a free quote.
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <a href="tel:+9779714117380" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#2563EB] text-white font-semibold text-lg shadow-lg hover:opacity-90 transition">
              <Phone className="w-5 h-5" />
              Call +977 971 411 7380
            </a>
            <a href="https://wa.me/9779714117380" target="_blank" rel="noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-card border border-border font-semibold text-lg hover:bg-accent/10 transition">
              <WhatsAppIcon className="w-5 h-5" />
              WhatsApp Us
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-background">
        <div className="px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <a href="#top" className="flex items-center gap-3 font-display font-bold text-xl mb-4">
                <img src={logoImg} alt="HamroDrainage logo" className="w-12 h-12 object-contain" width={48} height={48} />
                <span>Hamro<span className="text-brand">Drainage</span></span>
              </a>
              <p className="text-muted-foreground max-w-sm">
                Nepal's most trusted professional water tank, drainage, and solar panel cleaning service.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <div className="space-y-2 text-muted-foreground">
                <a href="#services" className="block hover:text-brand transition">Services</a>
                <a href="#why" className="block hover:text-brand transition">Why Us</a>
                <a href="#reviews" className="block hover:text-brand transition">Reviews</a>
                <Link to="/admin" className="block hover:text-brand transition">Admin</Link>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <div className="space-y-2 text-muted-foreground">
                <a href="tel:+9779714117380" className="block hover:text-brand transition">+977 971 411 7380</a>
                <p>info@hamrodrainage.com</p>
                <p>Kathmandu, Nepal</p>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} HamroDrainage. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
