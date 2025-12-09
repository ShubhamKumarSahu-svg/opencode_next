'use client';
import { motion } from 'framer-motion';

export default function StepCard({ step, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="group relative flex flex-col items-center text-center p-6"
    >
      <span
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 text-[160px] font-black leading-none text-white/5 select-none transition-all duration-500 group-hover:text-[#9b87fe]/5 group-hover:scale-105"
        style={{ fontFamily: 'var(--font-poppins)' }}
      >
        {step.number}
      </span>

      <div className="relative mb-8 mt-12">
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0B1843] border border-[#9b87fe]/30 shadow-[0_0_30px_-10px_rgba(155,135,254,0.3)] transition-all duration-300 group-hover:scale-110 group-hover:border-[#9b87fe] group-hover:shadow-[0_0_50px_-5px_rgba(155,135,254,0.5)]">
          <span className="text-2xl font-bold bg-gradient-to-br from-purple-400 to-pink-600 bg-clip-text text-transparent">
            {step.number}
          </span>
        </div>
      </div>

      <div className="relative z-10 max-w-xs">
        <h3 className="mb-3 text-2xl font-bold text-white group-hover:text-[#9b87fe] transition-colors duration-300">
          {step.title}
        </h3>
        <div className="w-12 h-1 bg-[#893193] mx-auto mb-5 rounded-full group-hover:w-24 transition-all duration-300"></div>

        <p className="text-base leading-relaxed text-gray-300 group-hover:text-white transition-colors font-light">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}
