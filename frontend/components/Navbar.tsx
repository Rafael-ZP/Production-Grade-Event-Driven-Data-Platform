"use client";

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { LogOut, Film } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/80 to-transparent p-4 transition-all duration-300">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-red-600 font-bold text-3xl tracking-tighter hover:scale-105 transition-transform">
            <Film className="w-8 h-8" />
            NETFLIX
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-white text-sm hidden sm:block">Welcome, {user.username}</span>
              <button
                onClick={logout}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
               <Link href="/login" className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded font-semibold transition-colors">
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
