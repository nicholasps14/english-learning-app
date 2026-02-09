import React from "react";
import { View, Text, ScrollView, Pressable, Linking } from "react-native";
import { router } from "expo-router";
import { Card } from "@/components";

export default function HelpScreen() {
  const faqs = [
    {
      question: "How does spaced repetition work?",
      answer:
        "Our app uses the SM-2 algorithm to schedule review sessions based on how well you remember each word. Words you struggle with appear more frequently, while words you know well appear less often.",
    },
    {
      question: "What's the difference between Tech and Life modes?",
      answer:
        "Tech Mode focuses on programming vocabulary and technical communication. Life Mode covers everyday situations like shopping, restaurants, and small talk.",
    },
    {
      question: "How do I maintain my streak?",
      answer:
        "Complete at least one lesson or review session every day. Your streak resets if you miss a day, so set up daily reminders!",
    },
    {
      question: "Can I practice without completing lessons?",
      answer:
        "Yes! Use the Free Practice mode to review vocabulary you've already learned using different exercise types.",
    },
  ];

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-lg gap-lg">
        {/* Header */}
        <View className="flex-row items-center justify-between">
          <Pressable onPress={() => router.push("/(tabs)/tech")} className="active:opacity-70">
            <Text className="text-2xl">←</Text>
          </Pressable>
          <Text className="text-h2 font-bold text-neutral-900">Help & Feedback</Text>
          <View style={{ width: 32 }} />
        </View>

        {/* Contact Card */}
        <View
          className="rounded-2xl p-xl border border-neutral-200"
          style={{ backgroundColor: "#007AFF" }}
        >
          <View className="gap-md">
            <Text className="text-h3 font-bold text-white">Need Help?</Text>
            <Text className="text-body text-white/90">
              We're here to help! Send us your questions or feedback.
            </Text>
            <Pressable
              onPress={() => Linking.openURL("mailto:support@englishflow.com")}
              className="bg-white rounded-lg py-md items-center active:opacity-80"
            >
              <Text className="text-body font-semibold" style={{ color: "#007AFF" }}>
                Contact Support
              </Text>
            </Pressable>
          </View>
        </View>

        {/* FAQs */}
        <View className="gap-sm">
          <Text className="text-h3 font-bold text-neutral-900">
            Frequently Asked Questions
          </Text>

          {faqs.map((faq, index) => (
            <Card key={index}>
              <View className="gap-sm">
                <Text className="text-body font-bold text-neutral-900">
                  {faq.question}
                </Text>
                <Text className="text-body-sm text-neutral-600">{faq.answer}</Text>
              </View>
            </Card>
          ))}
        </View>

        {/* Quick Links */}
        <View className="gap-sm">
          <Text className="text-h3 font-bold text-neutral-900">Quick Links</Text>

          <Card>
            <Pressable
              className="py-sm active:opacity-70"
              onPress={() => console.log("Open tutorial")}
            >
              <Text className="text-body text-neutral-900">📖 Tutorial</Text>
            </Pressable>
          </Card>

          <Card>
            <Pressable
              className="py-sm active:opacity-70"
              onPress={() => console.log("Open learning tips")}
            >
              <Text className="text-body text-neutral-900">💡 Learning Tips</Text>
            </Pressable>
          </Card>

          <Card>
            <Pressable
              className="py-sm active:opacity-70"
              onPress={() => Linking.openURL("https://englishflow.com/feedback")}
            >
              <Text className="text-body text-neutral-900">✍️ Send Feedback</Text>
            </Pressable>
          </Card>
        </View>
      </View>
    </ScrollView>
  );
}
