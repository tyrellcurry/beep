// import React from "react";
// import MapView, { LatLng, Marker } from "react-native-maps";
// import MapViewDirections from "react-native-maps-directions";
// import { StyleSheet, Dimensions } from "react-native";
// import { GOOGLE_API_KEY } from "@/environments";
// import CustomMarker from "./CustomMarker";
// import CustomCrimeMarker from "./CustomCrimeMarker";
// import { CrimeData } from "@/db/services/crimeDataService";

// const { width, height } = Dimensions.get("window");
// const ASPECT_RATIO = width / height;
// const LATITUDE_DELTA = 0.02;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// // This is only temp if GPS does not work.
// const INITIAL_POSITION = {
//   latitude: 49.2488,
//   longitude: -123.0016,
//   latitudeDelta: LATITUDE_DELTA,
//   longitudeDelta: LONGITUDE_DELTA,
// };

// type MapProps = {
//   origin: LatLng | null;
//   destination: LatLng | null;
//   showDirections: boolean;
//   onDirectionsReady: (args: any) => void;
//   mapRef: React.RefObject<MapView>;
//   crimeData: CrimeData[];
// };

// const Map: React.FC<MapProps> = ({ origin, destination, showDirections, onDirectionsReady, mapRef, crimeData }) => {

//   return (
//     <MapView
//       ref={mapRef}
//       style={styles.map}
//       region={
//         origin
//           ? {
//               latitude: origin.latitude,
//               longitude: origin.longitude,
//               latitudeDelta: LATITUDE_DELTA,
//               longitudeDelta: LONGITUDE_DELTA,
//             }
//           : INITIAL_POSITION
//       }
//     >
//       {origin && (
//         <Marker coordinate={origin} anchor={{ x: 0.5, y: 0.5 }} calloutAnchor={{ x: 0.5, y: 0.5 }}>
//           <CustomMarker />
//         </Marker>
//       )}
//       {destination && <Marker coordinate={destination} pinColor="red" />}
//       {showDirections && origin && destination && <MapViewDirections origin={origin} destination={destination} apikey={GOOGLE_API_KEY} strokeColor="#651FD7" strokeWidth={4} onReady={onDirectionsReady} />}

//       {crimeData.map((crime) => (
//         <Marker key={crime["id"]} coordinate={{ latitude: crime["latitude"], longitude: crime["longitude"] }} title={crime["type"]}>
//           <CustomCrimeMarker />
//         </Marker>
//       ))}
//     </MapView>
//   );
// };

// const styles = StyleSheet.create({
//   map: {
//     width: Dimensions.get("window").width,
//     height: Dimensions.get("window").height,
//   },
// });

// export default Map;

import React, { useState } from "react";
import MapView, { Marker, Region, LatLng } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_API_KEY } from "@/environments";
import { StyleSheet, Dimensions } from "react-native";
import CustomMarker from "./CustomMarker";
import CustomCrimeMarker from "./CustomCrimeMarker";
import CustomGroupedCrimeMarker from "./CustomGroupedCrimeMarker";
import { CrimeData } from "@/db/services/crimeDataService";
import { useClusters, Cluster } from "@/db/services/useClusters"; // Adjust the path as needed

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
  isCrimeDataVisible: boolean;
};

const Map: React.FC<MapProps> = ({
  origin,
  destination,
  showDirections,
  onDirectionsReady,
  mapRef,
  crimeData,
  isCrimeDataVisible
}) => {
  const [region, setRegion] = useState<Region>(
    origin
    ? {
        latitude: origin.latitude,
        longitude: origin.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }
    : INITIAL_POSITION
  );

  const clusters = useClusters(crimeData, region);

  const onRegionChangeComplete = (newRegion: Region) => {
    setRegion(newRegion);
  };

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onRegionChangeComplete={onRegionChangeComplete}
    >
      {/* Current Location Pin */}
      {origin && (
        <Marker
          coordinate={origin}
          anchor={{ x: 0.5, y: 0.5 }}
          calloutAnchor={{ x: 0.5, y: 0.5 }}
        >
          <CustomMarker />
        </Marker>
      )}

      {/* Destination Pin */}
      {destination && <Marker coordinate={destination} pinColor="red" />}

      {/* Directions */}
      {showDirections && origin && destination && (
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_API_KEY}
          strokeColor="#651FD7"
          strokeWidth={4}
          onReady={onDirectionsReady}
          mode="WALKING" // This line specifies the walking route
        />
      )}

      {/* Render Crime Data if Visible */}
      {isCrimeDataVisible &&
        clusters.map((cluster: Cluster, index: number) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const isCluster = cluster.properties.cluster;
          const pointCount = cluster.properties.point_count || 0; // Safely handle undefined

          if (isCluster) {
            return (
              <Marker
                key={`cluster-${index}`}
                coordinate={{ latitude, longitude }}
                title={`Cluster of ${pointCount} crimes`}
              >
                <CustomGroupedCrimeMarker size={Math.min(40, 10 + pointCount * 2)} pointCount={pointCount} />
              </Marker>
            );
          } else {
            return (
              <Marker
                key={cluster.properties.crimeId}
                coordinate={{ latitude, longitude }}
                title={cluster.properties.type}
              >
                <CustomCrimeMarker size={10} />
              </Marker>
            );
          }
        })}
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
