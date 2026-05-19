'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const slides = [
  {
    badge: '✦ Smart Tutor Booking Platform',
    title: 'Learn From The',
    highlight: 'Best Tutors',
    subtitle: 'Near You',
    desc: 'Book expert tutors in seconds. No scheduling conflicts — just seamless learning sessions with auto-generated digital tokens.',
    bg: 'from-slate-100 to-slate-200 dark:from-[#0a0e1a] dark:to-[#0f1424]',
  },
  {
    badge: '✦ 1,200+ Active Tutors',
    title: 'Find The Perfect',
    highlight: 'Tutor',
    subtitle: 'For Your Needs',
    desc: 'Browse tutors by subject, location & availability. Get matched with the best educators across Bangladesh.',
    bg: 'from-slate-50 to-slate-100 dark:from-[#0a0e1a] dark:to-[#0d1320]',
  },
  {
    badge: '✦ Auto Session Tokens',
    title: 'Book Sessions',
    highlight: 'Instantly',
    subtitle: 'Zero Conflicts',
    desc: 'Our smart scheduling system prevents time slot conflicts and generates digital tokens for every confirmed booking.',
    bg: 'from-slate-100 to-white dark:from-[#0a0e1a] dark:to-[#100f1e]',
  },
];

const BannerSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section
      className={`min-h-screen bg-gradient-to-br ${slide.bg} flex items-center relative overflow-hidden px-4 sm:px-8 lg:px-16 pt-[68px] transition-all duration-700`}
    >
      <div className="absolute top-[-80px] right-[-80px] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(212,168,75,0.07)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16">
        <div key={current} style={{ animation: 'fadeUp .5s ease both' }}>
          <div className="inline-flex items-center gap-2 px-4 py-[6px] bg-amber-50 dark:bg-[rgba(212,168,75,0.1)] border border-amber-200 dark:border-[rgba(212,168,75,0.22)] rounded-full text-[0.68rem] text-[#d4a84b] font-semibold tracking-[1.5px] uppercase mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4a84b] inline-block" />
            {slide.badge}
          </div>

          <h1 className="font-serif text-[clamp(2.4rem,5vw,3.8rem)] font-black leading-[1.06] tracking-[-1.5px] text-slate-900 dark:text-[#e8ecf4] mb-6">
            {slide.title}
            <br />
            <em className="italic text-[#d4a84b] not-italic font-black">
              {slide.highlight}
            </em>
            <br />
            {slide.subtitle}
          </h1>

          <p className="text-[0.95rem] text-slate-600 dark:text-[#9aa3be] leading-[1.8] max-w-[480px] mb-10 font-light">
            {slide.desc}
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <Link
              href="/tutors"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-br from-[#d4a84b] to-[#a06a10] text-white dark:text-[#0a0e1a] text-[0.88rem] font-bold no-underline shadow-[0_6px_20px_rgba(212,168,75,.3)] hover:opacity-90 transition-all duration-200"
            >
              🎯 Browse Tutors
            </Link>
            <Link
              href="/register"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-transparent border border-slate-300 dark:border-white/[0.12] text-slate-700 dark:text-[#9aa3be] text-[0.88rem] font-medium no-underline hover:border-[#d4a84b] hover:text-[#d4a84b] dark:hover:border-[#d4a84b]/30 dark:hover:text-[#d4a84b] transition-all duration-200"
            >
              ▶ Get Started
            </Link>
          </div>

          <div className="flex flex-wrap gap-8 mt-14 pt-10 border-t border-slate-200 dark:border-white/[0.07]">
            {[
              ['1,200+', 'Active Tutors'],
              ['8,400+', 'Sessions Booked'],
              ['98%', 'Satisfaction Rate'],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-serif text-[1.9rem] font-bold text-[#d4a84b] leading-none">
                  {n}
                </div>
                <div className="text-[0.7rem] text-slate-500 dark:text-[#6b7694] mt-1.5 tracking-[0.5px]">
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative bg-white dark:bg-[#131829] border border-slate-200 dark:border-white/[0.07] rounded-2xl p-6 shadow-xl dark:shadow-2xl hidden lg:block transition-colors duration-300">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4a84b] to-transparent rounded-t-2xl" />
          <div className="flex items-center gap-4 pb-5 mb-5 border-b border-slate-100 dark:border-white/[0.07]">
            <div className="w-[52px] h-[52px] rounded-[14px] bg-gradient-to-br from-[#f093fb] to-[#f5576c] flex items-center justify-center text-[1.5rem] shrink-0">
              👩‍🏫
            </div>
            <div>
              <div className="text-[0.98rem] font-semibold text-slate-900 dark:text-[#e8ecf4] mb-0.5">
                Dr. Nusrat Jahan
              </div>
              <div className="text-[0.72rem] text-slate-600 dark:text-[#9aa3be]">
                PhD Physics · Dhaka University
              </div>
              <span className="inline-block mt-1.5 px-2.5 py-0.5 bg-amber-50 dark:bg-[rgba(212,168,75,0.12)] border border-amber-200 dark:border-[rgba(212,168,75,0.22)] rounded-full text-[0.62rem] text-[#d4a84b] font-semibold">
                Physics
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-5">
            {[
              ['Available Days', 'Sat – Wed'],
              ['Time Slot', '4PM – 7PM'],
              ['Hourly Fee', '৳ 650', true],
              ['Mode', 'Online'],
            ].map(([label, value, gold]) => (
              <div
                key={label}
                className="bg-slate-50 dark:bg-white/[0.03] border border-slate-100 dark:border-white/[0.06] rounded-xl px-3.5 py-3"
              >
                <div className="text-[0.58rem] text-slate-500 dark:text-[#6b7694] uppercase tracking-[0.8px] mb-1.5">
                  {label}
                </div>
                <div
                  className={`text-[0.84rem] font-semibold ${gold ? 'text-[#d4a84b]' : 'text-slate-900 dark:text-[#e8ecf4]'}`}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>
          <div className="bg-emerald-50 dark:bg-[rgba(62,207,142,0.07)] border border-emerald-200 dark:border-[rgba(62,207,142,0.18)] rounded-xl px-4 py-3 flex justify-between items-center">
            <span className="text-[0.65rem] text-slate-500 dark:text-[#6b7694]">
              Session Token
            </span>
            <span className="text-[0.78rem] text-emerald-600 dark:text-[#3ecf8e] font-bold font-mono tracking-widest">
              MQ-2025-A7F3K9
            </span>
          </div>

          <div className="flex justify-center gap-2 mt-5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-[#d4a84b]' : 'w-1.5 bg-slate-300 dark:bg-white/20'}`}
              />
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </section>
  );
};

export default BannerSection;
