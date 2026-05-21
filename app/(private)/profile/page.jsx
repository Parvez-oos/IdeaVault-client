"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthProvider";
import Link from "next/link"; 

import {
  User,
  Lock,
  Bookmark,
  Bell,
  Camera,
  LogOut,
  Shield,
  Mail,
  Globe,
  CheckCircle2,
  Moon,
  Sun,
  Smartphone,
  Monitor,
  ChevronRight,
  Trash2 
} from "lucide-react";

import { toast } from "sonner";
import { updatePassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Profile() {
  const router = useRouter();

  const {
    user,
    loading,
    updateUserProfile,
    logoutUser,
  } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState("profile");
  const [photoPreview, setPhotoPreview] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  
  const [bookmarks, setBookmarks] = useState([]);

  // ================= LOAD BOOKMARKS =================

  useEffect(() => {
    if (user) {
        const timer = setTimeout(() => {
            const saved = JSON.parse(localStorage.getItem(`bookmarks_${user.email}`)) || [];
            setBookmarks(saved);
        }, 0);
        return () => clearTimeout(timer);
    }
  }, [user, activeTab]); 

  // ================= REMOVE BOOKMARK LOGIC =================

  const removeBookmark = (e, ideaId) => {
      e.preventDefault(); // Prevents the <Link> from redirecting you to the page
      
      const saved = bookmarks.filter(b => b._id !== ideaId);
      localStorage.setItem(`bookmarks_${user.email}`, JSON.stringify(saved));
      setBookmarks(saved);
      toast.success("Bookmark removed!");
  };

  // ================= PROTECT PAGE =================

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // ================= UPDATE PROFILE =================

  const handleUpdate = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;

    try {
      await updateUserProfile(name, photo);
      setPhotoPreview(photo);
      toast.success("Profile Updated Successfully!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  // ================= PASSWORD =================

  const handlePasswordChange = async (e) => {
      e.preventDefault();
      const newPassword = e.target.password.value;

      try {
        await updatePassword(user, newPassword);
        toast.success("Password Updated Successfully!");
        e.target.reset();
      } catch (err) {
        toast.error(err.message);
      }
    };

  // ================= LOGOUT =================

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logged Out Successfully!");
      router.push("/login");
    } catch (err) {
      toast.error(err.message);
    }
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="animate-pulse text-2xl font-bold">
          Loading Profile...
        </div>
      </div>
    );
  }

  const tabs = [
    { key: "profile", label: "Profile", icon: User },
    { key: "security", label: "Security", icon: Shield },
    { key: "bookmarks", label: "Bookmarks", icon: Bookmark },
    { key: "notifications", label: "Notifications", icon: Bell },
    { key: "appearance", label: "Appearance", icon: Monitor },
  ];

  return (
    <div
      className={`min-h-screen transition-all duration-500 overflow-hidden ${
        darkMode ? "bg-[#050816] text-white" : "bg-[#f4f7ff] text-black"
      }`}
    >
      {/* BG EFFECTS */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-37.5 left-37.5 w-100 h-100 bg-indigo-500/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-37.5 right-37.5 w-100 h-100 bg-fuchsia-500/20 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[40px] shadow-2xl border border-white/10"
        >
          <div className="h-85 bg-linear-to-r from-indigo-700 via-violet-700 to-fuchsia-700 relative">
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-[120px]" />
              <div className="absolute bottom-10 right-10 w-72 h-72 bg-pink-500/20 rounded-full blur-[120px]" />
            </div>

            {/* PROFILE INFO */}
            <div className="absolute bottom-8 left-8 flex flex-col md:flex-row md:items-end gap-6">
              {/* IMAGE */}
              <div className="relative">
                <img
                  src={photoPreview || user?.photoURL || "https://ui-avatars.com/api/?name=User"}
                  alt=""
                  className="w-36 h-36 rounded-[30px] border-4 border-white object-cover shadow-2xl"
                />
                <button className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-xl hover:scale-110 transition">
                  <Camera size={18} />
                </button>
              </div>

              {/* TEXT */}
              <div className="text-white">
                <div className="flex items-center gap-3">
                  <h1 className="text-4xl md:text-5xl font-black">{user?.displayName}</h1>
                  <CheckCircle2 className="text-cyan-300" />
                </div>
                <p className="mt-2 text-white/80 text-lg">Full Stack Developer • UI Designer</p>

                {/* STATS */}
                <div className="flex gap-4 mt-6 flex-wrap">
                  <div className="px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">120 Posts</div>
                  <div className="px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">12.5K Followers</div>
                  <div className="px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">320 Following</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* MAIN */}
        <div className="grid lg:grid-cols-12 gap-8 mt-8">

          {/* SIDEBAR */}
          <motion.aside
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            <div
              className={`sticky top-10 rounded-4xl border backdrop-blur-xl p-5 shadow-2xl ${
                darkMode ? "bg-white/5 border-white/10" : "bg-white/70 border-black/5"
              }`}
            >
              {/* USER */}
              <div className="pb-6 border-b border-white/10 text-center">
                <img
                  src={photoPreview || user?.photoURL || "https://ui-avatars.com/api/?name=User"}
                  alt=""
                  className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-indigo-500 shadow-xl"
                />
                <h2 className="mt-4 text-2xl font-bold">{user?.displayName}</h2>
                <p className="opacity-70 text-sm">{user?.email}</p>

                {/* PROGRESS */}
                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Profile Completion</span>
                    <span>78%</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                    <div className="w-[78%] h-full bg-linear-to-r from-indigo-500 to-fuchsia-500 rounded-full" />
                  </div>
                </div>
              </div>

              {/* MENU */}
              <div className="mt-6 space-y-2">
                {tabs.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.key}
                      onClick={() => setActiveTab(item.key)}
                      className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 ${
                        activeTab === item.key
                          ? "bg-linear-to-r from-indigo-600 to-fuchsia-600 text-white shadow-xl"
                          : darkMode
                          ? "hover:bg-white/5"
                          : "hover:bg-black/5"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={18} />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <ChevronRight size={18} />
                    </button>
                  );
                })}

                {/* LOGOUT */}
                <button
                  onClick={handleLogout}
                  className="w-full mt-5 flex items-center gap-3 px-5 py-4 rounded-2xl text-red-500 hover:bg-red-500/10 transition-all"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </div>
          </motion.aside>

          {/* CONTENT */}
          <motion.main
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-9"
          >
            <div
              className={`rounded-4xl border backdrop-blur-xl p-8 shadow-2xl min-h-125 ${
                darkMode ? "bg-white/5 border-white/10" : "bg-white/70 border-black/5"
              }`}
            >
              <AnimatePresence mode="wait">

                {/* PROFILE */}

                {activeTab === "profile" && (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <form onSubmit={handleUpdate} className="space-y-8">

                      {/* TITLE */}

                      <div>
                        <h2 className="text-3xl font-black">Profile Settings</h2>
                        <p className="opacity-70 mt-2">Manage your personal information and social profile.</p>
                      </div>

                      {/* INPUTS */}

                      <div className="grid md:grid-cols-2 gap-6">

                        {/* NAME */}


                        <div>
                          <label className="text-sm font-semibold mb-3 block">Full Name</label>
                          <div className="relative">
                            <User size={18} className="absolute left-5 top-5 opacity-50" />
                            <input
                              type="text"
                              name="name"
                              defaultValue={user?.displayName}
                              className={`w-full pl-14 pr-5 py-4 rounded-2xl outline-none border transition-all ${
                                darkMode ? "bg-white/5 border-white/10 focus:border-indigo-500" : "bg-white border-black/10 focus:border-indigo-500"
                              }`}
                            />
                          </div>
                        </div>

                        {/* EMAIL */}

                        <div>
                          <label className="text-sm font-semibold mb-3 block">Email</label>
                          <div className="relative">
                            <Mail size={18} className="absolute left-5 top-5 opacity-50" />
                            <input
                              disabled
                              value={user?.email || ""}
                              className={`w-full pl-14 pr-5 py-4 rounded-2xl outline-none border ${
                                darkMode ? "bg-white/5 border-white/10" : "bg-white border-black/10"
                              }`}
                            />
                          </div>
                        </div>
                      </div>

                      {/* PHOTO */}
                      <div>
                        <label className="text-sm font-semibold mb-3 block">Photo URL</label>
                        <div className="relative">
                          <Globe size={18} className="absolute left-5 top-5 opacity-50" />
                          <input
                            type="url"
                            name="photo"
                            defaultValue={user?.photoURL}
                            onChange={(e) => setPhotoPreview(e.target.value)}
                            className={`w-full pl-14 pr-5 py-4 rounded-2xl outline-none border transition-all ${
                              darkMode ? "bg-white/5 border-white/10 focus:border-indigo-500" : "bg-white border-black/10 focus:border-indigo-500"
                            }`}
                          />
                        </div>
                      </div>

                      {/* BIO */}
                      <div>
                        <label className="text-sm font-semibold mb-3 block">Bio</label>
                        <textarea
                          rows={6}
                          placeholder="Tell people about yourself..."
                          className={`w-full px-5 py-4 rounded-2xl outline-none border resize-none transition-all ${
                            darkMode ? "bg-white/5 border-white/10 focus:border-indigo-500" : "bg-white border-black/10 focus:border-indigo-500"
                          }`}
                        />
                      </div>

                      {/* BUTTON */}
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="px-10 py-4 rounded-2xl bg-linear-to-r from-indigo-600 via-violet-600 to-fuchsia-600 text-white font-bold shadow-2xl hover:scale-[1.03] transition-all"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* SECURITY */}
                {activeTab === "security" && (
                  <motion.div
                    key="security"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-3xl font-black">Security Settings</h2>
                      <p className="opacity-70 mt-2">Manage your password and active sessions.</p>
                    </div>

                    {/* PASSWORD */}
                    <form onSubmit={handlePasswordChange} className="space-y-5">
                      <div className="relative">
                        <Lock size={18} className="absolute left-5 top-5 opacity-50" />
                        <input
                          type="password"
                          name="password"
                          placeholder="Enter new password"
                          className={`w-full pl-14 pr-5 py-4 rounded-2xl outline-none border transition-all ${
                            darkMode ? "bg-white/5 border-white/10 focus:border-indigo-500" : "bg-white border-black/10 focus:border-indigo-500"
                          }`}
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-8 py-4 rounded-2xl bg-linear-to-r from-indigo-600 to-fuchsia-600 text-white font-bold"
                      >
                        Update Password
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* BOOKMARKS (ADDED TRASH CAN TO DELETE GHOST IDEAS) */}
                {activeTab === "bookmarks" && (
                  <motion.div
                    key="bookmarks"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="mb-8">
                      <h2 className="text-3xl font-black">My Bookmarks</h2>
                      <p className="opacity-70 mt-2">Access your saved startup ideas instantly.</p>
                    </div>

                    {bookmarks.length === 0 ? (
                      <div className="text-center py-20">
                        <Bookmark size={70} className="mx-auto mb-6 text-indigo-500" />
                        <h2 className="text-3xl font-black mb-4">No Bookmarks Yet</h2>
                        <p className="opacity-70 max-w-md mx-auto">Your saved items and favorite ideas will appear here.</p>
                        <Link href="/ideas">
                          <button className="mt-8 px-8 py-3 rounded-2xl bg-indigo-600/10 text-indigo-500 font-bold hover:bg-indigo-600/20 transition-all">
                            Explore Ideas
                          </button>
                        </Link>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {bookmarks.map((idea) => (
                          <Link
                            href={`/ideas/${idea._id}`}
                            key={idea._id}
                            className={`relative block p-5 rounded-3xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                              darkMode ? "bg-white/5 border-white/10 hover:border-indigo-500" : "bg-white border-black/10 hover:border-indigo-500"
                            }`}
                          >
                            {/* NEW: Trash Can Button to delete invalid bookmarks */}
                            <button 
                                onClick={(e) => removeBookmark(e, idea._id)}
                                className="absolute top-8 right-8 z-10 p-2 bg-black/60 backdrop-blur-md rounded-full text-white hover:bg-red-500 hover:scale-110 transition-all"
                            >
                                <Trash2 size={16} />
                            </button>

                            <div className="w-full h-40 rounded-2xl overflow-hidden mb-4 relative bg-black/10">
                              <img src={idea.imageURL} alt={idea.title} className="w-full h-full object-cover" />
                            </div>
                            <h3 className="text-xl font-bold line-clamp-1 pr-10">{idea.title}</h3>
                            <div className="mt-3">
                              <span className="text-xs font-bold text-indigo-500 bg-indigo-500/10 px-3 py-1.5 rounded-full inline-block">
                                {idea.category}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* NOTIFICATIONS */}
                {activeTab === "notifications" && (
                  <motion.div
                    key="notifications"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-5"
                  >
                    <h2 className="text-3xl font-black mb-8">Notifications</h2>
                    {["Email Notifications", "Comment Alerts", "Weekly Updates", "Security Alerts"].map((item, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-6 rounded-3xl border ${darkMode ? "bg-white/5 border-white/10" : "bg-white border-black/5"}`}
                      >
                        <span className="font-semibold">{item}</span>
                        <input type="checkbox" defaultChecked={index !== 2} className="w-5 h-5 accent-indigo-500" />
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* APPEARANCE */}
                {activeTab === "appearance" && (
                  <motion.div
                    key="appearance"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-3xl font-black">Appearance</h2>
                      <p className="opacity-70 mt-2">Customize your visual experience.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <button
                        onClick={() => setDarkMode(false)}
                        className={`p-8 rounded-3xl border text-left transition-all ${!darkMode ? "border-indigo-500 ring-2 ring-indigo-500/20" : "border-black/10"}`}
                      >
                        <Sun size={45} className="mb-5 text-yellow-500" />
                        <h3 className="text-2xl font-bold">Light Mode</h3>
                      </button>

                      <button
                        onClick={() => setDarkMode(true)}
                        className={`p-8 rounded-3xl border text-left transition-all ${darkMode ? "border-indigo-500 ring-2 ring-indigo-500/20" : "border-black/10"}`}
                      >
                        <Moon size={45} className="mb-5 text-indigo-500" />
                        <h3 className="text-2xl font-bold">Dark Mode</h3>
                      </button>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </motion.main>
        </div>
      </div>
    </div>
  );
}