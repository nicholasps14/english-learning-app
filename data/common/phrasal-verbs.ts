export interface PhrasalVerb {
  verb: string;
  particle: string;
  meaning: string;
  meaningPT: string;
  example: string;
  exampleTranslation: string;
  separable: boolean;
}

export const phrasalVerbs: PhrasalVerb[] = [
  // LOOK verbs
  {
    verb: "look",
    particle: "up",
    meaning: "search for information",
    meaningPT: "procurar (informação)",
    example: "I need to look up this word in the dictionary.",
    exampleTranslation: "Preciso procurar esta palavra no dicionário.",
    separable: true,
  },
  {
    verb: "look",
    particle: "after",
    meaning: "take care of",
    meaningPT: "cuidar de",
    example: "Can you look after my dog while I'm away?",
    exampleTranslation: "Você pode cuidar do meu cachorro enquanto estou fora?",
    separable: false,
  },
  {
    verb: "look",
    particle: "forward to",
    meaning: "anticipate with pleasure",
    meaningPT: "aguardar ansiosamente",
    example: "I'm looking forward to the weekend!",
    exampleTranslation: "Estou aguardando ansiosamente o fim de semana!",
    separable: false,
  },

  // GET verbs
  {
    verb: "get",
    particle: "up",
    meaning: "rise from bed",
    meaningPT: "levantar (da cama)",
    example: "I get up at 7 AM every day.",
    exampleTranslation: "Eu levanto às 7 da manhã todo dia.",
    separable: false,
  },
  {
    verb: "get",
    particle: "along",
    meaning: "have a good relationship",
    meaningPT: "se dar bem com",
    example: "Do you get along with your coworkers?",
    exampleTranslation: "Você se dá bem com seus colegas de trabalho?",
    separable: false,
  },
  {
    verb: "get",
    particle: "over",
    meaning: "recover from",
    meaningPT: "superar",
    example: "It took me a week to get over the flu.",
    exampleTranslation: "Levei uma semana para superar a gripe.",
    separable: false,
  },

  // TAKE verbs
  {
    verb: "take",
    particle: "off",
    meaning: "remove (clothes); leave (plane)",
    meaningPT: "tirar; decolar",
    example: "Take off your shoes. / The plane takes off at 3 PM.",
    exampleTranslation: "Tire seus sapatos. / O avião decola às 15h.",
    separable: true,
  },
  {
    verb: "take",
    particle: "on",
    meaning: "accept responsibility",
    meaningPT: "assumir",
    example: "I'll take on this project.",
    exampleTranslation: "Vou assumir este projeto.",
    separable: true,
  },

  // GIVE verbs
  {
    verb: "give",
    particle: "up",
    meaning: "stop trying; quit",
    meaningPT: "desistir",
    example: "Don't give up! You're almost there.",
    exampleTranslation: "Não desista! Você está quase lá.",
    separable: true,
  },
  {
    verb: "give",
    particle: "back",
    meaning: "return something",
    meaningPT: "devolver",
    example: "Please give back my book.",
    exampleTranslation: "Por favor, devolva meu livro.",
    separable: true,
  },

  // RUN verbs
  {
    verb: "run",
    particle: "into",
    meaning: "meet by chance",
    meaningPT: "encontrar por acaso",
    example: "I ran into an old friend yesterday.",
    exampleTranslation: "Encontrei um velho amigo por acaso ontem.",
    separable: false,
  },
  {
    verb: "run",
    particle: "out of",
    meaning: "use all of something",
    meaningPT: "ficar sem",
    example: "We ran out of milk.",
    exampleTranslation: "Ficamos sem leite.",
    separable: false,
  },

  // TURN verbs
  {
    verb: "turn",
    particle: "on",
    meaning: "start a device",
    meaningPT: "ligar",
    example: "Turn on the TV.",
    exampleTranslation: "Ligue a TV.",
    separable: true,
  },
  {
    verb: "turn",
    particle: "off",
    meaning: "stop a device",
    meaningPT: "desligar",
    example: "Don't forget to turn off the lights.",
    exampleTranslation: "Não esqueça de desligar as luzes.",
    separable: true,
  },

  // WORK verbs
  {
    verb: "work",
    particle: "out",
    meaning: "exercise; solve",
    meaningPT: "malhar; resolver",
    example: "I work out three times a week. / We'll work it out.",
    exampleTranslation: "Eu malho três vezes por semana. / Vamos resolver isso.",
    separable: true,
  },

  // COME verbs
  {
    verb: "come",
    particle: "across",
    meaning: "find by chance",
    meaningPT: "encontrar por acaso",
    example: "I came across this article online.",
    exampleTranslation: "Encontrei este artigo online por acaso.",
    separable: false,
  },

  // PUT verbs
  {
    verb: "put",
    particle: "off",
    meaning: "postpone",
    meaningPT: "adiar",
    example: "Let's put off the meeting until next week.",
    exampleTranslation: "Vamos adiar a reunião para a próxima semana.",
    separable: true,
  },
  {
    verb: "put",
    particle: "up with",
    meaning: "tolerate",
    meaningPT: "tolerar; aguentar",
    example: "I can't put up with this noise anymore.",
    exampleTranslation: "Não consigo mais aguentar esse barulho.",
    separable: false,
  },
];
