import { createFileRoute, Link, useParams } from '@tanstack/react-router';
import { ArrowLeft, Phone, WhatsAppIcon, CheckCircle2, Calendar, Clock } from 'lucide-react';
import { services, getServiceById, Service } from '@/data/services';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import tankImg from '@/assets/water-tank.jpg';
import drainImg from '@/assets/drainage.jpg';
import solarImg from '@/assets/solar.jpg';
import wellImg from '@/assets/well.jpg';

export const Route = createFileRoute('/services/$serviceId')({
  component: ServiceDetailPage,
});

function ServiceDetailPage() {
  const { serviceId } = useParams({ from: '/services/$serviceId' });
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  
  // Intersection observers for scroll animations
  const heroSection = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });
  
  const detailsSection = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });

  useEffect(() => {
    const fetchService = async () => {
      setLoading(true);
      const id = parseInt(serviceId);
      
      // First try Supabase
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('id', id)
          .single();
        
        if (!error && data) {
          // Get static service for fallback images/data
          const staticService = getServiceById(id);
          
          // Get a fallback image based on service id
          const getFallbackImg = (serviceId: number) => {
            switch (serviceId % 4) {
              case 1: return tankImg;
              case 2: return drainImg;
              case 3: return solarImg;
              case 0: return wellImg;
              default: return tankImg;
            }
          };
          
          // Convert Supabase data to match our Service interface, exactly like the home page does!
          const mappedService: Service = {
            id: data.id,
            title: data.title,
            description: data.description,
            shortDesc: data.description.substring(0, 100),
            price: data.price,
            icon: data.icon || (staticService?.icon || "Droplets"),
            img: data.image_url || data.img || staticService?.img || getFallbackImg(id), // Same logic as home page!
            video_url: data.video_url || null, // Include video URL
            banner: data.banner || data.image_url || staticService?.banner || staticService?.img || getFallbackImg(id),
            longDescription: data.description,
            features: data.features || (staticService?.features || [
              "Professional cleaning service",
              "Expert technicians",
              "Quick and efficient",
              "Satisfaction guaranteed"
            ]),
            includes: data.includes || (staticService?.includes || [
              "Verified Workers",
              "Eco-friendly",
              "Same-day service"
            ]),
            pricingDetails: "Custom pricing available"
          };
          setService(mappedService);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.error('Error fetching service from Supabase:', err);
      }
      
      // Fallback to static data
      const staticService = getServiceById(id);
      setService(staticService || null);
      setLoading(false);
    };
    
    fetchService();
  }, [serviceId]);

  useEffect(() => {
    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setSelectedDate(tomorrow.toISOString().split('T')[0]);
  }, []);

  const timeSlots = [
    '8AM-9AM',
    '9AM-10AM',
    '10AM-11AM',
    '11AM-12PM',
    '12PM-1PM',
    '1PM-2PM',
    '2PM-3PM',
    '3PM-4PM',
    '4PM-5PM',
    '5PM-6PM'
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-lg">Loading service details...</p>
        </div>
      </div>
    );
  }
  
  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Service Not Found</h2>
          <Link to="/" className="text-brand hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-muted py-4 border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="hover:text-brand transition">Home</Link>
            <span>/</span>
            <Link to="/#services" className="hover:text-brand transition">Services</Link>
            <span>/</span>
            <span className="text-foreground font-medium">{service.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <Link to="/#services" className="inline-flex items-center gap-2 text-lg font-medium mb-6 hover:text-brand transition">
          <ArrowLeft className="w-5 h-5" />
          Back to Services
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left side: Service details */}
          <div 
            ref={detailsSection.ref as any}
            className={`lg:col-span-2 transition-all duration-700 ease-out ${
              detailsSection.isIntersecting 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Banner (Video first if available) */}
            {service.video_url && (
              <div className="rounded-2xl overflow-hidden mb-8 border border-border shadow-lg">
                <video 
                  src={service.video_url} 
                  alt={service.title}
                  muted 
                  loop 
                  playsInline 
                  autoPlay
                  className="w-full h-80 object-cover"
                />
              </div>
            )}
            
            {/* Service Image */}
            <div className="rounded-2xl overflow-hidden mb-8 border border-border shadow-lg">
              <img
                src={service.banner}
                alt={service.title}
                className="w-full h-80 object-cover"
              />
              <div className="p-6 bg-card">
                <h1 className="text-4xl font-bold mb-4">{service.title}</h1>
                <div className="flex items-center gap-2 text-yellow-500 mb-2">
                  {[1,2,3,4,5].map(i => (
                    <span key={i}>★</span>
                  ))}
                  <span className="text-muted-foreground text-sm ml-2">4.9 (1,248 reviews)</span>
                </div>
              </div>
            </div>

            {/* Long Description */}
            <div className="mb-8">
              <p className="text-lg leading-relaxed text-muted-foreground text-justify">
                {service.longDescription}
              </p>
            </div>

            {/* Key Features */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">What's Included:</h2>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-brand flex-shrink-0 mt-0.5" />
                    <span className="text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service Description (short) */}
            <div className="bg-muted/50 p-6 rounded-xl mb-8">
              <h3 className="text-xl font-semibold mb-3">Short Version (for service cards):</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </div>

            {/* Features Badges */}
            <div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {service.includes.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-3 border border-border rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-brand" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side: Booking section */}
          <div 
            ref={heroSection.ref as any}
            className={`transition-all duration-700 ease-out delay-150 ${
              heroSection.isIntersecting 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="sticky top-24 border border-border rounded-2xl p-6 bg-card shadow-lg">
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-bold text-orange-600">{service.price}</span>
                  <span className="text-sm text-muted-foreground"><CheckCircle2 className="w-3.5 h-3.5 inline mr-1" /> Fixed price — will not change</span>
                </div>
              </div>

              {/* Date Selection */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Select Date
                </h3>
                <div className="grid grid-cols-5 gap-2">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const date = new Date();
                    date.setDate(date.getDate() + i);
                    const dateStr = date.toISOString().split('T')[0];
                    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                    const dayNum = date.getDate();
                    const monthName = date.toLocaleDateString('en-US', { month: 'short' });

                    return (
                      <button
                        key={i}
                        onClick={() => setSelectedDate(dateStr)}
                        className={`p-2 rounded-lg border text-center text-sm transition ${
                          selectedDate === dateStr
                            ? 'bg-[#1e3a5f] text-white border-[#1e3a5f]'
                            : 'border-border hover:border-[#1e3a5f]'
                        }`}
                      >
                        <div className="font-semibold">{dayName}</div>
                        <div className="text-xs">{dayNum}</div>
                        <div className="text-xs">{monthName}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Selection */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Choose a Time Slot
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-2 px-3 rounded-lg border text-sm transition ${
                        selectedTime === time
                          ? 'bg-[#1e3a5f] text-white border-[#1e3a5f]'
                          : 'border-border hover:border-[#1e3a5f]'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <span className="text-sm">🎁</span> Promo Code
                </h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="E.G. FREE20"
                    className="flex-1 px-4 py-2 rounded-lg border border-border"
                  />
                  <button className="px-6 py-2 bg-blue-800 text-white rounded-lg font-semibold">
                    Apply
                  </button>
                </div>
              </div>

              {/* Pricing Summary */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span>Service charge</span>
                  <span>{service.price}</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-[#1e3a5f] text-xl">{service.price}</span>
                </div>
              </div>

              {/* Booking Summary */}
              <div className="bg-[#e6f0ff] p-4 rounded-xl mb-6 border border-[#1e3a5f]">
                <h4 className="font-semibold text-sm mb-2">📋 Your Booking Summary</h4>
                {selectedDate && (
                  <div className="flex items-center gap-2 text-sm mb-1">
                    <Calendar className="w-4 h-4 text-[#1e3a5f]" />
                    <span>{new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                  </div>
                )}
                {selectedTime && (
                  <div className="flex items-center gap-2 text-sm mb-1">
                    <Clock className="w-4 h-4 text-[#1e3a5f]" />
                    <span>{selectedTime}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <span>Service: {service.title}</span>
                  <span className="ml-auto">{service.price}</span>
                </div>
              </div>

              {/* Book Now Button */}
              <a
                href="https://wa.me/9779714117380"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-[#1e3a5f] text-white font-bold rounded-xl text-lg shadow-lg hover:bg-[#0f2440] transition flex items-center justify-center"
              >
                Book Now via WhatsApp
              </a>
              <p className="text-center text-xs text-muted-foreground mt-2">
                Clicking will open WhatsApp with your booking details pre-filled
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
