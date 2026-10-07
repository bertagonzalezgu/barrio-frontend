import useCreateCardForm from '../hooks/useCreateCardForm'
import CreateCardForm from '../components/CreateCardForm'

export default function CreateCardPage() {
  const form = useCreateCardForm()

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-ink mb-6">Crear tarjeta</h1>
      <CreateCardForm {...form} />
    </div>
  )
}