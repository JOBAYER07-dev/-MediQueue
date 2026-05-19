'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const categories = [
  { emoji: '📐', name: 'Mathematics', count: '24 Tutors' },
  { emoji: '⚗️', name: 'Chemistry', count: '18 Tutors' },
  { emoji: '⚛️', name: 'Physics', count: '21 Tutors' },
  { emoji: '💻', name: 'Computer Science', count: '30 Tutors' },
  { emoji: '📖', name: 'English', count: '15 Tutors' },
  { emoji: '🧬', name: 'Biology', count: '12 Tutors' },
  { emoji: '📊', name: 'Economics', count: '9 Tutors' },
  { emoji: '🎨', name: 'Fine Arts', count: '7 Tutors' },
];

const PopularCategories = () => {
  const [active, setActive] = useState('Mathematics');
  const router = useRouter();

  const handleClick = name => {
    setActive(name);
    router.push(`/tutors?subject=${encodeURIComponent(name)}`);
  };

  return (
    <section className="bg-slate-50 dark:bg-[#0f1424] px-4 sm:px-8 lg:px-16 py-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* ── HEADER ── */}
        <p className="text-[0.68rem] font-semibold uppercase tracking-[3px] text-[#d4a84b] mb-3">
          ✦ Browse By Subject
        </p>
        <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold tracking-[-0.5px] leading-[1.12] text-slate-900 dark:text-[#e8ecf4] mb-4">
          Popular <em className="italic text-[#d4a84b]">Categories</em>
        </h2>
        <div className="w-12 h-[3px] bg-gradient-to-r from-[#d4a84b] to-transparent rounded-full mb-12" />

        {/* ── GRID ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map(cat => {
            const isActive = active === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => handleClick(cat.name)}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer w-full
                  ${
                    isActive
                      ? 'bg-amber-50 dark:bg-[rgba(212,168,75,0.1)] border-[#d4a84b]'
                      : 'bg-white dark:bg-[#131829] border-slate-200 dark:border-white/[0.07] hover:border-[#d4a84b]/30 hover:bg-amber-50 dark:hover:bg-[rgba(212,168,75,0.05)] shadow-sm dark:shadow-none'
                  }`}
              >
                {/* Emoji icon box */}
                <div
                  className={`w-11 h-11 rounded-[11px] flex items-center justify-center text-[1.4rem] shrink-0 transition-all duration-200
                  ${
                    isActive
                      ? 'bg-amber-100 dark:bg-[rgba(212,168,75,0.18)]'
                      : 'bg-slate-100 dark:bg-white/[0.05]'
                  }`}
                >
                  {cat.emoji}
                </div>

                {/* Text */}
                <div>
                  <div
                    className={`text-[0.88rem] font-semibold mb-0.5 transition-colors duration-200
                    ${isActive ? 'text-[#d4a84b]' : 'text-slate-900 dark:text-[#e8ecf4]'}`}
                  >
                    {cat.name}
                  </div>
                  <div className="text-[0.7rem] text-slate-500 dark:text-[#6b7694]">
                    {cat.count}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;
