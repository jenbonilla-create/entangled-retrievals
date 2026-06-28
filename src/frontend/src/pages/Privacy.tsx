import { Globe, Mail, Phone, Shield } from "lucide-react";
import { motion } from "motion/react";

export default function PrivacyPage() {
  const sections = [
    {
      id: 1,
      title: "1. Introduction",
      content:
        'This Privacy Policy outlines the practices of Entangled Retrievals, LLC ("Company," "we," "us," or "our") regarding the collection, use, and disclosure of information that we receive from customers ("you," "your," or "users") in connection with our services. By using our services, you agree to the terms of this Privacy Policy.',
    },
    {
      id: 2,
      title: "2. Scope of Services",
      content:
        "Entangled Retrievals, LLC is not a moving company, logistics provider, legal advisor, or mediator of disputes. Our primary function is to assist customers in retrieving personal items as specified in service requests.",
    },
    {
      id: 3,
      title: "3. Information We Collect",
      subsections: [
        {
          title: "3.1 Personal Information",
          content:
            "To provide our services, we require customers to provide accurate and complete information regarding their retrieval requests. This includes, but is not limited to:",
          bullets: ["Item descriptions", "Locations", "Contact details"],
        },
        {
          title: "3.2 Identity Verification",
          content:
            "For documentation, safety, and the prevention of fraud, customers are required to provide valid government-issued identification (e.g., Driver's License, State ID, Passport) prior to the commencement of services. This ensures that the individual requesting the retrieval is the rightful owner or authorized party and is not misrepresenting their identity.",
        },
        {
          title: "3.3 Login Credentials",
          content:
            "Customers are responsible for maintaining the confidentiality of their login credentials. You agree to notify us immediately of any unauthorized use of your account or any other breach of security.",
        },
      ],
    },
    {
      id: 4,
      title: "4. Use of Information",
      content:
        "We may use the information we collect for the following purposes:",
      bullets: [
        "To process and fulfill your service requests",
        "To communicate with you regarding your requests",
        "To verify your identity and prevent fraud",
        "To improve our services and customer experience",
        "To comply with legal obligations",
      ],
    },
    {
      id: 5,
      title: "5. Fees and Payment",
      content:
        "All fees associated with our services are non-refundable unless otherwise stated. Customers are responsible for any additional labor required due to undisclosed conditions, such as flights of stairs or difficult access points.",
    },
    {
      id: 6,
      title: "6. Change of Destination",
      content:
        "Requests to deliver retrieved items to a location other than the one originally specified in the service request must be communicated to us in advance. We reserve the right to adjust fees based on the new delivery location.",
    },
    {
      id: 7,
      title: "7. Documentation and Safety",
      content:
        "For safety and documentation purposes, photos will be taken of items inside each bag or personal belongings being retrieved. These photos will be stored securely and used solely for the purpose of fulfilling your service request.",
    },
    {
      id: 8,
      title: "8. Confidentiality and Disclosure",
      content:
        "The Company will not mediate disputes or disclose sensitive information to unauthorized third parties. We are committed to protecting your privacy and ensuring that your information is handled in accordance with applicable laws.",
    },
    {
      id: 9,
      title: "9. Governing Law",
      content:
        "This Agreement shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law principles. Any disputes arising from this Agreement shall be resolved in the courts located in Los Angeles, California.",
    },
    {
      id: 10,
      title: "10. Changes to This Privacy Policy",
      content:
        "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on our website. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.",
    },
  ];

  return (
    <div className="min-h-screen py-16 px-4 bg-transparent relative">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-coral/20 flex items-center justify-center">
              <Shield size={20} className="text-coral" />
            </div>
          </div>
          <h1 className="font-hero text-5xl md:text-6xl font-bold text-coral tracking-[0.12em] mb-4">
            Privacy Policy
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-24 h-0.5 bg-coral mx-auto rounded-full"
          />
          <p className="text-silver text-lg max-w-2xl mx-auto mt-6">
            Your privacy matters to us. This policy explains how Entangled
            Retrievals collects, uses, and protects your personal information.
          </p>
          <p className="text-silver/50 text-sm mt-3">Effective Date: 2026</p>
        </motion.div>

        {/* Policy Sections */}
        <div className="space-y-6">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="glass-card-premium glass-card-hover rounded-2xl p-6 md:p-8"
              data-ocid={`privacy.section.${i + 1}`}
            >
              <h2 className="font-display text-xl font-bold text-cream mb-4 tracking-wide">
                {section.title}
              </h2>

              {/* Sections with subsections (section 3) */}
              {section.subsections ? (
                <div className="space-y-6">
                  {section.subsections.map((sub) => (
                    <div
                      key={sub.title}
                      className="pl-4 border-l-2 border-coral/30"
                    >
                      <h3 className="font-display text-base font-semibold text-coral/90 mb-2 tracking-wide">
                        {sub.title}
                      </h3>
                      <p className="text-silver leading-relaxed">
                        {sub.content}
                      </p>
                      {sub.bullets && (
                        <ul className="mt-3 space-y-1.5">
                          {sub.bullets.map((b) => (
                            <li
                              key={b}
                              className="flex items-center gap-2 text-silver/80"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-coral/60 flex-shrink-0" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <p className="text-silver leading-relaxed">
                    {section.content}
                  </p>
                  {section.bullets && (
                    <ul className="mt-4 space-y-2">
                      {section.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-center gap-2 text-silver/80"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-coral/60 flex-shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </motion.div>
          ))}
        </div>

        {/* Contact Us — Section 11 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="glass-card-premium glass-card-hover rounded-2xl p-6 md:p-8 mt-6"
          data-ocid="privacy.section.11"
        >
          <h2 className="font-display text-xl font-bold text-cream mb-4 tracking-wide">
            11. Contact Us
          </h2>
          <p className="text-silver leading-relaxed mb-6">
            If you have any questions about this Privacy Policy, please contact
            us at:
          </p>
          <div className="space-y-3">
            <a
              href="tel:5623234021"
              className="flex items-center gap-3 text-silver hover:text-cream transition-colors duration-200 group"
              data-ocid="privacy.contact.phone"
            >
              <div className="w-8 h-8 rounded-full bg-coral/15 flex items-center justify-center group-hover:bg-coral/25 transition-colors">
                <Phone size={15} className="text-coral" />
              </div>
              <span>(562) 323-4021</span>
            </a>
            <a
              href="mailto:jenbonilla@entangledretrievals.com"
              className="flex items-center gap-3 text-silver hover:text-cream transition-colors duration-200 group"
              data-ocid="privacy.contact.email"
            >
              <div className="w-8 h-8 rounded-full bg-coral/15 flex items-center justify-center group-hover:bg-coral/25 transition-colors">
                <Mail size={15} className="text-coral" />
              </div>
              <span>jenbonilla@entangledretrievals.com</span>
            </a>
            <a
              href="https://EntangledRetrievals.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-silver hover:text-cream transition-colors duration-200 group"
              data-ocid="privacy.contact.website"
            >
              <div className="w-8 h-8 rounded-full bg-coral/15 flex items-center justify-center group-hover:bg-coral/25 transition-colors">
                <Globe size={15} className="text-coral" />
              </div>
              <span>EntangledRetrievals.com</span>
            </a>
          </div>
        </motion.div>

        {/* Acknowledgement Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 glass-card-premium rounded-2xl p-8 border border-coral/20"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-coral/20 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-coral text-lg">!</span>
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-cream mb-2">
                Acknowledgement
              </h3>
              <p className="text-silver leading-relaxed">
                By using our services, you acknowledge that you have read,
                understood, and agree to be bound by this Privacy Policy.
                Entangled Retrievals LLC is committed to protecting your privacy
                and handling your information with the utmost care and
                confidentiality.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Effective Date */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-silver/50 text-sm">
            Effective Date: 2026 — Entangled Retrievals LLC
          </p>
        </motion.div>
      </div>
    </div>
  );
}
