import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useAdminToken } from '@/hooks/useAdminToken'
import { downloadAdminSalesReport } from '../api/downloadAdminSalesReport'
import type { AdminSalesRange } from '../api/getAdminDashboard'

const rangeLabels: Record<AdminSalesRange, string> = {
  today: 'today',
  week: 'this-week',
  month: 'this-month',
  year: 'this-year',
}

function saveBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

export function useAdminSalesReportDownload() {
  const { getAdminToken } = useAdminToken()

  return useMutation({
    mutationFn: async (salesRange: AdminSalesRange) => {
      const token = await getAdminToken()

      return {
        salesRange,
        blob: await downloadAdminSalesReport({
          token,
          salesRange,
        }),
      }
    },
    onSuccess: ({ salesRange, blob }) => {
      saveBlob(blob, `automarsi-sales-${rangeLabels[salesRange]}.pdf`)
      toast.success('Sales report downloaded.')
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Could not download sales report.'
      )
    },
  })
}
