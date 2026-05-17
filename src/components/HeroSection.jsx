'use client';
import Link from 'next/link';
import { FiTarget, FiPlay } from 'react-icons/fi';

const HeroSection = () => {
  const stats = [
    { value: '1,200+', label: 'Active Tutors' },
    { value: '8,400+', label: 'Sessions Booked' },
    { value: '98%', label: 'Satisfaction Rate' },
  ];

  const infoGrid = [
    { label: 'Available Days', value: 'Sat – Wed' },
    { label: 'Time Slot', value: '4PM – 7PM' },
    { label: 'Hourly Fee', value: '৳ 650', gold: true },
    { label: 'Mode', value: 'Online' },
  ];

  return (
    <section className="min-h-screen bg-[#0a0e1a] flex items-center relative overflow-hidden px-4 sm:px-8 lg:px-16 pt-[68px]">
      
      <div className="absolute top-[-80px] right-[-80px] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(212,168,75,0.07)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-16">
        {/*  LEFT  */}
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-[6px] bg-[rgba(212,168,75,0.1)] border border-[rgba(212,168,75,0.22)] rounded-full text-[0.68rem] text-[#d4a84b] font-semibold tracking-[1.5px] uppercase mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4a84b] inline-block" />
            ✦ Smart Tutor Booking Platform
          </div>

          {/* Heading */}
          <h1 className="font-serif text-[clamp(2.6rem,5.5vw,4rem)] font-black leading-[1.06] tracking-[-1.5px] text-[#e8ecf4] mb-6">
            Learn From
            <br />
            The{' '}
            <em className="italic text-[#d4a84b] not-italic font-black">
              Best Tutors
            </em>
            <br />
            Near You
          </h1>

          {/* Subtitle */}
          <p className="text-[0.95rem] text-[#9aa3be] leading-[1.8] max-w-[480px] mb-10 font-light">
            Book expert tutors in seconds. No scheduling conflicts — just
            seamless learning sessions with auto-generated digital tokens.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 items-center">
            <Link
              href="/tutors"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-br from-[#d4a84b] to-[#a06a10] text-[#0a0e1a] text-[0.88rem] font-bold no-underline shadow-[0_6px_20px_rgba(212,168,75,.3)] hover:opacity-90 transition-all duration-200"
            >
              <FiTarget size={15} />
              Browse Tutors
            </Link>
            <Link
              href="/register"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-transparent border border-white/[0.12] text-[#9aa3be] text-[0.88rem] font-medium no-underline hover:border-[#d4a84b]/30 hover:text-[#d4a84b] transition-all duration-200"
            >
              <FiPlay size={13} />
              Get Started
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-14 pt-10 border-t border-white/[0.07]">
            {stats.map(({ value, label }) => (
              <div key={label}>
                <div className="font-serif text-[1.9rem] font-bold text-[#d4a84b] leading-none">
                  {value}
                </div>
                <div className="text-[0.7rem] text-[#6b7694] mt-1.5 tracking-[0.5px]">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/*  RIGHT — FLOATING CARD  */}
        <div className="relative bg-[#131829] border border-white/[0.07] rounded-2xl p-6 shadow-2xl">
          {/* top shimmer line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4a84b] to-transparent rounded-t-2xl" />

          {/* Tutor Header */}
          <div className="flex items-center gap-4 pb-5 mb-5 border-b border-white/[0.07]">
            <div className="w-[52px] h-[52px] rounded-[14px] bg-gradient-to-br from-[#f093fb] to-[#f5576c] flex items-center justify-center text-[1.5rem] shrink-0">
              👩‍🏫
            </div>
            <div>
              <div className="text-[0.98rem] font-semibold text-[#e8ecf4] mb-0.5">
                Dr. Nusrat Jahan
              </div>
              <div className="text-[0.72rem] text-[#9aa3be]">
                PhD Physics · Dhaka University
              </div>
              <span className="inline-block mt-1.5 px-2.5 py-0.5 bg-[rgba(212,168,75,0.12)] border border-[rgba(212,168,75,0.22)] rounded-full text-[0.62rem] text-[#d4a84b] font-semibold">
                Physics
              </span>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            {infoGrid.map(({ label, value, gold }) => (
              <div
                key={label}
                className="bg-white/[0.03] border border-white/[0.06] rounded-xl px-3.5 py-3"
              >
                <div className="text-[0.58rem] text-[#6b7694] uppercase tracking-[0.8px] mb-1.5">
                  {label}
                </div>
                <div
                  className={`text-[0.84rem] font-semibold ${
                    gold ? 'text-[#d4a84b]' : 'text-[#e8ecf4]'
                  }`}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>

          {/* Session Token */}
          <div className="bg-[rgba(62,207,142,0.07)] border border-[rgba(62,207,142,0.18)] rounded-xl px-4 py-3 flex justify-between items-center">
            <span className="text-[0.65rem] text-[#6b7694]">Session Token</span>
            <span className="text-[0.78rem] text-[#3ecf8e] font-bold font-mono tracking-widest">
              MQ-2025-A7F3K9
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
