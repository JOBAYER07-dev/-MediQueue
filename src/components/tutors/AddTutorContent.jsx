'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useAuth } from '@/context/AuthContext';

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

const AddTutorContent = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;

    const tutor = {
      name: form.name.value,
      photo: form.photo.value,
      subject: form.subject.value,
      availableDays: form.availableDays.value,
      timeSlot: form.timeSlot.value,
      hourlyFee: Number(form.hourlyFee.value),
      totalSlot: Number(form.totalSlot.value),
      sessionStartDate: new Date(form.sessionStartDate.value),
      institution: form.institution.value,
      experience: form.experience.value,
      location: form.location.value,
      teachingMode: form.teachingMode.value,
      userEmail: user.email,
      userName: user.displayName,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tutors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(tutor),
      });
      const data = await res.json();
      if (data.insertedId) {
        toast.success('Tutor added successfully!');
        form.reset();
        router.push('/my-tutors');
      }
    } catch {
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3 bg-slate-50 dark:bg-[#0f1424] border border-slate-200 dark:border-white/[0.08] rounded-xl text-slate-900 dark:text-[#e8ecf4] text-[0.88rem] outline-none focus:border-[#d4a84b]/50 transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-[#6b7694]';
  const labelClass =
    'block text-[0.72rem] font-semibold text-slate-600 dark:text-[#9aa3be] uppercase tracking-[0.8px] mb-2';

  const sections = [
    {
      title: 'Basic Information',
      fields: [
        {
          label: 'Tutor Name',
          name: 'name',
          placeholder: 'e.g. Dr. Arif Rahman',
        },
        {
          label: 'Photo URL',
          name: 'photo',
          placeholder: 'https://i.ibb.co/...',
        },
        { label: 'Subject', name: 'subject', select: subjects },
        {
          label: 'Hourly Fee (৳)',
          name: 'hourlyFee',
          type: 'number',
          placeholder: 'e.g. 600',
        },
      ],
    },
    {
      title: 'Availability',
      fields: [
        {
          label: 'Available Days',
          name: 'availableDays',
          placeholder: 'e.g. Sun – Thu',
        },
        {
          label: 'Time Slot',
          name: 'timeSlot',
          placeholder: 'e.g. 5:00 PM – 8:00 PM',
        },
        {
          label: 'Total Slots',
          name: 'totalSlot',
          type: 'number',
          placeholder: 'e.g. 20',
        },
        { label: 'Session Start Date', name: 'sessionStartDate', type: 'date' },
      ],
    },
    {
      title: 'Other Details',
      fields: [
        {
          label: 'Institution',
          name: 'institution',
          placeholder: 'e.g. Dhaka University',
        },
        {
          label: 'Experience',
          name: 'experience',
          placeholder: 'e.g. 5 years',
        },
        {
          label: 'Location',
          name: 'location',
          placeholder: 'e.g. Dhanmondi, Dhaka',
        },
        { label: 'Teaching Mode', name: 'teachingMode', select: modes },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0e1a] px-4 sm:px-8 lg:px-16 py-12 pt-[88px] transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[3px] text-[#d4a84b] mb-2">
          ✦ Tutor Management
        </p>
        <h1 className="font-serif text-[2rem] font-bold text-slate-900 dark:text-[#e8ecf4] mb-1">
          Add a New <span className="text-[#d4a84b]">Tutor</span>
        </h1>
        <p className="text-[0.85rem] text-slate-500 dark:text-[#6b7694] mb-8">
          Fill in the details below to create a new tutor listing.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="bg-white dark:bg-[#131829] border border-slate-200 dark:border-white/[0.07] rounded-2xl p-8 flex flex-col gap-8 shadow-sm">
            {sections.map(sec => (
              <div key={sec.title}>
                <div className="text-[0.68rem] font-semibold uppercase tracking-[2px] text-[#d4a84b] pb-3 mb-5 border-b border-slate-200 dark:border-white/[0.07]">
                  {sec.title}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {sec.fields.map(f => (
                    <div key={f.name}>
                      <label className={labelClass}>{f.label}</label>
                      {f.select ? (
                        <select
                          name={f.name}
                          required
                          className={
                            inputClass + ' cursor-pointer appearance-none'
                          }
                        >
                          {f.select.map(o => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          name={f.name}
                          type={f.type || 'text'}
                          required
                          placeholder={f.placeholder}
                          className={inputClass}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-br from-[#d4a84b] to-[#a06a10] text-white dark:text-[#0a0e1a] text-[0.9rem] font-bold shadow-[0_6px_20px_rgba(212,168,75,.3)] hover:opacity-90 transition-all duration-200 disabled:opacity-60"
            >
              {loading ? 'Submitting...' : '✓ Submit Tutor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTutorContent;
