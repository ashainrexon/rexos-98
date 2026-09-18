// components/widgets/WorldClockWidget.tsx
'use client';
import { useState, useEffect } from 'react';

type CityClock = { label: string; timeZone: string };

const cities: CityClock[] = [
  { label: 'Poland', timeZone: 'Europe/Warsaw' },
  { label: 'Italy', timeZone: 'Europe/Rome' },
  { label: 'France', timeZone: 'Europe/Paris' },
  { label: 'Sri Lanka', timeZone: 'Asia/Colombo' },
  { label: 'India', timeZone: 'Asia/Kolkata' },
];

function getTimeParts(timeZone: string) {
  const now = new Date();
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(now);

  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  return { hours: get('hour'), minutes: get('minute'), seconds: get('second') };
}

function AnalogClock({ hours, minutes, seconds }: { hours: number; minutes: number; seconds: number }) {
  const hourAngle = (hours % 12) * 30 + minutes * 0.5;
  const minuteAngle = minutes * 6;
  const secondAngle = seconds * 6;

  const CENTER = 20; // half of the new 40px size
  const toXY = (angleDeg: number, radius: number) => {
    const rad = (angleDeg * Math.PI) / 180;
    return { x: CENTER + radius * Math.sin(rad), y: CENTER - radius * Math.cos(rad) };
  };

  const ticks = Array.from({ length: 12 }, (_, i) => {
    const { x, y } = toXY(i * 30, 16);
    return <rect key={i} x={x - 1} y={y - 1} width={2} height={2} fill="#008080" />;
  });

  const hourEnd = toXY(hourAngle, 9);
  const minuteEnd = toXY(minuteAngle, 14);
  const secondEnd = toXY(secondAngle, 15);

  return (
    <svg width="40" height="40" viewBox="0 0 40 40">
      <circle cx={CENTER} cy={CENTER} r="18" fill="#ffffff" stroke="#000080" strokeWidth="1.2" />
      {ticks}
      <line x1={CENTER} y1={CENTER} x2={hourEnd.x} y2={hourEnd.y} stroke="#000080" strokeWidth="2" strokeLinecap="round" />
      <line x1={CENTER} y1={CENTER} x2={minuteEnd.x} y2={minuteEnd.y} stroke="#008080" strokeWidth="1.3" strokeLinecap="round" />
      <line x1={CENTER} y1={CENTER} x2={secondEnd.x} y2={secondEnd.y} stroke="#c00000" strokeWidth="0.8" />
      <circle cx={CENTER} cy={CENTER} r="1.3" fill="#000080" />
    </svg>
  );
}

export default function WorldClockWidget() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-4 right-60 window select-none">
      <div className="title-bar">
        <div className="title-bar-text">World Clock</div>
      </div>
      <div className="window-body flex flex-row gap-3 p-2" style={{ background: '#c0c0c0' }}>
        {cities.map((city) => {
          const { hours, minutes, seconds } = getTimeParts(city.timeZone);
          const digital = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
          return (
            <div key={city.label} className="flex flex-col items-center">
              <AnalogClock hours={hours} minutes={minutes} seconds={seconds} />
              <span className="text-[10px] font-bold mt-1 whitespace-nowrap">{city.label}</span>
              <span className="text-[9px]">{digital}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}