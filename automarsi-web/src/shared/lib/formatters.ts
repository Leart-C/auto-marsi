/** The price format used by vehicle listings, including the existing invalid-value fallback. */
export function formatVehiclePrice(price: string, currency: string): string {
  const amount = Number(price)
  if (Number.isNaN(amount)) return `${price} ${currency}`
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}
