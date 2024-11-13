import React from "react";
import MapView, { LatLng, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { StyleSheet, Dimensions } from "react-native";
import { GOOGLE_API_KEY } from "@/environments";
import CustomMarker from "./CustomMarker";
import { CrimeData } from "@/db/services/crimeDataService";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// This is only temp if GPS does not work.
const INITIAL_POSITION = {
  latitude: 49.2488,
  longitude: -123.0016,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

type MapProps = {
  origin: LatLng | null;
  destination: LatLng | null;
  showDirections: boolean;
  onDirectionsReady: (args: any) => void;
  mapRef: React.RefObject<MapView>;
  crimeData: CrimeData[];
};

const Map: React.FC<MapProps> = ({ origin, destination, showDirections, onDirectionsReady, mapRef, crimeData }) => {
  //   console.log("Crime data received in Map component:", crimeData);

  // Sample crime data with quoted keys
  const sampleData = [
    {
      day: 11,
      hour: 17,
      id: 13,
      latitude: 49.2827, // Replace with converted coordinates if needed
      longitude: -123.1207,
      minute: 39,
      month: 9,
      neighbourhood: "Central Business District",
      type: "Break and Enter Commercial",
      year: 2024,
    },
    {
      day: 20,
      hour: 9,
      id: 16,
      latitude: 49.2833,
      longitude: -123.1215,
      minute: 36,
      month: 9,
      neighbourhood: "Central Business District",
      type: "Break and Enter Commercial",
      year: 2024,
    },
    {
      day: 29,
      hour: 17,
      id: 21,
      latitude: 49.2851,
      longitude: -123.1234,
      minute: 29,
      month: 9,
      neighbourhood: "Central Business District",
      type: "Break and Enter Commercial",
      year: 2024,
    },
  ];

  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      region={
        origin
          ? {
              latitude: origin.latitude,
              longitude: origin.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }
          : INITIAL_POSITION
      }
    >
      {origin && (
        <Marker coordinate={origin} anchor={{ x: 0.5, y: 0.5 }} calloutAnchor={{ x: 0.5, y: 0.5 }}>
          <CustomMarker />
        </Marker>
      )}
      {destination && <Marker coordinate={destination} pinColor="#F7185B" />}
      {showDirections && origin && destination && <MapViewDirections origin={origin} destination={destination} apikey={GOOGLE_API_KEY} strokeColor="#651FD7" strokeWidth={4} onReady={onDirectionsReady} />}

      {/* {crimeData.map((crime) => {
                console.log(`Rendering marker for ID ${crime.id}:`, { lat: crime.latitude, lon: crime.longitude });

                if (!isNaN(crime.latitude) && !isNaN(crime.longitude)) {
                    return (
                    <Marker
                        key={crime.id}
                        coordinate={{ latitude: crime.latitude, longitude: crime.longitude }}
                        title={crime.type}
                    />
                    );
                } else {
                    console.warn(`Skipping marker for ID ${crime.id} due to invalid coordinates`);
                    return null;
                }
            })} */}

      {crimeData.map((crime) => (
        <Marker key={crime["id"]} coordinate={{ latitude: crime["latitude"], longitude: crime["longitude"] }} title={crime["type"]} />
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default Map;
