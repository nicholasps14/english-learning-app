# Tomorrow's Implementation Tasks

## 🎯 Goal: Complete Restaurant Lessons 3-5

### File to Edit
`/Users/nicholassabino/Desktop/english-app/data/life/lessons/restaurant.ts`

---

## Task 1: Add Vocabulary Items

**Location**: After line 147 (after `life_rest_010`), before the closing `];`

**Add these vocabulary items:**

```typescript
  // Lesson 3: Special Requests
  {
    id: "life_rest_011",
    word: "I'm allergic to",
    translation: "Sou alérgico a",
    definition: "Informing about food allergies",
    exampleSentence: "I'm allergic to peanuts.",
  },
  {
    id: "life_rest_012",
    word: "Can I substitute",
    translation: "Posso substituir",
    definition: "Asking to replace an ingredient",
    exampleSentence: "Can I substitute fries for a salad?",
  },
  {
    id: "life_rest_013",
    word: "Hold the",
    translation: "Sem o/a",
    definition: "Requesting to leave something out",
    exampleSentence: "I'll have a burger, hold the onions.",
  },

  // Lesson 4: Paying the Bill
  {
    id: "life_rest_014",
    word: "Check please",
    translation: "A conta, por favor",
    definition: "Requesting the bill",
    exampleSentence: "We're ready. Check please!",
  },
  {
    id: "life_rest_015",
    word: "Split the bill",
    translation: "Dividir a conta",
    definition: "Divide payment among people",
    exampleSentence: "Can we split the bill?",
  },
  {
    id: "life_rest_016",
    word: "Tip",
    translation: "Gorjeta",
    definition: "Extra money for good service",
    exampleSentence: "The tip is usually 15-20%.",
  },

  // Lesson 5: Coffee Shop
  {
    id: "life_rest_017",
    word: "Latte",
    translation: "Café com leite (espresso)",
    definition: "Espresso with steamed milk",
    exampleSentence: "I'll have a large latte, please.",
  },
  {
    id: "life_rest_018",
    word: "Cold brew",
    translation: "Café gelado extraído a frio",
    definition: "Coffee slowly steeped in cold water",
    exampleSentence: "Cold brew is less acidic than iced coffee.",
  },
  {
    id: "life_rest_019",
    word: "For here or to go?",
    translation: "Para comer aqui ou levar?",
    definition: "Asking if you'll eat in or take out",
    exampleSentence: "For here or to go? - For here, thanks.",
  },
```

---

## Task 2: Update Lesson 3 (vocabularyIds + exercises)

**Find**: The lesson with `id: "life_restaurant_03"`

**Update vocabularyIds**:
```typescript
vocabularyIds: ["life_rest_011", "life_rest_012", "life_rest_013"],
```

**Add exercises**:
```typescript
exercises: [
  {
    id: "life_rest_ex_009",
    type: "fill-blank",
    question: "I'm _____ to peanuts.",
    correctAnswer: "allergic",
    vocabularyId: "life_rest_011",
  },
  {
    id: "life_rest_ex_010",
    type: "multiple-choice",
    question: "What does 'hold the onions' mean?",
    correctAnswer: "Without onions",
    options: ["Without onions", "Extra onions", "Keep the onions", "Onions on the side"],
    vocabularyId: "life_rest_013",
  },
  {
    id: "life_rest_ex_011",
    type: "fill-blank",
    question: "Can I _____ fries for a salad?",
    correctAnswer: "substitute",
    vocabularyId: "life_rest_012",
  },
  {
    id: "life_rest_ex_012",
    type: "multiple-choice",
    question: "When should you mention food allergies?",
    correctAnswer: "When ordering",
    options: ["After eating", "When ordering", "When paying", "Never"],
    vocabularyId: "life_rest_011",
  },
],
```

---

## Task 3: Update Lesson 4 (vocabularyIds + exercises)

Similar pattern - add vocabularyIds and 4 exercises using life_rest_014, 015, 016

---

## Task 4: Update Lesson 5 (vocabularyIds + exercises)

Similar pattern - add vocabularyIds and 4 exercises using life_rest_017, 018, 019

---

## After Restaurant is Done

Move to: `/Users/nicholassabino/Desktop/english-app/data/tech/lessons/slack-email.ts`

Follow same process:
1. Check existing vocabulary
2. Add missing vocabulary if needed
3. Add 3-5 exercises per lesson

---

## Progress Tracking

Update `EXERCISES_PROGRESS.md` when done:
- Move Restaurant from "IN PROGRESS" to "COMPLETED"
- Update exercise count
- Update "TOMORROW'S PLAN" section
