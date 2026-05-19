import Image from 'next/image';
import { FiMapPin, FiClock, FiMonitor, FiStar } from 'react-icons/fi';

const TutorCard = ({ tutor, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-[#131829] border border-slate-200 dark:border-white/[0.07] rounded-2xl p-6 cursor-pointer hover:border-[#d4a84b]/30 transition-all duration-300 flex flex-col"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-14 h-14 rounded-2xl overflow-hidden bg-amber-50 dark:bg-[rgba(212,168,75,0.1)] flex items-center justify-center shrink-0">
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
        <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-[rgba(212,168,75,0.1)] border border-amber-200 dark:border-[rgba(212,168,75,0.2)] rounded-full px-2.5 py-1 text-[0.72rem] text-[#d4a84b] font-semibold">
          <FiStar size={11} /> {tutor.rating || 'New'}
        </div>
      </div>

      <div className="mb-3">
        <h3 className="text-[0.98rem] font-semibold text-slate-900 dark:text-[#e8ecf4] mb-1">
          {tutor.name}
        </h3>
        <span className="text-[0.7rem] font-semibold text-[#d4a84b] uppercase tracking-wider">
          {tutor.subject}
        </span>
      </div>

      <div className="flex items-center gap-1.5 text-[0.72rem] text-[#3ecf8e] mb-3">
        <span className="w-1.5 h-1.5 rounded-full bg-[#3ecf8e] inline-block" />
        {tutor.totalSlot} slots available
      </div>

      <div className="flex flex-col gap-2 mb-4 flex-1">
        <div className="flex items-center gap-2 text-[0.75rem] text-slate-600 dark:text-[#9aa3be]">
          <FiMapPin size={12} /> {tutor.location}
        </div>
        <div className="flex items-center gap-2 text-[0.75rem] text-slate-600 dark:text-[#9aa3be]">
          <FiClock size={12} /> {tutor.availableDays}, {tutor.timeSlot}
        </div>
        <div className="flex items-center gap-2 text-[0.75rem] text-slate-600 dark:text-[#9aa3be]">
          <FiMonitor size={12} /> {tutor.teachingMode}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-white/[0.07]">
        <div className="text-[1.05rem] font-bold text-[#d4a84b]">
          ৳{tutor.hourlyFee}{' '}
          <span className="text-[0.68rem] text-slate-500 dark:text-[#6b7694] font-normal">
            / hr
          </span>
        </div>
        <button
          onClick={e => {
            e.stopPropagation();
            onClick();
          }}
          className="px-4 py-2 rounded-lg bg-gradient-to-br from-[#d4a84b] to-[#a06a10] text-white dark:text-[#0a0e1a] text-[0.78rem] font-bold hover:opacity-90 transition-all duration-200"
        >
          Book Session
        </button>
      </div>
    </div>
  );
};

export default TutorCard;
