'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { FiMapPin, FiBook, FiBriefcase } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';

const generateToken = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let token = 'MQ-2025-';
  for (let i = 0; i < 6; i++)
    token += chars[Math.floor(Math.random() * chars.length)];
  return token;
};

const TutorDetailsContent = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [token] = useState(generateToken());
  const [phone, setPhone] = useState('');

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/tutors/${id}`)
      .then(res => res.json())
      .then(data => {
        setTutor(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleBooking = async () => {
    if (!phone) return toast.error('Phone number is required!');
    if (tutor.totalSlot <= 0) return toast.error('No available slots left!');
    if (new Date() < new Date(tutor.sessionStartDate))
      return toast.error('Booking is not available yet for this tutor!');

    setBooking(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          tutorId: tutor._id,
          tutorName: tutor.name,
          studentName: user.displayName,
          studentEmail: user.email,
          phone: phone,
          status: 'pending',
          sessionToken: token,
        }),
      });
      const data = await res.json();
      if (data.insertedId) {
        toast.success('Session booked successfully!');
        setTutor(prev => ({ ...prev, totalSlot: prev.totalSlot - 1 }));
        setPhone('');
      }
    } catch {
      toast.error('Booking failed!');
    } finally {
      setBooking(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0a0e1a] flex items-center justify-center transition-colors duration-300">
        <div className="w-10 h-10 border-2 border-[#d4a84b] border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (!tutor)
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0a0e1a] flex items-center justify-center transition-colors duration-300">
        <p className="text-slate-600 dark:text-[#9aa3be]">Tutor not found.</p>
      </div>
    );

  const isSlotFull = tutor.totalSlot <= 0;
  const isNotStarted = new Date() < new Date(tutor.sessionStartDate);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0e1a] px-4 sm:px-8 lg:px-16 py-12 pt-[88px] transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[3px] text-[#d4a84b] mb-6">
          ✦ Tutor Profile
        </p>

        <div className="bg-white dark:bg-[#131829] border border-slate-200 dark:border-white/[0.07] rounded-2xl p-8 mb-6 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4a84b] to-transparent" />
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-amber-50 dark:bg-[rgba(212,168,75,0.1)] flex items-center justify-center shrink-0">
              {tutor.photo ? (
                <Image
                  src={tutor.photo}
                  alt={tutor.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-4xl">👩‍🏫</span>
              )}
            </div>
            <div>
              <h1 className="font-serif text-[1.8rem] font-bold text-slate-900 dark:text-[#e8ecf4] mb-1">
                {tutor.name}
              </h1>
              <span className="text-[0.78rem] font-semibold text-[#d4a84b] uppercase tracking-wider mb-4 block">
                {tutor.subject}
              </span>
              <div className="flex flex-wrap gap-4">
                {[
                  [<FiMapPin key="loc" size={13} />, tutor.location],
                  [<FiBook key="inst" size={13} />, tutor.institution],
                  [
                    <FiBriefcase key="exp" size={13} />,
                    tutor.experience + ' exp',
                  ],
                ].map(([icon, val]) => (
                  <div
                    key={val}
                    className="flex items-center gap-1.5 text-[0.78rem] text-slate-600 dark:text-[#9aa3be]"
                  >
                    {icon} {val}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-[#131829] border border-slate-200 dark:border-white/[0.07] rounded-2xl p-6 shadow-sm">
            <div className="text-[0.68rem] font-semibold uppercase tracking-[2px] text-[#d4a84b] pb-3 mb-4 border-b border-slate-200 dark:border-white/[0.07]">
              Session Details
            </div>
            {[
              ['Available Days', tutor.availableDays],
              ['Time Slot', tutor.timeSlot],
              ['Teaching Mode', tutor.teachingMode],
              ['Hourly Fee', `$${tutor.hourlyFee}`],
              ['Slots Remaining', `${tutor.totalSlot} slots`],
              [
                'Session Start',
                new Date(tutor.sessionStartDate).toLocaleDateString(),
              ],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-white/[0.05] text-[0.84rem]"
              >
                <span className="text-slate-600 dark:text-[#9aa3be]">
                  {label}
                </span>
                <span
                  className={`font-semibold ${label === 'Hourly Fee' ? 'text-[#d4a84b]' : 'text-slate-900 dark:text-[#e8ecf4]'}`}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-[#131829] border border-slate-200 dark:border-white/[0.07] rounded-2xl p-6 h-fit shadow-sm">
            <div className="text-[0.68rem] font-semibold uppercase tracking-[2px] text-[#d4a84b] pb-3 mb-5 border-b border-slate-200 dark:border-white/[0.07]">
              📅 Book a Session
            </div>

            {[
              ['Student Name', user?.displayName],
              ['Email', user?.email],
              ['Tutor', tutor.name],
            ].map(([label, value]) => (
              <div key={label} className="mb-4">
                <label className="block text-[0.72rem] font-semibold text-slate-600 dark:text-[#9aa3be] uppercase tracking-[0.8px] mb-2">
                  {label}
                </label>
                <input
                  readOnly
                  value={value || ''}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-[#0f1424] border border-slate-200 dark:border-white/[0.08] rounded-xl text-slate-900 dark:text-[#e8ecf4] text-[0.85rem] outline-none opacity-60"
                />
              </div>
            ))}

            <div className="mb-4">
              <label className="block text-[0.72rem] font-semibold text-slate-600 dark:text-[#9aa3be] uppercase tracking-[0.8px] mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                className="w-full px-4 py-3 bg-slate-50 dark:bg-[#0f1424] border border-slate-200 dark:border-white/[0.08] rounded-xl text-slate-900 dark:text-[#e8ecf4] text-[0.85rem] outline-none focus:border-[#d4a84b]/50 transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-[#6b7694]"
              />
            </div>

            <div className="bg-emerald-50 dark:bg-[rgba(62,207,142,0.07)] border border-emerald-200 dark:border-[rgba(62,207,142,0.18)] rounded-xl px-4 py-3 flex justify-between items-center mb-5">
              <span className="text-[0.65rem] text-slate-500 dark:text-[#6b7694]">
                Session Token
              </span>
              <span className="text-[0.75rem] text-emerald-600 dark:text-[#3ecf8e] font-bold font-mono tracking-widest">
                {token}
              </span>
            </div>

            {isSlotFull && (
              <div className="bg-red-50 dark:bg-[rgba(248,113,113,0.1)] border border-red-200 dark:border-[rgba(248,113,113,0.2)] rounded-xl px-4 py-3 mb-4 text-[0.78rem] text-red-500 dark:text-[#f87171]">
                ❌ This session is fully booked.
              </div>
            )}
            {isNotStarted && !isSlotFull && (
              <div className="bg-amber-50 dark:bg-[rgba(250,189,47,0.1)] border border-amber-200 dark:border-[rgba(250,189,47,0.2)] rounded-xl px-4 py-3 mb-4 text-[0.78rem] text-amber-500 dark:text-[#fabd2f]">
                ⏳ Booking is not available yet.
              </div>
            )}

            <button
              onClick={handleBooking}
              disabled={booking || isSlotFull || isNotStarted}
              className="w-full py-3.5 rounded-xl bg-gradient-to-br from-[#d4a84b] to-[#a06a10] text-white dark:text-[#0a0e1a] text-[0.9rem] font-bold hover:opacity-90 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {booking ? 'Booking...' : 'Confirm Booking ✓'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDetailsContent;
