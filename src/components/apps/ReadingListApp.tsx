// components/apps/ReadingListApp.tsx
'use client';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Genre = 'fiction' | 'non-fiction';
type Status = 'reading' | 'finished' | 'want-to-read';

type Book = {
  id: string;
  title: string;
  author: string;
  genre: Genre;
  status: Status;
  thoughts: string;
  spineColor: string;
  isbn?: string;
};

const books: Book[] = [
  {
    id: 'red-rising',
    title: 'Red Rising',
    author: 'Pierce Brown',
    genre: 'fiction',
    status: 'reading',
    thoughts: 'A compelling sci-fi novel with a unique take on class struggle and revolution.',
    spineColor: '#7c3fd6',
    isbn: '9780345539786',
  },
  {
    id: 'sapiens',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    genre: 'non-fiction',
    status: 'want-to-read',
    thoughts: 'Big-picture framing of human history — some of the early chapters especially reframed how I think about a lot.',
    spineColor: '#c9822f',
    isbn: '9780062316097',
  },
  {
    id: 'courage-to-be-disliked ',
    title: 'The Courage to Be Disliked',
    author: 'Kishin Kato',
    genre: 'non-fiction',
    status: 'reading',
    thoughts: 'Interesting perspective on Adlerian psychology and the art of living.',
    spineColor: '#1e8f4e',
    isbn: '9781760630737',
  },
  {
    id: 'atomic-habits',
    title: 'Atomic Habits',
    author: 'James Clear',
    genre: 'non-fiction',
    status: 'finished',
    thoughts: 'Good way of thinking about habit formation and behavior change, though some of the examples felt a bit repetitive.',
    spineColor: '#c0392b',
    isbn: '9780735211292',
  },
  {
    id: 'butter',
    title: 'Butter',
    author: 'Asako Yuzuki',
    genre: 'fiction',
    status: 'want-to-read',
    thoughts: 'A Japanese novel that explores the complexities of human relationships and societal expectations.    ',
    spineColor: '#e67e22',
    isbn: '9780008511715',
    },  
];

const genreFilters: { label: string; value: 'all' | Genre }[] = [
  { label: 'All', value: 'all' },
  { label: 'Fiction', value: 'fiction' },
  { label: 'Non-Fiction', value: 'non-fiction' },
];

const statusFilters: { label: string; value: 'all' | Status }[] = [
  { label: 'All', value: 'all' },
  { label: 'Reading', value: 'reading' },
  { label: 'Finished', value: 'finished' },
  { label: 'Want to Read', value: 'want-to-read' },
];

const statusLabel: Record<Status, string> = {
  reading: 'Currently Reading',
  finished: 'Finished',
  'want-to-read': 'Want to Read',
};

function coverUrl(isbn?: string) {
  return isbn ? `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg` : null;
}

