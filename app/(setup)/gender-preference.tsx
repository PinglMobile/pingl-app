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
import { Link } from "expo-router";

export default function GenderPreferencePage() {
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
  };

  return (
    <Pressable onPress={Keyboard.dismiss} style={styles.container}>
      <View style={styles.contentContainer}>
        <Icon name="heart" size={50} color="#FF7366" style={styles.icon} />
        <Text style={styles.headerText}>Who are you interested in?</Text>
        <Text style={styles.subText}>
          This helps us find the right matches for you.
        </Text>

        <View style={styles.preferenceOptions}>
          <TouchableOpacity
            style={[
              styles.preferenceOption,
              selectedPreferences.includes("Men") && styles.selectedOption,
            ]}
            onPress={() => togglePreference("Men")}
          >
            <Text
              style={[
                styles.preferenceText,
                selectedPreferences.includes("Men") &&
                  styles.selectedPreferenceText,
              ]}
            >
              Men
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.preferenceOption,
              selectedPreferences.includes("Women") && styles.selectedOption,
            ]}
            onPress={() => togglePreference("Women")}
          >
            <Text
              style={[
                styles.preferenceText,
                selectedPreferences.includes("Women") &&
                  styles.selectedPreferenceText,
              ]}
            >
              Women
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.preferenceOption,
              selectedPreferences.includes("Everyone") && styles.selectedOption,
            ]}
            onPress={() => togglePreference("Everyone")}
          >
            <Text
              style={[
                styles.preferenceText,
                selectedPreferences.includes("Everyone") &&
                  styles.selectedPreferenceText,
              ]}
            >
              Everyone
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Link href="./profile-photo" asChild>
        <Pressable style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </Pressable>
      </Link>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212121", // Dark background color
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
    color: "#FFFFFF", // Light text color for dark theme
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "Poppins-Bold",
  },
  subText: {
    fontSize: 16,
    color: "#BDBDBD", // Light gray for subtext
    textAlign: "center",
    marginBottom: 40,
    fontFamily: "Poppins-Regular",
  },
  preferenceOptions: {
    width: "100%",
  },
  preferenceOption: {
    backgroundColor: "#424242", // Darker background for options
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  preferenceText: {
    fontSize: 18,
    color: "#FFFFFF", // Light text color for options
    fontFamily: "Poppins-Regular",
  },
  selectedOption: {
    backgroundColor: "#FF7366", // Accent color for selected option
  },
  selectedPreferenceText: {
    color: "white",
  },
  continueButton: {
    backgroundColor: "#FF7366", // Accent color for button
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    width: "80%",
    alignSelf: "center",
  },
  continueButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
  },
});
