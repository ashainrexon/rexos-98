// components/apps/SettingsApp.tsx
'use client';
import { useState } from 'react';
import { useDesktopSettings } from '@/context/DesktopSettingsContext';
import ToggleSwitch from '@/components/common/ToggleSwitch';

type Tab = 'personalization' | 'clock' | 'about';

export default function SettingsApp() {
  const [activeTab, setActiveTab] = useState<Tab>('personalization');
  const {
    wallpapers,
    currentWallpaper,
    setWallpaper,
    shuffleEnabled,
    toggleShuffle,
    clockFormat,
    setClockFormat,
    crtEffect,
    toggleCrtEffect,
  } = useDesktopSettings();

  const tabs: { id: Tab; label: string }[] = [
    { id: 'personalization', label: 'Personalization' },
    { id: 'clock', label: 'Clock' },
    { id: 'about', label: 'About This PC' },
  ];

  return (
    <div className="flex h-64 w-full text-sm">
      {/* sidebar nav */}
      <div className="w-32 border-r-2 border-gray-400 flex flex-col">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`text-left px-2 py-2 ${
              activeTab === tab.id ? 'bg-blue-800 text-white' : ''
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* content panel */}
      <div className="flex-1 p-3 overflow-y-auto">
        {activeTab === 'personalization' && (
          <div>
            <p className="font-bold mb-2">Wallpaper</p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {wallpapers.map((wp) => (
                <button
                  key={wp.id}
                  onClick={() => setWallpaper(wp.id)}
                  className="h-12 border-2"
                  style={{
                    background:
                      wp.type === 'color' ? wp.css : `url(${wp.src}) center/cover`,
                    borderColor: currentWallpaper.id === wp.id ? '#000080' : '#808080',
                  }}
                  title={wp.name}
                />
              ))}
            </div>

            <ToggleSwitch
              checked={shuffleEnabled}
              onChange={toggleShuffle}
              label="Shuffle wallpaper every minute"
            />

            <div className="mt-4 pt-3" style={{ borderTop: '1px solid #808080' }}>
              <p className="font-bold mb-2">Display</p>
              <ToggleSwitch
                checked={crtEffect}
                onChange={toggleCrtEffect}
                label="CRT screen effect"
              />
            </div>
          </div>
        )}

        {activeTab === 'clock' && (
          <div>
            <p className="font-bold mb-2">Clock Format</p>
            <div className="flex gap-1">
              <button
                onClick={() => setClockFormat('12h')}
                className={`win98-btn px-3 py-1 ${clockFormat === '12h' ? 'active' : ''}`}
              >
                12-hour (2:30 PM)
              </button>
              <button
                onClick={() => setClockFormat('24h')}
                className={`win98-btn px-3 py-1 ${clockFormat === '24h' ? 'active' : ''}`}
              >
                24-hour (14:30)
              </button>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="space-y-1">
            <p className="font-bold">RexOS 98</p>
            <p>Processor: Pentium Vibes™ 200MHz</p>
            <p>Memory: 64MB (enough for dreams)</p>
            <p>Owner: Ashain</p>
            <p>Uptime: since you opened this tab</p>
          </div>
        )}
      </div>
    </div>
  );
}