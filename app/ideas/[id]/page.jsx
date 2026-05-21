"use client";
import { useEffect, useState, useContext } from 'react';
import { useParams, useRouter } from 'next/navigation';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { AuthContext } from '@/context/AuthProvider';
import { toast } from 'sonner';
import { ArrowLeft, Bookmark, BookmarkCheck, Heart, MessageSquare, Trash2, Edit, Loader2, Save, X } from 'lucide-react';

export default function IdeaDetails() {
    const { id } = useParams();
    const router = useRouter();
    const { user } = useContext(AuthContext);
    
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    
    const [idea, setIdea] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isPosting, setIsPosting] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

    // NEW: EDIT COMMENT STATES
    const [editingComment, setEditingComment] = useState(null);
    const [editCommentText, setEditCommentText] = useState("");

    // DYNAMIC TITLE
    useEffect(() => {
        document.title = "Idea Details | IdeaVault";
    }, []);

    const fetchData = async () => {
        try {
            const ideaRes = await axiosPublic.get(`/ideas/${id}`);
            setIdea(ideaRes.data);
            
            const commentsRes = await axiosPublic.get(`/comments/idea/${id}`);
            setComments(commentsRes.data);
            
            if (user) {
                const saved = JSON.parse(localStorage.getItem(`bookmarks_${user.email}`)) || [];
                setIsBookmarked(saved.some(b => b._id === ideaRes.data._id));
            }
            setLoading(false);
        } catch (error) {
            toast.error("Failed to load idea details.");
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchData();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 0);
        return () => clearTimeout(timer);
    }, [id, user]);

    const handleBookmark = () => {
        if (!user) {
            toast.error("Please login to bookmark ideas.");
            return router.push('/login');
        }
        let saved = JSON.parse(localStorage.getItem(`bookmarks_${user.email}`)) || [];
        if (isBookmarked) {
            saved = saved.filter(b => b._id !== idea._id);
            toast.success("Removed from bookmarks");
        } else {
            saved.push(idea);
            toast.success("Idea Bookmarked successfully!");
        }
        localStorage.setItem(`bookmarks_${user.email}`, JSON.stringify(saved));
        setIsBookmarked(!isBookmarked);
    };

    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!user) return toast.error("You must be logged in to comment.");
        const text = e.target.comment.value;
        if (!text.trim()) return;

        setIsPosting(true);
        const commentData = {
            ideaId: id, text, authorEmail: user.email,
            authorName: user.displayName || "Anonymous",
            authorPhoto: user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName || 'A'}`
        };

        try {
            await axiosSecure.post('/comments', commentData);
            toast.success('Comment posted!');
            e.target.reset();
            fetchData(); 
        } catch (error) {
            toast.error('Failed to post comment.');
        } finally {
            setIsPosting(false);
        }
    };

    const handleDeleteComment = async (commentId) => {
        if (confirm("Delete this comment?")) {
            try {
                await axiosSecure.delete(`/comments/${commentId}`);
                toast.success('Comment deleted.');
                fetchData();
            } catch (error) {
                toast.error('Failed to delete comment.');
            }
        }
    };

    // FIXED: EDIT COMMENT LOGIC
    const handleEditComment = async (commentId) => {
        if (!editCommentText.trim()) return;
        try {
            await axiosSecure.put(`/comments/${commentId}`, { text: editCommentText });
            toast.success("Comment updated successfully!");
            setEditingComment(null);
            fetchData();
        } catch (error) {
            toast.error("Failed to update comment.");
        }
    };

    if (loading) return <div className="min-h-[80vh] flex flex-col items-center justify-center"><Loader2 className="animate-spin text-primary mb-4" size={40} /></div>;
    if (!idea) return <div className="min-h-[80vh] flex flex-col items-center justify-center"><h2 className="text-2xl font-bold">Idea Not Found</h2></div>;

    const tagsArray = idea.tags ? idea.tags.split(',').map(t => t.trim()) : [];

    return (
        <div className="max-w-300 mx-auto px-6 py-10 min-h-screen">
            <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-8 font-medium transition-colors">
                <ArrowLeft size={16} /> Back to Ideas
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-(--foreground) mb-4">{idea.title}</h1>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                            <div className="flex items-center gap-2">
                                <img src={idea.authorPhoto || `https://ui-avatars.com/api/?name=${idea.authorName}`} alt="Author" className="w-6 h-6 rounded-full" />
                                <span className="font-medium text-(--foreground)">{idea.authorName}</span>
                            </div>
                            <span>•</span>
                            <span>{new Date(idea.createdAt).toLocaleDateString()}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1 text-red-500"><Heart size={14}/> {idea.likes || 0}</span>
                            <span className="flex items-center gap-1 text-blue-500"><MessageSquare size={14}/> {comments.length}</span>
                        </div>
                        
                        <div className="w-full aspect-video bg-gray-100 dark:bg-gray-900 rounded-2xl border border-(--border) overflow-hidden">
                             <img src={idea.imageURL} alt={idea.title} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&q=80"; }} />
                        </div>
                    </div>

                    <div><h3 className="text-lg font-bold text-(--foreground) mb-3">Description</h3><p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">{idea.detailedDescription}</p></div>
                    <div><h3 className="text-lg font-bold text-(--foreground) mb-3">Problem Statement</h3><p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">{idea.problemStatement}</p></div>
                    <div><h3 className="text-lg font-bold text-(--foreground) mb-3">Proposed Solution</h3><p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">{idea.proposedSolution}</p></div>

                    <div className="pt-8 border-t border-(--border)">
                        <h3 className="text-lg font-bold text-(--foreground) mb-6">Comments ({comments.length})</h3>
                        <div className="flex gap-4 mb-8">
                            <img src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || 'U'}`} className="w-10 h-10 rounded-full object-cover border border-(--border)" alt="You" />
                            <form onSubmit={handleAddComment} className="flex-1 relative">
                                <input type="text" name="comment" placeholder={user ? "Write a comment..." : "Please login to comment..."} disabled={!user || isPosting} className="w-full bg-(--muted) border border-(--border) rounded-xl px-4 py-3.5 text-sm focus:border-primary outline-none transition-all pr-24" />
                                <button type="submit" disabled={!user || isPosting} className="absolute right-2 top-2 bottom-2 bg-primary hover:bg-primary-hover text-white px-5 rounded-lg text-xs font-bold transition disabled:opacity-50">Post</button>
                            </form>
                        </div>
                        
                        <div className="space-y-6">
                            {comments.length > 0 ? comments.map((comment) => (
                                <div key={comment._id} className="flex gap-4 group">
                                    <img src={comment.authorPhoto || `https://ui-avatars.com/api/?name=${comment.authorName}`} className="w-10 h-10 rounded-full object-cover border border-(--border)" alt={comment.authorName} />
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-bold text-sm text-(--foreground)">{comment.authorName}</h4>
                                                <span className="text-[10px] text-gray-500">{new Date(comment.timestamp || comment.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            
                                            {/* FIXED: SHOW EDIT AND DELETE IF OWNER */}
                                            {user?.email === comment.authorEmail && (
                                                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                                    <button onClick={() => { setEditingComment(comment._id); setEditCommentText(comment.text); }} className="text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 p-1.5 rounded transition">
                                                        <Edit size={14} />
                                                    </button>
                                                    <button onClick={() => handleDeleteComment(comment._id)} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-1.5 rounded transition">
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        {/* FIXED: EDITING INLINE UI vs NORMAL TEXT */}
                                        {editingComment === comment._id ? (
                                            <div className="mt-2 flex items-center gap-2">
                                                <input 
                                                    type="text" 
                                                    value={editCommentText} 
                                                    onChange={(e) => setEditCommentText(e.target.value)} 
                                                    className="flex-1 bg-white dark:bg-[#0A0A0A] border border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-3 py-2 text-sm outline-none shadow-sm transition"
                                                />
                                                <button onClick={() => handleEditComment(comment._id)} className="bg-primary hover:bg-primary-hover text-white p-2 rounded-lg transition shadow-sm" title="Save">
                                                    <Save size={16} />
                                                </button>
                                                <button onClick={() => setEditingComment(null)} className="bg-(--muted) border border-(--border) text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 p-2 rounded-lg transition shadow-sm" title="Cancel">
                                                    <X size={16} />
                                                </button>
                                            </div>
                                        ) : (
                                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed bg-(--muted) p-3 rounded-xl rounded-tl-none inline-block">
                                                {comment.text}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )) : <p className="text-sm text-gray-500 italic">No comments yet. Be the first to share your thoughts!</p>}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <button onClick={handleBookmark} className={`w-full flex items-center justify-center gap-2 border py-3.5 rounded-xl text-sm font-bold transition shadow-sm ${isBookmarked ? 'bg-primary/10 border-primary text-primary' : 'border-(--border) text-gray-600 dark:text-gray-300 hover:bg-(--muted)'}`}>
                        {isBookmarked ? <><BookmarkCheck size={18} /> Bookmarked</> : <><Bookmark size={18} /> Bookmark Idea</>}
                    </button>

                    <div className="bg-(--card) border border-(--border) rounded-2xl p-6 space-y-6 shadow-sm">
                        <div><h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Category</h4><span className="text-xs font-bold text-primary bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 px-3 py-1.5 rounded-md inline-block">{idea.category}</span></div>
                        <div><h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Target Audience</h4><p className="text-sm font-medium text-(--foreground)">{idea.targetAudience || 'General Audience'}</p></div>
                        <div><h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Estimated Budget</h4><p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{idea.estimatedBudget || 'Not specified'}</p></div>
                        <div>
                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Tags</h4>
                            <div className="flex gap-2 flex-wrap">
                                {tagsArray.length > 0 ? tagsArray.map((tag, i) => <span key={i} className="bg-(--muted) border border-(--border) text-xs font-medium px-2.5 py-1 rounded-md text-(--foreground)">{tag}</span>) : <span className="text-sm text-gray-500">No tags</span>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}