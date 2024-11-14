// useClusters.ts
import Supercluster, { PointFeature } from "supercluster";
import { useRef, useState, useEffect } from "react";
import { Region } from "react-native-maps";
import { CrimeData } from "@/db/services/crimeDataService";

export type Cluster = PointFeature<{
  cluster: boolean;
  point_count?: number;
  crimeId?: number;
  type?: string;
}>;

export const useClusters = (crimeData: CrimeData[], region: Region) => {
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const superclusterRef = useRef(
    new Supercluster({
      radius: 60,
      maxZoom: 14,
    })
  );

  useEffect(() => {
    const points: Cluster[] = crimeData.map((crime) => ({
      type: "Feature",
      properties: { cluster: false, crimeId: crime.id, type: crime.type },
      geometry: {
        type: "Point",
        coordinates: [crime.longitude, crime.latitude],
      },
    }));

    superclusterRef.current.load(points);
    updateClusters(region);
  }, [crimeData, region]);

  const updateClusters = (region: Region) => {
    const bounds: [number, number, number, number] = [region.longitude - region.longitudeDelta / 2, region.latitude - region.latitudeDelta / 2, region.longitude + region.longitudeDelta / 2, region.latitude + region.latitudeDelta / 2];

    const zoomLevel = Math.round(Math.log2(360 / region.longitudeDelta));
    const clusters = superclusterRef.current.getClusters(bounds, zoomLevel) as Cluster[];
    setClusters(clusters);
  };

  return clusters;
};
