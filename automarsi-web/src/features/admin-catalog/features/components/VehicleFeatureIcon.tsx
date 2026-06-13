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

export default VehicleFeatureIcon