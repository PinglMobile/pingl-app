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
import { useRouter } from "expo-router";
import { useAppTheme } from "@/theme/ThemeProvider";

export default function GenderSelectionPage() {
  const { theme } = useAppTheme();
  const router = useRouter();
  const [selectedGender, setSelectedGender] = useState("");

  const handleContinue = () => {
    if (!selectedGender) {
      // alert("Please select a gender.");
    } else {
      console.log("Selected Gender:", selectedGender);
      // Handle submission logic here
    }

    router.push("/gender-preference");
  };

  const getButtonTextColor = (gender) => {
    return selectedGender === gender
      ? theme.colors.buttonText
      : theme.colors.text;
  };

  return (
    <Pressable
      onPress={Keyboard.dismiss}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.contentContainer}>
        <Icon
          name="venus-mars"
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
          Select your gender
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
          This helps us show you relevant matches.
        </Text>

        <View style={styles.genderOptions}>
          <TouchableOpacity
            style={[
              styles.genderOption,
              {
                backgroundColor:
                  selectedGender === "Male"
                    ? theme.colors.primary
                    : theme.colors.card,
              },
            ]}
            onPress={() => setSelectedGender("Male")}
          >
            <Text
              style={[
                styles.genderText,
                {
                  color: getButtonTextColor("Male"),
                  fontFamily: theme.fonts.poppins.regular,
                },
              ]}
            >
              Male
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.genderOption,
              {
                backgroundColor:
                  selectedGender === "Female"
                    ? theme.colors.primary
                    : theme.colors.card,
              },
            ]}
            onPress={() => setSelectedGender("Female")}
          >
            <Text
              style={[
                styles.genderText,
                {
                  color: getButtonTextColor("Female"),
                  fontFamily: theme.fonts.poppins.regular,
                },
              ]}
            >
              Female
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.genderOption,
              {
                backgroundColor:
                  selectedGender === "Non-binary"
                    ? theme.colors.primary
                    : theme.colors.card,
              },
            ]}
            onPress={() => setSelectedGender("Non-binary")}
          >
            <Text
              style={[
                styles.genderText,
                {
                  color: getButtonTextColor("Non-binary"),
                  fontFamily: theme.fonts.poppins.regular,
                },
              ]}
            >
              Non-binary
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.genderOption,
              {
                backgroundColor:
                  selectedGender === "Other"
                    ? theme.colors.primary
                    : theme.colors.card,
              },
            ]}
            onPress={() => setSelectedGender("Other")}
          >
            <Text
              style={[
                styles.genderText,
                {
                  color: getButtonTextColor("Other"),
                  fontFamily: theme.fonts.poppins.regular,
                },
              ]}
            >
              Other
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.genderOption,
              {
                backgroundColor:
                  selectedGender === "Prefer not to say"
                    ? theme.colors.primary
                    : theme.colors.card,
              },
            ]}
            onPress={() => setSelectedGender("Prefer not to say")}
          >
            <Text
              style={[
                styles.genderText,
                {
                  color: getButtonTextColor("Prefer not to say"),
                  fontFamily: theme.fonts.poppins.regular,
                },
              ]}
            >
              Prefer not to say
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
  genderOptions: {
    width: "100%",
  },
  genderOption: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  genderText: {
    fontSize: 18,
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
