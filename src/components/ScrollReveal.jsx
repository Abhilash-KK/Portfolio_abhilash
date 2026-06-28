import React, { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({ children, className = '' }) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px' // Adjusts the point of reveal slightly below the fold
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        if (observer && ref.current) {
          observer.unobserve(ref.current);
        }
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-1000 ease-out ${
        isIntersecting
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-[30px]'
      }`}
    >
      {children}
    </div>
  );
}
