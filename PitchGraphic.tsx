import React, { useState } from 'react';
import { AspectRatioType, FormationName, Player, ThemeColors } from '../types';
import { getFormationCoordinates } from '../formations';
import { getSofascoreRatingColor, formatRatingToTwoDecimals } from '../utils/sofascoreRating';
import { PitchInlineEditor } from './PitchInlineEditor';

interface PitchGraphicProps {
  homeFormation: FormationName;
  awayFormation: FormationName;
  homePlayers: Player[];
  awayPlayers: Player[];
  theme: ThemeColors;
  aspectRatio: AspectRatioType;
  graphicRef?: React.RefObject<SVGSVGElement | null>;
  onUpdateHomePlayer?: (index: number, field: 'shirtNumber' | 'rating', value: string) => void;
  onUpdateAwayPlayer?: (index: number, field: 'shirtNumber' | 'rating', value: string) => void;
  useDynamicRatingColors?: boolean;
}

export const PitchGraphic: React.FC<PitchGraphicProps> = ({
  homeFormation,
  awayFormation,
  homePlayers,
  awayPlayers,
  theme,
  aspectRatio,
  graphicRef,
  onUpdateHomePlayer,
  onUpdateAwayPlayer,
  useDynamicRatingColors = true,
}) => {
  const [activeEdit, setActiveEdit] = useState<{ isHome: boolean; index: number } | null>(null);

  const width = 600;
  const height = aspectRatio === '2:3' ? 900 : 800;

  // Pitch boundary insets
  const marginX = 32;
  const marginY = 32;
  const pitchWidth = width - marginX * 2;
  const pitchHeight = height - marginY * 2;
  const pitchTop = marginY;
  const pitchBottom = height - marginY;
  const pitchLeft = marginX;
  const pitchRight = width - marginX;
  const centerX = width / 2;
  const centerY = height / 2;

  // Box dimensions
  const penaltyBoxWidth = 240;
  const penaltyBoxHeight = 115;
  const goalBoxWidth = 120;
  const goalBoxHeight = 38;
  const penaltySpotDist = 78;
  const centerCircleRadius = 55;
  const cornerRadius = 14;

  // Lawn stripes count
  const stripeCount = 14;
  const stripeHeight = pitchHeight / stripeCount;

  // Get exact coordinates for the 11 Home and 11 Away players
  const homeCoords = getFormationCoordinates(homeFormation, true, width, height);
  const awayCoords = getFormationCoordinates(awayFormation, false, width, height);

  // Exactly 11 Home + 11 Away
  const safeHomePlayers = homePlayers.slice(0, 11);
  const safeAwayPlayers = awayPlayers.slice(0, 11);

  // Marker standard sizing matching Sofascore lineup presentation (extra large player sizing)
  const markerRadius = 28;
  const badgeWidth = 54;
  const badgeHeight = 23;
  const badgeRadius = 6;
  const badgeOffsetY = 16; // overlap at bottom of circle

  // Find top rated player across both teams for Sofascore MVP subtle highlight
  const allRatings = [...safeHomePlayers, ...safeAwayPlayers].map(
    (p) => parseFloat(p.rating) || 0
  );
  const maxRating = Math.max(...allRatings, 0);

  // Active player for inline editor
  const currentEditingPlayer = activeEdit
    ? activeEdit.isHome
      ? safeHomePlayers[activeEdit.index]
      : safeAwayPlayers[activeEdit.index]
    : null;

  const currentEditingCoords = activeEdit
    ? activeEdit.isHome
      ? homeCoords[activeEdit.index]
      : awayCoords[activeEdit.index]
    : null;

  // Navigation handlers for inline editor
  const handleNavigateNext = () => {
    if (!activeEdit) return;
    if (activeEdit.isHome) {
      if (activeEdit.index < 10) {
        setActiveEdit({ isHome: true, index: activeEdit.index + 1 });
      } else {
        setActiveEdit({ isHome: false, index: 0 });
      }
    } else {
      if (activeEdit.index < 10) {
        setActiveEdit({ isHome: false, index: activeEdit.index + 1 });
      } else {
        setActiveEdit({ isHome: true, index: 0 });
      }
    }
  };

  const handleNavigatePrev = () => {
    if (!activeEdit) return;
    if (activeEdit.isHome) {
      if (activeEdit.index > 0) {
        setActiveEdit({ isHome: true, index: activeEdit.index - 1 });
      } else {
        setActiveEdit({ isHome: false, index: 10 });
      }
    } else {
      if (activeEdit.index > 0) {
        setActiveEdit({ isHome: false, index: activeEdit.index - 1 });
      } else {
        setActiveEdit({ isHome: true, index: 10 });
      }
    }
  };

  return (
    <div className="relative w-full flex items-center justify-center">
      {/* SVG GRAPHIC: Pure vector pitch graphic adhering to Sofascore lineup styling */}
      <svg
        id="football-lineup-graphic"
        ref={graphicRef}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto block select-none"
        style={{
          maxHeight: '85vh',
          boxShadow: '0 20px 45px -15px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0,0,0,0.2)',
          borderRadius: '16px',
          overflow: 'hidden',
        }}
      >
        <defs>
          {/* Sofascore drop shadows for badges and markers */}
          <filter id="badge-shadow" x="-20%" y="-20%" width="140%" height="150%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.4" />
          </filter>
          <filter id="marker-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.45" />
          </filter>
          {/* Active selection glow */}
          <filter id="active-marker-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#F59E0B" floodOpacity="0.85" />
          </filter>
          {/* Turf subtle radial lighting */}
          <radialGradient id="turf-light" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.07" />
            <stop offset="70%" stopColor="#000000" stopOpacity="0.0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.18" />
          </radialGradient>
        </defs>

        {/* 1. BACKGROUND & LAWN STRIPES */}
        <rect width={width} height={height} fill={theme.pitchDark} />

        {/* Alternating lawn mowing strips */}
        {Array.from({ length: stripeCount }).map((_, i) => (
          <rect
            key={`stripe-${i}`}
            x={pitchLeft}
            y={pitchTop + i * stripeHeight}
            width={pitchWidth}
            height={stripeHeight}
            fill={i % 2 === 0 ? theme.pitchLight : theme.pitchDark}
          />
        ))}

        {/* Subtle lighting vignette overlay */}
        <rect width={width} height={height} fill="url(#turf-light)" />

        {/* 2. PITCH MARKINGS */}
        <g stroke={theme.lineColor} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Outer pitch boundary */}
          <rect x={pitchLeft} y={pitchTop} width={pitchWidth} height={pitchHeight} />

          {/* Halfway line */}
          <line x1={pitchLeft} y1={centerY} x2={pitchRight} y2={centerY} strokeWidth="1.8" />

          {/* Center circle */}
          <circle cx={centerX} cy={centerY} r={centerCircleRadius} />
          {/* Center spot */}
          <circle cx={centerX} cy={centerY} r="2.5" fill={theme.lineColor} stroke="none" />

          {/* TOP / HOME GOAL AREA & PENALTY BOX */}
          <rect
            x={centerX - penaltyBoxWidth / 2}
            y={pitchTop}
            width={penaltyBoxWidth}
            height={penaltyBoxHeight}
          />
          <rect
            x={centerX - goalBoxWidth / 2}
            y={pitchTop}
            width={goalBoxWidth}
            height={goalBoxHeight}
          />
          <circle cx={centerX} cy={pitchTop + penaltySpotDist} r="2.5" fill={theme.lineColor} stroke="none" />
          <path
            d={`M ${centerX - 42} ${pitchTop + penaltyBoxHeight} A 48 48 0 0 0 ${centerX + 42} ${pitchTop + penaltyBoxHeight}`}
          />
          <rect
            x={centerX - 48}
            y={pitchTop - 10}
            width={96}
            height={10}
            stroke={theme.lineColor}
            strokeWidth="1.2"
            opacity="0.5"
          />

          {/* BOTTOM / AWAY GOAL AREA & PENALTY BOX */}
          <rect
            x={centerX - penaltyBoxWidth / 2}
            y={pitchBottom - penaltyBoxHeight}
            width={penaltyBoxWidth}
            height={penaltyBoxHeight}
          />
          <rect
            x={centerX - goalBoxWidth / 2}
            y={pitchBottom - goalBoxHeight}
            width={goalBoxWidth}
            height={goalBoxHeight}
          />
          <circle cx={centerX} cy={pitchBottom - penaltySpotDist} r="2.5" fill={theme.lineColor} stroke="none" />
          <path
            d={`M ${centerX - 42} ${pitchBottom - penaltyBoxHeight} A 48 48 0 0 1 ${centerX + 42} ${pitchBottom - penaltyBoxHeight}`}
          />
          <rect
            x={centerX - 48}
            y={pitchBottom}
            width={96}
            height={10}
            stroke={theme.lineColor}
            strokeWidth="1.2"
            opacity="0.5"
          />

          {/* Corner Arcs */}
          <path d={`M ${pitchLeft} ${pitchTop + cornerRadius} A ${cornerRadius} ${cornerRadius} 0 0 0 ${pitchLeft + cornerRadius} ${pitchTop}`} />
          <path d={`M ${pitchRight - cornerRadius} ${pitchTop} A ${cornerRadius} ${cornerRadius} 0 0 0 ${pitchRight} ${pitchTop + cornerRadius}`} />
          <path d={`M ${pitchLeft} ${pitchBottom - cornerRadius} A ${cornerRadius} ${cornerRadius} 0 0 1 ${pitchLeft + cornerRadius} ${pitchBottom}`} />
          <path d={`M ${pitchRight - cornerRadius} ${pitchBottom} A ${cornerRadius} ${cornerRadius} 0 0 1 ${pitchRight} ${pitchBottom - cornerRadius}`} />
        </g>

        {/* 3. PLAYER MARKERS & SOFASCORE RATINGS */}
        {/* HOME TEAM (Upper Half, 11 Players) */}
        <g id="home-players-group">
          {safeHomePlayers.map((player, index) => {
            const coords = homeCoords[index] || { x: centerX, y: pitchTop + 60 };
            const { x, y } = coords;
            const isSelected = activeEdit?.isHome === true && activeEdit?.index === index;
            const ratingStyle = getSofascoreRatingColor(player.rating, useDynamicRatingColors);
            const playerRatingVal = parseFloat(player.rating) || 0;
            const isTopRated = playerRatingVal === maxRating && maxRating >= 7.5;

            return (
              <g
                key={`home-player-${player.id || index}`}
                id={`home-marker-${index + 1}`}
                className="cursor-pointer transition-transform duration-150 hover:scale-105"
                onClick={() => setActiveEdit({ isHome: true, index })}
                style={{ transformOrigin: `${x}px ${y}px` }}
              >
                {/* Invisible hover / touch target expansion */}
                <circle cx={x} cy={y + 8} r={markerRadius + 10} fill="transparent" />

                {/* Circular Player Marker */}
                <circle
                  cx={x}
                  cy={y}
                  r={markerRadius}
                  fill={theme.homeMarkerBg}
                  stroke={isSelected ? '#F59E0B' : theme.homeMarkerBorder}
                  strokeWidth={isSelected ? '4.5' : '3.2'}
                  filter={isSelected ? 'url(#active-marker-glow)' : 'url(#marker-shadow)'}
                />
                {/* Shirt Number */}
                <text
                  x={x}
                  y={y - 3}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={theme.homeNumberColor}
                  fontSize="21"
                  fontWeight="900"
                  fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                >
                  {player.shirtNumber}
                </text>

                {/* Rating Badge: Sofascore dynamic color badge */}
                <rect
                  x={x - badgeWidth / 2}
                  y={y + badgeOffsetY}
                  width={badgeWidth}
                  height={badgeHeight}
                  rx={badgeRadius}
                  fill={ratingStyle.bg}
                  stroke={
                    isSelected
                      ? '#FFFFFF'
                      : isTopRated && useDynamicRatingColors
                      ? '#FBBF24'
                      : 'none'
                  }
                  strokeWidth={
                    isSelected ? '2' : isTopRated && useDynamicRatingColors ? '1.5' : '0'
                  }
                  filter="url(#badge-shadow)"
                />
                <text
                  x={x}
                  y={y + badgeOffsetY + badgeHeight / 2 + 0.5}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={ratingStyle.textColor}
                  fontSize="14"
                  fontWeight="800"
                  letterSpacing="-0.2px"
                  fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                >
                  {formatRatingToTwoDecimals(player.rating)}
                </text>
              </g>
            );
          })}
        </g>

        {/* AWAY TEAM (Lower Half, 11 Players) */}
        <g id="away-players-group">
          {safeAwayPlayers.map((player, index) => {
            const coords = awayCoords[index] || { x: centerX, y: pitchBottom - 60 };
            const { x, y } = coords;
            const isSelected = activeEdit?.isHome === false && activeEdit?.index === index;
            const ratingStyle = getSofascoreRatingColor(player.rating, useDynamicRatingColors);
            const playerRatingVal = parseFloat(player.rating) || 0;
            const isTopRated = playerRatingVal === maxRating && maxRating >= 7.5;

            return (
              <g
                key={`away-player-${player.id || index}`}
                id={`away-marker-${index + 1}`}
                className="cursor-pointer transition-transform duration-150 hover:scale-105"
                onClick={() => setActiveEdit({ isHome: false, index })}
                style={{ transformOrigin: `${x}px ${y}px` }}
              >
                {/* Invisible hover / touch target expansion */}
                <circle cx={x} cy={y + 8} r={markerRadius + 10} fill="transparent" />

                {/* Circular Player Marker */}
                <circle
                  cx={x}
                  cy={y}
                  r={markerRadius}
                  fill={theme.awayMarkerBg}
                  stroke={isSelected ? '#F59E0B' : theme.awayMarkerBorder}
                  strokeWidth={isSelected ? '4.5' : '3.2'}
                  filter={isSelected ? 'url(#active-marker-glow)' : 'url(#marker-shadow)'}
                />
                {/* Shirt Number */}
                <text
                  x={x}
                  y={y - 3}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={theme.awayNumberColor}
                  fontSize="21"
                  fontWeight="900"
                  fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                >
                  {player.shirtNumber}
                </text>

                {/* Rating Badge: Sofascore dynamic color badge */}
                <rect
                  x={x - badgeWidth / 2}
                  y={y + badgeOffsetY}
                  width={badgeWidth}
                  height={badgeHeight}
                  rx={badgeRadius}
                  fill={ratingStyle.bg}
                  stroke={
                    isSelected
                      ? '#FFFFFF'
                      : isTopRated && useDynamicRatingColors
                      ? '#FBBF24'
                      : 'none'
                  }
                  strokeWidth={
                    isSelected ? '2' : isTopRated && useDynamicRatingColors ? '1.5' : '0'
                  }
                  filter="url(#badge-shadow)"
                />
                <text
                  x={x}
                  y={y + badgeOffsetY + badgeHeight / 2 + 0.5}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={ratingStyle.textColor}
                  fontSize="14"
                  fontWeight="800"
                  letterSpacing="-0.2px"
                  fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                >
                  {formatRatingToTwoDecimals(player.rating)}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      {/* 4. DIRECT ON-PITCH INLINE RATING EDITOR OVERLAY */}
      {activeEdit && currentEditingPlayer && currentEditingCoords && (
        <PitchInlineEditor
          player={currentEditingPlayer}
          isHome={activeEdit.isHome}
          playerIndex={activeEdit.index}
          x={currentEditingCoords.x}
          y={currentEditingCoords.y}
          pitchWidth={width}
          pitchHeight={height}
          onSaveRating={(newRating) => {
            if (activeEdit.isHome) {
              onUpdateHomePlayer?.(activeEdit.index, 'rating', newRating);
            } else {
              onUpdateAwayPlayer?.(activeEdit.index, 'rating', newRating);
            }
          }}
          onSaveShirtNumber={(newShirt) => {
            if (activeEdit.isHome) {
              onUpdateHomePlayer?.(activeEdit.index, 'shirtNumber', newShirt);
            } else {
              onUpdateAwayPlayer?.(activeEdit.index, 'shirtNumber', newShirt);
            }
          }}
          onClose={() => setActiveEdit(null)}
          onNavigatePrev={handleNavigatePrev}
          onNavigateNext={handleNavigateNext}
          useDynamicColors={useDynamicRatingColors}
        />
      )}
    </div>
  );
};
