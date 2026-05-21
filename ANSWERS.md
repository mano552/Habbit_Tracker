# ANSWERS.md

---

## 1. How to Run

**Requirements:** Node.js 18+ and npm.

```bash
cd habit-tracker
npm install
npm run dev
```

Open **http://localhost:5173** in your browser.

**Deployed URL:** https://habit-tracker-streak.netlify.app/

No environment variables, no backend. All data lives in `localStorage`.

---

## 2. Stack & Design Choices

**Why React + Vite?**  
React's component model maps naturally to a grid of independent cells where each row owns its state (editing mode, menu open) while the parent owns the data. Vite gives instant HMR for iterating on layout. `date-fns` handles week arithmetic cleanly without a heavy dependency.

**Design Decision 1: Fixed left column + 7 equal day columns in a CSS Grid**  
I used `grid-template-columns: minmax(140px, 2fr) repeat(7, 1fr)` on both the header and every habit row. This keeps the habit name and the day cells perfectly aligned regardless of how many habits you have. On mobile the habit column shrinks to 100px and the cells shrink with it — no horizontal scroll required. The alternative (a table) has worse responsive behavior and harder-to-animate cells.

**Design Decision 2: Lime-green (`#c8f060`) used only for "checked" and "today"**  
Every other element is desaturated dark grey. The accent color has exactly two jobs: highlight today's column (subtle wash) and signal a completed check (full fill). This means your eye is instantly drawn to what's checked vs. what's empty. Stripe-style color economy — color = signal, not decoration. The `box-shadow` glow on today's checked cell rewards hitting today's habit.

**Week starts on Monday** because the ISO week standard (ISO 8601) starts on Monday, and productivity tools aimed at tracking work/life habits frame the week around the working week (Mon–Sun). A Sunday-start week splits the weekend across two visual units, which feels wrong for streak-building.

**Streak counting — forgiving mode:** The streak counts up to and including today. If today is unchecked, the streak counts yesterday and earlier. This means you don't lose your streak the moment you open the app in the morning before completing habits — a common frustration in habit apps. Once you check today, today is included.

---

## 3. Responsive & Accessibility

**360px phone vs. 1440px laptop:**  
- At 360px: the habit column is 100px, cells shrink to ~32px squares, the "Add" button label hides (only the `+` shows), and padding tightens to 10–12px. The full 7-day grid still fits horizontally without scrolling because the grid math is proportional (`repeat(7, 1fr)`).
- At 1440px: the max-width container is 900px centered, giving generous padding on both sides. Font sizes scale up slightly and cells breathe more.

**Accessibility I handled:**  
Every `<button>` cell has `aria-pressed` to announce checked/unchecked state to screen readers, and `aria-label` includes the habit name, day, and whether it's today or disabled. The week nav buttons have descriptive `aria-label` attributes. Focus rings are visible (`outline: 2px solid var(--accent)`) with `:focus-visible` so keyboard users always know where they are. The add form has `role="search"` and the grid uses `role="table"` / `role="row"` / `role="rowgroup"`.

**Accessibility I knowingly skipped:**  
I didn't build a proper live region announcement for when a habit is added (e.g. "Exercise added"). A screen reader user adding a habit gets no spoken confirmation that the row appeared. Fixing this would require an `aria-live="assertive"` status region that announces the habit name after addition — a 20-line addition I cut for time.

---

## 4. AI Usage

I used **Claude** (Anthropic) throughout this project:

**1. Initial grid layout scaffolding:**  
Asked Claude to generate the CSS Grid structure for a habit row where the first column is variable-width and the remaining 7 columns are equal. It gave me `grid-template-columns: 200px repeat(7, 1fr)`. I changed the `200px` fixed column to `minmax(140px, 2fr)` so the habit name column scales fluidly between small and large screens instead of clipping text at narrow widths. On 360px this made the difference between the grid fitting and overflowing.

**2. Streak calculation logic:**  
Asked Claude for a streak-counting function given a `{yyyy-MM-dd: boolean}` checkmarks object. It returned a clean loop but started the cursor at yesterday unconditionally (strict mode). I changed it to start from today and skip today if unchecked (forgiving mode), because penalizing users who open the app first thing in the morning before completing habits is a known UX problem in habit trackers.

**3. LocalStorage persistence hook:**  
Asked for a React hook that persists state to localStorage. Claude gave me a `useEffect` approach that caused a brief flash on load (write after render). I refactored to initialize `useState` with a lazy initializer function `useState(load)` — no effect, no flash.

**4. ARIA attributes for the cell buttons:**  
Asked Claude to suggest the right ARIA for a toggleable cell that is also sometimes disabled. It gave `aria-checked` (appropriate for checkboxes). I changed to `aria-pressed` because the cells are `<button>` elements, not `<input type="checkbox">`, and `aria-pressed` is the correct attribute for toggle buttons per WAI-ARIA authoring practices.

---

## 5. Honest Gap

**The streak badge is purely numerical — no visual history sparkline.**  
Right now the streak shows a flame emoji and a count. If you have a 14-day streak that you broke 3 days ago and rebuilt, you can't see that. A mini sparkline (even a 14-day dot row) next to the streak number would show recent momentum at a glance and make the tracker feel more alive. I'd implement it as a small `<svg>` with circles for each of the last 14 days colored by check status — roughly 40 lines of SVG and a data slice from the checkmarks object. With another day I'd add this and make it the visual centerpiece of each row.
