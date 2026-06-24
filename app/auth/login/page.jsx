'use client';

import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);

  // ইমেইল/পাসওয়ার্ড দিয়ে লগইন
  const dataSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const { email, password } = Object.fromEntries(formData);

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: '/'
      });

      if (error) {
        toast.error(error.message || 'Login failed');
        return;
      }

      toast.success('Login successful!');
      console.log(data, "login");
    } catch (err) {
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  // গুগল দিয়ে লগইন করার ফাংশন
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/'
      });
    } catch (err) {
      toast.error('Google login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute w-[400px] h-[400px] bg-green-600 blur-[120px] opacity-30 rounded-full top-10 left-10"></div>
      <div className="absolute w-[300px] h-[300px] bg-green-600 blur-[120px] opacity-20 rounded-full bottom-10 right-10"></div>

      {/* Glass Card */}
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl z-10">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={dataSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-sm block mb-2">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/20 outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm block mb-2">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              required
              className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/20 outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-green-300 to-green-600 hover:opacity-90 transition font-semibold disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-white/10"></div>
          <span className="px-3 text-sm text-gray-400">or continue with</span>
          <div className="flex-1 border-t border-white/10"></div>
        </div>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          type="button"
          className="w-full flex items-center justify-center gap-3 py-3 rounded-lg bg-white/5 border border-white/20 hover:bg-white/10 transition font-semibold disabled:opacity-50"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3A11.95 11.95 0 0 0 12 .909a11.942 11.942 0 0 0-8.96 4.02l2.226 4.836Z"
            />
            <path
              fill="#4285F4"
              d="M23.455 12.273c0-.818-.073-1.609-.209-2.373H12v4.509h6.418a5.488 5.488 0 0 1-2.382 3.6l3.709 2.873c2.164-1.991 3.41-4.918 3.41-8.609Z"
            />
            <path
              fill="#FBBC05"
              d="M5.266 14.235A7.05 7.05 0 0 1 4.909 12c0-.791.137-1.55.357-2.235L3.04 4.93A11.944 11.944 0 0 0 .909 12a11.944 11.944 0 0 0 2.132 7.07l2.225-4.835Z"
            />
            <path
              fill="#34A853"
              d="M12 23.091c3.24 0 5.955-1.073 7.945-2.918l-3.71-2.873a7.126 7.126 0 0 1-4.235 1.182 7.077 7.077 0 0 1-6.734-4.855L3.04 19.07A11.942 11.942 0 0 0 12 23.091Z"
            />
          </svg>
          Google
        </button>

        <p className="text-center mt-5 text-sm">
          Don't have an account?{' '}
          <Link
            href={`/auth/signup`}
            className="text-purple-400 hover:text-purple-300"
          >
            Registration
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;