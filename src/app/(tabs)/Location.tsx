import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
} from "react-native";
import {
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "@/environments";
import Constants from "expo-constants";
import { useRef, useState } from "react";
import MapViewDirections from "react-native-maps-directions";
import Colors from "@/src/constants/Colors";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_POSITION = {
  latitude: 49.2488,
  longitude: -123.0016,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

// TODO: Static coordinates for 3700 Willingdon Ave, Burnaby, BC V5G 3H2 (This is only for midterm presentation)
const STATIC_ORIGIN = {
  latitude: 49.2488,
  longitude: -123.0016,
};

type InputAutocompleteProps = {
  label: string;
  placeholder?: string;
  onPlaceSelected: (details: GooglePlaceDetail | null) => void;
  clearDestination: () => void;
};

function InputAutocomplete({
  label,
  placeholder,
  onPlaceSelected,
  clearDestination,
}: InputAutocompleteProps) {
  const [inputText, setInputText] = useState("");
  const autocompleteRef = useRef<any>(null);

  const handleClearInput = () => {
    setInputText("");
    autocompleteRef.current?.setAddressText("");
    clearDestination();
  };

  return (
    <View style={styles.autocompleteContainer}>
      {label ? <Text>{label}</Text> : null}
      <GooglePlacesAutocomplete
        ref={autocompleteRef}
        styles={{
          textInput: styles.input,
          container: styles.inputContainer,
        }}
        placeholder={placeholder || "Search Maps"}
        fetchDetails
        textInputProps={{
          value: inputText,
          onChangeText: (text) => setInputText(text),
        }}
        onPress={(data, details = null) => {
          onPlaceSelected(details);
          setInputText(details?.name || "");
        }}
        query={{
          key: GOOGLE_API_KEY,
          language: "pt-BR",
        }}
      />

      {/* Conditionally Render "X" Icon */}
      {inputText.length > 0 && (
        <TouchableOpacity onPress={handleClearInput} style={styles.clearIcon}>
          <EvilIcons name="close" size={24} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
}

export default function Location() {
  const [origin, setOrigin] = useState<LatLng | null>(null);
  const [destination, setDestination] = useState<LatLng | null>(null);
  const [showDirections, setShowDirections] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isCrimeDataVisible, setIsCrimeDataVisible] = useState(false);
  const [selectedPlaceDetails, setSelectedPlaceDetails] = useState<GooglePlaceDetail | null>(null);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

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
      let { status } = await GPSLocation.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      const locationSubscription = await GPSLocation.watchPositionAsync(
        {
          accuracy: GPSLocation.Accuracy.High,
          timeInterval: 100000, // Update every second
          distanceInterval: 1, // Update for every meter moved
        },
        (location) => {
          const { latitude, longitude } = location.coords;
          setOrigin({ latitude, longitude });
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

  const onPlaceSelected = (
    details: GooglePlaceDetail | null,
    flag: "destination"
  ) => {
    const position = {
      latitude: details?.geometry.location.lat || 0,
      longitude: details?.geometry.location.lng || 0,
    };
    setDestination(position);
    moveTo(position);
  };

  const clearDestination = () => {
    setDestination(null);
    moveTo(STATIC_ORIGIN);
    setShowDirections(false);
  };

  return (
    <View style={styles.container}>
      {/* The Map View */}
      <MapView
        ref={mapRef}
        style={styles.map}
        // provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_POSITION}
      >
        {origin && <Marker coordinate={origin} title="3700 Willingdon Ave" />}
        {destination && <Marker coordinate={destination} />}
        {showDirections && origin && destination && (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_API_KEY}
            strokeColor="#651FD7"
            strokeWidth={4}
            onReady={traceRouteOnReady}
          />
        )}
      </MapView>

      {/* Search bar */}
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

      {/* Scrollable tabs */}
      <View style={styles.tabButtonsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabButtonsContent}
        >
          {["Open Now", "Nearby", "Safe Zones", "Public Service"].map(
            (label) => (
              <TouchableOpacity key={label} style={styles.tabButton}>
                <Text style={styles.tabButtonText}>{label}</Text>
              </TouchableOpacity>
            )
          )}
        </ScrollView>
      </View>

      {/* Action Buttons in Bottom Right */}
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={styles.traceButton} onPress={traceRoute}>
          <Image
            source={require("../../../assets/map/locationArrowWhite.png")}
            style={styles.iconImage}
          />
        </TouchableOpacity>

        {/* Center GPS button */}
        <TouchableOpacity
          style={styles.centerGPSButton}
          onPress={() => moveTo(STATIC_ORIGIN)}
        >
          <Image
            source={require("../../../assets/map/Black.png")}
            style={styles.iconImageSmall}
          />
        </TouchableOpacity>

        {/* Toggle Layers button */}
        {/* TODO: Add functionality to have layer options. onPress={ } */}
        <TouchableOpacity style={styles.layerButton}>
          <Image
            source={require("../../../assets/map/layerBlack.png")}
            style={styles.iconImageSmall}
          />
        </TouchableOpacity>

        {/* SOS button */}
        <TouchableOpacity
          style={styles.SOSButton}
          onPress={() => router.push("/sos")}
        >
          <Image
            source={require("../../../assets/map/SOSWhiteHollow.png")}
            style={styles.SOSiconImageSmall}
          />
          <Text style={styles.SOSText}>SOS</Text>
        </TouchableOpacity>
      </View>

      {/* Distance and Duration Information */}
      {showDirections && distance && duration ? (
        <View style={styles.distanceNduration}>
          <Text>Distance: {distance.toFixed(2)}</Text>
          <Text>Duration: {Math.ceil(duration)} min</Text>
        </View>
      ) : null}
    </View>
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
