import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Download } from 'lucide-react'
import type {
  AdminSalesRange,
  AdminSalesTrendPoint,
} from '../api/getAdminDashboard'

type SalesPerformanceChartProps = {
  range: AdminSalesRange
  summary: {
    revenue: number
    purchase_total: number
    expenses: number
    profit: number
    sold_count: number
    margin_percent: number | null
  }
  trend: AdminSalesTrendPoint[]
  isExporting: boolean
  onRangeChange: (range: AdminSalesRange) => void
  onExport: () => void
}

const ranges: Array<{ value: AdminSalesRange; label: string }> = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
  { value: 'year', label: 'Year' },
]

const moneyFormatter = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
})

function formatMoney(value: number) {
  return moneyFormatter.format(value)
}

function formatMargin(value: number | null) {
  if (value === null) {
    return '-'
  }

  return `${value.toFixed(2)}%`
}

function SalesPerformanceChart({
  range,
  summary,
  trend,
  isExporting,
  onRangeChange,
  onExport,
}: SalesPerformanceChartProps) {
  const hasSales = summary.sold_count > 0

  return (
    <div className="grid gap-4 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="grid w-full gap-2 sm:grid-cols-3 lg:w-auto">
          <div className="rounded-md border bg-background px-3 py-2">
            <p className="text-[11px] font-semibold uppercase text-muted-foreground">
              Revenue
            </p>
            <p className="mt-1 text-lg font-semibold tabular-nums">
              {formatMoney(summary.revenue)}
            </p>
          </div>
          <div className="rounded-md border bg-background px-3 py-2">
            <p className="text-[11px] font-semibold uppercase text-muted-foreground">
              Profit
            </p>
            <p
              className={`mt-1 text-lg font-semibold tabular-nums ${
                summary.profit >= 0 ? 'text-emerald-400' : 'text-red-400'
              }`}
            >
              {formatMoney(summary.profit)}
            </p>
          </div>
          <div className="rounded-md border bg-background px-3 py-2">
            <p className="text-[11px] font-semibold uppercase text-muted-foreground">
              Margin
            </p>
            <p className="mt-1 text-lg font-semibold tabular-nums">
              {formatMargin(summary.margin_percent)}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-end gap-2">
          <div className="flex rounded-md border bg-background p-1">
            {ranges.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => onRangeChange(item.value)}
                className={`rounded px-3 py-1.5 text-xs font-medium transition ${
                  range === item.value
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            disabled={isExporting}
            onClick={onExport}
            className="inline-flex items-center gap-2 rounded-md border bg-background px-3 py-2 text-xs font-medium text-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Download className="size-3.5" />
            {isExporting ? 'Exporting...' : 'Export PDF'}
          </button>
        </div>
      </div>

      <div className="h-72">
        {!hasSales ? (
          <div className="grid h-full place-items-center rounded-md border border-dashed">
            <div className="text-center">
              <p className="text-sm font-medium">No sold cars in this range</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Mark a listing as sold with sale numbers to see performance.
              </p>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={trend}
              margin={{ top: 10, right: 12, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.32} />
                  <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="profitFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34d399" stopOpacity={0.28} />
                  <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(148,163,184,.14)" vertical={false} />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#94a3b8', fontSize: 12 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                width={64}
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                tickFormatter={(value) => formatMoney(Number(value))}
              />
              <Tooltip
                cursor={{ stroke: 'rgba(148,163,184,.35)' }}
                contentStyle={{
                  background: '#111827',
                  border: '1px solid rgba(255,255,255,.1)',
                  borderRadius: 8,
                  color: '#e8ecf2',
                  fontSize: 12,
                }}
                formatter={(value, name) => [
                  formatMoney(Number(value)),
                  name === 'revenue' ? 'Revenue' : 'Profit',
                ]}
                labelStyle={{ color: '#cbd5e1' }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#60a5fa"
                strokeWidth={2}
                fill="url(#revenueFill)"
              />
              <Area
                type="monotone"
                dataKey="profit"
                stroke="#34d399"
                strokeWidth={2}
                fill="url(#profitFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t pt-3 text-xs text-muted-foreground">
        <span>{summary.sold_count} sold listings counted.</span>
        <span>
          Expenses {formatMoney(summary.expenses)} | Purchase{' '}
          {formatMoney(summary.purchase_total)}
        </span>
      </div>
    </div>
  )
}

export default SalesPerformanceChart