export default function ReadingListApp() {
  const [genreFilter, setGenreFilter] = useState<'all' | Genre>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | Status>('all');
  const [sortAlpha, setSortAlpha] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const visibleBooks = useMemo(() => {
    let list = books.filter(
      (b) =>
        (genreFilter === 'all' || b.genre === genreFilter) &&
        (statusFilter === 'all' || b.status === statusFilter)
    );
    if (sortAlpha) {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    }
    return list;
  }, [genreFilter, statusFilter, sortAlpha]);

  const selectedBook = books.find((b) => b.id === selectedId);

  // thinner spines than before, still varying slightly by title length
  function spineWidth(title: string) {
    return 12 + Math.min(title.length, 20) * 0.35;
  }

  return (
    <div className="w-full h-[380px] flex flex-col select-none text-xs relative" style={{ background: '#c0c0c0', color: '#000' }}>
      {/* menu bar */}
      <div className="flex gap-3 px-2 py-1 border-b border-gray-500">
        <span>File</span>
        <span>View</span>
        <span>Help</span>
      </div>

      {/* filter toolbar — now two rows: genre, then status + sort */}
      <div className="flex flex-col gap-1 px-2 py-1 border-b border-gray-500">
        <div className="flex items-center gap-1">
          <span className="text-gray-600 w-12">Genre:</span>
          {genreFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setGenreFilter(f.value)}
              className="win98-btn"
              style={{ minWidth: 0, padding: '2px 8px', background: genreFilter === f.value ? '#a0a0a0' : undefined }}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <span className="text-gray-600 w-12">Status:</span>
          {statusFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setStatusFilter(f.value)}
              className="win98-btn"
              style={{ minWidth: 0, padding: '2px 8px', background: statusFilter === f.value ? '#a0a0a0' : undefined }}
            >
              {f.label}
            </button>
          ))}
          <div className="flex-1" />
          <button
            onClick={() => setSortAlpha(!sortAlpha)}
            className="win98-btn"
            style={{ minWidth: 0, padding: '2px 8px', background: sortAlpha ? '#a0a0a0' : undefined }}
          >
            A–Z {sortAlpha ? '✓' : ''}
          </button>
        </div>
      </div>

      {/* bookshelf */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden px-4 pt-6" style={{ background: '#2a1810' }}>
        <div className="flex items-end gap-1 h-full pb-6 relative" style={{ minWidth: 'max-content' }}>
          <AnimatePresence>
            {visibleBooks.map((book) => (
              <motion.button
                key={book.id}
                layoutId={`spine-${book.id}`}
                onClick={() => setSelectedId(book.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                whileHover={{ y: -12 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="flex items-center justify-center relative"
                style={{
                  width: `${spineWidth(book.title)}px`,
                  height: '150px',
                  background: `linear-gradient(to right, rgba(0,0,0,0.25), transparent 6px, transparent 94%, rgba(0,0,0,0.25))`,
                  backgroundColor: book.spineColor,
                  borderRadius: '2px 2px 0 0',
                  boxShadow: '2px 0 4px rgba(0,0,0,0.4)',
                }}
              >
                <span
                  className="text-white font-bold whitespace-nowrap"
                  style={{
                    writingMode: 'vertical-rl',
                    transform: 'rotate(180deg)',
                    fontSize: '10px',
                    letterSpacing: '0.5px',
                  }}
                >
                  {book.title}
                </span>
              </motion.button>
            ))}
          </AnimatePresence>

          <div
            className="absolute bottom-0 left-0 right-0"
            style={{ height: '10px', background: 'linear-gradient(to bottom, #5c3a20, #3a2210)', boxShadow: '0 3px 6px rgba(0,0,0,0.5)' }}
          />
        </div>
      </div>

      {/* detail overlay */}
      <AnimatePresence>
        {selectedBook && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ background: 'rgba(0,0,0,0.5)' }}
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              layoutId={`spine-${selectedBook.id}`}
              onClick={(e) => e.stopPropagation()}
              className="flex gap-3 p-4"
              style={{
                width: '340px',
                background: '#fdfaf3',
                borderRadius: '4px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              }}
            >
              <div
                className="flex-shrink-0 overflow-hidden"
                style={{ width: '90px', height: '135px', background: selectedBook.spineColor, borderRadius: '2px', boxShadow: '2px 2px 6px rgba(0,0,0,0.3)' }}
              >
                {coverUrl(selectedBook.isbn) && (
                  <img
                    src={coverUrl(selectedBook.isbn)!}
                    alt={selectedBook.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                )}
              </div>

              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-sm">{selectedBook.title}</p>
                    <p className="text-gray-600 italic">{selectedBook.author}</p>
                  </div>
                  <button
                    onClick={() => setSelectedId(null)}
                    className="win98-btn"
                    style={{ minWidth: 0, padding: '0 6px' }}
                  >
                    ✕
                  </button>
                </div>

                <div className="flex gap-2 mt-2">
                  <span
                    className="px-2 py-0.5 text-white capitalize"
                    style={{ background: selectedBook.spineColor, borderRadius: '2px', fontSize: '10px' }}
                  >
                    {selectedBook.genre}
                  </span>
                  <span className="px-2 py-0.5 text-gray-700" style={{ background: '#e8e0d0', borderRadius: '2px', fontSize: '10px' }}>
                    {statusLabel[selectedBook.status]}
                  </span>
                </div>

                <p className="mt-3 leading-relaxed">
                  {selectedBook.thoughts || "Haven't started this one yet — no thoughts to share!"}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}