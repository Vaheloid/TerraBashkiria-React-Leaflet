import { useMap } from 'react-leaflet';
import { useEffect } from 'react';

export default function MapBoundsController() {
  const map = useMap();

  useEffect(() => {
    const bounds = [
      [58.200891, 68.253995], // северо-восток
      [50.801997, 44.555559]  // юго-запад
    ];

    // Устанавливаем максимальные границы
    map.setMaxBounds(bounds);
    
    // Устанавливаем минимальный zoom
    map.options.minZoom = 7;

    // Обработчик перемещения карты
    const handleDrag = () => {
      map.panInsideBounds(bounds, { animate: false });
    };

    // Добавляем обработчик
    map.on('drag', handleDrag);

    // Очистка при размонтировании
    return () => {
      map.off('drag', handleDrag);
      map.setMaxBounds(null);
    };
  }, [map]);

  return null;
}