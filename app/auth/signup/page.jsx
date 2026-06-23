"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Password validation regex rules
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const isPasswordValid = hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecial;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isPasswordValid) {
      toast.error("Please satisfy all password requirements.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const name = formData.get("name");
      const email = formData.get("email");
      const imageFile = formData.get("image");

      let displayUrl = "";

      if (imageFile && imageFile.size > 0) {
        const imgbbFormData = new FormData();
        imgbbFormData.append("image", imageFile);

        const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

        if (!apiKey) {
          throw new Error("API key is missing! Did you restart your Next.js server?");
        }

        const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
          method: "POST",
          body: imgbbFormData,
        });

        const imgbbData = await response.json();

        if (imgbbData.success) {
          displayUrl = imgbbData.data.url;
        } else {
          console.error("ImgBB Full Error:", imgbbData);
          throw new Error(imgbbData.error?.message || "Image upload failed.");
        }
      }

      const role = "chef";
      const plan = role === "chef" ? "chef_free" : null

      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        role,
        image: displayUrl,
        plan
      });

      if (error) {
        toast.error(error.message || "Signup failed");
        return;
      }

      toast.success("Account created successfully!");
      router.push("/");

    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Premium Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-teal-500/10 dark:bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Glassmorphic Container Card */}
      <div className="relative w-full max-w-xl rounded-3xl border border-slate-200/60 dark:border-slate-800/60 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl p-6 md:p-10 shadow-2xl shadow-slate-200/50 dark:shadow-none">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent mb-2">
            Create Account
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium max-w-xs mx-auto">
            Join our platform to advance your career and find your next milestone.
          </p>
        </div>

        <hr className="border-slate-200 dark:border-slate-800 my-6" />

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Full Name Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Full Name
            </label>
            <input
              required
              type="text"
              name="name"
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 outline-none focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 dark:focus:ring-emerald-400/5 transition-all duration-200"
            />
          </div>

          {/* Email Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Email Address
            </label>
            <input
              required
              type="email"
              name="email"
              placeholder="john@example.com"
              className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 outline-none focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 dark:focus:ring-emerald-400/5 transition-all duration-200"
            />
          </div>

          {/* Password Input Group */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Password
            </label>
            <div className="relative">
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full pl-4 pr-12 py-3 rounded-xl bg-white/50 dark:bg-slate-950/50 border text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 outline-none focus:ring-4 transition-all duration-200 ${
                  password 
                    ? isPasswordValid 
                      ? "border-emerald-500 focus:border-emerald-500 focus:ring-emerald-500/10" 
                      : "border-rose-500 focus:border-rose-500 focus:ring-rose-500/10"
                    : "border-slate-200 dark:border-slate-800 focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-emerald-500/10 dark:focus:ring-emerald-400/5"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 11-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Smart Checklist Indicators */}
            {password && (
              <div className="p-3 bg-slate-100/50 dark:bg-slate-950/40 border border-slate-200/60 dark:border-slate-800/60 rounded-xl space-y-2 transition-all">
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                  Requirements:
                </p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                  <div className={`flex items-center gap-1.5 transition-colors ${hasMinLength ? "text-emerald-600 dark:text-emerald-400 font-medium" : "text-slate-400 dark:text-slate-600"}`}>
                    <span>{hasMinLength ? "✓" : "•"}</span> 8+ Characters
                  </div>
                  <div className={`flex items-center gap-1.5 transition-colors ${hasUppercase ? "text-emerald-600 dark:text-emerald-400 font-medium" : "text-slate-400 dark:text-slate-600"}`}>
                    <span>{hasUppercase ? "✓" : "•"}</span> Uppercase (A)
                  </div>
                  <div className={`flex items-center gap-1.5 transition-colors ${hasLowercase ? "text-emerald-600 dark:text-emerald-400 font-medium" : "text-slate-400 dark:text-slate-600"}`}>
                    <span>{hasLowercase ? "✓" : "•"}</span> Lowercase (a)
                  </div>
                  <div className={`flex items-center gap-1.5 transition-colors ${hasNumber ? "text-emerald-600 dark:text-emerald-400 font-medium" : "text-slate-400 dark:text-slate-600"}`}>
                    <span>{hasNumber ? "✓" : "•"}</span> Number (0-9)
                  </div>
                  <div className={`flex items-center gap-1.5 transition-colors ${hasSpecial ? "text-emerald-600 dark:text-emerald-400 font-medium" : "text-slate-400 dark:text-slate-600"}`}>
                    <span>{hasSpecial ? "✓" : "•"}</span> Special (#@$)
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile Picture Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Profile Picture
            </label>
            <div className="relative flex items-center justify-center w-full border border-dashed border-slate-300 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-400 rounded-xl p-2 bg-white/30 dark:bg-slate-950/20 transition-colors group">
              <input
                type="file"
                name="image"
                accept="image/*"
                className="w-full text-xs text-slate-500 dark:text-slate-400 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-50 dark:file:bg-emerald-950/40 file:text-emerald-700 dark:file:text-emerald-400 hover:file:bg-emerald-100 dark:hover:file:bg-emerald-950/60 transition-all"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-95 text-white font-semibold py-3.5 px-4 rounded-xl shadow-xl shadow-emerald-600/10 active:scale-[0.99] transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Creating Account...</span>
              </>
            ) : (
              "Get Started"
            )}
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-slate-500 dark:text-slate-400 text-sm mt-8">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline underline-offset-4 transition-all"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}