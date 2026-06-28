import { Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!agreeTerms) {
      setError("You must agree to the terms");
      return;
    }
    const success = await register({
      firstName,
      lastName,
      email,
      phone,
      password,
    });
    if (success) {
      navigate({ to: "/dashboard" });
    } else {
      setError("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card-premium w-full max-w-lg p-10 rounded-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-cream mb-2 font-hero tracking-[0.08em]">
            Create Account
          </h1>
          <p className="text-silver">Get started with Entangled Retrievals</p>
        </div>

        {error && (
          <div className="bg-coral/10 border border-coral/30 text-coral px-4 py-3 rounded-xl mb-6 text-center text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-cream text-sm font-medium mb-2"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-navy/50 border border-silver/20 text-cream placeholder-silver/50 focus:outline-none focus:border-coral/50 focus:ring-1 focus:ring-coral/30 transition-smooth"
                placeholder="John"
                required
                data-ocid="register.first_name_input"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-cream text-sm font-medium mb-2"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-navy/50 border border-silver/20 text-cream placeholder-silver/50 focus:outline-none focus:border-coral/50 focus:ring-1 focus:ring-coral/30 transition-smooth"
                placeholder="Doe"
                required
                data-ocid="register.last_name_input"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-cream text-sm font-medium mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-navy/50 border border-silver/20 text-cream placeholder-silver/50 focus:outline-none focus:border-coral/50 focus:ring-1 focus:ring-coral/30 transition-smooth"
              placeholder="you@example.com"
              required
              data-ocid="register.email_input"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-cream text-sm font-medium mb-2"
            >
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-navy/50 border border-silver/20 text-cream placeholder-silver/50 focus:outline-none focus:border-coral/50 focus:ring-1 focus:ring-coral/30 transition-smooth"
              placeholder="(562) 323-4021"
              required
              data-ocid="register.phone_input"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="password"
                className="block text-cream text-sm font-medium mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-navy/50 border border-silver/20 text-cream placeholder-silver/50 focus:outline-none focus:border-coral/50 focus:ring-1 focus:ring-coral/30 transition-smooth"
                placeholder="••••••••"
                required
                data-ocid="register.password_input"
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-cream text-sm font-medium mb-2"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-navy/50 border border-silver/20 text-cream placeholder-silver/50 focus:outline-none focus:border-coral/50 focus:ring-1 focus:ring-coral/30 transition-smooth"
                placeholder="••••••••"
                required
                data-ocid="register.confirm_password_input"
              />
            </div>
          </div>
          <label
            htmlFor="agreeTerms"
            className="flex items-center text-silver text-sm cursor-pointer"
          >
            <input
              id="agreeTerms"
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mr-3 w-4 h-4 rounded border-silver/30 bg-navy/50 text-coral focus:ring-coral/30"
              required
              data-ocid="register.terms_checkbox"
            />
            I agree to the{" "}
            <span className="text-coral hover:text-orange-coral ml-1 cursor-pointer transition-colors">
              Terms of Service
            </span>
          </label>
          <button
            type="submit"
            className="w-full bg-coral text-navy font-bold py-3.5 rounded-xl hover:bg-orange-coral transition-smooth shadow-lg"
            data-ocid="register.submit_button"
          >
            Create Account
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-silver/10 text-center">
          <p className="text-silver text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-rose-gold hover:text-coral font-semibold transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
