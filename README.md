# Stories We Carry — Table Topics

A fall-themed React + Vite presentation app for a Toastmasters meeting with the theme **Remembrance** and Word of the Day **Duty**. The interface uses the provided palette: Wheat `#F5DFBB`, Dark Cyan `#0E9594`, Stormy Teal `#11686A`, Fiery Terracotta `#F2542B`, and Espresso `#562C2C`.

## Run it

1. Install Node.js 18+.
2. Open this folder in VS Code or Cursor.
3. Open a terminal and run:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

## Features

- **Welcome**, **Topic cards**, **Word of the day**, and **Host notes** tabs.
- 12 editable Table Topics questions with category filters.
- Draw random **unused** questions, reveal prompts, mark them complete, and reset the deck.
- Optional speaker name and speaking timer, with 1:00/1:30/2:00 visual signals.
- A quick script for introducing and concluding the Table Topics segment.
- Responsive layout for desktop and mobile.

## Customize

- Edit the `QUESTIONS` list in `src/main.jsx` for your own prompts.
- Update the copy under the Welcome, Word, and Host notes tabs.
- Edit the hex colors in `src/styles.css`.
- All state is local to the running page and resets when refreshed. No data is collected or sent to a server.
- This uses a Google Fonts stylesheet for Playfair Display and DM Sans; if offline, the browser will use fallback fonts.

**Note:** If you're hosting during a formal Tall Tales Contest, check with the contest chair whether there's a Table Topics portion on the agenda. Some remembrance-themed questions may evoke difficult feelings; participants can always choose a different prompt.
