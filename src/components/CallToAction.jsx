import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { MdRocketLaunch } from 'react-icons/md';

const CallToAction = () => {
  return (
    <section className="bg-slate-50 dark:bg-[#0f1424] px-4 sm:px-8 lg:px-16 py-24 relative overflow-hidden transition-colors duration-300">
      {/*  BG GLOW  */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(212,168,75,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-2xl mx-auto text-center relative z-10">
        {/* Label */}
        <p className="text-[0.68rem] font-semibold uppercase tracking-[3px] text-[#d4a84b] mb-5">
          ✦ Get Started Today
        </p>

        {/* Heading */}
        <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.5px] leading-[1.12] text-slate-900 dark:text-[#e8ecf4] mb-5">
          Ready to <em className="italic text-[#d4a84b]">Start?</em>
        </h2>

        {/* Subtitle */}
        <p className="text-[0.9rem] text-slate-600 dark:text-[#9aa3be] leading-[1.75] mb-10">
          Join thousands of students finding expert tutors every day.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/register"
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-br from-[#d4a84b] to-[#a06a10] text-white dark:text-[#0a0e1a] text-[0.88rem] font-bold no-underline shadow-[0_6px_20px_rgba(212,168,75,.3)] hover:opacity-90 transition-all duration-200"
          >
            <MdRocketLaunch size={16} />
            Get Started Free
          </Link>

          <Link
            href="/tutors"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-transparent border border-slate-300 dark:border-white/[0.12] text-slate-700 dark:text-[#9aa3be] text-[0.88rem] font-medium no-underline hover:border-[#d4a84b] hover:text-[#d4a84b] dark:hover:border-[#d4a84b]/30 dark:hover:text-[#d4a84b] transition-all duration-200"
          >
            Browse Tutors
            <FiArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
