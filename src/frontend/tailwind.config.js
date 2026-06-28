import typography from "@tailwindcss/typography";
import containerQueries from "@tailwindcss/container-queries";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["index.html", "src/**/*.{js,ts,jsx,tsx,html,css}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring) / <alpha-value>)",
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        primary: {
          DEFAULT: "oklch(var(--primary) / <alpha-value>)",
          foreground: "oklch(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary) / <alpha-value>)",
          foreground: "oklch(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive) / <alpha-value>)",
          foreground: "oklch(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "oklch(var(--muted) / <alpha-value>)",
          foreground: "oklch(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent) / <alpha-value>)",
          foreground: "oklch(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "oklch(var(--popover))",
          foreground: "oklch(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "oklch(var(--card))",
          foreground: "oklch(var(--card-foreground))",
        },
        chart: {
          1: "oklch(var(--chart-1))",
          2: "oklch(var(--chart-2))",
          3: "oklch(var(--chart-3))",
          4: "oklch(var(--chart-4))",
          5: "oklch(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "oklch(var(--sidebar))",
          foreground: "oklch(var(--sidebar-foreground))",
          primary: "oklch(var(--sidebar-primary))",
          "primary-foreground": "oklch(var(--sidebar-primary-foreground))",
          accent: "oklch(var(--sidebar-accent))",
          "accent-foreground": "oklch(var(--sidebar-accent-foreground))",
          border: "oklch(var(--sidebar-border))",
          ring: "oklch(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        hero: ["Cinzel Decorative", "Cormorant Infant", "serif"],
        display: ["Cinzel Decorative", "Cormorant Infant", "serif"],
        fairytale: ["Cinzel Decorative", "Cormorant Infant", "serif"],
        storybook: ["Cormorant Infant", "Cinzel Decorative", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(0,0,0,0.3)",
        glass: "0 8px 32px rgba(0,0,0,0.4)",
        elevated: "0 8px 40px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)",
        glow: "0 0 40px rgba(31, 163, 122, 0.25), 0 0 80px rgba(229, 138, 58, 0.2), 0 0 120px rgba(196, 112, 58, 0.1)",
        "glow-emerald": "0 0 30px rgba(31, 163, 122, 0.25)",
        "glow-coral": "0 0 30px rgba(242, 124, 124, 0.25)",
        "glow-rose": "0 0 40px rgba(183, 110, 121, 0.2), 0 0 80px rgba(183, 110, 121, 0.1)",
        subtle: "0 2px 12px rgba(0, 0, 0, 0.2)",
      },
      colors: {
        navy: {
          DEFAULT: "#0D2B3E",
          light: "#0f2d42",
          lighter: "#1a3a5c",
          dark: "#070f1c",
          brand: "#0D2B3E",
        },
        emerald: {
          DEFAULT: "#1fa37a",
          light: "#2bc48e",
          dark: "#188a65",
        },
        coral: {
          DEFAULT: "#f27c7c",
          light: "#f5a0a0",
          dark: "#e05a5a",
        },
        orange: {
          DEFAULT: "#e58a3a",
          light: "#f0a55c",
          dark: "#d4762a",
        },
        silver: {
          DEFAULT: "#c4c9d1",
          light: "#d8dbe0",
          dark: "#a8adb5",
        },
        cream: {
          DEFAULT: "#f7f8f5",
          warm: "#faf9f6",
          dark: "#e8e9e5",
        },
        "rose-gold": {
          DEFAULT: "#C4703A",
          light: "#d48a5a",
          dark: "#9a5a3a",
          copper: "#C4703A",
        },
        "brand-navy": "#0D2B3E",
        "brand-copper": "#C4703A",
        "brand-coral": "#F27C7C",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-15px) rotate(2deg)" },
          "66%": { transform: "translateY(-8px) rotate(-1deg)" },
        },
        gradientShift: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.02)" },
        },
        particleFloat: {
          "0%": { transform: "translateY(100vh) translateX(0) scale(0)", opacity: "0" },
          "10%": { opacity: "0.6" },
          "90%": { opacity: "0.6" },
          "100%": { transform: "translateY(-10vh) translateX(50px) scale(1)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        gradientShift: "gradientShift 15s ease infinite",
        fadeInUp: "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        pulseSoft: "pulseSoft 3s ease-in-out infinite",
        particleFloat: "particleFloat 12s linear infinite",
        shimmer: "shimmer 2s linear infinite",
      },
    },
  },
  plugins: [typography, containerQueries, animate],
};
