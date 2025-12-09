'use client';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { ExternalLink, Quote } from 'lucide-react';
import Image from 'next/image';

export default function TestimonialCard({ testimonial }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className="group relative h-full rounded-2xl border border-white/5 bg-[#0B1843]/50 px-8 py-10 backdrop-blur-sm transition-colors hover:border-[#9b87fe]/30"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(155, 135, 254, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative flex h-full flex-col gap-8">
        <div className="flex items-center gap-5">
          <div className="relative h-16 w-16 shrink-0 rounded-full border-2 border-[#893193] p-1 shadow-[0_0_20px_rgba(137,49,147,0.3)]">
            <div className="relative h-full w-full overflow-hidden rounded-full">
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <h6 className="text-lg font-bold text-white tracking-wide font-poppins">
              {testimonial.name}
            </h6>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-[#9b87fe]">
                {testimonial.role}
              </span>
              <span className="text-xs text-gray-400 font-semibold tracking-wider">
                {testimonial.company}
              </span>
            </div>
          </div>
        </div>{' '}
        <div className="relative flex-1">
          <Quote className="absolute -left-1 -top-3 h-10 w-10 text-[#9b87fe]/10 rotate-180" />
          <blockquote className="relative z-10 pl-6 border-l-2 border-[#893193]/50">
            <p className="text-base leading-relaxed text-gray-200 font-light italic">
              "{testimonial.quote}"
            </p>
          </blockquote>
        </div>
        {testimonial.blogUrl && (
          <div className="pt-2">
            {' '}
            <a
              href={testimonial.blogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-2 text-sm font-medium text-[#9b87fe] hover:text-white transition-colors"
            >
              Read case study
              <ExternalLink className="h-4 w-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
