import React, { useEffect, useState } from 'react';

export const ReadingProgressBar: React.FC = () => {
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      const docElem = document.documentElement;
      const docBody = document.body;

      const scrollTop = window.scrollY || docElem.scrollTop || docBody.scrollTop || 0;
      const scrollHeight = Math.max(
        docElem.scrollHeight,
        docBody.scrollHeight,
        docElem.clientHeight
      );
      const clientHeight = window.innerHeight || docElem.clientHeight || 0;

      const totalScrollable = scrollHeight - clientHeight;
      const progressPercent = totalScrollable > 0 ? (scrollTop / totalScrollable) * 100 : 0;

      setCompletion(Math.min(Math.max(progressPercent, 0), 100));
      ticking = false;
    };

    let rafId: number | null = null;

    const onScroll = () => {
      if (!ticking) {
        rafId = window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateScrollProgress();

    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3px] bg-white/[0.06] z-[9999] pointer-events-none"
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={Math.round(completion)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Progress fill bar */}
      <div
        className="h-full bg-gradient-to-r from-[#ff8c59] via-amber-300 to-[#ff8c59] transition-[width] duration-100 ease-out relative shadow-[0_0_12px_rgba(255,140,89,0.85)]"
        style={{ width: `${completion}%` }}
      >
        {/* Glowing bead on the right edge */}
        {completion > 0 && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff,0_0_14px_#ff8c59]" />
        )}
      </div>
    </div>
  );
};
