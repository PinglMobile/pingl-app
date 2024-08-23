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
import { Link } from "expo-router";

export default function NameInputPage() {
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
  };

  return (
    <Pressable onPress={Keyboard.dismiss} style={styles.container}>
      <View style={styles.contentContainer}>
        <Icon name="user" size={50} color="#FF7366" style={styles.icon} />
        <Text style={styles.headerText}>What’s your name?</Text>
        <Text style={styles.subText}>
          Please enter your first name. Last name is optional.
        </Text>

        <TextInput
          style={[styles.input, error ? styles.inputError : null]}
          placeholder="First Name"
          value={firstName}
          onChangeText={(text) => {
            setFirstName(text);
            if (error) setError("");
          }}
          placeholderTextColor="#BDBDBD"
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Last Name (Optional)"
          value={lastName}
          onChangeText={setLastName}
          placeholderTextColor="#BDBDBD"
        />
      </View>
      <Link href="./gender" asChild>
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
  input: {
    width: "100%",
    height: 50,
    fontSize: 16,
    color: "#FFFFFF", // Light text color for inputs
    borderWidth: 1,
    borderColor: "#4F4F4F", // Dark gray border
    textAlign: "left",
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "#424242", // Darker background for input fields
  },
  inputError: {
    borderColor: "#FF7366", // Accent color for error state
  },
  errorText: {
    color: "#FF7366", // Accent color for error text
    fontSize: 14,
    marginBottom: 20,
    alignSelf: "flex-start",
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
  },
});
