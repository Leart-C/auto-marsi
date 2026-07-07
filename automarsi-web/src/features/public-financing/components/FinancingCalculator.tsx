import { Calculator, MessageCircle } from 'lucide-react'
import { useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  calculateMonthlyPayment,
  formatCurrency,
} from '@/features/public-financing/utils/financingCalculator'
import { useI18n } from '@/i18n/useI18n'

type FinancingCalculatorProps = {
  onAskAboutEstimate: () => void
}

function FinancingCalculator({ onAskAboutEstimate }: FinancingCalculatorProps) {
  const { messages } = useI18n()
  const [vehiclePrice, setVehiclePrice] = useState(25000)
  const [downPayment, setDownPayment] = useState(5000)
  const [months, setMonths] = useState(60)
  const [annualRate, setAnnualRate] = useState(6)

  const monthlyPayment = useMemo(
    () =>
      calculateMonthlyPayment({
        vehiclePrice,
        downPayment,
        months,
        annualRate,
      }),
    [vehiclePrice, downPayment, months, annualRate],
  )

  const financedAmount = Math.max(vehiclePrice - downPayment, 0)

  return (
    <aside className="rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.3)] backdrop-blur-xl lg:sticky lg:top-24">
      <div className="mb-4 flex items-start gap-3">
        <div className="grid size-10 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary">
          <Calculator className="size-4" />
        </div>

        <div>
          <h2 className="font-semibold">
            {messages.financing.calculator.title}
          </h2>
          <p className="text-sm text-muted-foreground">
            {messages.financing.calculator.description}
          </p>
        </div>
      </div>

      <div className="mb-4 rounded-[1.5rem] bg-gradient-to-br from-primary to-[#9d6d20] p-5 text-primary-foreground shadow-[0_24px_60px_rgba(213,162,56,0.22)]">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-primary-foreground/80">
          {messages.financing.calculator.estimatedMonthly}
        </p>
        <p className="mt-2 text-4xl font-black tracking-[-0.05em]">
          {formatCurrency(monthlyPayment)}
        </p>
        <p className="mt-1 text-xs text-primary-foreground/80">
          {messages.financing.calculator.financedAmount}:{' '}
          {formatCurrency(financedAmount)}
        </p>
      </div>

      <div className="grid gap-3">
        <label className="grid gap-1.5 text-sm font-medium">
          {messages.financing.calculator.vehiclePrice}
          <input
            type="number"
            min="0"
            value={vehiclePrice}
            onChange={(event) => setVehiclePrice(Number(event.target.value))}
            className="h-11 w-full rounded-2xl border border-input bg-white/[0.04] px-3 text-sm"
          />
        </label>

        <label className="grid gap-1.5 text-sm font-medium">
          {messages.financing.calculator.downPayment}
          <input
            type="number"
            min="0"
            max={vehiclePrice}
            value={downPayment}
            onChange={(event) => setDownPayment(Number(event.target.value))}
            className="h-11 w-full rounded-2xl border border-input bg-white/[0.04] px-3 text-sm"
          />
          <input
            type="range"
            min="0"
            max={vehiclePrice}
            step="500"
            value={downPayment}
            onChange={(event) => setDownPayment(Number(event.target.value))}
            className="w-full accent-primary"
          />
        </label>

        <div className="grid min-w-0 gap-3 sm:grid-cols-2">
          <label className="grid min-w-0 gap-1.5 text-sm font-medium">
            {messages.financing.calculator.term}
            <select
              value={months}
              onChange={(event) => setMonths(Number(event.target.value))}
              className="h-11 w-full min-w-0 rounded-2xl border border-input bg-white/[0.04] px-3 text-sm"
            >
              <option value={36}>
                36 {messages.financing.calculator.months}
              </option>
              <option value={48}>
                48 {messages.financing.calculator.months}
              </option>
              <option value={60}>
                60 {messages.financing.calculator.months}
              </option>
              <option value={72}>
                72 {messages.financing.calculator.months}
              </option>
            </select>
          </label>

          <label className="grid min-w-0 gap-1.5 text-sm font-medium">
            {messages.financing.calculator.rate}
            <input
              type="number"
              min="0"
              step="0.1"
              value={annualRate}
              onChange={(event) => setAnnualRate(Number(event.target.value))}
              className="h-11 w-full min-w-0 rounded-2xl border border-input bg-white/[0.04] px-3 text-sm"
            />
          </label>
        </div>
      </div>

      <div className="mt-4 grid gap-3 border-t border-white/10 pt-3">
        <p className="text-xs leading-5 text-muted-foreground">
          {messages.financing.calculator.note}
        </p>

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="justify-center"
          onClick={onAskAboutEstimate}
        >
          <MessageCircle className="size-4" />
          {messages.financing.calculator.askAboutEstimate}
        </Button>
      </div>
    </aside>
  )
}

export default FinancingCalculator
