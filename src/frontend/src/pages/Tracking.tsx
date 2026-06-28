import { createActorSafe } from "@/lib/createActorSafe";
import { useParams } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

export default function Tracking() {
  const { bookingId } = useParams({ from: "/tracking/$bookingId" });
  const [statusIndex] = useState(2);
  const [dotPosition, setDotPosition] = useState({ x: 30, y: 50 });
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Coordinator",
      text: "On my way to the pickup location.",
      time: "9:45 AM",
    },
    { id: 2, sender: "You", text: "Great, thank you!", time: "9:46 AM" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  // Create actor safely — never crash
  const actor = useMemo(() => {
    try {
      return createActorSafe();
    } catch {
      return null;
    }
  }, []);

  const statuses = [
    "Request Received",
    "Coordinator Assigned",
    "Traveling",
    "Arrived",
    "Retrieval In Progress",
    "Documentation Complete",
    "Finished",
  ];

  // Live GPS polling from backend every 15 seconds
  useEffect(() => {
    if (!actor || !bookingId) return;

    const fetchLocation = async () => {
      try {
        const id = BigInt(bookingId);
        const result = await actor.getCoordinatorLocation(id);
        if (result.__kind__ === "ok") {
          const { location } = result.ok;
          // Map lat/lng to percentage positions on the static map
          const x = Math.min(90, Math.max(10, 50 + location.lng * 2));
          const y = Math.min(80, Math.max(20, 50 - location.lat * 2));
          setDotPosition({ x, y });
        }
      } catch {
        // Fallback: keep current position
      }
    };

    fetchLocation();
    const interval = setInterval(fetchLocation, 15000);
    return () => clearInterval(interval);
  }, [actor, bookingId]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: "You",
          text: newMessage,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-transparent relative">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-hero text-3xl font-bold text-cream mb-2 tracking-[0.08em]">
          Live Retrieval Tracking
        </h1>
        <p className="text-silver mb-8">
          Real-time GPS tracking and status updates
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Map */}
          <div className="glass-card-premium glass-card-hover p-5 rounded-xl">
            <h2 className="font-display text-lg font-semibold text-cream mb-4 tracking-[0.08em]">
              Coordinator Location
            </h2>
            <div className="relative w-full h-64 bg-navy-deep rounded-xl overflow-hidden border border-rose-gold/20">
              {/* Static map background grid */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundColor: "#0D2B3E",
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23c4c9d1' stroke-width='0.5' opacity='0.3'%3E%3Cpath d='M0 0h40v40H0z'/%3E%3C/g%3E%3C/svg%3E\")",
                  backgroundSize: "40px 40px",
                }}
              />
              {/* Pickup marker */}
              <div
                className="absolute left-[20%] top-[60%] w-4 h-4 bg-coral rounded-full border-2 border-cream shadow-coral-glow"
                title="Pickup"
              />
              {/* Delivery marker */}
              <div
                className="absolute left-[80%] top-[30%] w-4 h-4 bg-emerald rounded-full border-2 border-cream shadow-emerald-glow"
                title="Delivery"
              />
              {/* Moving GPS dot */}
              <div
                className="absolute w-6 h-6 bg-coral rounded-full border-2 border-cream shadow-coral-glow transition-all duration-1000 ease-in-out"
                style={{
                  left: `${dotPosition.x}%`,
                  top: `${dotPosition.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="absolute -inset-2 bg-coral/40 rounded-full animate-ping" />
              </div>
            </div>
            <div className="flex justify-between mt-4 text-silver text-sm">
              <span className="text-emerald font-medium">ETA: 12 min</span>
              <span className="text-coral">Coordinator: Alex M.</span>
            </div>
          </div>

          {/* Status Timeline */}
          <div className="glass-card-premium glass-card-hover p-5 rounded-xl">
            <h2 className="font-display text-lg font-semibold text-cream mb-4 tracking-[0.08em]">
              Status Timeline
            </h2>
            <div className="space-y-3">
              {statuses.map((status, i) => (
                <div key={status} className="flex items-center">
                  <div
                    className={`w-3 h-3 rounded-full mr-3 ${
                      i < statusIndex
                        ? "bg-emerald shadow-emerald-glow"
                        : i === statusIndex
                          ? "bg-coral shadow-coral-glow animate-pulse"
                          : "bg-silver/20"
                    }`}
                  />
                  <span
                    className={`${i <= statusIndex ? "text-cream font-medium" : "text-silver/50"}`}
                  >
                    {status}
                  </span>
                </div>
              ))}
            </div>
            <a
              href="tel:5623234021"
              className="block mt-6 bg-coral text-navy font-bold text-center py-3 rounded-lg hover:bg-coral-light transition-smooth shadow-coral-glow"
            >
              Emergency Contact
            </a>
          </div>
        </div>

        {/* Messaging */}
        <div className="glass-card-premium glass-card-hover p-5 mt-6 rounded-xl">
          <h2 className="font-display text-lg font-semibold text-cream mb-4 tracking-[0.08em]">
            Messages
          </h2>
          <div className="space-y-3 max-h-64 overflow-y-auto mb-4 pr-2">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`p-3 rounded-xl ${m.sender === "You" ? "bg-coral/15 ml-auto max-w-[80%] border border-coral/20" : "bg-navy/50 max-w-[80%] border border-silver/10"}`}
              >
                <p className="text-xs text-rose-gold mb-1 font-medium">
                  {m.sender} &bull; {m.time}
                </p>
                <p className="text-cream">{m.text}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 rounded-lg bg-navy/50 border border-silver/20 text-cream focus:outline-none focus:border-coral/50 transition-smooth"
            />
            <button
              type="button"
              onClick={sendMessage}
              className="bg-emerald text-navy font-bold px-6 py-2 rounded-lg hover:bg-emerald-light transition-smooth shadow-emerald-glow"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
