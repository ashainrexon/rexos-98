// components/apps/WatchListApp.tsx
'use client';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Status = 'watching' | 'watched' | 'want-to-watch' | 'dropped';
type MediaType = 'TV' | 'Movie';

type Show = {
  id: string;
  title: string;
  poster: string;
  type: MediaType;
  genre: string;
  status: Status;
  rating?: number;
  thoughts: string;
};

const shows: Show[] = [
  {
    id: 'mob-psycho-100',
    title: 'Mob Psycho 100',
    poster: '/watchlist/mob-psycho-100.jfif',
    type: 'TV',
    genre: 'Anime',
    status: 'watched',
    rating: 10,
    thoughts: 'My favourite anime of all time. Balances comedy and seriousness perfectly, unique art style, and the soundtrack is phenomenal. The character development of Mob is incredible, and the story is both heartwarming and thrilling. A must-watch for any anime fan.',
  },
  {
    id: 'steins-gate',
    title: 'Steins;Gate',
    poster: '/watchlist/steins-gate.jfif',
    type: 'TV',
    genre: 'Anime',
    status: 'watched',
    rating: 10,
    thoughts: 'Amazing sci-fi show that catches you off guard with every plot twist. El Psy Congroo',
  },
  {
    id: 'fragrant-flowers',
    title: 'Fragrant Flowers Blooms with Dignity',
    poster: '/watchlist/fragrant-flowers.jfif',
    type: 'TV',
    genre: 'Anime',
    status: 'watched',
    rating: 10,
    thoughts: 'My favourite romance anime of all time. A very simple show with such likeable characters and a very wholesome story. Cannot wait for season 2.',
  },
  {
    id: 'business-proposal',
    title: 'A Business Proposal',
    poster: '/watchlist/business-proposal.jfif',
    type: 'TV',
    genre: 'K-Drama',
    status: 'watched',
    rating: 9,
    thoughts: 'Very funny show and the plot keeps you engaged. Sometimes its a bit much and the cliffhangers are quite frequent but it still makes you want to keep on watching.',
  },
  {
    id: 'teach-you-a-lesson',
    title: 'Teach You a Lesson',
    poster: '/watchlist/teach-you-a-lesson.jfif',
    type: 'TV',
    genre: 'K-Drama',
    status: 'watched',
    rating: 9,
    thoughts: 'Great show with excellent character development and a compelling storyline. Emphasises on the current problems of the education system and how it affects students. The acting is top-notch, and the chemistry between the leads is palpable. Highly recommend for anyone looking for a thought-provoking drama.',
  },
  {
    id: 'weak-hero',
    title: 'Weak Hero',
    poster: '/watchlist/weak-hero.jfif',
    type: 'TV',
    genre: 'K-Drama',
    status: 'watched',
    rating: 10,
    thoughts: 'A great K-Drama with amazing acting and a compelling storyline. The characters are well-developed and the plot keeps you engaged throughout.',
  },
  {
    id: 'twinkling-watermelon',
    title: 'Twinkling Watermelon',
    poster: '/watchlist/twinkling-watermelon.jfif',
    type: 'TV',
    genre: 'K-Drama',
    status: 'watched',
    rating: 10,
    thoughts: 'A delightful K-Drama with a charming premise and engaging characters. The chemistry between the leads is palpable, and the storyline keeps you invested from start to finish.',
  },
  {
    id: 'jujutsu-kaisen',
    title: 'Jujutsu Kaisen',
    poster: '/watchlist/jujutsu-kaisen.jfif',
    type: 'TV',
    genre: 'Anime',
    status: 'watched',
    rating: 8,
    thoughts: 'A thrilling anime with incredible action sequences and a well-paced storyline. The characters are well-developed, and the animation is top-notch.',
  },
  {
    id: 'ghost-stories',
    title: 'Ghost Stories',
    poster: '/watchlist/ghost-stories.jfif',
    type: 'TV',
    genre: 'Anime',
    status: 'watched',
    rating: 10,
    thoughts: 'I watched this in dubbed and it was hilarious. The English dub is a parody of the original and is intentionally bad, which makes it very funny. The story is also quite engaging and the characters are memorable.',
  },
  {
    id: 'attack-on-titan',
    title: 'Attack on Titan',
    poster: '/watchlist/attack-on-titan.jfif',
    type: 'TV',
    genre: 'Anime',
    status: 'watched',
    rating: 9,
    thoughts: 'Greatest piece of fiction ever written, no other story has ever made me feel so many emotions. This is a must watch whether your an anime fan or not. I personally found the start of last season quite confusing which is why I gave it a 9.',
  },
  {
    id: 'bleach',
    title: 'Bleach',
    poster: '/watchlist/bleach.jfif',
    type: 'TV',
    genre: 'Anime',
    status: 'watched',
    rating: 8,
    thoughts: 'A classic anime that is a slow burn but has a very satisfying payoff. The story is engaging and the characters are well-developed. The action scenes are also very well done. It was all worth it to see the final arc animated and the ending was very satisfying.',
  },
  {
    id: 'demon-slayer',
    title: 'Demon Slayer',
    poster: '/watchlist/demon-slayer.jfif',
    type: 'TV',
    genre: 'Anime',
    status: 'watched',
    rating: 7,
    thoughts: 'Very good animation and fight scenes. The story is a bit generic and predictable, except for Akaza\'s backstory which was very well done. The characters are likeable and the soundtrack is great.',
  },
  {
    id: 'solo-leveling',
    title: 'Solo Leveling',
    poster: '/watchlist/solo-leveling.webp',
    type: 'TV',
    genre: 'Anime',
    status: 'watched',
    rating: 7,
    thoughts: 'Really good animations and fight scenes. The story is very generic which is why I feel like it is a bit overrated. I would recommend it to anyone who likes action anime.',
  },
  {
    id: 'bloodhounds',
    title: 'Bloodhounds',
    poster: '/watchlist/bloodhounds.jfif',
    type: 'TV',
    genre: 'K-Drama',
    status: 'watched',
    rating: 8,
    thoughts: 'A very compelling K-Drama with great performances and a well-paced storyline. The chemistry between the leads is fantastic.',
  },

  // ----- WATCHING -----
  {
    id: 'one-piece',
    title: 'One Piece',
    poster: '/watchlist/one-piece.jfif',
    type: 'TV',
    genre: 'Anime',
    status: 'watching',
    rating: undefined,
    thoughts: '',
  },
  {
    id: 'can-this-love-be-translated',
    title: 'Can This Love Be Translated?',
    poster: '/watchlist/can-this-love-be-translated.jfif',
    type: 'TV',
    genre: 'K-Drama',
    status: 'watching',
    rating: undefined,
    thoughts: '',
  },
  {
    id: 'gurren-lagann',
    title: 'Gurren Lagann',
    poster: '/watchlist/gurren-lagann.jfif',
    type: 'TV',
    genre: 'Anime',
    status: 'watching',
    rating: undefined,
    thoughts: '',
  },
    // ----- WANT TO WATCH -----
  {
    id: 'noragami',
    title: 'Noragami',
    poster: '/watchlist/noragami.jfif',
    type: 'TV',
    genre: 'Anime',
    status: 'want-to-watch',
    rating: undefined,
    thoughts: '',
  },
  {
    id: 'code-geass',
    title: 'Code Geass',
    poster: '/watchlist/code-geass.jfif',
    type: 'TV',
    genre: 'Anime',
    status: 'want-to-watch',
    rating: undefined,
    thoughts: '',
  },
  {
    id: 'undercover-highschool',
    title: 'Undercover High School',
    poster: '/watchlist/undercover-highschool.jfif',
    type: 'TV',
    genre: 'K-Drama',
    status: 'want-to-watch',
    rating: undefined,
    thoughts: '',
  },
  {
    id: 'brewing-love',
    title: 'Brewing Love',
    poster: '/watchlist/brewing-love.jfif',
    type: 'TV',
    genre: 'K-Drama',
    status: 'want-to-watch',
    rating: undefined,
    thoughts: '',
  },
  {
    id: 'you-and-i-are-polar-opposites',
    title: 'You and I Are Polar Opposites',
    poster: '/watchlist/you-and-i-are-polar-opposites.jfif',
    type: 'TV',
    genre: 'Anime',
    status: 'want-to-watch',
    rating: undefined,
    thoughts: '',
  },
  {
    id: 'fresh-off-the-boat',
    title: 'Fresh Off the Boat',
    poster: '/watchlist/fresh-off-the-boat.jfif',
    type: 'TV',
    genre: 'Sitcom',
    status: 'want-to-watch',
    rating: undefined,
    thoughts: '',
  },
  {
    id: 'gintama',
    title: 'Gintama',
    poster: '/watchlist/gintama.jfif',
    type: 'TV',
    genre: 'Anime',
    status: 'want-to-watch',
    rating: undefined,
    thoughts: '',
  },
  {
    id: 'meteor-garden',
    title: 'Meteor Garden',
    poster: '/watchlist/meteor-garden.jfif',
    type: 'TV',
    genre: 'Drama',
    status: 'want-to-watch',
    rating: undefined,
    thoughts: '',
  },
  {
    id: 'love-death-robots',
    title: 'Love, Death & Robots',
    poster: '/watchlist/love-death-robots.jfif',
    type: 'TV',
    genre: 'Sci-Fi Anthology',
    status: 'want-to-watch',
    rating: undefined,
    thoughts: '',
  },
  {
    id: 'love-untangled',
    title: 'Love Untangled',
    poster: '/watchlist/love-untangled.jfif',
    type: 'TV',
    genre: 'K-Drama',
    status: 'want-to-watch',
    rating: undefined,
    thoughts: '',
  },
  {
    id: 'modern-family',
    title: 'Modern Family',
    poster: '/watchlist/modern-family.jfif',
    type: 'TV',
    genre: 'Sitcom',
    status: 'want-to-watch',
    rating: undefined,
    thoughts: '',
  },
  {
    id: 'real-steel',
    title: 'Real Steel',
    poster: '/watchlist/real-steel.jfif',
    type: 'Movie',
    genre: 'Sci-Fi',
    status: 'want-to-watch',
    rating: undefined,
    thoughts: '',
  },
  {
    id: 'words-bubble-up-like-soda-pop',
    title: 'Words Bubble Up Like Soda Pop',
    poster: '/watchlist/words-bubble-up-like-soda-pop.jfif',
    type: 'Movie',
    genre: 'Anime',
    status: 'want-to-watch',
    rating: undefined,
    thoughts: '',
  },
  {
    id: 'digital-circus',
    title: 'The Amazing Digital Circus',
    poster: '/watchlist/digital-circus.jfif',
    type: 'TV',
    genre: 'Animation',
    status: 'want-to-watch',
    rating: undefined,
    thoughts: '',
  },
];

