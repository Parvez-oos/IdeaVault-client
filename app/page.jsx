"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import { Lightbulb, Send, MessageSquare, Hexagon, Search, Users, ShieldCheck, Heart, LayoutGrid, Activity, Shield, TrendingUp, ArrowRight, Rocket } from 'lucide-react';

// IMPORT SWIPER
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function Home() {
    const [trendingIdeas, setTrendingIdeas] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        document.title = "Home | IdeaVault";
    }, []);

    useEffect(() => {
        axiosPublic.get('/ideas?limit=6')
            .then(res => setTrendingIdeas(res.data))
            .catch(err => console.error("Error fetching trending ideas:", err));
    }, []);

    const fallbackIdeas = [
        { title: "AI Study Buddy", cat: "Education", likes: 128, comments: 24, img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&q=80" },
        { title: "HealthSync", cat: "Health", likes: 96, comments: 16, img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=500&q=80" },
        { title: "GreenCharge", cat: "Tech", likes: 112, comments: 18, img: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=500&q=80" },
        { title: "MindfulMe", cat: "Health", likes: 72, comments: 14, img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=500&q=80" },
        { title: "CodeCollab", cat: "Tech", likes: 64, comments: 11, img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=500&q=80" },
        { title: "AgriSmart", cat: "Tech", likes: 58, comments: 9, img: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=500&q=80" },
    ];

    const displayIdeas = trendingIdeas.length > 0 ? trendingIdeas.slice(0, 6) : fallbackIdeas;

    return (
        <div className="pb-20 bg-(--background) transition-colors">
            
            {/* 1. HERO SECTION */}
            <section className="max-w-350 mx-auto px-6 pt-16 pb-24 grid lg:grid-cols-2 gap-12 items-center relative">
                <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10"></div>
                
                <div className="max-w-xl z-10">
                    <h1 className="text-5xl lg:text-[64px] font-extrabold leading-[1.1] mb-6 tracking-tight">
                        <span className="text-(--foreground)">Share Ideas.</span><br/>
                        <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-purple-600">
                            Build the Future.
                        </span>
                    </h1>
                    <p className="text-lg text-gray-500 dark:text-gray-400 mb-10 leading-relaxed max-w-md">
                        Discover, share & validate innovative startup ideas with a community of creators and visionaries.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/ideas" className="bg-primary hover:bg-indigo-600 text-white px-8 py-3.5 rounded-full font-semibold transition-all shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5">
                            Explore Ideas
                        </Link>
                        <Link href="/add-idea" className="bg-transparent border-2 border-gray-200 dark:border-gray-800 text-(--foreground) hover:border-primary hover:text-primary dark:hover:border-primary px-8 py-3.5 rounded-full font-semibold transition-all hover:-translate-y-0.5  dark:bg-transparent backdrop-blur-sm">
                            Add Your Idea
                        </Link>
                    </div>
                </div>
                <div className="flex justify-end relative w-full h-100">
                    <div className="absolute inset-0 bg-linear-to-tr from-primary/20 to-purple-500/20 rounded-3xl transform rotate-3 scale-105 -z-10 blur-lg"></div>
                    
                    <Swiper
                        modules={[Autoplay, Pagination, EffectFade]}
                        effect="fade"
                        autoplay={{ delay: 2500, disableOnInteraction: false }}
                        pagination={{ clickable: true }}
                        className="w-full max-w-150 h-100 rounded-3xl shadow-2xl border-4 border-white dark:border-gray-900"
                    >
                        <SwiperSlide>
                            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="Innovation Team" className="w-full h-full object-cover" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80" alt="Future Tech" className="w-full h-full object-cover" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80" alt="Tech Workstation" className="w-full h-full object-cover" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80" alt="Business Meeting" className="w-full h-full object-cover" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80" alt="Brainstorming Session" className="w-full h-full object-cover" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80" alt="Digital Innovation" className="w-full h-full object-cover" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80" alt="Project Planning" className="w-full h-full object-cover" />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </section>

            {/* 2. TRENDING IDEAS */}
            <section className="max-w-350 mx-auto px-6 mb-24">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-(--foreground)">Trending Ideas</h2>
                    <Link href="/ideas" className="group text-sm font-bold text-primary border border-gray-200 dark:border-gray-800 px-5 py-2.5 rounded-full hover:border-primary/50 hover:bg-primary/5 transition-all flex items-center gap-2">
                        View All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                    {displayIdeas.map((idea, i) => (
                        <Link 
                            // FIXED: If it's a fallback idea without a real DB ID, safely route to /ideas instead of crashing
                            href={idea._id ? `/ideas/${idea._id}` : '/ideas'} 
                            key={idea._id || i} 
                            className="group bg-(--card) border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 dark:bg-[#0A0A0A] flex flex-col cursor-pointer"
                        >
                            <div className="aspect-4/3 w-full overflow-hidden relative bg-gray-100 dark:bg-gray-900 shrink-0">
                                <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent z-10"></div>
                                <img 
                                    src={idea.imageURL || idea.img} 
                                    alt={idea.title} 
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                    onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=500&q=80"; }}
                                />
                            </div>
                            
                            <div className="p-5 grow flex flex-col">
                                <div>
                                    <h3 className="font-bold text-base mb-2 text-(--foreground) line-clamp-1">{idea.title}</h3>
                                    <span className="text-xs font-semibold text-primary bg-indigo-50 dark:bg-indigo-900/30 px-2.5 py-1 rounded-md inline-block mb-3">
                                        {idea.category || idea.cat}
                                    </span>
                                </div>
                                
                                {/* FIXED: Professional 'View Details' Button UI */}
                                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                                    <div className="flex gap-3 items-center text-xs font-medium text-gray-500">
                                        <span className="flex items-center gap-1.5 hover:text-red-500 transition-colors"><Heart size={14}/> {idea.likes || 0}</span>
                                        <span className="flex items-center gap-1.5 hover:text-blue-500 transition-colors"><MessageSquare size={14}/> {idea.comments || 0}</span>
                                    </div>
                                    <span className="bg-primary/10 text-primary hover:bg-primary hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors duration-300">
                                        Details <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* 3. STATS */}
            <section className="max-w-350 mx-auto px-6 mb-24">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { icon: <Lightbulb size={28}/>, num: "12,600+", label: "Ideas Shared", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20", border: "border-blue-100 dark:border-blue-900/30" },
                        { icon: <Send size={28}/>, num: "3,400+", label: "Active Users", color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20", border: "border-purple-100 dark:border-purple-900/30" },
                        { icon: <MessageSquare size={28}/>, num: "28,500+", label: "Comments", color: "text-indigo-500", bg: "bg-indigo-50 dark:bg-indigo-900/20", border: "border-indigo-100 dark:border-indigo-900/30" },
                        { icon: <Hexagon size={28}/>, num: "850+", label: "Collaborations", color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-900/20", border: "border-orange-100 dark:border-orange-900/30" }
                    ].map((stat, i) => (
                        <div key={i} className={`flex flex-col sm:flex-row items-start sm:items-center gap-5 bg-white dark:bg-[#0A0A0A] border ${stat.border} p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow`}>
                            <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
                                {stat.icon}
                            </div>
                            <div>
                                <h4 className="text-3xl font-extrabold text-(--foreground) tracking-tight">{stat.num}</h4>
                                <p className="text-sm font-medium text-gray-500 mt-1">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. JOIN COMMUNITY BANNER */}
            <section className="max-w-350 mx-auto px-6 mb-24">
                <div className="bg-[#0A0F24] rounded-3xl p-10 lg:p-16 flex flex-col lg:flex-row items-center justify-between relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
                        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary rounded-full blur-[100px]"></div>
                        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-600 rounded-full blur-[80px]"></div>
                    </div>
                    
                    <div className="z-10 text-white max-w-xl">
                        <h2 className="text-4xl font-extrabold mb-4 leading-tight">Ready to launch your next big idea?</h2>
                        <p className="text-gray-300 mb-8 text-lg">Connect with a global network of founders, developers, and visionaries. Turn your spark into a startup.</p>
                        <button className="bg-primary hover:bg-indigo-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-primary/30 flex items-center gap-2 hover:-translate-y-1">
                            Join the Community <Rocket size={20} />
                        </button>
                    </div>
                    
                    <div className="z-10 hidden lg:block w-112.5 h-75 relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                        <img 
                            src="https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=800&q=80" 
                            alt="Rocket Launch abstract" 
                            className="w-full h-full object-cover opacity-80" 
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-[#0A0F24] to-transparent"></div>
                    </div>
                </div>
            </section>

            {/* 5. HOW IT WORKS */}
            <section className="max-w-350 mx-auto px-6 mb-24">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-3xl font-extrabold mb-4 text-(--foreground)">How IdeaVault Works</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-lg">Four simple steps to take your idea from concept to reality.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { icon: <Search size={28}/>, title: "1. Discover", desc: "Explore thousands of startup ideas across emerging tech categories." },
                        { icon: <ShieldCheck size={28}/>, title: "2. Validate", desc: "Share your concepts safely and gauge market interest instantly." },
                        { icon: <MessageSquare size={28}/>, title: "3. Refine", desc: "Receive actionable feedback from industry experts and peers." },
                        { icon: <Users size={28}/>, title: "4. Build", desc: "Find co-founders and collaborators to turn your vision into code." }
                    ].map((step, i) => (
                        <div key={i} className="group bg-white dark:bg-[#0A0A0A] border border-gray-100 dark:border-gray-800 rounded-3xl p-8 text-center flex flex-col items-center shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/30 text-primary rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform group-hover:rotate-3">
                                {step.icon}
                            </div>
                            <h3 className="font-bold text-lg mb-3 text-(--foreground)">{step.title}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 6. CATEGORIES */}
            <section className="max-w-350 mx-auto px-6 mb-24">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-(--foreground)">Explore Categories</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
                    {[
                        { name: "Technology", count: "1,240", icon: <LayoutGrid size={24}/>, color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-900/20" }, 
                        { name: "Health & Med", count: "860", icon: <Heart size={24}/>, color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-900/20" },
                        { name: "EdTech", count: "720", icon: <Lightbulb size={24}/>, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-900/20" }, 
                        { name: "AI & ML", count: "610", icon: <Activity size={24}/>, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
                        { name: "FinTech", count: "540", icon: <TrendingUp size={24}/>, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-900/20" }, 
                        { name: "Climate Tech", count: "420", icon: <Shield size={24}/>, color: "text-teal-500", bg: "bg-teal-50 dark:bg-teal-900/20" }
                    ].map((cat, i) => (
                        <div key={i} className="group bg-white dark:bg-[#0A0A0A] border border-gray-100 dark:border-gray-800 p-5 rounded-2xl flex flex-col items-center text-center gap-4 cursor-pointer hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-700 transition-all hover:-translate-y-1">
                            <div className={`w-14 h-14 ${cat.bg} ${cat.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                {cat.icon}
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-(--foreground)">{cat.name}</h4>
                                <p className="text-xs font-medium text-gray-500 mt-1">{cat.count} ideas</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 7. SUCCESS STORIES */}
            <section className="max-w-350 mx-auto px-6 mb-12">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-(--foreground)">Wall of Love</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { name: "Sarah K.", role: "Founder, HealthSync", text: "IdeaVault helped me refine my core concept and connected me with the technical co-founder I desperately needed.", img: "11" },
                        { name: "Alex R.", role: "Indie Hacker", text: "I posted a rough idea on a Tuesday. By Friday, I had enough validation and pre-signups to justify building the MVP.", img: "12" },
                        { name: "Priya M.", role: "Product Manager", text: "This platform is an absolute goldmine. The quality of feedback here is completely unmatched compared to other forums.", img: "32" }
                    ].map((story, i) => (
                        <div key={i} className="bg-white dark:bg-[#0A0A0A] border border-gray-100 dark:border-gray-800 p-8 rounded-3xl flex flex-col justify-between shadow-sm hover:shadow-xl transition-all">
                            <div className="mb-6">
                                <svg className="w-8 h-8 text-primary/20 mb-4" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                                <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed italic">
                                    &quot;{story.text}&quot;
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <img src={`https://i.pravatar.cc/150?img=${story.img}`} alt={story.name} className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-800 shadow-sm" />
                                <div>
                                    <p className="text-sm font-bold text-(--foreground)">{story.name}</p>
                                    <p className="text-xs text-gray-500 font-medium">{story.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}