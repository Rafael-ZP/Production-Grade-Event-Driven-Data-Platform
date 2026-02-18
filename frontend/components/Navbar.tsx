"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { LogOut, Film } from 'lucide-react';

const TOP_OFFSET = 66;

export default function Navbar() {
  const { user, logout } = useAuth();
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 p-4 transition-colors duration-500 ${showBackground ? 'bg-zinc-900 bg-opacity-90' : 'bg-transparent'}`}>
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
