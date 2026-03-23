'use client';
import React from 'react';
import { WavePath } from "./wave-path";
import { cn } from '../../lib/utils';

export default function WavePathDemo() {
  return (
    <div className="relative w-full flex min-h-screen flex-col items-center justify-center">
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute -top-10 left-1/2 size-full -translate-x-1/2 rounded-full',
          'bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1),transparent_50%)]',
          'blur-[30px]',
        )}
      />
      <div className="flex w-[70vw] flex-col items-end">
        <WavePath className="mb-10 text-blue-400" />
        <div className="flex w-full flex-col items-end">
          <div className="flex justify-end">
            <p className="text-white/50 mt-2 text-sm">Voice Builder</p>
            <p className="text-white/80 ml-8 w-3/4 text-2xl md:text-4xl">
              Experience the power of voice-driven development. Let the 
              simplicity of speech transform your ideas into reality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
