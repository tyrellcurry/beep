import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import "react-native-get-random-values";
import { useColorScheme } from "@/src/components/useColorScheme";
import { UserProvider } from "../components/auth/userContext";

// import SignupPage from "./(auth)/signup";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index", // Keep the initial route pointing to the (tabs) navigation
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
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

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <UserProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />

          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

          <Stack.Screen name="(auth)/signin" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/name" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/phone" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/email" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/password" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/address" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/signupDone" options={{ headerShown: false }} />

          <Stack.Screen name="sos/index" options={{ headerShown: false }} />

          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        </Stack>
      </ThemeProvider>
    </UserProvider>
  );
}
