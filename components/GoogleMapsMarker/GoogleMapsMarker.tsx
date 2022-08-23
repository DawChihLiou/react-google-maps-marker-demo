import { useEffect, useState } from "react";

export default function GoogleMapsMarker({
  ...options
}: google.maps.MarkerOptions) {
  const [marker, setMarker] = useState<google.maps.Marker>();

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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marker]);

  return null;
}
