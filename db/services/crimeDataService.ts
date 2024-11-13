import { supabase } from "@/supabaseConfig"; // Adjust the import path as needed
import proj4 from "proj4"; // Import proj4 for coordinate conversion

// Define the coordinate systems
// Replace "EPSG:26910" with the appropriate EPSG code for your data's projection if needed.
proj4.defs("EPSG:26910", "+proj=utm +zone=10 +datum=WGS84 +units=m +no_defs"); // Example UTM Zone 10N

export interface CrimeData {
  id: number;
  latitude: number;
  longitude: number;
  type: string;
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  neighbourhood: string;
}

export const fetchCrimeData = async (): Promise<CrimeData[]> => {
  try {
    // Hard-coded values for testing
    const targetYear = 2024;
    const targetMonth = 10;

    // console.log(`Fetching data for YEAR = ${targetYear} and MONTH = ${targetMonth}`);

    const { data, error } = await supabase.from("crimes").select('"ID", "TYPE", "YEAR", "MONTH", "DAY", "HOUR", "MINUTE", "NEIGHBOURHOOD", "X", "Y"').eq("YEAR", targetYear).eq("MONTH", targetMonth);

    // console.log("Fetched data:", data); // Log the raw data

    if (error) {
      console.error("Error fetching crime data:", error);
      throw new Error(`Error fetching crime data: ${error.message}`);
    }

    if (!data || data.length === 0) {
      console.warn("No data found for the specified query conditions.");
      return []; // Return an empty array if no data is found
    }

    // Map and convert data to match your application structure
    return data.map((crime: any) => {
      // Convert projected coordinates to latitude/longitude
      const [longitude, latitude] = proj4("EPSG:26910", "WGS84", [crime["X"], crime["Y"]]);

      return {
        id: crime["ID"],
        latitude, // Converted latitude
        longitude, // Converted longitude
        type: crime["TYPE"],
        year: crime["YEAR"],
        month: crime["MONTH"],
        day: crime["DAY"],
        hour: crime["HOUR"],
        minute: crime["MINUTE"],
        neighbourhood: crime["NEIGHBOURHOOD"],
      };
    });
  } catch (error) {
    console.error("Error in fetchCrimeData:", error);
    throw error;
  }
};
