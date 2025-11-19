import { Marker, Popup, LayersControl, ScaleControl } from "react-leaflet";
import { lazy, useState } from "react";
import AdministrativeBoundariesToolTips from "./AdministrativeBoundariesToolTips";
import {Button, CloseButton, Drawer, Portal } from "@chakra-ui/react";

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

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedMarker(null);
  };

  return (
    <>
      <MapContainer
        attributionControl={false}
        style={{ height: "100%", width: "100%" }}
        center={[54.234047, 56.5518]}
        zoom={7}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <AdministrativeBoundariesToolTips />
        <ScaleControl />
        <LayersControl position="topright">
          {markers.map((marker) => (
            <LayersControl.Overlay checked name={marker.info}>
              <Marker
                key={marker.id}
                position={marker.position}
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
