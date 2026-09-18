// context/DesktopSettingsContext.tsx
'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Wallpaper =
  | { id: string; name: string; type: 'color'; css: string }
  | { id: string; name: string; type: 'image'; src: string };

const wallpapers: Wallpaper[] = [
  { id: 'teal', name: 'Classic Teal', type: 'color', css: '#008080' },
  { id: 'purple', name: 'Deep Purple', type: 'color', css: 'linear-gradient(135deg, #2d1b4e, #5b2a9e)' },
  { id: 'akihabara', name: 'Akihabara', type: 'image', src: '/wallpapers/Akihabara.png' },
  { id: 'city', name: 'City', type: 'image', src: '/wallpapers/city.jpg' },
  { id: 'frutiger-aero', name: 'Frutiger Aero', type: 'image', src: '/wallpapers/Frutiger-Aero.png' },
  { id: 'night', name: 'Night', type: 'image', src: '/wallpapers/night.png' },
];

interface DesktopSettingsContextType {
  wallpapers: Wallpaper[];
  currentWallpaper: Wallpaper;
  setWallpaper: (id: string) => void;
  shuffleEnabled: boolean;
  toggleShuffle: () => void;
  clockFormat: '12h' | '24h';
  setClockFormat: (format: '12h' | '24h') => void;
  crtEffect: boolean;
  toggleCrtEffect: () => void;
}

const DesktopSettingsContext = createContext<DesktopSettingsContextType | null>(null);

export function DesktopSettingsProvider({ children }: { children: ReactNode }) {
  const [currentWallpaperId, setCurrentWallpaperId] = useState('teal');
  const [shuffleEnabled, setShuffleEnabled] = useState(false);
  const [clockFormat, setClockFormat] = useState<'12h' | '24h'>('12h');
  const [crtEffect, setCrtEffect] = useState(false);

  useEffect(() => {
    if (!shuffleEnabled) return;

    const interval = setInterval(() => {
      setCurrentWallpaperId((prev) => {
        const currentIndex = wallpapers.findIndex((w) => w.id === prev);
        const nextIndex = (currentIndex + 1) % wallpapers.length;
        return wallpapers[nextIndex].id;
      });
    }, 60000); // 1 minute

    return () => clearInterval(interval);
  }, [shuffleEnabled]);

  const currentWallpaper =
    wallpapers.find((w) => w.id === currentWallpaperId) ?? wallpapers[0];

  return (
    <DesktopSettingsContext.Provider
      value={{
        wallpapers,
        currentWallpaper,
        setWallpaper: setCurrentWallpaperId,
        shuffleEnabled,
        toggleShuffle: () => setShuffleEnabled((prev) => !prev),
        clockFormat,
        setClockFormat,
        crtEffect,
        toggleCrtEffect: () => setCrtEffect((prev) => !prev),
      }}
    >
      {children}
    </DesktopSettingsContext.Provider>
  );
}

export function useDesktopSettings() {
  const context = useContext(DesktopSettingsContext);
  if (!context) {
    throw new Error('useDesktopSettings must be used within a DesktopSettingsProvider');
  }
  return context;
}