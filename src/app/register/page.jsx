'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import {
  FiUser,
  FiMail,
  FiLock,
  FiImage,
  FiEye,
  FiEyeOff,
} from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '@/context/AuthContext';

const RegisterPage = () => {
  const { register, updateUserProfile, googleLogin } = useAuth();
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passError, setPassError] = useState('');

  const validatePassword = password => {
    if (password.length < 6) return 'Password must be at least 6 characters';
    if (!/[A-Z]/.test(password)) return 'Must have an uppercase letter';
    if (!/[a-z]/.test(password)) return 'Must have a lowercase letter';
    return '';
  };

  const handleRegister = async e => {
    e.preventDefault();
    setLoading(true);
    setPassError('');

    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;

    const error = validatePassword(password);
    if (error) {
      setPassError(error);
      setLoading(false);
      return;
    }

    try {
      await register(email, password);
      await updateUserProfile(name, photo);
      toast.success('Registration successful! 🎉');
      router.push('/login');
    } catch (err) {
      toast.error(err.message || 'Registration failed!');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await googleLogin();
      toast.success('Login successful! 🎉');
      router.push('/');
    } catch (err) {
      toast.error(err.message || 'Google login failed!');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full pl-10 pr-4 py-3 bg-[#0f1424] border border-white/[0.08] rounded-xl text-[#e8ecf4] text-[0.88rem] outline-none focus:border-[#d4a84b]/50 transition-all duration-200 placeholder:text-[#6b7694]';

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#131829] border border-white/[0.07] rounded-2xl p-8 relative overflow-hidden">
        {/* top shimmer */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4a84b] to-transparent" />

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-[1.9rem] font-bold text-[#e8ecf4] mb-1">
            Create Account ✨
          </h1>
          <p className="text-[0.82rem] text-[#6b7694]">
            Join MediQueue and start learning today
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="flex flex-col gap-5">
          {/* Name */}
          <div>
            <label className="block text-[0.72rem] font-semibold text-[#9aa3be] uppercase tracking-[0.8px] mb-2">
              Full Name
            </label>
            <div className="relative">
              <FiUser
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6b7694]"
              />
              <input
                name="name"
                type="text"
                required
                placeholder="Your full name"
                className={inputClass}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-[0.72rem] font-semibold text-[#9aa3be] uppercase tracking-[0.8px] mb-2">
              Email Address
            </label>
            <div className="relative">
              <FiMail
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6b7694]"
              />
              <input
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-[0.72rem] font-semibold text-[#9aa3be] uppercase tracking-[0.8px] mb-2">
              Photo URL
            </label>
            <div className="relative">
              <FiImage
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6b7694]"
              />
              <input
                name="photo"
                type="text"
                placeholder="https://i.ibb.co/..."
                className={inputClass}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-[0.72rem] font-semibold text-[#9aa3be] uppercase tracking-[0.8px] mb-2">
              Password
            </label>
            <div className="relative">
              <FiLock
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6b7694]"
              />
              <input
                name="password"
                type={showPass ? 'text' : 'password'}
                required
                placeholder="Min 6 chars, upper & lower"
                className={`${inputClass} pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6b7694] hover:text-[#d4a84b]"
              >
                {showPass ? <FiEyeOff size={15} /> : <FiEye size={15} />}
              </button>
            </div>
            {/* Password rules */}
            <div className="mt-2 flex flex-col gap-1">
              {['Uppercase letter', 'Lowercase letter', 'Min 6 characters'].map(
                rule => (
                  <span key={rule} className="text-[0.68rem] text-[#6b7694]">
                    ✓ {rule}
                  </span>
                ),
              )}
            </div>
            {passError && (
              <p className="text-[0.75rem] text-red-400 mt-2">{passError}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-br from-[#d4a84b] to-[#a06a10] text-[#0a0e1a] text-[0.9rem] font-bold shadow-[0_6px_20px_rgba(212,168,75,.3)] hover:opacity-90 transition-all duration-200 disabled:opacity-60"
          >
            {loading ? 'Registering...' : 'Register →'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-white/[0.07]" />
          <span className="text-[0.72rem] text-[#6b7694]">
            or continue with
          </span>
          <div className="flex-1 h-px bg-white/[0.07]" />
        </div>

        {/* Google */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#e8ecf4] text-[0.85rem] font-medium flex items-center justify-center gap-2 hover:border-[#d4a84b]/30 transition-all duration-200 disabled:opacity-60"
        >
          <FcGoogle size={18} />
          Continue with Google
        </button>

        {/* Login link */}
        <p className="text-center text-[0.8rem] text-[#6b7694] mt-6">
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-[#d4a84b] font-semibold hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
