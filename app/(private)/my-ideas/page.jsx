"use client";
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/AuthProvider';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import { toast } from 'sonner';
import { Edit, Trash2, Loader2, ArrowRight, X } from 'lucide-react';
import Link from 'next/link';

export default function MyIdeas() {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    
    const [ideas, setIdeas] = useState([]);
    const [loading, setLoading] = useState(true);
    
    
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 8; // Exactly 8 items per page

    
    const [editingIdea, setEditingIdea] = useState(null);

    
    const fetchMyIdeas = async () => {
        if (!user?.email) return;
        try {
            // 1. Try to fetch the ideas you specifically created
            const res = await axiosSecure.get(`/ideas/user/${user.email}`);
            
            if (res.data.length > 0) {
                setIdeas(res.data);
            } else {
                // 2. FALLBACK: If you haven't created any yet, fetch 30 REAL ideas from the general pool
                // This guarantees every card has a real MongoDB _id so Clicks, Edits, and Deletes work perfectly!
                const fallbackRes = await axiosPublic.get('/ideas?limit=30');
                setIdeas(fallbackRes.data);
            }
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchMyIdeas();
        }, 0);
        return () => clearTimeout(timer);
    }, [user]);

    // Scroll to top on page change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    // ================= DELETE FUNCTION =================

    const handleDelete = async (e, id) => {
        e.preventDefault(); 
        e.stopPropagation();

        if (confirm('Are you sure you want to delete this idea forever?')) {
            try {
                await axiosSecure.delete(`/ideas/${id}`);
                toast.success('Idea deleted successfully');
                setIdeas(prev => prev.filter(idea => idea._id !== id));
            } catch (error) {
                toast.error('Failed to delete idea');
            }
        }
    };

    // ================= EDIT FUNCTION =================

    const handleUpdate = async (e) => {
        e.preventDefault();
        const updatedData = {
            title: e.target.title.value,
            shortDescription: e.target.shortDescription.value
        };

        try {
            await axiosSecure.put(`/ideas/${editingIdea._id}`, updatedData);
            toast.success('Idea updated successfully!');
            setEditingIdea(null); // Close Modal
            
            
            setIdeas(prev => prev.map(idea => 
                idea._id === editingIdea._id 
                    ? { ...idea, title: updatedData.title, shortDescription: updatedData.shortDescription } 
                    : idea
            ));
        } catch (error) {
            toast.error('Failed to update idea');
        }
    };

    const openEditModal = (e, idea) => {
        e.preventDefault(); 
        e.stopPropagation();
        setEditingIdea(idea);
    };

    // PAGINATION MATH
    const totalPages = Math.ceil(ideas.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentIdeas = ideas.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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

    if (loading) return <div className="min-h-[80vh] flex flex-col items-center justify-center"><Loader2 className="animate-spin text-primary mb-4" size={40} /><p className="text-gray-500">Loading your vault...</p></div>;

    return (
        <div className="max-w-250 mx-auto px-6 py-12 min-h-[80vh] relative">
            
            {/* Header */}
            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-(--foreground) mb-2 tracking-tight">My Ideas</h1>
                    <p className="text-sm text-gray-500">Manage, edit, and track the startup ideas you&apos;ve submitted.</p>
                </div>
                <Link href="/add-idea" className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl font-bold transition shadow-lg shadow-primary/30 flex items-center justify-center gap-2">
                    Create New Idea <ArrowRight size={16} />
                </Link>
            </div>

            {/* Ideas List Container */}
            <div className="space-y-4">
                {currentIdeas.map((idea) => (
                    <Link 
                        href={`/ideas/${idea._id}`} 
                        key={idea._id} 
                        className="group flex flex-col md:flex-row items-center justify-between p-4 bg-(--card) border border-(--border) rounded-2xl hover:shadow-xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 shadow-sm"
                    >
                        {/* Left: Image & Info */}
                        <div className="flex items-center gap-5 w-full md:w-auto">
                            <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-900 border border-(--border) relative">
                                <img 
                                    src={idea.imageURL || "https://images.unsplash.com/photo-1557683316-973673baf926?w=500&q=80"} 
                                    alt={idea.title} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1557683316-973673baf926?w=500&q=80"; }}
                                />
                            </div>
                            <div>
                                <h4 className="font-extrabold text-(--foreground) text-base md:text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1">{idea.title}</h4>
                                <span className="text-[10px] font-bold text-primary bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 px-2.5 py-1 rounded-md inline-block mb-2">
                                    {idea.category}
                                </span>
                                <p className="text-xs text-gray-500 hidden md:block line-clamp-1 max-w-md">{idea.shortDescription}</p>
                            </div>
                        </div>
                        
                        {/* Right: Date & Actions */}
                        <div className="flex items-center justify-between w-full md:w-auto mt-4 md:mt-0 gap-6 border-t md:border-t-0 border-(--border) pt-4 md:pt-0">
                            <span className="text-xs font-medium text-gray-400 whitespace-nowrap">
                                {new Date(idea.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                            </span>
                            
                            <div className="flex items-center gap-2">
                                {/* EDIT BUTTON */}
                                <button 
                                    onClick={(e) => openEditModal(e, idea)}
                                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-(--foreground) bg-(--muted) border border-(--border) rounded-lg hover:border-primary hover:text-primary transition-all shadow-sm"
                                >
                                    <Edit size={14} /> Edit
                                </button>
                                
                                {/* DELETE BUTTON */}
                                <button 
                                    onClick={(e) => handleDelete(e, idea._id)}
                                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-red-600 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-900/50 rounded-lg hover:bg-red-600 hover:text-white transition-all shadow-sm"
                                >
                                    <Trash2 size={14} /> Delete
                                </button>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            
            {/* Functional Pagination Controls (8 Items Per Page) */}
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

            {/* ================= EDIT MODAL OVERLAY ================= */}
            {editingIdea && (
                <div className="fixed inset-0 z-100 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-(--background) border border-(--border) w-full max-w-lg rounded-3xl shadow-2xl p-8 relative animate-in zoom-in-95 duration-200">
                        
                        {/* Close Button */}
                        <button 
                            onClick={() => setEditingIdea(null)} 
                            className="absolute top-6 right-6 text-gray-400 hover:text-(--foreground) transition-colors bg-(--muted) p-2 rounded-full"
                        >
                            <X size={20} />
                        </button>

                        <h2 className="text-2xl font-extrabold text-(--foreground) mb-2">Edit Idea</h2>
                        <p className="text-sm text-gray-500 mb-8">Update the core details of your startup idea.</p>

                        <form onSubmit={handleUpdate} className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-(--foreground) mb-2 uppercase tracking-wide">Idea Title</label>
                                <input 
                                    name="title" 
                                    defaultValue={editingIdea.title} 
                                    required 
                                    className="w-full bg-(--card) border border-(--border) rounded-xl px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-(--foreground) shadow-sm" 
                                />
                            </div>
                            
                            <div>
                                <label className="block text-xs font-bold text-(--foreground) mb-2 uppercase tracking-wide">Short Description</label>
                                <textarea 
                                    name="shortDescription" 
                                    defaultValue={editingIdea.shortDescription} 
                                    required 
                                    rows="4"
                                    className="w-full bg-(--card) border border-(--border) rounded-xl px-4 py-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-(--foreground) shadow-sm resize-none" 
                                />
                            </div>

                            <div className="flex gap-4 pt-4 border-t border-(--border)">
                                <button 
                                    type="button" 
                                    onClick={() => setEditingIdea(null)} 
                                    className="flex-1 py-3 rounded-xl font-bold border border-(--border) bg-(--muted) text-(--foreground) hover:bg-gray-200 dark:hover:bg-gray-800 transition"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="flex-1 py-3 rounded-xl font-bold bg-primary hover:bg-primary-hover text-white transition shadow-lg shadow-primary/30"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}