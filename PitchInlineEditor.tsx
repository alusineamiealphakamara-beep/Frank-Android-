import React, { useState, useEffect, useRef } from 'react';
import { Check, X, ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react';
import { Player } from '../types';
import { getSofascoreRatingColor, formatRatingToTwoDecimals } from '../utils/sofascoreRating';

interface PitchInlineEditorProps {
  player: Player;
  isHome: boolean;
  playerIndex: number;
  x: number;
  y: number;
  pitchWidth: number;
  pitchHeight: number;
  onSaveRating: (value: string) => void;
  onSaveShirtNumber: (value: string) => void;
  onClose: () => void;
  onNavigatePrev?: () => void;
  onNavigateNext?: () => void;
  useDynamicColors?: boolean;
}

export const PitchInlineEditor: React.FC<PitchInlineEditorProps> = ({
  player,
  isHome,
  playerIndex,
  x,
  y,
  pitchWidth,
  pitchHeight,
  onSaveRating,
  onSaveShirtNumber,
  onClose,
  onNavigatePrev,
  onNavigateNext,
  useDynamicColors = true,
}) => {
  const [ratingInput, setRatingInput] = useState(player.rating);
  const [shirtInput, setShirtInput] = useState(String(player.shirtNumber));
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track the active player identity so we ONLY focus & select when opening or switching players,
  // NOT on every keystroke when player.rating changes in the parent!
  const activePlayerKey = `${isHome ? 'home' : 'away'}-${playerIndex}-${player.id}`;
  const lastKeyRef = useRef('');

  const ratingColor = getSofascoreRatingColor(ratingInput, useDynamicColors);

  // Synchronize ONLY when switching to a different player
  useEffect(() => {
    if (lastKeyRef.current !== activePlayerKey) {
      lastKeyRef.current = activePlayerKey;
      setRatingInput(player.rating);
      setShirtInput(String(player.shirtNumber));
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.select();
        }
      }, 0);
    }
  }, [activePlayerKey, player.rating, player.shirtNumber]);

  // Click outside to close and save
  useEffect(() => {
    const handlePointerDownOutside = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        commitChanges();
        onClose();
      }
    };

    document.addEventListener('mousedown', handlePointerDownOutside);
    document.addEventListener('touchstart', handlePointerDownOutside);
    return () => {
      document.removeEventListener('mousedown', handlePointerDownOutside);
      document.removeEventListener('touchstart', handlePointerDownOutside);
    };
  }, [ratingInput, shirtInput]);

  const commitChanges = () => {
    const trimmed = ratingInput.trim();
    if (trimmed.length > 0) {
      const formatted = formatRatingToTwoDecimals(trimmed);
      setRatingInput(formatted);
      onSaveRating(formatted);
    }
    const trimmedShirt = shirtInput.trim();
    if (trimmedShirt.length > 0) {
      onSaveShirtNumber(trimmedShirt);
    }
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    // Allow empty string so user can clear and retype
    if (raw === '') {
      setRatingInput('');
      return;
    }

    // Allow only numbers and at most one decimal point
    const cleaned = raw.replace(/[^0-9.]/g, '');
    const parts = cleaned.split('.');
    let sanitized = parts[0];
    if (parts.length > 1) {
      // Allow up to 2 decimal places while writing (e.g. 7., 7.8, 7.85)
      sanitized += '.' + parts.slice(1).join('').slice(0, 2);
    }

    // Limit maximum numeric value to 10.00
    const num = parseFloat(sanitized);
    if (!isNaN(num) && num > 10) {
      sanitized = '10.00';
    }

    setRatingInput(sanitized);

    // Live update parent if it's a valid complete rating number not ending in dot
    if (sanitized && !sanitized.endsWith('.')) {
      const val = parseFloat(sanitized);
      if (!isNaN(val) && val >= 1.0 && val <= 10.0) {
        onSaveRating(sanitized);
      }
    }
  };

  const handleRatingBlur = () => {
    const formatted = formatRatingToTwoDecimals(ratingInput);
    setRatingInput(formatted);
    onSaveRating(formatted);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      commitChanges();
      if (onNavigateNext) {
        onNavigateNext();
      } else {
        onClose();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'ArrowRight' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      commitChanges();
      onNavigateNext?.();
    } else if (e.key === 'ArrowLeft' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      commitChanges();
      onNavigatePrev?.();
    }
  };

  const adjustRating = (delta: number) => {
    const currentNum = parseFloat(ratingInput) || 7.0;
    const nextVal = Math.max(1.0, Math.min(10.0, Math.round((currentNum + delta) * 100) / 100));
    const formatted = nextVal.toFixed(2);
    setRatingInput(formatted);
    onSaveRating(formatted);
  };

  // Convert SVG coordinates to percentage
  const leftPercent = (x / pitchWidth) * 100;
  const topPercent = ((y + 16) / pitchHeight) * 100;

  // Decide if the popover card should be above or below the marker based on position
  const isNearBottom = topPercent > 70;

  return (
    <div
      ref={containerRef}
      className="absolute z-30 transition-all pointer-events-auto"
      style={{
        left: `${leftPercent}%`,
        top: `${topPercent}%`,
        transform: isNearBottom ? 'translate(-50%, -125%)' : 'translate(-50%, 28%)',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-slate-900/95 border-2 border-amber-400/90 rounded-xl p-2.5 shadow-2xl backdrop-blur-md text-white min-w-[210px] flex flex-col gap-2 animate-in zoom-in-95 duration-150">
        {/* Top bar with quick navigation & close */}
        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-300 pb-1 border-b border-slate-800">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-amber-300 font-bold">
              {isHome ? 'Home' : 'Away'} #{player.shirtNumber}
            </span>
            <span className="text-slate-500">({player.role || `P${playerIndex + 1}`})</span>
          </div>

          <div className="flex items-center gap-1">
            {onNavigatePrev && (
              <button
                type="button"
                onClick={() => {
                  commitChanges();
                  onNavigatePrev();
                }}
                className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors"
                title="Previous Player"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
            )}
            {onNavigateNext && (
              <button
                type="button"
                onClick={() => {
                  commitChanges();
                  onNavigateNext();
                }}
                className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors"
                title="Next Player"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                commitChanges();
                onClose();
              }}
              className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-rose-400 transition-colors ml-1"
              title="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Rating Direct Input Row */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              Rating (2 Decimals: 1.00 – 10.00)
            </label>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => adjustRating(-0.1)}
              className="w-7 h-7 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg flex items-center justify-center transition-colors active:scale-95 cursor-pointer font-bold text-xs"
              title="Decrease rating by 0.10"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>

            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                inputMode="decimal"
                value={ratingInput}
                onChange={handleRatingChange}
                onBlur={handleRatingBlur}
                onKeyDown={handleKeyDown}
                placeholder="7.85"
                className="w-full font-black text-base text-center py-1 px-2 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-white transition-colors font-mono tracking-tight"
                style={{
                  backgroundColor: ratingColor.bg,
                  color: ratingColor.textColor,
                }}
              />
            </div>

            <button
              type="button"
              onClick={() => adjustRating(0.1)}
              className="w-7 h-7 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg flex items-center justify-center transition-colors active:scale-95 cursor-pointer font-bold text-xs"
              title="Increase rating by 0.10"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Decimal Steps */}
          <div className="flex items-center justify-between gap-1 mt-1.5 pt-1 border-t border-slate-800/60">
            <button
              type="button"
              onClick={() => adjustRating(-0.1)}
              className="flex-1 py-0.5 text-[9.5px] font-bold bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded transition-colors"
              title="Minus 0.10"
            >
              -0.10
            </button>
            <button
              type="button"
              onClick={() => adjustRating(-0.01)}
              className="flex-1 py-0.5 text-[9.5px] font-bold bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded transition-colors"
              title="Minus 0.01"
            >
              -0.01
            </button>
            <button
              type="button"
              onClick={() => adjustRating(0.01)}
              className="flex-1 py-0.5 text-[9.5px] font-bold bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded transition-colors"
              title="Plus 0.01"
            >
              +0.01
            </button>
            <button
              type="button"
              onClick={() => adjustRating(0.1)}
              className="flex-1 py-0.5 text-[9.5px] font-bold bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded transition-colors"
              title="Plus 0.10"
            >
              +0.10
            </button>
          </div>
        </div>

        {/* Shirt Number Quick Edit */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
          <label className="text-[10px] text-slate-400 font-medium">Shirt No.</label>
          <input
            type="text"
            value={shirtInput}
            onChange={(e) => {
              setShirtInput(e.target.value);
              onSaveShirtNumber(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            className="w-12 bg-slate-950 text-white font-bold text-xs text-center py-0.5 px-1 rounded border border-slate-700 focus:outline-none focus:border-amber-400"
          />
          <button
            type="button"
            onClick={() => {
              commitChanges();
              onClose();
            }}
            className="flex items-center gap-1 px-2.5 py-0.5 bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold rounded transition-colors shadow-xs"
          >
            <Check className="w-3 h-3" />
            <span>Done</span>
          </button>
        </div>
      </div>
    </div>
  );
};
