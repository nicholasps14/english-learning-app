export interface FalseCognate {
  english: string;
  looksLikePT: string;
  actualMeaningPT: string;
  example: string;
  exampleTranslation: string;
  commonMistake: string;
}

export const falseCognates: FalseCognate[] = [
  {
    english: "actually",
    looksLikePT: "atualmente",
    actualMeaningPT: "na verdade",
    example: "I'm actually from Brazil, not Argentina.",
    exampleTranslation: "Na verdade sou do Brasil, não da Argentina.",
    commonMistake: "Brazilians often use 'actually' when they mean 'currently' (atualmente)",
  },
  {
    english: "pretend",
    looksLikePT: "pretender",
    actualMeaningPT: "fingir",
    example: "She's just pretending to be sick.",
    exampleTranslation: "Ela está apenas fingindo estar doente.",
    commonMistake: "Don't use 'pretend' when you mean 'intend' (pretender = intend)",
  },
  {
    english: "push",
    looksLikePT: "puxar",
    actualMeaningPT: "empurrar",
    example: "Push the door, don't pull it.",
    exampleTranslation: "Empurre a porta, não puxe.",
    commonMistake: "Door signs can be confusing - push = empurrar, pull = puxar",
  },
  {
    english: "fabric",
    looksLikePT: "fábrica",
    actualMeaningPT: "tecido",
    example: "This fabric is very soft.",
    exampleTranslation: "Este tecido é muito macio.",
    commonMistake: "Factory in English is 'factory', not 'fabric'",
  },
  {
    english: "college",
    looksLikePT: "colégio",
    actualMeaningPT: "faculdade",
    example: "I'm going to college next year.",
    exampleTranslation: "Vou para a faculdade no próximo ano.",
    commonMistake: "High school is not 'college' - use 'high school' for colégio",
  },
  {
    english: "sensible",
    looksLikePT: "sensível",
    actualMeaningPT: "sensato",
    example: "That's a very sensible decision.",
    exampleTranslation: "Essa é uma decisão muito sensata.",
    commonMistake: "For 'sensitive' (sensível), use 'sensitive', not 'sensible'",
  },
  {
    english: "parents",
    looksLikePT: "parentes",
    actualMeaningPT: "pais",
    example: "My parents are visiting next week.",
    exampleTranslation: "Meus pais vão visitar na próxima semana.",
    commonMistake: "Relatives (parentes) is different from parents (pais)",
  },
  {
    english: "lecture",
    looksLikePT: "leitura",
    actualMeaningPT: "palestra",
    example: "The lecture was very interesting.",
    exampleTranslation: "A palestra foi muito interessante.",
    commonMistake: "Reading is 'reading', not 'lecture'",
  },
  {
    english: "attend",
    looksLikePT: "atender",
    actualMeaningPT: "comparecer",
    example: "I'll attend the meeting tomorrow.",
    exampleTranslation: "Vou comparecer à reunião amanhã.",
    commonMistake: "To answer/serve (atender) is 'answer' or 'serve', not 'attend'",
  },
  {
    english: "costume",
    looksLikePT: "costume",
    actualMeaningPT: "fantasia",
    example: "She wore a Halloween costume.",
    exampleTranslation: "Ela usou uma fantasia de Halloween.",
    commonMistake: "Custom/habit (costume) is 'custom' or 'habit', not 'costume'",
  },
];
