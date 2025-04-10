"use client";

import type { Libraries } from "@react-google-maps/api";
import { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import DeliveryAppLogos from "./DeliveryAppLogos";

type Schedule = {
  [key: string]: string;
};

type Location = {
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
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number }>({
    lat: 51.0447,
    lng: -114.0719,
  });
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [sortedLocations, setSortedLocations] = useState<Location[]>([]);
  const [googleLoaded, setGoogleLoaded] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"pickup" | "delivery">("pickup");

  const mapRef = useRef<google.maps.Map | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);

  const locations: Location[] = [
    {
      id: 1,
      lat: 51.140557671521876,
      lng: -114.06951971593705,
      name: "Harvest Hills",
      address: "9650 Harvest Hills Blvd N #1113",
      postalcode: "T3K 0B3",
      phone: "XXX-XXX-XXXX",
      schedule: {
        Monday: "11:30 AM - 11:00 PM",
        Tuesday: "11:30 AM - 11:00 PM",
        Wednesday: "11:30 AM - 10:00 PM",
        Thursday: "11:30 AM - 10:00 PM",
        Friday: "11:30 AM - 10:00 PM",
        Saturday: "11:30 AM - 10:00 PM",
        Sunday: "11:30 AM - 10:00 PM",
      },
    },
    {
      id: 2,
      lat: 51.12734580261667,
      lng: -114.19557993454954,
      name: "Crowfoot",
      address: "150 Crowfoot Crescent NW #303",
      postalcode: "T3G 3T2",
      phone: "XXX-XXX-XXXX",
      schedule: {
        Monday: "11:30 AM - 10:00 PM",
        Tuesday: "11:30 AM - 10:00 PM",
        Wednesday: "11:30 AM - 10:00 PM",
        Thursday: "11:30 AM - 10:00 PM",
        Friday: "11:30 AM - 10:00 PM",
        Saturday: "11:30 AM - 10:00 PM",
        Sunday: "11:30 AM - 10:00 PM",
      },
    },
    {
      id: 3,
      lat: 51.08259525945537,
      lng: -114.09418731069533,
      name: "Northmount Plaza",
      address: "3400 14 St NW #102",
      postalcode: "T2K 1H9",
      phone: "XXX-XXX-XXXX",
      schedule: {
        Monday: "12:00 PM - 9:00 PM",
        Tuesday: "12:00 PM - 9:00 PM",
        Wednesday: "12:00 PM - 9:00 PM",
        Thursday: "12:00 PM - 9:00 PM",
        Friday: "12:00 PM - 9:00 PM",
        Saturday: "12:00 PM - 9:00 PM",
        Sunday: "12:00 PM - 9:00 PM",
      },
    },
    {
      id: 4,
      lat: 51.03746239963937,
      lng: -114.17783413232726,
      name: "Christie Crossing",
      address: "40 Christie Park View SW Unit 8, 3125",
      postalcode: "T3H 6E7",
      phone: "XXX-XXX-XXXX",
      schedule: {
        Monday: "12:00 PM - 10:00 PM",
        Tuesday: "12:00 PM - 10:00 PM",
        Wednesday: "12:00 PM - 10:00 PM",
        Thursday: "12:00 PM - 10:00 PM",
        Friday: "12:00 PM - 10:00 PM",
        Saturday: "12:00 PM - 10:00 PM",
        Sunday: "12:00 PM - 10:00 PM",
      },
    },
    {
      id: 5,
      lat: 51.050468599175865,
      lng: -114.0624531406064,
      name: "Chinatown",
      address: "100 3 Ave SE",
      postalcode: "T2G 0B6",
      phone: "XXX-XXX-XXXX",
      schedule: {
        Monday: "11:00 AM - 11:00 PM",
        Tuesday: "11:00 AM - 11:00 PM",
        Wednesday: "11:00 AM - 11:00 PM",
        Thursday: "11:00 AM - 11:00 PM",
        Friday: "11:00 AM - 11:00 PM",
        Saturday: "11:00 AM - 11:00 PM",
        Sunday: "11:00 AM - 11:00 PM",
      },
    },
    {
      id: 6,
      lat: 51.0608501132362,
      lng: -113.98443222480552,
      name: "Pacific Place",
      address: "999 36 St NE #311",
      postalcode: "T2A 6K5",
      phone: "XXX-XXX-XXXX",
      schedule: {
        Monday: "11:00 AM - 10:00 PM",
        Tuesday: "11:00 AM - 10:00 PM",
        Wednesday: "11:00 AM - 10:00 PM",
        Thursday: "11:00 AM - 10:00 PM",
        Friday: "11:00 AM - 10:00 PM",
        Saturday: "11:00 AM - 10:00 PM",
        Sunday: "11:00 AM - 10:00 PM",
      },
    },
    {
      id: 7,
      lat: 50.96980518223345,
      lng: -114.06994799758279,
      name: "Macleod Plaza",
      address: "9250 Macleod Trail #19",
      postalcode: "T2J 0P9",
      phone: "XXX-XXX-XXXX",
      schedule: {
        Monday: "12:00 AM - 11:00 PM",
        Tuesday: "12:00 AM - 11:00 PM",
        Wednesday: "12:00 AM - 11:00 PM",
        Thursday: "12:00 AM - 11:00 PM",
        Friday: "12:00 AM - 11:00 PM",
        Saturday: "12:00 AM - 11:00 PM",
        Sunday: "12:00 AM - 11:00 PM",
      },
    },
    {
      id: 8,
      lat: 50.907236305686475,
      lng: -114.06601675893562,
      name: "Shawnessy",
      address: "16061 Macleod Trail SE #226-2",
      postalcode: "T2Y 3S5",
      phone: "XXX-XXX-XXXX",
      schedule: {
        Monday: "11:30 AM - 11:00 PM",
        Tuesday: "11:30 AM - 11:00 PM",
        Wednesday: "11:30 AM - 11:00 PM",
        Thursday: "11:30 AM - 11:00 PM",
        Friday: "11:30 AM - 11:00 PM",
        Saturday: "11:30 AM - 11:00 PM",
        Sunday: "11:30 AM - 11:00 PM",
      },
    },
  ];

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) ** 2;
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

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          if (process.env.NODE_ENV !== "production") {
            console.error("Error fetching location:", error)
          }
        }        
      );
    }
  }, []);

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

          if (mapRef.current) {
            mapRef.current.panTo({ lat, lng });
            mapRef.current.setZoom(12);
          }
        }
      });
    }
  };

  const handleSidebarClick = (location: Location) => {
    setSelectedLocation(location);
    if (mapRef.current) {
      mapRef.current.panTo({ lat: location.lat, lng: location.lng });
    }
  };

  useEffect(() => {
    markersRef.current.forEach((marker) => {
      marker.map = null;
    });
    markersRef.current = [];

    if (googleLoaded && window.google && mapRef.current) {
      sortedLocations.forEach((location) => {
        const markerDiv = document.createElement("div");
        markerDiv.style.backgroundImage = "url(/icons/mapstoreicon.png)";
        markerDiv.style.width = "40px";
        markerDiv.style.height = "40px";
        markerDiv.style.backgroundSize = "cover";
        markerDiv.style.cursor = "pointer";
        markerDiv.addEventListener("click", () => handleSidebarClick(location));

        const marker = new window.google.maps.marker.AdvancedMarkerElement({
          map: mapRef.current,
          position: { lat: location.lat, lng: location.lng },
          title: location.name,
          content: markerDiv,
        });

        markersRef.current.push(marker);
      });

      const userMarkerImg = document.createElement("img");
      userMarkerImg.src = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
      userMarkerImg.style.width = "30px";
      userMarkerImg.style.height = "30px";
      userMarkerImg.style.objectFit = "cover";

      const userMarker = new window.google.maps.marker.AdvancedMarkerElement({
        map: mapRef.current,
        position: userLocation,
        title: "Your Location",
        content: userMarkerImg,
      });

      markersRef.current.push(userMarker);
    }
  }, [googleLoaded, sortedLocations, userLocation]);

  return (
    <div className="flex flex-col h-screen">
      {/* Top Panel: Buttons */}
      <div className="flex justify-center p-2 bg-white z-10">
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

      {/* Main Content */}
      <div className="grid grid-rows-[60vh_40vh] md:grid-rows-1 md:grid-cols-[40%_60%] flex-1 overflow-hidden">
        {/* Left Panel: Sidebar */}
        <div className="w-full h-full overflow-y-auto bg-white">
          {viewMode === "pickup" && (
            <div className="flex p-2 md:p-4">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search for a location"
                className="p-2 border rounded text-zinc-800 w-full text-sm md:text-base"
                onFocus={handleSearch}
              />
            </div>
          )}
          {viewMode === "pickup" && (
            <div className="overflow-y-auto">
              <ul>
                {sortedLocations.length > 0 ? (
                  sortedLocations.map((location) => {
                    const today = getDayOfWeek()
                    const todayHours = location.schedule[today]
                    const { isOpen, closingTime, reopeningTime } = getOpenStatus(todayHours, location.schedule)
                    return (
                      <li
                        key={location.id}
                        onClick={() => handleSidebarClick(location)}
                        className={`text-zinc-800 text-xs md:text-sm cursor-pointer p-2 md:p-4 md:pl-10 rounded border-t-2 ${
                          selectedLocation?.id === location.id ? "bg-gray-200" : "bg-white"
                        } hover:bg-gray-100`}
                      >
                        <strong>{location.name}</strong>
                        <br />
                        {location.address}
                        <br />
                        {location.distance} km away &middot;
                        <span className={isOpen ? "text-green-600" : "text-red-600"}>
                          {isOpen
                            ? ` Open until ${closingTime}`
                            : ` Closed. Reopens ${reopeningTime ? reopeningTime : "soon"}`}
                        </span>
                        <br />
                        {selectedLocation?.id === location.id && (
                          <div className="mt-2">
                            <strong>Phone: </strong>
                            {location.phone}
                            <br />
                            <strong>Hours:</strong>
                            <ul className="pl-4">
                              {Object.entries(location.schedule).map(([day, hours]) => (
                                <li key={day} className={day === today ? "font-bold" : ""}>
                                  {day}: {hours}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </li>
                    )
                  })
                ) : (
                  <div className="flex justify-center items-center h-full text-gray-500 text-sm md:text-base">
                    Unfortunately there aren&apos;t any CoCo Locations within 100km of you.
                  </div>
                )}
              </ul>
            </div>
          )}
          {viewMode === "delivery" && (
            <div className="flex flex-col items-center pt-10 md:pt-20 flex-grow">
              <img
                src="/images/CoCoLogoMascotOnlyGreyTransparent.png"
                alt="Logo"
                className="w-16 h-16 md:w-24 md:h-24 mb-3 md:mb-5 opacity-75"
              />
              <p className="text-gray-700 text-sm md:text-lg mb-4 md:mb-6 text-center px-4">
                Can&apos;t make the trip? Order delivery through our partners!
              </p>
              <DeliveryAppLogos />
            </div>
          )}
        </div>
        {/* Right Panel: Map */}
        <div className="w-full h-full">
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
                  mapRef.current = map;
                }}
              >
                {/* markers will go here */}
              </GoogleMap>
            </div>
          </LoadScript>
        </div>
      </div>
    </div>
 );
};

export default Map;