import { ParticleBackground } from "@/components/ParticleBackground";
import { Link } from "@tanstack/react-router";
import {
  CalendarDays,
  ClipboardList,
  Eye,
  Lock,
  MapPin,
  PackageCheck,
  ShieldCheck,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

export default function Home() {
  const howItWorks = [
    {
      step: "1",
      title: "Schedule",
      desc: "Book your retrieval online in minutes. Share the details securely.",
      icon: CalendarDays,
    },
    {
      step: "2",
      title: "We Plan",
      desc: "We create a customized plan focused on safety, privacy, and efficiency.",
      icon: ClipboardList,
    },
    {
      step: "3",
      title: "We Retrieve",
      desc: "Our trained specialist retrieves your items without confrontation.",
      icon: MapPin,
    },
    {
      step: "4",
      title: "You Receive",
      desc: "Your belongings are delivered to a secure location of your choice.",
      icon: PackageCheck,
    },
  ];

  const features = [
    {
      title: "Safety First",
      desc: "Your safety is our top priority. We handle everything.",
      icon: ShieldCheck,
    },
    {
      title: "Total Privacy",
      desc: "Discreet service with confidential handling of all information.",
      icon: Lock,
    },
    {
      title: "Real-Time Tracking",
      desc: "Track every step of the retrieval in real time through our app.",
      icon: Eye,
    },
    {
      title: "Trained Professionals",
      desc: "Experienced, neutral specialists who know how to manage any situation.",
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-transparent relative">
      {/* Hero */}
      <section className="min-h-[85vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden bg-brand-navy">
        <ParticleBackground />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-5xl mx-auto"
        >
          <h1 className="font-hero text-5xl md:text-7xl font-bold text-cream mb-6 leading-tight tracking-[0.12em]">
            Moving forward shouldn't mean facing conflict.
          </h1>
          <p className="text-lg md:text-xl text-silver mb-10 max-w-2xl mx-auto leading-relaxed">
            Entangled Retrievals provides a safe, neutral, and professional way
            to recover your personal belongings during difficult life
            transitions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/booking"
              className="bg-brand-copper text-cream font-bold px-8 py-4 rounded-xl hover:bg-rose-gold-light transition-smooth inline-flex items-center justify-center gap-2"
              data-ocid="home.schedule_retrieval_button"
            >
              <CalendarDays className="w-5 h-5" />
              Schedule a Secure Retrieval
            </Link>
            <Link
              to="/services"
              className="border border-brand-copper/30 text-cream font-semibold px-8 py-4 rounded-xl hover:bg-brand-copper/10 transition-smooth inline-flex items-center justify-center"
              data-ocid="home.learn_more_button"
            >
              Learn More
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-silver/70 text-sm">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-copper" /> Safe
            </span>
            <span className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-brand-copper" /> Private
            </span>
            <span className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-brand-copper" /> Tracked
            </span>
          </div>
        </motion.div>
      </section>

      {/* Mission Statement */}
      <section className="py-24 px-4 relative bg-background">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-silver text-lg leading-relaxed">
                Whether you are navigating a breakup, a separation, or a
                challenging roommate dispute, reclaiming what is yours shouldn't
                be stressful or unsafe. We bridge the gap with a secure,
                technology-enabled coordination service designed to eliminate
                confrontation. Through structured planning and real-time
                tracking, we handle the logistics so you can focus on your next
                chapter—with safety, privacy, and dignity.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="glass-card-premium p-10 rounded-2xl text-center"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-4">
                We retrieve what's yours, without the drama.
              </h2>
              <div className="w-16 h-0.5 bg-brand-copper mx-auto mt-6" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 relative bg-muted/30">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl font-bold text-cream text-center mb-4">
              How It Works
            </h2>
            <div className="w-24 h-0.5 bg-brand-copper mx-auto" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto rounded-full border-2 border-brand-copper/30 flex items-center justify-center bg-brand-navy/60">
                    <item.icon className="w-8 h-8 text-brand-copper" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-brand-copper text-navy font-bold text-sm flex items-center justify-center">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-cream mb-3 tracking-wider uppercase">
                  {item.title}
                </h3>
                <p className="text-silver leading-relaxed text-sm">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Entangled Retrievals */}
      <section className="py-24 px-4 relative bg-background">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl font-bold text-cream text-center mb-4">
              Why Choose Entangled Retrievals?
            </h2>
            <div className="w-24 h-0.5 bg-brand-copper mx-auto" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass-card-premium glass-card-hover p-8 rounded-2xl text-center group"
              >
                <div className="w-16 h-16 mx-auto rounded-full border border-brand-copper/30 flex items-center justify-center mb-6 group-hover:bg-brand-copper/10 transition-colors">
                  <f.icon className="w-7 h-7 text-brand-copper" />
                </div>
                <h3 className="text-lg font-semibold text-cream mb-3">
                  {f.title}
                </h3>
                <p className="text-silver text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 px-4 relative overflow-hidden bg-muted/30">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-cream mb-6">
              Ready to Recover Your Belongings Safely?
            </h2>
            <p className="text-silver text-lg mb-10 max-w-xl mx-auto">
              Our professional coordinators are standing by to help you through
              this difficult transition.
            </p>
            <Link
              to="/booking"
              className="bg-brand-copper text-cream font-bold px-10 py-5 rounded-xl hover:bg-rose-gold-light transition-smooth inline-flex items-center gap-3 text-lg"
              data-ocid="home.footer_book_button"
            >
              Book Now
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                role="img"
                aria-label="Arrow right"
              >
                <title>Arrow right</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
