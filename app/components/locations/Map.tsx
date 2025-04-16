"use client";

import type { Libraries } from "@react-google-maps/api";
import { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import DeliveryAppLogos from "./DeliveryAppLogos";
// Import store locations from the JSON file in the data folder (located in components)
import storeLocations from "../json/store-locations.json";

type Schedule = {
  [key: string]: string;
};

export type Location = {
  id: number;
  lat: number;
  lng: number;
  name: string;
  address: string;
  postalcode: string;
  phone: string;
  schedule: Schedule;
  distance?: number;
};

const libraries: Libraries = ["places", "marker"];

const Map = () => {
  // Default location: Calgary.
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number }>({
    lat: 51.0447,
    lng: -114.0719,
  });
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [sortedLocations, setSortedLocations] = useState<Location[]>([]);
  const [googleLoaded, setGoogleLoaded] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"pickup" | "delivery">("pickup");
  // Use state to track the map instance explicitly.
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);

  // Keep a ref for markers (so we can clear them as needed).
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // Use imported store locations from the JSON file.
  const locations: Location[] = storeLocations as Location[];

  // Calculate distance between two points.
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Number.parseFloat((R * c).toFixed(2));
  };

  const getDayOfWeek = (): string => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[new Date().getDay()];
  };

  const getOpenStatus = (
    hours: string | undefined,
    schedule: Schedule
  ): { isOpen: boolean; closingTime: string | null; reopeningTime: string | null } => {
    if (!hours) return { isOpen: false, closingTime: null, reopeningTime: null };

    const [start, end] = hours.split(" - ");
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const toMinutes = (time: string): number => {
      const [hour, modifier] = time.split(" ");
      const [h, m] = hour.split(":").map(Number);
      const minutes = (h % 12) * 60 + (m || 0);
      return modifier === "PM" ? minutes + 12 * 60 : minutes;
    };

    const startMinutes = toMinutes(start);
    const endMinutes = toMinutes(end);
    const isOpen = currentTime >= startMinutes && currentTime <= endMinutes;

    let reopeningTime: string | null = null;
    if (!isOpen) {
      const days = Object.keys(schedule);
      const todayIndex = days.indexOf(getDayOfWeek());
      let nextDayIndex = (todayIndex + 1) % days.length;
      while (!schedule[days[nextDayIndex]]) {
        nextDayIndex = (nextDayIndex + 1) % days.length;
      }
      reopeningTime = schedule[days[nextDayIndex]].split(" - ")[0];
    }

    return { isOpen, closingTime: isOpen ? end : null, reopeningTime };
  };

  // Preload marker images.
  useEffect(() => {
    const preloadImages = ["/icons/mapstoreicon.svg", "/icons/hereicon.svg"];
    preloadImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Improved user location effect:
  // 1. Load cached location from localStorage (if available)
  // 2. Request current position via Geolocation API, then update state and cache.
  useEffect(() => {
    if (typeof window !== "undefined") {
      const cachedLocation = window.localStorage.getItem("userLocation");
      if (cachedLocation) {
        setUserLocation(JSON.parse(cachedLocation));
      }
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const freshLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(freshLocation);
          if (typeof window !== "undefined") {
            window.localStorage.setItem("userLocation", JSON.stringify(freshLocation));
          }
        },
        (error) => {
          if (process.env.NODE_ENV !== "production") {
            console.error("Error fetching location:", error);
          }
        }
      );
    }
  }, []);

  // Update sorted locations based on current userLocation.
  useEffect(() => {
    const sorted = locations
      .map((location) => ({
        ...location,
        distance: calculateDistance(userLocation.lat, userLocation.lng, location.lat, location.lng),
      }))
      .filter((location) => location.distance! <= 100)
      .sort((a, b) => a.distance! - b.distance!);

    if (JSON.stringify(sorted) !== JSON.stringify(sortedLocations)) {
      setSortedLocations(sorted);
    }
  }, [userLocation]);

  const handleSearch = () => {
    if (searchInputRef.current && window.google) {
      const bounds = new window.google.maps.LatLngBounds(
        { lat: 50.8429, lng: -114.4086 },
        { lat: 51.2127, lng: -113.919 }
      );

      const autocomplete = new window.google.maps.places.Autocomplete(searchInputRef.current, {
        bounds,
        strictBounds: false,
        componentRestrictions: { country: "ca" },
        fields: ["geometry", "name"],
      });

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.geometry?.location) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          setUserLocation({ lat, lng });
          const updatedLocations = locations
            .map((location) => ({
              ...location,
              distance: calculateDistance(lat, lng, location.lat, location.lng),
            }))
            .filter((location) => location.distance! <= 100)
            .sort((a, b) => a.distance! - b.distance!);
          setSortedLocations(updatedLocations);

          if (mapInstance) {
            mapInstance.panTo({ lat, lng });
            mapInstance.setZoom(12);
          }
        }
      });
    }
  };

  const handleSidebarClick = (location: Location) => {
    setSelectedLocation(location);
    if (mapInstance) {
      mapInstance.panTo({ lat: location.lat, lng: location.lng });
    }
  };

  // Create and clean up markers.
  useEffect(() => {
    // Remove previous markers.
    markersRef.current.forEach((marker) => {
      marker.map = null;
    });
    markersRef.current = [];

    if (googleLoaded && window.google && mapInstance) {
      sortedLocations.forEach((location) => {
        const markerDiv = document.createElement("div");
        markerDiv.style.backgroundImage = 'url("/icons/mapstoreicon.svg")';
        markerDiv.style.width = "20px";
        markerDiv.style.height = "20px";
        markerDiv.style.backgroundSize = "cover";
        markerDiv.style.cursor = "pointer";
        markerDiv.addEventListener("click", () => handleSidebarClick(location));

        const marker = new window.google.maps.marker.AdvancedMarkerElement({
          map: mapInstance,
          position: { lat: location.lat, lng: location.lng },
          title: location.name,
          content: markerDiv,
        });

        markersRef.current.push(marker);
      });

      // Create user location marker.
      const userMarkerImg = document.createElement("img");
      userMarkerImg.src = "/icons/hereicon.svg";
      userMarkerImg.style.width = "40px";
      userMarkerImg.style.height = "40px";
      userMarkerImg.style.objectFit = "cover";

      const userMarker = new window.google.maps.marker.AdvancedMarkerElement({
        map: mapInstance,
        position: userLocation,
        title: "Your Location",
        content: userMarkerImg,
      });

      markersRef.current.push(userMarker);
    }

    // Cleanup markers on dependency change/unmount.
    return () => {
      markersRef.current.forEach((marker) => {
        marker.map = null;
      });
      markersRef.current = [];
    };
  }, [googleLoaded, mapInstance, sortedLocations, userLocation]);

  return (
    <div className="flex flex-col">
      {/* Main Content */}
      <div className="grid grid-rows-[45vh_auto_1fr] md:grid-rows-1 md:grid-cols-[40%_60%] flex-1 overflow-hidden">
        {/* Map Section */}
        <div className="w-full h-full order-1 md:order-2">
          <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
            libraries={libraries}
            onLoad={() => setGoogleLoaded(true)}
          >
            <div className="w-full h-full" style={{ pointerEvents: "auto" }}>
              <GoogleMap
                mapContainerClassName="w-full h-full"
                center={userLocation}
                zoom={12}
                options={{ mapId: "11a23be6ab78d144" }}
                onLoad={(map) => {
                  setMapInstance(map);
                }}
              />
            </div>
          </LoadScript>
        </div>

        {/* Buttons Panel - Mobile */}
        <div className="w-full bg-white p-2 flex justify-center order-2 md:hidden">
          <div className="flex space-x-4">
            <button
              className={`uppercase font-sora px-4 sm:px-10 py-2 text-sm sm:text-base rounded-3xl border-orange-500 border ${
                viewMode === "pickup" ? "bg-orange-500 text-white" : "bg-white text-orange-500"
              }`}
              onClick={() => setViewMode("pickup")}
            >
              Pickup
            </button>
            <button
              className={`uppercase font-sora px-4 sm:px-10 py-2 text-sm sm:text-base rounded-3xl border-orange-500 border ${
                viewMode === "delivery" ? "bg-orange-500 text-white" : "bg-white text-orange-500"
              }`}
              onClick={() => setViewMode("delivery")}
            >
              Delivery
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div
        className="w-full overflow-y-auto bg-white order-3 md:order-1"
        style={{ maxHeight: "calc(100vh - 45vh - 4rem)" }}
        >
          {/* Sidebar internal content */}
          {/* Desktop buttons (if applicable) */}
          <div className="hidden md:flex justify-center p-2 bg-white">
            <div className="flex space-x-4">
              <button
                className={`px-4 sm:px-10 py-2 text-sm sm:text-base rounded-3xl border-orange-500 border ${
                  viewMode === "pickup" ? "bg-orange-500 text-white" : "bg-white text-orange-500"
                }`}
                onClick={() => setViewMode("pickup")}
              >
                Pickup
              </button>
              <button
                className={`px-4 sm:px-10 py-2 text-sm sm:text-base rounded-3xl border-orange-500 border ${
                  viewMode === "delivery" ? "bg-orange-500 text-white" : "bg-white text-orange-500"
                }`}
                onClick={() => setViewMode("delivery")}
              >
                Delivery
              </button>
            </div>
          </div>

          {viewMode === "pickup" ? (
            <>
              <div className="p-2">
                <div className="relative">
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search for a location"
                    className="w-full p-2 border rounded-md text-sm text-black"
                    onFocus={handleSearch}
                  />
                </div>
              </div>
              <div className="divide-y">
                {sortedLocations.map((location) => {
                  const today = getDayOfWeek();
                  const hours = location.schedule[today];
                  const { isOpen, closingTime, reopeningTime } = getOpenStatus(hours, location.schedule);
                  return (
                    <div
                      key={location.id}
                      className="py-5 px-3 cursor-pointer font-sora "
                      onClick={() => handleSidebarClick(location)}
                    >
                      <h3 className="text-orange-500 uppercase text-sm">{location.name}</h3>
                      <p className="text-black text-xs">{location.address}</p>
                      <p className="text-black text-xs">
                        {location.distance} km away &middot;{" "}
                        <span className={`text-xs ${isOpen ? "text-green-600" : "text-red-500"}`}>
                          {isOpen ? `Open until ${closingTime}` : `Closed. Reopens ${reopeningTime}`}
                        </span>
                      </p>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-center max-w-md mx-auto px-4 py-6">
                <img
                  src="/images/art/CoCoLogoMascotOnlyGreyTransparent.svg"
                  alt="CoCo mascot"
                  className="w-16 h-16 mx-auto mb-2"
                />
                <p className="text-gray-700 mb-4 text-sm">
                  Can&apos;t make the trip? Order delivery through our partners!
                </p>
                <DeliveryAppLogos />
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default Map;
