"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext, useEffect, useState, useRef } from 'react';
import { AuthContext } from '@/context/AuthProvider';
import { Search, Lightbulb, Moon, Sun, Menu, X, User, LogOut } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function Navbar() {
    const { user, logoutUser } = useContext(AuthContext);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    
    // DROPDOWN STATE
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        queueMicrotask(() => {
            setMounted(true);
        });
    }, []);

    // CLOSE DROPDOWN WHEN CLICKING OUTSIDE
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Ideas', href: '/ideas' },
        { name: 'Add Idea', href: '/add-idea' },
        { name: 'My Ideas', href: '/my-ideas' },
        { name: 'My Interactions', href: '/my-interactions' },
    ];

    return (
        <nav className="fixed w-full z-50 top-0 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/10 transition-all duration-300">
            <div className="max-w-350 mx-auto px-6 h-16 flex items-center justify-between">
                
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-linear-to-tr from-primary to-blue-600 shadow-lg shadow-primary/20 transition-all duration-300 group-hover:shadow-primary/40 group-hover:scale-105">
                        <Lightbulb className="text-white" size={20} fill="currentColor" />
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                        </span>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Idea<span className="text-primary">Vault</span>
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center space-x-1 text-sm font-medium">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-4 py-2 rounded-full transition-all duration-200 ${
                                    isActive 
                                        ? 'bg-primary/10 text-primary font-semibold' 
                                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <Link
    href="/ideas"
    className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
>
    <Search size={18} />
</Link>
                    
                    {mounted && (
                        <button 
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} 
                            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                        >
                            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                    )}

                    {user ? (
                        <div className="relative ml-1" ref={dropdownRef}>
                            <img 
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                src={user.photoURL || '/default-avatar.png'} 
                                alt="Profile" 
                                className="w-8 h-8 rounded-full border border-gray-200 dark:border-zinc-700 object-cover ring-2 ring-transparent hover:ring-primary/50 transition-all cursor-pointer" 
                            />
                            {/* USER PROFILE DROPDOWN */}
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-xl py-2 animate-in slide-in-from-top-2">
                                    <div className="px-4 py-3 border-b border-gray-100 dark:border-zinc-800 mb-2">
                                        <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user.displayName}</p>
                                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                    </div>
                                    <Link href="/profile" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:text-primary transition-colors">
                                        <User size={16} /> My Profile
                                    </Link>
                                    <button onClick={() => { setDropdownOpen(false); logoutUser(); }} className="w-full flex items-center gap-3 px-4 py-2 mt-1 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors text-left font-medium">
                                        <LogOut size={16} /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link href="/login" className="ml-1 bg-primary hover:bg-primary/90 text-white text-sm px-5 py-2 rounded-full font-medium transition-all shadow-lg hover:shadow-primary/30">
                            Login
                        </Link>
                    )}

                    <button 
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
                        className="p-2 lg:hidden rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden border-t border-gray-200 dark:border-white/10 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md px-6 py-4 space-y-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`block px-4 py-2.5 rounded-xl text-sm font-medium ${
                                pathname === link.href 
                                    ? 'bg-primary/10 text-primary' 
                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800'
                            }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}