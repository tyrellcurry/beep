import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { FIREBASE_DB } from "@/firebaseConfig";
import * as Location from "expo-location";
import { Alert } from "react-native";

/**
 * Start live location sharing for a specific user.
 * Continuously updates the user's location in Firestore.
 */
export const startLiveLocationSharing = async (userId: string) => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    Alert.alert("Permission Denied", "Permission to access location was denied");
    return;
  }

  // Set an interval to update location every 5 minutes
  const interval = setInterval(async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Update Firestore with the user's current location
      await setDoc(doc(FIREBASE_DB, "userLocations", ), {
        userId,
        latitude,
        longitude,
        timestamp: serverTimestamp(),
      });
      console.log("Location updated in Firestore:", latitude, longitude);
    } catch (error) {
      console.error("Error updating location:", error);
    }
  }, 60000); // Update every minute

  // Optional: Stop location sharing after a period (e.g., 30 minutes)
  setTimeout(() => {
    clearInterval(interval);
    Alert.alert("Live Location Sharing Ended", "Location sharing has stopped.");
  }, 1800000); // Stop after 30 minutes
};
