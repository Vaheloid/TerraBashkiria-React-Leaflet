import { Marker, Popup, LayersControl, ScaleControl} from 'react-leaflet'
import { lazy } from 'react'
import AdministrativeBoundariesToolTips from './AdministrativeBoundariesToolTips'

const MapContainer = lazy(() => import('react-leaflet').then(module => ({ default: module.MapContainer })))
const TileLayer = lazy(() => import('react-leaflet').then(module => ({ default: module.TileLayer })))

export default function Map() {
    const markers = [
        {
            id: 1,
            position: [54.735125, 55.958769],
            info: "Это первый маркер!"
        },
        {
            id: 2,
            position: [54.035125, 55.258769],
            info: "Это второй маркер!"
        },
        {
            id: 3,
            position: [54.235125, 55.058769],
            info: "Это третий маркер!"
        },
    ];
    return (
        <MapContainer attributionControl={false} style={{ height: '100%', width: '100%' }} center={[54.234047, 56.551800]} zoom={7}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <AdministrativeBoundariesToolTips />
            <ScaleControl />
            <LayersControl position="topright">
                <LayersControl.Overlay checked name="Marker with popup">
                    {markers.map(marker => (
                <Marker key={marker.id} position={marker.position} eventHandlers={{
                    click: () => {
                        console.log('marker clicked')
                    },
                }}>
                    <Popup>
                        {marker.info}
                    </Popup>
                </Marker>
            ))}
                </LayersControl.Overlay>
            </LayersControl>
            
        </MapContainer>
    );
}