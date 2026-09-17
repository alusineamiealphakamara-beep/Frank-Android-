import { FormationLayout, FormationName } from './types';

/**
 * Formation structures.
 * yPercent goes from 0 (at the team's goal line) to 1 (near the halfway line).
 * Rows:
 * row 0 is always GK (count: 1)
 * subsequent rows are outfielders (defenders, midfielders, forwards)
 */
export const FORMATION_CONFIGS: Record<FormationName, FormationLayout> = {
  '4-4-2': {
    name: '4-4-2',
    rows: [
      { count: 1, yPercent: 0.12 }, // GK
      { count: 4, yPercent: 0.32 }, // DEF
      { count: 4, yPercent: 0.58 }, // MID
      { count: 2, yPercent: 0.84 }, // FWD
    ],
  },
  '4-4-1-1': {
    name: '4-4-1-1',
    rows: [
      { count: 1, yPercent: 0.12 }, // GK
      { count: 4, yPercent: 0.30 }, // DEF
      { count: 4, yPercent: 0.52 }, // MID
      { count: 1, yPercent: 0.70 }, // SS
      { count: 1, yPercent: 0.86 }, // ST
    ],
  },
  '4-3-3': {
    name: '4-3-3',
    rows: [
      { count: 1, yPercent: 0.12 }, // GK
      { count: 4, yPercent: 0.32 }, // DEF
      { count: 3, yPercent: 0.58 }, // MID
      { count: 3, yPercent: 0.84 }, // FWD
    ],
  },
  '4-3-2-1': {
    name: '4-3-2-1',
    rows: [
      { count: 1, yPercent: 0.12 }, // GK
      { count: 4, yPercent: 0.30 }, // DEF
      { count: 3, yPercent: 0.50 }, // MID
      { count: 2, yPercent: 0.70 }, // AM
      { count: 1, yPercent: 0.86 }, // ST
    ],
  },
  '4-3-1-2': {
    name: '4-3-1-2',
    rows: [
      { count: 1, yPercent: 0.12 }, // GK
      { count: 4, yPercent: 0.30 }, // DEF
      { count: 3, yPercent: 0.50 }, // MID
      { count: 1, yPercent: 0.68 }, // CAM
      { count: 2, yPercent: 0.86 }, // ST
    ],
  },
  '4-2-3-1': {
    name: '4-2-3-1',
    rows: [
      { count: 1, yPercent: 0.12 }, // GK
      { count: 4, yPercent: 0.30 }, // DEF
      { count: 2, yPercent: 0.48 }, // DM
      { count: 3, yPercent: 0.68 }, // AM
      { count: 1, yPercent: 0.86 }, // ST
    ],
  },
  '4-2-2-2': {
    name: '4-2-2-2',
    rows: [
      { count: 1, yPercent: 0.12 }, // GK
      { count: 4, yPercent: 0.30 }, // DEF
      { count: 2, yPercent: 0.48 }, // DM
      { count: 2, yPercent: 0.68 }, // AM
      { count: 2, yPercent: 0.86 }, // ST
    ],
  },
  '4-1-4-1': {
    name: '4-1-4-1',
    rows: [
      { count: 1, yPercent: 0.12 }, // GK
      { count: 4, yPercent: 0.30 }, // DEF
      { count: 1, yPercent: 0.46 }, // DM
      { count: 4, yPercent: 0.66 }, // MID
      { count: 1, yPercent: 0.86 }, // ST
    ],
  },
  '4-5-1': {
    name: '4-5-1',
    rows: [
      { count: 1, yPercent: 0.12 }, // GK
      { count: 4, yPercent: 0.32 }, // DEF
      { count: 5, yPercent: 0.58 }, // MID
      { count: 1, yPercent: 0.84 }, // ST
    ],
  },
  '4-1-2-3': {
    name: '4-1-2-3',
    rows: [
      { count: 1, yPercent: 0.12 }, // GK
      { count: 4, yPercent: 0.30 }, // DEF
      { count: 1, yPercent: 0.46 }, // DM
      { count: 2, yPercent: 0.62 }, // CM
      { count: 3, yPercent: 0.84 }, // FWD
    ],
  },
  '3-4-3': {
    name: '3-4-3',
    rows: [
      { count: 1, yPercent: 0.12 }, // GK
      { count: 3, yPercent: 0.32 }, // CB
      { count: 4, yPercent: 0.58 }, // MID
      { count: 3, yPercent: 0.84 }, // FWD
    ],
  },
  '3-4-2-1': {
    name: '3-4-2-1',
    rows: [
      { count: 1, yPercent: 0.12 }, // GK
      { count: 3, yPercent: 0.30 }, // CB
      { count: 4, yPercent: 0.50 }, // MID
      { count: 2, yPercent: 0.70 }, // AM
      { count: 1, yPercent: 0.86 }, // ST
    ],
  },
  '3-5-2': {
    name: '3-5-2',
    rows: [
      { count: 1, yPercent: 0.12 }, // GK
      { count: 3, yPercent: 0.32 }, // CB
      { count: 5, yPercent: 0.58 }, // MID
      { count: 2, yPercent: 0.84 }, // FWD
    ],
  },
  '3-4-1-2': {
    name: '3-4-1-2',
    rows: [
      { count: 1, yPercent: 0.12 }, // GK
      { count: 3, yPercent: 0.30 }, // CB
      { count: 4, yPercent: 0.50 }, // MID
      { count: 1, yPercent: 0.68 }, // CAM
      { count: 2, yPercent: 0.86 }, // ST
    ],
  },
  '3-1-4-2': {
    name: '3-1-4-2',
    rows: [
      { count: 1, yPercent: 0.12 }, // GK
      { count: 3, yPercent: 0.30 }, // CB
      { count: 1, yPercent: 0.46 }, // DM
      { count: 4, yPercent: 0.66 }, // MID
      { count: 2, yPercent: 0.86 }, // ST
    ],
  },
  '3-2-4-1': {
    name: '3-2-4-1',
    rows: [
      { count: 1, yPercent: 0.12 }, // GK
      { count: 3, yPercent: 0.30 }, // CB
      { count: 2, yPercent: 0.48 }, // DM
      { count: 4, yPercent: 0.68 }, // AM
      { count: 1, yPercent: 0.86 }, // ST
    ],
  },
  '5-3-2': {
    name: '5-3-2',
    rows: [
      { count: 1, yPercent: 0.12 }, // GK
      { count: 5, yPercent: 0.32 }, // DEF
      { count: 3, yPercent: 0.58 }, // MID
      { count: 2, yPercent: 0.84 }, // FWD
    ],
  },
  '5-4-1': {
    name: '5-4-1',
    rows: [
      { count: 1, yPercent: 0.12 }, // GK
      { count: 5, yPercent: 0.32 }, // DEF
      { count: 4, yPercent: 0.58 }, // MID
      { count: 1, yPercent: 0.84 }, // ST
    ],
  },
  '5-2-3': {
    name: '5-2-3',
    rows: [
      { count: 1, yPercent: 0.12 }, // GK
      { count: 5, yPercent: 0.32 }, // DEF
      { count: 2, yPercent: 0.56 }, // MID
      { count: 3, yPercent: 0.84 }, // FWD
    ],
  },
  '5-3-1-1': {
    name: '5-3-1-1',
    rows: [
      { count: 1, yPercent: 0.12 }, // GK
      { count: 5, yPercent: 0.30 }, // DEF
      { count: 3, yPercent: 0.52 }, // MID
      { count: 1, yPercent: 0.70 }, // SS
      { count: 1, yPercent: 0.86 }, // ST
    ],
  },
  '5-2-2-1': {
    name: '5-2-2-1',
    rows: [
      { count: 1, yPercent: 0.12 }, // GK
      { count: 5, yPercent: 0.30 }, // DEF
      { count: 2, yPercent: 0.48 }, // DM
      { count: 2, yPercent: 0.68 }, // AM
      { count: 1, yPercent: 0.86 }, // ST
    ],
  },
  '4-6-0': {
    name: '4-6-0',
    rows: [
      { count: 1, yPercent: 0.12 }, // GK
      { count: 4, yPercent: 0.30 }, // DEF
      { count: 2, yPercent: 0.50 }, // DM
      { count: 4, yPercent: 0.72 }, // AM
    ],
  },
  '3-3-3-1': {
    name: '3-3-3-1',
    rows: [
      { count: 1, yPercent: 0.12 }, // GK
      { count: 3, yPercent: 0.30 }, // CB
      { count: 3, yPercent: 0.48 }, // DM
      { count: 3, yPercent: 0.68 }, // AM
      { count: 1, yPercent: 0.86 }, // ST
    ],
  },
  '4-1-2-1-2': {
    name: '4-1-2-1-2',
    rows: [
      { count: 1, yPercent: 0.12 }, // GK
      { count: 4, yPercent: 0.30 }, // DEF
      { count: 1, yPercent: 0.46 }, // DM
      { count: 2, yPercent: 0.60 }, // CM
      { count: 1, yPercent: 0.74 }, // AM
      { count: 2, yPercent: 0.86 }, // ST
    ],
  },
};

