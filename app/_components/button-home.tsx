"use client";

import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

export default function ButtonHome({
  children,
}: {
  children: React.ReactNode;
}) {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(true);
  let lastScrollY = scrollY.get();

  const MotionLink = motion(Link);

  useMotionValueEvent(scrollY, "change", (currentScrollY) => {
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsVisible(false);
    } else if (currentScrollY < lastScrollY) {
      setIsVisible(true);
    } else {
      setIsVisible(true);
    }
    lastScrollY = currentScrollY;
  });

  return (
    <MotionLink
      href="/"
      initial={{
        opacity: isVisible ? 0 : 1,
        scale: isVisible ? 0.92 : 1,
        boxShadow:
          "0px 0px 0px 2px rgba(255, 255, 255, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.2)",
      }}
      animate={{
        boxShadow:
          "0px 0px 0px 2px rgba(255, 255, 255, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.2)",
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.92,
        visibility: isVisible ? "visible" : "hidden",
      }}
      whileHover={{
        boxShadow:
          "0px 0px 0px 2px rgba(255, 255, 255, 1), 0px 2px 2px 0px rgba(0, 0, 0, 0.2)",
        color: "rgba(255, 255, 255, 1)",
      }}
      transition={{
        opacity: { type: "tween", duration: 0.2 },
        boxShadow: {
          type: "spring",
          damping: 5,
          mass: 0.01,
          bounce: 0,
        },
        visibility: { delay: 0.2 },
      }}
      className="origin-top select-none
      rounded-[32px] bg-[hsla(0,0%,9%,0.5)] px-6 py-3 text-lg text-white/80 outline-none backdrop-blur-sm focus-visible:shadow-[0px_0px_0px_2px_hsla(0,0%,100%,1),0px_2px_2px_0px_hsla(0,0%,0%,0.2)] lg:top-12 lg:text-xl"
      style={{
        boxShadow:
          "0px 0px 0px 2px rgba(255, 255, 255, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.2)",
        opacity: 1,
      }}
    >
      {children}
    </MotionLink>
  );
}
