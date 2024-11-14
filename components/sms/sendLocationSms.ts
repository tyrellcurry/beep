import * as Location from "expo-location";
import { Alert } from "react-native";
import { sendSms } from "@/components/sms/sendSms";

interface LatLng {
  latitude: number;
  longitude: number;
}
export const sendLocationSms = async (destination?: LatLng) => {
  // console.log("Destination passed to sendLocationSms:", destination);
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    Alert.alert("Permission Denied", "Permission to access location was denied");
    return;
  }

  const location = await Location.getCurrentPositionAsync({});
  const { latitude, longitude } = location.coords;
  if (!destination) {
    const message = `current location: https://maps.google.com/?q=${location.coords.latitude},${location.coords.longitude}`;

    await sendSms(message, ["1234567890"]);
  } else {
    // todo : username
    const message = `Dora has sent an urgent alert through Beep. 
      Their location has been shared with you. 
      Please check on them by viewing their location:
      https://www.google.com/maps/dir/?api=1&destination=${destination.latitude},${destination.longitude}&travelmode=walking&dir_action=navigate`; //&dir_action=navigate can remove this
    //?saddr=${latitude},${longitude}&daddr=${destination.latitude},${destination.longitude}&directionsmode=walking&zoom=17`;

    await sendSms(message, ["1234567890"]);
  }
};
