import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";

const Map = () => {
    // State to store the user's current location (default is Calgary).
    const [userLocation, setUserLocation] = useState({ lat: 51.0447, lng: -114.0719 });
    
     // State to track the currently selected store location.
    const [selectedLocation, setSelectedLocation] = useState(null);
    
    // State to store the list of locations sorted by proximity to the user.
    const [sortedLocations, setSortedLocations] = useState([]);
    
    // State to ensure Google Maps script is fully loaded before rendering markers.
    const [googleLoaded, setGoogleLoaded] = useState(false);
    
    // Reference to the map object for programmatic interactions like panning.
    const mapRef = useRef();

    // Function to get the current day of the week as a string.
    const getDayOfWeek = () => {
        const days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        return days[new Date().getDay()];
    };

     // Function to check if a location is currently open based on its hours.
    const isOpenNow = (hours) => {
        if (!hours) return false;
    
        const [start, end] = hours.split(" - "); // Split hours into start and end times.
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes(); // Minutes since midnight
    
         // Helper function to convert time strings (e.g., "11:30 AM") to minutes since midnight.
        const toMinutes = (time) => {
            const [hour, modifier] = time.split(" ");
            const [h, m] = hour.split(":").map(Number);
            const minutes = (h % 12) * 60 + (m || 0);
            return modifier === "PM" ? minutes + 12 * 60 : minutes;
        };
    
        const startMinutes = toMinutes(start);
        const endMinutes = toMinutes(end);
    
        return currentTime >= startMinutes && currentTime <= endMinutes;
    };

    // Hardcoded list of store locations, including schedules.
    const [locations] = useState([
        { 
            id: 1, 
            lat: 51.140557671521876, 
            lng: -114.06951971593705, 
            name: "CoCo Fresh Tea & Juice Harvest Hills", 
            address: "9650 Harvest Hills Blvd N #1113, Calgary, AB T3K 0B3", 
            schedule:{
                Monday: "11:30 AM - 11:00 PM",
                Tuesday: "11:30 AM - 11:00 PM",
                Wednesday: "11:30 AM - 10:00 PM",
                Thursday: "11:30 AM - 10:00 PM",
                Friday: "11:30 AM - 10:00 PM",
                Saturday: "11:30 AM - 10:00 PM",
                Sunday: "11:30 AM - 10:00 PM",
            }
        },
        { 
            id: 2, 
            lat: 51.12734580261667, 
            lng: -114.19557993454954, 
            name: "CoCo Fresh Tea & Juice Crowfoot", 
            address: "150 Crowfoot Crescent NW #303, Calgary, AB T3G 3T2", 
            schedule:{
                Monday: "11:30 AM - 10:00 PM",
                Tuesday: "11:30 AM - 10:00 PM",
                Wednesday: "11:30 AM - 10:00 PM",
                Thursday: "11:30 AM - 10:00 PM",
                Friday: "11:30 AM - 10:00 PM",
                Saturday: "11:30 AM - 10:00 PM",
                Sunday: "11:30 AM - 10:00 PM",
            }
        },
        { 
            id: 3, 
            lat: 51.08259525945537, 
            lng: -114.09418731069533, 
            name: "CoCo Fresh Tea & Juice Northmount Plaza", 
            address: "3400 14 St NW #102, Calgary, AB T2K 1H9", 
            schedule:{
                Monday: "12:00 AM - 9:00 PM",
                Tuesday: "12:00 AM - 9:00 PM",
                Wednesday: "12:00 AM - 9:00 PM",
                Thursday: "12:00 AM - 9:00 PM",
                Friday: "12:00 AM - 9:00 PM",
                Saturday: "12:00 AM - 9:00 PM",
                Sunday: "12:00 AM - 9:00 PM",
            }
        },
        { 
            id: 4, 
            lat: 51.03746239963937, 
            lng: -114.17783413232726, 
            name: "CoCo Fresh Tea & Juice Christie Crossing", 
            address: "40 Christie Park View SW Unit 8, 3125, Calgary, AB T3H 6E7", 
            schedule:{
                Monday: "12:00 AM - 10:00 PM",
                Tuesday: "12:00 AM - 10:00 PM",
                Wednesday: "12:00 AM - 10:00 PM",
                Thursday: "12:00 AM - 10:00 PM",
                Friday: "12:00 AM - 10:00 PM",
                Saturday: "12:00 AM - 10:00 PM",
                Sunday: "12:00 AM - 10:00 PM",
            } 
        },
        { 
            id: 5, 
            lat: 51.050468599175865, 
            lng: -114.0624531406064, 
            name: "CoCo Fresh Tea & Juice Chinatown", 
            address: "100 3 Ave SE, Calgary, AB T2G 0B6", 
            schedule:{
                Monday: "11:00 AM - 11:00 PM",
                Tuesday: "11:00 AM - 11:00 PM",
                Wednesday: "11:00 AM - 11:00 PM",
                Thursday: "11:00 AM - 11:00 PM",
                Friday: "11:00 AM - 11:00 PM",
                Saturday: "11:00 AM - 11:00 PM",
                Sunday: "11:00 AM - 11:00 PM",
            }
        },
        { 
            id: 6, 
            lat: 51.0608501132362, 
            lng: -113.98443222480552, 
            name: "CoCo Fresh Tea & Juice Pacific Place", 
            address: "999 36 St NE #311, Calgary, AB T2A 6K5", 
            schedule:{
                Monday: "11:00 AM - 10:00 PM",
                Tuesday: "11:00 AM - 10:00 PM",
                Wednesday: "11:00 AM - 10:00 PM",
                Thursday: "11:00 AM - 10:00 PM",
                Friday: "11:00 AM - 10:00 PM",
                Saturday: "11:00 AM - 10:00 PM",
                Sunday: "11:00 AM - 10:00 PM",
            }
        },
        { 
            id: 7, 
            lat: 50.96980518223345, 
            lng: -114.06994799758279, 
            name: "CoCo Fresh Tea & Juice Macleod Plaza", 
            address: "9250 Macleod Trail #19, Calgary, AB T2J 0P9", 
            schedule:{
                Monday: "12:00 AM - 11:00 PM",
                Tuesday: "12:00 AM - 11:00 PM",
                Wednesday: "12:00 AM - 11:00 PM",
                Thursday: "12:00 AM - 11:00 PM",
                Friday: "12:00 AM - 11:00 PM",
                Saturday: "12:00 AM - 11:00 PM",
                Sunday: "12:00 AM - 11:00 PM",
            }
        },
        { 
            id: 8, 
            lat: 50.907236305686475, 
            lng: -114.06601675893562, 
            name: "CoCo Fresh Tea & Juice Shawnessy", 
            address: "16061 Macleod Trail SE #226-2, Calgary, AB T2Y 3S5", 
            schedule:{
                Monday: "11:30 AM - 11:00 PM",
                Tuesday: "11:30 AM - 11:00 PM",
                Wednesday: "11:30 AM - 11:00 PM",
                Thursday: "11:30 AM - 11:00 PM",
                Friday: "11:30 AM - 11:00 PM",
                Saturday: "11:30 AM - 11:00 PM",
                Sunday: "11:30 AM - 11:00 PM",
            } 
        }
    ]);

    // Custom map style to hide points of interest (POIs)
    const mapStyle = [
        {
            featureType: "poi",
            stylers: [{ visibility: "off" }],
        },
    ];

    // Map container style for consistent dimensions.
    const mapContainerStyle = {
        height: "500px",
        width: "80%",
    };

     // Function to calculate the distance between two coordinates using the Haversine formula.
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

    // Get the user's current location using the browser's Geolocation API.
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                    console.log("User location updated:", position.coords.latitude, position.coords.longitude);
                },
                (error) => {
                    console.error("Error fetching location:", error);
                }
            );
        }
    }, []);
    
    // Sort locations by proximity to the user's current location whenever it changes.
    useEffect(() => {
        const sorted = locations.map((location) => ({
            ...location,
            distance: calculateDistance(userLocation.lat, userLocation.lng, location.lat, location.lng),
        })).sort((a, b) => a.distance - b.distance);
        setSortedLocations(sorted);
    }, [userLocation, locations]);

    // Handle click events on the sidebar to pan the map to the selected location.
    const handleSidebarClick = (location) => {
        setSelectedLocation(location);
        if (mapRef.current) {
            mapRef.current.panTo({ lat: location.lat, lng: location.lng });
        }
    };

    // Handle marker clicks to highlight the corresponding location in the sidebar.
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

    // Render the component.
    return (
        <div className="flex border-orange-500 rounded-md border-2">
            <div className="w-1/3 h-[500px] overflow-y-auto">
                <ul>
                    {sortedLocations.map((location) => {
                        const today = getDayOfWeek(); // Get the current day
                        const todayHours = location.schedule[today]; // Get today's hours
                        const openStatus = isOpenNow(todayHours) ? "Open Now" : "Closed"; // Check if open
    
                        return (
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
                                Hours Today: {todayHours}
                                <br />
                                <span className={openStatus === "Open Now" ? "text-green-600" : "text-red-600"}>
                                    {openStatus}
                                </span>
                                <br />
                                Distance: {location.distance} km
                            </li>
                        );
                    })}
                </ul>
            </div>
    
            <LoadScript
                googleMapsApiKey="AIzaSyCDCozLjgMz3Vs2Yzrlj8oupzRarBXZbbE"
                onLoad={() => setGoogleLoaded(true)}
            >
                <GoogleMap
                    mapContainerClassName="w-4/5 h-[500px]"
                    center={userLocation} // Ensure the map centers on the user location
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
    
                    {/* User's location marker */}
                    {googleLoaded && (
                        <MarkerF position={userLocation} />
                    )}
                </GoogleMap>
            </LoadScript>
        </div>
        );
    };


export default Map;
