import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";

const Map = () => {
    const [userLocation, setUserLocation] = useState({ lat: 51.0447, lng: -114.0719 });
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [sortedLocations, setSortedLocations] = useState([]);
    const [googleLoaded, setGoogleLoaded] = useState(false);
    const mapRef = useRef();

    const [locations] = useState([
        { id: 1, lat: 51.140557671521876, lng: -114.06951971593705, name: "CoCo Fresh Tea & Juice Harvest Hills", address: "9650 Harvest Hills Blvd N #1113, Calgary, AB T3K 0B3", hours: "9 AM - 9 PM" },
        { id: 2, lat: 51.12734580261667, lng: -114.19557993454954, name: "CoCo Fresh Tea & Juice Crowfoot", address: "150 Crowfoot Crescent NW #303, Calgary, AB T3G 3T2", hours: "10 AM - 8 PM" },
        { id: 3, lat: 51.08259525945537, lng: -114.09418731069533, name: "CoCo Fresh Tea & Juice Northbound Plaza", address: "3400 14 St NW #102, Calgary, AB T2K 1H9", hours: "11 AM - 7 PM" },
        { id: 4, lat: 51.03746239963937, lng: -114.17783413232726, name: "CoCo Fresh Tea & Juice Christie Crossing", address: "40 Christie Park View SW Unit 8, 3125, Calgary, AB T3H 6E7", hours: "8 AM - 8 PM" },
        { id: 5, lat: 51.050468599175865, lng: -114.0624531406064, name: "CoCo Fresh Tea & Juice Chinatown", address: "100 3 Ave SE, Calgary, AB T2G 0B6", hours: "9 AM - 9 PM" },
        { id: 6, lat: 51.0608501132362, lng: -113.98443222480552, name: "CoCo Fresh Tea & Juice Pacific Place", address: "999 36 St NE #311, Calgary, AB T2A 6K5", hours: "10 AM - 6 PM" },
        { id: 7, lat: 50.96980518223345, lng: -114.06994799758279, name: "CoCo Fresh Tea & Juice Macleod Plaza", address: "9250 Macleod Trail #19, Calgary, AB T2J 0P9", hours: "9 AM - 7 PM" },
        { id: 8, lat: 50.907236305686475, lng: -114.06601675893562, name: "CoCo Fresh Tea & Juice Shawnessy", address: "16061 Macleod Trail SE #226-2, Calgary, AB T2Y 3S5", hours: "8 AM - 9 PM" }
    ]);

    const mapStyle = [
        {
            featureType: "poi",
            stylers: [{ visibility: "off" }],
        },
    ];

    const mapContainerStyle = {
        height: "500px",
        width: "80%",
    };

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371;
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) *
            Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return parseFloat(distance.toFixed(2));
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
                    console.error("Error fetching location:", error);
                }
            );
        }
    }, []);

    useEffect(() => {
        const sorted = locations.map((location) => ({
            ...location,
            distance: calculateDistance(userLocation.lat, userLocation.lng, location.lat, location.lng),
        })).sort((a, b) => a.distance - b.distance);
        setSortedLocations(sorted);
    }, [userLocation, locations]);

    const handleSidebarClick = (location) => {
        setSelectedLocation(location);
        if (mapRef.current) {
            mapRef.current.panTo({ lat: location.lat, lng: location.lng });
        }
    };

    const handleMarkerClick = (location) => {
        setSelectedLocation(location);
        if (mapRef.current) {
            mapRef.current.panTo({ lat: location.lat, lng: location.lng });
        }
        const element = document.getElementById(location.id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    };

    return (
        <div className="flex border-orange-500 rounded-md border-2">
            <div className="w-1/3 h-[500px] overflow-y-auto">
                <ul>
                    {sortedLocations.map((location) => (
                        <li
                            key={location.id}
                            id={location.id}
                            onClick={() => handleSidebarClick(location)}
                            className={`text-zinc-800 cursor-pointer p-4 rounded border-t-2 ${
                                selectedLocation?.id === location.id ? "bg-gray-200" : "bg-white"
                            } hover:bg-gray-100`}
                        >
                            <strong>{location.name}</strong>
                            <br />
                            {location.address}
                            <br />
                            {location.hours}
                            <br />
                            Distance: {location.distance} km
                        </li>
                    ))}
                </ul>
            </div>

            <LoadScript
                googleMapsApiKey="AIzaSyCDCozLjgMz3Vs2Yzrlj8oupzRarBXZbbE"
                onLoad={() => setGoogleLoaded(true)}
            >
                <GoogleMap
                    mapContainerClassName="w-4/5 h-[500px]"
                    center={userLocation}
                    zoom={12}
                    options={{ styles: mapStyle }}
                    onLoad={(map) => (mapRef.current = map)}
                >
                    {googleLoaded &&
                        sortedLocations.map((location) => (
                            <MarkerF
                                key={location.id}
                                position={{ lat: location.lat, lng: location.lng }}
                                onClick={() => handleMarkerClick(location)}
                                icon={
                                    googleLoaded
                                        ? {
                                              url: "http://localhost:3000/icons/mapstoreicon.png",
                                              scaledSize: new window.google.maps.Size(40, 40),
                                              anchor: new window.google.maps.Point(20, 40),
                                          }
                                        : undefined
                                }
                            />
                        ))}
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default Map;
