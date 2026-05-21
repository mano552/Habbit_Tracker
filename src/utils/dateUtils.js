import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  addWeeks,
  subWeeks,
  isToday,
  isFuture,
  parseISO,
  differenceInCalendarDays,
  startOfDay,
} from 'date-fns'

// Week starts on Monday (defend: most productivity apps + ISO standard use Mon)
export const getWeekDays = (referenceDate) => {
  const start = startOfWeek(referenceDate, { weekStartsOn: 1 })
  const end = endOfWeek(referenceDate, { weekStartsOn: 1 })
  return eachDayOfInterval({ start, end })
}

export const toKey = (date) => format(date, 'yyyy-MM-dd')

export const getNextWeek = (date) => addWeeks(date, 1)
export const getPrevWeek = (date) => subWeeks(date, 1)

export const isTodayDate = (date) => isToday(date)
export const isFutureDate = (date) => isFuture(startOfDay(date)) && !isToday(date)

export const formatDayLabel = (date) => format(date, 'EEE') // Mon, Tue...
export const formatDayNum = (date) => format(date, 'd')
export const formatMonthYear = (date) => format(date, 'MMMM yyyy')

// Streak: consecutive days checked UP TO AND INCLUDING today
// If today is unchecked, streak still counts up to yesterday (forgiving mode)
export const computeStreak = (checkmarks) => {
  let streak = 0
  let cursor = new Date()

  // Start from today, walk backwards
  for (let i = 0; i < 365; i++) {
    const key = toKey(cursor)
    if (checkmarks[key]) {
      streak++
      cursor = new Date(cursor.getTime() - 86400000)
    } else {
      // Allow one miss only if it's today (forgiving mode)
      if (i === 0) {
        cursor = new Date(cursor.getTime() - 86400000)
        continue
      }
      break
    }
  }
  return streak
}

export const isCurrentWeek = (date) => {
  const todayStart = startOfWeek(new Date(), { weekStartsOn: 1 })
  const refStart = startOfWeek(date, { weekStartsOn: 1 })
  return toKey(todayStart) === toKey(refStart)
}
