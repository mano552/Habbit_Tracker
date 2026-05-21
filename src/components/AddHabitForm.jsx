import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react'

const AddHabitForm = forwardRef(function AddHabitForm({ onAdd }, ref) {
  const [value, setValue] = useState('')
  const inputRef = useRef(null)

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
  }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value.trim()) {
      onAdd(value)
      setValue('')
    }
  }

  return (
    <form className="add-form" onSubmit={handleSubmit} role="search" aria-label="Add new habit">
      <input
        ref={inputRef}
        className="add-input"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="New habit… e.g. Read 30 min, Exercise"
        maxLength={60}
        aria-label="Habit name"
        autoComplete="off"
      />
      <div className="add-actions">
        <button
          className="add-btn"
          type="submit"
          disabled={!value.trim()}
          aria-label="Add habit"
        >
          <span aria-hidden="true">+</span>
        </button>
        <button
          type="button"
          className="browse-btn"
          onClick={() => inputRef.current?.focus()}
          aria-label="Browse habits"
        >
          Browse
        </button>
      </div>
    </form>
  )
})

export default AddHabitForm
