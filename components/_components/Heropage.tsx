"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Typography from "@/components/utils/Typography";

type PixelConfig = {
  position: React.CSSProperties;
  speed: number;
};

const pixels: PixelConfig[] = [
  { position: { top: "8%", left: "35%" }, speed: 120 },
  { position: { top: "22%", right: "18%" }, speed: -90 },
  { position: { bottom: "12%", right: "5%" }, speed: -140 },
  { position: { bottom: "5%", left: "48%" }, speed: 100 },
];

type PixelProps = PixelConfig & {
  scrollYProgress: MotionValue<number>;
};

const Pixel = ({ position, speed, scrollYProgress }: PixelProps) => {
  const y = useTransform(scrollYProgress, [0, 1], [0, speed]);

  return (
    <motion.div
      aria-hidden
      style={{ ...position, y }}
      whileHover={{ scale: 1.8, opacity: 1, borderRadius: "50%" }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className="absolute grid h-16 w-16 cursor-pointer grid-cols-2 grid-rows-2 overflow-hidden opacity-30">
      <div className="bg-gray-200" />
      <div className="bg-gray-800" />
      <div className="bg-gray-900" />
      <div className="bg-gray-400" />
    </motion.div>
  );
};

const Heropage = () => {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const headingY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const nameY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const headingOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-[#1d1d1d] text-white">
      <Typography variant="name" className="text-gray-300 px-8 md:px-16 pt-8">
        SATYAM
      </Typography>
      {/* Background Pixels */}
      {pixels.map((pixel, index) => (
        <Pixel
          key={index}
          position={pixel.position}
          speed={pixel.speed}
          scrollYProgress={scrollYProgress}
        />
      ))}

      <button
        type="button"
        className="absolute top-5 right-5 mt-5 rounded-[5px] bg-white px-5 py-1 text-sm font-semibold text-[#1d1d1d]">
        Resume
      </button>

      {/* Content */}
      <div className="mx-auto flex h-screen w-full items-center px-8 md:px-16">
        <div>
          {/* Top */}
          <motion.div style={{ y: subtitleY }} className="mb-12">
            <Typography as="h1" variant="title">
              BUILD • SHIP • SCALE
            </Typography>

            <span className="mt-2 block h-1 w-10 bg-gray-400" />
          </motion.div>

          {/* Name */}
          <motion.div style={{ y: nameY }} className="mb-3"></motion.div>

          {/* Hero Heading */}
          <motion.div
            style={{
              y: headingY,
              opacity: headingOpacity,
            }}>
            <Typography as="h2" variant="hero" className="text-gray-200">
              FULL{" "}
              <motion.span
                className="inline-block"
                initial={{ rotate: 180 }}
                animate={{ rotate: 0 }}
                transition={{
                  duration: 1,
                  ease: "easeOut",
                }}>
                S
              </motion.span>
              TACK
              <br />
              ENGINEER
            </Typography>
          </motion.div>

          {/* Subtitle This will appear while scrolling */}
          <motion.div style={{ y: subtitleY }} className="mt-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: 0.3,
              }}>
              <Typography variant="subtitle" className="max-w-xl text-gray-500">
                Crafting digital experiences with code and creativity.
              </Typography>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Heropage;
