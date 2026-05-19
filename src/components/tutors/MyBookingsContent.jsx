'use client';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '@/context/AuthContext';

const statusStyle = {
  confirmed:
    'bg-emerald-50 dark:bg-[rgba(62,207,142,0.1)] text-emerald-600 dark:text-[#3ecf8e] border border-emerald-200 dark:border-[rgba(62,207,142,0.2)]',
  pending:
    'bg-amber-50 dark:bg-[rgba(250,189,47,0.1)] text-amber-500 dark:text-[#fabd2f] border border-amber-200 dark:border-[rgba(250,189,47,0.2)]',
  cancelled:
    'bg-red-50 dark:bg-[rgba(248,113,113,0.1)] text-red-500 dark:text-[#f87171] border border-red-200 dark:border-[rgba(248,113,113,0.2)]',
};

const MyBookingsContent = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelId, setCancelId] = useState(null);

  const fetchBookings = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings/${user.email}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        },
      );
      const data = await res.json();
      setBookings(data);
    } catch {
      toast.error('Failed to load bookings!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) fetchBookings();
  }, [user]);

  const handleCancel = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings/${cancelId}`,
        {
          method: 'PATCH',
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        },
      );
      const data = await res.json();
      if (data.modifiedCount > 0) {
        toast.success('Booking cancelled!');
        setBookings(prev =>
          prev.map(b =>
            b._id === cancelId ? { ...b, status: 'cancelled' } : b,
          ),
        );
        setCancelId(null);
      }
    } catch {
      toast.error('Cancel failed!');
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0a0e1a] flex items-center justify-center transition-colors duration-300">
        <div className="w-10 h-10 border-2 border-[#d4a84b] border-t-transparent rounded-full animate-spin" />
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0e1a] px-4 sm:px-8 lg:px-16 py-12 pt-[88px] transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[3px] text-[#d4a84b] mb-2">
          ✦ Session Management
        </p>
        <h1 className="font-serif text-[2rem] font-bold text-slate-900 dark:text-[#e8ecf4] mb-8">
          My Booked <span className="text-[#d4a84b]">Sessions</span>
        </h1>
        {bookings.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">📭</div>
            <p className="text-slate-600 dark:text-[#9aa3be]">
              You haven&apos;t booked any sessions yet.
            </p>
          </div>
        ) : (
          <div className="bg-white dark:bg-[#131829] border border-slate-200 dark:border-white/[0.07] rounded-2xl overflow-hidden overflow-x-auto shadow-sm">
            <table className="w-full border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-amber-50 dark:bg-[rgba(212,168,75,0.06)] border-b border-slate-200 dark:border-white/[0.07]">
                  {[
                    'Tutor',
                    'Student',
                    'Email',
                    'Token',
                    'Status',
                    'Action',
                  ].map(h => (
                    <th
                      key={h}
                      className="px-5 py-4 text-left text-[0.7rem] font-semibold uppercase tracking-[1.2px] text-[#d4a84b]"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookings.map(b => (
                  <tr
                    key={b._id}
                    className="border-b border-slate-100 dark:border-white/[0.05] hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-5 py-4 text-[0.85rem] font-semibold text-slate-900 dark:text-[#e8ecf4]">
                      {b.tutorName}
                    </td>
                    <td className="px-5 py-4 text-[0.82rem] text-slate-900 dark:text-[#e8ecf4]">
                      {b.studentName}
                    </td>
                    <td className="px-5 py-4 text-[0.75rem] text-slate-600 dark:text-[#9aa3be]">
                      {b.studentEmail}
                    </td>
                    <td className="px-5 py-4 font-mono text-[0.75rem] text-[#3ecf8e]">
                      {b.sessionToken}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[0.68rem] font-semibold ${statusStyle[b.status] || statusStyle.pending}`}
                      >
                        ●{' '}
                        {b.status?.charAt(0).toUpperCase() + b.status?.slice(1)}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => setCancelId(b._id)}
                        disabled={b.status === 'cancelled'}
                        className="px-3 py-1.5 rounded-lg bg-red-50 dark:bg-[rgba(248,113,113,0.1)] border border-red-200 dark:border-[rgba(248,113,113,0.2)] text-red-500 dark:text-[#f87171] text-[0.75rem] font-semibold hover:opacity-80 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/*  CANCEL CONFIRMATION MODAL  */}
      {cancelId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#131829] border border-slate-200 dark:border-white/[0.07] rounded-2xl p-8 w-full max-w-sm text-center relative">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#f87171] to-transparent rounded-t-2xl" />
            <div className="text-4xl mb-4">⚠️</div>
            <h3 className="font-serif text-[1.2rem] font-bold text-slate-900 dark:text-[#e8ecf4] mb-2">
              Cancel Booking?
            </h3>
            <p className="text-[0.82rem] text-slate-600 dark:text-[#9aa3be] mb-6 leading-relaxed">
              Are you sure you want to cancel this session? This action cannot
              be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="flex-1 py-3 rounded-xl bg-red-50 dark:bg-[rgba(248,113,113,0.15)] border border-red-200 dark:border-[rgba(248,113,113,0.3)] text-red-500 dark:text-[#f87171] text-[0.88rem] font-bold hover:opacity-80 transition-all"
              >
                Yes, Cancel
              </button>
              <button
                onClick={() => setCancelId(null)}
                className="flex-1 py-3 rounded-xl border border-slate-300 dark:border-white/[0.12] text-slate-600 dark:text-[#9aa3be] text-[0.88rem] font-medium hover:border-[#d4a84b]/30 hover:text-[#d4a84b] transition-all"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookingsContent;
