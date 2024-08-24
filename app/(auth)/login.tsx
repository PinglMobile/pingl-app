import React from "react";
import { View, ImageBackground, StyleSheet, Text } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { supabase } from "../../lib/supabase";
import { Link } from "expo-router";
import AuthButton from "@/components/AuthButton";
import PhoneButton from "@/components/PhoneButton";

export default function LoginPage() {
  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo.idToken) {
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: "google",
          token: userInfo.idToken,
        });
        console.log(error, data);
      } else {
        throw new Error("No ID token present!");
      }
    } catch (error: any) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          // User cancelled the login flow
          break;
        case statusCodes.IN_PROGRESS:
          // Operation in progress already
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          // Play services not available or outdated
          break;
        default:
          // Some other error happened
          break;
      }
    }
  };

  const handleAppleSignIn = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      if (credential.identityToken) {
        const {
          error,
          data: { user },
        } = await supabase.auth.signInWithIdToken({
          provider: "apple",
          token: credential.identityToken,
        });
        console.log(JSON.stringify({ error, user }, null, 2));
        if (!error) {
          // User is signed in
        }
      } else {
        throw new Error("No identityToken.");
      }
    } catch (e) {
      if (e.code === "ERR_REQUEST_CANCELED") {
        // User canceled the sign-in flow
      } else {
        // Handle other errors
      }
    }
  };

  return (
    <ImageBackground
      style={styles.image}
      source={require("../../assets/images/pingl-signin.jpg")}
    >
      <View style={styles.logoContainer}>
        <ImageBackground
          style={styles.logo}
          source={require("../../assets/images/pingl-logo-transparent.png")}
        />
        <Text style={styles.logoContainerText}>Designed to help you mingl</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonContainerText}>
          By tapping ‘Sign in/ Create account’, you agree to our terms of
          service. Learn how we process your data in our Privacy Policy and
          cookies policy.
        </Text>
        <AuthButton
          text="Continue with Google"
          icon={require("../../assets/icons/google.png")}
          onPress={handleGoogleSignIn}
        />
        <AuthButton
          text="Continue with Apple"
          icon={require("../../assets/icons/apple.png")}
          onPress={handleAppleSignIn}
        />
        <Link href="../(auth)/email" asChild>
          <PhoneButton text="Continue with Email" onPress={() => {}} />
        </Link>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
  },
  buttonContainer: {
    padding: 30,
    top: 440,
  },
  buttonContainerText: {
    color: "white",
    lineHeight: 20,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "Roboto-Regular",
  },
  logo: {
    height: 80,
    width: 140,
  },
  logoContainer: {
    top: 230,
    alignItems: "center",
  },
  logoContainerText: {
    top: 10,
    color: "white",
    fontWeight: "bold",
  },
});
