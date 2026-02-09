import { useState } from "react";
import { View, Text, Pressable, Dimensions } from "react-native";

interface FlashCardProps {
  word: string;
  translation: string;
  pronunciation?: string;
  example?: string;
  exampleTranslation?: string;
  onRate?: (quality: number) => void;
  showRating?: boolean;
}

const { width } = Dimensions.get("window");
const CARD_WIDTH = Math.min(width - 48, 400);

export default function FlashCard({
  word,
  translation,
  pronunciation,
  example,
  exampleTranslation,
  onRate,
  showRating = true,
}: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleRating = (quality: number) => {
    if (onRate) {
      onRate(quality);
    }
  };

  return (
    <View className="items-center gap-lg">
      {/* Card Container - Simple flip with conditional rendering */}
      <Pressable onPress={handleFlip} className="w-full" style={{ minHeight: 300 }}>
        <View
          style={{
            width: CARD_WIDTH,
            height: 300,
          }}
          className="self-center"
        >
          {!isFlipped ? (
            /* Front of Card */
            <View
              style={{ backgroundColor: '#FFFFFF' }}
              className="rounded-2xl p-xl items-center justify-center border border-neutral-200 shadow-md w-full h-full"
            >
              <Text style={{ color: '#1C1C1E', fontSize: 34, fontWeight: 'bold', textAlign: 'center', marginBottom: 12 }}>
                {word}
              </Text>
              <Text style={{ color: '#8E8E93', fontSize: 13, textAlign: 'center' }}>
                Tap to reveal translation
              </Text>
            </View>
          ) : (
            /* Back of Card */
            <View
              style={{ backgroundColor: '#007AFF' }}
              className="p-xl items-center justify-center rounded-2xl shadow-md w-full h-full"
            >
              <Text style={{ color: '#000000', fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 }}>
                {translation}
              </Text>
              {pronunciation && (
                <Text style={{ color: '#000000', opacity: 0.8, fontSize: 17, textAlign: 'center', marginBottom: 12 }}>
                  {pronunciation}
                </Text>
              )}
              {example && (
                <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', padding: 12, borderRadius: 8, marginTop: 12 }}>
                  <Text style={{ color: '#000000', fontSize: 13, textAlign: 'center' }}>
                    "{example}"
                  </Text>
                  {exampleTranslation && (
                    <Text style={{ color: '#000000', opacity: 0.7, fontSize: 13, textAlign: 'center', marginTop: 4 }}>
                      {exampleTranslation}
                    </Text>
                  )}
                </View>
              )}
            </View>
          )}
        </View>
      </Pressable>

      {/* Rating Buttons (SM-2 Algorithm) */}
      {showRating && isFlipped && (
        <View className="w-full gap-sm">
          <Text className="text-body-sm text-neutral-600 text-center mb-sm">
            How well did you know this?
          </Text>
          <View className="flex-row gap-sm">
            <Pressable
              onPress={() => handleRating(0)}
              className="flex-1 bg-error py-md rounded-lg active:opacity-80"
            >
              <Text className="text-body-sm font-semibold text-white text-center">
                Again
              </Text>
              <Text className="text-xs text-white/70 text-center">{"<1m"}</Text>
            </Pressable>
            <Pressable
              onPress={() => handleRating(3)}
              className="flex-1 bg-warning py-md rounded-lg active:opacity-80"
            >
              <Text className="text-body-sm font-semibold text-white text-center">
                Hard
              </Text>
              <Text className="text-xs text-white/70 text-center">{"<10m"}</Text>
            </Pressable>
            <Pressable
              onPress={() => handleRating(4)}
              className="flex-1 bg-success py-md rounded-lg active:opacity-80"
            >
              <Text className="text-body-sm font-semibold text-white text-center">
                Good
              </Text>
              <Text className="text-xs text-white/70 text-center">{"4d"}</Text>
            </Pressable>
            <Pressable
              onPress={() => handleRating(5)}
              className="flex-1 bg-primary py-md rounded-lg active:opacity-80"
            >
              <Text className="text-body-sm font-semibold text-white text-center">
                Easy
              </Text>
              <Text className="text-xs text-white/70 text-center">{"7d"}</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}
