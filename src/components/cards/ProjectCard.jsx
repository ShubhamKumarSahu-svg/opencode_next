'use client';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';

const ROTATION_RANGE = 20.5;
const HALF_ROTATION_RANGE = 20.5 / 2;

export default function ProjectCard({ project, index }) {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;
    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;
    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      style={{ transformStyle: 'preserve-3d', transform }}
      className="relative h-full rounded-xl bg-white/5 border border-white/10 p-1 backdrop-blur-sm"
    >
      <div
        style={{ transform: 'translateZ(50px)' }}
        className="absolute inset-4 -z-10 rounded-xl bg-[#893193]/30 blur-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-100"
      />

      <div className="relative h-full flex flex-col overflow-hidden rounded-lg bg-[#0B1843] shadow-2xl">
        <div className="relative h-52 w-full overflow-hidden group">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1843] to-transparent opacity-80" />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="mb-4 flex items-start justify-between">
            <h4 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-600 transition-all">
              {project.title}
            </h4>
            <a
              href={project.url}
              target="_blank"
              className="rounded-full bg-white/5 p-2 text-white/70 hover:bg-[#9b87fe] hover:text-white transition-all shadow-[0_0_15px_rgba(155,135,254,0.3)]"
            >
              <ArrowUpRight className="h-5 w-5" />
            </a>
          </div>

          <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-300 font-light">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags?.map((tag, i) => (
              <span
                key={i}
                className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-[#9b87fe] transition-colors hover:border-[#9b87fe]/50 hover:bg-[#9b87fe]/10"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
