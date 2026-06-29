import { createFileRoute } from "@tanstack/react-router";
import { Droplets, Waves, Sun, CircleDot, Check, Phone, ShieldCheck, Clock, Star, ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import tankImg from "@/assets/water-tank.jpg";
import drainImg from "@/assets/drainage.jpg";
import solarImg from "@/assets/solar.jpg";
import wellImg from "@/assets/well.jpg";

export const Route = createFileRoute("/")({
  component: Home,
});

const services = [
  {
    icon: Droplets,
    title: "Water Tank Cleaning",
    desc: "Deep sanitization of overhead & underground tanks with eco-safe disinfectants.",
    price: "₹1,499",
    img: tankImg,
  },
  {
    icon: Waves,
    title: "Drainage Cleaning",
    desc: "High-pressure jet cleaning to clear blockages and restore smooth flow.",
    price: "₹999",
    img: drainImg,
  },
  {
    icon: Sun,
    title: "Solar Panel Cleaning",
    desc: "Boost panel efficiency up to 30% with safe, streak-free professional wash.",
    price: "₹799",
    img: solarImg,
  },
  {
    icon: CircleDot,
    title: "Well Cleaning",
    desc: "Complete desilting, scrubbing and chlorination for safe drinking water.",
    price: "₹2,499",
    img: wellImg,
  },
];

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 font-display font-bold text-xl">
            <span className="w-8 h-8 rounded-lg flex items-center justify-center text-primary-foreground" style={{ background: "var(--gradient-brand)" }}>
              <Droplets className="w-4 h-4" />
            </span>
            AquaPure
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#services" className="hover:text-brand transition">Services</a>
            <a href="#why" className="hover:text-brand transition">Why Us</a>
            <a href="#reviews" className="hover:text-brand transition">Reviews</a>
            <a href="#contact" className="hover:text-brand transition">Contact</a>
          </nav>
          <a href="#contact" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground text-background text-sm font-medium hover:opacity-90 transition">
            <Phone className="w-4 h-4" /> Book Now
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 opacity-30">
          <img src={heroImg} alt="" className="w-full h-full object-cover" width={1600} height={1024} />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur text-xs font-medium border border-white/20">
              <ShieldCheck className="w-3.5 h-3.5" /> Trusted by 10,000+ homes
            </span>
            <h1 className="mt-6 text-5xl md:text-6xl font-bold leading-[1.05]">
              Cleaner water. <br /> <span style={{ color: "oklch(0.85 0.15 195)" }}>Brighter living.</span>
            </h1>
            <p className="mt-6 text-lg text-white/85 max-w-lg">
              Professional cleaning for water tanks, drainage, solar panels and wells — booked in seconds, done in hours.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#services" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-primary font-semibold shadow-lg hover:scale-[1.02] transition">
                Explore services <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/30 text-white font-semibold hover:bg-white/10 transition">
                Get a free quote
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
      <section id="services" className="max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold text-brand uppercase tracking-wider">Our Services</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold">Everything your property needs, sparkling clean.</h2>
        </div>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <article key={s.title} className="group rounded-2xl bg-card border border-border overflow-hidden hover:-translate-y-1 transition-all duration-300" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="aspect-[4/3] overflow-hidden">
                <img src={s.img} alt={s.title} loading="lazy" width={800} height={600} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center text-brand mb-4">
                  <s.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                <div className="mt-5 flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-xs text-muted-foreground">Starting at</span>
                  <span className="font-display font-bold text-lg text-foreground">{s.price}</span>
                </div>
                <a href="#contact" className="mt-4 w-full inline-flex justify-center items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-brand transition">
                  Book service <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section id="why" className="bg-secondary/50 border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-sm font-semibold text-brand uppercase tracking-wider">Why AquaPure</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold">Built on trust. Backed by results.</h2>
            <p className="mt-5 text-muted-foreground">A decade of experience cleaning India's homes, businesses and farms — with safety, transparency and speed at the core.</p>
            <ul className="mt-8 space-y-4">
              {[
                "Eco-friendly, ISI-certified cleaning agents",
                "Trained & background-verified professionals",
                "Before/after photos with every job",
                "Service warranty up to 3 months",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className="mt-1 w-5 h-5 rounded-full flex items-center justify-center text-primary-foreground" style={{ background: "var(--gradient-brand)" }}>
                    <Check className="w-3 h-3" />
                  </span>
                  <span className="font-medium">{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: ShieldCheck, h: "100% Safe", p: "Insured & verified team" },
              { icon: Clock, h: "On-time", p: "Same-day service" },
              { icon: Star, h: "Top rated", p: "4.9★ from 2k+ reviews" },
              { icon: Droplets, h: "Eco-friendly", p: "Non-toxic chemicals" },
            ].map((c) => (
              <div key={c.h} className="p-6 rounded-2xl bg-card border border-border" style={{ boxShadow: "var(--shadow-card)" }}>
                <c.icon className="w-6 h-6 text-brand" />
                <div className="mt-4 font-bold">{c.h}</div>
                <div className="text-sm text-muted-foreground">{c.p}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold text-brand uppercase tracking-wider">Reviews</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold">Loved by thousands of homes.</h2>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            { n: "Priya S.", r: "Bengaluru", t: "Booked tank cleaning on Sunday morning. Team arrived in 2 hours and did an incredible job. Water tastes fresh again!" },
            { n: "Rahul M.", r: "Pune", t: "My solar panels were producing 25% more power after their wash. Worth every rupee." },
            { n: "Anita K.", r: "Chennai", t: "Drainage was blocked for weeks — they fixed it in under an hour. Professional and clean work." },
          ].map((r) => (
            <div key={r.n} className="p-7 rounded-2xl bg-card border border-border" style={{ boxShadow: "var(--shadow-card)" }}>
              <div className="flex gap-0.5 text-accent-warm">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="mt-4 text-foreground leading-relaxed">"{r.t}"</p>
              <div className="mt-5 pt-4 border-t border-border">
                <div className="font-semibold">{r.n}</div>
                <div className="text-sm text-muted-foreground">{r.r}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA / CONTACT */}
      <section id="contact" className="relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="relative max-w-5xl mx-auto px-6 py-24 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold">Ready for cleaner, safer water?</h2>
          <p className="mt-5 text-lg text-white/85 max-w-xl mx-auto">Get a free quote in under a minute. Our team will reach out within 30 minutes.</p>
          <form className="mt-10 max-w-xl mx-auto flex flex-col sm:flex-row gap-3 p-2 bg-white/10 backdrop-blur rounded-2xl border border-white/20">
            <input type="tel" placeholder="Your phone number" className="flex-1 px-5 py-3 rounded-xl bg-white/95 text-foreground placeholder:text-muted-foreground focus:outline-none" />
            <button type="button" className="px-6 py-3 rounded-xl bg-foreground text-background font-semibold hover:opacity-90 transition inline-flex items-center justify-center gap-2">
              Request callback <ArrowRight className="w-4 h-4" />
            </button>
          </form>
          <div className="mt-8 inline-flex items-center gap-2 text-white/80 text-sm">
            <Phone className="w-4 h-4" /> Or call us directly: <a href="tel:+919999999999" className="font-semibold text-white underline">+91 99999 99999</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="flex items-center gap-2 font-display font-bold text-xl">
            <span className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--gradient-brand)" }}>
              <Droplets className="w-4 h-4" />
            </span>
            AquaPure
          </div>
          <p className="text-sm text-primary-foreground/70">© 2026 AquaPure Services. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <a href="#services" className="hover:text-accent transition">Services</a>
            <a href="#contact" className="hover:text-accent transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
