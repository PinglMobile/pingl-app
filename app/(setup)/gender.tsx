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

export default function GenderSelectionPage() {
  const [selectedGender, setSelectedGender] = useState("");

  const handleContinue = () => {
    if (!selectedGender) {
      alert("Please select a gender.");
    } else {
      console.log("Selected Gender:", selectedGender);
      // Handle submission logic here
    }
  };

  return (
    <Pressable onPress={Keyboard.dismiss} style={styles.container}>
      <View style={styles.contentContainer}>
        <Icon name="venus-mars" size={50} color="#FF7366" style={styles.icon} />
        <Text style={styles.headerText}>Select your gender</Text>
        <Text style={styles.subText}>
          This helps us show you relevant matches.
        </Text>

        <View style={styles.genderOptions}>
          <TouchableOpacity
            style={[
              styles.genderOption,
              selectedGender === "Male" && styles.selectedOption,
            ]}
            onPress={() => setSelectedGender("Male")}
          >
            <Text
              style={[
                styles.genderText,
                selectedGender === "Male" && styles.selectedGenderText,
              ]}
            >
              Male
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.genderOption,
              selectedGender === "Female" && styles.selectedOption,
            ]}
            onPress={() => setSelectedGender("Female")}
          >
            <Text
              style={[
                styles.genderText,
                selectedGender === "Female" && styles.selectedGenderText,
              ]}
            >
              Female
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.genderOption,
              selectedGender === "Non-binary" && styles.selectedOption,
            ]}
            onPress={() => setSelectedGender("Non-binary")}
          >
            <Text
              style={[
                styles.genderText,
                selectedGender === "Non-binary" && styles.selectedGenderText,
              ]}
            >
              Non-binary
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.genderOption,
              selectedGender === "Other" && styles.selectedOption,
            ]}
            onPress={() => setSelectedGender("Other")}
          >
            <Text
              style={[
                styles.genderText,
                selectedGender === "Other" && styles.selectedGenderText,
              ]}
            >
              Other
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.genderOption,
              selectedGender === "Prefer not to say" && styles.selectedOption,
            ]}
            onPress={() => setSelectedGender("Prefer not to say")}
          >
            <Text
              style={[
                styles.genderText,
                selectedGender === "Prefer not to say" &&
                  styles.selectedGenderText,
              ]}
            >
              Prefer not to say
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Link href="./gender-preference" asChild>
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
  genderOptions: {
    width: "100%",
  },
  genderOption: {
    backgroundColor: "#424242", // Darker background for options
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  genderText: {
    fontSize: 18,
    color: "#FFFFFF", // Light text color for options
    fontFamily: "Poppins-Regular",
  },
  selectedOption: {
    backgroundColor: "#FF7366", // Accent color for selected option
  },
  selectedGenderText: {
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
