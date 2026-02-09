import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Card } from "@/components";

interface MatchPair {
  id: string;
  left: string;
  right: string;
}

interface MatchPairsProps {
  pairs: MatchPair[];
  onComplete: (isCorrect: boolean) => void;
}

export default function MatchPairs({ pairs, onComplete }: MatchPairsProps) {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());
  const [incorrectPairs, setIncorrectPairs] = useState<Set<string>>(new Set());

  // Shuffle right column for display
  const [rightItems] = useState(() => {
    const items = [...pairs];
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
  });

  const handleLeftPress = (id: string) => {
    if (matchedPairs.has(id)) return;
    setSelectedLeft(id);

    // If right already selected, check match
    if (selectedRight) {
      checkMatch(id, selectedRight);
    }
  };

  const handleRightPress = (id: string) => {
    if (matchedPairs.has(id)) return;
    setSelectedRight(id);

    // If left already selected, check match
    if (selectedLeft) {
      checkMatch(selectedLeft, id);
    }
  };

  const checkMatch = (leftId: string, rightId: string) => {
    if (leftId === rightId) {
      // Correct match!
      setMatchedPairs((prev) => new Set([...prev, leftId]));
      setSelectedLeft(null);
      setSelectedRight(null);

      // Check if all pairs matched
      if (matchedPairs.size + 1 === pairs.length) {
        setTimeout(() => onComplete(true), 500);
      }
    } else {
      // Incorrect match
      setIncorrectPairs(new Set([leftId, rightId]));
      setTimeout(() => {
        setIncorrectPairs(new Set());
        setSelectedLeft(null);
        setSelectedRight(null);
      }, 800);
    }
  };

  const getLeftStyle = (id: string) => {
    if (matchedPairs.has(id)) return "bg-success/20 border-success border-2";
    if (incorrectPairs.has(id)) return "bg-error/20 border-error border-2";
    if (selectedLeft === id) return "bg-primary/20 border-primary border-2";
    return "bg-white border-neutral-300 border-2";
  };

  const getRightStyle = (id: string) => {
    if (matchedPairs.has(id)) return "bg-success/20 border-success border-2";
    if (incorrectPairs.has(id)) return "bg-error/20 border-error border-2";
    if (selectedRight === id) return "bg-primary/20 border-primary border-2";
    return "bg-white border-neutral-300 border-2";
  };

  return (
    <View className="flex-1 justify-center p-lg gap-lg">
      <View className="gap-sm">
        <Text className="text-h3 font-bold text-neutral-800 text-center">
          Match the Pairs
        </Text>
        <Text className="text-body-sm text-neutral-600 text-center">
          Tap items from both columns to match them
        </Text>
      </View>

      <View className="flex-row gap-md">
        {/* Left Column */}
        <View className="flex-1 gap-sm">
          {pairs.map((pair) => (
            <Pressable
              key={`left-${pair.id}`}
              onPress={() => handleLeftPress(pair.id)}
              disabled={matchedPairs.has(pair.id)}
              className="active:opacity-80"
            >
              <Card padding="md" className={getLeftStyle(pair.id)}>
                <Text className="text-body text-neutral-800 text-center">
                  {pair.left}
                </Text>
              </Card>
            </Pressable>
          ))}
        </View>

        {/* Right Column */}
        <View className="flex-1 gap-sm">
          {rightItems.map((pair) => (
            <Pressable
              key={`right-${pair.id}`}
              onPress={() => handleRightPress(pair.id)}
              disabled={matchedPairs.has(pair.id)}
              className="active:opacity-80"
            >
              <Card padding="md" className={getRightStyle(pair.id)}>
                <Text className="text-body text-neutral-800 text-center">
                  {pair.right}
                </Text>
              </Card>
            </Pressable>
          ))}
        </View>
      </View>

      <View className="items-center">
        <Text className="text-body-sm text-neutral-600">
          {matchedPairs.size} / {pairs.length} matched
        </Text>
      </View>
    </View>
  );
}
