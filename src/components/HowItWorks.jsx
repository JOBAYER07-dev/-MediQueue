import { FiLock, FiSearch, FiCalendar, FiBookOpen } from 'react-icons/fi';

const steps = [
  {
    num: '01',
    icon: <FiLock size={20} />,
    title: 'Create Account',
    desc: 'Register with email or Google in 30 seconds.',
  },
  {
    num: '02',
    icon: <FiSearch size={20} />,
    title: 'Find Your Tutor',
    desc: 'Browse tutors by subject, location & availability.',
  },
  {
    num: '03',
    icon: <FiCalendar size={20} />,
    title: 'Book a Session',
    desc: 'Pick a slot — digital token is auto-generated.',
  },
  {
    num: '04',
    icon: <FiBookOpen size={20} />,
    title: 'Start Learning',
    desc: 'Join the session and track all bookings from dashboard.',
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-white dark:bg-[#0a0e1a] px-4 sm:px-8 lg:px-16 py-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* HEADER  */}
        <p className="text-[0.68rem] font-semibold uppercase tracking-[3px] text-[#d4a84b] mb-3">
          ✦ Simple Process
        </p>
        <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold tracking-[-0.5px] leading-[1.12] text-slate-900 dark:text-[#e8ecf4] mb-4">
          Book in <em className="italic text-[#d4a84b]">4 Easy Steps</em>
        </h2>
        <div className="w-12 h-[3px] bg-gradient-to-r from-[#d4a84b] to-transparent rounded-full mb-12" />

        {/* STEPS GRID  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map(step => (
            <div
              key={step.num}
              className="bg-slate-50 dark:bg-[#131829] border border-slate-200 dark:border-white/[0.07] rounded-2xl p-7 flex flex-col items-center text-center hover:border-[#d4a84b]/20 transition-all duration-300 shadow-sm dark:shadow-none"
            >
              {/* Big faded number */}
              <div className="font-serif text-[3.2rem] font-black text-amber-100 dark:text-[rgba(212,168,75,0.07)] leading-none mb-4 self-start">
                {step.num}
              </div>

              {/* Icon box */}
              <div className="w-12 h-12 rounded-[13px] bg-amber-50 dark:bg-[rgba(212,168,75,0.1)] border border-amber-200 dark:border-[rgba(212,168,75,0.18)] flex items-center justify-center text-[#d4a84b] mb-5">
                {step.icon}
              </div>

              {/* Title */}
              <div className="text-[0.92rem] font-semibold text-slate-900 dark:text-[#e8ecf4] mb-2.5">
                {step.title}
              </div>

              {/* Description */}
              <div className="text-[0.76rem] text-slate-600 dark:text-[#9aa3be] leading-[1.65]">
                {step.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
