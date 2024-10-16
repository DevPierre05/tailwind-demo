import { useState } from "react";

interface Position {
  lat: number;
  lng: number;
}

interface UseGeolocation {
  isLoading: boolean;
  position: Position | null;
  error: string;
  getPosition: () => void;
}

export function useGeolocation(defaultPosition = null) {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [position, setPosition] = useState<Position | null>(defaultPosition);
  const [error, setError] = useState<string>("");

  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return { isLoading, position, error, getPosition };
}
