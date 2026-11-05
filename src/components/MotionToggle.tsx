import React, { useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

export const MotionToggle: React.FC = () => {
  const [motionActive, setMotionActive] = useState<boolean>(true);

  useEffect(() => {
    // Check initial system preference
    if (typeof window !== 'undefined' && window.matchMedia) {
      const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduce) {
        setMotionActive(false);
        document.documentElement.classList.add('reduce-motion');
      }
    }
  }, []);

  const toggleMotion = () => {
    setMotionActive((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.remove('reduce-motion');
      } else {
        document.documentElement.classList.add('reduce-motion');
      }
      return next;
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none">
      <button
        onClick={toggleMotion}
        type="button"
        className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#030303]/85 backdrop-blur-md border border-[rgba(241,238,232,0.15)] text-[#aaa9a4] hover:text-[#f1eee8] hover:border-[#ff8c59]/50 transition-all text-[11px] font-mono tracking-widest uppercase shadow-xl cursor-pointer"
        aria-label="Toggle animations and particle motion"
        title="Toggle motion"
      >
        {motionActive ? (
          <>
            <Pause className="w-3 h-3 text-[#ff8c59]" />
            <span>MOTION ON</span>
          </>
        ) : (
          <>
            <Play className="w-3 h-3 text-[#aaa9a4]" />
            <span>MOTION OFF</span>
          </>
        )}
      </button>
    </div>
  );
};

