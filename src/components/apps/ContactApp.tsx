// components/apps/ContactApp.tsx
'use client';
import { useRef, useState, useEffect } from 'react';
import { Pencil, Eraser } from 'lucide-react';

const colors = [
  '#000000', '#808080', '#800000', '#808000',
  '#008000', '#008080', '#000080', '#800080',
  '#ffffff', '#c0c0c0', '#ff0000', '#ffff00',
  '#00ff00', '#00ffff', '#0000ff', '#ff00ff',
];

type Tool = 'pencil' | 'eraser';

export default function ContactApp() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const [tool, setTool] = useState<Tool>('pencil');
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(3);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  }, []);

  function getPos(e: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function startDraw(e: React.PointerEvent<HTMLCanvasElement>) {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    isDrawing.current = true;
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  function draw(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!isDrawing.current) return;
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    const { x, y } = getPos(e);
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.strokeStyle = 'rgba(0,0,0,1)';
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = color;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
  }

  function stopDraw() {
    isDrawing.current = false;
  }

  function clearCanvas() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  return (
    <div className="w-full select-none" style={{ background: '#c0c0c0', color: '#000' }}>
      {/* decorative menu bar */}
      <div className="flex gap-3 px-2 py-1 border-b border-gray-500 text-xs">
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Options</span>
        <span>Help</span>
      </div>

      {/* items-start prevents the toolbar column from stretching to match canvas height */}
      <div className="flex items-start">
        {/* left toolbar */}
        <div className="flex flex-col gap-1 p-1" style={{ borderRight: '1px solid #808080' }}>
          <button
            onClick={() => setTool('pencil')}
            className="win98-btn flex items-center justify-center gap-1"
            style={{
              background: tool === 'pencil' ? '#a0a0a0' : undefined,
              height: '24px',
              width: '64px',
              padding: '0 6px',
              lineHeight: 1,
            }}
          >
            <Pencil size={12} />
            <span className="text-[9px]">Pencil</span>
          </button>
          <button
            onClick={() => setTool('eraser')}
            className="win98-btn flex items-center justify-center gap-1"
            style={{
              background: tool === 'eraser' ? '#a0a0a0' : undefined,
              height: '24px',
              width: '64px',
              padding: '0 6px',
              lineHeight: 1,
            }}
          >
            <Eraser size={12} />
            <span className="text-[9px]">Eraser</span>
          </button>
        </div>

        {/* canvas area with contact info behind it */}
        <div className="relative flex-1 h-80" style={{ border: '2px inset #808080' }}>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5 bg-white pointer-events-none px-2 text-center">
            <p className="font-bold text-sm">Ashain Rexon</p>
            <p className="text-xs">ashainrexon@gmail.com</p>
            <p className="text-xs">linkedin.com/in/ashainrexon</p>
            <p className="text-xs">github.com/ashainrexon</p>
          </div>

          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full cursor-crosshair"
            onPointerDown={startDraw}
            onPointerMove={draw}
            onPointerUp={stopDraw}
            onPointerLeave={stopDraw}
          />
        </div>
      </div>

      {/* brush size + clear */}
      <div className="flex items-center gap-2 px-2 py-1 text-xs">
        <span>Brush:</span>
        <input
          type="range"
          min={1}
          max={12}
          value={brushSize}
          onChange={(e) => setBrushSize(Number(e.target.value))}
        />
        <button onClick={clearCanvas} className="win98-btn px-2 py-0.5 ml-auto">
          Clear
        </button>
      </div>

      {/* color palette */}
      <div className="flex flex-wrap gap-1 p-2" style={{ borderTop: '1px solid #808080' }}>
        {colors.map((c) => (
          <button
            key={c}
            onClick={() => setColor(c)}
            className="w-5 h-5"
            style={{
              background: c,
              border: color === c ? '2px solid #000080' : '1px solid #808080',
            }}
          />
        ))}
      </div>
    </div>
  );
}