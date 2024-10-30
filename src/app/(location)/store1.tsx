import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function LocationPage() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.arrow}>◀</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menu}>⋮</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.locationInfo}>
          <Image source={{ uri: "https://picsum.photos/50/50" }} style={styles.logo} />
          <View>
            <Text style={styles.title}>BCIT Downtown Cafe</Text>
            <Text style={styles.details}>4.5 ★★★★☆ · 300m</Text>
            <Text style={styles.category}>Cafe · $5-15</Text>
            <Text style={styles.status}>Open now · Closes 9PM</Text>
          </View>
        </View>

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
            <Marker coordinate={{ latitude: 49.2835, longitude: -123.1153 }} title="BCIT Downtown Cafe" description="A popular cafe near BCIT's Downtown Campus" />
          </MapView>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Directions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Website</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <Text style={styles.sectionText}>📍 555 Seymour St, Vancouver, BC V6B 3H6</Text>
        <Text style={styles.sectionText}>🕒 Open · Closes 9PM</Text>
        <Text style={styles.sectionText}>🌐 bcitdowntowncafe.com</Text>
        <Text style={styles.sectionText}>💵 $5-15 per person</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  backButton: {
    padding: 8,
  },
  arrow: {
    fontSize: 20,
    color: "#FFF",
  },
  menuButton: {
    padding: 8,
  },
  menu: {
    fontSize: 24,
    color: "#FFF",
  },
  content: {
    paddingHorizontal: 16,
  },
  locationInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  title: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  details: {
    color: "#AAA",
    fontSize: 14,
    marginTop: 4,
  },
  category: {
    color: "#AAA",
    fontSize: 14,
  },
  status: {
    color: "#34C759",
    fontSize: 14,
    marginTop: 4,
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
  mapTitle: {
    position: "absolute",
    bottom: 40,
    left: 10,
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  mapSubtitle: {
    position: "absolute",
    bottom: 20,
    left: 10,
    color: "white",
    fontSize: 12,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
  },
  actionButton: {
    backgroundColor: "#651FD7",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  actionText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  infoSection: {
    paddingVertical: 16,
    borderTopColor: "#333",
    borderTopWidth: 1,
  },
  sectionTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  sectionText: {
    color: "#AAA",
    fontSize: 14,
    marginVertical: 4,
  },
});
