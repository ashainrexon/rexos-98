// components/windows/AppWindow.tsx
'use client';
import { motion, useDragControls } from 'framer-motion';

interface AppWindowProps {
  title: string;
  onClose: () => void;
  onFocus: () => void;
  onMinimize: () => void;
  zIndex: number;
  width?: number;
  children: React.ReactNode;
}

export default function AppWindow({
  title,
  onClose,
  onFocus,
  onMinimize,
  zIndex,
  width = 384, // default, matches the old fixed w-96
  children,
}: AppWindowProps) {
  const dragControls = useDragControls();

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      onMouseDown={onFocus}
      initial={{ x: 100, y: 100 }}
      className="window absolute"
      style={{ zIndex, width: `${width}px` }}
    >
      <div
        className="title-bar cursor-move"
        onPointerDown={(e) => dragControls.start(e)}
      >
        <div className="title-bar-text">{title}</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" onClick={onMinimize} />
          <button aria-label="Maximize" />
          <button aria-label="Close" onClick={onClose} />
        </div>
      </div>

      <div className="window-body">{children}</div>
    </motion.div>
  );
}