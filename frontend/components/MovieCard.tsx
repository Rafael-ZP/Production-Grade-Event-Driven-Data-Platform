import React from 'react';
import Link from 'next/link';
import { Play } from 'lucide-react';

interface Movie {
  id: number;
  title: string;
  description: string;
  videoUrl: string; // Used for thumbnail simulation or checking availability
}

export function MovieCard({ movie }: { movie: Movie }) {
  // Simulate a thumbnail using a placeholder service with the movie title
  const thumbnailUrl = `https://placehold.co/400x600/1a1a1a/e50914?text=${encodeURIComponent(movie.title)}`;

  return (
    <div className="group relative h-[12vw] min-h-[160px] cursor-pointer transition-transform duration-200 ease-out hover:scale-110 hover:z-50">
      <img
        src={thumbnailUrl}
        alt={movie.title}
        className="object-cover rounded-md shadow-xl w-full h-full"
      />
      
      {/* Hovver Overlay */}
      <div className="opacity-0 group-hover:opacity-100 absolute top-0 left-0 w-full h-full bg-black/60 rounded-md transition-opacity duration-300 flex flex-col items-center justify-center gap-2 p-2">
         <h3 className="text-white font-bold text-center text-sm">{movie.title}</h3>
         <Link href={`/watch/${movie.id}`}>
            <button className="bg-white text-black rounded-full p-2 hover:bg-gray-200 transition">
                <Play className="w-4 h-4 fill-black" />
            </button>
         </Link>
         <p className="text-gray-300 text-xs line-clamp-2 text-center">{movie.description}</p>
      </div>
    </div>
  );
}
