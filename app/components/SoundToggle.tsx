"use client";

import { setSound, useSound } from "../sound/waves";

/** Sea-sound switch. The name stays "Sound"; the state is carried by aria-pressed. */
export function SoundToggle({ className = "" }: { className?: string }) {
  const on = useSound();
  return (
    <button
      type="button"
      className={`pm-sound ${className}`}
      aria-pressed={on}
      onClick={(e) => {
        e.stopPropagation();
        setSound(!on);
      }}
    >
      <span className="pm-sound__bars" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
      <span className="pm-sound__label">Sound</span>
      <span className="pm-sound__state" aria-hidden="true">
        {on ? "On" : "Off"}
      </span>
    </button>
  );
}
