import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";
import { Link, useRouter } from "expo-router";
import { useAppTheme } from "@/theme/ThemeProvider";

export default function PhoneNumberVerificationPage() {
  const router = useRouter();
  const { theme } = useAppTheme();

  const [code, setCode] = useState(["", "", "", "", "", ""]);

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

  const handleVerify = () => {
    const verificationCode = code.join("");
    console.log("Verification code entered:", verificationCode);
    // Handle verification logic here
  };

  const handleResend = () => {
    console.log("Resend code");
    // Handle resend logic here
  };

  return (
    <Pressable
      onPress={Keyboard.dismiss}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.contentContainer}>
        <Icon
          name="shield"
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
          We've sent a verification code to your phone number.
        </Text>
        <View style={styles.codeInputContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              style={[
                styles.codeInput,
                {
                  color: theme.colors.text,
                  borderColor: theme.colors.border,
                  backgroundColor: theme.colors.card,
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
        <TouchableOpacity onPress={handleResend}>
          <Text style={[styles.resendText, { color: theme.colors.primary }]}>
            Resend Code
          </Text>
        </TouchableOpacity>
      </View>

      <Pressable
        style={[styles.verifyButton, { backgroundColor: theme.colors.primary }]}
        onPress={() => router.push("/name")}
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
});
