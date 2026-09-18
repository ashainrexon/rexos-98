// components/apps/PhotoViewerApp.tsx
'use client';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Shuffle, Grid2x2 } from 'lucide-react';

type Photo = {
  id: string;
  src: string;
  title: string;
  camera: string;
  lens: string;
  location: string;
  date: string;
};

const photos: Photo[] = [
    {
    id: 'photo1',
    src: '/photos/photo1.jpg',
    title: 'Krakow Old Town',
    camera: 'Fujifilm X-T30 II',
    lens: 'Fujinon XF 27mm f/2.8',
    location: 'Krakow, Poland',
    date: 'July 2026',
  },
  {
    id: 'photo2',
    src: '/photos/photo2.jpg',
    title: 'Vistula River',
    camera: 'Fujifilm X-T30 II',
    lens: 'Fujinon XF 27mm f/2.8',
    location: 'Krakow, Poland',
    date: 'July 2026',
  },
  {
    id: 'photo3',
    src: '/photos/photo3.jpg',
    title: 'Wawel Castle',
    camera: 'Fujifilm X-T30 II',
    lens: 'Fujinon XF 27mm f/2.8',
    location: 'Krakow, Poland',
    date: 'July 2026',
  },
  {
    id: 'photo4',
    src: '/photos/photo4.jpg',
    title: 'Rynek Główny',
    camera: 'Fujifilm X-T30 II',
    lens: 'Fujinon XF 27mm f/2.8',
    location: 'Krakow, Poland',
    date: 'July 2026',
  },
  {
    id: 'photo5',
    src: '/photos/photo5.jpg',
    title: 'Rynek Główny',
    camera: 'Fujifilm X-T30 II',
    lens: 'Fujinon XF 27mm f/2.8',
    location: 'Krakow, Poland',
    date: 'July 2026',
  },
  {
    id: 'photo6',
    src: '/photos/photo6.jpg',
    title: 'Rynek Główny',
    camera: 'Fujifilm X-T30 II',
    lens: 'Fujinon XF 27mm f/2.8',
    location: 'Krakow, Poland',
    date: 'July 2026',
  },
  {
    id: 'photo7',
    src: '/photos/photo7.jpg',
    title: 'Rynek Główny',
    camera: 'Fujifilm X-T30 II',
    lens: 'Fujinon XF 27mm f/2.8',
    location: 'Krakow, Poland',
    date: 'July 2026',
  },
  {
    id: 'photo8',
    src: '/photos/photo8.jpg',
    title: 'Gubałówkę',
    camera: 'Fujifilm X-T30 II',
    lens: 'Fujinon XF 27mm f/2.8',
    location: 'Zakopane, Poland',
    date: 'July 2026',
  },
  {
    id: 'photo9',
    src: '/photos/photo9.jpg',
    title: 'Gubałówkę',
    camera: 'Fujifilm X-T30 II',
    lens: 'Fujinon XF 27mm f/2.8',
    location: 'Zakopane, Poland',
    date: 'July 2026',
  },
  {
    id: 'photo10',
    src: '/photos/photo10.jpg',
    title: 'Gubałówkę',
    camera: 'Fujifilm X-T30 II',
    lens: 'Fujinon XF 27mm f/2.8',
    location: 'Zakopane, Poland',
    date: 'July 2026',
  },
  {
    id: 'photo11',
    src: '/photos/photo11.jpg',
    title: 'Gubałówkę',
    camera: 'Fujifilm X-T30 II',
    lens: 'Fujinon XF 27mm f/2.8',
    location: 'Zakopane, Poland',
    date: 'July 2026',
  },
  {
    id: 'photo12',
    src: '/photos/photo12.jpg',
    title: 'Krupówki Street.',
    camera: 'Fujifilm X-T30 II',
    lens: 'Fujinon XF 27mm f/2.8',
    location: 'Zakopane, Poland',
    date: 'July 2026',
  },
  {
    id: 'photo13',
    src: '/photos/photo13.jpg',
    title: 'Krupówki Street.',
    camera: 'Fujifilm X-T30 II',
    lens: 'Fujinon XF 27mm f/2.8',
    location: 'Zakopane, Poland',
    date: 'July 2026',
  },
  {
    id: 'photo14',
    src: '/photos/photo14.jpg',
    title: 'Krupówki Street.',
    camera: 'Fujifilm X-T30 II',
    lens: 'Fujinon XF 27mm f/2.8',
    location: 'Zakopane, Poland',
    date: 'July 2026',
  },
  {
    id: 'photo15',
    src: '/photos/photo15.jpg',
    title: 'Tatras Mountains',
    camera: 'Fujifilm X-T30 II',
    lens: 'Fujinon XF 27mm f/2.8',
    location: 'Zakopane, Poland',
    date: 'July 2026',
  },
  {
    id: 'photo16',
    src: '/photos/photo16.jpg',
    title: 'Morskie Oko Lake',
    camera: 'Fujifilm X-T30 II',
    lens: 'Fujinon XF 27mm f/2.8',
    location: 'Zakopane, Poland',
    date: 'July 2026',
  },
  {
    id: 'photo17',
    src: '/photos/photo17.jpg',
    title: 'Morskie Oko Lake ATM',
    camera: 'Fujifilm X-T30 II',
    lens: 'Fujinon XF 27mm f/2.8',
    location: 'Zakopane, Poland',
    date: 'July 2026',
  },
  {
    id: 'photo18',
    src: '/photos/photo18.jpg',
    title: 'Morskie Oko Lake',
    camera: 'Fujifilm X-T30 II',
    lens: 'Fujinon XF 27mm f/2.8',
    location: 'Zakopane, Poland',
    date: 'July 2026',
  },
  {
    id: 'photo19',
    src: '/photos/photo19.jpg',
    title: 'Morskie Oko Lake',
    camera: 'Fujifilm X-T30 II',
    lens: 'Fujinon XF 27mm f/2.8',
    location: 'Zakopane, Poland',
    date: 'July 2026',
  },
  {
    id: 'photo20',
    src: '/photos/photo20.jpg',
    title: 'Mount Rysy',
    camera: 'Fujifilm X-T30 II',
    lens: 'Fujinon XF 27mm f/2.8',
    location: 'Zakopane, Poland',
    date: 'July 2026',
  },
  {
    id: 'photo21',
    src: '/photos/photo21.jpg',
    title: 'Lily Pads',
    camera: 'Fujifilm X-T30 II',
    lens: 'Fujinon XF 27mm f/2.8',
    location: 'Warsaw, Poland',
    date: 'July 2026',
  },
  {
    id: 'photo22',
    src: '/photos/photo22.jpg',
    title: 'Penguin Enclosure',
    camera: 'Fujifilm X-T30 II',
    lens: 'Fujinon XF 27mm f/2.8',
    location: 'Warsaw, Poland',
    date: 'July 2026',
  },
  {
    id: 'photo23',
    src: '/photos/photo23.jpg',
    title: 'Złote Tarasy',
    camera: 'Fujifilm X-T30 II',
    lens: 'Fujinon XF 27mm f/2.8',
    location: 'Warsaw, Poland',
    date: 'July 2026',
  },
  {
    id: 'photo24',
    src: '/photos/photo24.jpg',
    title: 'Złote Tarasy',
    camera: 'Fujifilm X-T30 II',
    lens: 'Fujinon XF 27mm f/2.8',
    location: 'Warsaw, Poland',
    date: 'July 2026',
  },
  {
    id: 'photo25',
    src: '/photos/photo25.jpg',
    title: 'Palace of Culture and Science',
    camera: 'Fujifilm X-T30 II',
    lens: 'Fujinon XF 27mm f/2.8',
    location: 'Warsaw, Poland',
    date: 'July 2026',
  },
  {
    id: 'photo26',
    src: '/photos/photo26.jpg',
    title: 'Church of the Holy Cross',
    camera: 'Fujifilm X-T30 II',
    lens: 'Fujinon XF 27mm f/2.8',
    location: 'Warsaw, Poland',
    date: 'July 2026',
  },
];

