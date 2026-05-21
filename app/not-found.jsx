import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
            <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
            <h2 className="text-2xl font-bold text-(--foreground) mb-2">Page Not Found</h2>
            <p className="text-sm text-gray-500 mb-8">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
            
            {/* Robot Illustration Placeholder matching blueprint */}
            <div className="w-64 h-64 bg-(--muted) border border-(--border) rounded-full mb-8 flex items-center justify-center">
                <span className="text-gray-400 text-sm font-medium">[Robot Illustration]</span>
            </div>

            <Link href="/" className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-lg text-sm font-bold transition">
                Go Home
            </Link>
        </div>
    );
}