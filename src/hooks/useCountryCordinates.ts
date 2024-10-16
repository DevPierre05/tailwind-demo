import { useState, useEffect } from "react";

type Location = {
  id: number;
  name: string;
};

type Coordinates = {
  id: number;
  name: string;
  lat: number;
  lng: number;
};

const useCountryCoordinates = (locations: Location[]) => {
  const [coordinates, setCoordinates] = useState<Coordinates[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      setLoading(true);
      setError(null);

      const coordsPromises = locations.map(async (location) => {
        try {
          const response = await fetch(
            `https://restcountries.com/v3.1/name/${location.name}`
          );
          const data = await response.json();
          if (data.length > 0) {
            const { latlng } = data[0]; // Get latitude and longitude
            return {
              id: location.id,
              name: location.name,
              lat: latlng[0],
              lng: latlng[1],
            };
          }
        } catch (error) {
          setError("Error fetching coordinates.");
          console.error("Error fetching coordinates:", error);
        }
        return null;
      });

      const results = await Promise.all(coordsPromises);
      setCoordinates(
        results.filter((coord) => coord !== null) as Coordinates[]
      );
      setLoading(false);
    };

    fetchCoordinates();
  }, [locations]);

  return { coordinates, loading, error };
};

export default useCountryCoordinates;
