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

export default function EmailVerificationPage() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  //const { email } = useSearchParams(); // Get the email passed as a parameter

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
      //Alert.alert("Success", "Verification code resent successfully.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Icon name="email" size={50} color="#FF7366" style={styles.icon} />
        <Text style={styles.headerText}>Enter the verification code</Text>
        <Text style={styles.subText}>
          We've sent a verification code to {"email"}.
        </Text>
        <View style={styles.codeInputContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.codeInput}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              ref={(ref) => (refs[index] = ref)}
              placeholder="-"
              placeholderTextColor="#BDBDBD"
            />
          ))}
        </View>
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
        <TouchableOpacity onPress={handleResend}>
          <Text style={styles.resendText}>Resend Code</Text>
        </TouchableOpacity>
      </View>
      <Pressable style={styles.verifyButton} onPress={handleVerify}>
        <Text style={styles.verifyButtonText}>Verify</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212121", // Dark background color
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
    color: "#FFFFFF", // Light text color for inputs
    borderWidth: 1,
    borderColor: "#4F4F4F", // Dark gray border
    textAlign: "center",
    borderRadius: 10,
    backgroundColor: "#424242", // Darker background for input fields
  },
  resendText: {
    color: "#FF7366", // Accent color for resend text
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  verifyButton: {
    backgroundColor: "#FF7366", // Accent color for button
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    width: "80%",
    alignSelf: "center",
  },
  verifyButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "#FF7366", // Accent color for error message
    fontSize: 14,
    marginTop: 10,
  },
});
