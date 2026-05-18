'use client';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '@/context/AuthContext';

const MyTutorsContent = () => {
  const { user } = useAuth();
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyTutors = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/my-tutors/${user.email}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
      const data = await res.json();
      setTutors(data);
    } catch {
      toast.error('Failed to load tutors!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) fetchMyTutors();
  }, [user]);

  const handleDelete = async id => {
    if (!confirm('Are you sure you want to delete this tutor?')) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tutors/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
      const data = await res.json();
      if (data.deletedCount > 0) {
        toast.success('Tutor deleted successfully!');
        setTutors(prev => prev.filter(t => t._id !== id));
      }
    } catch {
      toast.error('Delete failed!');
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
      <div className="max-w-5xl mx-auto">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[3px] text-[#d4a84b] mb-2">
          ✦ Tutor Management
        </p>
        <h1 className="font-serif text-[2rem] font-bold text-[#e8ecf4] mb-8">
          My <span className="text-[#d4a84b]">Tutors</span>
        </h1>

        {tutors.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">📭</div>
            <p className="text-[#9aa3be]">
              You haven&apos;t added any tutors yet.
            </p>
          </div>
        ) : (
          <div className="bg-[#131829] border border-white/[0.07] rounded-2xl overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[rgba(212,168,75,0.06)] border-b border-white/[0.07]">
                  {[
                    'Tutor',
                    'Subject',
                    'Fee/hr',
                    'Slots',
                    'Status',
                    'Actions',
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
                {tutors.map(t => (
                  <tr
                    key={t._id}
                    className="border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-5 py-4 text-[0.85rem] font-semibold text-[#e8ecf4]">
                      {t.name}
                    </td>
                    <td className="px-5 py-4 text-[0.75rem] font-semibold text-[#d4a84b] uppercase">
                      {t.subject}
                    </td>
                    <td className="px-5 py-4 text-[0.85rem] font-semibold text-[#d4a84b]">
                      ৳{t.hourlyFee}
                    </td>
                    <td className="px-5 py-4 text-[0.85rem] text-[#e8ecf4]">
                      {t.totalSlot}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[0.68rem] font-semibold ${
                          t.totalSlot > 0
                            ? 'bg-[rgba(62,207,142,0.1)] text-[#3ecf8e] border border-[rgba(62,207,142,0.2)]'
                            : 'bg-[rgba(248,113,113,0.1)] text-[#f87171] border border-[rgba(248,113,113,0.2)]'
                        }`}
                      >
                        ● {t.totalSlot > 0 ? 'Active' : 'Fully Booked'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button className="px-3 py-1.5 rounded-lg bg-[rgba(212,168,75,0.1)] border border-[rgba(212,168,75,0.2)] text-[#d4a84b] text-[0.75rem] font-semibold hover:opacity-80 transition-all">
                          ✏ Edit
                        </button>
                        <button
                          onClick={() => handleDelete(t._id)}
                          className="px-3 py-1.5 rounded-lg bg-[rgba(248,113,113,0.1)] border border-[rgba(248,113,113,0.2)] text-[#f87171] text-[0.75rem] font-semibold hover:opacity-80 transition-all"
                        >
                          🗑 Delete
                        </button>
                      </div>
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

export default MyTutorsContent;
