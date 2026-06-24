import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="w-full min-h-[85vh] mx-auto flex items-center justify-center  bg-background bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f293d_1px,transparent_1px)] [background-size:20px_20px] px-6 py-12 md:py-24 transition-colors duration-300">
      <div className="max-w-2xl mx-auto w-full text-center flex flex-col items-center">
        
        {/* Bilingual Badge */}
        <div className="inline-flex items-center gap-2 bg-[#E6F6F0] dark:bg-[#06261B] text-[#00A86B] dark:text-[#00C47D] text-xs font-bold tracking-wide uppercase px-4 py-2 rounded-full mb-8 border border-emerald-100 dark:border-emerald-900/30 shadow-sm transition-colors duration-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A86B] dark:bg-[#00C47D] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00A86B] dark:bg-[#00C47D]"></span>
          </span>
          রান্না বান্না • Page Not Found
        </div>
        
        {/* Giant 404 Text */}
        <div className="text-gray-100 dark:text-gray-800/40 font-black text-[120px] md:text-[150px] select-none tracking-tighter leading-none mb-2 transition-colors duration-300">
          404
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-gray-900 dark:text-gray-100 leading-[1.2] mb-6 transition-colors duration-300">
          Oops! This recipe seems <br />
          to be <span className="text-[#00A86B] dark:text-[#00C47D]">missing</span>.
        </h1>
        
        {/* Description */}
        <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg mb-10 max-w-md leading-relaxed transition-colors duration-300">
          We searched the entire kitchen, but we couldn't find the page you're looking for. It might have been devoured or moved elsewhere.
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center">
          <Link 
            href="/" 
            className="w-full sm:w-auto min-w-[160px] text-center bg-green-600   text-white dark:text-gray-950 px-8 py-4 rounded-2xl font-bold transition-all duration-200 shadow-lg shadow-emerald-600/20 dark:shadow-emerald-950/40 hover:-translate-y-0.5 active:translate-y-0"
          >
            Back to Home
          </Link>
 
        </div>

      </div>
    </div>
  )
}