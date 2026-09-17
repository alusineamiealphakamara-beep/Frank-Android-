export interface RatingColorStyle {
  bg: string;
  textColor: string;
  label: string;
  category: 'blue' | 'cyan' | 'green' | 'yellow' | 'orange' | 'red';
}

/**
 * Rating Color Scale according to official breakdown:
 * - 9.00 – 10.00: Blue (#3054E8) -> Outstanding / Elite
 * - 8.00 – 8.99: Cyan (#00B4D8) -> Excellent
 * - 7.00 – 7.99: Green (#00B836) -> Good
 * - 6.50 – 6.99: Yellow (#E8A900) -> Average
 * - 6.00 – 6.49: Orange (#F57800) -> Below Average
 * - 1.00 – 5.99: Red (#D81B1B) -> Poor (< 6.00)
 */
export function getSofascoreRatingColor(
  ratingStr: string | number,
  dynamicMode: boolean = true
): RatingColorStyle {
  if (!dynamicMode) {
    return {
      bg: '#E8A900',
      textColor: '#141414',
      label: 'Standard Gold',
      category: 'yellow',
    };
  }

  const val = typeof ratingStr === 'number' ? ratingStr : parseFloat(String(ratingStr));

  if (isNaN(val)) {
    return {
      bg: '#E8A900',
      textColor: '#141414',
      label: '6.5 – 6.9',
      category: 'yellow',
    };
  }

  // 9.00 to 10.00: Deep Blue
  if (val >= 9.0) {
    return {
      bg: '#3054E8',
      textColor: '#FFFFFF',
      label: '9.0 – 10.0',
      category: 'blue',
    };
  }

  // 8.00 to 8.99: Cyan / Light Blue
  if (val >= 8.0) {
    return {
      bg: '#00B4D8',
      textColor: '#FFFFFF',
      label: '8.0 – 8.9',
      category: 'cyan',
    };
  }

  // 7.00 to 7.99: Green
  if (val >= 7.0) {
    return {
      bg: '#00B836',
      textColor: '#FFFFFF',
      label: '7.0 – 7.9',
      category: 'green',
    };
  }

  // 6.50 to 6.99: Yellow
  if (val >= 6.5) {
    return {
      bg: '#E8A900',
      textColor: '#141414',
      label: '6.5 – 6.9',
      category: 'yellow',
    };
  }

  // 6.00 to 6.49: Orange
  if (val >= 6.0) {
    return {
      bg: '#F57800',
      textColor: '#FFFFFF',
      label: '6.0 – 6.4',
      category: 'orange',
    };
  }

  // 1.00 to 5.99: Red
  return {
    bg: '#D81B1B',
    textColor: '#FFFFFF',
    label: '< 6.0',
    category: 'red',
  };
}

export const SOFASCORE_RATING_BRACKETS: {
  range: string;
  label: string;
  bg: string;
  textColor: string;
}[] = [
  { range: '9.0 – 10.0', label: 'Elite', bg: '#3054E8', textColor: '#FFFFFF' },
  { range: '8.0 – 8.9', label: 'Excellent', bg: '#00B4D8', textColor: '#FFFFFF' },
  { range: '7.0 – 7.9', label: 'Good', bg: '#00B836', textColor: '#FFFFFF' },
  { range: '6.5 – 6.9', label: 'Average', bg: '#E8A900', textColor: '#141414' },
  { range: '6.0 – 6.4', label: 'Below Avg', bg: '#F57800', textColor: '#FFFFFF' },
  { range: '1.0 – 5.9', label: 'Poor', bg: '#D81B1B', textColor: '#FFFFFF' },
];

/**
 * Format any rating string or number to strictly 2 decimal places between 1.00 and 10.00.
 */
export function formatRatingToTwoDecimals(ratingStr: string | number): string {
  if (ratingStr === '' || ratingStr === null || ratingStr === undefined) return '7.00';
  const val = typeof ratingStr === 'number' ? ratingStr : parseFloat(String(ratingStr).trim());
  if (isNaN(val)) {
    return '7.00';
  }
  // Enforce bounds strictly between 1.00 and 10.00
  const clamped = Math.max(1.0, Math.min(10.0, val));
  return clamped.toFixed(2);
}

