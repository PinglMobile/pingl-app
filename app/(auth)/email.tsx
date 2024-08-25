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
import { useAppTheme } from "@/theme/ThemeProvider";

export default function EmailInputPage() {
  const router = useRouter();
  const { theme } = useAppTheme();

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

    // Uncomment and use this block for actual OTP sending
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
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={[styles.contentContainer]}>
        <Icon
          name="envelope"
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
          What's your email address?
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
              style={[
                styles.input,
                {
                  backgroundColor: theme.colors.card,
                  color: theme.colors.text,
                  fontFamily: theme.fonts.poppins.regular,
                },
                errors.email
                  ? { borderColor: theme.colors.primary }
                  : { borderColor: theme.colors.border },
              ]}
              placeholder="Enter your email"
              keyboardType="email-address"
              value={value}
              onChangeText={onChange}
              placeholderTextColor={theme.colors.subText}
              autoCapitalize="none"
            />
          )}
          name="email"
        />
        {errors.email && (
          <Text
            style={[
              styles.errorText,
              {
                color: theme.colors.primary,
                fontFamily: theme.fonts.poppins.regular,
              },
            ]}
          >
            {errors.email.message}
          </Text>
        )}
      </View>

      <Pressable
        style={[
          styles.continueButton,
          { backgroundColor: theme.colors.primary },
          !isValid && { backgroundColor: theme.colors.disabled },
        ]}
        onPress={handleSubmit(onSubmit)}
        disabled={!isValid}
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
  input: {
    width: "100%",
    height: 50,
    fontSize: 16,
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  errorText: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 14,
  },
  continueButton: {
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    width: "80%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    backgroundColor: "red",
    elevation: 10,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
