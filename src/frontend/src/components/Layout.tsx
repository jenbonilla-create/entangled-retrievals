import { useAuth } from "@/contexts/AuthContext";
import { Link, useRouter } from "@tanstack/react-router";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
import { useState } from "react";

function Logo({
  className = "h-12 w-auto object-contain",
}: { className?: string }) {
  return (
    <img
      src="/assets/images/logo.png"
      alt="Entangled Retrievals Logo"
      className={`flex-shrink-0 ${className}`}
      loading="eager"
      style={{ maxHeight: "48px" }}
    />
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.navigate({ to: "/" });
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/services", label: "Services" },
    { to: "/pricing", label: "Pricing" },
    { to: "/about", label: "About" },
    { to: "/terms", label: "Terms" },
    { to: "/booking", label: "Book Now" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card-premium border-b border-rose-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 py-3">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 group"
              data-ocid="nav.home.link"
            >
              <div className="relative">
                <Logo className="h-12 w-auto object-contain" />
                <div className="absolute inset-0 rounded-full bg-emerald/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="font-display text-xl text-cream leading-tight tracking-[0.08em]">
                  Entangled Retrievals
                </span>
                <span className="text-[10px] font-medium text-cream/50 tracking-[0.2em] uppercase font-display">
                  Safe Retrieval Coordination
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="relative px-4 py-2 text-sm font-medium text-cream/70 hover:text-cream rounded-full transition-all duration-300 hover:bg-cream/5 hover:text-glow-rose-gold"
                  data-ocid={`nav.${link.label.toLowerCase().replace(" ", "_")}.link`}
                >
                  {link.label}
                </Link>
              ))}
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="relative px-4 py-2 text-sm font-medium text-cream/70 hover:text-cream rounded-full transition-all duration-300 hover:bg-cream/5"
                    data-ocid="nav.dashboard.link"
                  >
                    Dashboard
                  </Link>
                  <div className="w-px h-6 bg-cream/10 mx-2" />
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-medium text-coral hover:text-coral-light rounded-full transition-all duration-300 hover:bg-coral/10"
                    data-ocid="nav.logout.button"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <div className="w-px h-6 bg-cream/10 mx-2" />
                  <Link
                    to="/login"
                    className="px-5 py-2.5 text-sm font-semibold rounded-full bg-orange text-white shadow-subtle hover:shadow-glow-coral hover:scale-[1.02] transition-all duration-300"
                    data-ocid="nav.login.link"
                  >
                    Login
                  </Link>
                </>
              )}
            </nav>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden p-2.5 rounded-full text-cream hover:bg-cream/10 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              data-ocid="nav.mobile_menu.button"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden glass-card-premium border-t border-white/10">
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block px-4 py-3 text-sm font-medium text-cream/70 hover:text-cream rounded-xl hover:bg-cream/5 transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-3 text-sm font-medium text-cream/70 hover:text-cream rounded-xl hover:bg-cream/5 transition-all"
                    onClick={() => setMobileOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      handleLogout();
                      setMobileOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 text-sm font-medium text-coral hover:text-coral-light rounded-xl hover:bg-coral/10 transition-all"
                  >
                    Logout ({user?.firstName})
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="block px-4 py-3 text-sm font-semibold text-center rounded-xl bg-emerald text-white mt-2"
                  onClick={() => setMobileOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-navy-darker border-t border-rose-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Logo className="h-10 w-auto object-contain" />
              <div className="flex flex-col">
                <span className="font-display text-xl text-cream leading-tight">
                  Entangled Retrievals
                </span>
                <span className="text-[10px] text-cream/40 tracking-[0.2em] uppercase font-display">
                  Professional Retrieval Coordination
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="tel:562-323-4021"
                className="flex items-center gap-2 text-sm text-cream/70 hover:text-cream px-4 py-2.5 rounded-full border border-white/10 hover:border-white/20 transition-all duration-300"
                data-ocid="footer.phone.link"
              >
                <Phone size={16} className="text-emerald-light" />
                562-323-4021
              </a>
              <button
                type="button"
                className="flex items-center gap-2 text-sm px-5 py-2.5 rounded-full bg-orange text-white shadow-subtle hover:shadow-glow-coral hover:scale-[1.02] transition-all duration-300"
                data-ocid="footer.chat.button"
              >
                <MessageCircle size={16} />
                Chat
              </button>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-xs text-cream/40">
              <Link
                to="/services"
                className="hover:text-cream/70 transition-colors"
              >
                Services
              </Link>
              <Link
                to="/pricing"
                className="hover:text-cream/70 transition-colors"
              >
                Pricing
              </Link>
              <Link
                to="/terms"
                className="hover:text-cream/70 transition-colors"
              >
                Terms &amp; Conditions
              </Link>
              <Link
                to="/privacy"
                className="hover:text-cream/70 transition-colors"
                data-ocid="footer.privacy.link"
              >
                Privacy Policy
              </Link>
              <Link
                to="/booking"
                className="hover:text-cream/70 transition-colors"
              >
                Book Now
              </Link>
            </div>
            <div className="text-xs text-cream/30">
              &copy; {new Date().getFullYear()} Entangled Retrievals. Built with{" "}
              <a
                href="https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=entangled-retrievals"
                className="text-emerald-light hover:text-emerald transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                caffeine.ai
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
