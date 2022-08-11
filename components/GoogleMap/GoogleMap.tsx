import { Status, Wrapper } from "@googlemaps/react-wrapper";
import dynamic from "next/dynamic";
import { Suspense, useMemo, useState } from "react";
import { Hotel } from "../../types/hotel";
import Map from "../Map";

const DynamicMarker = dynamic(() => import("../CustomMarker"), {
  suspense: true,
});

const render = (status: Status) => {
  if (status === Status.FAILURE) {
    return <p>failed</p>;
  }
  return <p>loading...</p>;
};

interface GoogleMapProps {
  onIdle?: (map: google.maps.Map) => void;
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onMarkerClick?: (payload: Hotel) => void;
  markers?: Hotel[];
  center: google.maps.LatLngLiteral;
  zoom: number;
  apiKey: string;
}

export default function GoogleMap({
  apiKey,
  onClick,
  onIdle,
  zoom,
  center,
  markers,
}: GoogleMapProps) {
  const [map, setMap] = useState<google.maps.Map>();
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
          onMapLoaded={setMap}
          fullscreenControl={false}
          streetViewControl={false}
          mapTypeControl={false}
          zoomControl={false}
        >
          <Suspense>
            {map &&
              filtered?.map((hotel) => (
                <DynamicMarker
                  key={hotel.hotelId || hotel.pclnId}
                  hotel={hotel}
                  map={map}
                />
              ))}
          </Suspense>
        </Map>
      </Wrapper>
    </div>
  );
}
