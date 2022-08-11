import { forwardRef, PropsWithChildren, useEffect, useMemo } from "react";
import Portal from "../Portal";
import { Overlay } from "./Overlay";

type OverlayProps = PropsWithChildren<{
  position: google.maps.LatLng | google.maps.LatLngLiteral;
  pane?: keyof google.maps.MapPanes;
  map: google.maps.Map;
}>;

const OverlayView = forwardRef<HTMLDivElement, OverlayProps>(
  ({ position, pane = "floatPane", map, children }, ref) => {
    const container = useMemo(() => {
      const div = document.createElement("div");
      div.style.position = "absolute";
      return div;
    }, []);

    const overlay = useMemo(() => {
      return new Overlay(container, pane, position);
    }, [container, pane, position]);

    useEffect(() => {
      overlay.setMap(map);
      return () => overlay.setMap(null);
    }, [map, overlay]);

    return <Portal container={container}>{children}</Portal>;
  }
);

OverlayView.displayName = "OverlayView";

export default OverlayView;
