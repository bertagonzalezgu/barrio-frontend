import { useState, type FormEvent } from 'react'

interface ReportFormProps {
  id: string
  isPending: boolean
  errorMessage?: string
  onSubmit: (reason: string) => void
}

export default function ReportForm({ id, isPending, errorMessage, onSubmit }: ReportFormProps) {
  const [reason, setReason] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit(reason.trim())
  }

  return (
    <form id={id} onSubmit={handleSubmit} className="flex flex-col gap-3 rounded-card border border-danger/20 bg-danger-tint/40 p-4">
      <label htmlFor="report-reason" className="font-body text-sm font-medium text-ink">
        Motivo de la denuncia
      </label>
      <textarea
        id="report-reason"
        rows={3}
        value={reason}
        maxLength={1000}
        onChange={(event) => setReason(event.target.value)}
        className="field resize-none"
      />
      {errorMessage && (
        <p role="alert" className="alert-error">
          {errorMessage}
        </p>
      )}
      <button
        type="submit"
        disabled={isPending || !reason.trim()}
        className="btn-primary self-end"
      >
        Enviar denuncia
      </button>
    </form>
  )
}