const statusLabel: Record<Status, string> = {
  watching: 'Watching',
  watched: 'Watched',
  'want-to-watch': 'Want to Watch',
  dropped: 'Dropped',
};

const statusColor: Record<Status, string> = {
  watching: '#2e8b57',
  watched: '#3a7bd5',
  'want-to-watch': '#8a6d1a',
  dropped: '#a0453a',
};

const menuFilters: { label: string; value: 'all' | Status | 'top-rated' }[] = [
  { label: 'Suggestions for You', value: 'all' },
  { label: 'Currently Watching', value: 'watching' },
  { label: 'Watched', value: 'watched' },
  { label: 'Want to Watch', value: 'want-to-watch' },
  { label: 'Top Rated', value: 'top-rated' },
];

// image with a graceful fallback — if the poster file is missing, shows a tinted
// gradient card (using that show's status color) instead of a broken/grey box
function CoverImage({ src, alt, statusColorHex }: { src: string; alt: string; statusColorHex: string }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className="w-full h-full flex items-center justify-center"
        style={{ background: `linear-gradient(160deg, ${statusColorHex}55, #101010)` }}
      >
        <span style={{ fontSize: '20px', opacity: 0.5 }}>🎬</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover"
      onError={() => setErrored(true)}
    />
  );
}

