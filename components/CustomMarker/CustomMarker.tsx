import dynamic from "next/dynamic";
import { useMemo } from "react";
import { Hotel } from "../../types/hotel";

const DynamicOverlayView = dynamic(() => import("../OverlayView"), {
  suspense: true,
});

interface CustomMarkerProps {
  hotel: Hotel;
  map: google.maps.Map;
}

export default function CustomMarker({ hotel, map }: CustomMarkerProps) {
  const price = useMemo(() => {
    return hotel.ratesSummary.minPrice.replace(/\.(.*?\d*)/g, "");
  }, [hotel]);

  return (
    <DynamicOverlayView
      position={{
        lat: hotel.location.latitude as number,
        lng: hotel.location.longitude as number,
      }}
      map={map}
    >
      <div className="rounded-full bg-slate-400 py-1 px-1.5 drop-shadow text-xxs text-white">{`$ ${price}`}</div>
    </DynamicOverlayView>
  );
}
