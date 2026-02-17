"use client";

import React, { useState } from 'react';
import { Input } from '@/components/Input';
import Link from 'next/link';
import api from '@/lib/api';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [allowedMovies, setAllowedMovies] = useState(1);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { name: username, email, password, allowedMovies });
      router.push('/login');
    } catch (err: any) {
        console.error(err);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="relative h-screen w-full bg-[url('/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <Navbar />
        <div className="flex justify-center">
          <div className="bg-black/70 px-16 py-16 self-center mt-2 w-full lg:w-2/5 lg:max-w-md rounded-md">
            <h2 className="text-white text-4xl mb-8 font-semibold">Register</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                label="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                label="BAAmail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex flex-col gap-1">
                <label className="text-white text-sm font-semibold">Subscription Plan (Allowed Movies)</label>
                <select
                  value={allowedMovies}
                  onChange={(e) => setAllowedMovies(parseInt(e.target.value))}
                  className="block rounded-md bg-neutral-700 px-6 pt-6 pb-1 w-full text-md text-white appearance-none focus:outline-none focus:ring-0 peer"
                >
                  <option value={1}>1 Movie</option>
                  <option value={2}>2 Movies</option>
                  <option value={3}>3 Movies</option>
                </select>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                Sign Up
              </button>
            </form>
            <p className="text-neutral-500 mt-12">
              Already have an account?
              <Link href="/login" className="text-white ml-1 hover:underline cursor-pointer">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
