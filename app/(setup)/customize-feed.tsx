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
          source={require("../../assets/animations/animation.json")} // Replace with your Lottie animation file
          autoPlay
          loop
          style={styles.animation}
        />

        <Text style={styles.headerText}>Customize Your Experience</Text>
        <Text style={styles.subText}>
          Let's take a moment to gather your preferences so we can personalize
          your feed and find the best matches for you.
        </Text>
        <Link href="./preferences" asChild>
          <Pressable style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#212121",
    padding: 20,
  },
  animationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 130,
  },
  animation: {
    width: 300,
    height: 300,
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
    backgroundColor: "#FF7366",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: "center",
  },
  continueButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
  },
});
