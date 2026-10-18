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
    <form id={id} onSubmit={handleSubmit} className="flex flex-col gap-3 rounded-2xl bg-coral-soft/40 p-4">
      <label htmlFor="report-reason" className="font-body text-sm font-medium text-ink">
        Motivo de la denuncia
      </label>
      <textarea
        id="report-reason"
        rows={3}
        value={reason}
        maxLength={1000}
        onChange={(event) => setReason(event.target.value)}
        className="resize-none rounded-2xl border border-ink/15 bg-white px-4 py-3 font-body text-sm text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-teal"
      />
      {errorMessage && (
        <p role="alert" className="rounded-xl border-l-4 border-coral bg-coral-soft px-3 py-2 font-body text-sm text-ink">
          {errorMessage}
        </p>
      )}
      <button
        type="submit"
        disabled={isPending || !reason.trim()}
        className="self-end rounded-2xl bg-teal px-5 py-2.5 font-body text-sm font-medium text-paper cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
      >
        Enviar denuncia
      </button>
    </form>
  )
}