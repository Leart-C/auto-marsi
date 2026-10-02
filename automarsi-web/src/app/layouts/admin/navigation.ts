import {
  CalendarClock,
  CarFront,
  Image,
  LayoutDashboard,
  MessagesSquare,
  Wrench,
  BadgeCheck,
} from 'lucide-react'
import { routes } from '@/shared/config/routes'

export const adminNavigationSections = [
  {
    label: 'Manage',
    items: [
      { label: 'Overview', href: routes.admin.overview, icon: LayoutDashboard },
      { label: 'Listings', href: routes.admin.listings, icon: CarFront },
      {
        label: 'Inquiries',
        href: routes.admin.inquiries,
        icon: MessagesSquare,
      },
      {
        label: 'Appointments',
        href: routes.admin.appointments,
        icon: CalendarClock,
      },
      { label: 'Site media', href: routes.admin.siteMedia, icon: Image },
    ],
  },
  {
    label: 'Catalog',
    items: [
      {
        label: 'Makes & Models',
        href: routes.admin.makes,
        icon: BadgeCheck,
      },
      { label: 'Features', href: routes.admin.features, icon: Wrench },
    ],
  },
]

export const adminPageTitles: Record<
  string,
  { eyebrow: string; title: string }
> = {
  [routes.admin.siteMedia]: { eyebrow: 'Showroom', title: 'Site media' },
  [routes.admin.overview]: {
    eyebrow: 'AutoMarsi',
    title: 'Overview',
  },
  [routes.admin.listings]: {
    eyebrow: 'Inventory',
    title: 'Listings',
  },
  [routes.admin.inquiries]: {
    eyebrow: 'Customers',
    title: 'Inquiries',
  },
  [routes.admin.appointments]: {
    eyebrow: 'Schedule',
    title: 'Appointments',
  },
  [routes.admin.makes]: {
    eyebrow: 'Catalog',
    title: 'Makes',
  },
  [routes.admin.models]: {
    eyebrow: 'Catalog',
    title: 'Models',
  },
  [routes.admin.features]: {
    eyebrow: 'Catalog',
    title: 'Features',
  },
}
