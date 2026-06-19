import {
  Armchair,
  Bluetooth,
  Camera,
  Circle,
  Eye,
  Fan,
  Flame,
  Gauge,
  HelpCircle,
  KeyRound,
  Lightbulb,
  Navigation,
  Power,
  Radar,
  Scan,
  ShieldCheck,
  Smartphone,
  Snowflake,
  Sun,
  type LucideIcon,
} from 'lucide-react'

const featureIconMap: Record<string, LucideIcon> = {
  armchair: Armchair,
  bluetooth: Bluetooth,
  camera: Camera,
  circle: Circle,
  eye: Eye,
  fan: Fan,
  flame: Flame,
  gauge: Gauge,
  'key-round': KeyRound,
  lightbulb: Lightbulb,
  navigation: Navigation,
  power: Power,
  radar: Radar,
  scan: Scan,
  'shield-check': ShieldCheck,
  smartphone: Smartphone,
  snowflake: Snowflake,
  sun: Sun,
}

type VehicleFeatureIconProps = {
  icon: string | null
  className?: string
}

function VehicleFeatureIcon({ icon, className }: VehicleFeatureIconProps) {
  const Icon = icon ? featureIconMap[icon] ?? HelpCircle : HelpCircle

  return <Icon className={className} />
}

export const vehicleFeatureIconOptions = Object.keys(featureIconMap).map(
  (icon) => ({
    value: icon,
    label: icon
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' '),
  })
)

export function suggestVehicleFeatureIcon(name: string): string {
  const normalizedName = name.trim().toLowerCase()

  const suggestions: Array<[string[], string]> = [
    [['seat', 'massage', 'chair'], 'armchair'],
    [['bluetooth'], 'bluetooth'],
    [['camera'], 'camera'],
    [['parking', 'sensor', 'radar'], 'radar'],
    [['navigation', 'gps', 'map'], 'navigation'],
    [['heated', 'heating', 'warm'], 'flame'],
    [['ventilated', 'cooling', 'fan'], 'fan'],
    [['air condition', 'climate', 'cold'], 'snowflake'],
    [['keyless', 'key'], 'key-round'],
    [['phone', 'carplay', 'android auto'], 'smartphone'],
    [['light', 'led', 'headlight'], 'lightbulb'],
    [['sunroof', 'panoramic'], 'sun'],
    [['safety', 'assist', 'warning'], 'shield-check'],
    [['display', 'head-up', 'hud'], 'eye'],
    [['power', 'electric'], 'power'],
    [['cruise', 'speed'], 'gauge'],
  ]

  return (
    suggestions.find(([keywords]) =>
      keywords.some((keyword) => normalizedName.includes(keyword))
    )?.[1] ?? 'shield-check'
  )
}

export default VehicleFeatureIcon
