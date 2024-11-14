import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { useCameraPermissions } from "expo-camera";
import CameraComponent from "@/components/camera/Camera";
import { useNavigation } from "@react-navigation/native";
import TabStyles from "@/components/tabStyles";
import * as Location from "expo-location";
import CustomMarker from "@/components/map/CustomMarker";

const SafeZoneScreen: React.FC = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [region, setRegion] = useState<{ latitude: number; longitude: number; latitudeDelta: number; longitudeDelta: number } | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const requestLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Permission to access location was denied");
        return;
      }
      const currentLocation = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    };

    requestLocationPermission();
  }, []);

  const handleOpenCamera = async () => {
    if (!permission?.granted) {
      const { granted } = await requestPermission();
      if (!granted) {
        Alert.alert("Camera Permission Needed", "Please enable camera access to use this feature.");
        return;
      }
    }
    setIsCameraOpen(true);
    navigation.setOptions({ tabBarStyle: { display: "none" } });
  };

  const handleCloseCamera = () => {
    setIsCameraOpen(false);
    navigation.setOptions({ tabBarStyle: TabStyles.tabBarStyle });
  };

  return (
    <View style={styles.container}>
      {isCameraOpen ? (
        <CameraComponent
          onClose={handleCloseCamera}
          onCapture={(photoUri) => {
            console.log("Captured photo URI:", photoUri);
          }}
        />
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Safe Zone</Text>
            <Text style={styles.headerSubtitle}>Share your location or record surroundings, and access saved media easily.</Text>
          </View>

          <View style={styles.mapContainer}>
            {region ? (
              <MapView
                style={styles.map}
                region={region} // Use `region` instead of `initialRegion` for dynamic updating
                onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
              >
                <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }}>
                  {" "}
                  <CustomMarker />
                </Marker>
              </MapView>
            ) : (
              <Text style={{ color: "white", textAlign: "center", marginTop: 20 }}>Loading map...</Text>
            )}
            <View style={styles.mapOverlay}>
              <View>
                <Text style={styles.mapOverlayTitle}>Live Location Sharing</Text>
                <Text style={styles.mapOverlaySubtitle}>Share your location with emergency contacts.</Text>
              </View>
              <TouchableOpacity style={styles.mapOverlayButton}>
                <Ionicons name="arrow-forward" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.featuresContainer}>
            <TouchableOpacity style={styles.featureBoxPurple} onPress={handleOpenCamera}>
              <Text style={styles.featureTitle}>Snap & Record</Text>
              <Text style={styles.featureSubtitle}>Snap photos or record videos for safety</Text>
              <View style={styles.featureIcons}>
                <Image source={require("@/assets/icons/camera-emoji.png")} style={{ width: 30, height: 30 }} />
                <Image source={require("@/assets/icons/camera2-emoji.png")} style={{ width: 30, height: 30 }} />
              </View>
              <TouchableOpacity style={styles.arrowButtonPurple}>
                <Ionicons name="arrow-forward" size={20} color="white" />
              </TouchableOpacity>
            </TouchableOpacity>

            <TouchableOpacity style={styles.featureBoxBlack}>
              <Text style={styles.featureTitle}>Media History</Text>
              <Text style={styles.featureSubtitle}>Access past photos and videos</Text>
              <View style={styles.featureIcons}>
                <Image source={require("@/assets/icons/media-emoji.png")} style={{ width: 30, height: 30 }} />
              </View>
              <TouchableOpacity style={styles.arrowButtonBlack}>
                <Ionicons name="arrow-forward" size={20} color="white" />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141216",
  },
  header: {
    padding: 16,
    marginTop: 50,
  },
  headerTitle: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
  },
  headerSubtitle: {
    color: "white",
    fontSize: 14,
    marginTop: 5,
  },
  mapContainer: {
    height: 300,
    margin: 16,
    marginTop: 0,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#1C1C1C",
    position: "relative",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  mapOverlayTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  mapOverlaySubtitle: {
    color: "white",
    fontSize: 12,
    marginTop: 4,
  },
  mapOverlayButton: {
    backgroundColor: "#F7185B",
    borderRadius: 25,
    padding: 10,
    marginBottom: Platform.OS === "ios" ? 75 : 80,
    marginEnd: 10,
    position: "relative",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    right: Platform.OS === "ios" ? 0 : 15,
  },
  featuresContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 16,
    marginTop: 5,
  },
  featureBoxPurple: {
    width: "48%",
    height: 180,
    backgroundColor: "#651Fd7",
    padding: 10,
    borderRadius: 20,
    position: "relative",
    flexDirection: "column",
  },
  featureBoxBlack: {
    width: "48%",
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 20,
    borderColor: "#FFFFFF",
    borderWidth: 3,
    position: "relative",
  },
  featureTitle: {
    color: "white",
    fontSize: Platform.OS === "ios" ? 26 : 22,
    fontWeight: "bold",
  },
  featureSubtitle: {
    color: "white",
    fontSize: Platform.OS === "ios" ? 14 : 12,
    width: "95%",
  },
  featureIcons: {
    flexDirection: "row",
    marginTop: 25,
    gap: 5,
    position: "absolute",
    bottom: 10,
    left: 10,
  },
  iconSpacing: {
    marginRight: 8,
  },
  mediaIcon: {
    position: "absolute",
    bottom: 10,
    left: 10,
  },
  arrowButtonPurple: {
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
  arrowButtonBlack: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#651Fd7",
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: "#141216",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  permissionImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    textAlign: "center",
  },
  permissionMessage: {
    fontSize: 16,
    color: "#CCCCCC",
    textAlign: "center",
    marginBottom: 30,
  },
  permissionButton: {
    backgroundColor: "#651Fd7",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  permissionButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SafeZoneScreen;
