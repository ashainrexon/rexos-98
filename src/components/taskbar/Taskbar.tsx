// components/Taskbar.tsx
'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StartMenu from './StartMenu';
import Clock from './Clock';
import type { OpenWindow } from '@/context/WindowManagerContext';

interface TaskbarProps {
  openWindows: OpenWindow[];
  onWindowClick: (id: string) => void;
}

export default function Taskbar({ openWindows, onWindowClick }: TaskbarProps) {
  const [startOpen, setStartOpen] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 w-full h-10 flex items-center px-1 gap-1 z-50"
         style={{ background: '#c0c0c0', borderTop: '2px solid #dfdfdf' }}>
      
      {/* Start button */}
      <button
        className="win98-btn flex items-center gap-1 px-2 font-bold"
        onClick={() => setStartOpen(!startOpen)}
      >
        <img src="/icons/start1.png" className="w-6 h-6" alt="" />
        Start
      </button>

      <AnimatePresence>
        {startOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-10 left-0"
          >
            <StartMenu onClose={() => setStartOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* divider */}
      <div className="w-px h-6 bg-gray-500 mx-1" />

      {/* open window buttons */}
      <div className="flex-1 flex gap-1 overflow-hidden">
        {openWindows.map((win) => (
          <button
            key={win.id}
            onClick={() => onWindowClick(win.id)}
            className={`win98-btn px-2 text-sm truncate max-w-40 ${
              win.active ? 'active' : ''
            }`}
          >
            {win.title}
          </button>
        ))}
      </div>

      {/* system tray */}
      <div className="win98-tray px-2 h-7 flex items-center">
        <Clock />
      </div>
    </div>
  );
}