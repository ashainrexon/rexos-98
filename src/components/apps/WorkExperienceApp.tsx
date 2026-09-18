// components/apps/WorkExperienceApp.tsx
'use client';
import { useState } from 'react';

type WorkExperience = {
  id: string;
  role: string;
  employer: string;
  location: string;
  start: string; // 'YYYY-MM-DD'
  end: string;   // 'YYYY-MM-DD' or '' for ongoing
  color: string;
  responsibilities: string[];
  achievements: string[];
};

const experiences: WorkExperience[] = [
  {
    id: 'buckingham',
    role: 'Ticket Sales and Information Assistant',
    employer: 'Buckingham Palace Summer Opening',
    location: 'London',
    start: '2026-06-22',
    end: '2026-09-12',
    color: '#7c3fd6',
    responsibilities: [
      'Provide ticket-sales services for visitors to all the official royal residences by telephone and face-to-face at sales counters.',
    ],
    achievements: [
      'Learnt how to operate the POS system for cash and card payments.',
      'Stock products in a way that is easily accessible.',
      'Upsell merchandise such as guidebooks with the goal of increasing KPIs.',
    ],
  },
];

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const weekdayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const FAR_FUTURE = new Date(2100, 0, 1);

function toDate(str: string) {
  const [y, m, d] = str.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function formatDate(str: string) {
  if (!str) return 'Current';
  return toDate(str).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

// build a full 6-week grid (42 days), including padding days from adjacent months
function buildWeeks(year: number, month: number) {
  const firstOfMonth = new Date(year, month, 1);
  const gridStart = addDays(firstOfMonth, -firstOfMonth.getDay());

  const weeks: { date: Date; inMonth: boolean }[][] = [];
  for (let w = 0; w < 6; w++) {
    const week: { date: Date; inMonth: boolean }[] = [];
    for (let d = 0; d < 7; d++) {
      const date = addDays(gridStart, w * 7 + d);
      week.push({ date, inMonth: date.getMonth() === month });
    }
    weeks.push(week);
  }
  return weeks;
}

// for a given week, figure out which experiences overlap it and which row/columns each occupies
function layoutWeekBars(week: { date: Date; inMonth: boolean }[]) {
  const weekStart = week[0].date;
  const weekEnd = week[6].date;

  type Bar = { exp: WorkExperience; startCol: number; endCol: number; row: number };
  const bars: Bar[] = [];
  const rowEndCols: number[] = []; // tracks the last occupied column per row

  for (const exp of experiences) {
    const expStart = toDate(exp.start);
    const expEnd = exp.end ? toDate(exp.end) : FAR_FUTURE;

    const overlapStart = expStart > weekStart ? expStart : weekStart;
    const overlapEnd = expEnd < weekEnd ? expEnd : weekEnd;
    if (overlapStart > overlapEnd) continue; // no overlap this week

    const startCol = week.findIndex((c) => isSameDay(c.date, overlapStart));
    const endCol = week.findIndex((c) => isSameDay(c.date, overlapEnd));

    // find the first row where this bar's columns don't collide with an existing bar
    let row = rowEndCols.findIndex((lastCol) => lastCol < startCol);
    if (row === -1) {
      row = rowEndCols.length;
      rowEndCols.push(endCol);
    } else {
      rowEndCols[row] = endCol;
    }

    bars.push({ exp, startCol, endCol, row });
  }

  return bars;
}

export default function WorkExperienceApp() {
  const [view, setView] = useState<'month' | 'day'>('month');
  const [cursor, setCursor] = useState(() => toDate(experiences[0]?.start ?? '2026-01-01'));
  const [selectedExpId, setSelectedExpId] = useState<string | null>(experiences[0]?.id ?? null);

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const weeks = buildWeeks(year, month);

  function goMonth(delta: number) {
    setCursor(new Date(year, month + delta, 1));
  }

  function goDay(delta: number) {
    setCursor(addDays(cursor, delta));
  }

  function isWithinRange(day: Date, exp: WorkExperience) {
    const start = toDate(exp.start);
    const end = exp.end ? toDate(exp.end) : FAR_FUTURE;
    return day >= start && day <= end;
  }

  const selectedExp = experiences.find((e) => e.id === selectedExpId);
  const activeOnCursor = experiences.filter((e) => isWithinRange(cursor, e));

  return (
    <div className="w-full h-[440px] flex flex-col select-none text-xs" style={{ background: '#c0c0c0', color: '#000' }}>
      {/* menu bar */}
      <div className="flex gap-3 px-2 py-1 border-b border-gray-500">
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Go</span>
        <span>Help</span>
      </div>

      {/* toolbar */}
      <div className="flex items-center gap-2 px-2 py-1 border-b border-gray-500">
        <div className="flex-1" />
        <button
          onClick={() => setView('day')}
          className="win98-btn"
          style={{ minWidth: 0, padding: '2px 10px', background: view === 'day' ? '#a0a0a0' : undefined }}
        >
          Day
        </button>
        <button
          onClick={() => setView('month')}
          className="win98-btn"
          style={{ minWidth: 0, padding: '2px 10px', background: view === 'month' ? '#a0a0a0' : undefined }}
        >
          Month
        </button>
      </div>

      {view === 'month' ? (
        <>
          {/* month nav */}
          <div className="flex items-center justify-center gap-3 py-1 border-b border-gray-500">
            <button onClick={() => goMonth(-1)} className="win98-btn" style={{ minWidth: 0, padding: '1px 6px' }}>◀</button>
            <span className="font-bold">{monthNames[month]} {year}</span>
            <button onClick={() => goMonth(1)} className="win98-btn" style={{ minWidth: 0, padding: '1px 6px' }}>▶</button>
          </div>

          {/* weekday header */}
          <div className="grid grid-cols-7 text-center font-bold border-b border-gray-400" style={{ background: '#dfe8f5' }}>
            {weekdayNames.map((w) => (
              <div key={w} className="py-1">{w}</div>
            ))}
          </div>

          {/* weeks */}
          <div className="flex-1 overflow-y-auto" style={{ background: '#fff' }}>
            {weeks.map((week, wi) => {
              const bars = layoutWeekBars(week);
              const rowCount = Math.max(1, ...bars.map((b) => b.row + 1));

              return (
                <div key={wi} className="relative border-b border-gray-200">
                  {/* day number row */}
                  <div className="grid grid-cols-7">
                    {week.map((cell, di) => (
                      <div
                        key={di}
                        className="text-[10px] px-1 pt-1"
                        style={{ color: cell.inMonth ? '#333' : '#bbb' }}
                      >
                        {cell.date.getDate()}
                      </div>
                    ))}
                  </div>

                  {/* bars, absolutely positioned on a 7-col grid beneath the day numbers */}
                  <div
                    className="grid grid-cols-7 gap-y-0.5 px-0.5 pb-1"
                    style={{ minHeight: `${rowCount * 16}px` }}
                  >
                    {bars.map((bar) => (
                      <button
                        key={bar.exp.id + wi}
                        onClick={() => { setSelectedExpId(bar.exp.id); setCursor(week[bar.startCol].date); }}
                        className="text-[9px] px-1 text-left truncate text-white leading-4"
                        style={{
                          gridColumn: `${bar.startCol + 1} / ${bar.endCol + 2}`,
                          gridRow: bar.row + 1,
                          background: bar.exp.color,
                          borderRadius: '2px',
                        }}
                        title={bar.exp.role}
                      >
                        {bar.exp.role}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          {/* day nav */}
          <div className="flex items-center justify-center gap-3 py-1 border-b border-gray-500">
            <button onClick={() => goDay(-1)} className="win98-btn" style={{ minWidth: 0, padding: '1px 6px' }}>◀</button>
            <span className="font-bold">
              {cursor.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <button onClick={() => goDay(1)} className="win98-btn" style={{ minWidth: 0, padding: '1px 6px' }}>▶</button>
          </div>

          <div className="flex-1 overflow-y-auto p-2" style={{ background: '#fff' }}>
            {activeOnCursor.length === 0 && (
              <p className="text-gray-500 px-1">No work experience recorded on this date.</p>
            )}
            {activeOnCursor.map((exp) => (
              <button
                key={exp.id}
                onClick={() => setSelectedExpId(exp.id)}
                className="w-full flex items-start gap-2 text-left px-2 py-2 mb-1"
                style={{ borderLeft: `4px solid ${exp.color}`, background: selectedExpId === exp.id ? '#eef2f7' : 'transparent' }}
              >
                <div>
                  <p className="font-bold" style={{ color: exp.color }}>{exp.role}</p>
                  <p>{exp.employer} — {exp.location}</p>
                  <p className="text-gray-600">{formatDate(exp.start)} – {formatDate(exp.end)}</p>
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      {/* details panel */}
      {selectedExp && (
        <div className="p-2 text-xs" style={{ background: '#eef2f7', borderTop: '1px solid #808080', maxHeight: '150px', overflowY: 'auto' }}>
          <div className="flex justify-between items-start">
            <div>
              <p className="font-bold" style={{ color: selectedExp.color }}>
                {selectedExp.role} <span className="font-normal">({selectedExp.employer})</span>
              </p>
              <p className="text-gray-600">{formatDate(selectedExp.start)} – {formatDate(selectedExp.end)}</p>
            </div>
            <button onClick={() => setSelectedExpId(null)} className="win98-btn" style={{ minWidth: 0, padding: '0 6px' }}>✕</button>
          </div>

          <p className="font-bold mt-2">Responsibilities:</p>
          <ul className="list-disc pl-4 space-y-0.5">
            {selectedExp.responsibilities.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>

          {selectedExp.achievements.length > 0 && (
            <>
              <p className="font-bold mt-2">Achievements:</p>
              <ul className="list-disc pl-4 space-y-0.5">
                {selectedExp.achievements.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}