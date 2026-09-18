// components/common/ToggleSwitch.tsx
'use client';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
  label?: string;
}

export default function ToggleSwitch({ checked, onChange, label }: ToggleSwitchProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        className="relative w-10 h-5 rounded-full transition-colors"
        style={{ background: checked ? '#000080' : '#808080' }}
      >
        <span
          className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform"
          style={{ transform: checked ? 'translateX(20px)' : 'translateX(0)' }}
        />
      </button>
      {label && <span>{label}</span>}
    </label>
  );
}