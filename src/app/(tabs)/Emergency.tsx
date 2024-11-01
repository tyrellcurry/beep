import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as Location from "expo-location";
import { sendSms } from "@/src/components/sendSms";

const EmergencyScreen: React.FC = () => {
  const router = useRouter();

  // Function to handle sending location via SMS
  const handleSendLocationSms = async () => {
    // Request permission for location access
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Permission to access location was denied"
      );
      return;
    }

    // Get the current location
    const location = await Location.getCurrentPositionAsync({});
    const message = `Dora has sent an urgent alert through Beep. Their location has been shared with you. Please check on them by viewing their location: https://maps.google.com/?q=${location.coords.latitude},${location.coords.longitude}`;

    // TODO: this num will be coming from database once the emergency contact has set up
    await sendSms(message, ["1234567890"]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📍BCIT School of Business + Media</Text>
      <Text style={styles.title}>Activate Alarm</Text>
      <Text style={styles.subtitle}>
        Sound a loud alarm and send your location to emergency contacts.
      </Text>

      {/* SOS Button with Navigation to SOS Page */}
      <TouchableOpacity
        style={styles.sosButton}
        onPress={() => router.push("/sos")}
      >
        <Text style={styles.sosText}>SOS</Text>
      </TouchableOpacity>

      <Text style={styles.instructions}>Tap 2 times on button to activate</Text>

      <View style={styles.optionsContainer}>
        {/* Authorities Section */}
        <View style={styles.option}>
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionTitle}>Authorities</Text>
            <Text style={styles.optionButtonText}>Dial 911</Text>
            <Text style={styles.optionDescription}>
              Directly contact 911 for urgent assistance
            </Text>
            <View style={styles.contactInfo}>
              <Image
                source={{ uri: "https://i.pravatar.cc/300" }}
                style={styles.profileImage}
              />
              <Text style={styles.contactText}>
                dora123{"\n"}(604) 123-5678
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Contacts Section with SMS Friend button */}
        <View style={styles.option}>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={handleSendLocationSms}
          >
            <Text style={styles.optionTitle}>Contacts</Text>
            <Text style={styles.optionButtonText}>SMS Friend</Text>
            <Text style={styles.optionDescription}>
              Send alert to your emergency contacts
            </Text>
            <View style={styles.contactIcons}>
              <View style={styles.contactCircle}>
                <Text style={styles.contactInitial}>D</Text>
              </View>
              <View style={styles.contactCircle}>
                <Text style={styles.contactInitial}>M</Text>
              </View>
              <Ionicons name="add-circle" size={24} color="#FFFFFF" />
            </View>
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
    backgroundColor: "#1E1E1E",
    padding: 20,
  },
  header: {
    color: "#FF4C60",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    color: "#CCCCCC",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 30,
  },
  sosButton: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#F7185B",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 10,
    shadowColor: "#F7185B",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 50,
  },
  sosText: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "bold",
  },
  instructions: {
    color: "#AAAAAA",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  option: {
    width: "48%",
  },
  optionTitle: {
    color: "#141216",
    fontSize: 14,
    marginBottom: 5,
    backgroundColor: "#F4F0F1",
    borderRadius: 25,
    width: "60%",
    alignItems: "center",
  },
  optionButton: {
    backgroundColor: "#651Fd7",
    borderRadius: 12,
    padding: 15,
  },
  optionButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  optionDescription: {
    color: "#CCCCCC",
    fontSize: 12,
    marginBottom: 10,
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
  },
  contactCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#333333",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },
  contactInitial: {
    color: "#FFFFFF",
    fontSize: 12,
  },
});
