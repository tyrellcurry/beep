import React, { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import MapView, { LatLng, Marker } from "react-native-maps";
import { useRouter } from "expo-router";
import * as GPSLocation from "expo-location";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { GooglePlaceDetail } from "react-native-google-places-autocomplete";
import { fetchCrimeData, CrimeData } from "@/db/services/crimeDataService";

// Import components
import Map from "@/components/map/map";
import SearchBar from "@/components/map/SearchBar";
import TabButtons from "@/components/map/TabButtons";
import ActionButtons from "@/components/map/ActionButtons";
import PlaceDetailsBottomSheet from "@/components/map/PlaceDetails/PlaceDetails";
import { useLocation } from "@/components/map/LocationContext";

export default function Location() {
  const [origin, setOrigin] = useState<LatLng | null>(null);
  // const [destination, setDestination] = useState<LatLng | null>(null);
  const { destination, setDestination } = useLocation();
  const [showDirections, setShowDirections] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isCrimeDataVisible, setIsCrimeDataVisible] = useState(false);
  const [selectedPlaceDetails, setSelectedPlaceDetails] = useState<GooglePlaceDetail | null>(null);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [crimeData, setCrimeData] = useState<CrimeData[]>([]);

  const mapRef = useRef<MapView>(null);
  const router = useRouter();

  const snapPoints = useMemo(() => ["40%", "50%"], []);

  // This is used for GPS location tracking
  // useEffect(() => {
  //   (async () => {
  //     let { status } = await GPSLocation.requestForegroundPermissionsAsync();
  //     if (status !== 'granted') {
  //       setErrorMsg('Permission to access location was denied');
  //       return;
  //     }

  //     let location = await GPSLocation.getCurrentPositionAsync({});
  //     const { latitude, longitude } = location.coords;
  //     setOrigin({ latitude, longitude });
  //     console.log("Location:", location)
  //   })();
  // }, []);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchCrimeData();
        // console.log("Crime data fetched:", data); // Log to check if data is properly fetched
        setCrimeData(data);
      } catch (error) {
        console.error("Failed to load crime data:", error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await GPSLocation.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      const locationSubscription = await GPSLocation.watchPositionAsync(
        {
          // accuracy: GPSLocation.Accuracy.High,
          // timeInterval: 100000, // Update every second
          // distanceInterval: 1, // Update for every meter moved
        },
        (location) => {
          const { latitude, longitude } = location.coords;
          setOrigin({ latitude, longitude }); // Update the state but don't adjust the camera automatically
        }
      );

      return () => locationSubscription.remove(); // Cleanup on component unmount
    })();
  }, []);

  // Function to center map on the user's current GPS location
  const handleCenterGPS = async () => {
    try {
      const location = await GPSLocation.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setOrigin({ latitude, longitude });
      handleMoveTo({ latitude, longitude }); // Only move the camera when manually triggered
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
    console.log(position, "p");
    setSelectedPlaceDetails(details); // Store the place details
    setIsBottomSheetVisible(true); // Show BottomSheet when a place is selected
    handleMoveTo(position);
  };

  const handleClearDestination = () => {
    setDestination();
    setIsBottomSheetVisible(false);
    bottomSheetRef.current?.close();
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

  const handleCrimeDataToggle = () => {
    setIsCrimeDataVisible(!isCrimeDataVisible);
    // console.log("Toggle layers");
  };

  const adjustCameraPosition = () => {
    if (mapRef.current && origin) {
      mapRef.current.animateCamera({
        center: {
          latitude: origin.latitude,
          longitude: origin.longitude,
        },
        pitch: 0,
        heading: 0,
        zoom: 14,
      });
    }
  };

  useEffect(() => {
    if (origin) {
      adjustCameraPosition();
    }
  }, [origin]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Map origin={origin} destination={destination} showDirections={showDirections} onDirectionsReady={handleTraceRouteOnReady} mapRef={mapRef} crimeData={crimeData} />

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

      <ActionButtons onCenterGPS={handleCenterGPS} onCrimeDataToggle={handleCrimeDataToggle} isCrimeDataVisible={isCrimeDataVisible} onSOS={() => router.push("/sos")} />

      <PlaceDetailsBottomSheet placeDetails={selectedPlaceDetails} isVisible={isBottomSheetVisible} bottomSheetRef={bottomSheetRef} snapPoints={snapPoints} onTraceRoute={handleTraceRoute} />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    marginTop: 50,
    position: "absolute",
    width: "90%",
    alignSelf: "center",
    top: 10,
    backgroundColor: "#141216",
    borderRadius: 24,
    paddingHorizontal: 15,
    zIndex: 1,
  },
});
