import { Link } from "@tanstack/react-router";

import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  const upcoming = {
    date: "June 20, 2026",
    time: "10:00 AM",
    location: "123 Main St, Los Angeles, CA",
    status: "Coordinator Assigned",
  };

  const active = {
    status: "In Transit",
    coordinator: "Alex M.",
    eta: "15 min",
  };

  const notifications = [
    {
      id: 1,
      text: "Coordinator assigned to your retrieval",
      time: "2 min ago",
    },
    { id: 2, text: "Payment received", time: "1 hour ago" },
    { id: 3, text: "Booking confirmed", time: "3 hours ago" },
  ];

  const documents = [
    { id: 1, name: "Photo Inventory", type: "Photos" },
    { id: 2, name: "Retrieval Agreement", type: "PDF" },
  ];

  return (
    <div className="min-h-screen bg-transparent py-8 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-hero text-3xl font-bold text-cream mb-8 tracking-[0.08em]">
          Welcome, {user?.firstName || "Customer"}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Upcoming Retrieval */}
          <div className="glass-card-premium glass-card-hover p-6">
            <h2 className="font-display text-xl font-semibold text-cream mb-4 tracking-[0.08em]">
              Upcoming Retrieval
            </h2>
            <div className="space-y-2 text-silver">
              <p>
                <span className="text-cream font-medium">Date:</span>{" "}
                {upcoming.date}
              </p>
              <p>
                <span className="text-cream font-medium">Time:</span>{" "}
                {upcoming.time}
              </p>
              <p>
                <span className="text-cream font-medium">Location:</span>{" "}
                {upcoming.location}
              </p>
              <p>
                <span className="text-cream font-medium">Status:</span>{" "}
                <span className="text-emerald">{upcoming.status}</span>
              </p>
            </div>
          </div>

          {/* Active Retrieval */}
          <div className="glass-card-premium glass-card-hover p-6">
            <h2 className="font-display text-xl font-semibold text-cream mb-4 tracking-[0.08em]">
              Active Retrieval
            </h2>
            <div className="space-y-2 text-silver">
              <p>
                <span className="text-cream font-medium">Status:</span>{" "}
                <span className="text-emerald">{active.status}</span>
              </p>
              <p>
                <span className="text-cream font-medium">Coordinator:</span>{" "}
                {active.coordinator}
              </p>
              <p>
                <span className="text-cream font-medium">ETA:</span>{" "}
                {active.eta}
              </p>
            </div>
            <Link
              to="/tracking/$bookingId"
              params={{ bookingId: "demo" }}
              className="inline-block mt-4 bg-coral text-navy font-bold px-4 py-2 rounded hover:bg-orange-coral transition"
            >
              Track Live
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Notifications */}
          <div className="glass-card-premium glass-card-hover p-6">
            <h2 className="font-display text-xl font-semibold text-cream mb-4 tracking-[0.08em]">
              Notifications
            </h2>
            <div className="space-y-3">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className="flex justify-between items-center border-b border-silver/20 pb-2"
                >
                  <p className="text-silver">{n.text}</p>
                  <span className="text-silver/60 text-sm">{n.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Documents */}
          <div className="glass-card-premium glass-card-hover p-6">
            <h2 className="font-display text-xl font-semibold text-cream mb-4 tracking-[0.08em]">
              Documents
            </h2>
            <div className="space-y-3">
              {documents.map((d) => (
                <div
                  key={d.id}
                  className="flex justify-between items-center border-b border-silver/20 pb-2"
                >
                  <p className="text-silver">{d.name}</p>
                  <span className="text-coral text-sm">{d.type}</span>
                </div>
              ))}
            </div>
            <Link
              to="/documents"
              className="text-coral hover:text-orange-coral text-sm mt-4 inline-block"
            >
              View All →
            </Link>
          </div>
        </div>

        {/* Emergency Support */}
        <div className="glass-card-premium p-6 border-rose-gold shadow-rose-glow">
          <h2 className="font-display text-xl font-semibold text-cream mb-2 tracking-[0.08em]">
            Emergency Support
          </h2>
          <p className="text-silver mb-4">
            Need immediate assistance? Our team is available 24/7.
          </p>
          <a
            href="tel:5623234021"
            className="inline-block bg-coral text-navy font-bold px-6 py-3 rounded-lg hover:bg-orange-coral transition"
          >
            Call 562-323-4021
          </a>
        </div>
      </div>
    </div>
  );
}
