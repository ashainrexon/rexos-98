// components/taskbar/StartMenu.tsx
'use client';
import { useEffect, useRef } from 'react';
import { useWindowManager } from '@/context/WindowManagerContext';

interface StartMenuProps {
  onClose: () => void;
}

const menuItems = [
  { label: 'About Me', id: 'about', icon: '/icons/about-me.png' },
  { label: 'Education', id: 'education', icon: '/icons/education.png' },
  { label: 'Work Experience', id: 'work', icon: '/icons/work-experience.png' },
  { label: 'Projects', id: 'projects', icon: '/icons/projects.png' },
  { label: 'CV', id: 'cv', icon: '/icons/cv.png' },
  { label: 'Contact', id: 'contact', icon: '/icons/contact.png' },
];

export default function StartMenu({ onClose }: StartMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const { openWindow } = useWindowManager();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="window w-56"
      style={{ background: '#c0c0c0', border: '2px solid #000' }}
    >
      <ul>
        {menuItems.map((item) => (
          <li key={item.id}>
            <button
              className="w-full flex items-center gap-3 text-left px-3 py-2 text-base hover:bg-blue-800 hover:text-white"
              onClick={() => {
                openWindow(item.id, item.label);
                onClose();
              }}
            >
              <img src={item.icon} className="w-6 h-6" alt="" />
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}