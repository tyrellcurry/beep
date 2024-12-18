import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert, Platform } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FIREBASE_AUTH, FIREBASE_DB } from "@/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useUser } from "@/components/auth/userContext";

const { width } = Dimensions.get("window");

const SignUpPage = () => {
  const { setUser } = useUser();
  const router = useRouter();

  const { userId, email } = useLocalSearchParams<{ userId: string; email: string }>();
  const [password, setPassword] = React.useState("");

  const handleCompleteRegistration = async () => {
    // if (!password.trim() || password.length < 6) {
    //   Alert.alert("Required", "Please enter a password with at least 6 characters.");
    //   return;
    // }
    if (!userId || !email) {
      console.error("User ID or email not found");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      setUser(userCredential.user);
      const authUser = userCredential.user;

      await updateDoc(doc(FIREBASE_DB, "users", userId), { authUid: authUser.uid });
      console.log("User successfully registered with Firebase Authentication!");

      router.push({ pathname: "/(auth)/address", params: { userId } });
    } catch (error) {
      console.error("Error completing registration:", error);
      Alert.alert("Error", "Failed to complete registration. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarFill} />
        <Text style={styles.progressEmoji}>🔑</Text>
      </View>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Secure</Text>
      <Text style={styles.title}>Your 🔑</Text>
      <Text style={styles.title}>Account</Text>
      <Text style={styles.subtitle}>Create your password</Text>

      <TextInput style={styles.input} placeholder="password" placeholderTextColor="#A0A0A0" secureTextEntry={true} value={password} onChangeText={setPassword} />

      <TouchableOpacity style={styles.continueButton} onPress={handleCompleteRegistration}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>Create a password at least 6 letters or numbers. It should be something others can’t guess.</Text>
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
    width: "70%",
    height: "100%",
    backgroundColor: "#6E0DD0",
    borderRadius: 20,
  },
  progressEmoji: {
    position: "absolute",
    left: Platform.OS === "ios" ? "65%" : "60%",
    top: Platform.OS === "ios" ? -10 : -15,
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
