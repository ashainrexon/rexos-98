// components/apps/GameBacklogApp.tsx
'use client';
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Status = 'playing' | 'backlog' | 'completed' | 'dropped' | 'wishlist';

type Game = {
  id: string;
  title: string;
  cover: string;
  status: Status;
  rating?: number;
  thoughts: string;
  genre: string;
  hours?: number;
};

const games: Game[] = [
  {
    id: 'persona-3-reload',
    title: 'Persona 3 Reload',
    cover: '/games/persona3.jfif',
    status: 'playing',
    rating: 9,
    thoughts: 'First JRPG I have ever played, amazing soundtracks and characters. I love the social sim aspect of it, and the combat is fun and engaging.',
    genre: 'JRPG',
    hours: 34,
  },
  {
    id: 'hollow-knight',
    title: 'Hollow Knight',
    cover: '/games/hollow-knight.jfif',
    status: 'dropped',
    rating: 5,
    thoughts: 'Great art style and music, but the game feels like it is designed to be annoying instead of being challenging. I got lost in the map and had no idea where to go, and the spawnpoints are far away from major fights. Will come back again to see if I will change my mind.',
    genre: 'Metroidvania',
    hours: 11.4,
  },
  {
    id: 'undertale',
    title: 'Undertale',
    cover: '/games/undertale.png',
    status: 'completed',
    rating: 10,
    thoughts: 'This is a great game. The emotional story is amazing, the characters are lovable, and the music is fantastic. I love how the game allows you to play through it without killing anyone, and how your choices affect the story. I will never forget this game.',
    genre: 'RPG',
    hours: 14.8,
  },
  {
    id: 'silksong',
    title: 'Hollow Knight: Silksong',
    cover: '/games/silksong.jfif',
    status: 'wishlist',
    thoughts: '',
    genre: 'Metroidvania',
  },
   {
    id: 'elden-ring',
    title: 'Elden Ring',
    cover: '/games/elden-ring.jfif',
    status: 'wishlist',
    thoughts: '',
    genre: 'Action RPG',
  },
  {
    id: 'donut-county',
    title: 'Donut County',
    cover: '/games/donut-county.jfif',
    status: 'completed',
    rating: 7,  
    thoughts: 'A small game with loveable characters and a fun story. The gameplay is simple but satisfying, and the art style is charming. I enjoyed the game, but it seems like a comfort game you play once and never again.',
    genre: 'Indie',
    hours: 3.3,
  },
  {
    id: 'ghost-of-tsushima',
    title: 'Ghost of Tsushima',
    cover: '/games/ghost-of-tsushima.jfif',
    status: 'completed',
    rating: 9,
    thoughts: 'An beautiful open-world game with a compelling story and stunning visuals. The combat is fluid and satisfying but a bit too easy, and the music perfectly captures the atmosphere.',
    genre: 'Action Adventure',
    hours: 53.6,
  },
  {
    id: 'celeste',
    title: 'Celeste',
    cover: '/games/celeste.jfif',  
    status: 'backlog',   
    thoughts: '',
    genre: 'Platformer',  
  },
  {
    id: 'expedition-33',
    title: 'Clair Obscur: Expedition 33',
    cover: '/games/expedition-33.jfif',
    status: 'completed',
    rating: 10,
    thoughts: 'The greatest game of all time, everything is perfect. Go play it now.',
    genre: 'Indie',
    hours: 38.1,
  },
  {
    id: 'katana-zero',
    title: 'Katana Zero',
    cover: '/games/katana-zero.jfif',
    status: 'completed',
    rating: 7,
    thoughts: 'A fast-paced action game with a unique time-manipulation mechanic. The story is intriguing and the soundtrack is fantastic. I loved the combat and the level design, and the game kept me on my toes the entire time. Waiting for the DLC.',
    genre: 'Action',
    hours: 4.7, 
  },
  {
    id: 'stardew-valley',
    title: 'Stardew Valley',
    cover: '/games/stardew-valley.jfif',
    status: 'playing',
    rating: 9,
    thoughts: 'Great change of pace from the other games I have been playing. The game is relaxing and fun, and the music is great. I love the farming aspect of the game, and the relationships you can build with the villagers. I will be playing this game for a long time.',
    genre: 'Simulation',
    hours: 44.4,    
  },
  {
    id: 'titanfall-2',
    title: 'Titanfall 2',
    cover: '/games/titanfall-2.jfif',
    status: 'completed',
    rating: 10,
    thoughts: 'The pinnacle of first-person shooters. The campaign has an amazing story and the playerbase is still active. The community are such nice people and the movement of this game inspired many modern games.',
    genre: 'First-Person Shooter',
    hours: 10.9,  
  },
  {
    id: 'until-then',
    title: 'Until Then',
    cover: '/games/until-then.jfif',
    status: 'completed',
    rating: 10,
    thoughts: 'A beautiful and emotional game that explores the themes of love, loss, and the passage of time. The art style is stunning, the music is hauntingly beautiful, and the story is heart-wrenching. I will never forget this game. Playing the DLC soon.',
    genre: 'Indie',
    hours: 21.1, 
  },
  {
    id: 'honkai-star-rail',
    title: 'Honkai: Star Rail',
    cover: '/games/honkai-star-rail.jfif',
    status: 'playing',
    rating: 10,
    thoughts: 'A fun and engaging gacha game with a compelling story and stunning visuals. The combat is fast-paced and satisfying, taken inspiration from the persona franchise, and the characters are lovable. I will be playing this game for a long time.',
    genre: 'Gacha RPG',
    hours: 50,     
  },
  {
    id: 'genshin-impact',
    title: 'Genshin Impact',
    cover: '/games/genshin-impact.jfif',
    status: 'playing',
    rating: 9,
    thoughts: 'A visually stunning open-world RPG with a vast amount of content and engaging gameplay. The character roster is diverse and each has unique abilities and stories. I enjoy the exploration and the various activities available.',
    genre: 'Action RPG',
    hours: 100,
  },
  {
    id: 'sonic-boom',
    title: 'Sonic Boom',
    cover: '/games/sonic-boom.jfif',
    status: 'dropped',
    rating: 3,
    thoughts: 'The controls are clunky, the story isn\'t great, and the level design matches with the poor gameplay. Not for me.',
    genre: 'Platformer',
    hours: 1.2,
  },
  {
    id: 'tokyo-ghostwire',
    title: 'Tokyo Ghostwire',
    cover: '/games/tokyo-ghostwire.jfif',
    status: 'completed',
    rating: 8,
    thoughts: 'An atmospheric cyberpunk game with a compelling story and stunning visuals. The gameplay is engaging and the world feels alive.',
    genre: 'RPG',
    hours: 25.6,
  },
  {
    id: 'pragmata',
    title: 'Pragmata',
    cover: '/games/pragmata.jfif',
    status: 'wishlist',
    thoughts: '',
    genre: 'Puzzle',
  },
  {
    id: 'dispatch',
    title: 'Dispatch',
    cover: '/games/dispatch.jfif',
    status: 'wishlist',
    thoughts: '',
    genre: 'Strategy',
  },
  {
    id: 'black-myth-wukong',
    title: 'Black Myth: Wukong',
    cover: '/games/black-myth-wukong.jfif',
    status: 'wishlist',
    thoughts: '',
    genre: 'Action RPG',
  },
  {
    id: 'nier-automata',
    title: 'NieR: Automata',
    cover: '/games/nier-automata.jfif',
    status: 'wishlist',
    thoughts: '',
    genre: 'Action RPG',
  },
  {
    id: 'omori',
    title: 'OMORI',
    cover: '/games/omori.jfif',
    status: 'wishlist',
    thoughts: '',
    genre: 'RPG', 
  },
];

