// location.tsx
import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import MapView, { LatLng } from "react-native-maps";
import { useRouter } from "expo-router";
import * as GPSLocation from 'expo-location';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { GooglePlaceDetail } from 'react-native-google-places-autocomplete';

// Import components
import Map from "@/src/components/map/map";
import SearchBar from "@/src/components/map/SearchBar";
import TabButtons from "@/src/components/map/TabButtons";
import ActionButtons from "@/src/components/map/ActionButtons";

const STATIC_ORIGIN = {
  latitude: 49.2488,
  longitude: -123.0016,
};

export default function Location() {
  const [origin, setOrigin] = useState<LatLng | null>(null);
  const [destination, setDestination] = useState<LatLng | null>(null);
  const [showDirections, setShowDirections] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);

  const [selectedPlaceDetails, setSelectedPlaceDetails] = useState<GooglePlaceDetail | null>(null);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);


  const mapRef = useRef<MapView>(null);
  const router = useRouter();

  const snapPoints = useMemo(() => ["35%", "50%", "70%"], []);

  // This is used for GPS location tracking
  useEffect(() => {
    (async () => {
      let { status } = await GPSLocation.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await GPSLocation.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setOrigin({ latitude, longitude });
      console.log("Location:", location)
    })();
  }, []);

  // Function to center map on the user's current GPS location
  const handleCenterGPS = async () => {
    try {
      const location = await GPSLocation.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setOrigin({ latitude, longitude });
      handleMoveTo({ latitude, longitude });
    } catch (error) {
      console.error("Error getting current location:", error);
      setErrorMsg("Failed to get current location.");
    }
  };

  const handleMoveTo = async (position: LatLng) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, { duration: 1000 });
    }
  };

  const handlePlaceSelected = (details: any) => {
    const position = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0,
    };
    setDestination(position);
    setSelectedPlaceDetails(details); // Store the place details
    setIsBottomSheetVisible(true); // Show BottomSheet when a place is selected
    handleMoveTo(position);
  };

  const handleClearDestination = () => {
    setDestination(null);
    setIsBottomSheetVisible(false); // Hide BottomSheet when clearing the destination
    handleCenterGPS();
    setShowDirections(false);
  };

  const handleTraceRouteOnReady = (args: any) => {
    if (args) {
      setDistance(args.distance);
      setDuration(args.duration);
    }
  };

  const handleTraceRoute = () => {
    if (origin && destination) {
      setShowDirections(true);
      mapRef.current?.fitToCoordinates([origin, destination], { edgePadding: { top: 70, right: 70, bottom: 70, left: 70 } });
    }
  };

  const handleTabPress = (label: string) => {
    console.log(`Tab pressed: ${label}`);
  };

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
    if (index === -1) { // Fully collapsed or hidden
      setIsBottomSheetVisible(false);
    }
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

      <Map
        origin={origin}
        destination={destination}
        showDirections={showDirections}
        onDirectionsReady={handleTraceRouteOnReady}
        mapRef={mapRef}
      />

      <View style={styles.searchContainer}>
        <SearchBar
          placeholder="Search Maps"
          onPlaceSelected={(details) => {
            handlePlaceSelected(details);
            handleTraceRoute();
          }}
          clearDestination={handleClearDestination}
        />
      </View>

      <TabButtons onTabPress={handleTabPress} />

      <ActionButtons
        onTraceRoute={handleTraceRoute}
        onCenterGPS={handleCenterGPS}
        onLayerToggle={() => console.log("Toggle layers")}
        onSOS={() => router.push("/sos")}
      />

      {showDirections && distance && duration ? (
        <View style={styles.distanceNduration}>
          <Text>Distance: {distance.toFixed(2)} km</Text>
          <Text>Duration: {Math.ceil(duration)} min</Text>
        </View>
      ) : null}

      {/* Place BottomSheet directly under GestureHandlerRootView */}
      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        snapPoints={snapPoints}
        enablePanDownToClose={true} // Enable pan down to close
        index={isBottomSheetVisible ? 0 : -1} // Toggle BottomSheet visibility
      >
        <BottomSheetView style={styles.bottomSheetContentContainer}>
          {selectedPlaceDetails ? (
            <>
              <Text>Place Name: {selectedPlaceDetails.name}</Text>
              <Text>Address: {selectedPlaceDetails.formatted_address}</Text>
            </>
          ) : (
            <Text>No place selected</Text>
          )}
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    position: "absolute",
    width: "90%",
    alignSelf: "center",
    top: 10,
    backgroundColor: "#fff",
    borderRadius: 24,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1,
  },
  distanceNduration: {
    position: "absolute",
    top: 150,
    left: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  bottomSheetContainer: {

    zIndex: 1,
    flex: 1,
    padding: 24,
    backgroundColor: 'grey'
  },
  bottomSheetContentContainer: {
    zIndex: 1,
    flex: 1,
    padding: 36,
    alignItems: 'center',
  }
});

