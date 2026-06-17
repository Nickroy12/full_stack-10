"use client";

import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData(e.currentTarget);

      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");
      // Automatically assigns "seeker" on submission
      const role = "chef";

      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        role,
      });
      console.log(data, "error");
      if (error) {
        toast.error(error.message || "Signup failed");
        return;
      }

      toast.apply("Account created successfully!");
      router.push("/");
      
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 text-slate-800 overflow-hidden">
      {/* Decorative background green ambient glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-200/40 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-teal-200/30 rounded-full blur-[140px] pointer-events-none" />

      {/* Glassmorphic Container */}
      <div className="relative w-full max-w-xl rounded-3xl border border-emerald-100 bg-white/20 backdrop-blur-3xl p-8 md:p-10 shadow-2xl shadow-emerald-900/5">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold tracking-tight text-foreground mb-3">
            Create Account
          </h2>
          <p className="text-foreground text-sm font-medium">
            Join our platform to advance your career and find your next milestone.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form Fields Container */}
          <div className="space-y-5">
            {/* Name */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-foreground">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl bg-white border border-emerald-100 text-slate-900 placeholder-emerald-700/30 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-foreground">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="john@example.com"
                className="w-full px-4 py-3 rounded-xl bg-white border border-emerald-100 text-slate-900 placeholder-emerald-700/30 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-foreground">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-white border border-emerald-100 text-slate-900 placeholder-emerald-700/30 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold tracking-wide shadow-xl shadow-emerald-600/20 active:scale-[0.99] transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Creating Account...
              </span>
            ) : (
              "Get Started"
            )}
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-foreground text-sm mt-8">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-emerald-600 font-semibold hover:text-emerald-500 underline underline-offset-4 decoration-emerald-600/30 hover:decoration-emerald-500 transition-colors"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}