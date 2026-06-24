import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createSubscription } from '@/lib/action/subscription'
import { createPayment } from '@/lib/action/payment'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)')
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  const { status, customer_details, metadata } = session;
  const customerEmail = customer_details?.email;

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    // ১. ডেটাবেজে সাবস্ক্রিপশন বা পেমেন্ট ইনফো সেভ করা
  const payInfo = {
    title: metadata.title,
    price:metadata.price,
    email: customerEmail,
    recipeId: metadata.recipeId,
    userId: metadata.user 
  }
  await createPayment(payInfo)
  
    return (
      <section className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden bg-[#050506] px-4 py-16 text-zinc-50 antialiased">
        
        {/* --- PREMIUM ANIMATED GRADIENT BACKGROUND --- */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-40 mix-blend-screen blur-[130px]"
          style={{
            background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, rgba(6,182,212,0.05) 50%, transparent 100%)',
            animation: 'pulseGlow 8s ease-in-out infinite alternate'
          }}
        />
        
        <div 
          className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full pointer-events-none opacity-30 blur-[100px]"
          style={{
            background: 'linear-gradient(45deg, rgba(52,211,153,0.1) 0%, transparent 70%)',
            animation: 'spinGlow 12s linear infinite'
          }}
        />

        <style dangerouslySetInnerHTML={{__html: `
          @keyframes pulseGlow {
            0% { transform: translate(-50%, -50%) scale(0.9); opacity: 0.3; }
            100% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.5; }
          }
          @keyframes spinGlow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes pulseRing {
            0% { transform: scale(0.95); opacity: 0.5; }
            50% { transform: scale(1.05); opacity: 0.8; }
            100% { transform: scale(0.95); opacity: 0.5; }
          }
        `}} />

        <div className="relative w-full max-w-md z-10">
          {/* Main Card */}
          <div className="relative border border-zinc-800/80 bg-zinc-900/40 rounded-3xl p-8 sm:p-10 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.9)] backdrop-blur-xl text-center space-y-8">
            
            {/* Animated Success Badge */}
            <div className="relative mx-auto h-14 w-14">
              <div 
                className="absolute inset-0 rounded-full bg-emerald-500/20 blur-md pointer-events-none"
                style={{ animation: 'pulseRing 3s ease-in-out infinite' }}
              />
              <div className="relative flex h-full w-full items-center justify-center rounded-full border border-emerald-500/40 bg-zinc-950/80 text-emerald-400 shadow-[inset_0_1px_12px_rgba(16,185,129,0.15)]">
                <svg
                  className="h-6 w-6 filter drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
            </div>

            {/* Typography Stack */}
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-100">
                Payment Received
              </h1>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] bg-gradient-to-r from-emerald-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent">
                Secure Transaction Completed
              </p>
            </div>

            {/* Receipt Details Box */}
            <div className="border-t border-b border-zinc-800/60 py-5 text-left space-y-4">
              <div className="flex justify-between items-center gap-4">
                <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">Account</span>
                <span className="text-sm font-medium text-zinc-300 truncate max-w-[220px]">
                  {customerEmail}
                </span>
              </div>
              <div className="flex justify-between items-center gap-4">
                <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">Support</span>
                <a href="mailto:orders@example.com" className="text-sm font-medium text-zinc-400 hover:text-emerald-400 transition-colors duration-150">
                  orders@example.com
                </a>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-2">
        
              <Link
                href="/"
                className="flex w-full items-center justify-center rounded-xl border border-zinc-800 bg-transparent px-6 py-3.5 text-sm font-medium text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200 transition-all duration-150"
              >
                Return Home
              </Link>
            </div>

          </div>

          {/* Footer */}
          <p className="mt-8 text-center text-xs text-zinc-600">
            Powered by <span className="font-semibold text-zinc-500">stripe</span>. All systems operational.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#050506] px-4 text-center">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-800 border-t-emerald-500 mx-auto" />
    </section>
  )
}