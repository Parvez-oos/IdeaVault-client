"use client";
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/AuthProvider';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import Link from 'next/link';
import { MessageSquare, ArrowRight, Loader2, Clock, Sparkles, Lock } from 'lucide-react'; // Added Lock import

export default function MyInteractions() {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    
    const [interactedIdeas, setInteractedIdeas] = useState([]);
    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 8;

    const fetchInteractions = async () => {
        
        if (!user?.email) {
            setLoading(false);
            return;
        }
        try {
            const res = await axiosSecure.get(`/comments/interactions/${user.email}`);
            setInteractedIdeas(res.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching interactions:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchInteractions();
        }, 0);
        return () => clearTimeout(timer);
    }, [user]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    const totalPages = Math.ceil(interactedIdeas.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentIdeas = interactedIdeas.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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

    // LOADING STATE
    if (loading) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center">
                <Loader2 className="animate-spin text-primary mb-4" size={40} />
                <p className="text-gray-500 font-medium">Loading your activity...</p>
            </div>
        );
    }

    
    if (!user) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center px-6">
                <div className="bg-(--card) border border-(--border) rounded-3xl p-10 md:p-14 text-center shadow-xl max-w-lg w-full">
                    <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/20 text-primary rounded-full flex items-center justify-center mb-6 mx-auto border border-indigo-100 dark:border-indigo-900/50">
                        <Lock size={32} />
                    </div>
                    <h3 className="text-2xl font-extrabold text-(--foreground) mb-3 tracking-tight">Login Required</h3>
                    <p className="text-gray-500 mb-8 leading-relaxed">
                        Please log in to your account to view your recent interactions and comment history.
                    </p>
                    <Link href="/login" className="bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-xl font-bold transition shadow-lg shadow-primary/30 inline-flex items-center gap-2">
                        Go to Login <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-250 mx-auto px-6 py-12 min-h-[80vh] relative">
            
            {/* Header Section */}
            <div className="mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-100 dark:border-indigo-900/50 bg-indigo-50 dark:bg-indigo-900/20 text-xs font-bold text-primary mb-4">
                    <Sparkles size={14} /> Activity Feed
                </div>
                <h1 className="text-3xl font-extrabold text-(--foreground) mb-2 tracking-tight">My Interactions</h1>
                <p className="text-sm text-gray-500 max-w-lg">
                    Keep track of the discussions you&apos;ve joined. Jump back into the conversation and collaborate with innovators.
                </p>
            </div>

            {/* Interactions List */}
            {interactedIdeas.length === 0 ? (
                <div className="bg-(--card) border border-(--border) rounded-3xl p-12 text-center shadow-sm flex flex-col items-center justify-center">
                    <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/20 text-primary rounded-full flex items-center justify-center mb-6 border border-indigo-100 dark:border-indigo-900/50">
                        <MessageSquare size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-(--foreground) mb-2">No interactions yet</h3>
                    <p className="text-gray-500 mb-8 max-w-sm">
                        You haven&apos;t commented on any ideas yet. Explore the vault and share your thoughts with creators!
                    </p>
                    <Link href="/ideas" className="bg-primary hover:bg-primary-hover text-white px-8 py-3.5 rounded-xl font-bold transition shadow-lg shadow-primary/30">
                        Explore Ideas
                    </Link>
                </div>
            ) : (
                <div className="space-y-5">
                    {currentIdeas.map(idea => (
                        <Link 
                            href={`/ideas/${idea._id}`} 
                            key={idea._id}
                            className="group relative bg-(--card) border border-(--border) rounded-2xl p-5 hover:shadow-xl hover:border-primary/50 transition-all duration-300 flex flex-col md:flex-row gap-6 items-start md:items-center overflow-hidden"
                        >
                            {/* Hover Glow Effect */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                            
                            {/* Idea Image / Icon */}
                            <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 bg-gray-100 dark:bg-gray-900 border border-(--border) rounded-xl flex items-center justify-center text-primary relative overflow-hidden shadow-sm">
                                {idea.imageURL ? (
                                    <img 
                                        src={idea.imageURL} 
                                        alt={idea.title} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                        onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1557683316-973673baf926?w=500&q=80"; }}
                                    />
                                ) : (
                                    <MessageSquare size={24} />
                                )}
                            </div>
                            
                            {/* Content */}
                            <div className="flex-1 z-10">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-800 px-2 py-0.5 rounded uppercase tracking-wider">
                                        Active Thread
                                    </span>
                                    <span className="text-xs font-medium text-gray-400 flex items-center gap-1">
                                        <Clock size={12}/> Interacted Recently
                                    </span>
                                </div>
                                <h3 className="text-lg font-extrabold text-(--foreground) group-hover:text-primary transition-colors line-clamp-1">
                                    {idea.title}
                                </h3>
                                <p className="text-sm text-gray-500 line-clamp-1 mt-1">
                                    {idea.shortDescription || "Click to view the full discussion."}
                                </p>
                            </div>
                            
                            {/* Call to Action Button */}
                            <div className="shrink-0 w-full md:w-auto z-10 mt-2 md:mt-0">
                                <button className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-(--muted) border border-(--border) text-sm font-bold text-(--foreground) group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all shadow-sm">
                                    View Discussion <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {/* Functional Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                    <button 
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="w-10 h-10 rounded-xl bg-(--card) border border-(--border) hover:border-primary text-gray-500 hover:text-primary transition-all flex items-center justify-center font-bold disabled:opacity-50"
                    >‹</button>
                    
                    {getPageNumbers().map((num, i) => (
                        num === '...' ? (
                            <span key={i} className="px-2 text-gray-400 font-bold">...</span>
                        ) : (
                            <button 
                                key={i}
                                onClick={() => setCurrentPage(num)}
                                className={`w-10 h-10 rounded-xl font-bold transition-all shadow-sm ${
                                    currentPage === num 
                                        ? "bg-primary shadow-lg shadow-primary/30 text-white border-transparent" 
                                        : "bg-(--card) border border-(--border) hover:border-primary hover:text-primary text-(--foreground)"
                                }`}
                            >
                                {num}
                            </button>
                        )
                    ))}

                    <button 
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="w-10 h-10 rounded-xl bg-(--card) border border-(--border) hover:border-primary text-gray-500 hover:text-primary transition-all flex items-center justify-center font-bold disabled:opacity-50"
                    >›</button>
                </div>
            )}
        </div>
    );
}