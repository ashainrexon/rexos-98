// context/WindowManagerContext.tsx
'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

export type OpenWindow = {
  id: string;
  title: string;
  active: boolean;
  minimized: boolean;
  zIndex: number;
};

interface WindowManagerContextType {
  openWindows: OpenWindow[];
  openWindow: (id: string, title: string) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
}

const WindowManagerContext = createContext<WindowManagerContextType | null>(null);

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
  const [nextZIndex, setNextZIndex] = useState(10);

  function openWindow(id: string, title: string) {
    setOpenWindows((prev) => {
      const alreadyOpen = prev.find((win) => win.id === id);

      if (alreadyOpen) {
        // already open — just bring it to front and un-minimize it
        return prev.map((win) =>
          win.id === id
            ? { ...win, active: true, minimized: false, zIndex: nextZIndex }
            : { ...win, active: false }
        );
      }

      // not open yet — add it fresh
      return [
        ...prev.map((win) => ({ ...win, active: false })),
        { id, title, active: true, minimized: false, zIndex: nextZIndex },
      ];
    });

    setNextZIndex((z) => z + 1);
  }

  function closeWindow(id: string) {
    setOpenWindows((prev) => prev.filter((win) => win.id !== id));
  }

  function focusWindow(id: string) {
    setOpenWindows((prev) =>
      prev.map((win) =>
        win.id === id
          ? { ...win, active: true, minimized: false, zIndex: nextZIndex }
          : { ...win, active: false }
      )
    );
    setNextZIndex((z) => z + 1);
  }

  function minimizeWindow(id: string) {
    setOpenWindows((prev) =>
      prev.map((win) =>
        win.id === id ? { ...win, minimized: true, active: false } : win
      )
    );
  }

  return (
    <WindowManagerContext.Provider
      value={{ openWindows, openWindow, closeWindow, focusWindow, minimizeWindow }}
    >
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManager() {
  const context = useContext(WindowManagerContext);
  if (!context) {
    throw new Error('useWindowManager must be used within a WindowManagerProvider');
  }
  return context;
}