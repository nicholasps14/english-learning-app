import { Category } from "@/lib/types";

export const techCategories: Category[] = [
  {
    id: "tech_meetings",
    name: "Meetings & Stand-ups",
    description: "Daily stand-ups, retrospectives, and team meetings",
    icon: "💼",
    mode: "tech",
    order: 1,
    subcategories: [
      {
        id: "meetings_basics",
        name: "Meeting Essentials",
        description: "Navigate tech team meetings",
        lessonIds: [
          "tech_meetings_01",
          "tech_meetings_02",
          "tech_meetings_03",
          "tech_meetings_04",
          "tech_meetings_05",
        ],
        vocabularyCount: 50,
      },
    ],
  },
  {
    id: "tech_code_review",
    name: "Code Review & Git",
    description: "Pull requests, Git commands, and code feedback",
    icon: "👨‍💻",
    mode: "tech",
    order: 2,
    subcategories: [
      {
        id: "code_review_basics",
        name: "Code Review Essentials",
        description: "Give and receive code feedback",
        lessonIds: [
          "tech_code_01",
          "tech_code_02",
          "tech_code_03",
          "tech_code_04",
          "tech_code_05",
        ],
        vocabularyCount: 50,
      },
    ],
  },
  {
    id: "tech_slack_email",
    name: "Slack & Email",
    description: "Professional communication in tech",
    icon: "💬",
    mode: "tech",
    order: 3,
    subcategories: [
      {
        id: "slack_email_basics",
        name: "Communication Essentials",
        description: "Master async communication",
        lessonIds: [
          "tech_slack_01",
          "tech_slack_02",
          "tech_slack_03",
          "tech_slack_04",
          "tech_slack_05",
        ],
        vocabularyCount: 50,
      },
    ],
  },
  {
    id: "tech_vocabulary",
    name: "Technical Vocabulary",
    description: "Programming terms and tech jargon",
    icon: "📚",
    mode: "tech",
    order: 4,
    subcategories: [
      {
        id: "technical_vocab_basics",
        name: "Technical Terms",
        description: "Essential tech vocabulary",
        lessonIds: [
          "tech_vocab_01",
          "tech_vocab_02",
          "tech_vocab_03",
          "tech_vocab_04",
          "tech_vocab_05",
          "tech_vocab_06",
        ],
        vocabularyCount: 60,
      },
    ],
  },
  {
    id: "tech_career",
    name: "Career & Job Search",
    description: "Interviews, resumes, and professional growth",
    icon: "🚀",
    mode: "tech",
    order: 5,
    subcategories: [
      {
        id: "career_basics",
        name: "Career Essentials",
        description: "Land your dream tech job",
        lessonIds: [
          "tech_career_01",
          "tech_career_02",
          "tech_career_03",
          "tech_career_04",
          "tech_career_05",
        ],
        vocabularyCount: 50,
      },
    ],
  },
];
