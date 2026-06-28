import { motion } from "motion/react";

export default function TermsPage() {
  const sections = [
    {
      title: "1. Agreement to Terms",
      content:
        "By accessing or using Entangled Retrievals LLC services, you agree to be bound by these Terms and Conditions. If you do not agree to all terms, you may not use our services. These terms apply to all clients, customers, and users of our retrieval coordination platform.",
    },
    {
      title: "2. Service Description",
      content:
        "Entangled Retrievals provides professional third-party coordination services to assist individuals in recovering personal belongings during life transitions, including breakups, separations, roommate disputes, family conflicts, and other personal property recovery situations. We do not physically transport items; we coordinate the safe, neutral exchange of personal property between parties.",
    },
    {
      title: "3. Client Responsibilities",
      content:
        "Clients must provide accurate and truthful information during booking, including correct addresses, contact details, and inventory descriptions. Clients are responsible for ensuring they have legal right to retrieve the items listed. Both parties must agree to the terms and sign all required documentation before any retrieval is conducted.",
    },
    {
      title: "4. Prohibited Items",
      content:
        "For safety and legal reasons, we do not coordinate the retrieval of firearms, ammunition, illegal substances, hazardous chemicals, explosives, stolen property, unauthorized belongings, or biohazard materials. If prohibited items are discovered during a retrieval, the service may be immediately halted and authorities may be notified.",
    },
    {
      title: "5. Liability Disclaimer",
      content: `Entangled Retrievals is not liable or responsible for any previous damages to belongings or existing conditions at pickup or delivery locations. We are a coordination service, not a moving or storage company. Clients acknowledge that property is retrieved "as-is" and we make no warranties regarding the condition of items retrieved.`,
    },
    {
      title: "6. Presence During Retrieval",
      content:
        "Both parties may not be present when a retrieval is in progress. This policy exists to minimize conflict and ensure a neutral, safe environment. Our coordinators operate as neutral third parties and will follow the agreed-upon inventory list and instructions provided by the client.",
    },
    {
      title: "7. Payment & Fees",
      content:
        "Payment is due at the time of booking. We offer One Way Retrieval ($149) and Two Way Retrieval ($238, base + 60%). Urgent Retrieval after 10:00 PM is $79. Additional stops beyond the included 2 free stops are $40 each. After-hours coordination fee is $75. Stair fees are $15 per flight (furniture only). All fees are non-refundable once service has commenced.",
    },
    {
      title: "8. Cancellation Policy",
      content:
        "Cancellations made more than 24 hours before the scheduled retrieval are eligible for a full refund. Cancellations within 24 hours may be subject to a cancellation fee. No-shows or refusal to sign required documentation at the time of service will result in forfeiture of all fees paid.",
    },
    {
      title: "9. Privacy & Confidentiality",
      content:
        "We respect your privacy. All client information, addresses, and case details are kept strictly confidential. We do not share personal information with third parties except as required by law or to complete the coordination service. Photos and documentation taken during retrievals are stored securely and used only for verification purposes.",
    },
    {
      title: "10. Dispute Resolution",
      content:
        "In the event of a dispute, both parties agree to first attempt resolution through mediation. If mediation fails, disputes shall be resolved through binding arbitration in accordance with the laws of the State of California. Clients agree to waive any right to a jury trial or class action.",
    },
    {
      title: "11. Modifications to Terms",
      content:
        "Entangled Retrievals reserves the right to modify these terms at any time. Changes will be effective immediately upon posting to our website. Continued use of our services after changes constitutes acceptance of the revised terms. Clients are encouraged to review these terms periodically.",
    },
    {
      title: "12. Contact Information",
      content:
        "For questions about these terms, please contact us at 562-323-4021 or through our website chat. Entangled Retrievals LLC is committed to providing professional, compassionate service while protecting your dignity and peace of mind.",
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
          <h1 className="font-hero text-5xl md:text-6xl font-bold text-coral tracking-[0.12em] mb-4">
            Terms &amp; Conditions
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-24 h-0.5 bg-coral mx-auto rounded-full"
          />
          <p className="text-silver text-lg max-w-2xl mx-auto mt-6">
            Please read these terms carefully before using our services. By
            booking with Entangled Retrievals, you agree to the following
            conditions.
          </p>
        </motion.div>

        {/* Terms Sections */}
        <div className="space-y-6">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="glass-card-premium glass-card-hover rounded-2xl p-6 md:p-8"
              data-ocid={`terms.section.${i + 1}`}
            >
              <h2 className="font-display text-xl font-bold text-cream mb-4 tracking-wide">
                {section.title}
              </h2>
              <p className="text-silver leading-relaxed">{section.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Agreement Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 glass-card-premium rounded-2xl p-8 border border-coral/20"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-coral/20 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-coral text-lg">!</span>
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-cream mb-2">
                Important Notice
              </h3>
              <p className="text-silver leading-relaxed">
                Both parties must agree and sign the terms and conditions before
                any retrieval is conducted. We are not liable or responsible for
                any previous damages to the belongings or existing conditions at
                the retrieval location. Both parties may not be present when a
                retrieval is in progress. Please note these policies before
                booking.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Last Updated */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-silver/50 text-sm">
            Last updated: {new Date().getFullYear()} — Entangled Retrievals LLC
          </p>
        </motion.div>
      </div>
    </div>
  );
}
