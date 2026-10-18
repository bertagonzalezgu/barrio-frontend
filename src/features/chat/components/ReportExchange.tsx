import { useRef, useState } from 'react'
import { useReportExchange } from '../hooks/useReportExchange'
import ReportForm from './ReportForm'

const FORM_ID = 'report-form'
const ERROR_MESSAGE = 'No se ha podido enviar la denuncia. Inténtalo de nuevo.'

interface ReportExchangeProps {
  exchangeId: string
}

export default function ReportExchange({ exchangeId }: ReportExchangeProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [wasSent, setWasSent] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const { mutate, isPending, isError, reset } = useReportExchange(exchangeId)

  function handleToggle() {
    reset()
    setWasSent(false)
    setIsOpen((open) => !open)
  }

  function handleSubmit(reason: string) {
    mutate(reason, {
      onSuccess: () => {
        setIsOpen(false)
        setWasSent(true)
        buttonRef.current?.focus()
      },
    })
  }

  return (
    <section className="flex flex-col gap-3">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={FORM_ID}
        onClick={handleToggle}
        className="self-end rounded-2xl border border-coral px-4 py-1.5 font-body text-xs font-medium text-coral cursor-pointer transition-colors hover:bg-coral-soft"
      >
        Denunciar
      </button>
      {wasSent && (
        <p role="status" className="rounded-xl bg-teal-soft px-3 py-2 font-body text-sm text-teal">
          Denuncia enviada. Gracias por avisar.
        </p>
      )}
      {isOpen && (
        <ReportForm
          id={FORM_ID}
          isPending={isPending}
          errorMessage={isError ? ERROR_MESSAGE : undefined}
          onSubmit={handleSubmit}
        />
      )}
    </section>
  )
}