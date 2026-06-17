'use client';



import { authClient } from '@/lib/auth-client';
import Link from 'next/link';

import React, { useState } from 'react';

const LoginPage = () => {

  const [loading, setLoading] = useState(false);
  


  const dataSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const { email, password } = Object.fromEntries(formData);


     const { data, error } = authClient.signIn.email({
      email,
      password,
      callbackURL:'/'
    });
      if (error) {
        alert(error.message || 'Login failed');
        return;
      }
            alert('Login successful!');
      console.log(data , "login");
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

        <p className="text-center mt-5 text-sm ">
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