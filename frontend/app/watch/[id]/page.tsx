"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/api';

interface Movie {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
}

export default function WatchPage() {
  const { id } = useParams();
  const { user, loading } = useAuth();
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user && id) {
      fetchMovie();
    }
  }, [user, id]);

  const fetchMovie = async () => {
    try {
      const response = await api.get<Movie>(`/movies/${id}`);
      setMovie(response.data);
    } catch (error) {
      console.error("Failed to fetch movie", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRef.current && !videoRef.current.paused) {
        sendHeartbeat();
      }
    }, 10000); 

    return () => clearInterval(interval);
  }, [movie]);

  const sendHeartbeat = async () => {
    if (!id) return;
    try {
      await api.post('/events', {
        userId: user?.username || 'anonymous',
        videoId: Array.isArray(id) ? id[0] : id,
        eventType: 'PLAY',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error("Failed to send heartbeat", error);
    }
  };

  if (loading || !user || !movie) return <div className="h-screen bg-black text-white flex items-center justify-center">Loading...</div>;

  return (
    <div className="h-screen w-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black/50 hover:bg-black/80 transition">
        <Link href="/">
           <ArrowLeft className="text-white cursor-pointer hover:opacity-80 transition" size={40} />
        </Link>
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light">Watching:</span> {movie.title}
        </p>
      </nav>
      
      <video
        ref={videoRef}
        className="h-full w-full"
        autoPlay
        controls
        src={movie.videoUrl}
      >
      </video>
    </div>
  );
}
