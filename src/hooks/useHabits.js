import { useState, useCallback } from 'react'
import { toKey } from '../utils/dateUtils'

const STORAGE_KEY = 'habit-tracker-v1'

const load = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : { habits: [], checkmarks: {} }
  } catch {
    return { habits: [], checkmarks: {} }
  }
}

const save = (state) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export const useHabits = () => {
  const [state, setState] = useState(load)

  const updateState = useCallback((updater) => {
    setState((prev) => {
      const next = updater(prev)
      save(next)
      return next
    })
  }, [])

  const addHabit = useCallback((name) => {
    const trimmed = name.trim()
    if (!trimmed) return
    updateState((prev) => ({
      ...prev,
      habits: [
        ...prev.habits,
        { id: crypto.randomUUID(), name: trimmed, createdAt: toKey(new Date()) },
      ],
    }))
  }, [updateState])

  const renameHabit = useCallback((id, name) => {
    const trimmed = name.trim()
    if (!trimmed) return
    updateState((prev) => ({
      ...prev,
      habits: prev.habits.map((h) => (h.id === id ? { ...h, name: trimmed } : h)),
    }))
  }, [updateState])

  const deleteHabit = useCallback((id) => {
    updateState((prev) => {
      // Also remove all checkmarks for this habit
      const newCheckmarks = { ...prev.checkmarks }
      Object.keys(newCheckmarks).forEach((key) => {
        if (key.startsWith(`${id}:`)) delete newCheckmarks[key]
      })
      return {
        habits: prev.habits.filter((h) => h.id !== id),
        checkmarks: newCheckmarks,
      }
    })
  }, [updateState])

  const toggleCheck = useCallback((habitId, date) => {
    const key = `${habitId}:${toKey(date)}`
    updateState((prev) => ({
      ...prev,
      checkmarks: {
        ...prev.checkmarks,
        [key]: !prev.checkmarks[key],
      },
    }))
  }, [updateState])

  const isChecked = useCallback(
    (habitId, date) => {
      return !!state.checkmarks[`${habitId}:${toKey(date)}`]
    },
    [state.checkmarks]
  )

  const getHabitCheckmarks = useCallback(
    (habitId) => {
      const result = {}
      Object.entries(state.checkmarks).forEach(([key, val]) => {
        if (key.startsWith(`${habitId}:`)) {
          const dateKey = key.split(':')[1]
          result[dateKey] = val
        }
      })
      return result
    },
    [state.checkmarks]
  )

  return {
    habits: state.habits,
    addHabit,
    renameHabit,
    deleteHabit,
    toggleCheck,
    isChecked,
    getHabitCheckmarks,
  }
}
