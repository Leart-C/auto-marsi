import type { AdminAppointment } from '@/features/admin-appointments/types'
import type { AdminInquiry } from '@/features/admin-inquiries/types'
import { adminApi } from '@/lib/adminApi'

export type AdminSalesRange = 'today' | 'week' | 'month' | 'year'

export type AdminSalesTrendPoint = {
  key: string
  label: string
  revenue: number
  profit: number
  sold_count: number
}

export type AdminDashboardData = {
  listings: {
    total: number
    active: number
    draft: number
    sold: number
    archived: number
  }
  new_inquiries: number
  open_appointments: number
  sales: {
    range: AdminSalesRange
    title: string
    starts_at: string
    ends_at: string
    summary: {
      revenue: number
      purchase_total: number
      expenses: number
      profit: number
      sold_count: number
      margin_percent: number | null
    }
    trend: AdminSalesTrendPoint[]
  }
  recent_inquiries: AdminInquiry[]
  upcoming_appointments: AdminAppointment[]
}

type AdminDashboardResponse = {
  data: AdminDashboardData
}

type GetAdminDashboardParams = {
  token: string
  salesRange: AdminSalesRange
}

export function getAdminDashboard({
  token,
  salesRange,
}: GetAdminDashboardParams) {
  return adminApi<AdminDashboardResponse>({
    token,
    path: '/admin/dashboard',
    query: {
      sales_range: salesRange,
    },
  })
}
