import { Administrative_boundaries } from "./AdministrativeBoundaries"
import { useState, useEffect, useRef } from 'react'
import { useMapEvents, useMap, GeoJSON } from 'react-leaflet'

export default function AdministrativeBoundariesToolTips() {
  const map = useMap();
  const [currentZoom, setCurrentZoom] = useState(map.getZoom());
  const geoJsonRef = useRef(null);

  useMapEvents({
    zoomend: () => {
      setCurrentZoom(map.getZoom());
    }
  });

  // Обновляем tooltip при изменении zoom
  useEffect(() => {
    if (!geoJsonRef.current) return;

    const geoJsonLayer = geoJsonRef.current;
    
    geoJsonLayer.eachLayer((layer) => {
      // Всегда убираем существующий tooltip
      if (layer.unbindTooltip) {
        layer.unbindTooltip();
      }
      
      // Добавляем tooltip только если zoom ≥ 7
      if (currentZoom > 7 && layer.feature?.properties?.OSM_ID !== "77677" && layer.feature?.properties?.NAME) {
        layer.bindTooltip(layer.feature.properties.NAME, { 
          permanent: true, 
          direction: "center", 
          className: 'custom-tooltip'
        });
      }
    });
  }, [currentZoom]);

  return (
    <GeoJSON 
      ref={geoJsonRef}
      data={Administrative_boundaries} 
      style={{color: '#ff8100', opacity: 0.5}} 
    />
  );
}