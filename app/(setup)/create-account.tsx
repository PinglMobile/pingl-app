import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import LottieView from "lottie-react-native"; // Import Lottie for animations
import { useNavigation } from "@react-navigation/native"; // Assuming you are using react-navigation
import { Link } from "expo-router";

export default function IntroScreen() {
  const navigation = useNavigation();

  const handleContinue = () => {
    //navigation.navigate("PreferencesPrompt"); // Replace with the actual route name of your preferences page
  };

  return (
    <View style={styles.container}>
      <View style={styles.animationContainer}>
        <LottieView
          source={require("../../assets/animations/love-animation.json")} // Replace with your Lottie animation file
          autoPlay
          loop
          style={styles.animation}
        />
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>Let's set up your account</Text>
          <Text style={styles.subText}>
            Fill in the necessary details so we can create your account for you.
          </Text>
        </View>
      </View>

      <Link href="./phone-number" asChild>
        <Pressable style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#212121",
    paddingHorizontal: 20,
    paddingVertical: 40,
    marginTop: -20,
  },
  animationContainer: {
    flex: 1,

    alignItems: "center",
    marginBottom: 170,
  },
  animation: {
    width: 350,
    height: 350,
  },
  textContainer: {
    marginTop: -70,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    fontFamily: "Poppins-Bold",
    color: "white",
  },
  subText: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    marginBottom: 40,
    fontFamily: "Poppins-Regular",
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
