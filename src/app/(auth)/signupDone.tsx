import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, Platform } from "react-native";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

const { width } = Dimensions.get("window");

const SignUpPage = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Image source={require("@/assets/images/done.png")} style={styles.background} />
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarFill} />
        <Text style={styles.progressEmoji}>💜</Text>
      </View>

      {/* <View style={styles.iconContainer1}>
        <Text style={styles.icon}>🚨</Text>
      </View>
      <View style={styles.iconContainer2}>
        <Text style={styles.icon}>🌎</Text>
      </View>
      <View style={styles.iconContainer3}>
        <Text style={styles.icon}>🚧</Text>
      </View>
      <View style={styles.iconContainer4}>
        <Text style={styles.icon}>⚠️</Text>
      </View> */}
      <View style={styles.textContainer}>
        <TouchableOpacity onPress={() => router.push("/")}>
          <Text style={styles.title}>Hi Dora,</Text>
          <Text style={styles.subtitle}>You're </Text>
          <Text style={styles.subtitle}>All Set!</Text>
          <Text style={styles.welcomeText}>Welcome</Text>
          <View style={styles.welcomeRow}>
            <Text style={styles.subtitle}>To </Text>
            <Image source={require("@/assets/images/Primary_Wordmark_Logo.png")} style={styles.logo} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141216",
    padding: 16,
    alignItems: "center",
  },
  background: {
    position: "absolute",
    top: 60,
    left: 0,
    width: "110%",
    height: "100%",
    resizeMode: "contain",
  },
  backButton: {
    position: "absolute",
    top: 80,
    left: 16,
    backgroundColor: "white",
    borderRadius: 25,
    padding: 8,
    zIndex: 1,
  },
  progressBarContainer: {
    position: "absolute",
    top: 98,
    left: 70,
    right: 40,
    height: 10,
    backgroundColor: "#3e3e3e",
    borderRadius: 50,
  },
  progressBarFill: {
    width: "100%",
    height: "100%",
    backgroundColor: "#6E0DD0",
    borderRadius: 20,
  },
  progressEmoji: {
    position: "absolute",
    left: "95%",
    top: -10,
    fontSize: 24,
  },
  // iconContainer1: {
  //   position: "absolute",
  //   top: 250,
  //   left: 70,
  //   backgroundColor: "#FFFFFF",
  //   borderRadius: 25,
  //   padding: 8,
  // },
  // iconContainer2: {
  //   position: "absolute",
  //   top: 350,
  //   left: 70,
  //   backgroundColor: "#FFFFFF",
  //   borderRadius: 25,
  //   padding: 8,
  // },
  // iconContainer3: {
  //   position: "absolute",
  //   top: 450,
  //   left: 70,
  //   backgroundColor: "#FFFFFF",
  //   borderRadius: 25,
  //   padding: 8,
  // },
  // iconContainer4: {
  //   position: "absolute",
  //   top: 550,
  //   left: 70,
  //   backgroundColor: "#FFFFFF",
  //   borderRadius: 25,
  //   padding: 8,
  // },
  icon: {
    fontSize: 24,
  },
  textContainer: {
    marginTop: 300,
    alignItems: "flex-start",
    left: 70,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: Platform.OS === "ios" ? 0 : -10,
  },
  welcomeRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  welcomeText: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "bold",
    marginTop: 10,
  },
  logo: {
    width: 130,
    height: 50,
    resizeMode: "contain",
  },
});