export const AVAILABLE_FORMATIONS: FormationName[] = [
  '4-4-2',
  '4-4-1-1',
  '4-3-3',
  '4-3-2-1',
  '4-3-1-2',
  '4-2-3-1',
  '4-2-2-2',
  '4-1-4-1',
  '4-5-1',
  '4-1-2-3',
  '3-4-3',
  '3-4-2-1',
  '3-5-2',
  '3-4-1-2',
  '3-1-4-2',
  '3-2-4-1',
  '5-3-2',
  '5-4-1',
  '5-2-3',
  '5-3-1-1',
  '5-2-2-1',
  '4-6-0',
  '3-3-3-1',
];

export interface PlayerCoordinates {
  x: number;
  y: number;
}

/**
 * Calculates (x, y) coordinates for all 11 players of a team.
 * @param formationName Selected formation
 * @param isHome True for home team (top half), false for away team (bottom half)
 * @param pitchWidth Pitch canvas width (e.g. 600)
 * @param pitchHeight Pitch canvas height (e.g. 900 for 2:3, 800 for 3:4)
 */
export function getFormationCoordinates(
  formationName: FormationName,
  isHome: boolean,
  pitchWidth: number,
  pitchHeight: number
): PlayerCoordinates[] {
  const config = FORMATION_CONFIGS[formationName] || FORMATION_CONFIGS['4-3-3'];
  const coordinates: PlayerCoordinates[] = [];

  const pitchInsetX = 40;
  const usableWidth = pitchWidth - pitchInsetX * 2;
  const pitchTop = 35;
  const pitchBottom = pitchHeight - 35;
  const pitchHalfHeight = (pitchBottom - pitchTop) / 2;

  // Buffer from halfway line to ensure no overlap between home & away
  // Top half: goal line is pitchTop, max reach is pitchTop + pitchHalfHeight * 0.88
  // Bottom half: goal line is pitchBottom, max reach is pitchBottom - pitchHalfHeight * 0.88
  const halfSpan = pitchHalfHeight * 0.90;

  for (const row of config.rows) {
    const { count, yPercent } = row;

    // Calculate Y
    let y = 0;
    if (isHome) {
      // Home faces downwards: GK at top, forwards near halfway line
      y = pitchTop + yPercent * halfSpan;
    } else {
      // Away faces upwards: GK at bottom, forwards near halfway line
      y = pitchBottom - yPercent * halfSpan;
    }

    // Calculate X positions for this row
    if (count === 1) {
      // Centered (e.g. GK, single ST, single DM)
      coordinates.push({ x: pitchWidth / 2, y });
    } else {
      // Distribute evenly across width with appropriate margin
      // When row has 2 players, keep them somewhat centered (e.g. 2 strikers or 2 DMs)
      // When row has 3, 4, 5, spread wider
      const marginFactor =
        count === 2 ? 0.30 : count === 3 ? 0.20 : count === 4 ? 0.11 : count >= 5 ? 0.06 : 0.10;
      const rowLeft = pitchInsetX + usableWidth * marginFactor;
      const rowRight = pitchWidth - pitchInsetX - usableWidth * marginFactor;
      const rowWidth = rowRight - rowLeft;

      for (let i = 0; i < count; i++) {
        const x = rowLeft + (rowWidth * i) / (count - 1);
        coordinates.push({ x, y });
      }
    }
  }

  return coordinates;
}