const statusFilters: { label: string; value: 'all' | Status | 'favorites' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Playing', value: 'playing' },
  { label: 'Backlog', value: 'backlog' },
  { label: 'Completed', value: 'completed' },
  { label: 'Wishlist', value: 'wishlist' },
  { label: 'Favorites', value: 'favorites' },
];

const statusLabel: Record<Status, string> = {
  playing: 'Playing',
  backlog: 'Backlog',
  completed: 'Completed',
  dropped: 'Dropped',
  wishlist: 'Wishlist',
};

const statusColor: Record<Status, string> = {
  playing: '#2e8b57',
  backlog: '#5b6b7a',
  completed: '#3a7bd5',
  dropped: '#a0453a',
  wishlist: '#c9822f',
};

// games featured in the rotating banner — favorites (rating 8+)
const featured = games.filter((g) => (g.rating ?? 0) >= 8);

// image with a graceful fallback — if the cover file is missing, shows a tinted
// gradient card (using that game's status color) instead of a broken/grey box
function CoverImage({ src, alt, statusColorHex }: { src: string; alt: string; statusColorHex: string }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className="w-full h-full flex items-center justify-center"
        style={{ background: `linear-gradient(160deg, ${statusColorHex}55, #14170f)` }}
      >
        <span style={{ fontSize: '22px', opacity: 0.5 }}>🎮</span>
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

export default function GameBacklogApp() {
  const [statusFilter, setStatusFilter] = useState<'all' | Status | 'favorites'>('all');
  const [sortByRating, setSortByRating] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    if (featured.length <= 1) return;
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % featured.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const visibleGames = useMemo(() => {
    let list = games.filter((g) => {
      if (statusFilter === 'all') return true;
      if (statusFilter === 'favorites') return (g.rating ?? 0) >= 8;
      return g.status === statusFilter;
    });
    if (sortByRating) {
      list = [...list].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    }
    return list;
  }, [statusFilter, sortByRating]);

  const selectedGame = games.find((g) => g.id === selectedId);
  const bannerGame = featured[bannerIndex];

  return (
    <div className="w-full h-105 flex flex-col select-none text-xs relative overflow-hidden" style={{ background: '#20241d', color: '#e8e8e0' }}>
      {/* top nav bar */}
      <div className="flex items-center justify-between px-3 py-2 flex-wrap gap-y-1" style={{ background: '#0f110d', borderBottom: '2px solid #3a4032' }}>
        <span className="font-bold tracking-widest" style={{ color: '#8fc9ff' }}>GAME LOCKER</span>
        <div className="flex gap-3 flex-wrap">
          {statusFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setStatusFilter(f.value)}
              style={{
                ...buttonReset,
                color: statusFilter === f.value ? '#8fc9ff' : '#b8b8a8',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* featured rotating banner */}
      {bannerGame && (
        <div className="relative" style={{ height: '110px', background: '#000' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={bannerGame.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 cursor-pointer"
              onClick={() => setSelectedId(bannerGame.id)}
            >
              <div className="absolute inset-0" style={{ opacity: 0.55 }}>
                <CoverImage src={bannerGame.cover} alt={bannerGame.title} statusColorHex={statusColor[bannerGame.status]} />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end p-3" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent 70%)' }}>
                <p className="font-bold text-sm">{bannerGame.title}</p>
                <p style={{ color: '#ffd75e' }}>★ {bannerGame.rating}/10 — {bannerGame.genre}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-1 right-2 flex gap-1">
            {featured.map((g, i) => (
              <button
                key={g.id}
                onClick={() => setBannerIndex(i)}
                className="rounded-full"
                style={{
                  ...buttonReset,
                  width: '6px',
                  height: '6px',
                  background: i === bannerIndex ? '#8fc9ff' : 'rgba(255,255,255,0.3)',
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* sort toggle */}
      <div className="flex items-center px-3 py-1" style={{ borderBottom: '1px solid #3a4032' }}>
        <span style={{ color: '#8a8a78' }}>{visibleGames.length} game{visibleGames.length !== 1 ? 's' : ''}</span>
        <div className="flex-1" />
        <button
          onClick={() => setSortByRating(!sortByRating)}
          className="px-2 py-0.5"
          style={{
            ...buttonReset,
            background: sortByRating ? '#2a3a4a' : 'transparent',
            color: '#8fc9ff',
            border: '1px solid #3a4032',
            borderRadius: '2px',
          }}
        >
          Sort by rating {sortByRating ? '✓' : ''}
        </button>
      </div>

      {/* game grid */}
      <div className="flex-1 overflow-y-auto p-3">
        {visibleGames.length === 0 ? (
          <p className="text-center mt-6" style={{ color: '#6a6a5a' }}>Nothing here yet.</p>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            <AnimatePresence>
              {visibleGames.map((game) => (
                <motion.button
                  key={game.id}
                  layoutId={`game-${game.id}`}
                  onClick={() => setSelectedId(game.id)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ scale: 1.05, zIndex: 10 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="relative overflow-hidden text-left"
                  style={{
                    ...buttonReset,
                    aspectRatio: '3 / 4',
                    borderRadius: '3px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.5)',
                  }}
                >
                  <CoverImage src={game.cover} alt={game.title} statusColorHex={statusColor[game.status]} />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent 60%)' }} />

                  <div
                    className="absolute top-1 left-1 px-1.5 py-0.5 text-white"
                    style={{ background: statusColor[game.status], fontSize: '8px', borderRadius: '2px' }}
                  >
                    {statusLabel[game.status]}
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-1.5">
                    <p className="font-bold leading-tight" style={{ fontSize: '9px' }}>{game.title}</p>
                    {game.rating !== undefined && (
                      <p style={{ color: '#ffd75e', fontSize: '8px' }}>★ {game.rating}/10</p>
                    )}
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* detail overlay */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ background: 'rgba(0,0,0,0.7)' }}
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              layoutId={`game-${selectedGame.id}`}
              onClick={(e) => e.stopPropagation()}
              className="overflow-hidden"
              style={{ width: '320px', background: '#181c14', borderRadius: '4px', boxShadow: '0 12px 32px rgba(0,0,0,0.6)' }}
            >
              <div className="relative" style={{ height: '120px' }}>
                <CoverImage src={selectedGame.cover} alt={selectedGame.title} statusColorHex={statusColor[selectedGame.status]} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #181c14, transparent 60%)' }} />
                <button
                  onClick={() => setSelectedId(null)}
                  className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center text-white"
                  style={{ ...buttonReset, background: 'rgba(0,0,0,0.5)', borderRadius: '2px' }}
                >
                  ✕
                </button>
                <p className="absolute bottom-2 left-3 font-bold text-sm">{selectedGame.title}</p>
              </div>

              <div className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="px-2 py-0.5 text-white"
                    style={{ background: statusColor[selectedGame.status], fontSize: '10px', borderRadius: '2px' }}
                  >
                    {statusLabel[selectedGame.status]}
                  </span>
                  <span style={{ color: '#8a8a78', fontSize: '10px' }}>{selectedGame.genre}</span>
                  {selectedGame.hours !== undefined && (
                    <span style={{ color: '#8a8a78', fontSize: '10px' }}>· {selectedGame.hours}h played</span>
                  )}
                </div>

                {selectedGame.rating !== undefined && (
                  <p className="mb-2" style={{ color: '#ffd75e' }}>
                    {'★'.repeat(Math.round(selectedGame.rating / 2))}
                    {'☆'.repeat(5 - Math.round(selectedGame.rating / 2))} {selectedGame.rating}/10
                  </p>
                )}

                <p className="leading-relaxed" style={{ color: '#d8d8c8' }}>
                  {selectedGame.thoughts || "Haven't started this one yet — no thoughts to share!"}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}