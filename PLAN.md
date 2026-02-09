# EnglishFlow - English Learning Web App
## Complete Implementation Plan (v2 - Definitive)

---

## 1. Project Overview

**App Name**: EnglishFlow
**Tagline**: "Learn English your way — for work, for life."

A web app designed for a Brazilian software developer working at a Canadian company (Edvisor.io), with two learning modes:
1. **Tech Mode** - Professional English for software engineers
2. **Life Mode** - Day-to-day English for living in an English-speaking country

### Target User Profile
- **Name**: Nicholas (primary user)
- **Native language**: Brazilian Portuguese (PT-BR)
- **English level**: Intermediate (B1-B2 CEFR)
- **Profession**: Software developer at Edvisor.io (Canada, remote)
- **Primary needs**:
  - Bigger vocabulary for meetings and technical discussions
  - Confidence in code reviews and standups
  - Updated tech terminology
  - Day-to-day living expressions for North America

### Core Design Philosophy
- **Offline-first**: Everything works without internet
- **Micro-learning**: Sessions of 5-15 minutes
- **Spaced Repetition**: Science-backed memory retention
- **Context over isolation**: Words taught in real scenarios, never in isolation
- **Brazilian-aware**: Addresses specific PT-BR speaker challenges
- **Fun**: Gamification to build daily habits

### iOS-Inspired Design System
**Philosophy**: Clean, minimal, intuitive — following iOS Human Interface Guidelines for a native app feel.

**Key Principles**:
- **Clarity**: Large, easy-to-read text (17px body, iOS standard)
- **Simplicity**: Remove clutter, focus on content
- **Depth**: Subtle shadows and layers, not heavy 3D effects
- **Consistency**: Follow iOS patterns users already know
- **Touch-optimized**: 44pt minimum tap targets

**Color System**:
- **Primary Blue**: #007AFF (iOS system blue) — for actions and Tech mode
- **Success Green**: #34C759 (iOS system green) — for Life mode and success states
- **Error Red**: #FF3B30 (iOS system red) — for mistakes
- **Warning Orange**: #FF9500 (iOS system orange) — for warnings
- **Neutral Grays**: #F2F2F7 (background), #8E8E93 (secondary text)

**Typography** (iOS scale):
- Large Title: 34px/41px bold
- Title 2: 28px/34px bold
- Title 3: 22px/28px semibold
- Body: 17px/22px regular (iOS default)
- Footnote: 13px/18px regular
- Caption: 11px/16px regular

**Spacing** (8px grid):
- xs: 4px, sm: 8px, md: 12px, lg: 16px, xl: 20px

**Components**:
- Cards: White background, 10px border radius, subtle shadow
- Buttons: 44px minimum height, rounded corners, clear labels
- Progress bars: Thin (4px), rounded ends, solid colors
- Badges: Compact, rounded, minimal

---

## 2. Research-Backed Learning Methods

### 2.1 Spaced Repetition System (SRS) — SM-2 Algorithm
The core memory engine. Words are reviewed at increasing intervals based on how well you remember them.

**SM-2 Formula:**
```
IF quality < 3 (failed):
  interval = 1 day
  repetitions = 0
  easeFactor = unchanged

IF quality >= 3 (passed):
  IF repetitions == 0: interval = 1
  IF repetitions == 1: interval = 6
  IF repetitions >= 2: interval = previous_interval * easeFactor

easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
easeFactor = max(1.3, easeFactor)
```

**Quality ratings (user sees simplified version):**
| Internal Score | Button Label | Color  | Meaning |
|---------------|-------------|--------|---------|
| 0             | "Again"     | Red    | Didn't know it at all |
| 3             | "Hard"      | Orange | Remembered with difficulty |
| 4             | "Good"      | Green  | Remembered correctly |
| 5             | "Easy"      | Blue   | Knew it instantly |

### 2.2 Comprehensible Input
- Every word/phrase appears inside a realistic sentence
- Tech Mode: sentences from code reviews, standups, meetings
- Life Mode: sentences from real conversations, restaurant orders, etc.
- Always i+1 (slightly above current level)

### 2.3 Active Recall
- User must produce the answer (type it, say it), not just recognize it
- Multiple exercise types force different recall pathways
- "Desirable difficulty" — making it slightly hard improves retention

