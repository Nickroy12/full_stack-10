import React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";

const UnauthorizedPage = () => {
  return (
    <div className="relative min-h-screen bg-[#09090b] text-zinc-100 flex flex-col justify-between font-sans overflow-hidden">
      
      {/* Background Decorative Mesh Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-red-500/[0.02] blur-[80px] rounded-full pointer-events-none" />

      {/* Main Content Container */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
        
        {/* Modern, glass-morphism style card */}
        <div className="max-w-md w-full border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-xl p-8 md:p-10 shadow-2xl rounded-2xl ring-1 ring-white/[0.02]">
          
          <div className="flex flex-col items-center justify-center">
            
            {/* Lucide ShieldAlert Icon - Beautifully centered with a soft glow wrapper */}
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/[0.06] border border-red-500/20 shadow-inner">
              <ShieldAlert className="w-7 h-7 text-red-500/90 stroke-[1.75]" />
            </div>

            {/* Typography */}
            <h1 className="text-2xl font-bold tracking-tight text-zinc-100 mb-2">
              Restricted Recipe Area
            </h1>
            
            <div className="flex items-center justify-center mb-4">
              <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-zinc-800/60 text-zinc-400 border border-zinc-700/50">
                Status 403
              </span>
            </div>

            <p className="text-sm text-zinc-400 leading-relaxed mb-8 max-w-[290px]">
              Your account lacks permission to access this kitchen. Try signing in with authorized credentials.
            </p>

            {/* Action Buttons themed after green-600 */}
            <div className="flex flex-col gap-3 w-full">

              <Link
                href="/"
                className="group flex items-center justify-center h-11 px-6 gap-2 rounded-xl border border-zinc-800 bg-zinc-900/20 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 hover:border-zinc-700 transition-all duration-200 font-medium text-sm"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                Go to Homepage
              </Link>
            </div>

          </div>
        </div>
      </main>
      
    </div>
  );
};

export default UnauthorizedPage;