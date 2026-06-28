import { Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const success = await login(email, password);
    if (success) {
      navigate({ to: "/dashboard" });
    } else {
      setError("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card-premium w-full max-w-md p-10 rounded-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <h1 className="font-hero text-3xl font-bold text-cream mb-2 tracking-[0.08em]">
            Welcome Back
          </h1>
          <p className="text-silver">Sign in to access your dashboard</p>
        </div>

        {error && (
          <div className="bg-coral/10 border border-coral/30 text-coral px-4 py-3 rounded-xl mb-6 text-center text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
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
              data-ocid="login.email_input"
            />
          </div>
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
              data-ocid="login.password_input"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center text-silver text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2 w-4 h-4 rounded border-silver/30 bg-navy/50 text-coral focus:ring-coral/30"
              />
              Remember me
            </label>
            <span className="text-coral hover:text-orange-coral text-sm cursor-pointer transition-colors">
              Forgot Password?
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-coral text-navy font-bold py-3.5 rounded-xl hover:bg-orange-coral transition-smooth shadow-lg"
            data-ocid="login.submit_button"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-silver/10 text-center">
          <p className="text-silver text-sm">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-rose-gold hover:text-coral font-semibold transition-colors"
            >
              Create Account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
