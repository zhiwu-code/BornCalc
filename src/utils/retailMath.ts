/**
 * Retail Math Utility Functions
 *
 * KEY DISTINCTION:
 * - Margin % is based on the RETAIL (selling) price
 * - Markup % is based on the COST (wholesale) price
 *
 * Example: Cost $50, Retail $80
 *   Margin = ($80 - $50) / $80 = 37.5%
 *   Markup = ($80 - $50) / $50 = 60%
 */

/** Calculate retail price from cost and margin % */
export function retailFromMargin(cost: number, marginPercent: number): number {
  if (marginPercent >= 100) return Infinity;
  return cost / (1 - marginPercent / 100);
}

/** Calculate retail price from cost and markup % */
export function retailFromMarkup(cost: number, markupPercent: number): number {
  return cost * (1 + markupPercent / 100);
}

/** Calculate cost (landed cost) from retail price and margin % */
export function costFromMargin(retail: number, marginPercent: number): number {
  return retail * (1 - marginPercent / 100);
}

/** Calculate margin % from cost and retail price */
export function marginFromPrices(cost: number, retail: number): number {
  if (retail === 0) return 0;
  return ((retail - cost) / retail) * 100;
}

/** Calculate markup % from cost and retail price */
export function markupFromPrices(cost: number, retail: number): number {
  if (cost === 0) return 0;
  return ((retail - cost) / cost) * 100;
}

/** Convert margin % to markup % */
export function marginToMarkup(marginPercent: number): number {
  if (marginPercent >= 100) return Infinity;
  return (marginPercent / (100 - marginPercent)) * 100;
}

/** Convert markup % to margin % */
export function markupToMargin(markupPercent: number): number {
  return (markupPercent / (100 + markupPercent)) * 100;
}

/** Calculate profit (dollars) */
export function profit(cost: number, retail: number): number {
  return retail - cost;
}

/** Format a number as currency */
export function formatCurrency(value: number): string {
  if (!isFinite(value)) return '—';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/** Format a number as a percentage */
export function formatPercent(value: number): string {
  if (!isFinite(value)) return '—';
  return `${value.toFixed(2)}%`;
}
