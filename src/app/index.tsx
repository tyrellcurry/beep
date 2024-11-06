import React from "react";
import { View, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const LandingPage = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push("/(auth)/signin")} style={styles.logoContainer}>
        <Image source={require("@/assets/images/white-logo.png")} style={styles.logo} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#651fd7",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#651fd7",
    width: width * 0.8,
    height: width * 0.8,
  },
  logo: {
    width: "60%",
    height: "60%",
    resizeMode: "contain",
  },
});

export default LandingPage;
