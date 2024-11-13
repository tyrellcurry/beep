import React, { useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { useLocation } from "@/components/map/LocationContext";
import { sendLocationSms } from "@/components/sms/sendLocationSms";

const EmergencyScreen: React.FC = () => {
  const router = useRouter();
  const { destination } = useLocation();
  const lastTap = useRef(0);

  const handleDoubleTap = () => {
    const now = Date.now();
    if (lastTap.current && now - lastTap.current < 300) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      router.push("/sos");
    } else {
      lastTap.current = now;
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
  };

  const handleSendSms = () => {
    if (destination) {
      sendLocationSms(destination);
      console.log("Destination in EmergencyScreen:", destination);
    } else {
      Alert.alert("Error", "No destination set");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📍BCIT School of Business + Media</Text>
      <Text style={styles.title}>Activate Alarm</Text>
      <Text style={styles.subtitle}>Sound a loud alarm and send your location to emergency contacts.</Text>

      <TouchableOpacity style={styles.sosButton} onPress={handleDoubleTap}>
        <View style={styles.sosTextContainer}>
          <Text style={styles.sosText}>SOS</Text>
        </View>
        <View style={styles.sosButtonOuterCircle} />
        <View style={styles.sosButtonMiddleCircle} />
        <View style={styles.sosButtonInnerCircle} />
      </TouchableOpacity>
      <Text style={styles.instructions}>Tap 2 times on button to activate</Text>

      <Text style={styles.optionTitle}>SMS option</Text>
      <View style={styles.optionsContainer}>
        <View style={styles.option}>
          <TouchableOpacity style={styles.optionButton} onPress={handleSendSms}>
            <Text style={styles.optionButtonText}>Emergency Alert</Text>
            <Text style={styles.optionDescription}>Send the default emergency message and your live location to all selected contacts</Text>
            <View style={styles.contactIcons}>
              <View style={styles.contactCircle}>
                <Text style={styles.contactInitial}>D</Text>
              </View>
              <View style={styles.contactCircle}>
                <Text style={styles.contactInitial}>M</Text>
              </View>
              <Image source={require("../../assets/icons/add-icon.png")} style={{ width: 30, height: 30 }} />
            </View>
            <TouchableOpacity style={styles.arrowButton}>
              <Ionicons name="arrow-forward" size={20} color="white" />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default EmergencyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141216",
    padding: 20,
  },
  header: {
    marginTop: 50,
    color: "#cccccc",
    fontSize: Platform.OS === "ios" ? 16 : 14,
    fontWeight: "600",
    marginBottom: 10,
  },
  title: {
    color: "#FFFFFF",
    fontSize: Platform.OS === "ios" ? 30 : 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginLeft: 5,
  },
  subtitle: {
    color: "#CCCCCC",
    fontSize: Platform.OS === "ios" ? 14 : 12,
    textAlign: "center",
    marginBottom: 30,
    marginTop: 15,
    marginLeft: 25,
    width: "85%",
  },
  sosButton: {
    width: 200,
    height: 200,
    borderRadius: 90,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    position: "relative",
    marginBottom: 20,
  },
  sosButtonOuterCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(247, 24, 91, 0.3)",
    position: "absolute",
    top: 0,
    left: 0,
  },
  sosButtonMiddleCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(247, 24, 91, 0.5)",
    position: "absolute",
    top: 10,
    left: 10,
  },
  sosButtonInnerCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#F7185B",
    position: "absolute",
    top: 25,
    left: 25,
  },
  sosTextContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  sosText: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "bold",
  },
  instructions: {
    color: "#AAAAAA",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 40,
    marginTop: 15,
  },
  option: {
    width: "100%",
  },
  optionTitle: {
    color: "#F4F0F1",
    fontSize: 18,
    textAlign: "left",
    marginTop: 15,
    marginLeft: 5,
    fontWeight: "bold",
  },
  optionButton: {
    backgroundColor: "#651Fd7",
    borderRadius: 15,
    paddingLeft: 20,
    paddingBottom: 15,
    paddingTop: 18,
    paddingRight: 50,
    height: Platform.OS === "ios" ? 160 : 180,
  },
  optionButtonText: {
    color: "#FFFFFF",
    fontSize: Platform.OS === "ios" ? 30 : 26,
    fontWeight: "bold",
    marginBottom: Platform.OS === "ios" ? 8 : 0,
  },
  optionDescription: {
    color: "#cccccc",
    fontSize: Platform.OS === "ios" ? 12 : 11,
    marginBottom: 10,
    textAlign: "left",
    width: "85%",
  },
  arrowButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#F7185B",
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
  },
  contactInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  contactText: {
    color: "#FFFFFF",
    fontSize: 10,
    marginRight: 5,
  },
  contactIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 1,
  },
  contactCircle: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: "#F7185B",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },
  contactInitial: {
    color: "#FFFFFF",
    fontSize: 12,
  },
});
