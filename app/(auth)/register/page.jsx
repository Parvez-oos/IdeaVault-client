"use client";

import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff, Mail, Lock, User, ImageIcon, CheckCircle2, Sparkles } from "lucide-react";

export default function Register() {
  const { createUser, updateUserProfile, googleLogin } = useContext(AuthContext);
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validations = {
    length: password.length >= 6,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;

    if (!validations.length || !validations.upper || !validations.lower) {
      toast.error("Please meet all password requirements.");
      return;
    }

    createUser(email, password)
      .then(() => {
        updateUserProfile(name, photo).then(() => {
          toast.success("Account Created!");
          router.push("/");
        });
      })
      .catch((err) => toast.error(err.message));
  };

  
  const handleGoogle = async () => {
    try {
      await googleLogin();
      toast.success("Registered successfully with Google!");
      router.push("/");
    } catch (err) {
      toast.error(err.message || "Google registration failed");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070B1A] flex items-center justify-center px-4 py-10">

      {/* Background */}

      <div className="absolute top-30 left-30 w-75 h-75 bg-violet-600/30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-30 right-30 w-75 h-75 bg-cyan-500/30 blur-3xl rounded-full"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[40px_40px]" />

      <div className="relative z-10 w-full max-w-5xl grid lg:grid-cols-2 rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">

        {/* Left Side */}

        <div className="hidden lg:flex flex-col justify-between p-12 bg-linear-to-br from-cyan-500/10 to-violet-600/20 border-r border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="text-cyan-400" size={28} />
              <h1 className="text-3xl font-bold text-white">IdeaVault</h1>
            </div>
            <h2 className="text-5xl font-black leading-tight text-white">Start<br />Your Journey.</h2>
            <p className="text-gray-300 mt-6 text-lg leading-relaxed">
              Create your account and explore a modern, beautiful and powerful idea sharing platform.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <p className="text-sm text-gray-300">🚀 Fast & secure registration</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <p className="text-sm text-gray-300">🎨 Beautiful futuristic interface</p>
            </div>
          </div>
        </div>

        {/* Right Side */}

        <div className="p-8 md:p-12 bg-[#0D1324]/80">

          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-4xl font-black text-white mb-2">Register</h2>
            <p className="text-gray-400">Create your IdeaVault account</p>
          </div>

          
          <button
            type="button"
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 py-3 text-white font-medium"
          >
            <FcGoogle size={22} />
            Continue with Google
          </button>

          {/* Divider */}

          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-white/10"></div>
            <span className="text-xs text-gray-400">CREATE ACCOUNT</span>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            
            <div>
              <label className="text-sm text-gray-300 mb-2 block">Full Name</label>
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text" name="name" placeholder="Enter your full name" required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white placeholder:text-gray-500 outline-none focus:border-cyan-500 transition"
                />
              </div>
            </div>

            
            <div>
              <label className="text-sm text-gray-300 mb-2 block">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email" name="email" placeholder="Enter your email" required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white placeholder:text-gray-500 outline-none focus:border-cyan-500 transition"
                />
              </div>
            </div>

            
            <div>
              <label className="text-sm text-gray-300 mb-2 block">Photo URL</label>
              <div className="relative">
                <ImageIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="url" name="photo" placeholder="https://example.com/photo.jpg"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white placeholder:text-gray-500 outline-none focus:border-cyan-500 transition"
                />
              </div>
            </div>

           
            <div>
              <label className="text-sm text-gray-300 mb-2 block">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password" required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-12 text-white placeholder:text-gray-500 outline-none focus:border-cyan-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Validation */}

              <div className="mt-4 space-y-2">
                <p className={`text-xs flex items-center gap-2 ${validations.length ? "text-green-400" : "text-gray-400"}`}>
                  <CheckCircle2 size={14} /> At least 6 characters
                </p>
                <p className={`text-xs flex items-center gap-2 ${validations.upper ? "text-green-400" : "text-gray-400"}`}>
                  <CheckCircle2 size={14} /> One uppercase letter
                </p>
                <p className={`text-xs flex items-center gap-2 ${validations.lower ? "text-green-400" : "text-gray-400"}`}>
                  <CheckCircle2 size={14} /> One lowercase letter
                </p>
              </div>
            </div>

            {/* Register */}

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-linear-to-r from-cyan-500 to-violet-600 text-white font-bold text-sm hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-cyan-500/20"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-8">
            Already have an account?{" "}
            <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}