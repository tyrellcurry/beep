import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter, Href } from "expo-router";

const LandingPage = () => {
  const router = useRouter(); // Expo Router for navigation

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Beep</Text>
      <Button title="Log in" onPress={() => router.push("/(auth)/login" as Href<string>)} />
      <Button title="Sign up" onPress={() => router.push("/(auth)/signup" as Href<string>)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default LandingPage;
