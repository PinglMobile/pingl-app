import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Keyboard,
} from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import { useAppTheme } from "@/theme/ThemeProvider";

export default function NameInputPage() {
  const router = useRouter();
  const { theme } = useAppTheme();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");

  const handleContinue = () => {
    if (!firstName.trim()) {
      setError("First name is required.");
    } else {
      console.log("First Name:", firstName);
      console.log("Last Name (Optional):", lastName);
      // Handle name submission logic here
    }

    router.push("/gender");
  };

  return (
    <Pressable
      onPress={Keyboard.dismiss}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.contentContainer}>
        <Icon
          name="user"
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
          What’s your name?
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
          Please enter your first name. Last name is optional.
        </Text>

        <TextInput
          style={[
            styles.input,
            error ? styles.inputError : null,
            {
              color: theme.colors.text,
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.card,
            },
          ]}
          placeholder="First Name"
          value={firstName}
          onChangeText={(text) => {
            setFirstName(text);
            if (error) setError("");
          }}
          placeholderTextColor={theme.colors.subText}
        />

        {error ? (
          <Text style={[styles.errorText, { color: theme.colors.primary }]}>
            {error}
          </Text>
        ) : null}

        <TextInput
          style={[
            styles.input,
            {
              color: theme.colors.text,
              borderColor: theme.colors.border,
              backgroundColor: theme.colors.card,
            },
          ]}
          placeholder="Last Name (Optional)"
          value={lastName}
          onChangeText={setLastName}
          placeholderTextColor={theme.colors.subText}
        />
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
  input: {
    width: "100%",
    height: 50,
    fontSize: 16,
    borderWidth: 1,
    textAlign: "left",
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  inputError: {
    borderColor: "#FF7366", // Accent color for error state
  },
  errorText: {
    fontSize: 14,
    marginBottom: 20,
    alignSelf: "flex-start",
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
