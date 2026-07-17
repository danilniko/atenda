"use client";

import { useEffect, useState } from "react";

const SECTIONS = ["s1", "s2", "s3", "s4", "srev", "s5", "sfaq", "s6"];

export function Rail() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const els = SECTIONS.map((id) => document.getElementById(id)).filter(
      Boolean
    ) as HTMLElement[];
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            const i = els.indexOf(e.target as HTMLElement);
            if (i >= 0) setActive(i);
          }
        });
      },
      { threshold: 0.55 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="rail" aria-hidden="true">
      {SECTIONS.map((id, i) => (
        <a key={id} href={`#${id}`} className={i === active ? "on" : ""} />
      ))}
    </div>
  );
}

export function Reveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".rv").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
