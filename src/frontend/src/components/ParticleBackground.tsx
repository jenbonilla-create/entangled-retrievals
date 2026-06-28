import { useMemo } from "react";

interface Particle {
  id: number;
  size: number;
  left: number;
  delay: number;
  duration: number;
  color: string;
  opacity: number;
}

const BRAND_COLORS = [
  "var(--coral)",
  "var(--coral-light)",
  "var(--emerald)",
  "var(--emerald-light)",
  "var(--rose-gold)",
  "var(--silver)",
  "var(--orange)",
  "#3a6ea5",
  "#d4a5a5",
];

export function ParticleBackground() {
  const particles = useMemo<Particle[]>(() => {
    const list: Particle[] = [];
    for (let i = 0; i < 120; i++) {
      list.push({
        id: i,
        size: Math.random() * 4 + 1,
        left: Math.random() * 100,
        delay: Math.random() * 20,
        duration: Math.random() * 15 + 10,
        color: BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)],
        opacity: Math.random() * 0.6 + 0.15,
      });
    }
    return list;
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Neon ambient orbs - solid colors with glow */}
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          width: "400px",
          height: "400px",
          backgroundColor: "rgba(242, 124, 124, 0.12)",
          top: "10%",
          left: "-5%",
          animation: "drift 20s ease-in-out infinite",
          boxShadow:
            "0 0 80px rgba(242, 124, 124, 0.15), 0 0 160px rgba(242, 124, 124, 0.08)",
        }}
      />
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          width: "500px",
          height: "500px",
          backgroundColor: "rgba(31, 163, 122, 0.1)",
          bottom: "5%",
          right: "-10%",
          animation: "drift 25s ease-in-out infinite reverse",
          boxShadow:
            "0 0 80px rgba(31, 163, 122, 0.12), 0 0 160px rgba(31, 163, 122, 0.06)",
        }}
      />
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          width: "300px",
          height: "300px",
          backgroundColor: "rgba(196, 112, 58, 0.1)",
          top: "40%",
          right: "20%",
          animation: "drift 18s ease-in-out infinite",
          boxShadow:
            "0 0 60px rgba(196, 112, 58, 0.12), 0 0 120px rgba(196, 112, 58, 0.06)",
        }}
      />
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle-dot"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            backgroundColor: p.color,
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            boxShadow: `0 0 ${p.size * 4}px ${p.color}, 0 0 ${p.size * 8}px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
}
