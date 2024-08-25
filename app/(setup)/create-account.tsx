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

export default function CreateAccount() {
  const router = useRouter();
  const { theme } = useAppTheme();

  const handleContinue = () => {
    router.push("/phone-number");
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.animationContainer}>
        <LottieView
          source={require("../../assets/animations/love-animation.json")} // Replace with your Lottie animation file
          autoPlay
          loop
          style={styles.animation}
        />
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.headerText,
              {
                color: theme.colors.text,
                fontFamily: theme.fonts.poppins.bold,
              },
            ]}
          >
            Let's set up your account
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
            Fill in the necessary details so we can create your account for you.
          </Text>
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
    </View>
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
  },
  subText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
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
