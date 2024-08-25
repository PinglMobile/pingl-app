import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import Icon from "@expo/vector-icons/FontAwesome";
import CountryPicker from "react-native-country-picker-modal";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import { useAppTheme } from "@/theme/ThemeProvider";

export default function PhoneNumberPage() {
  const error = console.error;
  console.error = (...args) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };

  const router = useRouter();
  const { theme } = useAppTheme();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const [countryCode, setCountryCode] = useState("US");
  const [callingCode, setCallingCode] = useState("1");
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSelect = (country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
  };

  const onSubmit = async (data) => {
    const { phoneNumber } = data;

    // Format the phone number with the calling code
    const formattedPhoneNumber = `+${callingCode}${phoneNumber}`;

    /*
    try {
      // Request OTP from Supabase
      const { error } = await supabase.auth.signInWithOtp({
        phone: formattedPhoneNumber,
      });

      if (error) {
        console.error("Error sending OTP:", error.message);
        setErrorMessage("Failed to send OTP. Please try again.");
      } else {
        console.log("OTP sent successfully");
        setErrorMessage(""); // Clear any previous error
        // Navigate to OTP verification screen with phone number
        router.push({
          pathname: "./phone-number-verification",
          params: { phoneNumber: formattedPhoneNumber },
        });
      }
    } catch (err) {
      console.error("Unexpected error:", err.message);
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
    */

    router.push({
      pathname: "./phone-number-verification",
      params: { phoneNumber: formattedPhoneNumber },
    });
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.contentContainer}>
        <Text
          style={[
            styles.headerText,
            { color: theme.colors.text, fontFamily: theme.fonts.poppins.bold },
          ]}
        >
          What’s your phone number, if you don't mind?
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
          We only use phone numbers to verify that you are real. Your phone
          number will not be shown on your profile.
        </Text>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={[styles.countryCode, { borderColor: theme.colors.border }]}
            onPress={() => setVisible(true)}
          >
            <Text
              style={[
                styles.countryText,
                {
                  color: theme.colors.text,
                  fontFamily: theme.fonts.poppins.regular,
                },
              ]}
            >
              {countryCode} +{callingCode}
            </Text>
            <Icon name="chevron-down" size={16} color={theme.colors.text} />
          </TouchableOpacity>

          <Controller
            control={control}
            rules={{
              required: "Phone number is required",
              pattern: {
                value: /^\d{10,15}$/, // Allows only digits and limits length
                message: "Phone number must be 10-15 digits",
              },
              maxLength: {
                value: 15,
                message: "Phone number cannot exceed 15 digits",
              },
              minLength: {
                value: 10,
                message: "Phone number must be at least 10 digits",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.phoneInput,
                  errors.phoneNumber ? styles.errorInput : null,
                  {
                    color: theme.colors.text,
                    fontFamily: theme.fonts.poppins.regular,
                    borderBottomColor: theme.colors.border,
                  },
                ]}
                onBlur={onBlur}
                onChangeText={(text) =>
                  // Restrict input to numbers only
                  onChange(text.replace(/[^0-9]/g, ""))
                }
                value={value}
                keyboardType="phone-pad"
                placeholderTextColor={theme.colors.subText}
                placeholder="1234567890"
                maxLength={15} // Limits the number of characters
              />
            )}
            name="phoneNumber"
          />
        </View>
        {errors.phoneNumber && (
          <Text
            style={[
              styles.errorText,
              {
                color: theme.colors.primary,
                fontFamily: theme.fonts.poppins.regular,
              },
            ]}
          >
            {errors.phoneNumber.message}
          </Text>
        )}
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
      <Pressable
        style={[
          styles.continueButton,
          {
            backgroundColor: isValid
              ? theme.colors.primary
              : theme.colors.disabled,
          },
          !isValid && styles.disabledButton, // Apply disabled styles when form is not valid
        ]}
        onPress={handleSubmit(onSubmit)}
        disabled={!isValid} // Disable the button when the form is not valid
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

      {errorMessage ? (
        <Text
          style={[
            styles.errorMessage,
            {
              color: theme.colors.primary,
              fontFamily: theme.fonts.poppins.regular,
            },
          ]}
        >
          {errorMessage}
        </Text>
      ) : null}
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
    alignItems: "flex-start",
    padding: 10,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 10,
    padding: 0,
  },
  subText: {
    fontSize: 16,
    textAlign: "left",
    marginBottom: 40,
    padding: 0,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 5, // Reduced margin to accommodate error text
  },
  countryCode: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  countryText: {
    fontSize: 16,
    marginRight: 5,
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  errorInput: {
    borderBottomColor: "#FF7366", // Red color for error state
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
  disabledButton: {
    backgroundColor: "#FFB8A4", // Greyed out color for disabled button
  },
  errorText: {
    marginTop: 5,
    fontSize: 14, // Adjusted font size for error text
  },
  errorMessage: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
  },
});
