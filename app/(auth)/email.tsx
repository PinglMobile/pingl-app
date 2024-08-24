import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Keyboard,
} from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";

export default function EmailInputPage() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (formData) => {
    const { email } = formData;
    console.log("Email entered:", email);
    /*
    const { data, error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      console.error("Error sending OTP:", error.message);
      // Handle error (e.g., show an alert)
      alert("Failed to send verification code. Please try again.");
    } else {
      console.log("OTP sent successfully:", data);
      // Navigate to email verification page with the email as a parameter
      router.push({
        pathname: "/email-verification",
        params: { email },
      });
    }
    */
    router.push("/email-verification");
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Icon name="envelope" size={50} color="#FF7366" style={styles.icon} />
        <Text style={styles.headerText}>What's your email address?</Text>
        <Text style={styles.subText}>
          We'll email you a code to verify who you are.
        </Text>

        {/* Email Input */}
        <Controller
          control={control}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Enter a valid email address",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[styles.input, errors.email ? styles.errorInput : null]}
              placeholder="Enter your email"
              keyboardType="email-address"
              value={value}
              onChangeText={onChange}
              placeholderTextColor="#BDBDBD"
              autoCapitalize="none"
            />
          )}
          name="email"
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}
      </View>

      <Pressable
        style={[styles.continueButton, !isValid && styles.disabledButton]}
        onPress={handleSubmit(onSubmit)}
        disabled={!isValid}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212121", // Dark background
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
    color: "#FFFFFF", // Light text for dark background
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
  input: {
    width: "100%",
    height: 50,
    fontSize: 16,
    color: "#FFFFFF", // Light text for input
    borderWidth: 1,
    borderColor: "#4F4F4F", // Dark gray border
    paddingHorizontal: 15,
    borderRadius: 12, // Increased border radius for smoother edges
    backgroundColor: "#333333", // Slightly lighter dark background
    marginBottom: 15, // Increased margin for better spacing
  },
  errorInput: {
    borderColor: "#FF7366", // Red border for error
  },
  errorText: {
    color: "#FF7366",
    marginBottom: 10,
    textAlign: "center",
    fontSize: 14,
  },
  continueButton: {
    backgroundColor: "#FF7366", // Accent color for the button
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    width: "80%",
    alignSelf: "center",
    shadowColor: "#000", // Shadow for a floating effect
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  continueButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
  },
  disabledButton: {
    backgroundColor: "#FFB8A4", // Greyed out color for disabled button
  },
});
