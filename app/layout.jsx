import { Inter } from 'next/font/google';
import './globals.css';
import AuthProvider from '@/context/AuthProvider';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { Toaster } from 'sonner';
import { ThemeProvider } from 'next-themes';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = { title: 'IdeaVault', description: 'Share Ideas. Build the Future.' };

export default function RootLayout({ children }) {
  // Removed hardcoded "dark" class. ThemeProvider handles it now.
  return (
    <html lang="en" suppressHydrationWarning> 
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthProvider>
            <Navbar />
            <main className="grow pt-20">
              {children}
            </main>
            <Footer />
            <Toaster richColors position="top-right" />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}