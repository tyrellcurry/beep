import React, { createContext, useContext, useState } from "react";
import { LatLng } from "react-native-maps";

interface LocationContextType {
  origin: LatLng | null;
  destination: LatLng | null;
  setOrigin: (location: LatLng) => void;
  setDestination: (location: LatLng) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC = ({ children }) => {
  const [origin, setOrigin] = useState<LatLng | null>(null);
  const [destination, setDestination] = useState<LatLng | null>(null);

  return <LocationContext.Provider value={{ origin, destination, setOrigin, setDestination }}>{children}</LocationContext.Provider>;
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};
