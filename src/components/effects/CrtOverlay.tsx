// components/effects/CrtOverlay.tsx
'use client';

export default function CrtOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]" style={{ mixBlendMode: 'overlay' }}>
      {/* scanlines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'repeating-linear-gradient(to bottom, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 3px)',
        }}
      />

      {/* subtle flicker */}
      <div
        className="absolute inset-0 animate-crt-flicker"
        style={{ background: 'rgba(255,255,255,0.02)' }}
      />

      {/* vignette for screen curvature illusion */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.35) 100%)',
          mixBlendMode: 'normal',
        }}
      />
    </div>
  );
}