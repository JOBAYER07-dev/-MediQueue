'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FiSearch, FiMapPin, FiClock, FiMonitor, FiStar } from 'react-icons/fi';

const TutorsPage = () => {
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

  const handleFilter = e => {
    e.preventDefault();
    fetchTutors();
  };

  const handleReset = () => {
    setSearch('');
    setStartDate('');
    setEndDate('');
    setTimeout(() => fetchTutors(), 100);
  };

  const inputClass =
    'px-4 py-2.5 bg-[#131829] border border-white/[0.08] rounded-xl text-[#e8ecf4] text-[0.85rem] outline-none focus:border-[#d4a84b]/50 transition-all duration-200 placeholder:text-[#6b7694]';

  return (
    <div className="min-h-screen bg-[#0a0e1a] px-4 sm:px-8 lg:px-16 py-12 pt-[88px]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <p className="text-[0.68rem] font-semibold uppercase tracking-[3px] text-[#d4a84b] mb-2">
          ✦ All Educators
        </p>
        <h1 className="font-serif text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold text-[#e8ecf4] mb-4">
          Browse <em className="italic text-[#d4a84b]">Tutors</em>
        </h1>
        <div className="w-12 h-[3px] bg-gradient-to-r from-[#d4a84b] to-transparent rounded-full mb-8" />

        {/* Search & Filter */}
        <form
          onSubmit={handleFilter}
          className="flex flex-wrap gap-3 items-center mb-10"
        >
          <div className="relative">
            <FiSearch
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6b7694]"
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
            className={`${inputClass} w-[160px] text-[#9aa3be]`}
          />
          <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            className={`${inputClass} w-[160px] text-[#9aa3be]`}
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-br from-[#d4a84b] to-[#a06a10] text-[#0a0e1a] text-[0.85rem] font-bold hover:opacity-90 transition-all duration-200"
          >
            Filter
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-5 py-2.5 rounded-xl border border-white/[0.08] text-[#9aa3be] text-[0.85rem] font-medium hover:border-[#d4a84b]/30 hover:text-[#d4a84b] transition-all duration-200"
          >
            Reset
          </button>
        </form>

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <div className="w-10 h-10 border-2 border-[#d4a84b] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : tutors.length === 0 ? (
          /* Empty state */
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-[#9aa3be] text-[0.9rem]">
              No tutors found. Try a different search.
            </p>
          </div>
        ) : (
          /* Tutors Grid */
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

const TutorCard = ({ tutor, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-[#131829] border border-white/[0.07] rounded-2xl p-6 cursor-pointer hover:border-[#d4a84b]/30 transition-all duration-300 flex flex-col"
    >
      {/* Top */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-14 h-14 rounded-2xl overflow-hidden bg-[rgba(212,168,75,0.1)] flex items-center justify-center shrink-0">
          {tutor.photo ? (
            <Image
              src={tutor.photo}
              alt={tutor.name}
              width={56}
              height={56}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-2xl">👩‍🏫</span>
          )}
        </div>
        <div className="flex items-center gap-1.5 bg-[rgba(212,168,75,0.1)] border border-[rgba(212,168,75,0.2)] rounded-full px-2.5 py-1 text-[0.72rem] text-[#d4a84b] font-semibold">
          <FiStar size={11} />
          {tutor.rating || 'New'}
        </div>
      </div>

      {/* Info */}
      <div className="mb-3">
        <h3 className="text-[0.98rem] font-semibold text-[#e8ecf4] mb-1">
          {tutor.name}
        </h3>
        <span className="text-[0.7rem] font-semibold text-[#d4a84b] uppercase tracking-wider">
          {tutor.subject}
        </span>
      </div>

      {/* Slots */}
      <div className="flex items-center gap-1.5 text-[0.72rem] text-[#3ecf8e] mb-3">
        <span className="w-1.5 h-1.5 rounded-full bg-[#3ecf8e] inline-block" />
        {tutor.totalSlot} slots available
      </div>

      {/* Details */}
      <div className="flex flex-col gap-2 mb-4 flex-1">
        <div className="flex items-center gap-2 text-[0.75rem] text-[#9aa3be]">
          <FiMapPin size={12} /> {tutor.location}
        </div>
        <div className="flex items-center gap-2 text-[0.75rem] text-[#9aa3be]">
          <FiClock size={12} /> {tutor.availableDays}, {tutor.timeSlot}
        </div>
        <div className="flex items-center gap-2 text-[0.75rem] text-[#9aa3be]">
          <FiMonitor size={12} /> {tutor.teachingMode}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-white/[0.07]">
        <div className="text-[1.05rem] font-bold text-[#d4a84b]">
          ৳{tutor.hourlyFee}{' '}
          <span className="text-[0.68rem] text-[#6b7694] font-normal">
            / hr
          </span>
        </div>
        <button
          onClick={e => {
            e.stopPropagation();
            onClick();
          }}
          className="px-4 py-2 rounded-lg bg-gradient-to-br from-[#d4a84b] to-[#a06a10] text-[#0a0e1a] text-[0.78rem] font-bold hover:opacity-90 transition-all duration-200"
        >
          Book Session
        </button>
      </div>
    </div>
  );
};

export default TutorsPage;
