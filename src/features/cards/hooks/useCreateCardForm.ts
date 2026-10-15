import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useCreateCard } from './useCreateCard'
import type { CardType, CardCategory } from '../types/card.types'
import type { CardIconType } from '../types/card-icon.types'
import { useGenerateCard } from './useGenerateCard'

export default function useCreateCardForm() {
  const navigate = useNavigate()
  const { mutate: createCard, isPending: isSubmitting } = useCreateCard()
  const { mutateAsync: generate, isPending: isGenerating } = useGenerateCard()

  const [type, setType] = useState<CardType>('request')
  const [category, setCategory] = useState<CardCategory | ''>('')
  const [prompt, setPrompt] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [hours, setHours] = useState(1)
  const [icon, setIcon] = useState<CardIconType | ''>('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [moderationError, setModerationError] = useState<string | null>(null)
  const [hasGenerated, setHasGenerated] = useState(false)

  const hasSuggestion = title !== '' && description !== ''

  function validate() {
    const next: Record<string, string> = {}
    if (!category) next.category = 'La categoría es obligatoria'
    if (!title.trim()) next.title = 'El título no puede estar vacío'
    if (!description.trim()) next.description = 'La descripción es obligatoria'
    if (!hours || hours < 1) next.hours = 'Las horas deben ser más que 0'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function onSubmit() {
    if (!validate()) return
    setModerationError(null)
    createCard(
      { type, category: category as CardCategory, title, description, icon: icon as CardIconType, hours },
      {
        onSuccess: () => navigate('/home'),
        onError: (error) => {
          if (axios.isAxiosError(error) && error.response?.status === 422) {
            setModerationError(
              error.response.data?.message ?? 'Este contenido no cumple las normas de la comunidad. Por favor, revísalo antes de publicar.'
            )
          }
        },
      }
    )
  }

  async function onGenerate() {
    if (!prompt.trim()) return
    if (!category) {
      setErrors({ category: 'La categoría es obligatoria' })
      return
    }
    setErrors({})
    setModerationError(null)
    await generate(
      { prompt, type, category: category as CardCategory },
      {
        onSuccess: (result) => {
          setTitle(result.title)
          setDescription(result.description)
          setIcon(result.icon)
          setHasGenerated(true)
        },
        onError: (error) => {
          if (axios.isAxiosError(error) && error.response?.status === 422) {
            setModerationError(
              error.response.data?.message ?? 'Este contenido no cumple las normas de la comunidad. Intenta describir lo que ofreces de otra forma.'
            )
          }
        },
      }
    )
  }

  return {
    type, setType,
    category, setCategory,
    prompt, setPrompt,
    title, setTitle,
    description, setDescription,
    hours, setHours,
    icon, setIcon,
    isGenerating,
    isSubmitting,
    hasSuggestion,
    hasGenerated,
    errors,
    moderationError,
    onGenerate,
    onSubmit,
  }
}