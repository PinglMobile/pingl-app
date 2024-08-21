import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image, ImageBackground } from "expo-image";
import * as AppleAuthentication from "expo-apple-authentication";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { supabase } from "../../lib/supabase";

export default function LoginPage() {
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
          By tapping ‘Sign in/ Create account'. you agree to our terms of
          service. Learn how we process your data in our Privacy Policy and
          cookies policy
        </Text>
        <TouchableOpacity
          style={styles.googleButton}
          onPress={async () => {
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
                throw new Error("no ID token present!");
              }
            } catch (error: any) {
              if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
              } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
              } else if (
                error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
              ) {
                // play services not available or outdated
              } else {
                // some other error happened
              }
            }
          }}
          //disabled={!request}
        >
          <Image
            source={require("../../assets/icons/google.png")}
            style={styles.googleIcon}
          />
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.appleButton}
          onPress={async () => {
            try {
              const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                  AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                  AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
              });
              // Sign in via Supabase Auth.
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
                  // User is signed in.
                }
              } else {
                throw new Error("No identityToken.");
              }
            } catch (e) {
              if (e.code === "ERR_REQUEST_CANCELED") {
                // handle that the user canceled the sign-in flow
              } else {
                // handle other errors
              }
            }
          }}
        >
          <Image
            source={require("../../assets/icons/apple.png")}
            style={styles.appleIcon}
          />
          <Text style={styles.googleButtonText}>Continue with Apple</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

LoginPage.options = {
  headerShown: false,
};

const styles = StyleSheet.create({
  pinglText: {
    color: "white",
    fontSize: 42,
    fontFamily: "poppins",
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
  buttonContainer: {
    padding: 30,
    top: 500,
  },
  buttonContainerText: {
    color: "white",
    lineHeight: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: 600,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  googleButton: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",

    backgroundColor: "#FFFFFF", // White background as shown in the design
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30, // Rounded corners to match the design
    borderWidth: 1,
    borderColor: "#E0E0E0", // Light gray border to match the design
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Add shadow for iOS
    marginTop: 20,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  googleButtonText: {
    color: "black", // Google's brand color for the text
    fontSize: 16,
    fontWeight: "bold",
  },
  appleButton: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#FFFFFF", // White background as shown in the design
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30, // Rounded corners to match the design
    borderWidth: 1,
    borderColor: "#E0E0E0", // Light gray border to match the design
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Add shadow for iOS
    marginTop: 13,
  },

  appleIcon: {
    width: 22,
    height: 24,
    marginRight: 12,
  },
});
