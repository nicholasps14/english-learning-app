# EnglishFlow - Research Findings
## English Learning Methods & Approaches

### Date: 2026-02-09

---

## Sources Consulted

### Academic & Research
- Frontiers in Education - Technologies applied to education in ESL (2025)
- Frontiers in Education - Teaching academic English in higher education (2025)
- Frontiers in Education - Strategies for learning English in higher education (2025)
- Nature Scientific Reports - Deep learning approaches to English language learning
- Global Spectrum of Research and Humanities - ESL teaching methods
- Kyoto University Doctoral Research - Interleaved spaced repetition and gamification
- ERIC - Computer-based spaced repetition effectiveness
- Duolingo Research - Trainable spaced repetition model

### Developer-Specific English
- Preply Business - English for Software Engineers
- Immigo - Technical English: Essential Vocabulary for Software Developers
- SpeakTechEnglish - 5 Ways to Learn English for Developers (2026)
- English4IT - Online course for IT English
- EnglishPro.it - Vocabulary guide for software developers

### Brazilian-Specific Challenges
- Excel English Institute - Pronunciation Challenges for Brazilians
- Excel English Institute - Challenges for Brazilians Learning English
- Promova - Challenges in Brazil English Learning
- ITTT TEFL Blog - Challenges for Brazilian Learners of English
- ResearchGate - Common Persistent Errors by Brazilian Portuguese Speakers
- British Council Brazil - Learning English in Brazil report

### Apps & Tools
- Sabi - Best Gamified Language Learning Apps (2026)
- AllLanguageResources - Best English Learning Apps
- FluentU - English Learning Software Programs
- BoldVoice - Top 10 English Learning Apps 2025

### Tech Stack
- React Native official docs (reactnative.dev)
- Galaxies.dev - React Native Tech Stack 2025
- EurosHub - Future of React Native 2026
- Netguru - React Native Tech Stack for Mobile Apps

---

## Key Findings

### 1. Most Effective Learning Methods (Ranked by Evidence)

#### Tier 1: Strong Scientific Evidence
1. **Spaced Repetition System (SRS)**
   - 100+ years of research confirming superiority over cramming
   - SM-2 algorithm (used by Anki) is gold standard
   - Optimal intervals: 1 day -> 3 days -> 7 days -> 14 days -> 30 days -> 90 days
   - Works best for vocabulary acquisition

2. **Comprehensible Input (Krashen's Theory)**
   - Learn through understanding messages, not memorizing rules
   - Language acquired through immersion is more spontaneously available
   - Must be i+1 level (slightly above current level)
   - Context provides natural repetition

3. **Active Recall**
   - Testing yourself is more effective than re-reading
   - Flashcards with typed answers > multiple choice
   - "Desirable difficulty" improves long-term retention

#### Tier 2: Strong Practical Evidence
4. **Gamification**
   - Proven to build consistent habits
   - Streaks, XP, levels increase daily engagement
   - Duolingo's success is largely gamification-driven
   - Research from Kyoto University confirms gamified SRS improves outcomes

5. **AI-Powered Personalization**
   - Adaptive learning paths outperform one-size-fits-all
   - GenAI feedback improved writing scores vs teacher feedback
   - LLM-based feedback (ChatGPT) positively influenced test scores

6. **Context-Based Learning**
   - Words learned in sentences retained 2-3x longer than isolated words
   - Real-world scenarios (meetings, restaurants) create stronger associations
   - Technical vocabulary best learned through actual code review examples

#### Tier 3: Supporting Methods
7. **Hybrid/Blended Learning** - Online + real-world practice
8. **Metacognitive Strategies** - Thinking about how you learn
9. **VR/AR Immersion** - Emerging but promising for vocabulary retention

### 2. Brazilian Portuguese Speakers - Specific Challenges

#### Pronunciation
| Challenge | Example | Why it Happens |
|-----------|---------|---------------|
| TH sound | "think" -> "fink" or "sink" | TH doesn't exist in PT |
| Final L | "fall" -> "fau" | PT L at end = W/U sound |
| D/T endings | "bad" -> "badj" | PT adds vowel sounds after D/T |
| Vowel length | "bit" = "beat" | PT doesn't distinguish short/long vowels |
| H vs R | "run" -> "hun" | PT R sounds like English H |
| Initial S clusters | "speak" -> "espeak" | PT adds E before S+consonant |

#### Grammar
- Verb tenses (especially perfect/continuous)
- Phrasal verbs (look up, look after, look into = completely different meanings)
- Articles (a/an/the) - PT uses them differently
- Prepositions - often don't translate directly

#### Psychological
- Mental translation habit (PT -> EN) slows conversation
- Fear of making mistakes / being judged
- Limited exposure to natural English in Brazil

### 3. Tech English - Key Areas

#### Meetings
- Opening/closing phrases
- Agreeing/disagreeing politely
- Asking for clarification
- Presenting ideas and proposals

#### Code Reviews
- Requesting changes politely
- Explaining technical decisions
- Common abbreviations (LGTM, PTAL, WIP, RFC)
- Constructive feedback language

#### Standups
- Status update patterns
- Describing blockers
- Committing to tasks

#### Async Communication (Slack/Email)
- Professional tone in writing
- Common acronyms (FYI, ETA, OOO, TL;DR)
- Hedging language ("I think", "It seems like", "Would it be possible")

### 4. What Existing Apps Do Well (and Gaps)

| App | Strengths | Gaps |
|-----|-----------|------|
| Duolingo | Gamification, habit building | Generic content, no tech focus |
| Anki | Best SRS implementation | No gamification, ugly UI |
| English4IT | Tech-specific | Dated design, limited interactivity |
| SpeakTechEnglish | Developer-focused | No app, web-only, no SRS |
| Promova | Good UI, personalized | Not developer-specific |

**Our Opportunity**: Combine Anki's SRS + Duolingo's gamification + developer-specific content + Brazilian-specific support. No app does all four.

### 5. Tech Stack Decision

**Chosen: React Native (Expo) + TypeScript + NativeWind**

Rationale:
- Single codebase for Web + iOS + Android
- Expo is the officially recommended framework for React Native in 2025/2026
- TypeScript for type safety (you're a developer, you'll appreciate this)
- NativeWind brings Tailwind CSS to React Native
- Can test in browser immediately, ship to app stores later
- Zustand for lightweight state management
- expo-sqlite for local database (offline-first)
