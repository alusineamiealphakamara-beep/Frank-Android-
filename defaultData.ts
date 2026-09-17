import { FormationName, Player, ThemeColors } from './types';

export interface MatchPreset {
  id: string;
  name: string;
  homeFormation: FormationName;
  awayFormation: FormationName;
  homePlayers: Player[];
  awayPlayers: Player[];
}

/**
 * Standard default data fulfilling the prompt's specifications:
 * - Exactly 11 Home players
 * - Exactly 11 Away players
 * - Exact string ratings (e.g. "7.84", "7.43", "6.5") without rounding
 * - Exact shirt numbers
 * - Zero player names or team names
 */
export const DEFAULT_MATCH_DATA: MatchPreset = {
  id: 'preset-classic',
  name: 'Standard Match Preset',
  homeFormation: '4-3-3',
  awayFormation: '4-2-3-1',
  homePlayers: [
    { id: 'h-1', shirtNumber: '1', rating: '7.12', role: 'GK' },
    { id: 'h-2', shirtNumber: '2', rating: '6.95', role: 'DEF 1' },
    { id: 'h-3', shirtNumber: '5', rating: '7.43', role: 'DEF 2' },
    { id: 'h-4', shirtNumber: '4', rating: '7.20', role: 'DEF 3' },
    { id: 'h-5', shirtNumber: '3', rating: '6.50', role: 'DEF 4' },
    { id: 'h-6', shirtNumber: '8', rating: '7.68', role: 'MID 1' },
    { id: 'h-7', shirtNumber: '16', rating: '7.35', role: 'MID 2' },
    { id: 'h-8', shirtNumber: '17', rating: '8.15', role: 'MID 3' },
    { id: 'h-9', shirtNumber: '7', rating: '7.84', role: 'FWD 1' },
    { id: 'h-10', shirtNumber: '9', rating: '9.20', role: 'FWD 2' },
    { id: 'h-11', shirtNumber: '11', rating: '7.50', role: 'FWD 3' },
  ],
  awayPlayers: [
    { id: 'a-1', shirtNumber: '1', rating: '6.80', role: 'GK' },
    { id: 'a-2', shirtNumber: '2', rating: '6.35', role: 'DEF 1' },
    { id: 'a-3', shirtNumber: '6', rating: '7.10', role: 'DEF 2' },
    { id: 'a-4', shirtNumber: '4', rating: '6.90', role: 'DEF 3' },
    { id: 'a-5', shirtNumber: '23', rating: '7.05', role: 'DEF 4' },
    { id: 'a-6', shirtNumber: '41', rating: '7.38', role: 'MID 1' },
    { id: 'a-7', shirtNumber: '8', rating: '7.22', role: 'MID 2' },
    { id: 'a-8', shirtNumber: '7', rating: '7.94', role: 'MID 3' },
    { id: 'a-9', shirtNumber: '10', rating: '8.25', role: 'FWD 1' },
    { id: 'a-10', shirtNumber: '11', rating: '7.18', role: 'FWD 2' },
    { id: 'a-11', shirtNumber: '9', rating: '5.85', role: 'FWD 3' },
  ],
};

