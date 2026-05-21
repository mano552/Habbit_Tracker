import React, { useState, useRef, useCallback } from 'react'
import { getWeekDays, getNextWeek, getPrevWeek, computeStreak, isCurrentWeek } from './utils/dateUtils'
import { useHabits } from './hooks/useHabits'
import AddHabitForm from './components/AddHabitForm'
import WeekNav from './components/WeekNav'
import WeekGrid from './components/WeekGrid'
import EmptyState from './components/EmptyState'

export default function App() {
  const [currentWeek, setCurrentWeek] = useState(new Date())
  const weekDays = getWeekDays(currentWeek)
  const inputRef = useRef(null)
  const onThisWeek = isCurrentWeek(currentWeek)

  const {
    habits,
    addHabit,
    renameHabit,
    deleteHabit,
    toggleCheck,
    isChecked,
    getHabitCheckmarks,
  } = useHabits()

  const handlePrev = useCallback(() => setCurrentWeek(d => getPrevWeek(d)), [])
  const handleNext = useCallback(() => {
    // Allow navigating to future weeks but not farther than next week
    setCurrentWeek(d => getNextWeek(d))
  }, [])
  const handleToday = useCallback(() => setCurrentWeek(new Date()), [])

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-icon" aria-hidden="true">◆</span>
            <span className="logo-text">Streaks</span>
          </div>
          <p className="tagline">Daily habits. Weekly view. Real momentum.</p>
        </div>
      </header>

      <main className="app-main">
        <AddHabitForm ref={inputRef} onAdd={addHabit} />

        <div className="tracker-section">
          <WeekNav
            currentWeek={currentWeek}
            onPrev={handlePrev}
            onNext={handleNext}
            onToday={handleToday}
          />

          {habits.length === 0 ? (
            <EmptyState onFocus={() => inputRef.current?.focus()} />
          ) : (
            <WeekGrid
              habits={habits}
              weekDays={weekDays}
              isChecked={isChecked}
              onToggle={toggleCheck}
              getHabitCheckmarks={getHabitCheckmarks}
              computeStreak={computeStreak}
              onRename={renameHabit}
              onDelete={deleteHabit}
            />
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>Built with React · Data stored locally in your browser</p>
      </footer>
    </div>
  )
}
