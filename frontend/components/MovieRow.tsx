import React from 'react';
import { MovieCard } from '@/components/MovieCard';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface Movie {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
}

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

export const MovieRow: React.FC<MovieRowProps> = ({ title, movies }) => {
  const rowRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-2 md:space-y-4 px-4 md:px-12 my-4 md:my-8 group relative z-10 box-border">
      <h2 className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-2 md:mb-4 transition duration-200 hover:text-white/80 cursor-pointer">
        {title}
      </h2>
      
      <div className="group/row relative">
        <ChevronLeft 
            onClick={() => scroll('left')}
            className="absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition group-hover/row:opacity-100 hover:scale-125 group-hover:block hidden bg-black/50 text-white rounded-full p-1" 
        />
        
        <div 
            ref={rowRef}
            className="flex items-center space-x-2 md:space-x-4 overflow-x-scroll scrollbar-hide scroll-smooth"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }} // Hide scrollbar for standard browsers
        >
          {movies.map((movie) => (
             <div key={movie.id} className="min-w-[160px] md:min-w-[200px] lg:min-w-[240px] relative transition duration-200 hover:z-50 hover:scale-105">
                <MovieCard movie={movie} />
             </div>
          ))}
        </div>

        <ChevronRight 
            onClick={() => scroll('right')}
            className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition group-hover/row:opacity-100 hover:scale-125 group-hover:block hidden bg-black/50 text-white rounded-full p-1" 
        />
      </div>
    </div>
  );
};
