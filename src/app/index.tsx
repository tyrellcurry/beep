import React from "react";
import MapView from "react-native-maps";
import { StyleSheet, View, Button } from "react-native";
import { Href, router, useRouter } from "expo-router";

export default function App() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
      <Button title="Landing Page" onPress={() => router.push("/LandingPage" as Href<string>)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