// shared reset so real <button> elements never show the browser's default border/background
const buttonReset: React.CSSProperties = {
  border: 'none',
  background: 'none',
  padding: 0,
  margin: 0,
  cursor: 'pointer',
  appearance: 'none',
  WebkitTapHighlightColor: 'transparent',
};

export default function WatchListApp() {
  const [filter, setFilter] = useState<'all' | Status | 'top-rated'>('all');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (filter === 'all') return shows;
    if (filter === 'top-rated') return shows.filter((s) => (s.rating ?? 0) >= 8);
    return shows.filter((s) => s.status === filter);
  }, [filter]);

  const rows = useMemo(() => {
    const genres = Array.from(new Set(filtered.map((s) => s.genre)));
    return genres.map((genre) => ({
      genre,
      items: filtered.filter((s) => s.genre === genre),
    }));
  }, [filtered]);

  const selectedShow = shows.find((s) => s.id === selectedId);

  return (
    <div className="w-full h-[420px] flex flex-col select-none text-xs relative overflow-hidden" style={{ background: '#141414', color: '#e5e5e5' }}>
      {/* top bar */}
      <div
        className="flex items-center gap-3 px-3 py-2 flex-shrink-0"
        style={{ background: 'linear-gradient(to bottom, #8a0f0f, #4a0808)' }}
      >
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white px-2 py-1"
          style={{ ...buttonReset, background: 'rgba(0,0,0,0.3)', borderRadius: '2px' }}
        >
          ☰
        </button>
        <span className="font-bold tracking-wider text-white" style={{ fontSize: '14px', letterSpacing: '1px' }}>
          NETFLEX
        </span>
      </div>

      {/* dropdown filter menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="absolute top-11 left-2 z-30 py-1"
            style={{ background: 'rgba(40,40,40,0.95)', borderRadius: '2px', boxShadow: '0 6px 16px rgba(0,0,0,0.6)', width: '190px' }}
          >
            {menuFilters.map((f) => (
              <button
                key={f.value}
                onClick={() => { setFilter(f.value); setMenuOpen(false); }}
                className="w-full text-left px-3 py-2"
                style={{
                  ...buttonReset,
                  width: '100%',
                  textAlign: 'left',
                  background: filter === f.value ? 'rgba(255,255,255,0.15)' : 'transparent',
                  color: '#fff',
                }}
              >
                {f.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* active filter chip */}
      {filter !== 'all' && (
        <div className="flex items-center gap-2 px-3 py-1 flex-shrink-0" style={{ borderBottom: '1px solid #2a2a2a' }}>
          <span style={{ color: '#8a8a8a' }}>Filtering:</span>
          <span style={{ color: '#fff' }}>
            {menuFilters.find((f) => f.value === filter)?.label}
          </span>
          <button onClick={() => setFilter('all')} style={{ ...buttonReset, color: '#e50914' }}>✕</button>
        </div>
      )}

      {/* rows */}
      <div className="flex-1 overflow-y-auto py-3">
        {rows.length === 0 && (
          <p className="px-4 text-gray-500">Nothing matches this filter yet.</p>
        )}
        {rows.map((row) => (
          <div key={row.genre} className="mb-4">
            <p className="px-3 mb-1 font-bold" style={{ color: '#e5e5e5', fontSize: '12px' }}>{row.genre}</p>
            <div className="flex gap-2 overflow-x-auto px-3 pb-1" style={{ scrollbarWidth: 'thin' }}>
              {row.items.map((show) => (
                <motion.button
                  key={show.id}
                  onClick={() => setSelectedId(show.id)}
                  whileHover={{ scale: 1.08, zIndex: 10 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="relative flex-shrink-0 overflow-hidden text-left"
                  style={{
                    ...buttonReset,
                    width: '84px',
                    height: '126px',
                    borderRadius: '3px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.6)',
                  }}
                >
                  <CoverImage src={show.poster} alt={show.title} statusColorHex={statusColor[show.status]} />
                  <div
                    className="absolute top-1 left-1 px-1 py-0.5 text-white"
                    style={{ background: statusColor[show.status], fontSize: '7px', borderRadius: '2px' }}
                  >
                    {statusLabel[show.status]}
                  </div>
                  {show.rating !== undefined && (
                    <div
                      className="absolute bottom-1 right-1 px-1 py-0.5"
                      style={{ background: 'rgba(0,0,0,0.75)', color: '#ffd75e', fontSize: '8px', borderRadius: '2px' }}
                    >
                      ★ {show.rating}
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* detail modal */}
      <AnimatePresence>
        {selectedShow && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ background: 'rgba(0,0,0,0.8)' }}
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{ width: '300px', background: '#181818', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 12px 32px rgba(0,0,0,0.7)' }}
            >
              <div className="relative" style={{ height: '130px' }}>
                <CoverImage src={selectedShow.poster} alt={selectedShow.title} statusColorHex={statusColor[selectedShow.status]} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #181818, transparent 65%)' }} />
                <button
                  onClick={() => setSelectedId(null)}
                  className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center text-white"
                  style={{ ...buttonReset, background: 'rgba(0,0,0,0.5)', borderRadius: '2px' }}
                >
                  ✕
                </button>
                <p className="absolute bottom-2 left-3 font-bold text-sm text-white">{selectedShow.title}</p>
              </div>

              <div className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="px-2 py-0.5 text-white"
                    style={{ background: statusColor[selectedShow.status], fontSize: '10px', borderRadius: '2px' }}
                  >
                    {statusLabel[selectedShow.status]}
                  </span>
                  <span style={{ color: '#8a8a8a', fontSize: '10px' }}>{selectedShow.type} · {selectedShow.genre}</span>
                </div>

                {selectedShow.rating !== undefined && (
                  <p className="mb-2" style={{ color: '#ffd75e' }}>
                    {'★'.repeat(Math.round(selectedShow.rating / 2))}
                    {'☆'.repeat(5 - Math.round(selectedShow.rating / 2))} {selectedShow.rating}/10
                  </p>
                )}

                <p className="leading-relaxed" style={{ color: '#c8c8c8' }}>
                  {selectedShow.thoughts || "Haven't started this one yet — no thoughts to share!"}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}