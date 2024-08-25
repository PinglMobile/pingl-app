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
import { Link, useRouter } from "expo-router";
import { useAppTheme } from "@/theme/ThemeProvider";

export default function CustomizeFeed() {
  const { theme } = useAppTheme();
  const router = useRouter();

  const handleContinue = () => {
    router.push("/preferences");
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.animationContainer}>
        <LottieView
          source={require("../../assets/animations/animation.json")} // Replace with your Lottie animation file
          autoPlay
          loop
          style={styles.animation}
        />

        <Text
          style={[
            styles.headerText,
            { color: theme.colors.text, fontFamily: theme.fonts.poppins.bold },
          ]}
        >
          Customize Your Experience
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
          Let's take a moment to gather your preferences so we can personalize
          your feed and find the best matches for you.
        </Text>

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
              { fontFamily: theme.fonts.poppins.bold },
            ]}
          >
            Continue
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  },
  subText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
  },
  continueButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: "center",
  },
  continueButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
