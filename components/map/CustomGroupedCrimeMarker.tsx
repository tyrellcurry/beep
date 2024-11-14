import React from 'react';
import { View, StyleSheet } from 'react-native';

const CustomGroupedCrimeMarker = ({ size = 10 }) => (
  <View style={[styles.outerCircle, { width: size + 10, height: size + 10, borderRadius: 30 }]} >
    <View style={[styles.innerCircle, { width: size, height: size, borderRadius: size / 2 }]} />
  </View>
);

const styles = StyleSheet.create({
  outerCircle: {
    backgroundColor: 'rgba(247, 24, 91, 0.2)',
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  innerCircle: {
    backgroundColor: 'rgba(247, 24, 91, 0.8)',
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 0.5,
  },
});

export default CustomGroupedCrimeMarker;
