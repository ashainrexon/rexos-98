// components/apps/EducationApp.tsx
'use client';
import { useState } from 'react';

type EducationEntry = {
  id: string;
  folder: string;
  subject: string;
  institution: string;
  dates: string;
  from: string;
  body: string;
};

const entries: EducationEntry[] = [
  {
    id: 'gcses',
    folder: 'GCSEs',
    subject: 'Your GCSE Results',
    institution: 'Cardinal Wiseman Catholic High School',
    from: 'admissions@cardinalwiseman.ac.uk',
    dates: '2017 – 2023',
    body: `Dear Ashain,

Congratulations on completing your GCSEs at Cardinal Wiseman Catholic High School. Your final results were:

Maths — 9
Religious Studies — 9
Biology — 8
Geography — 8
Computer Science — 7
Physics — 7 
Further Maths — 7
Spanish — 7
English Language and Literature — 7
Chemistry — 6

We wish you the very best in your future studies.

Kind regards,
Cardinal Wiseman Catholic High School`,
  },
  {
    id: 'alevels',
    folder: 'A-Levels',
    subject: 'Your A-Level Results',
    institution: 'Cardinal Wiseman Catholic High School',
    from: 'results@cardinalwiseman.ac.uk',
    dates: '2023 – 2025',
    body: `Dear Ashain,

Well done on completing your A-Levels at Cardinal Wiseman Catholic High School. Your final results were:

Mathematics — B
Computer Science — C
Physics — B
EPQ - B

We hope this achievement opens the door to great things ahead.

Kind regards,
Cardinal Wiseman Catholic High School`,
  },
  {
    id: 'degree',
    folder: 'Undergraduate Degree',
    subject: 'Enrolment Confirmation',
    institution: 'University of Southampton',
    from: 'admission@universityofsouthampton.ac.uk',
    dates: '2025',
    body: `Dear Ashain,

Thank you for enrolling in the MPhys Physics and Astronomy program at the University of Southampton. We are pleased to confirm your place in the program starting September 2025.

Kind regards,
University of Southampton`,
  },
];

export default function EducationApp() {
  const [selectedFolder, setSelectedFolder] = useState(entries[0].folder);
  const [selectedId, setSelectedId] = useState(entries[0].id);
  const [readIds, setReadIds] = useState<Set<string>>(new Set());

  const folders = Array.from(new Set(entries.map((e) => e.folder)));
  const messagesInFolder = entries.filter((e) => e.folder === selectedFolder);
  const activeEntry = entries.find((e) => e.id === selectedId) ?? messagesInFolder[0];

  function selectFolder(folder: string) {
    setSelectedFolder(folder);
    const firstInFolder = entries.find((e) => e.folder === folder);
    if (firstInFolder) {
      setSelectedId(firstInFolder.id);
      setReadIds((prev) => new Set(prev).add(firstInFolder.id));
    }
  }

  function selectMessage(id: string) {
    setSelectedId(id);
    setReadIds((prev) => new Set(prev).add(id));
  }

  function unreadCount(folder: string) {
    return entries.filter((e) => e.folder === folder && !readIds.has(e.id)).length;
  }

  return (
    <div className="w-full h-96 flex flex-col select-none" style={{ background: '#c0c0c0', color: '#000' }}>
      {/* menu bar */}
      <div className="flex gap-3 px-2 py-1 border-b border-gray-500 text-xs">
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Tools</span>
        <span>Message</span>
        <span>Help</span>
      </div>

      {/* toolbar — decorative, matches Outlook Express chrome */}
      <div className="flex gap-1 px-2 py-1 border-b border-gray-500">
        {['Reply', 'Reply All', 'Forward', 'Print'].map((label) => (
          <button key={label} className="win98-btn text-xs px-2" style={{ minWidth: 0, padding: '2px 8px' }}>
            {label}
          </button>
        ))}
      </div>

      <div className="flex flex-1 min-h-0">
        {/* left: folder list */}
        <div
          className="w-36 p-1 text-xs overflow-y-auto"
          style={{ background: '#fff', border: '1px inset #808080' }}
        >
          <p className="font-bold px-1 py-1">Folders</p>
          {folders.map((folder) => {
            const count = unreadCount(folder);
            return (
              <button
                key={folder}
                onClick={() => selectFolder(folder)}
                className="w-full text-left px-2 py-1 flex justify-between items-center"
                style={{
                  background: selectedFolder === folder ? '#000080' : 'transparent',
                  color: selectedFolder === folder ? '#fff' : '#000',
                }}
              >
                <span>📁 {folder}</span>
                {count > 0 && (
                  <span className="font-bold" style={{ color: selectedFolder === folder ? '#fff' : '#000080' }}>
                    ({count})
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* right: message list + preview, stacked */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* message list */}
          <div
            className="text-xs"
            style={{ background: '#fff', border: '1px inset #808080', borderLeft: 'none' }}
          >
            <div className="flex font-bold border-b border-gray-400 px-2 py-1" style={{ background: '#c0c0c0' }}>
              <span className="w-6"></span>
              <span className="flex-1">From / Subject</span>
              <span className="w-24">Date</span>
            </div>
            {messagesInFolder.map((entry) => {
              const isRead = readIds.has(entry.id);
              return (
                <button
                  key={entry.id}
                  onClick={() => selectMessage(entry.id)}
                  className="w-full flex items-center text-left px-2 py-1"
                  style={{
                    background: selectedId === entry.id ? '#000080' : 'transparent',
                    color: selectedId === entry.id ? '#fff' : '#000',
                    fontWeight: isRead ? 'normal' : 'bold',
                  }}
                >
                  <span className="w-6">{isRead ? '📖' : '✉️'}</span>
                  <span className="flex-1 truncate">
                    {entry.institution} — {entry.subject}
                  </span>
                  <span className="w-24">{entry.dates}</span>
                </button>
              );
            })}
          </div>

          {/* preview pane */}
          <div
            className="flex-1 min-h-0 overflow-y-auto text-xs p-3"
            style={{ background: '#fff', border: '1px inset #808080', borderTop: 'none', borderLeft: 'none' }}
          >
            {activeEntry && (
              <>
                <div className="space-y-0.5 pb-2 mb-2 border-b border-gray-300">
                  <p><span className="font-bold">From:</span> {activeEntry.institution} &lt;{activeEntry.from}&gt;</p>
                  <p><span className="font-bold">To:</span> Ashain</p>
                  <p><span className="font-bold">Date:</span> {activeEntry.dates}</p>
                  <p><span className="font-bold">Subject:</span> {activeEntry.subject}</p>
                </div>
                <p className="whitespace-pre-line leading-relaxed">{activeEntry.body}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}