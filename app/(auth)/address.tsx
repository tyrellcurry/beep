import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert, Platform } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { doc, updateDoc } from "firebase/firestore";
import { FIREBASE_DB } from "@/firebaseConfig";

const { width } = Dimensions.get("window");

const SignUpPage = () => {
  const router = useRouter();

  const { userId } = useLocalSearchParams<{ userId: string }>();
  const [address, setAddress] = React.useState("");

  const handleContinue = async () => {
    // if (!address.trim()) {
    //   Alert.alert("Required", "Please enter your address.");
    //   return;
    // }
    if (!userId) {
      console.error("User ID not found");
      return;
    }
    try {
      const userDocRef = doc(FIREBASE_DB, "users", userId);
      await updateDoc(userDocRef, { address: address });
      console.log(address, "User address saved!");
      router.push("/(auth)/signupDone");
    } catch (error) {
      console.error("Error saving user address:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarFill} />
        <Text style={styles.progressEmoji}>🏠</Text>
      </View>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Put</Text>
      <Text style={styles.title}>Your 🏠</Text>
      <Text style={styles.title}>Address</Text>
      <Text style={styles.subtitle}>What's your address?</Text>

      <TextInput style={styles.input} placeholder="address" placeholderTextColor="#A0A0A0" value={address} onChangeText={setAddress} />

      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        By signing up, you agree to our <Text style={styles.linkText}>Privacy Policy</Text> and <Text style={styles.linkText}>Terms of Service</Text>.
      </Text>
    </View>
  );
};

export default SignUpPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141216",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  progressBarContainer: {
    position: "absolute",
    top: 98,
    left: 70,
    right: 40,
    height: 10,
    backgroundColor: "#3e3e3e",
    borderRadius: 20,
  },
  progressBarFill: {
    width: "85%",
    height: "100%",
    backgroundColor: "#6E0DD0",
    borderRadius: 20,
  },
  progressEmoji: {
    position: "absolute",
    left: "80%",
    top: Platform.OS === "ios" ? -10 : -20,
    fontSize: 24,
  },
  backButton: {
    padding: 8,
    position: "absolute",
    top: 80,
    left: 16,
    backgroundColor: "white",
    borderRadius: 25,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "left",
    width: width * 0.8,
    marginBottom: 5,
  },
  subtitle: {
    marginTop: 50,
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 10,
  },
  input: {
    width: width * 0.8,
    height: 50,
    backgroundColor: "transparent",
    borderRadius: 25,
    paddingHorizontal: 16,
    marginVertical: 10,
    color: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#A0A0A0",
  },
  continueButton: {
    backgroundColor: "#6E0DD0",
    width: width * 0.8,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  continueText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerText: {
    color: "#A0A0A0",
    fontSize: 12,
    textAlign: "center",
    marginTop: 20,
    width: width * 0.8,
  },
  linkText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
