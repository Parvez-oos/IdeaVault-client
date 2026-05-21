"use client";

import { useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  Rocket,
  Lightbulb,
  FileText,
  Layers3,
  Tag,
  ImageIcon,
  Wallet,
  Users,
  CircleHelp,
  PencilLine,
  ShieldCheck,
  SendHorizonal,
} from "lucide-react";

export default function AddIdea() {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const ideaData = {
      title: form.title.value,
      shortDescription: form.shortDesc.value,
      detailedDescription: form.detailedDesc.value,
      category: form.category.value,
      tags: form.tags.value,
      imageURL: form.image.value,
      estimatedBudget: form.budget.value,
      targetAudience: form.audience.value,
      problemStatement: form.problem.value,
      proposedSolution: form.solution.value,
      authorName: user?.displayName,
      authorEmail: user?.email,
    };

    try {
      await axiosSecure.post("/ideas", ideaData);

      toast.success("Idea Submitted Successfully!");
      router.push("/my-ideas");
    } catch (error) {
      toast.error("Failed to submit idea.");
    }
  };

  const labelStyle =
    "text-sm font-semibold text-[#1e1b4b] dark:text-white mb-2 block";

  const inputStyle =
    "w-full rounded-2xl border border-[#e7e5ff] dark:border-white/10 bg-white/70 dark:bg-white/5 px-4 py-3 text-sm outline-none transition-all duration-300 focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 placeholder:text-gray-400";

  return (
    <div className="min-h-screen bg-[#f7f4ff] dark:bg-[#050816] overflow-hidden relative">
      {/* Background Blur */}
      <div className="absolute top-30 left-30 h-75 w-75 bg-violet-400/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-30 right-30 h-75 w-75 bg-fuchsia-400/20 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto px-5 py-14 relative z-10">
        <div className="grid lg:grid-cols-[340px_1fr] gap-8">
          {/* LEFT PANEL */}
          <div className="rounded-4xl bg-linear-to-b from-[#faf7ff] to-[#f3eeff] dark:from-white/5 dark:to-white/3 border border-white/50 dark:border-white/10 p-8 shadow-xl">
            {/* Top Icon */}
            <div className="h-24 w-24 rounded-full bg-white shadow-lg flex items-center justify-center mx-auto mb-8 relative">
              <div className="absolute h-full w-full rounded-full bg-violet-500/10 animate-ping"></div>

              <Lightbulb className="h-10 w-10 text-violet-600 relative z-10" />
            </div>

            <h1 className="text-5xl font-black leading-tight text-[#111827] dark:text-white mb-4">
              Add New Idea
            </h1>

            <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mb-10">
              Share your startup idea with the world
            </p>

            {/* Feature List */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="h-14 w-14 rounded-2xl bg-violet-100 flex items-center justify-center">
                  <Rocket className="text-violet-600 h-6 w-6" />
                </div>

                <div>
                  <h3 className="font-bold text-[#111827] dark:text-white mb-1">
                    Share Your Vision
                  </h3>

                  <p className="text-sm text-gray-500 leading-relaxed">
                    Present your idea to a global community of innovators.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-14 w-14 rounded-2xl bg-blue-100 flex items-center justify-center">
                  <Users className="text-blue-600 h-6 w-6" />
                </div>

                <div>
                  <h3 className="font-bold text-[#111827] dark:text-white mb-1">
                    Get Valuable Feedback
                  </h3>

                  <p className="text-sm text-gray-500 leading-relaxed">
                    Receive constructive feedback from experts and peers.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-14 w-14 rounded-2xl bg-emerald-100 flex items-center justify-center">
                  <ShieldCheck className="text-emerald-600 h-6 w-6" />
                </div>

                <div>
                  <h3 className="font-bold text-[#111827] dark:text-white mb-1">
                    Make an Impact
                  </h3>

                  <p className="text-sm text-gray-500 leading-relaxed">
                    Turn your idea into something that changes the world.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Illustration */}
            <div className="mt-16 relative flex justify-center">
              <div className="absolute h-40 w-40 rounded-full bg-violet-400/20 blur-3xl"></div>

{/* Floating Premium 3D Illustration */}
<div className="mt-16 relative flex justify-center items-center min-h-85 overflow-hidden">

  {/* Glow Effect */}
  <div className="absolute h-72 w-72 rounded-full bg-violet-500/20 blur-3xl"></div>

  {/* Orbit Circle */}
  <div className="absolute h-80 w-80 border border-dashed border-violet-300/30 rounded-full animate-[spin_25s_linear_infinite]"></div>

  {/* Floating Gradient Balls */}
  <div className="absolute top-8 left-10 h-6 w-6 rounded-full bg-linear-to-r from-violet-400 to-fuchsia-400 shadow-2xl animate-float"></div>

  <div className="absolute bottom-10 right-8 h-5 w-5 rounded-full bg-linear-to-r from-indigo-400 to-cyan-400 shadow-2xl animate-floatSlow"></div>

  <div className="absolute top-24 right-0 h-3 w-3 rounded-full bg-white shadow-xl animate-ping"></div>

  {/* Glass Platform */}
  <div className="absolute bottom-6 h-16 w-48 rounded-full bg-violet-500/10 blur-2xl"></div>

  {/* Main Floating 3D Card */}
  <div className="relative animate-float">
    
    {/* Floating Cubes */}
    <div className="absolute -left-8 top-10 h-10 w-10 rounded-2xl bg-linear-to-br from-violet-500 to-fuchsia-500 rotate-12 opacity-80 blur-[1px] animate-floatSlow"></div>

    <div className="absolute -right-6 bottom-10 h-8 w-8 rounded-xl bg-linear-to-br from-cyan-400 to-indigo-500 rotate-45 opacity-90 animate-float"></div>

    {/* Main 3D Object */}
    <div className="relative h-65 w-65">

      {/* Outer Glass Ring */}
      <div className="absolute inset-0 rounded-[40px] border border-white/20 bg-white/10 backdrop-blur-xl shadow-[0_20px_80px_rgba(139,92,246,0.25)] rotate-6"></div>

      {/* Inner Card */}
      <div className="absolute inset-4 rounded-4xl bg-linear-to-br from-[#6d28d9] via-[#7c3aed] to-[#d946ef] shadow-[0_25px_80px_rgba(139,92,246,0.55)] flex flex-col items-center justify-center overflow-hidden">

        {/* Shine */}
        <div className="absolute top-0 left-full h-full w-[60%] bg-white/20 skew-x-12 animate-shine"></div>

        {/* Bulb */}
        <div className="relative">
          <div className="absolute inset-0 bg-white/40 blur-2xl rounded-full scale-150"></div>

          <Lightbulb
            className="relative h-24 w-24 text-white drop-shadow-2xl"
            strokeWidth={1.5}
          />
        </div>

        {/* Text */}
        <h3 className="mt-6 text-2xl font-black text-white tracking-wide">
          BIG IDEA
        </h3>

        <p className="mt-2 text-sm text-white/80 text-center px-8 leading-relaxed">
          Transform innovation into reality
        </p>

        {/* Bottom Glow */}
        <div className="absolute bottom-0 h-24 w-full bg-linear-to-t from-black/20 to-transparent"></div>
      </div>
    </div>
  </div>
</div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <form
            onSubmit={handleSubmit}
            className="rounded-4xl bg-white/80 dark:bg-white/4 backdrop-blur-2xl border border-white/40 dark:border-white/10 shadow-xl p-8 md:p-10"
          >
            {/* SECTION 1 */}
            <div className="flex items-center gap-3 mb-8">
              <div className="h-11 w-11 rounded-xl bg-violet-100 flex items-center justify-center">
                <FileText className="h-5 w-5 text-violet-600" />
              </div>

              <h2 className="text-2xl font-bold text-violet-700 dark:text-violet-400">
                Describe Your Idea
              </h2>
            </div>

            <div className="space-y-6">
              {/* TITLE */}
              <div>
                <label className={labelStyle}>Idea Title</label>

                <div className="relative">
                  <input
                    type="text"
                    name="title"
                    required
                    placeholder="Enter idea title"
                    className={`${inputStyle} pl-12`}
                  />

                  <Lightbulb className="absolute left-4 top-3.5 h-5 w-5 text-violet-500" />
                </div>
              </div>

              {/* SHORT DESC */}
              <div>
                <label className={labelStyle}>Short Description</label>

                <div className="relative">
                  <input
                    type="text"
                    name="shortDesc"
                    required
                    placeholder="Brief summary of your idea"
                    className={`${inputStyle} pl-12`}
                  />

                  <FileText className="absolute left-4 top-3.5 h-5 w-5 text-violet-500" />
                </div>
              </div>

              {/* DETAIL DESC */}
              <div>
                <label className={labelStyle}>Detailed Description</label>

                <div className="relative">
                  <textarea
                    name="detailedDesc"
                    rows="5"
                    required
                    placeholder="Tell us more about your idea..."
                    className={`${inputStyle} pl-12 resize-none`}
                  ></textarea>

                  <PencilLine className="absolute left-4 top-4 h-5 w-5 text-violet-500" />
                </div>
              </div>
            </div>

            {/* DIVIDER */}
            <div className="my-10 h-px bg-linear-to-r from-transparent via-violet-200 to-transparent"></div>

            {/* SECTION 2 */}
            <div className="flex items-center gap-3 mb-8">
              <div className="h-11 w-11 rounded-xl bg-violet-100 flex items-center justify-center">
                <Layers3 className="h-5 w-5 text-violet-600" />
              </div>

              <h2 className="text-2xl font-bold text-violet-700 dark:text-violet-400">
                More Details
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* CATEGORY */}
              <div>
                <label className={labelStyle}>Category</label>

                <div className="relative">
                  <select
                    name="category"
                    className={`${inputStyle} pl-12 appearance-none`}
                  >
                    <option>Technology</option>
                    <option>Health</option>
                    <option>Education</option>
                    <option>AI</option>
                  </select>

                  <Layers3 className="absolute left-4 top-3.5 h-5 w-5 text-violet-500" />
                </div>
              </div>

              {/* TAGS */}
              <div>
                <label className={labelStyle}>Tags (Optional)</label>

                <div className="relative">
                  <input
                    type="text"
                    name="tags"
                    placeholder="e.g. AI, Healthcare"
                    className={`${inputStyle} pl-12`}
                  />

                  <Tag className="absolute left-4 top-3.5 h-5 w-5 text-violet-500" />
                </div>
              </div>

              {/* IMAGE */}
              <div>
                <label className={labelStyle}>Image URL</label>

                <div className="relative">
                  <input
                    type="url"
                    name="image"
                    placeholder="https://..."
                    className={`${inputStyle} pl-12`}
                  />

                  <ImageIcon className="absolute left-4 top-3.5 h-5 w-5 text-violet-500" />
                </div>
              </div>

              {/* BUDGET */}
              <div>
                <label className={labelStyle}>
                  Estimated Budget (Optional)
                </label>

                <div className="relative">
                  <input
                    type="text"
                    name="budget"
                    placeholder="e.g. $10,000"
                    className={`${inputStyle} pl-12`}
                  />

                  <Wallet className="absolute left-4 top-3.5 h-5 w-5 text-violet-500" />
                </div>
              </div>

              {/* AUDIENCE */}
              <div>
                <label className={labelStyle}>Target Audience</label>

                <div className="relative">
                  <input
                    type="text"
                    name="audience"
                    required
                    placeholder="Who is this idea for?"
                    className={`${inputStyle} pl-12`}
                  />

                  <Users className="absolute left-4 top-3.5 h-5 w-5 text-violet-500" />
                </div>
              </div>

              {/* PROBLEM */}
              <div>
                <label className={labelStyle}>Problem Statement</label>

                <div className="relative">
                  <input
                    type="text"
                    name="problem"
                    required
                    placeholder="What problem does it solve?"
                    className={`${inputStyle} pl-12`}
                  />

                  <CircleHelp className="absolute left-4 top-3.5 h-5 w-5 text-violet-500" />
                </div>
              </div>
            </div>

            {/* SOLUTION */}
            <div className="mt-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-11 w-11 rounded-xl bg-violet-100 flex items-center justify-center">
                  <Lightbulb className="h-5 w-5 text-violet-600" />
                </div>

                <h2 className="text-2xl font-bold text-violet-700 dark:text-violet-400">
                  Solution
                </h2>
              </div>

              <label className={labelStyle}>Proposed Solution</label>

              <div className="relative">
                <textarea
                  name="solution"
                  rows="4"
                  required
                  placeholder="How does your idea solve this problem?"
                  className={`${inputStyle} pl-12 resize-none`}
                ></textarea>

                <PencilLine className="absolute left-4 top-4 h-5 w-5 text-violet-500" />
              </div>
            </div>

            {/* FOOTER */}
            <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-5">
              <div className="flex items-center gap-4 rounded-2xl border border-violet-100 bg-violet-50 px-5 py-4">
                <ShieldCheck className="h-6 w-6 text-violet-600" />

                <div>
                  <h4 className="text-sm font-bold text-violet-700">
                    Your idea is safe with us
                  </h4>

                  <p className="text-xs text-gray-500">
                    We respect your privacy and protect your information.
                  </p>
                </div>
              </div>

              <button
                type="submit"
                className="group flex items-center gap-3 rounded-2xl bg-linear-to-r from-indigo-600 to-fuchsia-500 px-10 py-4 text-white font-semibold shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <SendHorizonal className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />

                Submit Idea
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}