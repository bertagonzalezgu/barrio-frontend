import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CreateCardForm from '../components/CreateCardForm'
import { useCreateCard } from '../hooks/useCreateCard'
import type { CardType, CardCategory } from '../types/card.types'
import type { CardIcon } from '../types/card-icon.types'

export default function CreateCardPage() {
    const navigate = useNavigate()
    const { mutate: createCard, isPending: isSubmitting } = useCreateCard()

    const [type, setType] = useState<CardType>('request')
    const [category, setCategory] = useState<CardCategory>('home-repairs') 
    const [prompt, setPrompt] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [hours, setHours] = useState(1)
    const [icon, setIcon] = useState<CardIcon | ''>('')
    const [isGenerating, setIsGenerating] = useState(false)
    const [errors, setErrors] = useState<{
        category?: string
        description?: string
        hours?: string
    }>({})

  function validate() {
    const next: typeof errors = {}
    if (!category) next.category = 'La categoría es obligatoria'
    if (!description.trim()) next.description = 'La descripción es obligatoria'
    if (!hours || hours < 0) next.hours = 'Las horas deben ser más que 0'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleGenerate() {
    setIsGenerating(true)
    try {
      setTitle('Título generado por IA')
      setDescription('Descripción generada por IA')
      setIcon('')
    } finally {
      setIsGenerating(false)
    }
  }

  function handleSubmit() {
    if (!validate()) return
    createCard(
      { type, category, title, description, icon: icon as CardIcon, hours },
      { onSuccess: () => navigate('/home') }
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="px-4 pt-6 pb-2">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-500"
        >
          ← volver
        </button>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Nueva tarjeta</h1>
      </header>

      <CreateCardForm
        type={type} setType={setType}
        category={category} setCategory={setCategory}
        prompt={prompt} setPrompt={setPrompt}
        title={title} setTitle={setTitle}
        description={description} setDescription={setDescription}
        hours={hours} setHours={setHours}
        icon={icon} setIcon={setIcon}
        errors={errors}
        onGenerate={handleGenerate}
        onSubmit={handleSubmit}
        isGenerating={isGenerating}
        isSubmitting={isSubmitting}
      />
    </div>
  )
}