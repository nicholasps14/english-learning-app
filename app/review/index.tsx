import { View, Text, ScrollView, Pressable } from "react-native";
import { router } from "expo-router";
import { Card, Button, Badge } from "@/components";
import { useVocabularyStore, useProgressStore } from "@/stores";

export default function ReviewScreen() {
  const vocabulary = useVocabularyStore((state) => state.vocabulary);
  const srsData = useVocabularyStore((state) => state.srsData);
  const progress = useProgressStore((state) => state.progress);

  if (!progress) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  // Get vocabulary due for review
  const now = new Date();
  const dueVocabulary = vocabulary.filter((item) => {
    const srs = srsData[item.id];
    if (!srs) return false;
    return new Date(srs.nextReviewDate) <= now;
  });

  // Get recently learned vocabulary (learned but not mastered)
  const recentlyLearned = vocabulary.filter((item) =>
    progress.learnedVocabularyIds.includes(item.id) &&
    !progress.masteredVocabularyIds.includes(item.id)
  );

  const startReview = () => {
    if (dueVocabulary.length > 0) {
      router.push("/review/session");
    }
  };

  return (
    <ScrollView className="flex-1 bg-neutral-50">
      <View className="p-lg gap-lg">
        {/* Back Button */}
        <Pressable
          onPress={() => router.back()}
          className="flex-row items-center gap-sm active:opacity-70 mb-sm"
        >
          <Text className="text-2xl">←</Text>
          <Text className="text-body text-neutral-600">Back</Text>
        </Pressable>

        {/* Header */}
        <View className="bg-primary p-xl rounded-2xl">
          <Text className="text-h1 text-white font-bold">Review</Text>
          <Text className="text-body text-white/90 mt-xs">
            Practice what you've learned using spaced repetition
          </Text>
        </View>

        {/* Due for Review */}
        <Card>
          <View className="gap-md">
            <View className="flex-row items-center justify-between">
              <Text className="text-h3 font-bold text-neutral-800">
                Due for Review
              </Text>
              <Badge variant="warning" size="lg">
                {dueVocabulary.length.toString()}
              </Badge>
            </View>

            {dueVocabulary.length === 0 ? (
              <View className="py-lg items-center">
                <Text className="text-6xl mb-md">✅</Text>
                <Text className="text-body text-neutral-600 text-center">
                  You're all caught up!
                </Text>
                <Text className="text-body-sm text-neutral-500 text-center mt-xs">
                  Come back later for more reviews
                </Text>
              </View>
            ) : (
              <>
                <Text className="text-body text-neutral-600">
                  {dueVocabulary.length} words are ready to review. Keep your memory fresh!
                </Text>
                <Button variant="primary" size="lg" onPress={startReview}>
                  Start Review Session
                </Button>
              </>
            )}
          </View>
        </Card>

        {/* Learning Stats */}
        <Card>
          <Text className="text-h3 font-bold text-neutral-800 mb-md">
            Your Vocabulary
          </Text>
          <View className="gap-sm">
            <View className="flex-row justify-between items-center py-sm border-b border-neutral-200">
              <Text className="text-body text-neutral-600">Total Learned</Text>
              <Text className="text-body font-bold text-neutral-800">
                {progress.totalVocabularyLearned}
              </Text>
            </View>
            <View className="flex-row justify-between items-center py-sm border-b border-neutral-200">
              <Text className="text-body text-neutral-600">Mastered</Text>
              <Text className="text-body font-bold text-success">
                {progress.masteredVocabularyIds.length}
              </Text>
            </View>
            <View className="flex-row justify-between items-center py-sm">
              <Text className="text-body text-neutral-600">In Progress</Text>
              <Text className="text-body font-bold text-warning">
                {recentlyLearned.length}
              </Text>
            </View>
          </View>
        </Card>

        {/* Recently Learned */}
        {recentlyLearned.length > 0 && (
          <Card>
            <Text className="text-h3 font-bold text-neutral-800 mb-md">
              Recently Learned
            </Text>
            <View className="gap-sm">
              {recentlyLearned.slice(0, 5).map((item) => (
                <View
                  key={item.id}
                  className="flex-row justify-between items-center py-sm border-b border-neutral-200"
                >
                  <View className="flex-1">
                    <Text className="text-body font-semibold text-neutral-800">
                      {item.word}
                    </Text>
                    <Text className="text-body-sm text-neutral-600">
                      {item.translation}
                    </Text>
                  </View>
                  <Badge variant={item.mode === "tech" ? "tech" : "life"} size="sm">
                    {item.category}
                  </Badge>
                </View>
              ))}
            </View>
          </Card>
        )}
      </View>
    </ScrollView>
  );
}
