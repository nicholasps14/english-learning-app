# English Learning App

A progressive English learning application with gamification features, built with React Native and Expo.

## 🚀 Live Deployment

- **Production URL**: https://english-app-three-iota.vercel.app
- **GitHub Repository**: https://github.com/nicholasps14/english-learning-app

## 📚 Tech Stack

### Frontend
- **Framework**: React Native with Expo (~54.0.33)
- **Language**: TypeScript (~5.9.2)
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Navigation**: Expo Router (~6.0.23)
- **State Management**: Zustand (^5.0.11)
- **Fonts**: Inter font family via @expo-google-fonts

### Backend & Database
- **Database**: Firebase Firestore (NoSQL cloud database)
- **Local Storage**: AsyncStorage (offline cache and backup)
- **Authentication**: Custom email/password system

### Key Libraries
- `expo-speech` - Text-to-speech for pronunciation
- `expo-av` - Audio playback
- `expo-haptics` - Tactile feedback
- `expo-linear-gradient` - UI gradients
- `react-native-gesture-handler` - Touch interactions
- `react-native-reanimated` - Smooth animations

### Deployment
- **Hosting**: Vercel
- **Build Tool**: Expo CLI
- **Environment**: Web (with mobile support via Expo)

## 🗄️ Database Architecture

### Firebase Firestore
- **Project**: english-learning-app-ae7c5
- **Collection**: `userProgress`
- **Document Structure**:
  ```typescript
  {
    userId: string;
    totalXP: number;
    techXP: number;
    lifeXP: number;
    currentStreak: number;
    longestStreak: number;
    techLevel: number;
    lifeLevel: number;
    completedLessonIds: string[];
    inProgressLessonIds: string[];
    learnedVocabularyIds: string[];
    masteredVocabularyIds: string[];
    dailyGoalMinutes: number;
    dailyGoalCompleted: boolean;
    studyTimeToday: number;
    unlockedAchievementIds: string[];
    totalLessonsCompleted: number;
    totalVocabularyLearned: number;
    totalStudyTime: number;
    accuracyRate: number;
    lastStudyDate?: Date;
    updatedAt: string;
  }
  ```

### Hybrid Storage Strategy
1. **Primary**: Firebase Firestore (cloud sync)
2. **Fallback**: AsyncStorage (offline access)
3. **Sync**: Automatic bidirectional sync between cloud and local

**Benefits**:
- Progress syncs across all devices and browsers
- Works offline with AsyncStorage cache
- Automatic cloud backup
- Real-time data updates

## 🎮 How the App Works

### Learning Modes
1. **Tech English** - Technology and workplace vocabulary
2. **Life English** - Everyday conversation and situations

### Exercise Types
1. **Multiple Choice** - Select the correct answer from 4 options
2. **Fill in the Blank** - Type the missing word
3. **Flashcards** - Flip to reveal translation, self-assess retention

### Gamification Features
- **XP System**: Earn experience points for completing activities
  - Lesson Complete: 50 XP
  - Daily Goal Complete: 100 XP
  - Achievement Unlock: 75 XP
- **Levels**: Progress through levels in Tech and Life modes
- **Streaks**: Track consecutive days of study
- **Achievements**: Unlock badges for milestones
- **Daily Goals**: Set and complete daily study time targets

### Progress Tracking
- Total XP and mode-specific XP
- Lesson completion status
- Vocabulary mastery levels
- Study time tracking
- Accuracy rates
- Streak maintenance

## 📁 Project Structure

```
english-app/
├── app/                    # Expo Router pages
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── tech.tsx       # Tech learning mode
│   │   ├── life.tsx       # Life learning mode
│   │   ├── progress.tsx   # Progress dashboard
│   │   └── profile.tsx    # User profile
│   ├── login.tsx          # Authentication
│   └── _layout.tsx        # Root layout
├── components/            # Reusable components
│   ├── exercises/         # Exercise type components
│   │   ├── MultipleChoiceExercise.tsx
│   │   ├── FillBlankExercise.tsx
│   │   └── FlashcardExercise.tsx
│   ├── Card.tsx
│   ├── Button.tsx
│   └── ...
├── stores/                # Zustand state stores
│   ├── progressStore.ts   # Progress & Firebase sync
│   └── authStore.ts       # Authentication state
├── lib/                   # Utilities and configuration
│   ├── firebase.ts        # Firebase initialization
│   ├── types.ts           # TypeScript type definitions
│   └── ...
├── .env.local             # Environment variables (local)
└── package.json           # Dependencies
```

## 🔧 Environment Variables

Required Firebase configuration (set in Vercel and `.env.local`):

```bash
EXPO_PUBLIC_FIREBASE_API_KEY=your-api-key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
EXPO_PUBLIC_FIREBASE_APP_ID=your-app-id
```

## 💻 Development Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nicholasps14/english-learning-app.git
   cd english-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env.local` file with Firebase credentials (see Environment Variables section)

4. Start development server:
   ```bash
   npm start
   # or
   expo start
   ```

5. Open in browser:
   - Press `w` in terminal for web
   - Or navigate to http://localhost:8081

## 🚀 Deployment

### Build for Web
```bash
npm run build
```

### Deploy to Vercel
```bash
vercel --prod
```

**Note**: Ensure all environment variables are configured in Vercel dashboard before deploying.

## 📊 Firebase Free Tier Limits

Current usage is well within Firebase free tier:
- **Reads**: 50,000/day (using ~100/day for 2 users)
- **Writes**: 20,000/day (using ~20/day for 2 users)
- **Storage**: 1 GB (using <1 MB)
- **Cost**: $0/month

## 🔐 Authentication

Custom authentication system with hardcoded users:
- User 1: nick@email.com
- User 2: flavia@email.com

Each user has isolated progress data stored in Firebase.

## 📱 Features

- ✅ Cross-device progress sync via Firebase
- ✅ Offline support with AsyncStorage
- ✅ Gamified learning with XP and levels
- ✅ Multiple exercise types
- ✅ Text-to-speech for pronunciation
- ✅ Daily goals and streaks
- ✅ Achievement system
- ✅ Progress tracking and analytics
- ✅ Responsive web design
- ✅ Dark mode support (coming soon)

## 🐛 Known Issues

None currently reported.

## 📝 License

Private project - All rights reserved.

## 👥 Authors

- Nicholas PS (@nicholasps14)

---

**Last Updated**: February 2026