### 2.4 Gamification
- Daily streaks build habit (proven by Duolingo's model)
- XP and levels provide progression feeling
- Achievements reward milestones
- Daily goals provide structure

### 2.5 Brazilian PT-Specific Support
- **Pronunciation alerts**: Flag words with TH, final L, D/T sounds
- **False cognates warnings**: "actually" != "atualmente", "pretend" != "pretender"
- **Think in English**: Exercises that prevent mental translation
- **Common mistakes**: Preposition errors, article misuse, verb tense confusion

---

## 3. Design System

### 3.1 Color Palette

```
// Brand colors
primary:          #6C5CE7   // Purple (main brand)
primaryLight:     #A29BFE   // Light purple
primaryDark:      #4834D4   // Dark purple

// Tech Mode
techPrimary:      #0984E3   // Blue
techLight:        #74B9FF   // Light blue
techDark:         #0652DD   // Dark blue
techBg:           #F0F8FF   // Alice blue background

// Life Mode
lifePrimary:      #00B894   // Green
lifeLight:        #55EFC4   // Light green
lifeDark:         #00896B   // Dark green
lifeBg:           #F0FFF4   // Mint background

// Semantic
success:          #00B894   // Green
error:            #FF6B6B   // Red
warning:          #FDCB6E   // Yellow
info:             #74B9FF   // Blue

// Neutrals
gray50:           #FAFAFA
gray100:          #F5F5F5
gray200:          #EEEEEE
gray300:          #E0E0E0
gray400:          #BDBDBD
gray500:          #9E9E9E
gray600:          #757575
gray700:          #616161
gray800:          #424242
gray900:          #212121

// XP & Gamification
xpGold:           #F9CA24   // Gold for XP
streakOrange:     #FF6348   // Streak fire color
badgeBronze:      #CD7F32
badgeSilver:      #C0C0C0
badgeGold:        #FFD700

// Dark mode
darkBg:           #1A1A2E
darkSurface:      #16213E
darkCard:         #0F3460
darkText:         #E8E8E8
```

### 3.2 Typography

```
// Font family (use system fonts, load Inter as primary)
fontFamily:       'Inter' (load via expo-google-fonts)
fontFamilyMono:   'JetBrains Mono' (for code examples in Tech Mode)

// Scale
h1:    32px, bold (700), lineHeight: 40px    // Screen titles
h2:    24px, bold (700), lineHeight: 32px    // Section headers
h3:    20px, semibold (600), lineHeight: 28px // Card titles
body:  16px, regular (400), lineHeight: 24px  // Default text
bodySmall: 14px, regular (400), lineHeight: 20px // Secondary text
caption: 12px, medium (500), lineHeight: 16px // Labels, badges
```

### 3.3 Spacing Scale
```
xs:   4px
sm:   8px
md:   16px
lg:   24px
xl:   32px
2xl:  48px
3xl:  64px
```

### 3.4 Border Radius
```
sm:   8px     // Buttons, badges
md:   12px    // Cards
lg:   16px    // Modal, large cards
xl:   24px    // Pills, rounded elements
full: 9999px  // Circles (avatars, icons)
```

### 3.5 Shadows
```
sm:   0 1px 2px rgba(0,0,0,0.05)    // Subtle
md:   0 4px 6px rgba(0,0,0,0.07)    // Cards
lg:   0 10px 15px rgba(0,0,0,0.1)   // Elevated cards, modals
```

### 3.6 Component Specs

**Button sizes:**
- Small: height 36px, padding 12px horizontal, font 14px
- Medium: height 44px, padding 16px horizontal, font 16px (default)
- Large: height 52px, padding 20px horizontal, font 18px

**Card:**
- Padding: 16px
- Border radius: 12px
- Shadow: md
- Border: 1px solid gray200 (light) / darkCard border (dark)

**Flashcard:**
- Width: 100% (max 400px)
- Height: 260px
- Border radius: 16px
- Flip animation: 300ms ease-in-out rotateY(180deg)

---

## 4. Complete Data Models (TypeScript Interfaces)

```typescript
// ===== USER & PROGRESS =====

interface User {
  id: string;
  name: string;
  nativeLanguage: 'pt-br';
  englishLevel: 'beginner' | 'intermediate' | 'advanced';
  currentMode: 'tech' | 'life';
  dailyGoalMinutes: 5 | 10 | 15;
  createdAt: string; // ISO date
  settings: UserSettings;
}

interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  soundEnabled: boolean;
  hapticEnabled: boolean;
  notificationsEnabled: boolean;
  notificationTime: string; // "09:00"
  showPortuguese: boolean; // Show PT translations by default
  autoPlayAudio: boolean;
}

interface UserStats {
  totalXP: number;
  currentLevel: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string; // ISO date (YYYY-MM-DD)
  streakFreezeAvailable: boolean;
  streakFreezeUsedThisWeek: boolean;
  totalWordsLearned: number;
  totalLessonsCompleted: number;
  totalReviewSessions: number;
  totalMinutesLearned: number;
  weeklyXP: number[];  // Last 7 days XP [Mon, Tue, ...]
  monthlyXP: number[]; // Last 30 days XP
  accuracyRate: number; // 0-100 percentage
}

// ===== CONTENT =====

interface Category {
  id: string;
  mode: 'tech' | 'life';
  title: string;
  titlePT: string; // Portuguese title
  description: string;
  descriptionPT: string;
  icon: string; // Emoji or icon name
  color: string; // Hex color
  order: number; // Display order
  totalLessons: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface Lesson {
  id: string;
  categoryId: string;
  mode: 'tech' | 'life';
  title: string;
  titlePT: string;
  description: string;
  descriptionPT: string;
  order: number;
  xpReward: number; // XP earned on completion
  estimatedMinutes: number; // 5, 10, or 15
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  vocabularyItems: VocabularyItem[];
  exercises: Exercise[];
  culturalTip?: string; // Optional cultural context tip
  brazilianTip?: string; // Optional PT-BR specific tip
}

interface VocabularyItem {
  id: string;
  word: string; // English word or phrase
  translation: string; // PT-BR translation
  pronunciation: string; // IPA or simplified pronunciation guide
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb' | 'phrase' | 'idiom' | 'abbreviation';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  contextSentence: string; // Example sentence in English
  contextSentencePT: string; // Translation of example sentence
  contextSentenceHighlight: [number, number]; // Start/end index of the word in contextSentence
  alternativeMeanings?: string[]; // Other possible translations
  commonMistake?: string; // Common mistake Brazilians make with this word
  pronunciationTip?: string; // Specific tip for PT-BR speakers
  isFalseCognate?: boolean;
  falseCognateNote?: string; // e.g., "Looks like 'pretender' but means 'fingir'"
  tags: string[]; // e.g., ["meeting", "formal", "slang"]
  audioUrl?: string; // Future: link to audio file
  relatedWords?: string[]; // IDs of related vocabulary items
}

// ===== EXERCISES =====

type Exercise =
  | FillInBlankExercise
  | MatchPairsExercise
  | TranslateSentenceExercise
  | MultipleChoiceExercise
  | ListenAndTypeExercise
  | UnscrambleExercise;

interface FillInBlankExercise {
  type: 'fill-in-blank';
  id: string;
  sentence: string; // "I'm _____ on the authentication bug."
  sentencePT: string; // Portuguese translation of full sentence
  blank: string; // The correct answer: "working"
  hint?: string; // Optional hint: "w_____g"
  acceptedAnswers: string[]; // ["working", "Working"]
  xpReward: number;
}

interface MatchPairsExercise {
  type: 'match-pairs';
  id: string;
  instruction: string; // "Match the English phrases with their meanings"
  pairs: Array<{
    english: string;
    portuguese: string;
  }>;
  xpReward: number;
}

interface TranslateSentenceExercise {
  type: 'translate-sentence';
  id: string;
  direction: 'en-to-pt' | 'pt-to-en';
  sentence: string; // The sentence to translate
  correctTranslation: string; // The expected translation
  acceptedAlternatives: string[]; // Other valid translations
  xpReward: number;
}

interface MultipleChoiceExercise {
  type: 'multiple-choice';
  id: string;
  question: string; // "What does 'LGTM' mean?"
  questionPT?: string;
  options: string[];
  correctIndex: number;
  explanation: string; // Shown after answering
  explanationPT: string;
  xpReward: number;
}

interface ListenAndTypeExercise {
  type: 'listen-and-type';
  id: string;
  word: string; // The word to listen and type
  sentence: string; // Context sentence spoken aloud
  acceptedAnswers: string[];
  xpReward: number;
}

interface UnscrambleExercise {
  type: 'unscramble';
  id: string;
  correctSentence: string; // "Let me share my screen"
  scrambledWords: string[]; // ["screen", "share", "Let", "my", "me"]
  xpReward: number;
}

// ===== SRS / REVIEW =====

interface SRSCard {
  id: string;
  vocabularyItemId: string;
  mode: 'tech' | 'life';
  // SM-2 fields
  repetitions: number; // Number of successful reviews
  easeFactor: number; // Starts at 2.5, min 1.3
  interval: number; // Days until next review
  nextReviewDate: string; // ISO date
  lastReviewDate: string; // ISO date
  // Stats
  totalReviews: number;
  correctReviews: number;
  masteryLevel: 'new' | 'learning' | 'reviewing' | 'mastered';
}

// Mastery levels explained:
// new       = Never reviewed (0 successful reviews)
// learning  = 1-2 successful reviews (interval < 7 days)
// reviewing = 3+ successful reviews (interval 7-30 days)
// mastered  = 5+ successful reviews AND interval >= 30 days

interface ReviewSession {
  id: string;
  mode: 'tech' | 'life';
  startedAt: string;
  completedAt?: string;
  cardsReviewed: number;
  cardsCorrect: number;
  cardsIncorrect: number;
  xpEarned: number;
  durationSeconds: number;
}

// ===== PROGRESS =====

interface LessonProgress {
  lessonId: string;
  status: 'locked' | 'available' | 'in-progress' | 'completed';
  completedAt?: string;
  bestScore?: number; // 0-100 percentage
  attempts: number;
  xpEarned: number;
}

// ===== ACHIEVEMENTS =====

interface Achievement {
  id: string;
  title: string;
  titlePT: string;
  description: string;
  descriptionPT: string;
  icon: string;
  category: 'streak' | 'vocabulary' | 'lessons' | 'review' | 'special';
  requirement: number; // e.g., 7 for "7-day streak"
  xpReward: number;
  unlockedAt?: string; // ISO date, undefined if not unlocked
}
```

---

## 5. XP & Gamification System

### 5.1 XP Rewards
| Action | XP Earned |
|--------|-----------|
| Complete a lesson (first time) | 50 XP |
| Complete a lesson (repeat) | 20 XP |
| Review a card correctly (Easy) | 15 XP |
| Review a card correctly (Good) | 10 XP |
| Review a card correctly (Hard) | 5 XP |
| Review a card incorrectly | 0 XP |
| Complete daily goal | 25 XP bonus |
| Maintain streak (per day) | 10 XP |
| Fill-in-blank correct | 10 XP |
| Match pairs complete | 15 XP |
| Translate sentence correct | 15 XP |
| Multiple choice correct | 5 XP |
| Listen and type correct | 10 XP |
| Unscramble correct | 10 XP |

### 5.2 Level Progression
| Level | Title | Total XP Required | XP to Next |
|-------|-------|-------------------|------------|
| 1 | Beginner | 0 | 100 |
| 2 | Starter | 100 | 200 |
| 3 | Learner | 300 | 300 |
| 4 | Explorer | 600 | 400 |
| 5 | Builder | 1,000 | 500 |
| 6 | Speaker | 1,500 | 700 |
| 7 | Thinker | 2,200 | 900 |
| 8 | Achiever | 3,100 | 1,200 |
| 9 | Fluent | 4,300 | 1,500 |
| 10 | Master | 5,800 | 2,000 |
| 11 | Expert | 7,800 | 2,500 |
| 12 | Legend | 10,300 | -- |

**Formula**: `level = floor(sqrt(totalXP / 50)) + 1` capped at 12
(Approximate — use the table above as the source of truth)

### 5.3 Streak System
- **Streak increments**: When user completes at least 1 review or lesson in a calendar day
- **Streak resets**: When a full calendar day passes with no activity (midnight to midnight, user's timezone)
- **Streak freeze**: 1 available per week (resets Monday). Automatically used if a day is missed. Does NOT count as an active day (no XP).
- **Streak milestones**: 3, 7, 14, 30, 60, 100, 365 days — each triggers a celebration + bonus XP

| Streak Milestone | Bonus XP | Achievement Unlocked |
|-----------------|----------|---------------------|
| 3 days | 25 | "Getting Started" |
| 7 days | 50 | "One Week Strong" |
| 14 days | 100 | "Two Weeks In" |
| 30 days | 200 | "Monthly Master" |
| 60 days | 400 | "Dedicated Learner" |
| 100 days | 750 | "Century Club" |
| 365 days | 2000 | "Year of English" |

### 5.4 Achievements (Complete List)

**Streak achievements:**
- "Getting Started" — 3-day streak
- "One Week Strong" — 7-day streak
- "Two Weeks In" — 14-day streak
- "Monthly Master" — 30-day streak
- "Dedicated Learner" — 60-day streak
- "Century Club" — 100-day streak
- "Year of English" — 365-day streak

**Vocabulary achievements:**
- "First Word" — Learn 1 word
- "Vocabulary Builder" — Learn 25 words
- "Word Collector" — Learn 50 words
- "Dictionary" — Learn 100 words
- "Walking Encyclopedia" — Learn 250 words
- "Lexicon Master" — Learn 500 words

**Lesson achievements:**
- "First Steps" — Complete 1 lesson
- "Dedicated Student" — Complete 10 lessons
- "Course Complete" — Complete all lessons in a category
- "Tech Expert" — Complete all Tech Mode lessons
- "Life Expert" — Complete all Life Mode lessons
- "Dual Master" — Complete all lessons in both modes

**Review achievements:**
- "First Review" — Complete 1 review session
- "Regular Reviewer" — Complete 25 review sessions
- "Memory Machine" — 100% accuracy in a 20+ card session
- "Streak Reviewer" — Review every day for 7 days straight

**Special achievements:**
- "Night Owl" — Study after 10 PM
- "Early Bird" — Study before 7 AM
- "Speed Demon" — Complete a lesson in under 3 minutes
- "Perfectionist" — Score 100% on a lesson quiz

---

## 6. Complete Screen Specifications

### 6.1 Onboarding Flow (First Launch Only)

**Screen: Welcome**
- App logo + "EnglishFlow" title
- Tagline: "Learn English your way"
- "Get Started" button
- Language shown in PT-BR for comfort

**Screen: Name Input**
- "What's your name?" (in PT-BR and EN)
- Text input field
- "Continue" button

**Screen: English Level Assessment**
- "How would you rate your English?" (PT-BR and EN)
- 3 cards to choose:
  - Beginner: "I know basic words and phrases" / "Sei palavras e frases basicas"
  - Intermediate: "I can have simple conversations" / "Consigo ter conversas simples"
  - Advanced: "I want to polish and expand" / "Quero polir e expandir"

**Screen: Mode Selection**
- "What would you like to focus on?"
- Two large cards:
  - Tech Mode card (blue): icon + title + "For your career" description
  - Life Mode card (green): icon + title + "For daily life" description
- "You can switch anytime" note at bottom

**Screen: Daily Goal**
- "How much time per day?"
- 3 options: 5 min (casual), 10 min (regular), 15 min (serious)
- Each shows estimated words/week

**Screen: Ready!**
- Celebration animation
- "You're all set! Let's learn your first words."
- "Start Learning" button

### 6.2 Home Screen (Mode Selection)

**When**: After onboarding, this is the app entry point.

**Layout:**
- Top: Greeting "Good morning, Nicholas!" (time-based)
- Stats bar: Streak fire icon + count | XP count | Level badge
- Two large mode cards stacked vertically:
  - **Tech Mode Card** (blue gradient):
    - Icon: laptop emoji or custom
    - "Tech English"
    - "For your career at Edvisor"
    - Progress bar: "12/48 lessons completed"
    - "3 cards to review" badge (if any due)
  - **Life Mode Card** (green gradient):
    - Icon: globe emoji or custom
    - "Life English"
    - "For your daily life"
    - Progress bar: "5/40 lessons completed"
    - "7 cards to review" badge (if any due)
- Bottom: Quick action: "Review now (X cards due)" button if any reviews pending

### 6.3 Mode Dashboard (Tech or Life)

**Layout:**
- Top header: Mode title + back arrow to home
- Stats row: Words learned | Lessons done | Accuracy %
- **"Review Now" section** (if cards due):
  - Card showing: "You have X cards to review"
  - "Start Review" button (prominent)
  - Estimated time: "~5 minutes"
- **"Continue Learning" section**:
  - Current/next lesson card with progress
  - "Continue" button
- **"Categories" section**:
  - Scrollable list of category cards
  - Each shows: icon, title, progress (X/Y lessons), lock icon if not yet available

### 6.4 Lessons List Screen

**Layout:**
- Category title + back arrow
- Category description (1 line)
- Difficulty badge
- Vertical list of lesson cards:
  - Each card shows: lesson number, title, estimated time, difficulty dots
  - States: locked (gray, lock icon), available (colored border), completed (checkmark, green)
  - Locked lessons show: "Complete previous lesson to unlock"

**Lesson Unlocking Logic:**
- First lesson in each category is always available
- Subsequent lessons unlock when the previous one is completed
- User can go back and redo completed lessons

### 6.5 Lesson Screen (The Core Learning Experience)

**Flow: Introduction Phase**
1. Lesson title + "X new words" count
2. For each vocabulary item (one at a time):
   a. Show the English word/phrase (large text)
   b. Show pronunciation guide below
   c. "Hear it" button (TTS)
   d. Show PT-BR translation
   e. Show context sentence with the word highlighted
   f. Show PT-BR translation of context sentence
   g. If has commonMistake: show yellow tip box
   h. If isFalseCognate: show red warning box
   i. "Next" button to move to next word
3. Progress bar at top showing current word / total words

**Flow: Practice Phase (after all words introduced)**
4. Show 4-6 exercises using the lesson's vocabulary
5. Mix of exercise types (see section 7)
6. After each exercise: show correct/incorrect feedback + explanation
7. XP animation for correct answers

**Flow: Completion Phase**
8. "Lesson Complete!" celebration screen
9. Show score: X/Y correct (percentage)
10. Show XP earned (with animation)
11. Show words added to review queue
12. "Continue" button -> back to lessons list
13. If first completion: unlock next lesson

### 6.6 Review Session Screen

**Entry:**
- Shows number of due cards and estimated time
- "Start Review" button

**During review (per card):**
1. Show English word/phrase (front of card)
2. User taps "Show Answer" or swipes up
3. Card flips to reveal:
   - PT-BR translation
   - Context sentence
   - Pronunciation
4. User rates: Again (red) | Hard (orange) | Good (green) | Easy (blue)
5. SRS algorithm updates the card's next review date
6. Progress bar: "Card X of Y"
7. XP animation for correct ratings (Hard/Good/Easy)

**Completion:**
- Session summary card:
  - Cards reviewed: X
  - Correct: X (percentage)
  - XP earned: X
  - Time spent: X minutes
  - Next review: "X cards due tomorrow"
- "Done" button -> back to dashboard

### 6.7 Practice Screen (Free Practice)

**Layout:**
- Choose exercise type or "Mix" (random)
- Choose vocabulary source:
  - "All learned words"
  - Specific category
  - "Weakest words" (lowest accuracy)
  - "Recently learned" (last 7 days)
- "Start Practice" button
- During practice: same exercise flow as lessons

### 6.8 Vocabulary Screen (Word Bank)

**Layout:**
- Search bar at top
- Filter chips: All | New | Learning | Reviewing | Mastered
- Sort by: Recently added | Alphabetical | Difficulty | Accuracy
- Vocabulary list (scrollable):
  - Each item shows: word, translation, mastery level dot (color), accuracy %
  - Tap to expand: full details, context sentence, pronunciation, tips
  - "Practice this word" button on expanded view
- Stats at top: "X words total | X mastered | X to review today"

### 6.9 Profile Screen

**Layout:**
- User avatar (default: initials circle) + name + level badge
- XP progress bar to next level: "Level X - 230/500 XP to Level X+1"
- Stats grid (2x3):
  - Total XP | Current streak | Words learned
  - Lessons done | Review accuracy | Time spent
- Weekly activity chart (bar chart, 7 days)
- Achievements section:
  - Grid of achievement badges (unlocked = colored, locked = gray)
  - Tap badge for details
- "Edit Profile" button

### 6.10 Settings Screen

**Layout:**
- Sections:

**Learning:**
- Daily goal: 5 / 10 / 15 minutes (picker)
- Default mode: Tech / Life (toggle)
- Show Portuguese translations: on/off
- Auto-play audio: on/off

**Appearance:**
- Theme: Light / Dark / System
- (Future: Font size)

**Sound & Haptics:**
- Sound effects: on/off
- Haptic feedback: on/off

**Notifications:**
- Daily reminder: on/off
- Reminder time: time picker (default 9:00 AM)

**Data:**
- Reset progress (with confirmation modal)
- Export data (future)

**About:**
- Version number
- "Made with love in Brazil"

### 6.11 Empty States

| Screen | Empty State Message | CTA |
|--------|-------------------|-----|
| Review (no due cards) | "All caught up! No cards to review." + celebration icon | "Learn new words" button |
| Vocabulary (no words) | "Your word bank is empty. Complete a lesson to start building it!" | "Go to Lessons" button |
| Achievements (none) | "Complete lessons and reviews to earn achievements!" | "Start Learning" button |
| Search (no results) | "No words found for '[query]'. Try a different search." | -- |
| Practice (no words) | "Learn some words first before practicing!" | "Go to Lessons" button |

### 6.12 Error States

| Scenario | Behavior |
|----------|----------|
| TTS fails | Show toast: "Audio not available" — continue without audio |
| Storage full | Show modal: "Storage is full. Consider exporting your data." |
| App crash | On relaunch, restore from last saved state |
| Corrupted data | Detect via checksum, offer reset with warning |

---

## 7. Exercise Types - Detailed Specs

### 7.1 Fill in the Blank
- **Display**: Sentence with `_____` in place of the target word
- **Input**: Text input field below sentence
- **Hint button**: Reveals first and last letter (costs 2 XP)
- **Validation**: Case-insensitive, trim whitespace, check against acceptedAnswers array
- **Feedback correct**: Green highlight on blank, +10 XP animation
- **Feedback incorrect**: Red highlight, show correct answer, show explanation
- **Example**: "I need to _____ with the backend team about the API." → "sync"

### 7.2 Match Pairs
- **Display**: Two columns — English words on left, PT-BR translations on right (shuffled)
- **Interaction**: Tap one from left, then tap match from right
- **Matched pairs**: Fade out with green animation
- **Wrong match**: Red shake animation, both deselect
- **Completion**: When all pairs matched
- **Pair count**: 4-6 pairs per exercise
- **XP**: 15 XP for completing all pairs

### 7.3 Translate Sentence
- **Display**: Sentence in source language (EN or PT)
- **Input**: Text input for translation
- **Validation**: Fuzzy match (allow minor spelling errors, accept multiple valid translations)
- **Feedback**: Show best matching accepted translation
- **Direction alternates**: Sometimes EN->PT, sometimes PT->EN
- **XP**: 15 XP

### 7.4 Multiple Choice
- **Display**: Question + 4 options (buttons)
- **Interaction**: Tap one option
- **Feedback correct**: Selected turns green, +5 XP
- **Feedback incorrect**: Selected turns red, correct turns green, show explanation
- **XP**: 5 XP (lower because easier than recall)

### 7.5 Listen and Type
- **Display**: Speaker icon + "Listen and type what you hear"
- **Auto-play**: TTS speaks the word/phrase
- **Replay button**: Tap to hear again (unlimited replays)
- **Input**: Text input
- **Validation**: Case-insensitive, check against acceptedAnswers
- **XP**: 10 XP

### 7.6 Unscramble Sentence
- **Display**: Word tiles in random order
- **Interaction**: Tap tiles in correct order (they move to answer area)
- **Tap to remove**: Tap a placed tile to send it back
- **Validation**: Check against correctSentence
- **Hint**: After 30 seconds, highlight the first word
- **XP**: 10 XP

---

## 8. Complete Content Plan

### 8.1 Tech Mode Categories & Lessons

**Category 1: Daily Standups** (icon: "stand-up meeting" / microphone)
- Lesson 1: "Sharing Your Status" (what you did, what you'll do)
- Lesson 2: "Talking About Blockers" (problems, dependencies)
- Lesson 3: "Sprint & Agile Terminology" (sprint, backlog, velocity)
- Lesson 4: "Asking for Help" (pairing, requesting help politely)
- Lesson 5: "Time Estimates & Planning" (story points, capacity)

**Category 2: Code Reviews** (icon: code brackets)
- Lesson 1: "Giving Feedback Politely" (suggest, consider, nit)
- Lesson 2: "Common Abbreviations" (LGTM, PTAL, WIP, NACK)
- Lesson 3: "Describing Code Issues" (bug, edge case, regression)
- Lesson 4: "Suggesting Improvements" (refactor, optimize, simplify)
- Lesson 5: "Responding to Feedback" (good catch, will fix, makes sense)

**Category 3: Meetings & Calls** (icon: video camera)
- Lesson 1: "Meeting Basics" (Can you hear me? Let me share my screen)
- Lesson 2: "Presenting Ideas" (I'd like to propose, what if we...)
- Lesson 3: "Agreeing & Disagreeing" (I see your point, I have concerns)
- Lesson 4: "Action Items & Follow-ups" (let's circle back, action item)
- Lesson 5: "Technical Discussions" (trade-offs, scalability, architecture)
- Lesson 6: "Handling Miscommunication" (Could you repeat that? What do you mean by...)

**Category 4: Slack & Email** (icon: chat bubble)
- Lesson 1: "Common Acronyms" (FYI, ETA, OOO, TL;DR, AFK, ASAP)
- Lesson 2: "Professional Tone" (heads up, for context, just a reminder)
- Lesson 3: "Asking Questions" (quick question, do you have a minute?)
- Lesson 4: "Status Updates" (shipped, deployed, merged, rolled back)
- Lesson 5: "Polite Requests" (would you mind, could you please, when you get a chance)

**Category 5: Technical Vocabulary** (icon: wrench/gear)
- Lesson 1: "Frontend Terms" (render, component, state, props, hook)
- Lesson 2: "Backend Terms" (endpoint, middleware, payload, schema)
- Lesson 3: "DevOps & Infra" (deploy, pipeline, container, cluster)
- Lesson 4: "Database Terms" (query, migration, index, seed)
- Lesson 5: "Security Terms" (auth, token, encryption, vulnerability)
- Lesson 6: "Architecture Terms" (microservice, monolith, API gateway)

**Category 6: Career Growth** (icon: rocket)
- Lesson 1: "Job Interview Questions" (tell me about yourself, strengths)
- Lesson 2: "Describing Experience" (I led, I implemented, I collaborated)
- Lesson 3: "Salary & Benefits" (compensation, equity, PTO, benefits)
- Lesson 4: "Performance Reviews" (feedback, goals, growth areas)
- Lesson 5: "Networking" (nice to connect, I'd love to learn more)

**Tech Mode Total: 6 categories, 32 lessons, ~320 vocabulary items**

### 8.2 Life Mode Categories & Lessons

**Category 1: Greetings & Small Talk** (icon: waving hand)
- Lesson 1: "Meeting People" (nice to meet you, how's it going?)
- Lesson 2: "Common Greetings" (what's up, hey there, good to see you)
- Lesson 3: "Small Talk Topics" (weather, weekend, sports, hobbies)
- Lesson 4: "Saying Goodbye" (take care, see you around, catch you later)
- Lesson 5: "Compliments & Reactions" (that's awesome, no way, seriously?)

**Category 2: At the Restaurant** (icon: fork and knife)
- Lesson 1: "Getting a Table" (table for two, reservation, wait time)
- Lesson 2: "Ordering Food" (I'll have the, could I get, on the side)
- Lesson 3: "Special Requests" (allergies, substitutions, vegan/gluten-free)
- Lesson 4: "Paying the Bill" (check please, split the bill, tip)
- Lesson 5: "Coffee Shop" (latte, cold brew, for here or to go)

**Category 3: Shopping & Groceries** (icon: shopping bag)
- Lesson 1: "At the Store" (where can I find, aisle, checkout)
- Lesson 2: "Clothing Shopping" (size, fit, try on, return policy)
- Lesson 3: "Grocery Shopping" (organic, on sale, expiration date)
- Lesson 4: "Online Shopping" (shipping, tracking, refund, coupon)

**Category 4: Getting Around** (icon: car/map)
- Lesson 1: "Asking Directions" (how do I get to, is it far, turn left)
- Lesson 2: "Public Transit" (bus, subway, transfer, fare)
- Lesson 3: "Ride Sharing" (Uber/Lyft terms, ETA, drop-off)
- Lesson 4: "At the Airport" (boarding pass, gate, layover, customs)

**Category 5: Healthcare** (icon: medical cross)
- Lesson 1: "At the Doctor" (appointment, symptoms, prescription)
- Lesson 2: "Describing Pain" (sharp, dull, throbbing, ache)
- Lesson 3: "Pharmacy" (over-the-counter, dosage, refill)
- Lesson 4: "Emergency" (emergency room, urgent care, insurance)

**Category 6: Housing & Utilities** (icon: house)
- Lesson 1: "Renting an Apartment" (lease, deposit, landlord, utilities)
- Lesson 2: "Home Problems" (plumbing, leak, maintenance, repair)
- Lesson 3: "Neighbors & Community" (HOA, noise, packages, laundry)

**Category 7: Banking & Finance** (icon: dollar sign)
- Lesson 1: "Opening an Account" (checking, savings, routing number)
- Lesson 2: "Daily Banking" (deposit, withdraw, transfer, balance)
- Lesson 3: "Credit & Payments" (credit score, statement, minimum payment)

**Category 8: Social & Entertainment** (icon: party popper)
- Lesson 1: "Making Plans" (are you free, let's hang out, rain check)
- Lesson 2: "At a Party" (this is fun, have you tried, great place)
- Lesson 3: "Movies & TV" (binge-watch, spoiler, what's it about)
- Lesson 4: "Sports & Fitness" (gym, work out, game, playoffs)

**Category 9: Idioms & Slang** (icon: speech bubble with exclamation)
- Lesson 1: "Common Idioms Part 1" (break the ice, hit the nail, piece of cake)
- Lesson 2: "Common Idioms Part 2" (under the weather, spill the beans, cost an arm)
- Lesson 3: "Modern Slang" (no cap, lowkey, slay, vibe, ghosted)
- Lesson 4: "Phrasal Verbs Essentials" (look up, figure out, run into, get along)
- Lesson 5: "Canadian English" (eh, loonie, toque, double-double)

**Category 10: Phone & Appointments** (icon: phone)
- Lesson 1: "Making Phone Calls" (may I speak to, hold on, call back)
- Lesson 2: "Scheduling Appointments" (available, reschedule, cancel)
- Lesson 3: "Customer Service" (I'd like to report, complaint, refund)

**Life Mode Total: 10 categories, 41 lessons, ~410 vocabulary items**

### 8.3 Shared Content Modules

**False Cognates (30+ pairs):**
| English | Looks Like (PT) | Actually Means (PT) |
|---------|-----------------|---------------------|
| actually | atualmente | na verdade |
| pretend | pretender | fingir |
| push | puxar | empurrar |
| fabric | fabrica | tecido |
| college | colegio | faculdade |
| sensible | sensivel | sensato |
| parents | parentes | pais |
| lecture | leitura | palestra |
| attend | atender | comparecer |
| costume | costume | fantasia |
| prejudice | prejuizo | preconceito |
| novel | novela | romance (livro) |
| intend | entender | pretender |
| realize | realizar | perceber |
| support | suportar | apoiar |

**Pronunciation Guide (Brazilian-Specific):**
| Sound | Challenge | Words to Practice | Tip |
|-------|-----------|-------------------|-----|
| TH (voiceless) | PT doesn't have it | think, three, through | Tongue between teeth, blow air |
| TH (voiced) | PT doesn't have it | this, that, the | Same position, add voice |
| Final L | PT makes it W/U | fall, pool, bottle | Keep tongue touching roof |
| R vs H | PT R sounds like H | run/hun, rate/hate | English R: tongue curls back |
| Short I vs Long EE | Same in PT | bit/beat, sit/seat | Short I: relax jaw, brief |
| Initial S + consonant | PT adds E before | speak, stop, school | No "e" before: "speak" not "espeak" |
| -ED endings | PT adds extra syllable | worked, played, wanted | Only 3 sounds: /t/, /d/, /ɪd/ |
| W sound | Doesn't exist in PT | water, world, work | Round lips, don't use V |

**Phrasal Verbs (40+ essential ones):**
- Organized by base verb: look (up, after, into, forward to), get (up, along, over, through), take (off, on, over, up), give (up, in, back, away), come (up, across, along, down), run (into, out of, over), turn (on, off, down, up), work (out, on, through), bring (up, back, out), put (off, up with, on, away)

---

## 9. Navigation Flow

```
App Launch
  │
  ├─ First time? → Onboarding Flow (5 screens) → Home
  │
  └─ Returning? → Home Screen
                    │
                    ├─ Tech Mode Card → Tech Dashboard
                    │                    │
                    │                    ├─ Tab: Dashboard (stats + review CTA + continue)
                    │                    ├─ Tab: Lessons → Category List → Lesson List → Lesson Screen
                    │                    ├─ Tab: Practice → Practice Config → Exercise Session
                    │                    └─ Tab: Vocabulary → Word Bank (search, filter, sort)
                    │
                    ├─ Life Mode Card → Life Dashboard
                    │                    │
                    │                    ├─ (Same structure as Tech)
                    │                    └─ ...
                    │
                    ├─ Review Now (quick action) → Review Session → Summary
                    │
                    ├─ Profile (top-right icon) → Profile Screen → Achievements
                    │
                    └─ Settings (gear icon) → Settings Screen
```

**Tab bar icons (for each mode dashboard):**
1. Dashboard: home icon
2. Lessons: book icon
3. Practice: dumbbell/target icon
4. Vocabulary: dictionary/A icon

---

## 10. Tech Stack - Detailed Dependencies

### 10.1 Core Dependencies
```json
{
  "expo": "~52.0.0",
  "expo-router": "~4.0.0",
  "react": "18.3.x",
  "react-native": "0.76.x",
  "typescript": "~5.6.0",
  "nativewind": "~4.1.0",
  "tailwindcss": "~3.4.0",
  "zustand": "~5.0.0"
}
```

**Why NativeWind v4?** (Research-backed choice, Feb 2026)
- ✅ **403k weekly downloads** vs alternatives — clear community favorite
- ✅ **Tailwind-familiar** — if you know `bg-blue-500 text-white p-4`, you know NativeWind
- ✅ **Expo-official** — [recommended in Expo docs](https://docs.expo.dev/guides/tailwind/)
- ✅ **Dark mode built-in** — essential for this app
- ✅ **Animations** — integrated with `react-native-reanimated` (already using)
- ✅ **Hot reload** — `tailwind.config.js` changes reload instantly
- ✅ **v5 coming** — preview available with even better performance

Alternatives considered: Tamagui (better benchmarks but steeper learning curve), StyleSheet (too verbose).

### 10.2 Storage & Data
```json
{
  "@react-native-async-storage/async-storage": "~2.1.0",
  "expo-sqlite": "~15.0.0"
}
```
Note: Start with AsyncStorage for simplicity. Migrate to SQLite in Phase 7+ if data grows large.

### 10.3 UI & Animation
```json
{
  "react-native-reanimated": "~3.16.0",
  "react-native-gesture-handler": "~2.20.0",
  "@expo/vector-icons": "~14.0.0",
  "expo-haptics": "~14.0.0",
  "expo-linear-gradient": "~14.0.0"
}
```

### 10.4 Audio & Speech
```json
{
  "expo-speech": "~13.0.0",
  "expo-av": "~15.0.0"
}
```

### 10.5 Fonts
```json
{
  "@expo-google-fonts/inter": "~0.2.0",
  "@expo-google-fonts/jetbrains-mono": "~0.2.0",
  "expo-font": "~13.0.0"
}
```

### 10.6 Dev Dependencies
```json
{
  "@types/react": "~18.3.0",
  "prettier": "~3.4.0",
  "eslint": "~9.0.0"
}
```

**Note on versions**: These are approximate targets. Use the latest compatible versions when installing. Expo manages many of these versions via `npx expo install`.

---

## 11. App Structure (Updated & Final)

```
english-app/
├── app/                          # Expo Router pages
│   ├── _layout.tsx               # Root layout (fonts, theme, providers)
│   ├── index.tsx                 # Home / Mode selection screen
│   ├── onboarding/               # Onboarding flow
│   │   ├── index.tsx             # Welcome screen
│   │   ├── name.tsx              # Name input
│   │   ├── level.tsx             # English level selection
│   │   ├── mode.tsx              # Mode preference
│   │   ├── goal.tsx              # Daily goal
│   │   └── ready.tsx             # Ready screen
│   ├── (tech)/                   # Tech Mode (tab group)
│   │   ├── _layout.tsx           # Tech tabs layout
│   │   ├── index.tsx             # Tech dashboard
│   │   ├── lessons/
│   │   │   ├── index.tsx         # Category list
│   │   │   └── [categoryId].tsx  # Lessons in a category
│   │   ├── lesson/[id].tsx       # Individual lesson experience
│   │   ├── practice.tsx          # Free practice
│   │   ├── review.tsx            # SRS review session
│   │   └── vocabulary.tsx        # Tech word bank
│   ├── (life)/                   # Life Mode (tab group)
│   │   ├── _layout.tsx           # Life tabs layout
│   │   ├── index.tsx             # Life dashboard
│   │   ├── lessons/
│   │   │   ├── index.tsx         # Category list
│   │   │   └── [categoryId].tsx  # Lessons in a category
│   │   ├── lesson/[id].tsx       # Individual lesson experience
│   │   ├── practice.tsx          # Free practice
│   │   ├── review.tsx            # SRS review session
│   │   └── vocabulary.tsx        # Life word bank
│   ├── profile.tsx               # User profile & achievements
│   └── settings.tsx              # App settings
│
├── components/                   # Reusable UI components
│   ├── ui/                       # Base design system
│   │   ├── Button.tsx            # Primary, secondary, outline, ghost variants
│   │   ├── Card.tsx              # Base card with shadow and border
│   │   ├── ProgressBar.tsx       # Animated progress bar
│   │   ├── Badge.tsx             # Status badges (level, difficulty, mastery)
│   │   ├── Modal.tsx             # Bottom sheet modal
│   │   ├── Input.tsx             # Text input with label and error state
│   │   ├── Toast.tsx             # Success/error toast notifications
│   │   ├── Chip.tsx              # Filter chips (selectable)
│   │   ├── Divider.tsx           # Horizontal divider
│   │   ├── Avatar.tsx            # User avatar (initials)
│   │   └── IconButton.tsx        # Icon-only button
│   ├── exercises/                # Exercise-specific components
│   │   ├── FillInBlank.tsx       # Fill in the blank exercise
│   │   ├── MatchPairs.tsx        # Match pairs exercise
│   │   ├── TranslateSentence.tsx # Translation exercise
│   │   ├── MultipleChoice.tsx    # Multiple choice exercise
│   │   ├── ListenAndType.tsx     # Listen and type exercise
│   │   ├── UnscrambleSentence.tsx# Unscramble exercise
│   │   └── ExerciseWrapper.tsx   # Shared wrapper (progress, XP, feedback)
│   ├── FlashCard.tsx             # Flashcard with flip animation
│   ├── LessonCard.tsx            # Lesson preview card
│   ├── CategoryCard.tsx          # Category preview card
│   ├── StreakCounter.tsx         # Fire icon + streak count
│   ├── XPBar.tsx                 # XP progress to next level
│   ├── ModeSelector.tsx          # Tech/Life mode large cards
│   ├── AchievementBadge.tsx      # Individual achievement display
│   ├── StatsGrid.tsx             # Grid of stat cards
│   ├── WeeklyChart.tsx           # 7-day activity bar chart
│   ├── VocabularyListItem.tsx    # Single word in vocabulary list
│   ├── ReviewSummary.tsx         # End-of-review summary card
│   └── CelebrationOverlay.tsx    # Full-screen celebration animation
│
├── data/                         # All static content
│   ├── tech/                     # Tech mode content
│   │   ├── categories.ts         # Category definitions
│   │   └── lessons/              # One file per category
│   │       ├── standups.ts       # All standup lessons + vocabulary
│   │       ├── code-reviews.ts
│   │       ├── meetings.ts
│   │       ├── slack-email.ts
│   │       ├── technical-vocab.ts
│   │       └── career.ts
│   ├── life/                     # Life mode content
│   │   ├── categories.ts
│   │   └── lessons/
│   │       ├── greetings.ts
│   │       ├── restaurant.ts
│   │       ├── shopping.ts
│   │       ├── getting-around.ts
│   │       ├── healthcare.ts
│   │       ├── housing.ts
│   │       ├── banking.ts
│   │       ├── social.ts
│   │       ├── idioms-slang.ts
│   │       └── phone.ts
│   ├── common/                   # Shared content
│   │   ├── false-cognates.ts     # PT-EN false cognates
│   │   ├── phrasal-verbs.ts      # Essential phrasal verbs
│   │   └── pronunciation.ts     # PT-BR pronunciation guide
│   └── achievements.ts          # All achievement definitions
│
├── lib/                          # Core business logic
│   ├── srs.ts                    # SM-2 algorithm implementation
│   ├── xp.ts                     # XP calculation and level logic
│   ├── streak.ts                 # Streak tracking logic
│   ├── storage.ts                # AsyncStorage wrapper with versioning
│   ├── types.ts                  # All TypeScript interfaces (from Section 4)
│   ├── constants.ts              # App-wide constants (colors, XP values, etc.)
│   ├── utils.ts                  # Helper functions (date, format, validation)
│   └── tts.ts                    # Text-to-speech wrapper
│
├── stores/                       # Zustand state management
│   ├── userStore.ts              # User profile, settings, XP, streak, level
│   ├── progressStore.ts          # Lesson progress, completion tracking
│   ├── reviewStore.ts            # SRS card states, review queue, session history
│   └── onboardingStore.ts        # Onboarding completion state
│
├── hooks/                        # Custom React hooks
│   ├── useTheme.ts               # Theme colors based on mode (tech/life) + dark/light
│   ├── useSRS.ts                 # Hook to interact with SRS system
│   ├── useAudio.ts               # TTS playback hook
│   └── useStreak.ts              # Streak calculation hook
│
├── constants/                    # Static constants
│   └── theme.ts                  # Design system tokens (from Section 3)
│
├── assets/                       # Static assets
│   ├── images/                   # App icons, illustrations
│   ├── sounds/                   # Sound effects (correct.mp3, wrong.mp3, levelup.mp3)
│   └── fonts/                    # Custom fonts (if not using expo-google-fonts)
│
├── app.json                      # Expo configuration
├── babel.config.js               # Babel config (for NativeWind)
├── metro.config.js               # Metro bundler config
├── tailwind.config.js            # Tailwind/NativeWind config
├── tsconfig.json                 # TypeScript config
├── package.json                  # Dependencies
├── PLAN.md                       # This file
└── RESEARCH.md                   # Research findings
```

---

## 12. Implementation Phases (Detailed)

### Phase 1: Project Setup & Core UI (Session 1)
**Goal: App runs in browser with navigation and placeholder screens**

**Step 1.1: Project Initialization**
- Create Expo project: `npx create-expo-app@latest english-app --template blank-typescript`
- Install ALL core dependencies listed in Section 10
- Configure `app.json` (name, slug, icon placeholder, web config)
- Configure `babel.config.js` for NativeWind
- Configure `metro.config.js` for NativeWind
- Configure `tailwind.config.js` with design system colors from Section 3
- Configure `tsconfig.json` with strict mode and path aliases
- Verify app runs: `npx expo start --web`

**Step 1.2: Design System Foundation**
- Create `constants/theme.ts` with all colors, spacing, typography from Section 3
- Create `lib/constants.ts` with XP values, level thresholds, streak rules from Section 5
- Create `lib/types.ts` with ALL TypeScript interfaces from Section 4
- Build base UI components (from components/ui/):
  - Button.tsx (variants: primary, secondary, outline, ghost; sizes: sm, md, lg; loading state)
  - Card.tsx (default shadow, pressable variant, color border variant)
  - ProgressBar.tsx (animated fill, color prop, percentage label option)
  - Badge.tsx (variants: level, difficulty, mastery, status; colors by variant)
  - Input.tsx (label, placeholder, error message, icon left/right)
  - Toast.tsx (success, error, info variants; auto-dismiss after 3s)
  - Modal.tsx (bottom sheet style, backdrop, close button)
  - Chip.tsx (selectable, active state, icon option)
  - Avatar.tsx (initials from name, background color from level)
  - IconButton.tsx (icon + optional tooltip, size variants)
  - Divider.tsx (horizontal, optional label)

**Step 1.3: Navigation Structure**
- Set up Expo Router file-based routing
- Create root `_layout.tsx` (load fonts, wrap with providers, set status bar)
- Create `index.tsx` (Home screen with mode selection cards)
- Create `(tech)/_layout.tsx` (bottom tab navigator: Dashboard, Lessons, Practice, Vocabulary)
- Create `(life)/_layout.tsx` (same tab structure, different colors)
- Create placeholder screens for all routes (just title + "Coming soon")
- Create `profile.tsx` placeholder
- Create `settings.tsx` placeholder
- Build `ModeSelector.tsx` component (two large cards on home)
- Build `StreakCounter.tsx` component
- Build `XPBar.tsx` component
- Test navigation: Home -> Tech tabs, Home -> Life tabs, tabs work correctly

**Step 1.4: Onboarding Flow**
- Create `onboarding/index.tsx` (Welcome screen)
- Create `onboarding/name.tsx` (Name input)
- Create `onboarding/level.tsx` (Level selection with 3 cards)
- Create `onboarding/mode.tsx` (Mode preference)
- Create `onboarding/goal.tsx` (Daily goal selection)
- Create `onboarding/ready.tsx` (Celebration + start button)
- Create `stores/onboardingStore.ts` (track completion)
- Root layout checks: if onboarding not completed -> redirect to onboarding

**Deliverable**: App opens in browser. Onboarding works. Home screen shows two modes. Tapping a mode opens tabbed navigation with placeholder screens. All UI components exist and are styled.

---

### Phase 2: Data Layer & SRS Engine (Session 2)
**Goal: The "brain" of the app works — storage, SRS, XP, streaks**

**Step 2.1: Storage Layer**
- Create `lib/storage.ts`:
  - AsyncStorage wrapper with JSON serialization
  - Version number for migration support
  - Functions: getItem, setItem, removeItem, clear
  - Storage keys enum: USER_DATA, PROGRESS_DATA, REVIEW_DATA, SETTINGS

**Step 2.2: SM-2 SRS Algorithm**
- Create `lib/srs.ts`:
  - `calculateNextReview(card: SRSCard, quality: 0|3|4|5): SRSCard`
  - `getDueCards(cards: SRSCard[], date: Date): SRSCard[]`
  - `createNewCard(vocabularyItemId: string, mode: 'tech'|'life'): SRSCard`
  - `getMasteryLevel(card: SRSCard): 'new'|'learning'|'reviewing'|'mastered'`
  - `getNextReviewDate(card: SRSCard): Date`
  - Unit test the algorithm with edge cases

**Step 2.3: XP & Level System**
- Create `lib/xp.ts`:
  - `calculateLevel(totalXP: number): { level: number, title: string, xpInLevel: number, xpForNextLevel: number }`
  - `getXPForAction(action: XPAction): number` (using table from Section 5.1)
  - `checkLevelUp(previousXP: number, newXP: number): boolean`
  - XP action types enum

**Step 2.4: Streak System**
- Create `lib/streak.ts`:
  - `updateStreak(lastActiveDate: string, today: string, hasFreezeAvailable: boolean): StreakResult`
  - `checkStreakMilestone(streakCount: number): Achievement | null`
  - `isStreakAlive(lastActiveDate: string, today: string): boolean`
  - Handle timezone edge cases

**Step 2.5: Zustand Stores**
- Create `stores/userStore.ts`:
  - State: user, stats, settings
  - Actions: setName, setLevel, setMode, setDailyGoal, addXP, updateStreak, updateSettings
  - Persistence: auto-save to AsyncStorage on every change
  - Hydration: load from AsyncStorage on app start

- Create `stores/progressStore.ts`:
  - State: lessonProgress map (lessonId -> LessonProgress), completedLessons set
  - Actions: startLesson, completeLesson, updateLessonScore, unlockNextLesson
  - Derived: getProgressForCategory, getCompletedCount, isLessonAvailable

- Create `stores/reviewStore.ts`:
  - State: srsCards map (id -> SRSCard), reviewHistory (ReviewSession[])
  - Actions: addCards, reviewCard, startSession, endSession, getDueCards
  - Derived: getDueCardCount, getCardsByMode, getCardsByMastery

**Step 2.6: Utility Functions**
- Create `lib/utils.ts`:
  - `formatDate`, `formatDuration`, `formatNumber`
  - `generateId` (simple UUID-like)
  - `shuffleArray`, `pickRandom`
  - `fuzzyMatch(input: string, expected: string): boolean` (for exercise validation)
  - `getGreeting(hour: number): string` ("Good morning" / "afternoon" / "evening")

**Deliverable**: All core logic works and persists. Can add XP, track streaks, run SRS algorithm, save/load from storage. All stores are connected and auto-persist.

---

### Phase 3: Tech Mode Content & Lesson Experience (Session 3)
**Goal: Tech Mode has real lessons you can take**

**Step 3.1: Content Data Files**
- Create `data/tech/categories.ts` with all 6 categories from Section 8.1
- Create lesson files for at least the first 3 categories (15 lessons):
  - `data/tech/lessons/standups.ts` (5 lessons, ~50 vocab items, ~30 exercises)
  - `data/tech/lessons/code-reviews.ts` (5 lessons, ~50 vocab items, ~30 exercises)
  - `data/tech/lessons/meetings.ts` (6 lessons, ~60 vocab items, ~36 exercises)
- Each lesson has: vocabulary items with all fields, 4-6 exercises per lesson
- Include Brazilian-specific tips on relevant words

**Step 3.2: Category List Screen**
- Build `(tech)/lessons/index.tsx`:
  - Vertical list of CategoryCard components
  - Each shows: icon, title, description, difficulty, progress bar, lesson count
  - Locked categories are grayed out (future: all unlocked for MVP)
- Build `CategoryCard.tsx` component

**Step 3.3: Lesson List Screen**
- Build `(tech)/lessons/[categoryId].tsx`:
  - Category header (icon, title, description)
  - List of LessonCard components
  - Each shows: lesson number, title, estimated time, difficulty, status (locked/available/completed)
  - First lesson always available, rest unlock sequentially
- Build `LessonCard.tsx` component (with lock/check states)

**Step 3.4: Lesson Experience Screen**
- Build `(tech)/lesson/[id].tsx`:
  - **Introduction phase**: Show vocabulary items one by one
    - Large word display + pronunciation
    - TTS "hear it" button (using `lib/tts.ts` wrapper around expo-speech)
    - PT-BR translation
    - Context sentence with word highlighted
    - Brazilian tip box (if applicable)
    - False cognate warning (if applicable)
    - Progress bar at top
    - "Next" button
  - **Practice phase**: Run through exercises
    - Use ExerciseWrapper for shared UI (progress, feedback, XP)
    - Render correct exercise component based on type
    - After each: show correct/incorrect + explanation
  - **Completion phase**: Summary screen
    - Score, XP earned, words added to SRS queue
    - Auto-add all lesson vocabulary to SRS reviewStore
    - Update progressStore (mark complete, unlock next)
    - Add XP to userStore

**Step 3.5: TTS Integration**
- Create `lib/tts.ts`:
  - `speak(text: string, language: 'en' | 'pt'): Promise<void>`
  - Use expo-speech with appropriate voice
  - Handle errors gracefully (show toast if TTS unavailable)
- Create `hooks/useAudio.ts`:
  - `const { speak, isSpeaking } = useAudio()`

**Deliverable**: Can browse Tech Mode categories, open lessons, learn new words with TTS, do exercises, complete lessons, earn XP, and words are added to SRS queue.

---

### Phase 4: Flashcard System & Review (Session 4)
**Goal: SRS review sessions work end-to-end**

**Step 4.1: FlashCard Component**
- Build `components/FlashCard.tsx`:
  - Uses react-native-reanimated for flip animation
  - Front: English word/phrase, "tap to reveal" text
  - Back: PT-BR translation, context sentence, pronunciation, tips
  - 3D flip on tap (rotateY 180deg, 300ms ease-in-out)
  - Rating buttons below card: Again | Hard | Good | Easy
  - Each button has its color (red, orange, green, blue)
  - Progress: "Card 3 of 15" at top

**Step 4.2: Review Session Screen**
- Build `(tech)/review.tsx` and `(life)/review.tsx`:
  - Entry state: Show due card count + estimated time + "Start" button
  - If 0 due: show empty state ("All caught up!")
  - During review:
    - Fetch due cards from reviewStore
    - Show FlashCard component
    - On rate: call SRS algorithm, update card, animate next card in
    - XP animation per correct answer
  - Completion:
    - Build ReviewSummary component
    - Show: cards reviewed, correct count, accuracy %, XP earned, time
    - "Done" button -> back to dashboard
    - Update userStore (XP, streak)

**Step 4.3: Exercise Components**
- Build all exercise components in `components/exercises/`:
  - `FillInBlank.tsx`: Sentence with blank, text input, validation, hint button
  - `MatchPairs.tsx`: Two columns, tap-to-match, matched pairs animate out
  - `TranslateSentence.tsx`: Source sentence, text input, fuzzy validation
  - `MultipleChoice.tsx`: Question + 4 buttons, feedback colors
  - `ListenAndType.tsx`: Speaker icon, TTS playback, text input
  - `UnscrambleSentence.tsx`: Draggable/tappable word tiles, answer area
  - `ExerciseWrapper.tsx`: Shared wrapper with progress bar, XP indicator, feedback overlay (correct/incorrect + explanation)

**Step 4.4: Practice Screen**
- Build `(tech)/practice.tsx` and `(life)/practice.tsx`:
  - Configuration: Choose exercise type (or Mix), vocabulary source
  - Source options: All words, specific category, weakest words, recent words
  - Start practice -> run exercises -> summary

**Deliverable**: Full review experience works. Flashcards flip, SRS updates correctly, exercises all function, practice mode allows free practice.

---

### Phase 5: Life Mode Content (Session 5)
**Goal: Life Mode fully populated with content**

**Step 5.1: Life Mode Content Files**
- Create `data/life/categories.ts` with all 10 categories from Section 8.2
- Create lesson files for ALL 10 categories (41 lessons):
  - Each category file contains all its lessons
  - Each lesson: 8-12 vocabulary items + 4-6 exercises
  - Dialogue-based format for conversation lessons
  - Include cultural tips (USA/Canada specific)
  - Include Brazilian-specific common mistakes

**Step 5.2: Shared Content Modules**
- Create `data/common/false-cognates.ts` (30+ pairs from Section 8.3)
- Create `data/common/phrasal-verbs.ts` (40+ phrasal verbs with examples)
- Create `data/common/pronunciation.ts` (pronunciation guide from Section 8.3)

**Step 5.3: Remaining Tech Mode Content**
- Complete remaining Tech Mode categories:
  - `data/tech/lessons/slack-email.ts` (5 lessons)
  - `data/tech/lessons/technical-vocab.ts` (6 lessons)
  - `data/tech/lessons/career.ts` (5 lessons)

**Step 5.4: Life Mode Screens**
- Wire up Life Mode screens (same structure as Tech, different colors):
  - `(life)/lessons/index.tsx` (category list with green theme)
  - `(life)/lessons/[categoryId].tsx` (lesson list)
  - `(life)/lesson/[id].tsx` (lesson experience)
  - `(life)/review.tsx` (SRS review)
  - `(life)/practice.tsx` (free practice)
  - `(life)/vocabulary.tsx` (word bank)

**Deliverable**: Both modes are fully populated. User can learn in Tech or Life mode. All 73 lessons available with 700+ vocabulary items.

---

### Phase 6: Gamification, Profile & Stats (Session 6)
**Goal: The app feels rewarding and addictive**

**Step 6.1: Dashboard Upgrades (Both Modes)**
- Update `(tech)/index.tsx` and `(life)/index.tsx`:
  - Greeting with time-of-day
  - Stats row: words learned, lessons done, accuracy
  - Review CTA card (if cards due): count + estimated time + start button
  - Continue learning card: current lesson progress + continue button
  - Weekly activity mini-chart (last 7 days bars)
  - Daily goal progress ring

**Step 6.2: XP Animations & Level-up**
- Build `CelebrationOverlay.tsx`:
  - Confetti animation on level-up (react-native-reanimated)
  - "Level X!" large text with glow
  - New title reveal
  - "Continue" button
- XP floating animation: "+10 XP" text floats up and fades on correct answers
- Level progress bar in header updates with animation

**Step 6.3: Streak System UI**
- Update `StreakCounter.tsx`:
  - Fire icon (larger when streak > 7)
  - Day count
  - Streak freeze indicator (snowflake icon if available)
  - Tap to see streak calendar (modal showing last 30 days, active days highlighted)
- Streak milestone celebration (similar to level-up but fire-themed)

**Step 6.4: Profile Screen**
- Build `profile.tsx`:
  - Avatar (initials in colored circle based on level)
  - Name + level badge + title
  - XP bar to next level with numbers
  - Stats grid (2x3): Total XP, Current Streak, Words Learned, Lessons Done, Accuracy %, Time Spent
  - Build `WeeklyChart.tsx`: 7-day bar chart (each bar = day's XP)
  - Build `StatsGrid.tsx`: Reusable stat card grid
  - Achievements section: scrollable grid of AchievementBadge components
  - Locked = gray with "?" icon, Unlocked = colored with icon + date

**Step 6.5: Achievements System**
- Create `data/achievements.ts` with ALL achievements from Section 5.4
- Build `AchievementBadge.tsx` component
- Add achievement checking logic to stores:
  - After adding XP: check level achievements
  - After completing lesson: check lesson achievements
  - After review: check review achievements
  - After streak update: check streak achievements
  - When achievement unlocks: show toast notification + celebration
- Achievements modal: tap badge to see details (title, description, date unlocked)

**Step 6.6: Settings Screen**
- Build `settings.tsx` with all sections from Section 6.10:
  - Learning: daily goal picker, default mode toggle, show Portuguese toggle, auto-play audio toggle
  - Appearance: theme selector (Light/Dark/System)
  - Sound: sound effects toggle, haptic toggle
  - Notifications: daily reminder toggle + time picker
  - Data: reset progress (with double confirmation modal)
  - About: version, credits

**Deliverable**: App feels polished and gamified. XP animations, level-ups, streaks, achievements, full profile with stats, and complete settings.

---

### Phase 7: Polish, Search & Advanced Features (Session 7+)
**Goal: Production-quality experience**

**Step 7.1: Vocabulary Screen (Word Bank)**
- Build `vocabulary.tsx` (shared logic, different data per mode):
  - Search bar with real-time filtering
  - Filter chips: All | New | Learning | Reviewing | Mastered
  - Sort options: Recent | A-Z | Difficulty | Accuracy
  - Build `VocabularyListItem.tsx`:
    - Word, translation, mastery dot (color), accuracy %
    - Expandable: full details, context sentence, pronunciation, tips
    - "Practice this word" button
  - Stats header: total words, mastered count, due today count

**Step 7.2: Animations & Micro-interactions**
- Screen transitions: smooth slide animations between screens
- Card animations: scale on press, smooth flip
- List animations: items fade/slide in on mount
- Button press: scale down slightly on press
- Correct answer: green flash + checkmark
- Wrong answer: red shake + X mark
- Loading skeleton screens for data-heavy screens
- Pull-to-refresh on dashboard

**Step 7.3: Sound Effects**
- Add sound files to `assets/sounds/`:
  - correct.mp3 (short positive chime)
  - incorrect.mp3 (short negative buzz)
  - levelup.mp3 (triumphant fanfare)
  - complete.mp3 (lesson complete sound)
  - flip.mp3 (card flip whoosh)
  - streak.mp3 (fire crackle for streak milestone)
- Integrate with expo-av
- Respect settings.soundEnabled

**Step 7.4: Dark Mode**
- Implement theme switching in `hooks/useTheme.ts`
- All components use theme colors (not hardcoded)
- System theme detection
- Smooth transition between themes

**Step 7.5: Home Screen Polish**
- Quick review button (if cards due, show count)
- "Word of the Day" card (random word from learned set, or new word preview)
- Total progress summary across both modes

**Step 7.6: Error Handling & Edge Cases**
- Handle app backgrounding (save state)
- Handle app killing (restore from storage on relaunch)
- Handle clock manipulation (streak protection)
- Handle empty states for all screens (from Section 6.11)
- Handle storage errors gracefully

**Deliverable**: App is production-quality. Smooth animations, sounds, dark mode, search, error handling. Ready for daily use.

---

## 13. How to Use This Plan Across Sessions

### Starting a New Session
Copy-paste this prompt to start any phase:

```
We're building the EnglishFlow app — an English learning web app with
two modes (Tech English for developers + Life English for daily living).

Read the file ~/Desktop/english-app/PLAN.md for the complete specification.

We're implementing Phase [X]. Please implement all steps in Phase [X]
following the detailed specs in the plan.

The app uses: Expo (React Native) + TypeScript + Expo Router + NativeWind + Zustand.
Project location: ~/Desktop/english-app/
```

### Phase Dependencies
```
Phase 1 (Setup & UI) ─── REQUIRED FIRST
    │
Phase 2 (Data & SRS) ── REQUIRED SECOND
    │
    ├── Phase 3 (Tech Content & Lessons)
    │       │
    │       └── Phase 4 (Flashcards & Review)
    │
    ├── Phase 5 (Life Content) ── can run after Phase 3-4
    │
    └── Phase 6 (Gamification) ── can run after Phase 3
            │
            └── Phase 7 (Polish) ── LAST
```

### Context-Saving Rule
At the END of each session, update this plan:
- Mark completed steps with [x]
- Note any deviations from the plan
- Note any bugs or issues discovered
- Update file paths if they changed

---

## 14. User Experience & Daily Engagement Design

This section defines HOW the app feels — the psychology, pacing, and emotional design
that keeps users coming back every single day. This is what separates a "study tool"
from an app people love.

### 14.1 The Daily Experience (What a Typical Day Looks Like)

**Morning Open (first session of the day):**
1. App opens → Home Screen
2. Greeting: "Good morning, Nicholas!" (time-aware, uses their name)
3. **Daily Summary Card** at top:
   - "You have 8 cards to review (~4 min)"
   - "Your streak: 12 days!" (with fire animation)
   - "Today's goal: 0/10 minutes"
4. **Word of the Day** mini-card:
   - Shows 1 new word from upcoming lessons (preview/teaser)
   - Tap to see translation + context + hear pronunciation
   - NOT added to SRS yet — just exposure (comprehensible input principle)
5. User taps "Review Now" or picks a lesson
6. After completing daily goal → celebration overlay + "Goal Complete!" badge

**Quick Session (busy day, only 2-3 minutes):**
- Home → "Quick Review" button (always visible when cards are due)
- Reviews 5-10 cards in ~2 minutes
- Still counts for streak and daily goal progress
- Message: "Great job! Even small sessions add up."

**Deep Session (15+ minutes):**
- Review → Lesson → Practice → Vocabulary browse
- App tracks time and shows "You've been learning for 15 min today!"
- After daily goal exceeded: "Bonus time! Extra 10 XP for going above and beyond."

### 14.2 Psychological Hooks (Why Users Come Back)

**1. The Streak (Loss Aversion)**
- This is the #1 retention mechanism
- After 3+ days, losing a streak HURTS — users will open the app just to maintain it
- Visual: fire grows bigger over time (small flame at 1-3 days, medium at 7+, large at 30+)
- Near-miss protection: if user hasn't opened by 8 PM, notification says "Don't lose your 12-day streak!"
- Streak freeze gives safety net (reduces anxiety but maintains the habit)
- When streak IS lost: compassionate message "No worries! Let's start building a new one together."

**2. Variable Rewards (Dopamine)**
- NOT every correct answer should feel the same
- Every ~5th correct answer: larger animation + bonus XP ("Combo! +5 bonus XP")
- Random "treasure" moments: "You found a bonus word!" (reveals a fun/unusual word)
- Daily login bonus: +5 XP just for opening the app (first open per day)
- Weekly milestone: every Sunday, show "This Week" summary with progress

**3. Progress Visualization (Endowment Effect)**
- Users value what they've built — show them their growth constantly
- Dashboard: "You know 47 more words than 2 weeks ago"
- Profile: visual "journey map" showing path from Beginner to current level
- Monthly recap (at month end): "In January you learned 83 words, completed 12 lessons, and reviewed 340 cards!"
- Mastery indicators on each word: dot changes from red → orange → green → gold as mastery grows

**4. Social Proof & Identity**
- Level titles make users feel identity ("You are a Speaker!" at level 6)
- Achievement badges create collection drive (want to "catch them all")
- Future: leaderboard, but even solo — "Top 1% of learners review this many cards per day"

**5. Fear of Missing Out (Daily Content)**
- "Word of the Day" changes daily — miss it and it's gone (creates daily check-in habit)
- "Daily Challenge" — one special exercise per day (different from regular lessons)
  - Example: "Translate this sentence you've never seen before"
  - Bonus XP: 20 XP for completing daily challenge
  - Marked on calendar: gold star for days with daily challenge completed

### 14.3 Session Pacing & Flow Psychology

**Start Easy, Build Up, End High:**
Every session (lesson, review, or practice) follows this emotional arc:

```
Confidence  ↑
            │     ╭──────╮
            │    ╱        ╲    ← Peak challenge
            │   ╱          ╲
            │  ╱     ╭──────────── End on a high note
            │ ╱     ╱        (last 1-2 items are easier)
            │╱     ╱
            ├─────╱
            │ Easy start
            └────────────────────────→ Time
```

**Lesson pacing rules:**
- First 2 vocabulary items: easiest words in the lesson
- Middle items: progressively harder
- Exercises: start with multiple choice (easiest), end with fill-in-blank (harder)
- Last exercise: always something the user is likely to get right (builds confidence)
- Never end a session on a failure — if user gets the last one wrong, add one more easy one

**Review pacing:**
- Start with 2 "easy" due cards (ones user rated Good/Easy last time)
- Mix in harder cards
- If user gets 3 wrong in a row: show an encouraging message + switch to an easier card
- End with a card they know well (positive ending)

**Time awareness:**
- After 10 minutes: subtle indicator "10 min" (not intrusive)
- After 15 minutes: "Great session! Take a break when you're ready."
- After 20 minutes: "You've been going strong! Want to wrap up?" (with continue option)
- Never force-quit a session — user always chooses when to stop

### 14.4 Encouragement & Emotional Design

**When User Gets It RIGHT:**
- First correct: "Nice!" (small text)
- 3 in a row: "You're on a roll!" + streak flame mini-animation
- 5 in a row: "Incredible streak!" + larger animation + bonus XP
- 10 in a row: "UNSTOPPABLE!" + confetti + badge check
- Random variations to avoid repetition:
  - "Nailed it!", "Perfect!", "You got this!", "Impressive!", "Keep going!"
  - For Tech Mode: "Ship it!", "LGTM!", "Merged!", "Deployed!"
  - For Life Mode: "Awesome!", "You sound like a local!", "Natural!"

**When User Gets It WRONG:**
- NEVER say "Wrong!" or use harsh language
- First wrong: "Almost! The answer is [X]" + show explanation
- Show the correct answer prominently with context
- "Tip" appears if there's a Brazilian-specific common mistake
- Card is automatically scheduled for re-review sooner (SRS handles this)
- If user gets same word wrong 3+ times: "This one's tricky! Here's a memory trick..." + mnemonic hint
- Encouraging follow-up: "You'll get it next time!" or "Each mistake is one step closer to remembering!"

**When User Comes Back After Missing Days:**
- 1 day missed: "Welcome back! Let's pick up where you left off."
- 2-3 days missed: "Hey Nicholas! Your words missed you. Let's review them." + show cards due count
- 1 week missed: "It's great to see you again! Don't worry — let's start with a quick review." + reduce review queue to max 15 cards (don't overwhelm)
- 2+ weeks missed: "Welcome back! Learning isn't a sprint, it's a journey. Let's ease back in." + "Fresh Start" option that resets due cards to a manageable batch
- NEVER guilt trip or shame for missing days

**When User Loses Their Streak:**
- "Your streak has reset, but your knowledge hasn't! You still know [X] words."
- Show total words learned (emphasize what they HAVEN'T lost)
- "Start a new streak today?" + prominent button
- DO NOT show the old streak number (avoid rubbing it in)

### 14.5 Daily Challenge System

One unique challenge per day that's different from regular lessons/reviews.

**Challenge types (rotate daily):**
| Day | Challenge Type | Description |
|-----|---------------|-------------|
| Mon | Speed Round | Answer 10 cards in under 60 seconds |
| Tue | Context Detective | Read a paragraph, fill in 3 blanks |
| Wed | False Cognate Trap | 5 tricky false cognate questions |
| Thu | Listening Sprint | Listen to 5 phrases, type what you hear |
| Fri | Sentence Builder | Build 3 sentences from word tiles |
| Sat | Mix Master | Random mix of all exercise types (8 questions) |
| Sun | Weekly Review | Review summary + revisit hardest words from the week |

**Daily Challenge rewards:**
- Completion: 20 XP + gold star on calendar
- Perfect score: 30 XP + "Perfect Day" mini-badge
- Complete all 7 in a week: 50 bonus XP + "Full Week" achievement

### 14.6 Adaptive Difficulty

The app should get smarter about what you need:

**Auto-adjustment rules:**
- If accuracy > 90% in a category: suggest moving to next difficulty level
  - Show: "You're mastering this! Ready for a challenge?" + option to level up
- If accuracy < 50% in a session: reduce difficulty for remaining items
  - Swap harder exercises for easier ones (e.g., multiple choice instead of fill-in-blank)
  - Show: "Let's try a different approach" (never say "this is too hard for you")
- If a word has been reviewed 5+ times and accuracy < 60%: mark as "difficult word"
  - Show extra context, mnemonic, Brazilian-specific tip
  - Schedule more frequent reviews
  - In practice mode: prioritize these words

**"Smart Review" queue ordering:**
1. Cards due today (overdue first)
2. Within due cards, prioritize:
   - Words with low accuracy (need more practice)
   - Words about to "level up" in mastery (motivating — one more good review!)
   - New words (recently learned, need initial reinforcement)
3. If queue > 30 cards: cap at 30, save rest for tomorrow
   - Message: "You have 45 cards due. Let's tackle 30 today — the rest can wait!"
   - Never overwhelm the user

### 14.7 Micro-Celebrations (The Small Moments That Matter)

These tiny moments of delight make the app feel alive:

| Moment | Celebration |
|--------|------------|
| First word ever learned | Special animation: "Your English journey begins!" |
| 10th word learned | "Double digits! You know 10 words now!" |
| 50th word | "50 words! That's enough for basic conversations!" |
| 100th word | "100 words! You're building a real vocabulary!" |
| 250th word | "250 words! You know more than many English students!" |
| 500th word | "500 words! You're approaching fluency territory!" |
| First lesson complete | "You did it! Your first lesson is done!" |
| First perfect lesson | "Perfect score! Not a single mistake!" |
| First review session | "First review done! This is how you remember forever." |
| Level up | Full-screen confetti + new title reveal + XP summary |
| Streak milestone | Fire animation + milestone card + bonus XP |
| All cards reviewed | "All caught up! You're on top of your game!" |
| Daily goal met | Checkmark animation + "Goal Complete!" badge |
| Daily goal exceeded | "Above and beyond! +10 bonus XP" |
| Word mastered (gold) | Gold sparkle animation on the word + "Mastered!" label |
| Category completed | Trophy animation + "Category Complete!" card |
| Mode completed | Major celebration: "You've completed Tech English!" |

### 14.8 Notification Strategy (Smart, Not Annoying)

**Rules:**
- Maximum 1 notification per day
- Never send notifications before 8 AM or after 10 PM (user timezone)
- If user interacted today, don't send any notification
- Notification time: user's chosen reminder time (default 9 AM)

**Notification types (priority order — send the highest applicable):**

| Priority | Condition | Message |
|----------|-----------|---------|
| 1 | Streak at risk (evening, no activity) | "Your [X]-day streak ends at midnight! Quick review?" |
| 2 | Daily challenge not done | "Today's challenge is waiting! 2 minutes to complete it." |
| 3 | Cards due for review | "You have [X] cards to review. Keep your memory sharp!" |
| 4 | New lesson available | "Ready for a new lesson? '[Lesson Title]' is unlocked!" |
| 5 | General reminder | "Time to practice your English! Just 5 minutes today." |

**Notification tone:**
- Friendly, never urgent or guilt-inducing
- Vary the message to avoid "notification blindness"
- Include the streak count when relevant (loss aversion trigger)

### 14.9 First-Time User Experience (The Critical First 5 Minutes)

The first session determines whether the user comes back. It MUST feel:
- Easy (build confidence immediately)
- Rewarding (XP, animations, celebrations)
- Quick (under 5 minutes for onboarding + first lesson)
- Personal (use their name, acknowledge they're Brazilian)

**First session flow:**
1. Onboarding (2 minutes): Welcome → Name → Level → Mode → Goal → Ready
2. Immediate redirect to first lesson (no extra taps needed)
3. First lesson is specially designed:
   - Only 5 words (shorter than normal 8-12)
   - Words are very common and easy to remember
   - Tech Mode first lesson: "Can you hear me?", "Let me share my screen", "LGTM", "blocker", "sync"
   - Life Mode first lesson: "Hi, how are you?", "Nice to meet you", "See you later", "Thanks", "Excuse me"
   - Only 3 exercises (instead of normal 4-6)
   - Exercise types: 1 multiple choice (easiest), 1 match pairs, 1 fill-in-blank
   - Generous feedback: celebrate every correct answer
4. Lesson complete → big celebration → "You learned 5 new words!"
5. Show: "Come back tomorrow to review these words and learn more!"
6. Redirect to Home with streak started (day 1!)

**Key metric**: User should feel "I can do this!" within 3 minutes.

### 14.10 Weekly & Monthly Recaps

**Weekly Recap (shown every Monday):**
- Modal/card on home screen: "Your Week in Review"
- Stats: words learned, cards reviewed, time spent, accuracy
- Highlight: "Your strongest category: [X]"
- Highlight: "Words to focus on: [2-3 lowest accuracy words]"
- Encouragement based on performance:
  - Great week: "Amazing progress! You're learning faster than average!"
  - Average week: "Solid week! Consistency is what matters most."
  - Light week: "Every word counts! Let's aim a bit higher this week."
- "Set a goal for this week?" → adjust daily goal if desired

**Monthly Recap (shown on 1st of each month):**
- Full-screen summary: "Your January in EnglishFlow"
- Big numbers: total words, total XP, total time
- Growth chart: words known at start vs end of month
- "Most improved area: [category]"
- "Words mastered this month: [X]"
- "Longest streak: [X] days"
- Share button (future): generate image for social media
- "Keep going! In February, aim for [goal based on pace]"

### 14.11 Difficulty Progression Across Categories

Not all categories should be available from day 1. Progressive unlocking creates anticipation.

**Tech Mode unlock order:**
1. Daily Standups (available immediately) — easiest, most immediately useful
2. Slack & Email (unlocks after completing 3 Standup lessons) — also immediately useful
3. Code Reviews (unlocks after completing Standups) — builds on standup vocabulary
4. Meetings & Calls (unlocks after completing 3 Code Review lessons)
5. Technical Vocabulary (unlocks at Level 3) — requires foundation
6. Career Growth (unlocks at Level 5) — advanced content

**Life Mode unlock order:**
1. Greetings & Small Talk (available immediately)
2. At the Restaurant (unlocks after completing 3 Greetings lessons)
3. Shopping & Groceries (unlocks after completing Restaurant)
4. Getting Around (unlocks after completing 3 total Life categories)
5. Phone & Appointments (unlocks after Getting Around)
6. Social & Entertainment (unlocks at Level 3)
7. Healthcare (unlocks at Level 4) — more complex vocabulary
8. Housing & Utilities (unlocks at Level 4)
9. Banking & Finance (unlocks at Level 5) — advanced
10. Idioms & Slang (unlocks at Level 6) — requires strong foundation

**Unlock notification:**
- When a new category unlocks: "New category unlocked: [name]!" toast
- On home screen: "New!" badge on the mode card
- Locked categories show: lock icon + "Complete [requirement] to unlock"
- Tap locked category: see preview of what you'll learn (teaser)

### 14.12 Contextual Learning Moments (Surprise & Delight)

**"Did You Know?" tips** (shown randomly between exercises, ~1 per session):
- Cultural differences: "In Canada, it's common to say 'sorry' even when it's not your fault!"
- Word origins: "'Bug' in software comes from an actual moth found in a computer in 1947!"
- Brazilian connection: "The English word 'hammock' comes from the Tupi word 'hamaka'!"
- Pronunciation fun fact: "English has 44 sounds but only 26 letters. No wonder spelling is hard!"
- Workplace culture: "In North American meetings, it's okay to disagree — just be polite about it."
- Keep a pool of 50+ tips, show randomly, track shown ones to avoid repeats

**"Real World" examples** (in Tech Mode):
- Actual GitHub PR comment examples (anonymized)
- Real Slack message patterns
- Standup transcript snippets
- These make the content feel authentic, not textbook-like

### 14.13 Accessibility & Comfort Features

- **Font size adjustment**: Small, Medium (default), Large options in settings
- **Reduce animations**: Option to minimize/disable animations for motion sensitivity
- **High contrast mode**: For users with vision difficulties (future)
- **Colorblind-safe**: Mastery indicators use shape + color (not color alone)
  - New: hollow circle (gray)
  - Learning: half-filled circle (orange)
  - Reviewing: filled circle (green)
  - Mastered: star (gold)
- **Reading mode**: Option to always show Portuguese translations (for beginners who need the safety net)
- **Timer optional**: Can hide session timer if it causes anxiety
- **Skip button**: Can skip any exercise (but no XP earned) — never trap the user

---

## 15. Updated Implementation Phase Mapping

The engagement features above integrate into existing phases:

| Feature | Phase |
|---------|-------|
| Word of the Day | Phase 3 (content) |
| Daily Challenge system | Phase 6 (gamification) |
| Encouragement messages (correct/wrong) | Phase 4 (exercises) |
| Comeback messages (missed days) | Phase 6 (streak system) |
| Micro-celebrations | Phase 6 (gamification) |
| Smart Review queue ordering | Phase 2 (SRS engine) |
| Adaptive difficulty | Phase 4 (exercise wrapper) |
| Session pacing rules | Phase 3 (lesson screen) |
| First-time user optimized lesson | Phase 3 (content — special first lesson) |
| Weekly/monthly recaps | Phase 6 (profile/stats) |
| Category unlock progression | Phase 3 + 5 (content) |
| "Did You Know?" tips | Phase 6 (gamification) |
| Notification strategy | Phase 7 (polish) |
| Accessibility features | Phase 7 (polish) |
| Variable rewards / combos | Phase 6 (gamification) |
| Daily login bonus | Phase 6 (gamification) |

---

## 16. Success Metrics (How to Know the App is Working)

### Technical Metrics
- [ ] App loads in browser without errors
- [ ] Onboarding flow completes and persists
- [ ] Can navigate between Tech and Life modes
- [ ] Can complete a full lesson (intro + exercises)
- [ ] Words from completed lessons appear in review queue
- [ ] SRS review works: cards show, rating updates interval
- [ ] XP accumulates correctly across all actions
- [ ] Level-up triggers when XP threshold is crossed
- [ ] Streak tracks correctly across days
- [ ] All 6 exercise types work correctly
- [ ] Vocabulary search and filter works
- [ ] Profile shows accurate stats
- [ ] Achievements unlock at correct milestones
- [ ] Settings persist and apply correctly
- [ ] Dark mode works across all screens
- [ ] Data persists after app reload
- [ ] No TypeScript errors, no console warnings

### Engagement Metrics (The "Feel" Test)
- [ ] First lesson completes in under 5 minutes and feels rewarding
- [ ] User sees celebration/encouragement at least 3 times per session
- [ ] Wrong answers feel supportive, not punishing
- [ ] Daily session can be completed in under 10 minutes
- [ ] Quick review (2-3 minutes) is possible for busy days
- [ ] Streak feels valuable enough to protect
- [ ] Word of the Day creates curiosity to open the app
- [ ] Daily Challenge feels different from regular lessons
- [ ] Level-up moment feels exciting and earned
- [ ] Categories unlocking creates anticipation
- [ ] Weekly recap makes user feel proud of progress
- [ ] Coming back after missed days feels welcoming, not shaming
- [ ] The app adapts — easy words speed up, hard words get extra help
- [ ] "Did You Know?" tips make learning feel interesting, not just study
- [ ] Session pacing never feels rushed or dragging
- [ ] User WANTS to open the app, not FEELS OBLIGATED to
