import useCreateCardForm from '../hooks/useCreateCardForm'
import CreateCardForm from '../components/CreateCardForm'
import { Link } from 'react-router-dom'

export default function CreateCardPage() {
  const form = useCreateCardForm()

  return (
    <main className="flex flex-col gap-6 px-4 pt-6 pb-24">
      <div>
        <Link to="/home" className="text-sm font-body text-ink/60">← volver</Link>
        <h1 className="text-2xl font-display font-bold text-ink">Crear tarjeta</h1>
      </div>
      <CreateCardForm {...form} />
    </main>
  )
}