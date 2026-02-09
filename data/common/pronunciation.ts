export interface PronunciationGuide {
  sound: string;
  challenge: string;
  practiceWords: string[];
  tip: string;
  example: string;
}

export const pronunciationGuides: PronunciationGuide[] = [
  {
    sound: "TH (voiceless)",
    challenge: "Portuguese doesn't have this sound",
    practiceWords: ["think", "three", "through", "thing", "thanks"],
    tip: "Put your tongue between your teeth and blow air without voice",
    example: "Think carefully before you speak",
  },
  {
    sound: "TH (voiced)",
    challenge: "Portuguese doesn't have this sound",
    practiceWords: ["this", "that", "the", "they", "there"],
    tip: "Same tongue position as voiceless TH, but add voice",
    example: "This is the place where they meet",
  },
  {
    sound: "Final L",
    challenge: "Portuguese makes final L sound like W/U",
    practiceWords: ["fall", "pool", "bottle", "little", "call"],
    tip: "Keep your tongue touching the roof of your mouth",
    example: "I'll call you after I fall asleep",
  },
  {
    sound: "R vs H",
    challenge: "Portuguese R sounds like English H",
    practiceWords: ["run/hun", "rate/hate", "red/head", "rest/hest"],
    tip: "For R: curl tongue back, don't touch roof of mouth",
    example: "Run to the red restaurant",
  },
  {
    sound: "Short I vs Long EE",
    challenge: "Portuguese treats these the same",
    practiceWords: ["bit/beat", "sit/seat", "ship/sheep", "live/leave"],
    tip: "Short I: relax jaw, make it brief. Long EE: smile, hold longer",
    example: "I need to sit in my seat",
  },
  {
    sound: "Initial S + consonant",
    challenge: "Portuguese adds E before (espeak, estop)",
    practiceWords: ["speak", "stop", "school", "street", "sport"],
    tip: "Start directly with S sound, no 'e' before it",
    example: "Stop speaking Spanish in school",
  },
  {
    sound: "-ED endings",
    challenge: "Portuguese adds extra syllable",
    practiceWords: ["worked", "played", "wanted", "called", "visited"],
    tip: "Only 3 sounds: /t/ (worked), /d/ (played), /ɪd/ (wanted)",
    example: "I worked yesterday and played today",
  },
  {
    sound: "W sound",
    challenge: "Doesn't exist in Portuguese",
    practiceWords: ["water", "world", "work", "what", "when"],
    tip: "Round your lips like saying 'u', don't use V sound",
    example: "What would you like to drink? Water or wine?",
  },
];
