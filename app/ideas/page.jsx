"use client";
import { useState, useEffect } from 'react';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import { Search, Heart, MessageSquare, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';

export default function IdeasPage() {
    const [ideas, setIdeas] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState(''); // NEW: Category Filter State
    
    // PAGINATION STATE
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 20;

    const axiosPublic = useAxiosPublic();

    // DYNAMIC TITLE
    useEffect(() => {
        document.title = "Explore Ideas | IdeaVault";
    }, []);

    useEffect(() => {
        // FIXED: Fetch includes category if selected
        const fetchUrl = category && category !== "All Categories" 
            ? `/ideas?search=${search}&category=${category}` 
            : `/ideas?search=${search}`;

        axiosPublic.get(fetchUrl)
            .then(res => {
                setIdeas(res.data);
                setCurrentPage(1); 
            })
            .catch(err => console.error("Error fetching ideas:", err));
    }, [search, category]); // Re-run when category changes

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    const fallbackIdeas = [];
    const displayIdeas = ideas.length > 0 ? ideas : fallbackIdeas;

    const totalPages = Math.ceil(displayIdeas.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentIdeas = displayIdeas.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const getPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
                pages.push(i);
            } else if (pages[pages.length - 1] !== '...') {
                pages.push('...');
            }
        }
        return pages;
    };

    return (
        <div className="max-w-350 mx-auto px-6 py-12 min-h-[80vh]">
            
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 bg-white dark:bg-[#0A0A0A] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
                <div className="relative w-full max-w-lg group">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Search ideas by title..." 
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-gray-900 border-2 border-transparent focus:border-primary/30 rounded-2xl pl-12 pr-4 py-3.5 text-sm outline-none transition-all"
                    />
                </div>
                
                <div className="flex flex-wrap sm:flex-nowrap gap-4 w-full md:w-auto">
                    <div className="relative w-full sm:w-auto">
                        {/* FIXED: Wired up onChange to setCategory */}
                        <select 
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full appearance-none bg-gray-50 dark:bg-gray-900 border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-700 rounded-2xl px-6 pr-12 py-3.5 text-sm font-medium text-(--foreground) outline-none transition-all cursor-pointer"
                        >
                            <option value="">All Categories</option>
                            <option value="Technology">Technology</option>
                            <option value="Health">Health</option>
                            <option value="Education">Education</option>
                            <option value="AI">AI</option>
                            <option value="FinTech">FinTech</option>
                        </select>
                        <SlidersHorizontal size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
                {currentIdeas.map((idea, idx) => (
                    <Link 
                        href={`/ideas/${idea._id || idx}`} 
                        key={idea._id} 
                        className="group bg-white dark:bg-[#0A0A0A] border border-gray-100 dark:border-gray-800 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1.5 flex flex-col cursor-pointer"
                    >
                        <div className="aspect-4/3 w-full relative overflow-hidden bg-gray-100 dark:bg-gray-900 shrink-0">
                            <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent z-10"></div>
                            <img 
                                src={idea.imageURL || idea.img} 
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                alt={idea.title} 
                            />
                            <span className="absolute top-4 left-4 z-20 text-[11px] font-bold text-white bg-black/30 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full uppercase tracking-wider">
                                {idea.category || idea.cat || "Idea"}
                            </span>
                        </div>
                        
                        <div className="p-6 flex flex-col grow">
                            <h3 className="font-extrabold text-lg text-(--foreground) mb-3 line-clamp-2 group-hover:text-primary transition-colors">{idea.title}</h3>
                            
                            <div className="mt-auto pt-4 border-t border-gray-50 dark:border-gray-800 flex justify-between items-center text-sm font-medium text-gray-500">
                                <div className="flex gap-4">
                                    <span className="flex items-center gap-1.5 hover:text-red-500 transition-colors"><Heart size={16} /> {idea.likes || 0}</span>
                                    <span className="flex items-center gap-1.5 hover:text-blue-500 transition-colors"><MessageSquare size={16} /> {idea.comments || 0}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2">
                    <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-primary text-gray-500 hover:text-primary transition-all flex items-center justify-center font-bold disabled:opacity-50">‹</button>
                    {getPageNumbers().map((num, i) => (
                        num === '...' ? <span key={i} className="px-2 text-gray-400 font-bold">...</span> : 
                        <button key={i} onClick={() => setCurrentPage(num)} className={`w-10 h-10 rounded-xl font-bold transition-all ${currentPage === num ? "bg-primary shadow-lg shadow-primary/30 text-white border-transparent" : "bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-primary hover:text-primary text-(--foreground)"}`}>{num}</button>
                    ))}
                    <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-primary text-gray-500 hover:text-primary transition-all flex items-center justify-center font-bold disabled:opacity-50">›</button>
                </div>
            )}
        </div>
    );
}