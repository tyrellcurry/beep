import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { Link } from "expo-router";
import { useRouter } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../../constants/Colors";
import { FIREBASE_AUTH } from "@/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CameraComponent from "@/components/camera/Camera";
import { useUser } from "@/components/auth/userContext";

const { width } = Dimensions.get("window");

const SignInPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useUser();

  const handleSignIn = async () => {
    // router.push("/(tabs)/Location");
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
    try {
      await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      console.log(email, "Login successful!");
      router.push("/(tabs)/Location");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your email and password.");
    }
  };

  return (
    // <KeyboardAwareScrollView contentContainerStyle={styles.container} enableOnAndroid extraScrollHeight={0} bounces={false}>
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Hey,{"\n"}Welcome back 💜</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#A0A0A0"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#A0A0A0"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>
        <View style={styles.separatorContainer}>
          <View style={styles.separator} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.separator} />
        </View>

        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <FontAwesome5 name="facebook" size={24} color="#1877F2" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <FontAwesome5 name="google" size={24} color="#EA4335" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-apple" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.push("/(auth)/name")}>
          <Text style={styles.signupText}>
            Don’t have an account?{" "}
            <Text style={styles.signupLink}>Create your account</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    // </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141216",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "left",
    width: width * 0.8,
    marginBottom: 20,
  },
  input: {
    width: width * 0.8,
    height: 50,
    backgroundColor: "#2d2d2d",
    borderRadius: 25,
    paddingHorizontal: 16,
    marginVertical: 10,
    color: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#3e3e3e",
  },
  forgotPassword: {
    color: "#A0A0A0",
    alignSelf: "flex-end",
    marginRight: width * 0.1,
    marginVertical: 10,
    marginLeft: 35,
  },
  signInButton: {
    backgroundColor: "#651FD7",
    width: width * 0.8,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  signInText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: width * 0.8,
    marginVertical: 20,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: "#3e3e3e",
  },
  orText: {
    color: "#A0A0A0",
    marginHorizontal: 10,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width * 0.6,
    marginVertical: 20,
  },
  socialButton: {
    padding: 10,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    color: "#A0A0A0",
    marginTop: 20,
  },
  signupLink: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default SignInPage;
