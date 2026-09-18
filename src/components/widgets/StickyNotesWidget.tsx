// components/widgets/StickyNotesWidget.tsx
'use client';
import { useState } from 'react';

const notes: string[] = [
  'Currently working on a retro Windows 98 portfolio website using Next.js and React.',
  'Places I want to visit: Japan, China, Korea and Canada',
  'I want to learn about web development, design, electronics, astronomy and Japanese',
  'Will be up to date on One Piece mark my words',
  'Kiss of Life concert when?',
];

const LINE_HEIGHT = 28; // px — must match the line-height used below

export default function StickyNotesWidget() {
  const [index, setIndex] = useState(0);

  function goPrev() {
    setIndex((prev) => (prev - 1 + notes.length) % notes.length);
  }

  function goNext() {
    setIndex((prev) => (prev + 1) % notes.length);
  }

  return (
    <div
      className="fixed bottom-70 right-6 w-48 select-none"
      style={{
        background: '#fdf171',
        boxShadow: '2px 3px 6px rgba(0,0,0,0.3)',
      }}
    >
      <div className="flex justify-between items-center px-2 pt-1 text-gray-500 text-xs">
        <span className="cursor-default">✕</span>
      </div>

      {/* note content with ruled-paper lines */}
      <div
        className="relative px-4 py-2 min-h-27.5"
        style={{
          backgroundImage: `repeating-linear-gradient(
            to bottom,
            transparent 0px,
            transparent ${LINE_HEIGHT - 1}px,
            rgba(59, 59, 143, 0.25) ${LINE_HEIGHT - 1}px,
            rgba(59, 59, 143, 0.25) ${LINE_HEIGHT}px
          )`,
          backgroundPositionY: '6px', // nudges lines to sit under the first row of text
        }}
      >
        {/* optional red margin line, like real notebook paper */}
        <div
          className="absolute top-0 bottom-0 w-px"
          style={{ left: '18px', background: 'rgba(200,60,60,0.35)' }}
        />

        <p
          style={{
            fontFamily: 'var(--font-handwriting)',
            fontSize: '20px',
            lineHeight: `${LINE_HEIGHT}px`,
            color: '#3b3b8f',
            paddingLeft: '6px',
          }}
        >
          {notes[index]}
        </p>
      </div>

      <div className="flex justify-center items-center gap-3 pb-2 text-gray-600">
        <button onClick={goPrev} className="text-sm px-1">◀</button>
        <span className="text-xs">{index + 1}/{notes.length}</span>
        <button onClick={goNext} className="text-sm px-1">▶</button>
      </div>
    </div>
  );
}