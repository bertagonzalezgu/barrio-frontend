import { useState } from 'react'
import axios from 'axios'
import { useCreateCard } from '../../cards/hooks/useCreateCard'
import type { CardCategory } from '../../cards/types/card.types'
import type { AvailabilityFormErrors } from '../types/calendar.types'
import { buildAvailabilityInput } from '../utils/buildAvailabilityInput'
import { getTodayKey } from '../utils/calendarDates'

const GENERIC_ERROR = 'No se ha podido guardar la disponibilidad. Inténtalo de nuevo.'
const MODERATION_ERROR = 'Este contenido no cumple las normas de la comunidad.'

export function useAvailabilityForm(onSaved: () => void) {
  const { mutate: createCard, isPending: isSubmitting } = useCreateCard()
  const minDate = getTodayKey()

  const [category, setCategory] = useState<CardCategory | ''>('')
  const [hours, setHours] = useState('1')
  const [date, setDate] = useState(minDate)
  const [errors, setErrors] = useState<AvailabilityFormErrors>({})
  const [submitError, setSubmitError] = useState<string | null>(null)

  function validate() {
    const next: AvailabilityFormErrors = {}
    const parsedHours = Number(hours)
    if (!category) next.category = 'La categoría es obligatoria'
    if (!Number.isInteger(parsedHours) || parsedHours < 1) next.hours = 'Las horas deben ser un número entero mayor que 0'
    if (!date) next.date = 'La fecha es obligatoria'
    else if (date < minDate) next.date = 'La fecha no puede ser anterior a hoy'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function reset() {
    setCategory('')
    setHours('1')
    setDate(minDate)
    setErrors({})
    setSubmitError(null)
  }

  function onSubmit() {
    if (!validate()) return
    setSubmitError(null)
    createCard(
      buildAvailabilityInput({ category: category as CardCategory, hours: Number(hours), date }),
      {
        onSuccess: () => {
          reset()
          onSaved()
        },
        onError: (error) => {
          const isModeration = axios.isAxiosError(error) && error.response?.status === 422
          setSubmitError(isModeration ? (error.response?.data?.message ?? MODERATION_ERROR) : GENERIC_ERROR)
        },
      }
    )
  }

  return {
    category, setCategory,
    hours, setHours,
    date, setDate,
    minDate,
    errors,
    submitError,
    isSubmitting,
    onSubmit,
  }
}