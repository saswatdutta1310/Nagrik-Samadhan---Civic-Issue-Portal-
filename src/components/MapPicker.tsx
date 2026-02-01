import { useEffect, useRef } from "react";

type Props = {
  lat: number;
  lng: number;
  onPick: (lat: number, lng: number, address?: string) => void;
  enableGeolocation?: boolean;
};

export default function MapPicker({ lat, lng, onPick, enableGeolocation = true }: Props) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const geocoderRef = useRef<any>(null);

  // ✅ GET CURRENT LOCATION ON MOUNT
  useEffect(() => {
    if (enableGeolocation && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          if (mapInstance.current && markerRef.current) {
            const pos = new window.google.maps.LatLng(latitude, longitude);
            markerRef.current.setPosition(pos);
            mapInstance.current.panTo(pos);
            // Notify parent
            if (geocoderRef.current) {
              reverseGeocode(pos);
            } else {
              onPick(latitude, longitude);
            }
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, [enableGeolocation]);

  // ✅ INIT MAP ONLY ONCE
  useEffect(() => {
    if (!mapRef.current || !window.google) return;

    mapInstance.current = new window.google.maps.Map(mapRef.current, {
      center: { lat, lng },
      zoom: 15,
      mapTypeControl: true,
      streetViewControl: false,
      fullscreenControl: true,
    });

    markerRef.current = new window.google.maps.Marker({
      position: { lat, lng },
      map: mapInstance.current,
      draggable: true,
    });

    geocoderRef.current = new window.google.maps.Geocoder();

    // 📍 CLICK ON MAP
    mapInstance.current.addListener("click", (e: any) => {
      if (!e.latLng) return;
      markerRef.current.setPosition(e.latLng);
      reverseGeocode(e.latLng);
    });

    // 📍 DRAG MARKER
    markerRef.current.addListener("dragend", (e: any) => {
      if (!e.latLng) return;
      reverseGeocode(e.latLng);
    });
  }, []);

  // ✅ MOVE MARKER WHEN LAT/LNG CHANGES FROM PARENT
  useEffect(() => {
    if (!markerRef.current || !mapInstance.current) return;

    const pos = new window.google.maps.LatLng(lat, lng);
    markerRef.current.setPosition(pos);
    mapInstance.current.panTo(pos);
  }, [lat, lng]);

  // 🔥 REVERSE GEOCODING
  const reverseGeocode = (latLng: any) => {
    if (!geocoderRef.current) {
      onPick(latLng.lat(), latLng.lng());
      return;
    }

    geocoderRef.current.geocode(
      { location: latLng },
      (results: any, status: any) => {
        if (status === "OK" && results && results.length > 0) {
          onPick(
            latLng.lat(),
            latLng.lng(),
            results[0].formatted_address
          );
        } else {
          onPick(latLng.lat(), latLng.lng());
        }
      }
    );
  };

  return (
    <div
      ref={mapRef}
      className="h-[260px] w-full rounded-xl border"
    />
  );
}
 
 
