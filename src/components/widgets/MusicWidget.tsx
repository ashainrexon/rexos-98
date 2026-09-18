// components/widgets/MusicWidget.tsx
'use client';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';

type Track = { title: string; artist: string; src: string; cover: string };

const tracks: Track[] = [
  { title: 'Resort Island', artist: 'SEGA Richard Jaques', src: '/music/Resort-Island.mp3', cover: '/covers/sonic.jfif' },
  { title: 'Memories Of You', artist: '目黒 将司', src: '/music/Memories-Of-You.mp3', cover: '/games/persona3.jfif' },
  { title: 'Aria Math', artist: 'C418', src: '/music/Aria-Math.mp3', cover: '/covers/aria-math.jfif' },
  { title: 'Scissor Seven: Chill Theme', artist: '侯俊杰', src: '/music/Scissor-Seven.mp3', cover: '/covers/scissor-seven.jfif' },
  { title: 'Genshin Impact - Main Theme', artist: 'HOYO-MiX', src: '/music/Genshin-Impact.mp3', cover: '/covers/genshin-impact.jfif' },
  { title: '12am', artist: 'Toby Fox', src: '/music/12am.mp3', cover: '/covers/deltarune.jfif' },
];

export default function MusicWidget() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = tracks[currentIndex];

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.src = currentTrack.src;
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [currentIndex]);

  // keep the actual audio element's volume in sync with state
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  function togglePlay() {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }

  function skip(direction: 1 | -1) {
    setCurrentIndex((prev) => (prev + direction + tracks.length) % tracks.length);
  }

  function handleVolumeChange(value: number) {
    setVolume(value);
    if (value > 0 && isMuted) setIsMuted(false);
  }

  return (
    <div className="fixed top-4 right-6 w-48 window select-none">
      <div className="title-bar">
        <div className="title-bar-text">Media Player</div>
      </div>

      <div className="window-body flex flex-col items-center py-3 px-3" style={{ background: '#c0c0c0' }}>
        <audio ref={audioRef} onEnded={() => skip(1)} className="hidden" />

        {/* vinyl disc */}
        <motion.div
          className="w-24 h-24 rounded-full flex items-center justify-center"
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={
            isPlaying
              ? { repeat: Infinity, ease: 'linear', duration: 4 }
              : { duration: 0.3 }
          }
          style={{
            backgroundImage:
              'repeating-radial-gradient(circle, #1a1a1a 0px, #1a1a1a 1px, #000 1px, #000 4px)',
            boxShadow: 'inset 0 0 0 2px #808080, 0 1px 3px rgba(0,0,0,0.5)',
          }}
        >
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300">
            <img src={currentTrack.cover} className="w-full h-full object-cover" alt="" />
          </div>
        </motion.div>

        {/* track info */}
        <div
          className="w-full mt-2 px-2 py-1 text-center"
          style={{ border: '1px inset #808080', background: '#fff' }}
        >
          <p className="text-xs font-bold text-black truncate">{currentTrack.title}</p>
          <p className="text-[10px] text-gray-600 truncate">{currentTrack.artist}</p>
        </div>

        {/* playback controls */}
        <div className="flex items-center gap-1 mt-2 w-full">
          <button
            onClick={() => skip(-1)}
            className="win98-btn flex-1 flex items-center justify-center py-1"
            style={{ minWidth: 0, color: '#000' }}
          >
            <SkipBack size={14} />
          </button>
          <button
            onClick={togglePlay}
            className="win98-btn flex-1 flex items-center justify-center py-1"
            style={{ minWidth: 0, color: '#000' }}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>
          <button
            onClick={() => skip(1)}
            className="win98-btn flex-1 flex items-center justify-center py-1"
            style={{ minWidth: 0, color: '#000' }}
          >
            <SkipForward size={14} />
          </button>
        </div>

        {/* volume slider */}
        <div className="flex items-center gap-2 mt-2 w-full">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="flex items-center justify-center"
            style={{ minWidth: 0, color: '#000' }}
          >
            {isMuted || volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={isMuted ? 0 : volume}
            onChange={(e) => handleVolumeChange(Number(e.target.value))}
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
}