import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import GoogleMap from "../components/GoogleMap";
import { fetchHotels, FetchHotelsResponse } from "../services/fetchHotels";

const query = () =>
  fetchHotels({
    checkIn: "2022-11-15",
    checkOut: "2022-11-16",
    locationId: 3000002244,
    rooms: 1,
  });

const Home: NextPage = () => {
  const { data } = useQuery<FetchHotelsResponse>(["hotels"], query, {
    retry: false,
  });

  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 37.78746222,
    lng: -122.412923,
  });
  const [zoom, setZoom] = useState<number>(15);

  const onIdle = (map: google.maps.Map) => {
    setZoom(map.getZoom()!);

    const nextCenter = map.getCenter();

    if (nextCenter) {
      setCenter(nextCenter.toJSON());
    }
  };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="h-screen relative">
          <GoogleMap
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
            center={center}
            zoom={zoom}
            markers={data?.hotels}
            onIdle={onIdle}
          />
        </div>
      </main>
    </div>
  );
};

export default Home;