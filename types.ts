export interface Player {
  id: string;
  shirtNumber: string | number;
  rating: string; // Stored as string to preserve exact decimal representation like "6.5", "7.43", "7.84"
  role?: string; // Internal identifier for slot (e.g., 'GK', 'DEF1') - NOT rendered on graphic
}

export type FormationName =
  | '4-4-2'
  | '4-4-1-1'
  | '4-3-3'
  | '4-3-2-1'
  | '4-3-1-2'
  | '4-2-3-1'
  | '4-2-2-2'
  | '4-1-4-1'
  | '4-5-1'
  | '4-1-2-3'
  | '3-4-3'
  | '3-4-2-1'
  | '3-5-2'
  | '3-4-1-2'
  | '3-1-4-2'
  | '3-2-4-1'
  | '5-3-2'
  | '5-4-1'
  | '5-2-3'
  | '5-3-1-1'
  | '5-2-2-1'
  | '4-6-0'
  | '3-3-3-1'
  | '4-1-2-1-2';

export interface FormationRow {
  count: number;
  yPercent: number; // 0 to 1 relative to the team's half
  xOffsets?: number[]; // custom x distribution if needed
}

export interface FormationLayout {
  name: FormationName;
  rows: FormationRow[]; // GK is row 0 (count: 1), followed by outfield lines
}

export type AspectRatioType = '2:3' | '3:4';

export interface ThemeColors {
  name: string;
  homeMarkerBg: string;
  homeMarkerBorder: string;
  homeNumberColor: string;
  awayMarkerBg: string;
  awayMarkerBorder: string;
  awayNumberColor: string;
  badgeBg: string;
  badgeTextColor: string;
  pitchDark: string;
  pitchLight: string;
  lineColor: string;
}
