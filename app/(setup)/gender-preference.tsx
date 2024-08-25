import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Keyboard,
} from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";
import { Link, useRouter } from "expo-router";
import { useAppTheme } from "@/theme/ThemeProvider";

export default function GenderPreferencePage() {
  const { theme } = useAppTheme();
  const router = useRouter();
  const [selectedPreferences, setSelectedPreferences] = useState([]);

  const togglePreference = (preference) => {
    if (selectedPreferences.includes(preference)) {
      setSelectedPreferences(
        selectedPreferences.filter((item) => item !== preference)
      );
    } else {
      setSelectedPreferences([...selectedPreferences, preference]);
    }
  };

  const handleContinue = () => {
    if (selectedPreferences.length === 0) {
      // alert("Please select at least one preference.");
    } else {
      console.log("Selected Preferences:", selectedPreferences);
      // Handle submission logic here
    }
    router.push("/profile-photo");
  };

  return (
    <Pressable
      onPress={Keyboard.dismiss}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.contentContainer}>
        <Icon
          name="heart"
          size={50}
          color={theme.colors.primary}
          style={styles.icon}
        />
        <Text
          style={[
            styles.headerText,
            { color: theme.colors.text, fontFamily: theme.fonts.poppins.bold },
          ]}
        >
          Who are you interested in?
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
          This helps us find the right matches for you.
        </Text>

        <View style={styles.preferenceOptions}>
          <TouchableOpacity
            style={[
              styles.preferenceOption,
              {
                backgroundColor: theme.colors.card,
              },
              selectedPreferences.includes("Men") && {
                backgroundColor: theme.colors.primary,
              },
            ]}
            onPress={() => togglePreference("Men")}
          >
            <Text
              style={[
                styles.preferenceText,
                { color: theme.colors.text },
                selectedPreferences.includes("Men") && {
                  color: theme.colors.buttonText,
                },
              ]}
            >
              Men
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.preferenceOption,
              { backgroundColor: theme.colors.card },
              selectedPreferences.includes("Women") && {
                backgroundColor: theme.colors.primary,
              },
            ]}
            onPress={() => togglePreference("Women")}
          >
            <Text
              style={[
                styles.preferenceText,
                { color: theme.colors.text },
                selectedPreferences.includes("Women") && {
                  color: theme.colors.buttonText,
                },
              ]}
            >
              Women
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.preferenceOption,
              { backgroundColor: theme.colors.card },
              selectedPreferences.includes("Everyone") && {
                backgroundColor: theme.colors.primary,
              },
            ]}
            onPress={() => togglePreference("Everyone")}
          >
            <Text
              style={[
                styles.preferenceText,
                { color: theme.colors.text },
                selectedPreferences.includes("Everyone") && {
                  color: theme.colors.buttonText,
                },
              ]}
            >
              Everyone
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Pressable
        style={[
          styles.continueButton,
          { backgroundColor: theme.colors.primary },
        ]}
        onPress={handleContinue}
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
          Continue
        </Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 40,
    marginTop: -20,
  },
  contentContainer: {
    alignItems: "center",
    padding: 10,
  },
  icon: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
  },
  preferenceOptions: {
    width: "100%",
  },
  preferenceOption: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  preferenceText: {
    fontSize: 18,
    color: "#FFFFFF", // Default text color
    fontFamily: "Poppins-Regular",
  },
  continueButton: {
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    width: "80%",
    alignSelf: "center",
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
