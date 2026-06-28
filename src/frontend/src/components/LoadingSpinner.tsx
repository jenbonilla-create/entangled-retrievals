import { useEffect, useState } from "react";

interface LoadingSpinnerProps {
  size?: number;
  text?: string;
  fullScreen?: boolean;
}

export function LoadingSpinner({
  size = 80,
  text = "Loading...",
  fullScreen = false,
}: LoadingSpinnerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const content = (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="spinner-logo" style={{ width: size, height: size }}>
        <div className="spinner-logo-glow" />
        <div className="spinner-logo-ring" />
        <div className="spinner-logo-inner" />

        {/* Logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="/assets/images/logo.png"
            alt="Entangled Retrievals"
            className="w-[50%] h-[50%] object-contain animate-pulse-soft"
            style={{
              filter: "drop-shadow(0 0 10px rgba(196, 112, 58, 0.5))",
            }}
          />
        </div>
      </div>

      {text && (
        <p className="text-sm font-medium text-cream/60 tracking-wide animate-pulse-soft font-display uppercase">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div
        className={`fixed inset-0 z-[100] flex items-center justify-center bg-navy-deep/90 backdrop-blur-sm transition-opacity duration-500 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
      >
        {content}
      </div>
    );
  }

  return content;
}
