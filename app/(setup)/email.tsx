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

export default function EmailInputPage() {
  const [email, setEmail] = useState("");

  const handleContinue = () => {
    console.log("Email entered:", email);
    // Handle email submission logic here
  };

  return (
    <Pressable onPress={Keyboard.dismiss} style={styles.container}>
      <View style={styles.contentContainer}>
        <Icon name="envelope" size={50} color="#FF7366" style={styles.icon} />
        <Text style={styles.headerText}>Enter your email address</Text>
        <Text style={styles.subText}>
          We will use this email to send you important updates and information.
        </Text>
        <TextInput
          style={styles.emailInput}
          placeholder="example@domain.com"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#BDBDBD"
        />
      </View>
      <Link href="./name" asChild>
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
    backgroundColor: "#212121", // Dark background
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
    color: "#FFFFFF", // Light text for dark background
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
  emailInput: {
    width: "100%",
    height: 50,
    fontSize: 16,
    color: "#FFFFFF", // Light text for input
    borderWidth: 1,
    borderColor: "#4F4F4F", // Dark gray border
    textAlign: "left",
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#424242", // Darker input background
  },
  continueButton: {
    backgroundColor: "#FF7366", // Accent color for the button
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
