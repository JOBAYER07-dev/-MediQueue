'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { FiMenu, FiX, FiMoon, FiSun, FiLogOut } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { toast } from 'react-toastify';

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { dark, toggleTheme } = useTheme();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully!');
      router.push('/');
    } catch {
      toast.error('Logout failed!');
    }
  };

  const publicLinks = [
    { label: 'Home', href: '/' },
    { label: 'Tutors', href: '/tutors' },
  ];

  const privateLinks = [
    { label: 'Add Tutor', href: '/add-tutor' },
    { label: 'My Tutors', href: '/my-tutors' },
    { label: 'My Sessions', href: '/my-bookings' },
  ];

  const allLinks = user ? [...publicLinks, ...privateLinks] : publicLinks;
  const initials = user?.displayName
    ? user.displayName.slice(0, 2).toUpperCase()
    : 'MQ';
  const firstName = user?.displayName?.split(' ')[0] || 'User';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-[68px] flex items-center justify-between px-4 md:px-10 bg-white/90 dark:bg-[rgba(10,14,26,0.88)] backdrop-blur-xl border-b border-slate-200 dark:border-white/[0.07] transition-colors duration-300">
      {/* LOGO */}
      <Link
        href="/"
        className="flex items-center gap-2.5 no-underline shrink-0"
      >
        <div className="w-9 h-9 rounded-[9px] bg-gradient-to-br from-[#d4a84b] to-[#a06a10] flex items-center justify-center text-base shadow-[0_4px_12px_rgba(212,168,75,.3)]">
          📚
        </div>
        <span className="font-serif text-[1.2rem] font-bold text-[#d4a84b] tracking-tight hidden sm:block">
          MediQueue
        </span>
      </Link>

      {/* DESKTOP LINKS */}
      <div className="hidden md:flex items-center gap-1">
        {allLinks.map(link => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3.5 py-1.5 rounded-lg text-[0.82rem] font-medium transition-all duration-200 no-underline
                ${
                  isActive
                    ? 'bg-amber-50 dark:bg-[rgba(212,168,75,0.12)] text-[#d4a84b]'
                    : 'text-slate-600 dark:text-[#9aa3be] hover:text-[#d4a84b] hover:bg-amber-50 dark:hover:bg-[rgba(212,168,75,0.07)]'
                }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-2">
        {/*  THEME TOGGLE  */}
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-[9px] border border-slate-300 dark:border-white/[0.12] bg-transparent flex items-center justify-center text-slate-600 dark:text-[#9aa3be] hover:text-[#d4a84b] hover:border-[#d4a84b]/30 transition-all duration-200"
        >
          {dark ? <FiSun size={15} /> : <FiMoon size={15} />}
        </button>

        {user ? (
          <div
            onClick={handleLogout}
            className="flex items-center gap-2 pl-1 pr-3 py-1 border border-slate-300 dark:border-white/[0.12] rounded-full cursor-pointer hover:border-[#d4a84b]/30 transition-all duration-200 group"
          >
            {user.photoURL ? (
              <Image
                src={user.photoURL}
                alt="avatar"
                width={28}
                height={28}
                className="w-7 h-7 rounded-full object-cover"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#60a5fa] to-[#7c3aed] flex items-center justify-center text-[0.6rem] font-bold text-white">
                {initials}
              </div>
            )}
            <span className="text-[0.78rem] font-medium text-slate-900 dark:text-[#e8ecf4] hidden sm:block">
              {firstName}
            </span>
            <FiLogOut
              size={13}
              className="text-slate-500 dark:text-[#6b7694] group-hover:text-[#f87171] transition-colors duration-200"
            />
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/login"
              className="px-4 py-2 rounded-[9px] border border-slate-300 dark:border-white/[0.12] text-slate-600 dark:text-[#9aa3be] text-[0.8rem] font-semibold no-underline hover:border-[#d4a84b]/40 hover:text-[#d4a84b] transition-all duration-200"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 rounded-[9px] bg-gradient-to-br from-[#d4a84b] to-[#a06a10] text-white dark:text-[#0a0e1a] text-[0.8rem] font-bold no-underline shadow-[0_3px_10px_rgba(212,168,75,.25)] hover:opacity-90 transition-all duration-200"
            >
              Register
            </Link>
          </div>
        )}

        {/* MOBILE HAMBURGER */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden w-9 h-9 rounded-[9px] border border-slate-300 dark:border-white/[0.12] bg-transparent flex items-center justify-center text-slate-600 dark:text-[#9aa3be]"
        >
          {menuOpen ? <FiX size={17} /> : <FiMenu size={17} />}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {menuOpen && (
        <div className="absolute top-[68px] left-0 right-0 bg-slate-50 dark:bg-[#0f1424] border-b border-slate-200 dark:border-white/[0.07] flex flex-col px-4 py-4 gap-1 md:hidden">
          {allLinks.map(link => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-2.5 rounded-lg text-[0.85rem] font-medium no-underline transition-all duration-200
                  ${isActive ? 'bg-amber-50 dark:bg-[rgba(212,168,75,0.12)] text-[#d4a84b]' : 'text-slate-600 dark:text-[#9aa3be] hover:text-[#d4a84b]'}`}
              >
                {link.label}
              </Link>
            );
          })}

          {!user && (
            <div className="flex gap-2 mt-2 pt-3 border-t border-slate-200 dark:border-white/[0.07]">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="flex-1 text-center py-2.5 rounded-[9px] border border-slate-300 dark:border-white/[0.12] text-slate-600 dark:text-[#9aa3be] text-[0.82rem] font-semibold no-underline"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="flex-1 text-center py-2.5 rounded-[9px] bg-gradient-to-br from-[#d4a84b] to-[#a06a10] text-white dark:text-[#0a0e1a] text-[0.82rem] font-bold no-underline"
              >
                Register
              </Link>
            </div>
          )}

          {user && (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="mt-2 pt-3 border-t border-slate-200 dark:border-white/[0.07] text-left px-4 py-2.5 text-[0.85rem] text-[#f87171] flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg"
            >
              <FiLogOut size={14} /> Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
