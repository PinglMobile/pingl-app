import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Keyboard,
  Alert,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";
import { useRouter, useSearchParams } from "expo-router";
import { supabase } from "@/lib/supabase";
import { useAppTheme } from "@/theme/ThemeProvider";

export default function EmailVerificationPage() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { theme } = useAppTheme();
  // const { email } = useSearchParams(); // Get the email passed as a parameter

  const handleChange = (text, index) => {
    let newCode = [...code];

    if (text === "") {
      newCode[index] = "";
      if (index > 0) {
        refs[index - 1].focus(); // Move to the previous input
      }
    } else {
      newCode[index] = text;
      if (index < 5) {
        refs[index + 1].focus(); // Move to the next input
      }
    }

    setCode(newCode);
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && code[index] === "" && index > 0) {
      refs[index - 1].focus();
      let newCode = [...code];
      newCode[index - 1] = ""; // Delete previous character
      setCode(newCode);
    }
  };

  const refs = [];

  const handleVerify = async () => {
    const verificationCode = code.join("");
    console.log("Verification code entered:", verificationCode);

    // Uncomment and use this block for actual OTP verification
    /*
    const { error } = await supabase.auth.verifyOtp({
      email: email, // Use the passed email for verification
      token: verificationCode,
    });

    if (error) {
      console.error("OTP verification failed:", error.message);
      setErrorMessage("Invalid verification code. Please try again.");
    } else {
      console.log("OTP verified successfully");
      router.push("../(setup)/create-account");
    }
    */

    router.push("../(setup)/create-account");
  };

  const handleResend = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email: "email", // Use the passed email to resend OTP
    });

    if (error) {
      console.error("Error resending OTP:", error.message);
      // Alert.alert("Error", "Failed to resend the code. Please try again.");
    } else {
      // Alert.alert("Success", "Verification code resent successfully.");
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.contentContainer}>
        <Icon
          name="email"
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
          Enter the verification code
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
          We've sent a verification code to {"email"}.
        </Text>
        <View style={styles.codeInputContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              style={[
                styles.codeInput,
                {
                  backgroundColor: theme.colors.card,
                  color: theme.colors.text,
                  fontFamily: theme.fonts.poppins.regular,
                  borderColor: theme.colors.border,
                },
              ]}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              ref={(ref) => (refs[index] = ref)}
              placeholder="-"
              placeholderTextColor={theme.colors.subText}
            />
          ))}
        </View>
        {errorMessage ? (
          <Text
            style={[
              styles.errorText,
              {
                color: theme.colors.primary,
                fontFamily: theme.fonts.poppins.regular,
              },
            ]}
          >
            {errorMessage}
          </Text>
        ) : null}
        <TouchableOpacity onPress={handleResend}>
          <Text
            style={[
              styles.resendText,
              {
                color: theme.colors.primary,
                fontFamily: theme.fonts.poppins.bold,
              },
            ]}
          >
            Resend Code
          </Text>
        </TouchableOpacity>
      </View>
      <Pressable
        style={[styles.verifyButton, { backgroundColor: theme.colors.primary }]}
        onPress={handleVerify}
      >
        <Text
          style={[
            styles.verifyButtonText,
            {
              color: theme.colors.buttonText,
              fontFamily: theme.fonts.poppins.bold,
            },
          ]}
        >
          Verify
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
  },
  contentContainer: {
    alignItems: "center",
    padding: 10,
    marginTop: 80,
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
  codeInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 20,
  },
  codeInput: {
    width: 40,
    height: 50,
    fontSize: 20,
    borderWidth: 1,
    textAlign: "center",
    borderRadius: 10,
  },
  resendText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  verifyButton: {
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    width: "80%",
    alignSelf: "center",
  },
  verifyButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    marginTop: 10,
    fontSize: 14,
  },
});
