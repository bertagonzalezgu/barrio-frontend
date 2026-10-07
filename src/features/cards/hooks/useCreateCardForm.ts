import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateCard } from './useCreateCard'
import type { CardType, CardCategory } from '../types/card.types'
import type { CardIcon } from '../types/card-icon.types'

export default function useCreateCardForm() {
  const navigate = useNavigate()
  const { mutate: createCard, isPending: isSubmitting } = useCreateCard()

  const [type, setType] = useState<CardType>('request')
  const [category, setCategory] = useState<CardCategory | ''>('')
  const [prompt, setPrompt] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [hours, setHours] = useState(1)
  const [icon, setIcon] = useState<CardIcon | ''>('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const hasSuggestion = title !== '' && description !== ''

  function validate() {
    const next: Record<string, string> = {}
    if (!category) next.category = 'La categoría es obligatoria'
    if (!description.trim()) next.description = 'La descripción es obligatoria'
    if (!hours || hours < 1) next.hours = 'Las horas deben ser más que 0'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function onGenerate() {
    setIsGenerating(true)
    try {
      setTitle('Título generado por IA')
      setDescription('Descripción generada por IA')
      setIcon('')
    } finally {
      setIsGenerating(false)
    }
  }

  function onSubmit() {
    if (!validate()) return
    createCard(
      { type, category: category as CardCategory, title, description, icon: icon as CardIcon, hours },
      { onSuccess: () => navigate('/home') }
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
    errors,
    onGenerate,
    onSubmit,
  }
}