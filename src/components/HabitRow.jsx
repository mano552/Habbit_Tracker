import React, { useState, useRef, useEffect } from 'react'
import { isTodayDate, isFutureDate, formatDayLabel, formatDayNum } from '../utils/dateUtils'

export default function HabitRow({ habit, weekDays, isChecked, onToggle, streak, onRename, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [editVal, setEditVal] = useState(habit.name)
  const [showMenu, setShowMenu] = useState(false)
  const editRef = useRef(null)
  const menuRef = useRef(null)

  useEffect(() => {
    if (editing) editRef.current?.focus()
  }, [editing])

  // Close menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const submitRename = () => {
    if (editVal.trim()) {
      onRename(habit.id, editVal)
    } else {
      setEditVal(habit.name)
    }
    setEditing(false)
  }

  const checkedCount = weekDays.filter(d => isChecked(habit.id, d)).length

  return (
    <div
      className="habit-row"
      role="row"
      aria-label={`${habit.name}, ${checkedCount} of 7 days this week, streak ${streak}`}
    >
      {/* Habit name + controls */}
      <div className="habit-meta">
        <div className="habit-name-wrap">
          {editing ? (
            <input
              ref={editRef}
              className="habit-edit-input"
              value={editVal}
              onChange={e => setEditVal(e.target.value)}
              onBlur={submitRename}
              onKeyDown={e => {
                if (e.key === 'Enter') submitRename()
                if (e.key === 'Escape') { setEditVal(habit.name); setEditing(false) }
              }}
              aria-label={`Rename habit: ${habit.name}`}
              maxLength={60}
            />
          ) : (
            <span
              className="habit-name"
              onDoubleClick={() => setEditing(true)}
              title="Double-click to rename"
            >
              {habit.name}
            </span>
          )}
        </div>

        <div className="habit-controls">
          <div className="streak-badge" aria-label={`${streak} day streak`}>
            <span className="streak-fire" aria-hidden="true">{streak > 0 ? '🔥' : '○'}</span>
            <span className="streak-num">{streak}</span>
          </div>

          <div className="habit-menu-wrap" ref={menuRef}>
            <button
              className="menu-btn"
              onClick={() => setShowMenu(v => !v)}
              aria-haspopup="true"
              aria-expanded={showMenu}
              aria-label={`Options for ${habit.name}`}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <circle cx="8" cy="3" r="1.5"/>
                <circle cx="8" cy="8" r="1.5"/>
                <circle cx="8" cy="13" r="1.5"/>
              </svg>
            </button>
            {showMenu && (
              <div className="habit-menu" role="menu">
                <button
                  role="menuitem"
                  onClick={() => { setEditing(true); setShowMenu(false) }}
                >
                  ✏️ Rename
                </button>
                <button
                  role="menuitem"
                  className="delete-item"
                  onClick={() => { onDelete(habit.id); setShowMenu(false) }}
                >
                  🗑️ Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Day cells */}
      <div className="habit-cells" role="group" aria-label={`${habit.name} checkmarks`}>
        {weekDays.map((day) => {
          const checked = isChecked(habit.id, day)
          const today = isTodayDate(day)
          const future = isFutureDate(day)

          return (
            <button
              key={day.toISOString()}
              className={`cell ${checked ? 'checked' : ''} ${today ? 'today' : ''} ${future ? 'future' : ''}`}
              onClick={() => !future && onToggle(habit.id, day)}
              aria-pressed={checked}
              aria-label={`${habit.name} on ${formatDayLabel(day)} ${formatDayNum(day)}${today ? ' (today)' : ''}${future ? ' (future, disabled)' : ''}`}
              disabled={future}
              tabIndex={future ? -1 : 0}
            >
              {checked && (
                <svg className="check-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M4 10.5l4.5 4.5 7.5-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
