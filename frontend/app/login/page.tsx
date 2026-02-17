"use client";

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/Input';
import Link from 'next/link';
import api from '@/lib/api';
import Navbar from '@/components/Navbar';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/token', { email, password });
      // Expecting { token: "..." } from backend
      login(response.data.token, email);
    } catch (err: any) {
      console.error(err);
      setError('Invalid email or password');
    }
  };

  return (
    <div className="relative h-screen w-full bg-[url('/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <Navbar />
        <div className="flex justify-center">
          <div className="bg-black/70 px-16 py-16 self-center mt-2 w-full lg:w-2/5 lg:max-w-md rounded-md">
            <h2 className="text-white text-4xl mb-8 font-semibold">Sign In</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                label="Email"
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
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                Login
              </button>
            </form>
            <p className="text-neutral-500 mt-12">
              First time using Netflix?
              <Link href="/register" className="text-white ml-1 hover:underline cursor-pointer">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
