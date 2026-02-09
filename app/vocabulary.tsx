import { View, Text, ScrollView, Pressable } from "react-native";
import { router } from "expo-router";
import { useVocabularyStore, useProgressStore } from "@/stores";
import { Card, Badge } from "@/components";

export default function VocabularyScreen() {
  const vocabulary = useVocabularyStore((state) => state.vocabulary);
  const progress = useProgressStore((state) => state.progress);

  if (!progress) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  const learnedVocab = vocabulary.filter((v) =>
    progress.learnedVocabularyIds.includes(v.id)
  );

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-lg gap-lg">
        {/* Header */}
        <View className="flex-row items-center justify-between">
          <Pressable onPress={() => router.push("/(tabs)/tech")} className="active:opacity-70">
            <Text className="text-2xl">←</Text>
          </Pressable>
          <Text className="text-h2 font-bold text-neutral-900">Vocabulary</Text>
          <View style={{ width: 32 }} />
        </View>

        {/* Stats */}
        <Card>
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-h3 font-bold text-neutral-900">
                {learnedVocab.length} Words Learned
              </Text>
              <Text className="text-body-sm text-neutral-600 mt-xs">
                Out of {vocabulary.length} total
              </Text>
            </View>
            <Text className="text-4xl">📚</Text>
          </View>
        </Card>

        {/* Filter Tabs */}
        <View className="flex-row gap-sm">
          <View className="bg-primary px-md py-sm rounded-full">
            <Text className="text-body-sm font-semibold text-white">All</Text>
          </View>
          <View className="bg-neutral-100 px-md py-sm rounded-full">
            <Text className="text-body-sm text-neutral-600">Tech</Text>
          </View>
          <View className="bg-neutral-100 px-md py-sm rounded-full">
            <Text className="text-body-sm text-neutral-600">Life</Text>
          </View>
        </View>

        {/* Vocabulary List */}
        <View className="gap-sm">
          {learnedVocab.length === 0 ? (
            <Card>
              <Text className="text-body text-neutral-600 text-center">
                You haven't learned any words yet. Complete lessons to add words to your
                vocabulary!
              </Text>
            </Card>
          ) : (
            learnedVocab.map((word) => (
              <Card key={word.id}>
                <View className="gap-sm">
                  <View className="flex-row items-center justify-between">
                    <Text className="text-body font-bold text-neutral-900">
                      {word.word}
                    </Text>
                    <Badge
                      variant={word.mode === "tech" ? "tech" : "life"}
                      size="sm"
                    >
                      {word.mode}
                    </Badge>
                  </View>
                  <Text className="text-body text-neutral-700">
                    {word.translation}
                  </Text>
                  {word.pronunciation && (
                    <Text className="text-body-sm text-neutral-500">
                      {word.pronunciation}
                    </Text>
                  )}
                  {word.exampleSentence && (
                    <View className="bg-neutral-50 p-sm rounded-lg mt-xs">
                      <Text className="text-body-sm text-neutral-600 italic">
                        "{word.exampleSentence}"
                      </Text>
                    </View>
                  )}
                </View>
              </Card>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
}
