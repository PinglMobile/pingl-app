import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";
import CountryPicker from "react-native-country-picker-modal";

export default function PhoneNumberPage() {
  const error = console.error;
  console.error = (...args) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };

  const [countryCode, setCountryCode] = useState("US");
  const [callingCode, setCallingCode] = useState("1");
  const [visible, setVisible] = useState(false);

  const onSelect = (country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.headerText}>
          What’s your phone number, if you don't mind?
        </Text>
        <Text style={styles.subText}>
          We only use phone numbers to verify that you are real. Your phone
          number will not be shown on your profile.
        </Text>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.countryCode}
            onPress={() => setVisible(true)}
          >
            <Text style={styles.countryText}>
              {countryCode} +{callingCode}
            </Text>
            <Icon name="chevron-down" size={16} color="#FFFFFF" />
          </TouchableOpacity>
          <TextInput
            style={styles.phoneInput}
            placeholder="8135453664"
            keyboardType="phone-pad"
            maxLength={10}
            placeholderTextColor="#BDBDBD"
          />
        </View>
        <CountryPicker
          countryCode={countryCode}
          withFilter
          withCallingCode
          withFlag
          withFlagButton={false}
          withEmoji={false}
          onSelect={onSelect}
          visible={visible}
          onClose={() => setVisible(false)}
        />
      </View>
      <Link href="./phone-number-verification" asChild>
        <Pressable style={styles.continueButton}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </Pressable>
      </Link>
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
    alignItems: "flex-start",
    padding: 10,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#FFFFFF", // Light text color
    textAlign: "left",
    marginBottom: 10,
    fontFamily: "Poppins-Bold",
    padding: 0,
  },
  subText: {
    fontSize: 16,
    color: "#BDBDBD", // Light gray for subtext
    textAlign: "left",
    marginBottom: 40,
    padding: 0,
    fontFamily: "Poppins-Regular",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  countryCode: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#4F4F4F",
    paddingBottom: 10,
  },
  countryText: {
    fontSize: 16,
    color: "#FFFFFF", // Light text color for dark theme
    marginRight: 5,
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: "#FFFFFF", // Light text color for input
    borderBottomWidth: 1,
    borderBottomColor: "#4F4F4F",
    paddingBottom: 10,
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
  icon: {
    marginBottom: 20,
  },
});
