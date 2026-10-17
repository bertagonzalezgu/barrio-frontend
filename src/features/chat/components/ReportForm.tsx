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
    <form id={id} onSubmit={handleSubmit}>
      <label htmlFor="report-reason">Motivo de la denuncia</label>
      <textarea
        id="report-reason"
        value={reason}
        maxLength={1000}
        onChange={(event) => setReason(event.target.value)}
      />
      {errorMessage && <p role="alert">{errorMessage}</p>}
      <button type="submit" disabled={isPending || !reason.trim()}>
        Enviar denuncia
      </button>
    </form>
  )
}