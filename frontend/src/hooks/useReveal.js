import { useEffect, useRef } from "react";

export default function useReveal() {
  const timeoutsRef = useRef([]);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            const id = setTimeout(() => {
              e.target.classList.add("in-view");
              timeoutsRef.current = timeoutsRef.current.filter(t => t !== id);
            }, i * 70);
            timeoutsRef.current.push(id);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    els.forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, []);
}
