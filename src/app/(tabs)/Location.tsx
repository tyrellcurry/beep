import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  ScrollView, Image
} from "react-native";
import {
  GooglePlaceDetail,
  GooglePlacesAutocomplete, GooglePlacesAutocompleteRef
} from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "@/environments";
import Constants from "expo-constants";
import { useRef, useState } from "react";
import MapViewDirections from "react-native-maps-directions";
import Colors from "@/src/constants/Colors";
import EvilIcons from '@expo/vector-icons/EvilIcons';
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

export default function App() {
  const [origin, setOrigin] = useState<LatLng>(STATIC_ORIGIN);
  const [destination, setDestination] = useState<LatLng | null>(null);
  const [showDirections, setShowDirections] = useState(false);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const mapRef = useRef<MapView>(null);
  const router = useRouter();

  const moveTo = async (position: LatLng) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      mapRef.current?.animateCamera(camera, { duration: 1000 });
    }
  };

  const edgePaddingValue = 70;

  const edgePadding = {
    top: edgePaddingValue,
    right: edgePaddingValue,
    bottom: edgePaddingValue,
    left: edgePaddingValue,
  };

  const traceRouteOnReady = (args: any) => {
    if (args) {
      // args.distance
      // args.duration
      setDistance(args.distance);
      setDuration(args.duration);
    }
  };

  const traceRoute = () => {
    if (origin && destination) {
      setShowDirections(true);
      mapRef.current?.fitToCoordinates([origin, destination], { edgePadding });
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
        provider={PROVIDER_GOOGLE}
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
        <InputAutocomplete
          label=""
          placeholder="Search Maps"
          onPlaceSelected={(details) => {
            onPlaceSelected(details, "destination");
            traceRoute();
          }}
          clearDestination={clearDestination}
        />
      </View>

      {/* Scrollable tabs */}
      <View style={styles.tabButtonsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabButtonsContent}>
          {["Open Now", "Nearby", "Safe Zones", "Public Service"].map((label) => (
            <TouchableOpacity key={label} style={styles.tabButton}>
              <Text style={styles.tabButtonText}>{label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Action Buttons in Bottom Right */}
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={styles.traceButton} onPress={traceRoute}>
          <Image source={require("../../../assets/map/locationArrowWhite.png")} style={styles.iconImage} />
        </TouchableOpacity>

        {/* Center GPS button */}
        <TouchableOpacity style={styles.centerGPSButton} onPress={() => moveTo(STATIC_ORIGIN)}>
          <Image source={require("../../../assets/map/Black.png")} style={styles.iconImageSmall} />
        </TouchableOpacity>

        {/* Toggle Layers button */}
        {/* TODO: Add functionality to have layer options. onPress={ } */}
        <TouchableOpacity style={styles.layerButton} >
          <Image source={require("../../../assets/map/layerBlack.png")} style={styles.iconImageSmall} />
        </TouchableOpacity>

        {/* SOS button */}
        <TouchableOpacity style={styles.SOSButton} onPress={() => router.push("/(tabs)/Emergency")}>
          <Image source={require("../../../assets/map/SOSWhiteHollow.png")} style={styles.SOSiconImageSmall} />
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
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  searchContainer: {
    position: "absolute",
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    top: 10,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    borderRadius: 24,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1,
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: 40,
    backgroundColor: "transparent",
    textAlignVertical: "center",
    marginTop: 4,
  },
  icon: {
    marginLeft: 10,
    marginBottom: 7,
  },
  tabButtonsContainer: {
    position: "absolute",
    top: 100,
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    marginTop: -30,
    height: 40,
  },
  tabButtonsContent: {
    paddingLeft: 20,
    alignItems: "center",
  },
  tabButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 24,
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    height: 30,
  },
  tabButtonText: {
    color: "#000",
    fontSize: 14,
  },
  traceButton: {
    position: "absolute",
    bottom: 210,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#651FD7",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  centerGPSButton: {
    position: "absolute",
    bottom: 150,
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  layerButton: {
    position: "absolute",
    bottom: 90,
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  centerGPSButtonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
  layerButtonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
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
  dNdContainer: {
    backgroundColor: "#fff",

  },
  actionButtonsContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    alignItems: "center",
  },
  iconImage: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  iconImageSmall: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
  SOSiconImageSmall: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  SOSButton: {
    bottom: 90,
    right: 250,
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF3B5F",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  SOSText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "900",
  },
  autocompleteContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  inputContainer: {
    flex: 1,
    paddingRight: 30,
  },
  clearIcon: {
    position: "absolute",
    right: 10,
    top: 8,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
});