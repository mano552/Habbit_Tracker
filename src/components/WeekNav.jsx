import React from 'react'
import { formatMonthYear, isCurrentWeek, getWeekDays } from '../utils/dateUtils'
import { format } from 'date-fns'

export default function WeekNav({ currentWeek, onPrev, onNext, onToday }) {
  const isThisWeek = isCurrentWeek(currentWeek)
  const days = getWeekDays(currentWeek)
  const startLabel = format(days[0], 'MMM d')
  const endLabel = format(days[6], 'MMM d, yyyy')

  return (
    <nav className="week-nav" aria-label="Week navigation">
      <button
        className="nav-btn"
        onClick={onPrev}
        aria-label="Previous week"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M11 4L6 9l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <div className="week-label">
        <span className="week-range">{startLabel} – {endLabel}</span>
        {!isThisWeek && (
          <button className="today-btn" onClick={onToday} aria-label="Jump to current week">
            Today
          </button>
        )}
      </div>

      <button
        className="nav-btn"
        onClick={onNext}
        aria-label="Next week"
        aria-disabled={isThisWeek}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </nav>
  )
}
