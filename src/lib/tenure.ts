/** Whole years and months elapsed between two dates. */
export interface Tenure {
  readonly years: number;
  readonly months: number;
  /** Marketing-friendly form, e.g. `8+ years`. */
  readonly label: string;
  /** Precise form, e.g. `8 years, 1 month`. */
  readonly precise: string;
}

function pluralize(count: number, noun: string): string {
  return `${count} ${noun}${count === 1 ? '' : 's'}`;
}

/**
 * Elapsed time since the career start month.
 *
 * Computed rather than hard-coded so the headline figure stays correct without
 * anyone remembering to bump it. Pass `now` explicitly in tests.
 */
export function computeTenure(
  start: { readonly year: number; readonly month: number },
  now: Date = new Date(),
): Tenure {
  // `month` is 1-indexed in the input; Date months are 0-indexed.
  const totalMonths = (now.getFullYear() - start.year) * 12 + (now.getMonth() + 1 - start.month);
  const clamped = Math.max(0, totalMonths);
  const years = Math.floor(clamped / 12);
  const months = clamped % 12;

  return {
    years,
    months,
    label: `${years}+ years`,
    precise:
      months === 0
        ? pluralize(years, 'year')
        : `${pluralize(years, 'year')}, ${pluralize(months, 'month')}`,
  };
}
