import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { useMemo } from "react";
import { Hotel } from "../../types/hotel";
import Map from "../Map";
import Marker from "../CustomMarker";

const render = (status: Status) => {
  if (status === Status.FAILURE) {
    return <p>failed</p>;
  }
  return <p>loading...</p>;
};

interface GoogleMapProps {
  onIdle?: (map: google.maps.Map) => void;
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onMarkerClick: (payload: Hotel) => void;
  markers?: Hotel[];
  center: google.maps.LatLngLiteral;
  zoom: number;
  apiKey: string;
  highlightedMarkerId?: string;
}

export default function GoogleMap({
  apiKey,
  onClick,
  onIdle,
  zoom,
  center,
  markers,
  onMarkerClick,
  highlightedMarkerId,
}: GoogleMapProps) {
  const filtered = useMemo(() => {
    return markers?.filter((m) => m.location.latitude && m.location.longitude);
  }, [markers]);

  return (
    <div className="flex h-full">
      <Wrapper apiKey={apiKey} render={render}>
        <Map
          className="grow h-full"
          center={center}
          zoom={zoom}
          minZoom={2}
          maxZoom={18}
          onIdle={onIdle}
          onClick={onClick}
          fullscreenControl={false}
          streetViewControl={false}
          mapTypeControl={false}
          zoomControl={false}
          clickableIcons={false}
        >
          {filtered?.map((hotel) => (
            <Marker
              key={hotel.hotelId || hotel.pclnId}
              hotel={hotel}
              onClick={onMarkerClick}
              highlight={hotel.hotelId === highlightedMarkerId}
            />
          ))}
        </Map>
      </Wrapper>
    </div>
  );
}
