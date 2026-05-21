import React from 'react'

export default function EmptyState({ onFocus }) {
  return (
    <div className="empty-state" role="status" aria-live="polite">
      <div className="empty-icon" aria-hidden="true">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="8" width="48" height="48" rx="12" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3"/>
          <path d="M24 32h16M32 24v16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      </div>
      <h2 className="empty-title">No habits yet</h2>
      <p className="empty-desc">
        Start building your streak — add your first habit above.<br/>
        Track daily, build momentum.
      </p>
      <button className="empty-cta" onClick={onFocus}>
        Add your first habit →
      </button>
    </div>
  )
}
