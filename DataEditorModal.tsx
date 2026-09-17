import React from 'react';
import { X, RotateCcw } from 'lucide-react';
import { AVAILABLE_FORMATIONS } from '../formations';
import { FormationName, Player } from '../types';
import { getSofascoreRatingColor, formatRatingToTwoDecimals } from '../utils/sofascoreRating';

interface DataEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  homeFormation: FormationName;
  awayFormation: FormationName;
  onUpdateHomeFormation: (f: FormationName) => void;
  onUpdateAwayFormation: (f: FormationName) => void;
  homePlayers: Player[];
  awayPlayers: Player[];
  onUpdateHomePlayer: (index: number, field: 'shirtNumber' | 'rating', value: string) => void;
  onUpdateAwayPlayer: (index: number, field: 'shirtNumber' | 'rating', value: string) => void;
  onResetToDefault: () => void;
}

export const DataEditorModal: React.FC<DataEditorModalProps> = ({
  isOpen,
  onClose,
  homeFormation,
  awayFormation,
  onUpdateHomeFormation,
  onUpdateAwayFormation,
  homePlayers,
  awayPlayers,
  onUpdateHomePlayer,
  onUpdateAwayPlayer,
  onResetToDefault,
}) => {
  if (!isOpen) return null;

  const sanitizeRatingInput = (raw: string): string => {
    if (raw === '') return '';
    const cleaned = raw.replace(/[^0-9.]/g, '');
    const parts = cleaned.split('.');
    let sanitized = parts[0];
    if (parts.length > 1) {
      sanitized += '.' + parts.slice(1).join('').slice(0, 2);
    }
    const num = parseFloat(sanitized);
    if (!isNaN(num) && num > 10) {
      sanitized = '10.00';
    }
    return sanitized;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl text-slate-100 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Lineup & Formations Editor</h2>
            <p className="text-xs text-slate-400 mt-0.5">Edit shirt numbers, exact ratings, and team formations</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onResetToDefault}
              className="px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg flex items-center gap-1.5 transition-colors"
              title="Reset to default data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content scrollable */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Formations Selector */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Home Team Formation (Top)
              </label>
              <select
                value={homeFormation}
                onChange={(e) => onUpdateHomeFormation(e.target.value as FormationName)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-medium focus:outline-none focus:border-amber-500"
              >
                {AVAILABLE_FORMATIONS.map((f) => (
                  <option key={`home-${f}`} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Away Team Formation (Bottom)
              </label>
              <select
                value={awayFormation}
                onChange={(e) => onUpdateAwayFormation(e.target.value as FormationName)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-medium focus:outline-none focus:border-amber-500"
              >
                {AVAILABLE_FORMATIONS.map((f) => (
                  <option key={`away-${f}`} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Player Data Tables */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Home Players */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Home Players (11)
                </span>
                <span className="text-[11px] text-slate-400">Shirt | Rating</span>
              </div>
              <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                {homePlayers.slice(0, 11).map((player, idx) => {
                  const ratingColor = getSofascoreRatingColor(player.rating, true);
                  return (
                    <div
                      key={`home-edit-${player.id || idx}`}
                      className="flex items-center gap-2 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800"
                    >
                      <span className="text-xs text-slate-400 w-7 font-mono">#{idx + 1}</span>
                      <input
                        type="text"
                        value={player.shirtNumber}
                        onChange={(e) => onUpdateHomePlayer(idx, 'shirtNumber', e.target.value)}
                        placeholder="Shirt"
                        className="w-14 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-center text-xs font-bold text-white focus:outline-none focus:border-amber-500"
                      />
                      <div className="relative flex items-center">
                        <input
                          type="text"
                          inputMode="decimal"
                          value={player.rating}
                          onChange={(e) =>
                            onUpdateHomePlayer(idx, 'rating', sanitizeRatingInput(e.target.value))
                          }
                          onBlur={(e) =>
                            onUpdateHomePlayer(idx, 'rating', formatRatingToTwoDecimals(e.target.value))
                          }
                          placeholder="7.84"
                          className="w-20 rounded px-2 py-1 text-center text-xs font-black shadow-inner focus:outline-none focus:ring-1 focus:ring-white transition-colors"
                          style={{
                            backgroundColor: ratingColor.bg,
                            color: ratingColor.textColor,
                          }}
                        />
                      </div>
                      <span className="text-[10px] text-slate-400 truncate flex-1 text-right">
                        {player.role || `P${idx + 1}`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Away Players */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Away Players (11)
                </span>
                <span className="text-[11px] text-slate-400">Shirt | Rating</span>
              </div>
              <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                {awayPlayers.slice(0, 11).map((player, idx) => {
                  const ratingColor = getSofascoreRatingColor(player.rating, true);
                  return (
                    <div
                      key={`away-edit-${player.id || idx}`}
                      className="flex items-center gap-2 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800"
                    >
                      <span className="text-xs text-slate-400 w-7 font-mono">#{idx + 1}</span>
                      <input
                        type="text"
                        value={player.shirtNumber}
                        onChange={(e) => onUpdateAwayPlayer(idx, 'shirtNumber', e.target.value)}
                        placeholder="Shirt"
                        className="w-14 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-center text-xs font-bold text-white focus:outline-none focus:border-amber-500"
                      />
                      <div className="relative flex items-center">
                        <input
                          type="text"
                          inputMode="decimal"
                          value={player.rating}
                          onChange={(e) =>
                            onUpdateAwayPlayer(idx, 'rating', sanitizeRatingInput(e.target.value))
                          }
                          onBlur={(e) =>
                            onUpdateAwayPlayer(idx, 'rating', formatRatingToTwoDecimals(e.target.value))
                          }
                          placeholder="7.43"
                          className="w-20 rounded px-2 py-1 text-center text-xs font-black shadow-inner focus:outline-none focus:ring-1 focus:ring-white transition-colors"
                          style={{
                            backgroundColor: ratingColor.bg,
                            color: ratingColor.textColor,
                          }}
                        />
                      </div>
                      <span className="text-[10px] text-slate-400 truncate flex-1 text-right">
                        {player.role || `P${idx + 1}`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors shadow"
          >
            Apply & View Graphic
          </button>
        </div>
      </div>
    </div>
  );
};
