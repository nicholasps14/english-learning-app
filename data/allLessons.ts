import { Lesson } from "@/lib/types";

// Import all Tech Mode lessons
import {
  meetingsLessons,
  codeReviewLessons,
  slackEmailLessons,
  technicalLessons,
  careerLessons,
} from "./tech";

// Import all Life Mode lessons
import {
  greetingsLessons,
  restaurantLessons,
  shoppingLessons,
  transportationLessons,
  healthcareLessons,
  housingLessons,
  bankingLessons,
  socialLessons,
  idiomsLessons,
  phoneLessons,
} from "./life";

// Combine all lessons into one array
export const allLessons: Lesson[] = [
  // Tech Mode Lessons (26 lessons)
  ...meetingsLessons,
  ...codeReviewLessons,
  ...slackEmailLessons,
  ...technicalLessons,
  ...careerLessons,

  // Life Mode Lessons (40 lessons)
  ...greetingsLessons,
  ...restaurantLessons,
  ...shoppingLessons,
  ...transportationLessons,
  ...healthcareLessons,
  ...housingLessons,
  ...bankingLessons,
  ...socialLessons,
  ...idiomsLessons,
  ...phoneLessons,
];

// Helper functions
export const getLessonById = (id: string): Lesson | undefined => {
  return allLessons.find((lesson) => lesson.id === id);
};

export const getTechLessons = (): Lesson[] => {
  return allLessons.filter((lesson) => lesson.mode === "tech");
};

export const getLifeLessons = (): Lesson[] => {
  return allLessons.filter((lesson) => lesson.mode === "life");
};

console.log(`📚 Loaded ${allLessons.length} lessons (${getTechLessons().length} Tech + ${getLifeLessons().length} Life)`);
