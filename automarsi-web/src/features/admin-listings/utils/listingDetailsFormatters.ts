export { formatVehiclePrice as formatPrice } from '@/shared/lib/formatters'
export function formatValue(
  value: string | number | null,
  fallback = 'Not set',
) {
  if (value === null || value === '') {
    return fallback
  }

  return String(value)
}


export function formatKilometers(kilometers: number | null) {
  if (kilometers === null) {
    return 'Not set'
  }

  return `${kilometers.toLocaleString()} km`
}
