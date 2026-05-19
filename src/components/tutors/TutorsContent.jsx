'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiSearch } from 'react-icons/fi';
import TutorCard from './TutorCard';

const TutorsContent = () => {
  const router = useRouter();
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchTutors = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tutors?${params}`,
      );
      const data = await res.json();
      setTutors(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTutors();
  }, []);

  const handleReset = () => {
    setSearch('');
    setStartDate('');
    setEndDate('');
    setTimeout(() => fetchTutors(), 100);
  };

  const inputClass =
    'px-4 py-2.5 bg-white dark:bg-[#131829] border border-slate-200 dark:border-white/[0.08] rounded-xl text-slate-900 dark:text-[#e8ecf4] text-[0.85rem] outline-none focus:border-[#d4a84b]/50 transition-all duration-200 placeholder:text-slate-500 dark:placeholder:text-[#6b7694]';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0e1a] px-4 sm:px-8 lg:px-16 py-12 pt-[88px] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[3px] text-[#d4a84b] mb-2">
          ✦ All Educators
        </p>
        <h1 className="font-serif text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold text-slate-900 dark:text-[#e8ecf4] mb-4">
          Browse <em className="italic text-[#d4a84b]">Tutors</em>
        </h1>
        <div className="w-12 h-[3px] bg-gradient-to-r from-[#d4a84b] to-transparent rounded-full mb-8" />

        <form
          onSubmit={e => {
            e.preventDefault();
            fetchTutors();
          }}
          className="flex flex-wrap gap-3 items-center mb-10"
        >
          <div className="relative">
            <FiSearch
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 dark:text-[#6b7694]"
            />
            <input
              type="text"
              placeholder="Search by tutor name..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={`${inputClass} pl-9 w-[220px]`}
            />
          </div>
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className={`${inputClass} w-[160px] text-slate-600 dark:text-[#9aa3be]`}
          />
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            className={`${inputClass} w-[160px] text-slate-600 dark:text-[#9aa3be]`}
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-br from-[#d4a84b] to-[#a06a10] text-white dark:text-[#0a0e1a] text-[0.85rem] font-bold hover:opacity-90 transition-all duration-200"
          >
            Filter
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-white/[0.08] text-slate-600 dark:text-[#9aa3be] text-[0.85rem] font-medium hover:border-[#d4a84b]/30 hover:text-[#d4a84b] transition-all duration-200"
          >
            Reset
          </button>
        </form>

        {loading ? (
          <div className="flex justify-center items-center py-24">
            <div className="w-10 h-10 border-2 border-[#d4a84b] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : tutors.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-slate-500 dark:text-[#9aa3be] text-[0.9rem]">
              No tutors found. Try a different search.
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
    </div>
  );
};

export default TutorsContent;
