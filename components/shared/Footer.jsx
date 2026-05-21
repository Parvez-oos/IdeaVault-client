import Link from 'next/link';
import { Lightbulb, Mail, MapPin } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-(--background) border-t border-(--border) pt-16 pb-8 transition-colors mt-auto">
            <div className="max-w-350 mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
                
                {/* 1. Brand Column */}
                <div className="space-y-4 pr-4">
                    <Link href="/" className="flex items-center gap-2">
                        <Lightbulb className="text-primary" size={24} />
                        <span className="text-xl font-bold text-primary tracking-tight">IdeaVault</span>
                    </Link>
                    <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                        Empowering innovators to shape the future through ideas and collaboration.
                    </p>
                </div>

                {/* 2. Platform Links */}
                <div>
                    <h4 className="font-bold mb-6 text-(--foreground)">Platform</h4>
                    <ul className="space-y-4 text-sm text-gray-500">
                        <li><Link href="/ideas" className="hover:text-primary transition">Ideas</Link></li>
                        <li><Link href="/" className="hover:text-primary transition">Categories</Link></li>
                        <li><Link href="/" className="hover:text-primary transition">How It Works</Link></li>
                        <li><Link href="/" className="hover:text-primary transition">Top Creators</Link></li>
                    </ul>
                </div>

                {/* 3. Company Links */}
                <div>
                    <h4 className="font-bold mb-6 text-(--foreground)">Company</h4>
                    <ul className="space-y-4 text-sm text-gray-500">
                        <li><Link href="/" className="hover:text-primary transition">About Us</Link></li>
                        <li><Link href="/" className="hover:text-primary transition">Contact</Link></li>
                        <li><Link href="/" className="hover:text-primary transition">Privacy Policy</Link></li>
                        <li><Link href="/" className="hover:text-primary transition">Terms of Service</Link></li>
                    </ul>
                </div>

                {/* 4. Connect Column */}
                <div>
                    <h4 className="font-bold mb-6 text-(--foreground)">Connect</h4>
                    <div className="space-y-4 text-sm text-gray-500 mb-6">
                        <div className="flex items-center gap-2">
                            <Mail size={16} className="text-(--foreground)" /> 
                            <span className="font-bold text-(--foreground)">Email:</span> 
                            info@ideavault.com
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-(--foreground)" /> 
                            <span className="font-bold text-(--foreground)">Location:</span> 
                            Dhaka, Bangladesh
                        </div>
                    </div>

                    {/* Social Icons matching the image exactly */}
                    <div className="flex gap-3">
                        <a href="#" className="w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-80 transition shadow-sm">
                            <FaFacebookF size={14} />
                        </a>
                        <a href="#" className="w-8 h-8 rounded-full bg-linear-to-tr from-yellow-400 via-pink-500 to-purple-500 text-white flex items-center justify-center hover:opacity-80 transition shadow-sm">
                            <FaInstagram size={16} />
                        </a>
                        <a href="#" className="w-8 h-8 rounded-full bg-black dark:bg-white dark:text-black text-white flex items-center justify-center hover:opacity-80 transition shadow-sm">
                            {/* Exact X (Twitter) Logo path */}
                            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" aria-hidden="true">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.96H5.078z" />
                            </svg>
                        </a>
                        <a href="#" className="w-8 h-8 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:opacity-80 transition shadow-sm">
                            <FaLinkedinIn size={14} />
                        </a>
                    </div>
                </div>

            </div>

            {/* Copyright Bar */}
            <div className="max-w-350 mx-auto px-6 pt-6 border-t border-(--border) text-center text-sm font-medium text-gray-500">
                © 2025 <span className="font-bold text-(--foreground)">IdeaVault</span>. All rights reserved.
            </div>
        </footer>
    );
}