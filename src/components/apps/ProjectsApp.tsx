// components/apps/ProjectsApp.tsx
'use client';
import { useState } from 'react';

type Project = {
  id: string;
  name: string;
  description: string;
  images: string[];
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
};

type Category = {
  id: string;
  name: string;
  projects: Project[];
};

const categories: Category[] = [
  {
    id: 'coding',
    name: 'Coding',
    projects: [
      {
        id: 'rexos98',
        name: 'RexOS 98',
        description:
          'A personal portfolio site styled as a retro Windows 98 desktop (your looking at it right now), complete with a working taskbar, draggable windows, a start menu, and desktop widgets. A very big passion project of mine, I wanted to make a portfolio that was unique and was inspired by the dead internet theory. This project is a reminder that the internet is a strange and mysterious place, that there is still so much to explore and discover and is a direct challenge against the notion of a static, predictable web.',
        images: ['/projects/rexos98-1.jpg', '/projects/rexos98-2.jpg'],
        tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
        githubUrl: 'https://github.com/ashain/rexos98',
      },
      {
        id: 'discord-bot',
        name: 'Discord Bot',
        description:
          'A discord bot that responds to user messages with images based on specific keywords. It uses the Discord API to listen for messages and send appropriate image responses. This is used always in my friends discord server to make the chat more fun and interactive.',
        images: ['/projects/discord-bot.png'],
        tech: ['Python', 'Discord API'],
        githubUrl: 'https://github.com/ashainrexon/discord-image-response-bot',
      },
    ],
  },
  {
    id: 'electronics',
    name: 'Electronics',
    projects: [
      {
        id: 'zoom-75',
        name: 'Zoom 75 Mechanical Keyboard',
        description:
          'A custom mechanical keyboard built with a Zoom 75 PCB, featuring a compact layout and hot-swappable switches. The keyboard is designed for both aesthetics and functionality, with customizable keycaps and RGB lighting. All started because my q button did not work on my laptop and I fell into the rabbit hole of bad financial decisions known as the Mechanical Keyboard hobby. I wish to build more boards in the future but what am I going to do with all of them? It does not matter, its fun.',
        images: ['/projects/zoom-75-1.jpg', '/projects/zoom-75-2.jpg'],
        tech: ['Mechanical Keyboard', 'Zoom 75 PCB', 'Hot-Swappable Switches'],
      },
    ],    
  },
  {
    id: 'misc',
    name: 'Astronomy',
    projects: [
      
    ],
  },
];

export default function ProjectsApp() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['projects-root']));
  const [selectedId, setSelectedId] = useState<string | null>(null);

  function toggleExpand(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  const selectedProject = categories
    .flatMap((c) => c.projects)
    .find((p) => p.id === selectedId);

  const selectedCategory = categories.find((c) =>
    c.projects.some((p) => p.id === selectedId)
  );

  return (
    <div className="w-full h-96 flex flex-col select-none" style={{ background: '#c0c0c0', color: '#000' }}>
      {/* menu bar */}
      <div className="flex gap-3 px-2 py-1 border-b border-gray-500 text-xs">
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Go</span>
        <span>Favorites</span>
        <span>Help</span>
      </div>

      {/* decorative toolbar */}
      <div className="flex gap-1 px-2 py-1 border-b border-gray-500">
        {['Back', 'Forward', 'Up'].map((label) => (
          <button key={label} className="win98-btn text-xs" style={{ minWidth: 0, padding: '2px 8px' }}>
            {label}
          </button>
        ))}
      </div>

      {/* address bar */}
      <div className="flex items-center gap-2 px-2 py-1 border-b border-gray-500 text-xs">
        <span>Address</span>
        <div className="flex-1 px-2 py-0.5" style={{ background: '#fff', border: '1px inset #808080' }}>
          Projects{selectedCategory ? ` \\ ${selectedCategory.name}` : ''}
          {selectedProject ? ` \\ ${selectedProject.name}` : ''}
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* left: folder tree */}
        <div
          className="w-44 p-1 text-xs overflow-y-auto"
          style={{ background: '#fff', border: '1px inset #808080' }}
        >
          <button
            onClick={() => toggleExpand('projects-root')}
            className="w-full flex items-center gap-1 px-1 py-0.5 text-left"
          >
            <span className="w-3">{expanded.has('projects-root') ? '−' : '+'}</span>
            <span>{expanded.has('projects-root') ? '📂' : '📁'}</span>
            <span className="font-bold">Projects</span>
          </button>

          {expanded.has('projects-root') && (
            <div className="pl-3">
              {categories.map((category) => (
                <div key={category.id}>
                  <button
                    onClick={() => toggleExpand(category.id)}
                    className="w-full flex items-center gap-1 px-1 py-0.5 text-left"
                  >
                    <span className="w-3">{expanded.has(category.id) ? '−' : '+'}</span>
                    <span>{expanded.has(category.id) ? '📂' : '📁'}</span>
                    <span>{category.name}</span>
                  </button>

                  {expanded.has(category.id) && (
                    <div className="pl-5">
                      {category.projects.map((project) => (
                        <button
                          key={project.id}
                          onClick={() => setSelectedId(project.id)}
                          className="w-full flex items-center gap-1 px-1 py-0.5 text-left"
                          style={{
                            background: selectedId === project.id ? '#000080' : 'transparent',
                            color: selectedId === project.id ? '#fff' : '#000',
                          }}
                        >
                          <span>📄</span>
                          <span className="truncate">{project.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* right: project detail */}
        <div
          className="flex-1 min-h-0 overflow-y-auto text-xs p-3"
          style={{ background: '#fff', border: '1px inset #808080', borderLeft: 'none' }}
        >
          {!selectedProject && (
            <p className="text-gray-500">Select a project from the folder tree to view details.</p>
          )}

          {selectedProject && (
            <>
              <p className="font-bold text-sm mb-2">{selectedProject.name}</p>

              {selectedProject.images.length > 0 && (
                <div className="flex gap-2 flex-wrap mb-2">
                  {selectedProject.images.map((img) => (
                    <img
                      key={img}
                      src={img}
                      alt=""
                      className="w-28 h-20 object-cover"
                      style={{ border: '1px solid #808080' }}
                    />
                  ))}
                </div>
              )}

              <p className="mb-2 leading-relaxed">{selectedProject.description}</p>

              <p className="mb-1">
                <span className="font-bold">Languages/Tools:</span>{' '}
                {selectedProject.tech.join(', ')}
              </p>

              <div className="flex gap-3 mt-2">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-800 underline"
                  >
                    🔗 GitHub
                  </a>
                )}
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-800 underline"
                  >
                    🌐 Live Site
                  </a>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}