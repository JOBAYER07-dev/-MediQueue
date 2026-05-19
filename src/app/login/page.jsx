'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '@/context/AuthContext';

const LoginPage = () => {
  const { login, googleLogin } = useAuth();
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async e => {
    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await login(email, password);
      toast.success('Login successful!');
      router.push('/');
    } catch (err) {
      toast.error(err.message || 'Login failed!');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await googleLogin();
      toast.success('Login successful!');
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
            Welcome Back 👋
          </h1>
          <p className="text-[0.82rem] text-[#6b7694]">
            Log in to your MediQueue account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
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

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-[0.72rem] font-semibold text-[#9aa3be] uppercase tracking-[0.8px]">
                Password
              </label>
              <button
                type="button"
                className="text-[0.72rem] text-[#d4a84b] hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <FiLock
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6b7694]"
              />
              <input
                name="password"
                type={showPass ? 'text' : 'password'}
                required
                placeholder="••••••••"
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
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-br from-[#d4a84b] to-[#a06a10] text-[#0a0e1a] text-[0.9rem] font-bold shadow-[0_6px_20px_rgba(212,168,75,.3)] hover:opacity-90 transition-all duration-200 disabled:opacity-60"
          >
            {loading ? 'Logging in...' : 'Login →'}
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

        {/* Register link */}
        <p className="text-center text-[0.8rem] text-[#6b7694] mt-6">
          Don&apos;t have an account?{' '}
          <Link
            href="/register"
            className="text-[#d4a84b] font-semibold hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
