// components/taskbar/Clock.tsx
'use client';
import { useState, useEffect } from 'react';
import { useDesktopSettings } from '@/context/DesktopSettingsContext';

export default function Clock() {
  const [time, setTime] = useState<Date | null>(null);
  const { clockFormat } = useDesktopSettings();

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) return null;

  const dateString = time.toLocaleDateString('en-GB', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });

  let timeString: string;
  if (clockFormat === '24h') {
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    timeString = `${hours}:${minutes}`;
  } else {
    const hours = time.getHours() % 12 || 12;
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const ampm = time.getHours() >= 12 ? 'PM' : 'AM';
    timeString = `${hours}:${minutes} ${ampm}`;
  }

  return (
    <div className="flex flex-col items-center leading-tight select-none text-black">
      <span className="text-xs">{timeString}</span>
      <span className="text-[10px]">{dateString}</span>
    </div>
  );
}