import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "@tanstack/react-router";

export default function Services() {
  useScrollReveal();

  const services = [
    {
      title: "Breakup Retrieval",
      description:
        "Recover your personal belongings after a relationship ends without the stress of direct confrontation. Our neutral coordinators handle everything discreetly and professionally.",
      features: [
        "Neutral third-party coordination",
        "Discreet scheduling",
        "Photo inventory verification",
        "Secure delivery",
      ],
      accent: "coral",
      bg: "#0a1f2e",
      img: "/assets/images/breakup-service.jpg",
    },
    {
      title: "Separation Retrieval",
      description:
        "Whether married or cohabiting, we provide structured property division support during separations with full documentation and legal compliance.",
      features: [
        "Structured property division",
        "Legal documentation",
        "Mediation support",
        "Secure transport",
      ],
      accent: "emerald",
      bg: "#0a1f2e",
      img: "/assets/images/separation-service.jpg",
    },
    {
      title: "Roommate Retrieval",
      description:
        "Moving out of a shared living situation? We coordinate the safe removal of your items while respecting all parties and maintaining peace.",
      features: [
        "Scheduled pickup windows",
        "Respectful coordination",
        "Item verification",
        "Damage prevention",
      ],
      accent: "coral",
      bg: "#0a1f2e",
      img: "/assets/images/roommate-service.jpg",
    },
    {
      title: "Family Conflict Retrieval",
      description:
        "When family disputes make retrieving your belongings difficult, our trained coordinators reduce emotional tension and ensure a smooth process.",
      features: [
        "Trained conflict-sensitive staff",
        "Emotional support resources",
        "Neutral mediation",
        "Safe environment",
      ],
      accent: "emerald",
      bg: "#0a1f2e",
      img: "/assets/images/family-service.jpg",
    },
    {
      title: "Emergency Retrieval",
      description:
        "Urgent situations require immediate response. Our emergency team is available for same-day coordination when time is critical.",
      features: [
        "Same-day availability",
        "Priority dispatch",
        "Rapid response team",
        "24/7 emergency line",
      ],
      accent: "coral",
      bg: "#0a1f2e",
      img: "/assets/images/emergency-service.jpg",
    },
    {
      title: "Documentation Services",
      description:
        "Comprehensive photo, video, and written documentation of all retrieved items for your records, insurance, or legal proceedings.",
      features: [
        "High-resolution photography",
        "Video walkthroughs",
        "Detailed inventory reports",
        "Digital signatures",
      ],
      accent: "emerald",
      bg: "#0a1f2e",
      img: "/assets/images/documentation-service.jpg",
    },
  ];

  return (
    <div className="min-h-screen py-16 px-4 bg-transparent relative">
      <div className="max-w-6xl mx-auto">
        {/* Established Banner */}
        <div
          className="reveal mb-12 text-center"
          data-ocid="services.established_banner"
        >
          <div className="inline-block aurora-bg rounded-2xl px-10 py-5 shimmer-overlay border-aurora">
            <p className="font-hero text-cream text-lg md:text-xl tracking-[0.2em] uppercase">
              Entangled Retrievals was established{" "}
              <span className="text-coral neon-glow-coral font-semibold">
                2026
              </span>
            </p>
          </div>
        </div>

        <div className="reveal text-center mb-16">
          <h1 className="font-hero text-5xl font-bold text-cream mb-4 tracking-[0.1em]">
            Our Services
          </h1>
          <p className="text-silver text-lg max-w-2xl mx-auto">
            Professional retrieval coordination for every difficult life
            transition. We handle the logistics so you can focus on moving
            forward.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <div
              key={service.title}
              className={`reveal reveal-delay-${Math.min(i + 1, 5)} glass-card-premium glass-card-hover rounded-2xl group overflow-hidden`}
              data-ocid={`services.card.${i + 1}`}
            >
              {/* Image / Gradient Header */}
              <div
                className="h-40 w-full relative"
                style={{ background: service.bg }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className={`w-20 h-20 rounded-full flex items-center justify-center border-2 ${
                      service.accent === "coral"
                        ? "border-coral/40 bg-coral/10 glow-coral"
                        : "border-emerald/40 bg-emerald/10 glow-emerald"
                    }`}
                  >
                    <span
                      className={`font-display text-3xl ${
                        service.accent === "coral"
                          ? "text-glow-coral"
                          : "text-glow-emerald"
                      }`}
                    >
                      {service.title.charAt(0)}
                    </span>
                  </div>
                </div>
                <div
                  className="absolute bottom-0 left-0 right-0 h-16"
                  style={{ backgroundColor: "rgba(10, 31, 46, 0.9)" }}
                />
              </div>

              <div className="p-8">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-cream mb-2 group-hover:text-coral transition-colors tracking-wide">
                    {service.title}
                  </h2>
                  <p className="text-silver leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-silver">
                      <span
                        className={`w-2 h-2 rounded-full mr-3 flex-shrink-0 ${
                          service.accent === "coral" ? "bg-coral" : "bg-emerald"
                        }`}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div>
                  <Link
                    to="/booking"
                    className={`inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-xl transition-smooth ${
                      service.accent === "coral"
                        ? "bg-coral/10 border border-coral/30 text-coral hover:bg-coral hover:text-navy"
                        : "bg-emerald/10 border border-emerald/30 text-emerald hover:bg-emerald hover:text-navy"
                    }`}
                    data-ocid={`services.book_button.${i + 1}`}
                  >
                    Book {service.title.split(" ")[0]}
                    <svg
                      className="w-4 h-4"
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
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
