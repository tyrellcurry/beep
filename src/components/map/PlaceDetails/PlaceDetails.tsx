import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import { GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import PlaceDetailsActionButtons from './PlaceDetailsActionButtons';
import { GOOGLE_API_KEY } from "@/environments";
import { NativeViewGestureHandler } from 'react-native-gesture-handler';

type PlaceDetailsBottomSheetProps = {
    placeDetails: GooglePlaceDetail | null;
    isVisible: boolean;
    bottomSheetRef: React.RefObject<BottomSheet>;
    snapPoints: string[];
};

type PlacePhoto = {
    photo_reference: string;
};

interface ExtendedGooglePlaceDetail extends Omit<GooglePlaceDetail, 'types'> {
    rating?: number;
    user_ratings_total?: number;
    types?: string[]; // Make this optional and compatible
    opening_hours?: { open_now: boolean };
    photos?: PlacePhoto[];
}

const fetchPlaceDetails = async (placeId: string): Promise<ExtendedGooglePlaceDetail | null> => {
    const apiKey = GOOGLE_API_KEY;
    const fields = 'name,rating,user_ratings_total,types,opening_hours,photos';
    const url = `https://maps.googleapis.com/maps/api/place/details/json?fields=${fields}&place_id=${placeId}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const result = await response.json();
        if (result.status === 'OK') {
            return result.result;
        } else {
            console.error('Error fetching place details:', result.status);
            return null;
        }
    } catch (error) {
        console.error('Error fetching place details:', error);
        return null;
    }
};

const PlaceDetailsBottomSheet: React.FC<PlaceDetailsBottomSheetProps> = ({
    placeDetails,
    isVisible,
    bottomSheetRef,
    snapPoints,
}) => {
    const [details, setDetails] = useState<ExtendedGooglePlaceDetail | null>(null);
    console.log("starts here", details?.photos)
    const apiKey = GOOGLE_API_KEY;

    useEffect(() => {
        if (placeDetails?.place_id) {
            fetchPlaceDetails(placeDetails.place_id).then((data) => {
                setDetails(data);
            });
        }
    }, [placeDetails]);

    const getPhotoUrl = (photoReference: string, apiKey: string) => {
        return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoReference}&key=${apiKey}`;
    };

    return (
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            index={isVisible ? 0 : -1}
            backgroundStyle={styles.bottomSheetBackground}
        >
            <BottomSheetView style={styles.bottomSheetContent}>
                {details ? (
                    <>
                        {/* Header */}
                        <View style={styles.header}>
                            <Image
                                source={{ uri: details.photos?.[0]?.photo_reference ? getPhotoUrl(details.photos[0].photo_reference, apiKey) : 'default_image_url' }}
                                style={styles.placeImage}
                            />
                            <View style={styles.headerTextContainer}>
                                <Text style={styles.placeName}>{details.name}</Text>
                                <View style={styles.ratingContainer}>
                                    <Text style={styles.rating}>{details.rating?.toFixed(1)}</Text>
                                    <Ionicons name="star" size={14} color="gold" />
                                    <Text style={styles.reviewCount}>({details.user_ratings_total})</Text>
                                </View>
                                <Text style={styles.placeDetails}>
                                    {details.types && details.types[0] ? details.types[0] : 'Unknown Type'}
                                </Text>
                                <Text style={styles.statusText}>
                                    {details.opening_hours?.open_now ? 'Open' : 'Closed'}
                                </Text>
                            </View>
                        </View>


                        <PlaceDetailsActionButtons onTraceRoute={() => { }} />
                        {/* Image Thumbnails */}
                        <NativeViewGestureHandler disallowInterruption={true}>

                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.thumbnailContainer}>
                                {details.photos?.map((photo, index) => (
                                    <Image
                                        key={index}
                                        source={{ uri: getPhotoUrl(photo.photo_reference, apiKey) }}
                                        style={styles.thumbnail}
                                    />

                                ))}
                            </ScrollView>
                        </NativeViewGestureHandler>

                    </>
                ) : (
                    <Text style={styles.noPlaceText}>No place selected</Text>
                )}
            </BottomSheetView>
        </BottomSheet>
    );
};

const styles = StyleSheet.create({
    bottomSheetBackground: {
        backgroundColor: '#1c1c1e',
    },
    bottomSheetContent: {
        padding: 16,
        backgroundColor: '#1c1c1e',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    placeImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 12,
    },
    headerTextContainer: {
        flex: 1,
    },
    placeName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
    },
    rating: {
        fontSize: 14,
        color: '#FFF',
        marginRight: 4,
    },
    reviewCount: {
        fontSize: 12,
        color: '#888',
    },
    noRating: {
        fontSize: 12,
        color: '#BBB',
    },
    placeDetails: {
        fontSize: 14,
        color: '#BBB',
    },
    statusText: {
        fontSize: 12,
        color: '#4CAF50',
    },
    thumbnailContainer: {
        marginTop: 12,
        flexDirection: 'row',
    },
    thumbnail: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginRight: 8,
    },
    noPlaceText: {
        color: '#FFF',
        fontSize: 16,
    },
});

export default PlaceDetailsBottomSheet;
