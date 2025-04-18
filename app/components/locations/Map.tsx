"use client";

import type { Libraries } from "@react-google-maps/api";
import { useState, useEffect, useRef, useCallback } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import DeliveryAppLogos from "./DeliveryAppLogos";
import Image from "next/image";
import storeLocations from "../json/store-locations.json";

export type Schedule = {
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

export default function Map() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number }>({
    lat: 51.0447,
    lng: -114.0719,
  });
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [sortedLocations, setSortedLocations] = useState<Location[]>([]);
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const [viewMode, setViewMode] = useState<"pickup" | "delivery">("pickup");
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);

  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const locations: Location[] = storeLocations as Location[];

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
    return Number((R * c).toFixed(2));
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

  useEffect(() => {
    const preload = ["/icons/mapstoreicon.svg", "/icons/hereicon.svg"];
    preload.forEach((src) => new window.Image().src = src);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cached = window.localStorage.getItem("userLocation");
      if (cached) setUserLocation(JSON.parse(cached));
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const fresh = { lat: coords.latitude, lng: coords.longitude };
          setUserLocation(fresh);
          window.localStorage.setItem("userLocation", JSON.stringify(fresh));
        },
        (err) => {
          if (process.env.NODE_ENV !== "production") console.error(err);
        }
      );
    }
  }, []);

  useEffect(() => {
    const sorted = locations
      .map((loc) => ({
        ...loc,
        distance: calculateDistance(userLocation.lat, userLocation.lng, loc.lat, loc.lng),
      }))
      .filter((loc) => (loc.distance ?? 0) <= 100)
      .sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0));

    if (JSON.stringify(sorted) !== JSON.stringify(sortedLocations)) {
      setSortedLocations(sorted);
    }
  }, [userLocation, locations, sortedLocations]);

  const handleSidebarClick = useCallback(
    (location: Location) => {
      setSelectedLocation(location);
      if (mapInstance) {
        mapInstance.panTo({ lat: location.lat, lng: location.lng });
      }
    },
    [mapInstance]
  );

  useEffect(() => {
    // cleanup old markers
    markersRef.current.forEach((m) => (m.map = null));
    markersRef.current = [];

    if (googleLoaded && mapInstance) {
      sortedLocations.forEach((loc) => {
        const div = document.createElement("div");
        Object.assign(div.style, {
          backgroundImage: 'url("/icons/mapstoreicon.svg")',
          width: "20px",
          height: "20px",
          backgroundSize: "cover",
          cursor: "pointer",
        });
        div.addEventListener("click", () => handleSidebarClick(loc));

        const marker = new window.google.maps.marker.AdvancedMarkerElement({
          map: mapInstance,
          position: { lat: loc.lat, lng: loc.lng },
          title: loc.name,
          content: div,
        });
        markersRef.current.push(marker);
      });

      const userImg = document.createElement("img");
      Object.assign(userImg.style, {
        width: "40px",
        height: "40px",
        objectFit: "cover",
      });
      userImg.src = "/icons/hereicon.svg";

      const userMarker = new window.google.maps.marker.AdvancedMarkerElement({
        map: mapInstance,
        position: userLocation,
        title: "Your Location",
        content: userImg,
      });
      markersRef.current.push(userMarker);
    }

    return () => {
      markersRef.current.forEach((m) => (m.map = null));
      markersRef.current = [];
    };
  }, [googleLoaded, mapInstance, sortedLocations, userLocation, handleSidebarClick]);

  const handleSearch = () => {
    if (searchInputRef.current && window.google) {
      const bounds = new window.google.maps.LatLngBounds(
        { lat: 50.8429, lng: -114.4086 },
        { lat: 51.2127, lng: -113.919 }
      );
      const autocomplete = new window.google.maps.places.Autocomplete(searchInputRef.current, {
        bounds,
        componentRestrictions: { country: "ca" },
        fields: ["geometry", "name"],
      });
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.geometry?.location) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          setUserLocation({ lat, lng });
          const updated = locations
            .map((loc) => ({
              ...loc,
              distance: calculateDistance(lat, lng, loc.lat, loc.lng),
            }))
            .filter((loc) => (loc.distance ?? 0) <= 100)
            .sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0));
          setSortedLocations(updated);
          mapInstance?.panTo({ lat, lng });
          mapInstance?.setZoom(12);
        }
      });
    }
  };

  return (
    <div className="flex flex-col">
      <div className="grid grid-rows-[45vh_auto_1fr] md:grid-rows-1 md:grid-cols-[40%_60%] flex-1 overflow-hidden">
        {/* Map */}
        <div className="w-full h-full order-1 md:order-2">
          <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
            libraries={libraries}
            onLoad={() => setGoogleLoaded(true)}
          >
            <GoogleMap
              mapContainerClassName="w-full h-full"
              center={userLocation}
              zoom={12}
              options={{ mapId: "11a23be6ab78d144" }}
              onLoad={(map) => setMapInstance(map)}
            />
          </LoadScript>
        </div>

        {/* Mobile Buttons */}
        <div className="w-full bg-white p-2 flex justify-center order-2 md:hidden">
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

        {/* Sidebar / Delivery Panel */}
        <div className="w-full overflow-y-auto bg-white order-3 md:order-1" style={{ maxHeight: "calc(100vh - 45vh - 4rem)" }}>
          <div className="hidden md:flex justify-center p-2 bg-white">
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

          {viewMode === "pickup" ? (
            <div>
              <div className="p-2">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search for a location"
                  className="w-full p-2 border rounded-md text-sm text-black"
                  onFocus={handleSearch}
                />
              </div>
              <div className="divide-y">
                {sortedLocations.map((loc) => {
                  const today = getDayOfWeek();
                  const hours = loc.schedule[today];
                  const { isOpen, closingTime, reopeningTime } = getOpenStatus(hours, loc.schedule);
                  return (
                    <div
                      key={loc.id}
                      className="py-5 px-3 cursor-pointer font-sora"
                      onClick={() => handleSidebarClick(loc)}
                    >
                      <h3 className="text-orange-500 uppercase text-sm">{loc.name}</h3>
                      <p className="text-black text-xs">{loc.address}</p>
                      <p className="text-black text-xs">
                        {loc.distance} km away ·{" "}
                        <span className={isOpen ? "text-green-600" : "text-red-500"}>
                          {isOpen ? `Open until ${closingTime}` : `Closed. Reopens ${reopeningTime}`}
                        </span>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <Image
                src="/images/art/CoCoLogoMascotOnlyGreyTransparent.svg"
                alt="CoCo mascot"
                width={64}
                height={64}
                className="mx-auto mb-2"
              />
              <p className="text-gray-700 mb-4 text-sm text-center">
                Can&apos;t make the trip? Order delivery through our partners!
              </p>
              <DeliveryAppLogos />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
