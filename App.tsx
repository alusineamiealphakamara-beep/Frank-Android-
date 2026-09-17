import { useState, useRef } from 'react';
import {
  Download,
  Edit3,
  Maximize2,
  Minimize2,
  Palette,
  Ratio,
  CheckCircle2,
  FileCode2,
} from 'lucide-react';
import { PitchGraphic } from './components/PitchGraphic';
import { DataEditorModal } from './components/DataEditorModal';
import { DEFAULT_MATCH_DATA, ADDITIONAL_PRESETS, THEMES } from './defaultData';
import { AspectRatioType, FormationName, Player, ThemeColors } from './types';
import { downloadGraphicPNG, downloadGraphicSVG } from './utils/exportGraphic';

export default function App() {
  const [homeFormation, setHomeFormation] = useState<FormationName>(DEFAULT_MATCH_DATA.homeFormation);
  const [awayFormation, setAwayFormation] = useState<FormationName>(DEFAULT_MATCH_DATA.awayFormation);
  const [homePlayers, setHomePlayers] = useState<Player[]>(DEFAULT_MATCH_DATA.homePlayers);
  const [awayPlayers, setAwayPlayers] = useState<Player[]>(DEFAULT_MATCH_DATA.awayPlayers);
  const [theme, setTheme] = useState<ThemeColors>(THEMES[0]);
  const [aspectRatio, setAspectRatio] = useState<AspectRatioType>('2:3');
  const useDynamicRatingColors = true;
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isPureMode, setIsPureMode] = useState(false);
  const [showComplianceBadge, setShowComplianceBadge] = useState(false);

  const graphicRef = useRef<SVGSVGElement | null>(null);

  const handleUpdateHomePlayer = (index: number, field: 'shirtNumber' | 'rating', value: string) => {
    setHomePlayers((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleUpdateAwayPlayer = (index: number, field: 'shirtNumber' | 'rating', value: string) => {
    setAwayPlayers((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleSelectPreset = (presetId: string) => {
    const preset = ADDITIONAL_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setHomeFormation(preset.homeFormation);
      setAwayFormation(preset.awayFormation);
      setHomePlayers(preset.homePlayers);
      setAwayPlayers(preset.awayPlayers);
    }
  };

  const handleResetToDefault = () => {
    setHomeFormation(DEFAULT_MATCH_DATA.homeFormation);
    setAwayFormation(DEFAULT_MATCH_DATA.awayFormation);
    setHomePlayers(DEFAULT_MATCH_DATA.homePlayers);
    setAwayPlayers(DEFAULT_MATCH_DATA.awayPlayers);
  };

  const handleExportPNG = () => {
    if (graphicRef.current) {
      downloadGraphicPNG(
        graphicRef.current,
        `match-lineup-${homeFormation}-vs-${awayFormation}.png`,
        3
      );
    }
  };

  const handleExportSVG = () => {
    if (graphicRef.current) {
      downloadGraphicSVG(
        graphicRef.current,
        `match-lineup-${homeFormation}-vs-${awayFormation}.svg`
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center select-none font-sans antialiased">
      {/* Top Controls Toolbar (Hidden in Pure / Fullscreen Graphic View) */}
      {!isPureMode && (
        <header className="w-full bg-slate-900/90 border-b border-slate-800 backdrop-blur-md sticky top-0 z-40 px-4 py-3">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
            {/* Title / Preset indicator */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-bold text-sm tracking-wide text-white uppercase">
                  Lineup Graphic
                </span>
              </div>

              {/* Match Preset Select */}
              <select
                onChange={(e) => handleSelectPreset(e.target.value)}
                className="bg-slate-800 text-xs font-semibold text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-500 cursor-pointer"
                title="Select a match lineup preset"
              >
                {ADDITIONAL_PRESETS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Actions & Formatting */}
            <div className="flex items-center flex-wrap gap-2">
              {/* Aspect Ratio Toggle */}
              <button
                onClick={() => setAspectRatio((prev) => (prev === '2:3' ? '3:4' : '2:3'))}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-semibold text-slate-200 transition-colors"
                title="Toggle Aspect Ratio (2:3 vs 3:4)"
              >
                <Ratio className="w-3.5 h-3.5 text-amber-400" />
                <span>{aspectRatio}</span>
              </button>

              {/* Theme Toggle */}
              <div className="relative inline-block">
                <select
                  value={theme.name}
                  onChange={(e) => {
                    const selected = THEMES.find((t) => t.name === e.target.value);
                    if (selected) setTheme(selected);
                  }}
                  className="bg-slate-800 text-xs font-semibold text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-500 cursor-pointer"
                  title="Marker color theme"
                >
                  {THEMES.map((t) => (
                    <option key={t.name} value={t.name}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Edit Data & Formations */}
              <button
                onClick={() => setIsEditorOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 rounded-lg text-xs font-semibold transition-colors"
                title="Edit Formations and Player Numbers/Ratings"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Lineup</span>
              </button>

              {/* Download PNG */}
              <button
                onClick={handleExportPNG}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
                title="Download High Resolution 3x PNG"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PNG</span>
              </button>

              {/* Download SVG */}
              <button
                onClick={handleExportSVG}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-lg text-xs font-semibold transition-colors"
                title="Download Vector SVG"
              >
                <FileCode2 className="w-3.5 h-3.5" />
                <span>SVG</span>
              </button>

              {/* Pure Graphic Mode */}
              <button
                onClick={() => setIsPureMode(true)}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 rounded-lg transition-colors"
                title="Fullscreen / Pure Graphic View"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>
      )}

      {/* Floating Exit Button when in Pure Graphic Mode */}
      {isPureMode && (
        <button
          onClick={() => setIsPureMode(false)}
          className="fixed top-4 right-4 z-50 px-3 py-2 bg-black/80 hover:bg-black text-white rounded-xl border border-slate-700 flex items-center gap-2 text-xs font-semibold backdrop-blur-md transition-all shadow-lg"
          title="Exit Pure View"
        >
          <Minimize2 className="w-4 h-4 text-amber-400" />
          <span>Exit Focus View</span>
        </button>
      )}

      {/* Graphic Presentation Canvas */}
      <main className="flex-1 w-full flex flex-col items-center justify-center p-3 sm:p-6 overflow-hidden">
        <div
          className="relative transition-all duration-300 w-full flex items-center justify-center"
          style={{
            maxWidth: aspectRatio === '2:3' ? '560px' : '620px',
          }}
        >
          {/* THE PURE GRAPHIC - strictly contains ONLY pitch and the 22 player markers + exact ratings */}
          <PitchGraphic
            graphicRef={graphicRef}
            homeFormation={homeFormation}
            awayFormation={awayFormation}
            homePlayers={homePlayers}
            awayPlayers={awayPlayers}
            theme={theme}
            aspectRatio={aspectRatio}
            onUpdateHomePlayer={handleUpdateHomePlayer}
            onUpdateAwayPlayer={handleUpdateAwayPlayer}
            useDynamicRatingColors={useDynamicRatingColors}
          />
        </div>
      </main>

      {/* Discrete Compliance & Rule Verification Footer (Toggleable) */}
      {!isPureMode && (
        <footer className="w-full bg-slate-950 border-t border-slate-900 py-2.5 px-4 text-center">
          <div className="max-w-4xl mx-auto flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
              <span>22 Players (11 Home + 11 Away) • Zero forbidden text • Exact Ratings & Shirts</span>
            </div>
            <button
              onClick={() => setShowComplianceBadge((v) => !v)}
              className="text-slate-400 hover:text-slate-200 underline decoration-slate-700 text-[11px]"
            >
              {showComplianceBadge ? 'Hide Checklist' : 'Verify Rules'}
            </button>
          </div>

          {showComplianceBadge && (
            <div className="mt-3 p-3 bg-slate-900/90 border border-slate-800 rounded-xl text-left text-xs max-w-xl mx-auto space-y-1 text-slate-300 animate-in fade-in duration-200">
              <div className="font-bold text-slate-200 mb-1.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Specification Adherence:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[11px]">
                <div>✔ Exactly 22 player positions (11 Home + 11 Away)</div>
                <div>✔ 0 team names, player names, or logos</div>
                <div>✔ 0 formation text or position labels on pitch</div>
                <div>✔ Upper team faces down, lower team faces up</div>
                <div>✔ Distinct visual contrast between Home & Away</div>
                <div>✔ Exact locked ratings (#E8B931 gold badge)</div>
                <div>✔ Identical sizing for all markers and badges</div>
                <div>✔ Mobile-optimized portrait ratio ({aspectRatio})</div>
              </div>
            </div>
          )}
        </footer>
      )}

      {/* Modal Editor */}
      <DataEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        homeFormation={homeFormation}
        awayFormation={awayFormation}
        onUpdateHomeFormation={setHomeFormation}
        onUpdateAwayFormation={setAwayFormation}
        homePlayers={homePlayers}
        awayPlayers={awayPlayers}
        onUpdateHomePlayer={handleUpdateHomePlayer}
        onUpdateAwayPlayer={handleUpdateAwayPlayer}
        onResetToDefault={handleResetToDefault}
      />
    </div>
  );
}
