import Link from 'next/link';
import {
  FaXTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
} from 'react-icons/fa6';

const Footer = () => {
  const services = [
    'Find a Tutor',
    'Become a Tutor',
    'Group Sessions',
    'Online Classes',
  ];
  const company = ['About Us', 'Careers', 'Blog', 'Press'];
  const contact = [
    'support@mediqueue.com',
    '+880 1700-000000',
    'Dhaka, Bangladesh',
    'Help Center',
  ];

  const socials = [
    { icon: <FaXTwitter size={13} />, href: '#' },
    { icon: <FaFacebookF size={13} />, href: '#' },
    { icon: <FaLinkedinIn size={13} />, href: '#' },
    { icon: <FaYoutube size={13} />, href: '#' },
  ];

  return (
    <footer className="bg-slate-50 dark:bg-[#0a0e1a] border-t border-slate-200 dark:border-white/[0.07] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 pt-14 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-[9px] bg-gradient-to-br from-[#d4a84b] to-[#a06a10] flex items-center justify-center text-base shadow-[0_4px_12px_rgba(212,168,75,.3)]">
                📚
              </div>
              <span className="font-serif text-[1.2rem] font-bold text-[#d4a84b] tracking-tight">
                MediQueue
              </span>
            </div>
            <p className="text-[0.8rem] text-slate-600 dark:text-[#9aa3be] leading-relaxed mb-6 max-w-xs">
              Simplifying tutor booking for students across Bangladesh. Smart
              scheduling, zero conflicts.
            </p>
            <div className="flex gap-2">
              {socials.map((s, i) => (
                <Link
                  key={i}
                  href={s.href}
                  className="w-[34px] h-[34px] rounded-lg bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] flex items-center justify-center text-slate-500 dark:text-[#6b7694] hover:text-[#d4a84b] dark:hover:text-[#d4a84b] hover:border-[#d4a84b]/30 transition-all duration-200"
                >
                  {s.icon}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[0.68rem] font-semibold uppercase tracking-[2px] text-[#d4a84b] mb-5">
              Services
            </div>
            <ul className="flex flex-col gap-3">
              {services.map(item => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-[0.8rem] text-slate-600 dark:text-[#9aa3be] hover:text-[#d4a84b] transition-colors duration-200 no-underline"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[0.68rem] font-semibold uppercase tracking-[2px] text-[#d4a84b] mb-5">
              Company
            </div>
            <ul className="flex flex-col gap-3">
              {company.map(item => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-[0.8rem] text-slate-600 dark:text-[#9aa3be] hover:text-[#d4a84b] transition-colors duration-200 no-underline"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[0.68rem] font-semibold uppercase tracking-[2px] text-[#d4a84b] mb-5">
              Contact
            </div>
            <ul className="flex flex-col gap-3">
              {contact.map(item => (
                <li key={item}>
                  <span className="text-[0.8rem] text-slate-600 dark:text-[#9aa3be] cursor-default">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200 dark:border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[0.72rem] text-slate-500 dark:text-[#6b7694]">
            © 2026 MediQueue. All rights reserved.
          </span>
          <div className="flex items-center gap-4 text-[0.72rem] text-slate-500 dark:text-[#6b7694]">
            <Link
              href="#"
              className="hover:text-[#d4a84b] transition-colors duration-200 no-underline"
            >
              Privacy Policy
            </Link>
            <span>·</span>
            <Link
              href="#"
              className="hover:text-[#d4a84b] transition-colors duration-200 no-underline"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
