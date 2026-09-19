// app/page.tsx
'use client';
import { Analytics } from "@vercel/analytics/next"
import CrtOverlay from '@/components/effects/CrtOverlay';
import Taskbar from '@/components/taskbar/Taskbar';
import AppWindow from '@/components/windows/AppWindow';
import DesktopShortcuts from '@/components/desktop/DesktopShortcuts';
import SettingsApp from '@/components/apps/SettingsApp';
import TaskManagerApp from '@/components/apps/TaskManagerApp';
import ContactApp from '@/components/apps/ContactApp';
import EducationApp from '@/components/apps/EducationApp';
import { useWindowManager } from '@/context/WindowManagerContext';
import { useDesktopSettings } from '@/context/DesktopSettingsContext';
import MusicWidget from '@/components/widgets/MusicWidget';
import WorldClockWidget from '@/components/widgets/WorldClockWidget';
import StickyNotesWidget from '@/components/widgets/StickyNotesWidget';
import ProjectsApp from '@/components/apps/ProjectsApp';
import PhotoViewerApp from '@/components/apps/PhotoViewerApp';
import AboutMeApp from '@/components/apps/AboutMeApp';
import WorkExperienceApp from '@/components/apps/WorkExperienceApp';
import CVApp from '@/components/apps/CVApp';
import ReadingListApp from '@/components/apps/ReadingListApp';
import GameBacklogApp from '@/components/apps/GameBacklogApp';
import WatchListApp from '@/components/apps/WatchListApp';
import MessagesApp from '@/components/apps/MessagesApp';


function renderAppContent(id: string) {
  switch (id) {
    case 'settings':
      return <SettingsApp />;
    case 'tasks':
      return <TaskManagerApp />;
    case 'contact':
      return <ContactApp />;
    case 'education':
      return <EducationApp />;
    case 'projects':
      return <ProjectsApp />;
    case 'photos':
      return <PhotoViewerApp />;
    case 'about':
      return <AboutMeApp />;
    case 'work':
      return <WorkExperienceApp />;
    case 'cv':
      return <CVApp />;
    case 'reading':
      return <ReadingListApp />;
    case 'games':
      return <GameBacklogApp />;  
    case 'shows':
      return <WatchListApp />;
    case 'messages':
      return <MessagesApp />;
    default:
      return <p>Content coming soon.</p>;
  }
}

// per-app window widths — apps not listed here fall back to AppWindow's default (384px)
const windowWidths: Record<string, number> = {
  education: 560,
  projects: 600,  
  work: 600,
  reading: 650,
  games: 700,
  messages: 600,
  shows: 800,
};

export default function Home() {
  const { openWindows, closeWindow, focusWindow, minimizeWindow } = useWindowManager();
  const { currentWallpaper, crtEffect } = useDesktopSettings();

  return (
    <main className="relative w-screen h-screen overflow-hidden">
      {/* wallpaper layer — sits behind everything else */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            currentWallpaper.type === 'color'
              ? currentWallpaper.css
              : `url(${currentWallpaper.src}) center/cover no-repeat`,
        }}
      />

      {/* desktop icons */}
      <DesktopShortcuts />

      {/* open windows */}
      {openWindows
        .filter((win) => !win.minimized)
        .map((win) => (
          <AppWindow
            key={win.id}
            title={win.title}
            zIndex={win.zIndex}
            width={windowWidths[win.id]}
            onClose={() => closeWindow(win.id)}
            onFocus={() => focusWindow(win.id)}
            onMinimize={() => minimizeWindow(win.id)}
          >
            {renderAppContent(win.id)}
          </AppWindow>
        ))}

      {/* taskbar */}
      <Taskbar openWindows={openWindows} onWindowClick={focusWindow} />

      {/* widgets */}
      <MusicWidget />
      <WorldClockWidget />
      <StickyNotesWidget />

      {/* CRT effect overlay */}
       {crtEffect && <CrtOverlay />}

      {/* Vercel Analytics */}
      <Analytics /> 
    </main>
  );
}