export default function PhotoViewerApp() {
  const [index, setIndex] = useState(0);
  const [isShuffling, setIsShuffling] = useState(false);
  const [view, setView] = useState<'single' | 'gallery'>('single');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentPhoto = photos[index];

  useEffect(() => {
    if (!isShuffling) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % photos.length);
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isShuffling]);

  function goPrev() {
    setIsShuffling(false);
    setIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }

  function goNext() {
    setIsShuffling(false);
    setIndex((prev) => (prev + 1) % photos.length);
  }

  function openPhoto(i: number) {
    setIndex(i);
    setView('single');
  }

  return (
    <div className="w-full h-96 flex flex-col select-none" style={{ background: '#c0c0c0', color: '#000' }}>
      {/* menu bar */}
      <div className="flex justify-between items-center px-2 py-1 border-b border-gray-500 text-xs" style={{ background: 'linear-gradient(to bottom, #4a90d9, #2a5fa8)', color: '#fff' }}>
        <div className="flex gap-3">
          <span>File</span>
          <span>Print</span>
          <span>E-mail</span>
          <span>Open</span>
        </div>
        <button
          onClick={() => setView(view === 'gallery' ? 'single' : 'gallery')}
          className="flex items-center gap-1"
          title="Gallery view"
          style={{ color: '#000' }}
        >
          Gallery <Grid2x2 size={14} /> 
        </button>
      </div>

      {view === 'gallery' ? (
        // gallery grid — every tile forced to a square, cropped to fill, no ragged rows
        <div className="flex-1 overflow-y-auto p-2 grid grid-cols-4 gap-2" style={{ background: '#000' }}>
          {photos.map((photo, i) => (
            <button
              key={photo.id}
              onClick={() => openPhoto(i)}
              className="relative overflow-hidden"
              style={{ aspectRatio: '1 / 1'}}
            >
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover"
                style={{ border: i === index ? '2px solid #4a90d9' : '2px solid transparent' }}
              />
            </button>
          ))}
        </div>
      ) : (
        <>
          {/* photo display */}
          <div className="flex-1 flex items-center justify-center relative" style={{ background: '#000' }}>
            <img
              src={currentPhoto.src}
              alt={currentPhoto.title}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* metadata bar */}
          <div className="px-3 py-1 text-xs" style={{ background: '#eef2f7', borderTop: '1px solid #808080' }}>
            <p className="font-bold">{currentPhoto.title}</p>
            <p>{currentPhoto.camera} — {currentPhoto.lens}</p>
            <p>{currentPhoto.location} · {currentPhoto.date}</p>
          </div>

          {/* controls */}
          <div
            className="flex items-center justify-center gap-4 py-2"
            style={{ background: 'linear-gradient(to bottom, #dfe8f5, #b8cbe0)', borderTop: '1px solid #808080' }}
          >
            <button onClick={goPrev} className="win98-btn flex items-center justify-center" style={{ minWidth: 0, padding: '4px 8px', color: '#000'  }}>
              <ChevronLeft size={16} />
            </button>

            <button
              onClick={() => setIsShuffling(!isShuffling)}
              className="rounded-full flex items-center justify-center"
              style={{
                width: '36px',
                height: '36px',
                background: isShuffling ? '#2a5fa8' : '#4a90d9',
                border: '2px solid #1a3a66',
                color: '#fff',
              }}
              title="Shuffle every 5 seconds"
            >
              <Shuffle size={16} />
            </button>

            <button onClick={goNext} className="win98-btn flex items-center justify-center" style={{ minWidth: 0, padding: '4px 8px', color: '#000' }}>
              <ChevronRight size={16} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}