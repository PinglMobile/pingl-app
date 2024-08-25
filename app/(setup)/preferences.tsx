import { useAppTheme } from "@/theme/ThemeProvider";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function PreferencesPromptPage() {
  const { theme } = useAppTheme();

  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    food: [],
    dating: [],
    events: [],
    lifestyle: [],
  });

  const options = {
    food: [
      "🍕 Italian",
      "🍣 Japanese",
      "🌮 Mexican",
      "🍛 Indian",
      "🥟 Chinese",
      "🍔 American",
      "🥗 Mediterranean",
      "🍤 Thai",
      "🍜 Vietnamese",
      "🍝 Pasta",
    ],
    dating: [
      "👫 Long-Term",
      "👨‍❤️‍👨 Casual",
      "👩‍❤️‍👩 Open to Anything",
      "💍 Marriage",
      "❤️ Serious Relationship",
      "🗓️ Short-Term",
      "🚫 No Commitment",
      "👨‍👩‍👧‍👦 Family Oriented",
    ],
    events: [
      "🎤 Concerts",
      "🎭 Theater",
      "🎨 Art Exhibits",
      "🎬 Movie Screenings",
      "🍴 Food Festivals",
      "🎉 Parties",
      "🏟️ Sports Events",
      "🏕️ Outdoor Adventures",
      "🎤 Stand-up Comedy",
      "📚 Book Readings",
    ],
    lifestyle: [
      "🌍 Travel Often",
      "💻 Tech Savvy",
      "🚴‍♂️ Active Lifestyle",
      "📚 Book Lover",
      "🎮 Gamer",
      "🎨 Creative Arts",
      "🏠 Homebody",
      "🍺 Social Drinker",
      "🚭 Non-Smoker",
      "🥂 Party Enthusiast",
    ],
  };

  const maxSelections = {
    food: Infinity,
    dating: 1,
    events: 3,
    lifestyle: 3,
  };

  const handleSelect = (category, item) => {
    setPreferences((prev) => {
      const updatedCategory = prev[category].includes(item)
        ? prev[category].filter((i) => i !== item)
        : [...prev[category], item];

      return { ...prev, [category]: updatedCategory };
    });
  };

  const handleContinue = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      console.log("Final Preferences: ", preferences);
      // Handle final submission here
    }
  };

  const renderOptions = (category) => (
    <View style={styles.optionsContainer}>
      {options[category].map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.option,
            {
              backgroundColor: preferences[category].includes(item)
                ? theme.colors.primary
                : theme.colors.card,
            },
          ]}
          onPress={() => handleSelect(category, item)}
        >
          <Text
            style={[
              styles.optionText,
              {
                color: preferences[category].includes(item)
                  ? theme.colors.buttonText
                  : theme.colors.text,
              },
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Text
              style={[
                styles.headerText,
                {
                  color: theme.colors.text,
                  fontFamily: theme.fonts.poppins.bold,
                },
              ]}
            >
              Select Your Food Preferences
            </Text>
            <Text
              style={[
                styles.subText,
                {
                  color: theme.colors.subText,
                  fontFamily: theme.fonts.poppins.regular,
                },
              ]}
            >
              Choose as many types of food you enjoy as you like.
            </Text>
            {renderOptions("food")}
          </>
        );
      case 2:
        return (
          <>
            <Text
              style={[
                styles.headerText,
                {
                  color: theme.colors.text,
                  fontFamily: theme.fonts.poppins.bold,
                },
              ]}
            >
              Select Your Dating Preferences
            </Text>
            <Text
              style={[
                styles.subText,
                {
                  color: theme.colors.subText,
                  fontFamily: theme.fonts.poppins.regular,
                },
              ]}
            >
              Choose 1 type of dating preference.
            </Text>
            {renderOptions("dating")}
          </>
        );
      case 3:
        return (
          <>
            <Text
              style={[
                styles.headerText,
                {
                  color: theme.colors.text,
                  fontFamily: theme.fonts.poppins.bold,
                },
              ]}
            >
              Select Your Event Preferences
            </Text>
            <Text
              style={[
                styles.subText,
                {
                  color: theme.colors.subText,
                  fontFamily: theme.fonts.poppins.regular,
                },
              ]}
            >
              Choose up to 3 types of events you like to attend.
            </Text>
            {renderOptions("events")}
          </>
        );
      case 4:
        return (
          <>
            <Text
              style={[
                styles.headerText,
                {
                  color: theme.colors.text,
                  fontFamily: theme.fonts.poppins.bold,
                },
              ]}
            >
              Select Your Lifestyle Preferences
            </Text>
            <Text
              style={[
                styles.subText,
                {
                  color: theme.colors.subText,
                  fontFamily: theme.fonts.poppins.regular,
                },
              ]}
            >
              Choose up to 3 lifestyle preferences.
            </Text>
            {renderOptions("lifestyle")}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {renderStep()}
      </ScrollView>

      <TouchableOpacity
        style={[
          styles.continueButton,
          {
            backgroundColor: theme.colors.primary,
            opacity:
              (step === 1 && preferences.food.length === 0) ||
              (step === 2 && preferences.dating.length === 0) ||
              (step === 3 && preferences.events.length === 0) ||
              (step === 4 && preferences.lifestyle.length === 0)
                ? 0.6
                : 1,
          },
        ]}
        onPress={handleContinue}
        disabled={
          (step === 1 && preferences.food.length === 0) ||
          (step === 2 && preferences.dating.length === 0) ||
          (step === 3 && preferences.events.length === 0) ||
          (step === 4 && preferences.lifestyle.length === 0)
        }
      >
        <Text
          style={[
            styles.continueButtonText,
            {
              color: theme.colors.buttonText,
              fontFamily: theme.fonts.poppins.bold,
            },
          ]}
        >
          {step < 4 ? "Continue" : "Submit"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  contentContainer: {
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subText: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    margin: 5,
  },
  optionText: {
    fontSize: 14,
    textAlign: "center",
  },
  continueButton: {
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    width: "80%",
    alignSelf: "center",
    marginVertical: 20,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
