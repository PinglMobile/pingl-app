import { KeyboardAvoidingView, Platform, View } from "react-native";
import { Stack, useSegments } from "expo-router";
import ProgressBar from "@/components/ProgressBar";

export default function SetupLayout() {
  const segments = useSegments();

  // Assuming you have 5 setup steps
  const steps = 8;

  // Mapping segments to steps
  const stepMapping = {
    "phone-number": 1,
    "phone-number-verification": 2,
    email: 3,
    name: 4,
    gender: 5,
    "gender-preference": 6,
    "profile-photo": 7,
    hobbies: 8,
  };

  // Determine current step based on the current route segment
  const currentSegment = segments[1];
  const step = stepMapping[currentSegment] || 1;

  console.log(segments);

  return (
    <>
      <ProgressBar step={step} steps={steps} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Stack screenOptions={{ headerShown: false }} />
      </KeyboardAvoidingView>
    </>
  );
}
