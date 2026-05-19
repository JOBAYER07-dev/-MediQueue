const testimonials = [
  {
    quote:
      'MediQueue made finding a physics tutor so easy. The slot booking system is brilliant!',
    name: 'Tahmina Akter',
    role: 'HSC Student, Dhaka',
    emoji: '😊',
    grad: 'linear-gradient(135deg,#f093fb,#f5576c)',
  },
  {
    quote:
      'The digital session token gives me confidence that my booking is confirmed.',
    name: 'Sakib Al Hasan',
    role: 'University Student, CTG',
    emoji: '😄',
    grad: 'linear-gradient(135deg,#4facfe,#00f2fe)',
  },
  {
    quote:
      'As a tutor, managing my students has never been easier. Zero scheduling overlap!',
    name: 'Razia Begum',
    role: 'Tutor, Mathematics',
    emoji: '🤩',
    grad: 'linear-gradient(135deg,#43e97b,#38f9d7)',
  },
];

const Testimonials = () => {
  return (
    <section className="bg-white dark:bg-[#0a0e1a] px-4 sm:px-8 lg:px-16 py-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/*  HEADER  */}
        <p className="text-[0.68rem] font-semibold uppercase tracking-[3px] text-[#d4a84b] mb-3">
          ✦ Student Voices
        </p>
        <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold tracking-[-0.5px] leading-[1.12] text-slate-900 dark:text-[#e8ecf4] mb-4">
          What Students <em className="italic text-[#d4a84b]">Say</em>
        </h2>
        <div className="w-12 h-[3px] bg-gradient-to-r from-[#d4a84b] to-transparent rounded-full mb-12" />

        {/* ── CARDS ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-slate-50 dark:bg-[#131829] border border-slate-200 dark:border-white/[0.07] rounded-2xl p-7 flex flex-col hover:border-[#d4a84b]/20 transition-all duration-300 shadow-sm dark:shadow-none"
            >
              {/* Quote mark */}
              <span className="font-serif text-[2.8rem] leading-none text-[#d4a84b] opacity-20 mb-4 select-none">
                “
              </span>

              {/* Stars */}
              <div className="text-[#d4a84b] text-[0.82rem] tracking-wide mb-4">
                ★★★★★
              </div>

              {/* Quote text */}
              <p className="text-[0.82rem] text-slate-600 dark:text-[#9aa3be] leading-[1.8] font-light mb-7 flex-1">
                {t.quote}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-[11px] flex items-center justify-center text-[1.1rem] shrink-0"
                  style={{ background: t.grad }}
                >
                  {t.emoji}
                </div>
                <div>
                  <div className="text-[0.84rem] font-semibold text-slate-900 dark:text-[#e8ecf4]">
                    {t.name}
                  </div>
                  <div className="text-[0.7rem] text-slate-500 dark:text-[#6b7694] mt-0.5">
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
