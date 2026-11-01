// "$450" for whole dollars, "$450.50" when there are cents.
export function formatPrice(price) {
  const n = Number(price) || 0;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: n % 1 ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(n);
}