export const ADDITIONAL_PRESETS: MatchPreset[] = [
  DEFAULT_MATCH_DATA,
  {
    id: 'preset-442-352',
    name: '4-4-2 vs 3-5-2 Showdown',
    homeFormation: '4-4-2',
    awayFormation: '3-5-2',
    homePlayers: [
      { id: 'h-1', shirtNumber: '13', rating: '7.30', role: 'GK' },
      { id: 'h-2', shirtNumber: '20', rating: '6.85', role: 'DEF 1' },
      { id: 'h-3', shirtNumber: '3', rating: '7.15', role: 'DEF 2' },
      { id: 'h-4', shirtNumber: '22', rating: '7.40', role: 'DEF 3' },
      { id: 'h-5', shirtNumber: '12', rating: '6.70', role: 'DEF 4' },
      { id: 'h-6', shirtNumber: '15', rating: '7.25', role: 'MID 1' },
      { id: 'h-7', shirtNumber: '8', rating: '7.84', role: 'MID 2' },
      { id: 'h-8', shirtNumber: '6', rating: '7.43', role: 'MID 3' },
      { id: 'h-9', shirtNumber: '10', rating: '8.10', role: 'MID 4' },
      { id: 'h-10', shirtNumber: '9', rating: '7.95', role: 'FWD 1' },
      { id: 'h-11', shirtNumber: '7', rating: '7.60', role: 'FWD 2' },
    ],
    awayPlayers: [
      { id: 'a-1', shirtNumber: '1', rating: '7.00', role: 'GK' },
      { id: 'a-2', shirtNumber: '2', rating: '6.90', role: 'DEF 1' },
      { id: 'a-3', shirtNumber: '15', rating: '7.20', role: 'DEF 2' },
      { id: 'a-4', shirtNumber: '95', rating: '7.35', role: 'DEF 3' },
      { id: 'a-5', shirtNumber: '32', rating: '7.10', role: 'MID 1' },
      { id: 'a-6', shirtNumber: '23', rating: '7.65', role: 'MID 2' },
      { id: 'a-7', shirtNumber: '20', rating: '8.30', role: 'MID 3' },
      { id: 'a-8', shirtNumber: '22', rating: '7.25', role: 'MID 4' },
      { id: 'a-9', shirtNumber: '30', rating: '6.95', role: 'MID 5' },
      { id: 'a-10', shirtNumber: '10', rating: '8.05', role: 'FWD 1' },
      { id: 'a-11', shirtNumber: '9', rating: '7.45', role: 'FWD 2' },
    ],
  },
  {
    id: 'preset-3421-541',
    name: '3-4-2-1 vs 5-4-1 Defensive Grid',
    homeFormation: '3-4-2-1',
    awayFormation: '5-4-1',
    homePlayers: [
      { id: 'h-1', shirtNumber: '1', rating: '7.40', role: 'GK' },
      { id: 'h-2', shirtNumber: '6', rating: '7.18', role: 'CB 1' },
      { id: 'h-3', shirtNumber: '4', rating: '7.52', role: 'CB 2' },
      { id: 'h-4', shirtNumber: '5', rating: '7.08', role: 'CB 3' },
      { id: 'h-5', shirtNumber: '24', rating: '7.32', role: 'MID 1' },
      { id: 'h-6', shirtNumber: '8', rating: '7.85', role: 'MID 2' },
      { id: 'h-7', shirtNumber: '14', rating: '7.22', role: 'MID 3' },
      { id: 'h-8', shirtNumber: '3', rating: '6.98', role: 'MID 4' },
      { id: 'h-9', shirtNumber: '10', rating: '8.40', role: 'AM 1' },
      { id: 'h-10', shirtNumber: '7', rating: '7.92', role: 'AM 2' },
      { id: 'h-11', shirtNumber: '9', rating: '7.65', role: 'ST' },
    ],
    awayPlayers: [
      { id: 'a-1', shirtNumber: '1', rating: '8.20', role: 'GK' },
      { id: 'a-2', shirtNumber: '2', rating: '6.80', role: 'DEF 1' },
      { id: 'a-3', shirtNumber: '5', rating: '7.40', role: 'DEF 2' },
      { id: 'a-4', shirtNumber: '4', rating: '7.65', role: 'DEF 3' },
      { id: 'a-5', shirtNumber: '16', rating: '7.15', role: 'DEF 4' },
      { id: 'a-6', shirtNumber: '3', rating: '6.75', role: 'DEF 5' },
      { id: 'a-7', shirtNumber: '7', rating: '6.90', role: 'MID 1' },
      { id: 'a-8', shirtNumber: '6', rating: '7.30', role: 'MID 2' },
      { id: 'a-9', shirtNumber: '8', rating: '7.10', role: 'MID 3' },
      { id: 'a-10', shirtNumber: '11', rating: '6.65', role: 'MID 4' },
      { id: 'a-11', shirtNumber: '9', rating: '6.50', role: 'ST' },
    ],
  },
];

export const THEMES: ThemeColors[] = [
  {
    name: 'Sofascore Classic',
    homeMarkerBg: '#0F172A', // Dark Navy/Slate
    homeMarkerBorder: '#F8FAFC', // Crisp White
    homeNumberColor: '#FFFFFF',
    awayMarkerBg: '#FFFFFF', // Crisp White
    awayMarkerBorder: '#0F172A', // Dark Slate
    awayNumberColor: '#0F172A',
    badgeBg: '#E8B931', // Signature Sofascore Gold/Mustard
    badgeTextColor: '#141414',
    pitchDark: '#1F7A4D',
    pitchLight: '#2E8B57',
    lineColor: 'rgba(255, 255, 255, 0.42)',
  },
  {
    name: 'Royal vs Pearl',
    homeMarkerBg: '#1E3A8A', // Royal Blue
    homeMarkerBorder: '#FFFFFF',
    homeNumberColor: '#FFFFFF',
    awayMarkerBg: '#F8FAFC',
    awayMarkerBorder: '#1E3A8A',
    awayNumberColor: '#1E3A8A',
    badgeBg: '#E8B931',
    badgeTextColor: '#141414',
    pitchDark: '#1B6E45',
    pitchLight: '#278051',
    lineColor: 'rgba(255, 255, 255, 0.45)',
  },
  {
    name: 'Midnight vs Ivory',
    homeMarkerBg: '#18181B', // Zinc 900
    homeMarkerBorder: '#FAFAFA',
    homeNumberColor: '#FAFAFA',
    awayMarkerBg: '#FEF08A', // Soft Ivory Gold
    awayMarkerBorder: '#18181B',
    awayNumberColor: '#18181B',
    badgeBg: '#E8B931',
    badgeTextColor: '#141414',
    pitchDark: '#1E7548',
    pitchLight: '#2A8754',
    lineColor: 'rgba(255, 255, 255, 0.42)',
  },
];
