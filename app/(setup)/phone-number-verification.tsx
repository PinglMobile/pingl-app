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
import { Link } from "expo-router";

export default function PhoneNumberVerificationPage() {
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
    <Pressable onPress={Keyboard.dismiss} style={styles.container}>
      <View style={styles.contentContainer}>
        <Icon name="shield" size={50} color="#FF7366" style={styles.icon} />
        <Text style={styles.headerText}>Enter the verification code</Text>
        <Text style={styles.subText}>
          We've sent a verification code to your phone number.
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
        <TouchableOpacity onPress={handleResend}>
          <Text style={styles.resendText}>Resend Code</Text>
        </TouchableOpacity>
      </View>
      <Link href="./email" asChild>
        <Pressable style={styles.verifyButton} onPress={handleVerify}>
          <Text style={styles.verifyButtonText}>Verify</Text>
        </Pressable>
      </Link>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
    color: "black",
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "Poppins-Bold",
  },
  subText: {
    fontSize: 16,
    color: "#333333",
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
    color: "black",
    borderWidth: 1,
    borderColor: "#4F4F4F",
    textAlign: "center",
    borderRadius: 10,
  },
  resendText: {
    color: "#FF7366",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  verifyButton: {
    backgroundColor: "#FF7366",
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
});
