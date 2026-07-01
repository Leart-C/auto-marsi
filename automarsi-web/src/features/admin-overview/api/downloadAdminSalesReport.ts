import type { AdminSalesRange } from './getAdminDashboard'

type DownloadAdminSalesReportParams = {
  token: string
  salesRange: AdminSalesRange
}

export async function downloadAdminSalesReport({
  token,
  salesRange,
}: DownloadAdminSalesReportParams): Promise<Blob> {
  const apiUrl = import.meta.env.VITE_API_URL
  const url = new URL(`${apiUrl}/admin/reports/sales`)

  url.searchParams.set('sales_range', salesRange)

  const response = await fetch(url.toString(), {
    headers: {
      Accept: 'application/pdf',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to download sales report.')
  }

  return response.blob()
}
