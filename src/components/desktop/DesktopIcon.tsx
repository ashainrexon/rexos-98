// components/desktop/DesktopIcon.tsx
'use client';
import { motion } from 'framer-motion';

interface DesktopIconProps {
  label: string;
  icon: string;
  x: number;
  y: number;
  onDoubleClick: () => void;
}

export default function DesktopIcon({ label, icon, x, y, onDoubleClick }: DesktopIconProps) {
  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={{ x, y }}
      className="absolute flex flex-col items-center gap-1 w-20 p-1 cursor-pointer select-none"
      onDoubleClick={onDoubleClick}
    >
      <img src={icon} className="w-8 h-8 pointer-events-none" alt="" />
      <span
        className="text-xs text-center leading-tight text-white pointer-events-none"
        style={{ textShadow: '1px 1px 1px black' }}
      >
        {label}
      </span>
    </motion.div>
  );
}