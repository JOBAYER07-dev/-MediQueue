import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0e1a] flex flex-col items-center justify-center text-center px-4">
      <div className="font-serif text-[8rem] font-black text-[#d4a84b] opacity-10 leading-none">
        404
      </div>
      <h2 className="font-serif text-[1.8rem] font-bold text-[#e8ecf4] mb-3">
        Page Not Found
      </h2>
      <p className="text-[0.9rem] text-[#9aa3be] mb-8">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="px-7 py-3.5 rounded-xl bg-gradient-to-br from-[#d4a84b] to-[#a06a10] text-[#0a0e1a] text-[0.88rem] font-bold no-underline shadow-[0_6px_20px_rgba(212,168,75,.3)] hover:opacity-90 transition-all duration-200"
      >
        ← Back to Home
      </Link>
    </div>
  );
}
