import React from 'react';
import { View, StyleSheet } from 'react-native';

const CustomMarker = () => (
  <View style={styles.outerCircle}>
    <View style={styles.innerCircle} />
  </View>
);

const styles = StyleSheet.create({
  outerCircle: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: 'rgba(101, 31, 215, 0.2)',
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  innerCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgb(101, 31, 215)',
    borderColor: 'rgb(255, 255, 255)',
    borderWidth: 2,
  },
});

export default CustomMarker;
