'use client';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '@/context/AuthContext';
import { Button, Modal } from '@heroui/react'; 

const subjects = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'English',
  'Computer Science',
  'Economics',
  'Fine Arts',
];
const modes = ['Online', 'Offline', 'Both'];

const MyTutorsContent = () => {
  const { user } = useAuth();
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editTutor, setEditTutor] = useState(null);

  
  const [deleteId, setDeleteId] = useState(null);

  const fetchMyTutors = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/my-tutors/${user.email}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
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

  
  const executeDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tutors/${deleteId}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        },
      );
      const data = await res.json();
      if (data.deletedCount > 0) {
        toast.success('Tutor deleted successfully!');
        setTutors(prev => prev.filter(t => t._id !== deleteId));
      }
    } catch {
      toast.error('Delete failed!');
    } finally {
      setDeleteId(null); 
    }
  };

  const handleUpdate = async e => {
    e.preventDefault();
    const form = e.target;
    const updated = {
      name: form.name.value,
      photo: form.photo.value,
      subject: form.subject.value,
      availableDays: form.availableDays.value,
      timeSlot: form.timeSlot.value,
      hourlyFee: Number(form.hourlyFee.value),
      totalSlot: Number(form.totalSlot.value),
      institution: form.institution.value,
      experience: form.experience.value,
      location: form.location.value,
      teachingMode: form.teachingMode.value,
    };
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tutors/${editTutor._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(updated),
        },
      );
      const data = await res.json();
      if (data.modifiedCount > 0) {
        toast.success('Tutor updated successfully!');
        setTutors(prev =>
          prev.map(t => (t._id === editTutor._id ? { ...t, ...updated } : t)),
        );
        setEditTutor(null);
      }
    } catch {
      toast.error('Update failed!');
    }
  };

  const inputClass =
    'w-full px-3 py-2.5 bg-slate-50 dark:bg-[#0f1424] border border-slate-200 dark:border-white/[0.08] rounded-xl text-slate-900 dark:text-[#e8ecf4] text-[0.85rem] outline-none focus:border-[#d4a84b]/50 transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-[#6b7694]';
  const labelClass =
    'block text-[0.68rem] font-semibold text-slate-600 dark:text-[#9aa3be] uppercase tracking-[0.8px] mb-1.5';

  if (loading)
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0a0e1a] flex items-center justify-center transition-colors duration-300">
        <div className="w-10 h-10 border-2 border-[#d4a84b] border-t-transparent rounded-full animate-spin" />
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0e1a] px-4 sm:px-8 lg:px-16 py-12 pt-[88px] transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[3px] text-[#d4a84b] mb-2">
          ✦ Tutor Management
        </p>
        <h1 className="font-serif text-[2rem] font-bold text-slate-900 dark:text-[#e8ecf4] mb-8">
          My <span className="text-[#d4a84b]">Tutors</span>
        </h1>

        {tutors.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">📭</div>
            <p className="text-slate-500 dark:text-[#9aa3be]">
              You haven&apos;t added any tutors yet.
            </p>
          </div>
        ) : (
          <div className="bg-white dark:bg-[#131829] border border-slate-200 dark:border-white/[0.07] rounded-2xl overflow-hidden overflow-x-auto shadow-sm">
            <table className="w-full border-collapse min-w-[650px]">
              <thead>
                <tr className="bg-amber-50 dark:bg-[rgba(212,168,75,0.06)] border-b border-slate-200 dark:border-white/[0.07]">
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
                    className="border-b border-slate-100 dark:border-white/[0.05] hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-5 py-4 text-[0.85rem] font-semibold text-slate-900 dark:text-[#e8ecf4]">
                      {t.name}
                    </td>
                    <td className="px-5 py-4 text-[0.75rem] font-semibold text-[#d4a84b] uppercase">
                      {t.subject}
                    </td>
                    <td className="px-5 py-4 text-[0.85rem] font-semibold text-[#d4a84b]">
                      ৳{t.hourlyFee}
                    </td>
                    <td className="px-5 py-4 text-[0.85rem] text-slate-900 dark:text-[#e8ecf4]">
                      {t.totalSlot}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[0.68rem] font-semibold ${
                          t.totalSlot > 0
                            ? 'bg-emerald-50 dark:bg-[rgba(62,207,142,0.1)] text-emerald-600 dark:text-[#3ecf8e] border border-emerald-200 dark:border-[rgba(62,207,142,0.2)]'
                            : 'bg-red-50 dark:bg-[rgba(248,113,113,0.1)] text-red-500 dark:text-[#f87171] border border-red-200 dark:border-[rgba(248,113,113,0.2)]'
                        }`}
                      >
                        ● {t.totalSlot > 0 ? 'Active' : 'Fully Booked'}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditTutor(t)}
                          className="px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-[rgba(212,168,75,0.1)] border border-amber-200 dark:border-[rgba(212,168,75,0.2)] text-[#d4a84b] text-[0.75rem] font-semibold hover:opacity-80 transition-all"
                        >
                          ✏ Edit
                        </button>
                        <button
                          onClick={() => setDeleteId(t._id)} 
                          className="px-3 py-1.5 rounded-lg bg-red-50 dark:bg-[rgba(248,113,113,0.1)] border border-red-200 dark:border-[rgba(248,113,113,0.2)] text-red-500 dark:text-[#f87171] text-[0.75rem] font-semibold hover:opacity-80 transition-all"
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

      {/*  UPDATE MODAL  */}
      {editTutor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#131829] border border-slate-200 dark:border-white/[0.07] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4a84b] to-transparent rounded-t-2xl" />

            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-serif text-[1.3rem] font-bold text-slate-900 dark:text-[#e8ecf4]">
                  Edit <span className="text-[#d4a84b]">Tutor</span>
                </h2>
                <button
                  onClick={() => setEditTutor(null)}
                  className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.08] text-slate-500 dark:text-[#9aa3be] hover:text-[#f87171] flex items-center justify-center text-lg transition-all"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleUpdate}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      label: 'Tutor Name',
                      name: 'name',
                      default: editTutor.name,
                    },
                    {
                      label: 'Photo URL',
                      name: 'photo',
                      default: editTutor.photo,
                    },
                    {
                      label: 'Available Days',
                      name: 'availableDays',
                      default: editTutor.availableDays,
                    },
                    {
                      label: 'Time Slot',
                      name: 'timeSlot',
                      default: editTutor.timeSlot,
                    },
                    {
                      label: 'Hourly Fee (৳)',
                      name: 'hourlyFee',
                      type: 'number',
                      default: editTutor.hourlyFee,
                    },
                    {
                      label: 'Total Slots',
                      name: 'totalSlot',
                      type: 'number',
                      default: editTutor.totalSlot,
                    },
                    {
                      label: 'Institution',
                      name: 'institution',
                      default: editTutor.institution,
                    },
                    {
                      label: 'Experience',
                      name: 'experience',
                      default: editTutor.experience,
                    },
                    {
                      label: 'Location',
                      name: 'location',
                      default: editTutor.location,
                    },
                  ].map(f => (
                    <div key={f.name}>
                      <label className={labelClass}>{f.label}</label>
                      <input
                        name={f.name}
                        type={f.type || 'text'}
                        defaultValue={f.default}
                        required
                        className={inputClass}
                      />
                    </div>
                  ))}

                  <div>
                    <label className={labelClass}>Subject</label>
                    <select
                      name="subject"
                      defaultValue={editTutor.subject}
                      className={inputClass + ' cursor-pointer'}
                    >
                      {subjects.map(s => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>Teaching Mode</label>
                    <select
                      name="teachingMode"
                      defaultValue={editTutor.teachingMode}
                      className={inputClass + ' cursor-pointer'}
                    >
                      {modes.map(m => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-gradient-to-br from-[#d4a84b] to-[#a06a10] text-white dark:text-[#0a0e1a] text-[0.88rem] font-bold hover:opacity-90 transition-all"
                  >
                    Save Changes ✓
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditTutor(null)}
                    className="px-6 py-3 rounded-xl border border-slate-300 dark:border-white/[0.12] text-slate-600 dark:text-[#9aa3be] text-[0.88rem] font-medium hover:border-[#d4a84b]/30 hover:text-[#d4a84b] transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/*  HERO-UI DELETE CONFIRMATION MODAL  */}
      <Modal
        isOpen={!!deleteId}
        onOpenChange={isOpen => !isOpen && setDeleteId(null)}
      >
        <Modal.Backdrop
          className="bg-gradient-to-t from-black/80 via-black/40 to-transparent dark:from-[#0a0e1a]/80 dark:via-[#0a0e1a]/40"
          variant="blur"
        >
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-[360px] bg-white dark:bg-[#131829] border border-slate-200 dark:border-white/[0.07] rounded-2xl">
              <Modal.Header className="flex flex-col items-center text-center pt-8">
                <Modal.Icon className="w-14 h-14 rounded-full bg-red-50 dark:bg-[rgba(248,113,113,0.1)] text-red-500 dark:text-[#f87171] flex items-center justify-center mb-3">
                  <span className="text-2xl">⚠️</span>
                </Modal.Icon>
                <Modal.Heading className="font-serif text-[1.4rem] font-bold text-slate-900 dark:text-[#e8ecf4]">
                  Delete Tutor?
                </Modal.Heading>
              </Modal.Header>

              <Modal.Body className="pb-6">
                <p className="text-center text-slate-600 dark:text-[#9aa3be] text-[0.88rem] leading-relaxed">
                  Are you sure you want to delete this tutor? This action cannot
                  be undone.
                </p>
              </Modal.Body>

              <Modal.Footer className="flex-col-reverse gap-2 pb-8 px-6">
                <Button
                  className="w-full bg-slate-100 dark:bg-white/[0.05] text-slate-700 dark:text-[#9aa3be] font-semibold py-3.5 rounded-xl border border-transparent hover:border-slate-300 dark:hover:border-white/[0.12]"
                  slot="close"
                  onPress={() => setDeleteId(null)}
                >
                  Cancel
                </Button>
                <Button
                  className="w-full bg-red-500 text-white font-bold py-3.5 rounded-xl shadow-[0_4px_14px_rgba(239,68,68,0.3)] hover:bg-red-600 transition-colors"
                  onPress={executeDelete}
                >
                  Yes, Delete
                </Button>
              </Modal.Footer>

              <Modal.CloseTrigger className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-white/[0.05] transition-all" />
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export default MyTutorsContent;
