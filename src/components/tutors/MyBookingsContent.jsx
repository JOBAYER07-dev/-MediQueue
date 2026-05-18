'use client';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '@/context/AuthContext';

const statusStyle = {
  confirmed:
    'bg-[rgba(62,207,142,0.1)] text-[#3ecf8e] border border-[rgba(62,207,142,0.2)]',
  pending:
    'bg-[rgba(250,189,47,0.1)] text-[#fabd2f] border border-[rgba(250,189,47,0.2)]',
  cancelled:
    'bg-[rgba(248,113,113,0.1)] text-[#f87171] border border-[rgba(248,113,113,0.2)]',
};

const MyBookingsContent = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings/${user.email}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
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

  const handleCancel = async id => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings/${id}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
      const data = await res.json();
      if (data.modifiedCount > 0) {
        toast.success('Booking cancelled!');
        setBookings(prev =>
          prev.map(b => (b._id === id ? { ...b, status: 'cancelled' } : b)),
        );
      }
    } catch {
      toast.error('Cancel failed!');
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#d4a84b] border-t-transparent rounded-full animate-spin" />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0a0e1a] px-4 sm:px-8 lg:px-16 py-12 pt-[88px]">
      <div className="max-w-6xl mx-auto">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[3px] text-[#d4a84b] mb-2">
          ✦ Session Management
        </p>
        <h1 className="font-serif text-[2rem] font-bold text-[#e8ecf4] mb-8">
          My Booked <span className="text-[#d4a84b]">Sessions</span>
        </h1>

        {bookings.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">📭</div>
            <p className="text-[#9aa3be]">
              You haven&apos;t booked any sessions yet.
            </p>
          </div>
        ) : (
          <div className="bg-[#131829] border border-white/[0.07] rounded-2xl overflow-hidden overflow-x-auto">
            <table className="w-full border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-[rgba(212,168,75,0.06)] border-b border-white/[0.07]">
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
                    className="border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-5 py-4 text-[0.85rem] font-semibold text-[#e8ecf4]">
                      {b.tutorName}
                    </td>
                    <td className="px-5 py-4 text-[0.82rem] text-[#e8ecf4]">
                      {b.studentName}
                    </td>
                    <td className="px-5 py-4 text-[0.75rem] text-[#9aa3be]">
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
                        onClick={() => handleCancel(b._id)}
                        disabled={b.status === 'cancelled'}
                        className="px-3 py-1.5 rounded-lg bg-[rgba(248,113,113,0.1)] border border-[rgba(248,113,113,0.2)] text-[#f87171] text-[0.75rem] font-semibold hover:opacity-80 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
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
    </div>
  );
};

export default MyBookingsContent;
