import { createFileRoute, Link } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { Droplets, Waves, Sun, CircleDot, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import tankImg from '@/assets/water-tank.jpg';
import drainImg from '@/assets/drainage.jpg';
import solarImg from '@/assets/solar.jpg';
import wellImg from '@/assets/well.jpg';

const iconMap: Record<string, any> = {
  Droplets,
  Waves,
  Sun,
  CircleDot,
};

export const Route = createFileRoute('/services/')({
  component: AllServicesPage,
});

function AllServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const servicesSection = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });

  const fetchServices = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        setServices([]);
      } else {
        if (data && data.length > 0) {
          const mappedData = data.map((s: any) => ({
            ...s,
            img: s.image_url || tankImg,
            video_url: s.video_url || null,
            icon: s.icon || 'Droplets'
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
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-muted py-4 border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="hover:text-brand transition">Home</Link>
            <span>/</span>
            <span className="text-foreground font-medium">All Services</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-lg font-medium mb-6 hover:text-brand transition">
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">All Our Services</h1>
          <p className="text-lg text-muted-foreground">Explore all our professional cleaning services for your home and business</p>
        </div>

        {/* Services Grid */}
        <section 
          ref={servicesSection.ref as any}
          className={`transition-all duration-700 ease-out ${
            servicesSection.isIntersecting 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p>Loading services...</p>
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg mb-4">No services available at the moment</p>
              <p className="text-sm text-muted-foreground">Please check back later or contact us directly</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((s) => {
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
                      {s.img ? (
                        <img src={s.img} alt={s.title} loading="lazy" width={800} height={600} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : s.video_url ? (
                        <video 
                          src={s.video_url} 
                          alt={s.title}
                          muted 
                          loop 
                          playsInline 
                          autoPlay
                          className="w-full h-full object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="h-1/2 p-6 flex flex-col">
                      <h3 className="text-lg font-bold mb-2 line-clamp-2">{s.title}</h3>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {truncatedDescription}
                        </p>
                      </div>
                      <div className="mt-auto pt-3 border-t border-border flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Starting at</span>
                        <span className="font-display font-bold text-lg text-foreground">{s.price}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
