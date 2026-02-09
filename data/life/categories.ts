import { Category } from "@/lib/types";

export const lifeCategories: Category[] = [
  {
    id: "life_greetings",
    name: "Greetings & Small Talk",
    description: "Meeting people and casual conversations",
    icon: "👋",
    mode: "life",
    order: 1,
    subcategories: [
      {
        id: "greetings_basics",
        name: "Basic Greetings",
        description: "Essential greetings and introductions",
        lessonIds: [
          "life_greetings_01",
          "life_greetings_02",
          "life_greetings_03",
          "life_greetings_04",
          "life_greetings_05",
        ],
        vocabularyCount: 50,
      },
    ],
  },
  {
    id: "life_restaurant",
    name: "At the Restaurant",
    description: "Dining out and ordering food",
    icon: "🍽️",
    mode: "life",
    order: 2,
    subcategories: [
      {
        id: "restaurant_basics",
        name: "Restaurant Essentials",
        description: "From getting a table to paying the bill",
        lessonIds: [
          "life_restaurant_01",
          "life_restaurant_02",
          "life_restaurant_03",
          "life_restaurant_04",
          "life_restaurant_05",
        ],
        vocabularyCount: 50,
      },
    ],
  },
  {
    id: "life_shopping",
    name: "Shopping & Groceries",
    description: "Shopping for clothes, groceries, and more",
    icon: "🛍️",
    mode: "life",
    order: 3,
    subcategories: [
      {
        id: "shopping_basics",
        name: "Shopping Essentials",
        description: "Navigate stores and make purchases",
        lessonIds: [
          "life_shopping_01",
          "life_shopping_02",
          "life_shopping_03",
          "life_shopping_04",
        ],
        vocabularyCount: 40,
      },
    ],
  },
  {
    id: "life_transportation",
    name: "Getting Around",
    description: "Transportation and directions",
    icon: "🚗",
    mode: "life",
    order: 4,
    subcategories: [
      {
        id: "transport_basics",
        name: "Transportation Essentials",
        description: "Public transit, ride sharing, and directions",
        lessonIds: [
          "life_transport_01",
          "life_transport_02",
          "life_transport_03",
          "life_transport_04",
        ],
        vocabularyCount: 40,
      },
    ],
  },
  {
    id: "life_healthcare",
    name: "Healthcare",
    description: "Doctor visits, pharmacy, and emergencies",
    icon: "⚕️",
    mode: "life",
    order: 5,
    subcategories: [
      {
        id: "healthcare_basics",
        name: "Healthcare Essentials",
        description: "Medical appointments and pharmacy",
        lessonIds: [
          "life_healthcare_01",
          "life_healthcare_02",
          "life_healthcare_03",
          "life_healthcare_04",
        ],
        vocabularyCount: 40,
      },
    ],
  },
  {
    id: "life_housing",
    name: "Housing & Utilities",
    description: "Renting, home problems, and neighbors",
    icon: "🏠",
    mode: "life",
    order: 6,
    subcategories: [
      {
        id: "housing_basics",
        name: "Housing Essentials",
        description: "Renting and home maintenance",
        lessonIds: [
          "life_housing_01",
          "life_housing_02",
          "life_housing_03",
        ],
        vocabularyCount: 30,
      },
    ],
  },
  {
    id: "life_banking",
    name: "Banking & Finance",
    description: "Bank accounts, payments, and credit",
    icon: "💰",
    mode: "life",
    order: 7,
    subcategories: [
      {
        id: "banking_basics",
        name: "Banking Essentials",
        description: "Opening accounts and daily banking",
        lessonIds: [
          "life_banking_01",
          "life_banking_02",
          "life_banking_03",
        ],
        vocabularyCount: 30,
      },
    ],
  },
  {
    id: "life_social",
    name: "Social & Entertainment",
    description: "Making plans, parties, and entertainment",
    icon: "🎉",
    mode: "life",
    order: 8,
    subcategories: [
      {
        id: "social_basics",
        name: "Social Essentials",
        description: "Hanging out and entertainment",
        lessonIds: [
          "life_social_01",
          "life_social_02",
          "life_social_03",
          "life_social_04",
        ],
        vocabularyCount: 40,
      },
    ],
  },
  {
    id: "life_idioms",
    name: "Idioms & Slang",
    description: "Common expressions and modern slang",
    icon: "💬",
    mode: "life",
    order: 9,
    subcategories: [
      {
        id: "idioms_basics",
        name: "Idioms & Slang Essentials",
        description: "Speak like a native",
        lessonIds: [
          "life_idioms_01",
          "life_idioms_02",
          "life_idioms_03",
          "life_idioms_04",
          "life_idioms_05",
        ],
        vocabularyCount: 50,
      },
    ],
  },
  {
    id: "life_phone",
    name: "Phone & Appointments",
    description: "Phone calls, appointments, and customer service",
    icon: "📞",
    mode: "life",
    order: 10,
    subcategories: [
      {
        id: "phone_basics",
        name: "Phone Essentials",
        description: "Making calls and scheduling",
        lessonIds: [
          "life_phone_01",
          "life_phone_02",
          "life_phone_03",
        ],
        vocabularyCount: 30,
      },
    ],
  },
];
