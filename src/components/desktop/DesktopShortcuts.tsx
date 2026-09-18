// components/desktop/DesktopShortcuts.tsx
'use client';
import DesktopIcon from './DesktopIcon';
import { useWindowManager } from '@/context/WindowManagerContext';

const shortcuts = [
  { id: 'photos', title: 'Photos', icon: '/icons/photo-viewer.png' },
  { id: 'reading', title: 'Kindle', icon: '/icons/reading-list.png' },
  { id: 'games', title: 'Games', icon: '/icons/game-backlog.png' },
  { id: 'shows', title: 'Netflex', icon: '/icons/watch-list.png' },
  { id: 'astro', title: 'Astronomy', icon: '/icons/astro.png' },
  { id: 'messages', title: 'Messages', icon: '/icons/messages.png' },
  { id: 'tasks', title: "Task Manager", icon: '/icons/task-manager.png' },
  { id: 'youtube', title: 'MeTube', icon: '/icons/youtube.png' },
  { id: 'settings', title: 'Settings', icon: '/icons/settings.png' },
];

const COLUMNS = 2;
const ICON_WIDTH = 96;
const ICON_HEIGHT = 96;
const START_X = 16;
const START_Y = 16;

export default function DesktopShortcuts() {
  const { openWindow } = useWindowManager();
  const perColumn = Math.ceil(shortcuts.length / COLUMNS);

  return (
    <>
      {shortcuts.map((item, index) => {
        const col = Math.floor(index / perColumn);
        const row = index % perColumn;

        return (
          <DesktopIcon
            key={item.id}
            label={item.title}
            icon={item.icon}
            x={START_X + col * ICON_WIDTH}
            y={START_Y + row * ICON_HEIGHT}
            onDoubleClick={() => openWindow(item.id, item.title)}
          />
        );
      })}
    </>
  );
}