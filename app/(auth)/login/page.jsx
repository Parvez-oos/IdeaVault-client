"use client";

import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff, Mail, Lock, Sparkles, Lightbulb } from "lucide-react"; // Added Lightbulb

export default function Login() {
  const { loginUser, googleLogin } = useContext(AuthContext);
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    loginUser(email, password)
      .then(() => {
        toast.success("Welcome Back!");
        router.push("/");
      })
      .catch((err) => toast.error(err.message));
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      toast.success("Logged in with Google");
      router.push("/");
    } catch (err) {
      toast.error(err.message || "Google login failed");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070B1A] flex items-center justify-center px-4 py-10">

      <div className="absolute top-30 left-30 w-75 h-75 bg-violet-600/30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-30 right-30 w-75 h-75 bg-cyan-500/30 blur-3xl rounded-full"></div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px]" />

      <div className="relative z-10 w-full max-w-5xl grid lg:grid-cols-2 rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">

        <div className="hidden lg:flex flex-col justify-between p-12 bg-linear-to-br from-violet-600/20 to-cyan-500/10 border-r border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="text-violet-400" size={28} />
              <h1 className="text-3xl font-bold text-white">IdeaVault</h1>
            </div>
            <h2 className="text-5xl font-black leading-tight text-white">Welcome<br />Back.</h2>
            <p className="text-gray-300 mt-6 text-lg leading-relaxed">
              Login and continue building your amazing ideas, projects and creativity with modern experience.
            </p>
          </div>

          {/* BEAUTIFUL FLOATING ANIMATION INSTEAD OF TEXT CARDS */}
          <div className="relative flex items-center justify-center h-48 mt-8">
            {/* Outer rotating dashed ring */}
            <div className="absolute w-40 h-40 rounded-full border-2 border-dashed border-violet-500/30 animate-[spin_10s_linear_infinite]" />
            {/* Inner pulsing ring */}
            <div className="absolute w-28 h-28 rounded-full border border-cyan-500/50 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
            {/* Central Floating Card */}
            <div className="relative z-10 w-20 h-20 bg-linear-to-tr from-violet-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(139,92,246,0.6)] animate-[bounce_3s_ease-in-out_infinite]">
              <Lightbulb size={40} className="text-white drop-shadow-lg" />
            </div>
            {/* Small floating particles */}
            <div className="absolute top-4 left-8 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <div className="absolute bottom-8 right-6 w-3 h-3 bg-violet-400 rounded-full animate-pulse delay-75" />
          </div>
        </div>

        <div className="p-8 md:p-12 bg-[#0D1324]/80">

          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-4xl font-black text-white mb-2">Login</h2>
            <p className="text-gray-400">Continue your journey with IdeaVault</p>
          </div>

          <button
            type="button"
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 py-3 text-white font-medium"
          >
            <FcGoogle size={22} />
            Continue with Google
          </button>

          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-white/10"></div>
            <span className="text-xs text-gray-400">OR CONTINUE</span>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-sm text-gray-300 mb-2 block">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white placeholder:text-gray-500 outline-none focus:border-violet-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-2 block">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-12 text-white placeholder:text-gray-500 outline-none focus:border-violet-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                <input type="checkbox" className="accent-violet-500" /> Remember me
              </label>
              <button type="button" className="text-violet-400 hover:text-violet-300 transition">Forgot Password?</button>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-linear-to-r from-violet-600 to-cyan-500 text-white font-bold text-sm hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-violet-500/20"
            >
              Login Now
            </button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-8">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-violet-400 hover:text-violet-300 font-semibold">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}