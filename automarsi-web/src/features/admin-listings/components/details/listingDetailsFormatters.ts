export function formatValue(
  value: string | number | null,
  fallback = 'Not set',
) {
  if (value === null || value === '') {
    return fallback
  }

  return String(value)
}

export function formatPrice(price: string, currency: string) {
  const numericPrice = Number(price)

  if (Number.isNaN(numericPrice)) {
    return `${price} ${currency}`
  }

  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(numericPrice)
}

export function formatKilometers(kilometers: number | null) {
  if (kilometers === null) {
    return 'Not set'
  }

  return `${kilometers.toLocaleString()} km`
}
