// import React from "react";
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
// import { useRouter } from "expo-router";
// import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import Colors from "../../constants/Colors";

// const { width } = Dimensions.get("window");

// const SignUpPage = () => {
//   const router = useRouter();

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Create Account</Text>

//       <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor="#A0A0A0" />
//       <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#A0A0A0" />
//       <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#A0A0A0" secureTextEntry />
//       <TextInput style={styles.input} placeholder="Confirm Password" placeholderTextColor="#A0A0A0" secureTextEntry />

//       <TouchableOpacity style={styles.signUpButton}>
//         <Text style={styles.signUpText}>Sign Up</Text>
//       </TouchableOpacity>

//       <View style={styles.separatorContainer}>
//         <View style={styles.separator} />
//         <Text style={styles.orText}>or</Text>
//         <View style={styles.separator} />
//       </View>

//       <View style={styles.socialContainer}>
//         <TouchableOpacity style={styles.socialButton}>
//           <FontAwesome5 name="facebook" size={24} color="#1877F2" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.socialButton}>
//           <FontAwesome5 name="google" size={24} color="#EA4335" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.socialButton}>
//           <Ionicons name="logo-apple" size={24} color="white" />
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity onPress={() => router.push("/(tabs)/Location")}>
//         <Text style={styles.loginText}>
//           Already have an account? <Text style={styles.loginLink}>Log in</Text>
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#141216",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 16,
//   },
//   title: {
//     color: "#FFFFFF",
//     fontSize: 32,
//     fontWeight: "bold",
//     textAlign: "left",
//     width: width * 0.8,
//     marginBottom: 20,
//   },
//   input: {
//     width: width * 0.8,
//     height: 50,
//     backgroundColor: "#2d2d2d",
//     borderRadius: 25,
//     paddingHorizontal: 16,
//     marginVertical: 10,
//     color: "#FFFFFF",
//     borderWidth: 1,
//     borderColor: "#3e3e3e",
//   },
//   signUpButton: {
//     backgroundColor: "#651FD7",
//     width: width * 0.8,
//     height: 50,
//     borderRadius: 25,
//     justifyContent: "center",
//     alignItems: "center",
//     marginVertical: 20,
//   },
//   signUpText: {
//     color: "#FFFFFF",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   separatorContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: width * 0.8,
//     marginVertical: 20,
//   },
//   separator: {
//     flex: 1,
//     height: 1,
//     backgroundColor: "#3e3e3e",
//   },
//   orText: {
//     color: "#A0A0A0",
//     marginHorizontal: 10,
//   },
//   socialContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: width * 0.6,
//     marginVertical: 20,
//   },
//   socialButton: {
//     padding: 10,
//     borderRadius: 25,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   loginText: {
//     color: "#A0A0A0",
//     marginTop: 20,
//   },
//   loginLink: {
//     color: "#FFFFFF",
//     fontWeight: "bold",
//   },
// });

// export default SignUpPage;
