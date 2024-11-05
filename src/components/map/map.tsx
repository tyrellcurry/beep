import React from 'react';
import MapView, { LatLng, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { StyleSheet, Dimensions } from 'react-native';
import { GOOGLE_API_KEY } from "@/environments";

const { width, height } = Dimensions.get('window');
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
};

const Map: React.FC<MapProps> = ({ origin, destination, showDirections, onDirectionsReady, mapRef }) => {
    return (
        <MapView
            ref={mapRef}
            style={styles.map}
            region={origin ? {
                latitude: origin.latitude,
                longitude: origin.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            } : INITIAL_POSITION}
        >
            {origin && <Marker coordinate={origin} title="Your Location" />}
            {destination && <Marker coordinate={destination} />}
            {showDirections && origin && destination && (
                <MapViewDirections
                    origin={origin}
                    destination={destination}
                    apikey={GOOGLE_API_KEY}
                    strokeColor="#651FD7"
                    strokeWidth={4}
                    onReady={onDirectionsReady}
                />
            )}
        </MapView>
    );
};

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});

export default Map;
