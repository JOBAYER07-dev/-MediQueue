'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TutorCard from '@/components/tutors/TutorCard';

const FeaturedTutors = () => {
  const router = useRouter();
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/tutors/home`)
      .then(res => res.json())
      .then(data => {
        setTutors(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="bg-slate-50 dark:bg-[#0f1424] px-4 sm:px-8 lg:px-16 py-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10 flex-wrap gap-4">
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[3px] text-[#d4a84b] mb-3">
              ✦ Top Educators
            </p>
            <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold text-slate-900 dark:text-[#e8ecf4] mb-4">
              Available <em className="italic text-[#d4a84b]">Tutors</em>
            </h2>
            <div className="w-12 h-[3px] bg-gradient-to-r from-[#d4a84b] to-transparent rounded-full" />
          </div>
          <button
            onClick={() => router.push('/tutors')}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-transparent border border-slate-300 dark:border-white/[0.12] text-slate-600 dark:text-[#9aa3be] text-[0.88rem] font-medium hover:border-[#d4a84b]/30 hover:text-[#d4a84b] transition-all duration-200"
          >
            See All Tutors →
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-24">
            <div className="w-10 h-10 border-2 border-[#d4a84b] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : tutors.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">📚</div>
            <p className="text-slate-600 dark:text-[#9aa3be]">
              No tutors available yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tutors.map(tutor => (
              <TutorCard
                key={tutor._id}
                tutor={tutor}
                onClick={() => router.push(`/tutors/${tutor._id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedTutors;
