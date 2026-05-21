import React from 'react'
import { formatDayLabel, formatDayNum, isTodayDate } from '../utils/dateUtils'
import HabitRow from './HabitRow'

export default function WeekGrid({ habits, weekDays, isChecked, onToggle, getHabitCheckmarks, computeStreak, onRename, onDelete }) {
  return (
    <div className="week-grid" role="table" aria-label="Weekly habit tracker">
      {/* Header row */}
      <div className="grid-header" role="row">
        <div className="header-habit-col" role="columnheader">Habit</div>
        <div className="header-days" role="presentation">
          {weekDays.map((day) => {
            const today = isTodayDate(day)
            return (
              <div
                key={day.toISOString()}
                className={`header-day ${today ? 'today' : ''}`}
                role="columnheader"
                aria-current={today ? 'date' : undefined}
              >
                <span className="day-label">{formatDayLabel(day)}</span>
                <span className="day-num">{formatDayNum(day)}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Habit rows */}
      <div className="grid-body" role="rowgroup">
        {habits.map((habit) => {
          const checkmarks = getHabitCheckmarks(habit.id)
          const streak = computeStreak(checkmarks)
          return (
            <HabitRow
              key={habit.id}
              habit={habit}
              weekDays={weekDays}
              isChecked={isChecked}
              onToggle={onToggle}
              streak={streak}
              onRename={onRename}
              onDelete={onDelete}
            />
          )
        })}
      </div>
    </div>
  )
}
