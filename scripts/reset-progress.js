#!/usr/bin/env node

/**
 * Reset User Progress Script
 * Clears all AsyncStorage data for the EnglishFlow app
 */

const fs = require('fs');
const path = require('path');

console.log('🔄 Resetting EnglishFlow progress...\n');

const STORAGE_KEYS = [
  '@englishflow:user_progress',
  '@englishflow:daily_activities',
  '@englishflow:vocabulary_srs',
];

// AsyncStorage in React Native Web stores data in localStorage
// We need to clear the specific keys

const resetInstructions = `
To reset your progress completely:

OPTION 1: Use the app (Easiest)
------------------------------
1. Open the app
2. Tap ☰ (hamburger menu)
3. Tap "Settings" ⚙️
4. Scroll to "Data" section
5. Tap "Reset Progress" (red text)
6. Confirm the reset

OPTION 2: Clear browser storage
---------------------------------
1. Open the app in your browser
2. Press F12 (or right-click → Inspect)
3. Go to "Application" tab
4. Click "Local Storage" on the left
5. Click on "http://localhost:8081"
6. Find and delete these keys:
   - @englishflow:user_progress
   - @englishflow:daily_activities
   - @englishflow:vocabulary_srs
7. Refresh the page (F5)

OPTION 3: Clear all browser data
----------------------------------
In Chrome/Edge:
- Press Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)
- Select "Cached images and files" and "Cookies and site data"
- Click "Clear data"
- Refresh the app

The app will start fresh with:
✅ 0 XP
✅ Level 1
✅ 0 day streak
✅ No completed lessons
✅ No learned vocabulary
`;

console.log(resetInstructions);

console.log('\n✨ After resetting, your app will show:');
console.log('   - Progress: 0%');
console.log('   - XP: 0 / 100 XP to Level 2');
console.log('   - Level: 1');
console.log('   - Streak: 0 days\n');
