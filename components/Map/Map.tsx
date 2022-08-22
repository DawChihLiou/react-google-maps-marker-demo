import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import mapStyle from "./mapStyle";
import { useDeepCompareEffectForMaps } from "./useDeepCompareEffectForMaps";

interface MapProps extends google.maps.MapOptions {
  className: string;
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  children?: ReactNode;
}

export default function Map({
  className,
  onClick,
  onIdle,
  children,
  ...options
}: MapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (ref.current && map === undefined) {
      const googleMap = new window.google.maps.Map(ref.current, {
        styles: mapStyle,
      });
      setMap(googleMap);
    }
  }, [ref, map]);

  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );

      if (onClick) {
        map.addListener("click", onClick);
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  return (
    <>
      <div ref={ref} className={className} />

      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, { map });
        }
      })}
    </>
  );
}
