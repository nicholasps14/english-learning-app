import { View, Text, ScrollView } from "react-native";
import { router } from "expo-router";
import { Button } from "@/components";
import FlashCard from "@/components/FlashCard";
import { useState } from "react";

export default function ReviewTestScreen() {
  const [currentCard, setCurrentCard] = useState(0);

  const testCards = [
    {
      word: "variable",
      translation: "variável",
      pronunciation: "/ˈvɛəriəbəl/",
      example: "We need to declare a variable to store the user's name.",
      exampleTranslation: "Precisamos declarar uma variável para armazenar o nome do usuário.",
    },
    {
      word: "commit",
      translation: "confirmar/submeter",
      pronunciation: "/kəˈmɪt/",
      example: "Don't forget to commit your changes before pushing.",
      exampleTranslation: "Não esqueça de fazer commit das suas alterações antes de dar push.",
    },
    {
      word: "aisle",
      translation: "corredor",
      pronunciation: "/aɪl/",
      example: "The pasta is in aisle 5, next to the sauces.",
      exampleTranslation: "O macarrão está no corredor 5, ao lado dos molhos.",
    },
  ];

  const handleRate = (quality: number) => {
    console.log("Rated:", quality);
    if (currentCard < testCards.length - 1) {
      setTimeout(() => setCurrentCard(currentCard + 1), 500);
    } else {
      alert("Review complete!");
      router.back();
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-lg gap-lg">
        {/* Header */}
        <View className="flex-row items-center justify-between">
          <Button variant="outline" size="sm" onPress={() => router.back()}>
            Exit
          </Button>
          <Text className="text-body font-semibold text-neutral-700">
            Card {currentCard + 1} of {testCards.length}
          </Text>
        </View>

        {/* FlashCard */}
        <View className="mt-xl">
          <FlashCard
            word={testCards[currentCard].word}
            translation={testCards[currentCard].translation}
            pronunciation={testCards[currentCard].pronunciation}
            example={testCards[currentCard].example}
            exampleTranslation={testCards[currentCard].exampleTranslation}
            onRate={handleRate}
          />
        </View>

        {/* Instructions */}
        <View className="mt-xl bg-neutral-100 p-md rounded-lg">
          <Text className="text-body-sm text-neutral-700 text-center">
            💡 Tap the card to flip it and see the translation
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
