import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ThemeProvider as NavigationThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import { useColorScheme } from "@/components/useColorScheme";
import Mapbox from "@rnmapbox/maps";

import { TamaguiProvider, View } from "tamagui";
import config from "../tamagui.config"; // your configuration
import { lightTheme, darkTheme } from "@/theme/theme";
import { ThemeProvider, useAppTheme } from "@/theme/ThemeProvider";
export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

SplashScreen.preventAutoHideAsync();
Mapbox.setAccessToken(
  "sk.eyJ1Ijoia2Rsa2x5MDEiLCJhIjoiY2x6dWRuMnYzMDBvNTJ3cHhneng0NHM1OSJ9.7RWoojdaeVWirDFsvEHHag"
);
Mapbox.setTelemetryEnabled(false);

GoogleSignin.configure({
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  iosClientId:
    "417607520388-jqahliropjgfnqutc8jvv3a208pvoqdb.apps.googleusercontent.com",
});

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins/Poppins-Bold.ttf"),
    "Poppins-Black": require("../assets/fonts/Poppins/Poppins-Black.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins/Poppins-Medium.ttf"),

    "Roboto-Regular": require("../assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Bold": require("../assets/fonts/Roboto/Roboto-Bold.ttf"),
    "Roboto-Black": require("../assets/fonts/Roboto/Roboto-Black.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto/Roboto-Medium.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <RootLayoutNav />
    </ThemeProvider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { theme } = useAppTheme();

  return (
    <NavigationThemeProvider value={theme}>
      <Stack screenOptions={{ headerShown: false }} />
    </NavigationThemeProvider>
  );
}
