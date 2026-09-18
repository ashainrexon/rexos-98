// components/apps/AboutMeApp.tsx
'use client';
import { useState } from 'react';

type Badge = {
  id: string;
  emoji: string;
  name: string;
};

type Section = {
  heading: string;
  paragraphs: string[];
};

const badges: Badge[] = [
  { id: 'keyboard', emoji: '🎹', name: 'Trinity Keyboard Qualification Grade 7' },
  { id: 'scout', emoji: '⚜️', name: 'Gold Scout Award' },
  { id: 'big-bang', emoji: '💻', name: 'From Big Bang to Dark Energy Online Course from University of Tokyo' },
  { id: 'electronic-engineering', emoji: '⚡', name: 'Introduction to Electronic Engineering Online Course from the University of Birmingham' },
];

const sections: Section[] = [
  {
    heading: 'About',
    paragraphs: [
      "I'm Ashain — I build stuff that makes my life easier and explore concepts that fascinate me 🪐. I like to think of myself as a lifelong learner, and I'm always looking for new things to try and learn. This website is one of those projects that will help me document my other projects, discoveries and abundant interests.",
    ],
  },
  {
    heading: 'Interests',
    paragraphs: [
      "Outside of Physics and Coding, I'm into gaming (mostly story games, MOBAs and FPS), K-pop, J-pop and Hip Hop (Kiss of Life to Kanye 😭), and slowly working through a way-too-long reading and watch list.",
      "I like weaving little references to those shows and movies into projects like this one so keep an eye out for kdrama and anime references.",
    ],
  },
  {
    heading: 'Hobbies',
    paragraphs: [
      "I love to play on my Electronic Keyboard and have been playing for 12 years now. In addition to that, I am learning more about Photography, more coding and the Japanese language.",
      "On the sporty side of things, I love going to gym and begun to train for kickbnoxing.",
    ],
  },
];

export default function AboutMeApp() {
  const [hoveredBadge, setHoveredBadge] = useState<string | null>(null);

  return (
    <div className="w-full h-96 overflow-y-auto text-xs select-none p-4" style={{ background: '#c0c0c0', color: '#000' }}>
      {/* profile header */}
      <div className="flex gap-4 items-start mb-4">
        <div
          className="w-20 h-20 flex items-center justify-center shrink-0"
          style={{ background: '#fff', border: '2px inset #808080' }}
        >
          <img src="/photos/profile.jfif" alt="Ashain" className="w-full h-full object-cover" />
        </div>

        <div>
          <p className="text-lg font-bold" style={{ color: '#000080' }}>Ashain</p>

          {/* badges row */}
          <div className="flex gap-2 mt-1">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className="relative"
                onMouseEnter={() => setHoveredBadge(badge.id)}
                onMouseLeave={() => setHoveredBadge(null)}
              >
                <div
                  className="w-8 h-8 flex items-center justify-center text-base cursor-default"
                  style={{ background: '#fff', border: '1px outset #808080' }}
                >
                  {badge.emoji}
                </div>

                {hoveredBadge === badge.id && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1 whitespace-nowrap text-[10px] z-10"
                    style={{ background: '#ffffe1', border: '1px solid #000' }}
                  >
                    {badge.name}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* content sections */}
      {sections.map((section) => (
        <div key={section.heading} className="mb-4">
          <p className="font-bold mb-1" style={{ color: '#000080' }}>{section.heading}</p>
          {section.paragraphs.map((p, i) => (
            <p key={i} className="mb-2 leading-relaxed">{p}</p>
          ))}
        </div>
      ))}
    </div>
  );
}