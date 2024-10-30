import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

const SafeZoneScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Safe Zone</Text>
        <Text style={styles.headerSubtitle}>Share your location or record surroundings, and access saved media easily.</Text>
      </View>

      {/* Map Section with Overlay */}

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 49.2835,
            longitude: -123.1153,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          {/* Placeholder for current location marker */}
          <Marker coordinate={{ latitude: 49.2835, longitude: -123.1153 }} />
        </MapView>
        {/* Overlay with Text and Button */}
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

      {/* Features Section */}
      <View style={styles.featuresContainer}>
        <TouchableOpacity style={styles.featureBoxPurple}>
          <Text style={styles.featureTitle}>Snap & Record</Text>

          <Text style={styles.featureSubtitle}>Snap photos or record videos for safety</Text>
          <View style={styles.featureIcons}>
            <FontAwesome name="camera" size={20} color="white" style={styles.iconSpacing} />

            <FontAwesome name="video-camera" size={20} color="white" />
          </View>
          <TouchableOpacity style={styles.arrowButtonPurple}>
            <Ionicons name="arrow-forward" size={20} color="white" />
          </TouchableOpacity>
        </TouchableOpacity>

        <TouchableOpacity style={styles.featureBoxBlack}>
          <Text style={styles.featureTitle}>Media History</Text>

          <Text style={styles.featureSubtitle}>Access past photos and videos</Text>
          <FontAwesome name="file-image-o" size={20} color="white" style={styles.mediaIcon} />

          <TouchableOpacity style={styles.arrowButtonBlack}>
            <Ionicons name="arrow-forward" size={20} color="white" />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
  },
  header: {
    padding: 16,
    marginTop: 20,
  },
  headerTitle: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
  headerSubtitle: {
    color: "white",
    fontSize: 14,
    marginTop: 5,
  },
  mapContainer: {
    height: 200,
    margin: 16,
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
    fontSize: 16,
    fontWeight: "bold",
  },

  mapOverlaySubtitle: {
    color: "white",
    fontSize: 12,
    marginTop: 4,
  },
  mapOverlayButton: {
    backgroundColor: "#FF4D4D",
    borderRadius: 25,
    padding: 10,
  },
  featuresContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 16,
  },
  featureBoxPurple: {
    width: "48%",
    backgroundColor: "#651Fd7",
    padding: 16,
    borderRadius: 20,
    borderBottomRightRadius: 60,
    position: "relative",
  },
  featureBoxBlack: {
    width: "48%",
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 20,
    borderTopLeftRadius: 60,
    borderColor: "#FFFFFF",
    borderWidth: 1,
    position: "relative",
  },
  featureTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  featureSubtitle: {
    color: "white",
    fontSize: 12,
    marginTop: 5,
  },
  featureIcons: {
    flexDirection: "row",
    marginTop: 10,
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
    backgroundColor: "#FF4D4D",
    borderRadius: 15,
    padding: 6,
  },
  arrowButtonBlack: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#651Fd7",
    borderRadius: 15,
    padding: 6,
  },
});

export default SafeZoneScreen;
