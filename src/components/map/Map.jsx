import { Marker, LayersControl, ScaleControl } from "react-leaflet";
import { lazy, useState, useRef } from "react";
import AdministrativeBoundariesToolTips from "./AdministrativeBoundariesToolTips";
import { Button, CloseButton, Drawer, Portal } from "@chakra-ui/react";
import { Icon } from "leaflet";
import MapBoundsController from "./MapBoundsController";

const MapContainer = lazy(() =>
  import("react-leaflet").then((module) => ({ default: module.MapContainer }))
);
const TileLayer = lazy(() =>
  import("react-leaflet").then((module) => ({ default: module.TileLayer }))
);

export default function Map() {
  const markers = [
    {
      id: 1,
      position: [54.735125, 55.958769],
      info: "Это первый маркер!",
      description:
        "Подробная информация о первом маркере. Здесь может быть любое описание.",
    },
    {
      id: 2,
      position: [54.035125, 55.258769],
      info: "Это второй маркер!",
      description:
        "Подробная информация о втором маркере. Здесь может быть любое описание.",
    },
    {
      id: 3,
      position: [54.235125, 55.058769],
      info: "Это третий маркер!",
      description:
        "Подробная информация о третьем маркере. Здесь может быть любое описание.",
    },
  ];

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const mapRef = useRef();
  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setDrawerOpen(true);

     if (mapRef.current) {
      mapRef.current.setView(marker.position, 15, {
        duration: 2,
        easeLinearity: 0.25
      });
    }
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedMarker(null);
  };

  const customIcon = new Icon({
    iconUrl: '../src/icons/Mavz.svg',
    iconSize: [38, 38]
  });

  return (
    <>
      <MapContainer
        attributionControl={false}
        style={{ height: "100%", width: "100%" }}
        center={[54.234047, 56.5518]}
        bounds={[[58.200891, 68.253995], [50.079248, 43.234323]]}
        zoom={7}
        ref={mapRef}
        on
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapBoundsController />
        <AdministrativeBoundariesToolTips />
        <ScaleControl />
        <LayersControl position="topright">
          {markers.map((marker) => (
            <LayersControl.Overlay key={marker.id} checked name={marker.info}>
              <Marker
                key={marker.id}
                position={marker.position}
                icon={customIcon}
                eventHandlers={{
                  click: () => {
                    handleMarkerClick(marker);
                  },
                }}
              ></Marker>
            </LayersControl.Overlay>
          ))}
        </LayersControl>
      </MapContainer>

      <Drawer.Root
        closeOnInteractOutside={false}
        modal={false}
        placement="start"
        open={drawerOpen}
        size={"sm"}
        onOpenChange={(e) => {
          if (!e.open) handleCloseDrawer();
        }}
      >
        <Portal>
          <Drawer.Positioner pointerEvents="none" padding="4" style={{ 
              top: '60px', // Отступ от верха равный высоте header
              height: 'calc(100vh - 60px)' // Высота минус header
            }}>
            <Drawer.Content rounded="md" fontSize={"md"} fontFamily="Inter">
              <Drawer.Header>
                <Drawer.Title><p>{selectedMarker
                    ? selectedMarker.info
                    : "Информация о маркере"}</p>
                </Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                {selectedMarker ? (
                  <div>
                    <p>
                      <b>Координаты:</b>{" "}
                      {selectedMarker.position.join(", ")}
                    </p>
                    <br></br>
                    <p>
                      <b>Описание: </b> {selectedMarker.description}
                    </p>
                  </div>
                ) : (
                  <p>Информация не найдена</p>
                )}
              </Drawer.Body>
              <Drawer.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Drawer.CloseTrigger>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </>
  );
}
