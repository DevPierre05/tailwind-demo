import { useSearchParams } from "react-router-dom";

export function useUrlPosition(): [number, number] {
  const [searchParams] = useSearchParams();

  // Use parseFloat to convert the parameters to numbers
  const lat: number = parseFloat(searchParams.get("lat") || "0");
  const lng: number = parseFloat(searchParams.get("lng") || "0");

  return [lat, lng];
}
