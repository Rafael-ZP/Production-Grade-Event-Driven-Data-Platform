import React, { InputHTMLAttributes } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-gray-400 text-sm">{label}</label>
      <input
        className={twMerge(
          "bg-gray-700 rounded px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-600 transition",
          className
        )}
        {...props}
      />
    </div>
  );
}
