import { useCallback, useEffect, useState } from "react";
import { Hotel } from "../../types/hotel";

interface MarkerProps extends google.maps.MarkerOptions {
  data: Hotel;
  onClick?: (payload: Hotel) => void;
}

export default function Marker({ data, onClick, ...options }: MarkerProps) {
  const [marker, setMarker] = useState<google.maps.Marker>();
  const handleClick = useCallback(() => {
    onClick?.(data);
  }, [data, onClick]);

  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    if (marker) {
      marker.setOptions(options);
      marker.addListener("click", handleClick);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marker]);

  return null;
}
