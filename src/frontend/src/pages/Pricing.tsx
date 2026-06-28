import CostCalculator from "@/components/CostCalculator";
import PackageComparisonTable from "@/components/PackageComparisonTable";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeftRight,
  BadgeCheck,
  CheckCircle2,
  Clock,
  EyeOff,
  MapPin,
  Package,
  ShieldCheck,
  Star,
  Truck,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

/* ─── Data ─── */

const personalPackages = [
  {
    id: 1,
    number: 1,
    name: "Essential Item Retrieval",
    price: "$99",
    includes: "1 personal item",
    examples: ["Backpack", "Gym bag", "Keys", "Purse", "Laptop bag"],
    featured: false,
    badge: null,
  },
  {
    id: 2,
    number: 2,
    name: "Personal Collection Retrieval",
    price: "$149",
    includes: "Up to 3 personal items",
    examples: [
      "Backpacks",
      "Storage bins",
      "Suitcases",
      "Clothing bags",
      "Small electronics",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 3,
    number: 3,
    name: "Standard Retrieval",
    price: "$229",
    includes: "Up to 5 personal items",
    examples: ["Storage totes", "Suitcases", "Electronics", "Personal effects"],
    featured: true,
    badge: "Most Popular",
  },
  {
    id: 4,
    number: 4,
    name: "Transition Retrieval",
    price: "$329",
    includes: "Up to 8 personal items",
    examples: [
      "Clothing bundles",
      "Storage bins",
      "Laundry baskets",
      "Mixed personal belongings",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 5,
    number: 5,
    name: "Complete Personal Property Retrieval",
    price: "$449",
    includes: "Up to 15 personal items",
    examples: [
      "Bedroom contents",
      "Office contents",
      "Multiple storage containers",
      "Personal collections",
    ],
    featured: false,
    badge: "Best Value",
  },
];

const furniturePackages = [
  {
    id: 6,
    number: 6,
    name: "Furniture Retrieval (Small Load)",
    price: "$499",
    includes: "Up to 3 large furniture items",
    examples: [
      "Mattress",
      "Couch",
      "Dresser",
      "Desk",
      "Recliner",
      "Washer",
      "Dryer",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 7,
    number: 7,
    name: "Furniture Retrieval (Medium Load)",
    price: "$699",
    includes: "Up to 5 furniture items",
    examples: [
      "Sofa",
      "Dining table",
      "Bedroom furniture",
      "Refrigerator",
      "Washer and dryer",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 8,
    number: 8,
    name: "Furniture Retrieval (Large Load)",
    price: "$999",
    includes: "Up to 8 furniture items",
    examples: [
      "Full bedroom set",
      "Living room set",
      "Dining room set",
      "Multi-room furniture recovery",
    ],
    featured: false,
    badge: null,
  },
  {
    id: 9,
    number: 9,
    name: "Full Household Retrieval",
    price: "Starting at $1,499",
    includes: "9+ furniture items",
    examples: [
      "Extended coordination",
      "Priority scheduling",
      "Multi-room furniture recovery",
    ],
    featured: false,
    badge: "Premium",
  },
];

const additionalFees = [
  {
    name: "Strict No-Contact Coordination",
    price: "+$99",
    description: "All communication handled through us",
    icon: EyeOff,
  },
  {
    name: "Stair Carry Fee",
    price: "+$15 per flight",
    description: "Furniture packages only",
    icon: Zap,
  },
  {
    name: "Additional Stops",
    price: "+$50 per stop",
    description: "Any stop added between pickup and final delivery",
    icon: MapPin,
  },
  {
    name: "Two-Way Retrieval",
    price: "+75% of package price",
    description: "Exchange belongings between two parties",
    icon: ArrowLeftRight,
  },
];

const trustBadges = [
  {
    icon: ShieldCheck,
    title: "Licensed & Insured",
    description: "Fully bonded and insured for your peace of mind",
  },
  {
    icon: Clock,
    title: "24/6 Availability",
    description: "Service available six days a week, around the clock",
  },
  {
    icon: EyeOff,
    title: "Discreet Service",
    description: "Neutral third-party coordination ensures privacy",
  },
  {
    icon: MapPin,
    title: "GPS Tracking",
    description: "Real-time location updates from pickup to delivery",
  },
];

const includedFeatures = [
  "Photo inventory verification",
  "Real-time tracking",
  "Customer portal access",
  "Digital agreements",
  "Status notifications",
  "Neutral third-party coordination",
  "Same-day scheduling (when available)",
];

/* ─── Components ─── */

function DecorativeBorder({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`}>
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-rose-gold/40 rounded-tl-lg" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-rose-gold/40 rounded-tr-lg" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-rose-gold/40 rounded-bl-lg" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-rose-gold/40 rounded-br-lg" />
    </div>
  );
}

function ShimmerOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background:
            "linear-gradient(105deg, transparent 40%, rgba(196,112,58,0.08) 45%, rgba(196,112,58,0.15) 50%, rgba(196,112,58,0.08) 55%, transparent 60%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 2.5s ease-in-out infinite",
        }}
      />
    </div>
  );
}

function PricingCard({
  pkg,
  index,
  type,
}: {
  pkg: (typeof personalPackages)[number];
  index: number;
  type: "personal" | "furniture";
}) {
  const isFeatured = pkg.featured;
  const search = new URLSearchParams();
  search.set("package", String(pkg.id));

  return (
    <motion.div
      key={pkg.name}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`group relative flex flex-col rounded-2xl p-6 transition-all duration-500 ${
        isFeatured
          ? "glass-card-premium border-rose-gold/50 shadow-rose-glow scale-[1.02]"
          : "glass-card-premium glass-card-hover"
      }`}
      data-ocid={`pricing.${type}_package.${index + 1}`}
    >
      <ShimmerOverlay />
      <DecorativeBorder className="opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {pkg.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <div
            className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-[0.15em] text-cream ${
              isFeatured ? "bg-coral" : "bg-rose-gold"
            }`}
          >
            {pkg.badge}
          </div>
        </div>
      )}

      <div className="flex items-center gap-3 mb-5">
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${
            isFeatured
              ? "bg-coral/15 border-coral/30"
              : "bg-rose-gold/10 border-rose-gold/20"
          }`}
        >
          {type === "personal" ? (
            <Package
              className={`w-5 h-5 ${isFeatured ? "text-coral" : "text-rose-gold"}`}
            />
          ) : (
            <Truck
              className={`w-5 h-5 ${isFeatured ? "text-coral" : "text-rose-gold"}`}
            />
          )}
        </div>
        <div>
          <p className="text-xs text-rose-gold font-bold uppercase tracking-[0.12em]">
            Package {pkg.number}
          </p>
          <h3 className="text-base font-semibold text-cream group-hover:text-rose-gold transition-colors duration-300 font-display">
            {pkg.name}
          </h3>
        </div>
      </div>

      <div className="mb-1">
        <span className="text-4xl font-bold text-coral font-display">
          {pkg.price}
        </span>
      </div>
      <p className="text-sm text-emerald font-medium mb-5">{pkg.includes}</p>

      <div className="space-y-2 mb-6 flex-1">
        {pkg.examples.map((ex) => (
          <div
            key={ex}
            className="flex items-center gap-2.5 text-sm text-silver/80"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-gold/60 shrink-0" />
            {ex}
          </div>
        ))}
      </div>

      <Link
        to="/booking"
        search={{ package: String(pkg.id) }}
        className={`block text-center font-bold py-3.5 rounded-xl transition-all duration-300 text-sm tracking-wide ${
          isFeatured
            ? "bg-coral text-navy hover:bg-coral-light shadow-lg shadow-coral/20"
            : "bg-rose-gold/10 border border-rose-gold/30 text-rose-gold hover:bg-rose-gold hover:text-navy"
        }`}
        data-ocid={`pricing.book_button.${index + 1}`}
      >
        Book Now
      </Link>
    </motion.div>
  );
}

/* ─── Page ─── */

export default function Pricing() {
  const [calcOpen, setCalcOpen] = useState(false);

  return (
    <div className="min-h-screen relative">
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/90 via-navy-deep/70 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 pt-20 pb-16 md:pt-28 md:pb-24 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-gold/10 border border-rose-gold/20 mb-6">
                <Star className="w-3.5 h-3.5 text-rose-gold" />
                <span className="text-xs text-rose-gold font-medium uppercase tracking-[0.15em]">
                  Transparent Pricing
                </span>
              </div>
              <h1 className="font-hero text-5xl md:text-6xl lg:text-7xl font-bold text-cream mb-6 tracking-[0.08em] neon-glow-rose leading-tight">
                Pricing &<br />
                Packages
              </h1>
              <p className="text-silver text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8">
                Professional retrieval coordination with clear, upfront pricing.
                Every package includes verification, documentation, and neutral
                third-party coordination.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                <Link
                  to="/booking"
                  className="inline-flex items-center gap-2 bg-coral text-navy font-bold px-8 py-3.5 rounded-xl hover:bg-coral-light transition-smooth shadow-lg shadow-coral/20"
                  data-ocid="pricing.hero_cta_primary"
                >
                  Start Your Retrieval
                </Link>
                <button
                  type="button"
                  onClick={() => setCalcOpen((v) => !v)}
                  className="inline-flex items-center gap-2 bg-rose-gold/10 border border-rose-gold/30 text-rose-gold font-bold px-8 py-3.5 rounded-xl hover:bg-rose-gold/20 transition-smooth"
                  data-ocid="pricing.hero_toggle_calculator"
                >
                  <Zap className="w-4 h-4" />
                  Cost Calculator
                </button>
              </div>
              <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-5 text-sm text-silver/70">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald" />
                  Verification Included
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald" />
                  Documentation Included
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald" />
                  No Hidden Fees
                </span>
              </div>
            </motion.div>

            {/* Illustrated Woman */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative hidden lg:flex justify-center items-center"
            >
              <div className="relative w-[380px] h-[480px]">
                {/* Decorative ring */}
                <div className="absolute inset-0 rounded-full border border-rose-gold/20 scale-110" />
                <div className="absolute inset-0 rounded-full border border-rose-gold/10 scale-125" />
                {/* Glow */}
                <div className="absolute inset-4 rounded-full bg-rose-gold/5 blur-3xl" />
                <img
                  src="/assets/generated/pricing-hero-woman.dim_800x1000.png"
                  alt="Elegant illustrated character"
                  className="relative w-full h-full object-contain drop-shadow-2xl"
                  style={{
                    filter: "drop-shadow(0 0 30px rgba(196,112,58,0.2))",
                  }}
                />
                {/* Floating accent dots */}
                <div className="absolute top-8 right-0 w-3 h-3 rounded-full bg-coral/60 animate-pulse" />
                <div className="absolute bottom-16 left-0 w-2 h-2 rounded-full bg-rose-gold/60 animate-pulse delay-300" />
                <div className="absolute top-1/3 left-[-12px] w-2 h-2 rounded-full bg-emerald/60 animate-pulse delay-700" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom decorative line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-gold/30 to-transparent" />
      </section>

      {/* ── Availability Banner ── */}
      <section className="bg-navy-deep/60 border-y border-rose-gold/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <span className="flex items-center gap-2 text-cream">
              <Clock className="w-4 h-4 text-rose-gold" />
              <span className="font-medium">24/6 Availability</span>
            </span>
            <span className="hidden sm:block w-px h-4 bg-rose-gold/20" />
            <span className="flex items-center gap-2 text-silver/80">
              <BadgeCheck className="w-4 h-4 text-emerald" />
              Sunday bookings accepted with 48-hour notice
            </span>
            <span className="hidden sm:block w-px h-4 bg-rose-gold/20" />
            <span className="flex items-center gap-2 text-silver/80">
              <Star className="w-4 h-4 text-coral" />
              Same-day service when available
            </span>
          </div>
        </div>
      </section>

      {/* ── Cost Calculator (collapsible) ── */}
      {calcOpen && (
        <motion.section
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="bg-navy-deep/40 border-b border-rose-gold/10"
        >
          <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="glass-card-premium p-8 rounded-2xl">
              <CostCalculator />
            </div>
          </div>
        </motion.section>
      )}

      {/* ── Personal Packages ── */}
      <section className="py-20 md:py-28 relative">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-coral/10 border border-coral/20 mb-4">
              <Package className="w-3 h-3 text-coral" />
              <span className="text-[10px] text-coral font-bold uppercase tracking-[0.2em]">
                Personal Items
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-3 tracking-[0.08em]">
              Personal Item Packages
            </h2>
            <p className="text-silver max-w-xl mx-auto">
              For backpacks, bags, electronics, documents, and personal effects
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {personalPackages.map((pkg, i) => (
              <PricingCard key={pkg.id} pkg={pkg} index={i} type="personal" />
            ))}
          </div>
        </div>
      </section>

      {/* ── Furniture Packages ── */}
      <section className="py-20 md:py-28 relative bg-navy-deep/30">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-gold/[0.02] to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-gold/10 border border-rose-gold/20 mb-4">
              <Truck className="w-3 h-3 text-rose-gold" />
              <span className="text-[10px] text-rose-gold font-bold uppercase tracking-[0.2em]">
                Furniture & Large Items
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-3 tracking-[0.08em]">
              Furniture Packages
            </h2>
            <p className="text-silver max-w-xl mx-auto">
              For sofas, beds, desks, appliances, and large household items
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {furniturePackages.map((pkg, i) => (
              <PricingCard key={pkg.id} pkg={pkg} index={i} type="furniture" />
            ))}
          </div>
        </div>
      </section>

      {/* ── Package Comparison ── */}
      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-3 tracking-[0.08em]">
              Package Comparison
            </h2>
            <p className="text-silver max-w-xl mx-auto">
              Compare features across all tiers to find your perfect fit
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="glass-card-premium p-6 md:p-8 rounded-2xl"
          >
            <PackageComparisonTable />
          </motion.div>
        </div>
      </section>

      {/* ── Additional Fees ── */}
      <section className="py-20 md:py-24 bg-navy-deep/30">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald/10 border border-emerald/20 mb-4">
              <Zap className="w-3 h-3 text-emerald" />
              <span className="text-[10px] text-emerald font-bold uppercase tracking-[0.2em]">
                Add-Ons
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-3 tracking-[0.08em]">
              Additional Services & Fees
            </h2>
            <p className="text-silver max-w-xl mx-auto">
              Customize your retrieval with these optional add-ons
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {additionalFees.map((fee, i) => {
              const Icon = fee.icon;
              return (
                <motion.div
                  key={fee.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group glass-card-premium glass-card-hover p-6 rounded-2xl relative"
                  data-ocid={`pricing.addon.${i + 1}`}
                >
                  <ShimmerOverlay />
                  <DecorativeBorder className="opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="w-10 h-10 rounded-xl bg-rose-gold/10 border border-rose-gold/20 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-rose-gold" />
                  </div>
                  <h4 className="text-cream font-semibold text-sm mb-1">
                    {fee.name}
                  </h4>
                  <p className="text-coral font-bold text-lg mb-2">
                    {fee.price}
                  </p>
                  <p className="text-silver/60 text-xs leading-relaxed">
                    {fee.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Included With All ── */}
      <section className="py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card-premium p-8 md:p-12 rounded-2xl relative"
          >
            <DecorativeBorder />
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-3 tracking-[0.08em]">
                Included With All Packages
              </h2>
              <p className="text-silver max-w-lg mx-auto">
                Every package includes these standard features at no extra
                charge
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {includedFeatures.map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex items-center gap-3 bg-navy/40 rounded-xl p-4 border border-emerald/10 hover:border-emerald/30 transition-colors duration-300"
                >
                  <div className="w-9 h-9 rounded-lg bg-emerald/10 border border-emerald/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-emerald" />
                  </div>
                  <span className="text-cream text-sm font-medium">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-20 md:py-24 bg-navy-deep/30">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-3 tracking-[0.08em]">
              Why Choose Entangled Retrievals
            </h2>
            <p className="text-silver max-w-xl mx-auto">
              Trusted by hundreds of clients across Los Angeles
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {trustBadges.map((badge, i) => {
              const Icon = badge.icon;
              return (
                <motion.div
                  key={badge.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group text-center p-6 rounded-2xl glass-card-premium glass-card-hover relative"
                  data-ocid={`pricing.trust_badge.${i + 1}`}
                >
                  <ShimmerOverlay />
                  <div className="w-14 h-14 rounded-2xl bg-rose-gold/10 border border-rose-gold/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-rose-gold" />
                  </div>
                  <h3 className="text-cream font-semibold text-base mb-2 font-display tracking-wide">
                    {badge.title}
                  </h3>
                  <p className="text-silver/70 text-sm leading-relaxed">
                    {badge.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-navy-deep/40" />
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-coral/10 border border-coral/20 mb-6">
              <Star className="w-3.5 h-3.5 text-coral" />
              <span className="text-xs text-coral font-medium uppercase tracking-[0.15em]">
                Ready to Begin
              </span>
            </div>
            <h2 className="font-hero text-4xl md:text-5xl font-bold text-cream mb-6 tracking-[0.06em] neon-glow-rose">
              Reclaim What Is Yours
            </h2>
            <p className="text-silver text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Same-day service and urgent retrieval during normal business hours
              are included at no extra charge. Let us handle the coordination so
              you can focus on moving forward.
            </p>
            <Link
              to="/booking"
              className="inline-flex items-center gap-3 bg-coral text-navy font-bold px-12 py-4 rounded-xl hover:bg-coral-light transition-smooth shadow-xl shadow-coral/20 text-lg tracking-wide"
              data-ocid="pricing.cta_book_button"
            >
              Start Your Retrieval
              <ArrowLeftRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
