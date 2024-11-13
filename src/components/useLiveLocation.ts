import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { FIREBASE_DB } from "@/firebaseConfig";

interface LocationData {
  latitude: number;
  longitude: number;
  timestamp: Date;
}

export const useLiveLocation = (userId: string) => {
  const [location, setLocation] = useState<LocationData | null>(null);

  useEffect(() => {
    const docRef = doc(FIREBASE_DB, "userLocations", userId);

    // Set up real-time listener for the location document
    const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        setLocation({
          latitude: data.latitude,
          longitude: data.longitude,
          timestamp: data.timestamp.toDate(),
        });
      } else {
        console.log("No location data found for this user.");
      }
    });

    return () => unsubscribe(); // Clean up listener on unmount
  }, [userId]);

  return location;
};
