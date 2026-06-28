import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function AboutPage() {
  useScrollReveal();

  return (
    <div className="min-h-screen py-16 px-4 bg-transparent relative">
      <div className="max-w-6xl mx-auto">
        {/* Our Story Section */}
        <section className="reveal mb-20" data-ocid="about.our_story.section">
          {/* Hero Header */}
          <div className="reveal text-center mb-12">
            <h1
              className="font-hero text-5xl md:text-6xl lg:text-7xl font-bold tracking-[0.12em] mb-4"
              style={{ color: "#F27C7C" }}
              data-ocid="about.title"
            >
              About Us
            </h1>
            <div
              className="w-24 h-0.5 mx-auto rounded-full"
              style={{ backgroundColor: "#F27C7C" }}
            />
          </div>

          {/* Story Card */}
          <div
            className="reveal reveal-delay-2 rounded-2xl p-8 md:p-12"
            style={{
              backgroundColor: "rgba(10, 31, 46, 0.70)",
              border: "1px solid #F27C7C",
              boxShadow:
                "0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
            }}
            data-ocid="about.our_story.card"
          >
            <div className="prose prose-lg max-w-none">
              <p className="text-cream/90 leading-relaxed text-lg mb-6">
                Entangled Retrievals was created to solve a problem that many
                people face but few services address. When relationships end,
                roommates part ways, families experience conflict, or life
                circumstances suddenly change, retrieving personal belongings
                can become emotionally overwhelming, stressful, and sometimes
                unsafe.
              </p>
              <p className="text-cream/90 leading-relaxed text-lg mb-6">
                What should be a simple exchange often becomes complicated by
                unresolved emotions, communication barriers, distance, conflict,
                or concerns for personal well-being. Many individuals find
                themselves avoiding the retrieval process altogether, leaving
                valuable and sentimental belongings behind because they do not
                want to revisit a painful situation.
              </p>
              <p className="text-cream/90 leading-relaxed text-lg">
                Entangled Retrievals was founded to provide a professional,
                neutral, and compassionate solution. Our mission is to help
                individuals recover their personal property with dignity,
                discretion, and peace of mind while minimizing unnecessary
                conflict and emotional distress. We serve as a trusted third
                party, helping clients move forward and focus on the next
                chapter of their lives.
              </p>
            </div>
          </div>
        </section>

        {/* Decorative Divider */}
        <div className="reveal flex items-center justify-center gap-4 mb-20">
          <div
            className="h-px flex-1 max-w-[200px]"
            style={{ backgroundColor: "rgba(242, 124, 124, 0.3)" }}
          />
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: "rgba(242, 124, 124, 0.5)" }}
          />
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: "rgba(242, 124, 124, 0.4)" }}
          />
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: "rgba(31, 163, 122, 0.4)" }}
          />
          <div
            className="h-px flex-1 max-w-[200px]"
            style={{ backgroundColor: "rgba(242, 124, 124, 0.3)" }}
          />
        </div>

        {/* Meet the Founder Section */}
        <section className="reveal" data-ocid="about.founder.section">
          {/* Section Heading */}
          <div className="reveal text-center mb-8">
            <h2
              className="font-hero text-4xl md:text-5xl font-bold tracking-[0.08em] mb-4"
              style={{ color: "#F27C7C" }}
              data-ocid="about.founder.title"
            >
              Meet the Founder
            </h2>
            <div
              className="w-20 h-0.5 mx-auto rounded-full mb-6"
              style={{ backgroundColor: "#F27C7C" }}
            />
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Founder Photo with Decorative Frame + Signature */}
            <div className="reveal reveal-delay-1 flex flex-col items-center lg:items-end">
              <div className="relative flex flex-col items-center">
                {/* Outer decorative frame */}
                <div
                  className="absolute -inset-6 rounded-full"
                  style={{
                    border: "3px solid rgba(242, 124, 124, 0.4)",
                    boxShadow:
                      "0 0 0 6px rgba(10, 31, 46, 0.8), 0 0 0 10px rgba(242, 124, 124, 0.2)",
                  }}
                />
                {/* Second decorative ring */}
                <div
                  className="absolute -inset-12 rounded-full"
                  style={{
                    border: "2px solid rgba(242, 124, 124, 0.15)",
                  }}
                />
                {/* Corner ornaments */}
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rotate-45"
                  style={{
                    backgroundColor: "#F27C7C",
                    boxShadow: "0 0 12px rgba(242, 124, 124, 0.5)",
                  }}
                />
                <div
                  className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rotate-45"
                  style={{
                    backgroundColor: "#F27C7C",
                    boxShadow: "0 0 12px rgba(242, 124, 124, 0.5)",
                  }}
                />
                <div
                  className="absolute top-1/2 -left-3 -translate-y-1/2 w-6 h-6 rotate-45"
                  style={{
                    backgroundColor: "#F27C7C",
                    boxShadow: "0 0 12px rgba(242, 124, 124, 0.5)",
                  }}
                />
                <div
                  className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 rotate-45"
                  style={{
                    backgroundColor: "#F27C7C",
                    boxShadow: "0 0 12px rgba(242, 124, 124, 0.5)",
                  }}
                />
                {/* Photo container */}
                <div
                  className="w-80 h-80 rounded-full overflow-hidden relative"
                  style={{
                    border: "4px solid #F27C7C",
                    boxShadow:
                      "0 0 40px rgba(242, 124, 124, 0.25), inset 0 0 30px rgba(0,0,0,0.3)",
                  }}
                >
                  <img
                    src="/assets/images/jennifer-bonilla-portrait.jpg"
                    alt="Jennifer Bonilla, Founder and CEO of Entangled Retrievals"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                {/* Signature Image DIRECTLY BELOW the photo */}
                <div
                  className="mt-8 flex justify-center"
                  data-ocid="about.founder.signature_image"
                >
                  <img
                    src="/assets/images/signature.png"
                    alt="Jennifer Bonilla signature"
                    className="object-contain"
                    style={{
                      height: "14rem",
                      maxWidth: "28rem",
                      filter:
                        "brightness(2.2) saturate(1.6) hue-rotate(10deg) drop-shadow(0 2px 16px rgba(31,163,122,0.7))",
                    }}
                    loading="lazy"
                  />
                </div>
                {/* Founder title below signature */}
                <div
                  className="mt-6 text-center max-w-sm mx-auto"
                  data-ocid="about.founder.name"
                >
                  <p
                    className="tracking-wide leading-snug"
                    style={{
                      fontFamily:
                        "'Cinzel Decorative', 'Cormorant Infant', serif",
                      color: "#F27C7C",
                      fontSize: "1.25rem",
                      fontWeight: 600,
                    }}
                  >
                    Founder & CEO
                  </p>
                  <p
                    className="tracking-wider leading-snug mt-1"
                    style={{
                      fontFamily:
                        "'Cinzel Decorative', 'Cormorant Infant', serif",
                      color: "#F27C7C",
                      fontSize: "1.1rem",
                      fontWeight: 500,
                    }}
                  >
                    Entangled Retrievals
                  </p>
                  <p
                    className="tracking-widest leading-snug mt-1"
                    style={{
                      fontFamily:
                        "'Cinzel Decorative', 'Cormorant Infant', serif",
                      color: "#F27C7C",
                      fontSize: "1.2rem",
                      fontWeight: 700,
                    }}
                  >
                    Jennifer Bonilla
                  </p>
                </div>
              </div>
            </div>

            {/* Founder Bio Card */}
            <div
              className="reveal reveal-delay-2 rounded-2xl p-8 md:p-10"
              style={{
                backgroundColor: "rgba(10, 31, 46, 0.70)",
                border: "1px solid #F27C7C",
                boxShadow:
                  "0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
              }}
              data-ocid="about.founder.card"
            >
              <div className="prose prose-lg max-w-none">
                <p className="text-cream/90 leading-relaxed text-lg mb-5">
                  Jennifer Bonilla is the Founder and Owner of Entangled
                  Retrievals. As a proud Latina entrepreneur, small business
                  owner, and member of the LGBTQ+ community, Jennifer built this
                  company from a place of empathy, resilience, and
                  understanding.
                </p>
                <p className="text-cream/90 leading-relaxed text-lg mb-5">
                  Jennifer recognized that countless individuals struggle with
                  the emotional burden of recovering personal belongings after
                  breakups, separations, divorces, roommate disputes, and family
                  conflicts. She saw a need for a service that could bridge the
                  gap between property recovery and emotional well-being.
                </p>
                <p className="text-cream/90 leading-relaxed text-lg mb-5">
                  Driven by a passion for helping others navigate difficult
                  transitions, Jennifer created Entangled Retrievals to offer a
                  respectful and professional alternative to uncomfortable or
                  potentially confrontational situations. Her vision is rooted
                  in creating a service where clients feel supported, respected,
                  and empowered during challenging moments in their lives.
                </p>
                <p className="text-cream/90 leading-relaxed text-lg mb-5">
                  Under Jennifer&apos;s leadership, Entangled Retrievals is
                  committed to professionalism, confidentiality, and
                  compassionate service. Every retrieval represents more than
                  the return of possessions—it represents closure, peace of
                  mind, and the opportunity for a fresh start.
                </p>
                <p className="text-cream/90 leading-relaxed text-lg">
                  At Entangled Retrievals, we believe that moving forward should
                  not require moving backward into conflict. Our goal is simple:
                  help people recover what belongs to them while protecting
                  their dignity and peace every step of the way.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
