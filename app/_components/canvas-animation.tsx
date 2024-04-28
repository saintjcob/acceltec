"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const CanvasAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInView = useInView(canvasRef, {
    amount: 0.7,
  });

  // console.log(isInView);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // const scaleX = window.innerWidth / canvas.width;
    // const parentHeight = canvas.parentElement?.clientHeight || 0;
    // const scaleY = parentHeight / canvas.height;

    // const scaleToCover = Math.max(scaleX, scaleY);

    // canvas.style.transformOrigin = "0 0"; //scale from top left
    // canvas.style.transform = `scale(${scaleToCover})`;

    const col = (x: number, y: number, shade: number) => {
      if (!ctx) return;
      ctx.fillStyle = `rgba(${shade}, ${shade}, ${shade}, 1)`;
      ctx.fillRect(x, y, 1, 1);
    };

    const R = (x: number, y: number, t: number) => {
      return Math.floor(5 + 4 * Math.cos((x * x + y * y) / 100 + t));
    };

    const G = (x: number, y: number, t: number) => {
      return Math.floor(
        0 +
          2 *
            Math.sin((x * x * Math.cos(t / 2) + y * y * Math.sin(t / 3)) / 100),
      );
    };

    const B = (x: number, y: number, t: number) => {
      return Math.floor(10 + 2 * Math.sin(5 * Math.sin(t / 6) + (x * y) / 800));
    };

    let t = 0;

    let animationFrameId: number;

    const run = () => {
      // Run the animation
      for (let x = 0; x <= 31; x++) {
        // Loop through the canvas
        for (let y = 0; y <= 31; y++) {
          const shade = Math.max(
            0,
            Math.min(255, R(x, y, t) + G(x, y, t) + B(x, y, t)),
          );
          col(x, y, shade);
        }
      }
      t = t + 0.009;
      animationFrameId = window.requestAnimationFrame(run);
    };

    const resizeHandler = () => {
      const canvas = canvasRef.current;
      if (!canvas || !isInView) return;

      const parentHeight =
        canvas.parentElement?.clientHeight || window.innerHeight;

      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = parentHeight;

      // Redraw the canvas content
      const col = (x: number, y: number, shade: number) => {
        ctx.fillStyle = `rgba(${shade}, ${shade}, ${shade}, 1)`;
        ctx.fillRect(x, y, 1, 1);
      };

      // Clear the canvas
      // ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Re-run the animation
      for (let x = 0; x <= 31; x++) {
        for (let y = 0; y <= 31; y++) {
          const shade = Math.max(
            10,
            Math.min(255, R(x, y, t) + G(x, y, t) + B(x, y, t)),
          );
          col(x, y, shade);
        }
      }

      if (isInView) run();
    };

    if (!isInView) return;
    run();

    window.addEventListener("resize", resizeHandler);

    // Cleanup function
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeHandler);
    };
  }, [isInView]);

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0, visibility: "hidden" }}
      animate={{
        opacity: isInView ? 1 : 0,
        visibility: isInView ? "visible" : "hidden",
      }}
      transition={{
        type: "tween",
        duration: isInView ? 0.1 : 0.05,
        // ease: "easeIn",
        visibility: { delay: isInView ? 0 : 0.05 },
      }}
      width={32}
      height={32}
      className="absolute left-0 top-0 -z-50 w-screen"
    />
  );
};

export default CanvasAnimation;
