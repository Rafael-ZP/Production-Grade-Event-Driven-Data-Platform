"use client";

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { MovieCard } from '@/components/MovieCard';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { Play, Info } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Movie {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
}

export default function Home() {
  const { user, loading } = useAuth();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [heroMovie, setHeroMovie] = useState<Movie | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchMovies();
    }
  }, [user]);

  const fetchMovies = async () => {
    try {
      const response = await api.get<Movie[]>('/movies');
      setMovies(response.data);
      if (response.data.length > 0) {
        // Pick a random movie for the Hero section
        const randomMovie = response.data[Math.floor(Math.random() * response.data.length)];
        setHeroMovie(randomMovie);
      }
    } catch (error) {
      console.error("Failed to fetch movies", error);
    }
  };

  if (loading || !user) return <div className="h-screen bg-black text-white flex items-center justify-center">Loading...</div>;

  return (
    <div className="bg-zinc-900 h-full min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      {heroMovie && (
        <div className="relative h-[56.25vw]">
          <video 
            className="w-full h-[56.25vw] object-cover brightness-[60%]"
            autoPlay
            muted
            loop
            poster={`https://placehold.co/1920x1080/1a1a1a/e50914?text=${encodeURIComponent(heroMovie.title)}`}
            src={heroMovie.videoUrl} 
          >
          </video>
          
          <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
            <p className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
              {heroMovie.title}
            </p>
            <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
              {heroMovie.description}
            </p>
            <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
              <Link href={`/watch/${heroMovie.id}`} className="bg-white text-black rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-neutral-300 transition">
                <Play className="mr-1 w-4 h-4 md:w-7 md:h-7 text-black" fill="black" />
                Play
              </Link>
              <button className="bg-gray-500/70 text-white rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-gray-500/50 transition">
                <Info className="mr-1 w-4 h-4 md:w-7 md:h-7" />
                 More Info
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Movie Grid */}
      <div className="pb-40">
        <h2 className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4 ml-4 md:ml-16 mt-4">Trending Now</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 px-4 md:px-16">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}
