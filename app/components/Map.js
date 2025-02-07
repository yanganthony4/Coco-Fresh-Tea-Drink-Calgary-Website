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

    // Either delivery or pickup will be selected
    const [viewMode, setViewMode] = useState("pickup");

    // Reference to the map object for programmatic interactions like panning.
    const mapRef = useRef();

    // Reference for the search input field.
    const searchInputRef = useRef();

    // Hardcoded list of store locations, including schedules.
    const locations = [
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
            }
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
            }
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
            name: "Christie Crossing", 
            address: "40 Christie Park View SW Unit 8, 3125", 
            postalcode: "T3H 6E7", 
            phone: "XXX-XXX-XXXX",
            schedule: {
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
            }
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
            }
        },
        { 
            id: 7, 
            lat: 50.96980518223345, 
            lng: -114.06994799758279, 
            name: "Macleod Plaza", 
            address: "9250 Macleod Trail #19",
            postalcode: "T2J 0P9", 
            phone: "XXX-XXX-XXXX", 
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
            name: "Shawnessy", 
            address: "16061 Macleod Trail SE #226-2", 
            postalcode: "T2Y 3S5", 
            phone: "XXX-XXX-XXXX",
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
    ];

    const mapStyle = [{ featureType: "poi", stylers: [{ visibility: "off" }] }];

    // Function to calculate the distance between two coordinates using the Haversine formula.
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371;
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return parseFloat((R * c).toFixed(2));
    };

    const getDayOfWeek = () => {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return days[new Date().getDay()];
    };

    const getOpenStatus = (hours, schedule) => {
        if (!hours) return { isOpen: false, closingTime: null, reopeningTime: null };
    
        const [start, end] = hours.split(" - "); // Extract start and end times
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes(); // Current time in minutes since midnight
    
        const toMinutes = (time) => {
            const [hour, modifier] = time.split(" ");
            const [h, m] = hour.split(":").map(Number);
            const minutes = (h % 12) * 60 + (m || 0);
            return modifier === "PM" ? minutes + 12 * 60 : minutes;
        };
    
        const startMinutes = toMinutes(start);
        const endMinutes = toMinutes(end);
    
        const isOpen = currentTime >= startMinutes && currentTime <= endMinutes;
    
        let reopeningTime = null;
        if (!isOpen) {
            // Find reopening time
            const days = Object.keys(schedule);
            const todayIndex = days.indexOf(getDayOfWeek());
            let nextDayIndex = (todayIndex + 1) % days.length; // Next day's index
            while (!schedule[days[nextDayIndex]]) {
                nextDayIndex = (nextDayIndex + 1) % days.length;
            }
            reopeningTime = schedule[days[nextDayIndex]].split(" - ")[0]; // Get the next day's opening time
        }
    
        return {
            isOpen,
            closingTime: isOpen ? end : null,
            reopeningTime,
        };
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
                },
                (error) => console.error("Error fetching location:", error)
            );
        }
    }, []);

    // Sort locations by proximity to the user's current location whenever it changes.
    useEffect(() => {
        const sorted = locations
            .map((location) => ({
                ...location,
                distance: calculateDistance(userLocation.lat, userLocation.lng, location.lat, location.lng),
            }))
            .filter((location) => location.distance <= 100)
            .sort((a, b) => a.distance - b.distance);
        setSortedLocations(sorted);
    }, [userLocation, locations]);

    const handleSearch = () => {
        if (searchInputRef.current) {
            // Define bounds around Calgary for biasing the results
            const calgaryBounds = new window.google.maps.LatLngBounds(
                { lat: 50.8429, lng: -114.4086 }, // Southwest corner of Calgary
                { lat: 51.2127, lng: -113.9190 }  // Northeast corner of Calgary
            );
    
            // Initialize Autocomplete with location bias
            const autocomplete = new window.google.maps.places.Autocomplete(searchInputRef.current, {
                bounds: calgaryBounds, // Restrict predictions to Calgary area
                strictBounds: false,   // Allow predictions slightly outside Calgary
                componentRestrictions: { country: "ca" }, // Restrict to Canada
                fields: ["geometry", "name"], // Retrieve only necessary fields
            });
    
            // Listener for when a place is selected
            autocomplete.addListener("place_changed", () => {
                const place = autocomplete.getPlace();
    
                if (place && place.geometry && place.geometry.location) {
                    const lat = place.geometry.location.lat();
                    const lng = place.geometry.location.lng();
    
                    // Update the user location to the selected place
                    setUserLocation({ lat, lng });
    
                    // Calculate distances to all locations
                    const updatedLocations = locations
                        .map((location) => ({
                            ...location,
                            distance: calculateDistance(lat, lng, location.lat, location.lng),
                        }))
                        .filter((location) => location.distance <= 100) // Filter locations within 100 km
                        .sort((a, b) => a.distance - b.distance); // Sort by proximity
    
                    // Update the sorted locations to display
                    setSortedLocations(updatedLocations);
    
                    // Pan the map to the selected location
                    if (mapRef.current) {
                        mapRef.current.panTo({ lat, lng });
                        mapRef.current.setZoom(12);
                    }
                }
            });
        }
    };    

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
    };

    

    // Render the component.
    return (
        <div className="flex flex-row h-screen">
            {/* Left Panel: Pickup/Delivery Views */}
            <div className="flex flex-col w-2/5 h-full">
                {/* Pickup/Delivery Buttons and Search Bar */}
                <div className="flex flex-col">
                    {/* Buttons to switch between Pickup and Delivery */}
                    <div className="flex justify-center pt-2 space-x-4">
                        <button
                            className={`px-10 py-2 rounded-3xl border-orange-500 border ${
                                viewMode === "pickup" ? "bg-orange-500" : "bg-white text-orange-500"
                            }`}
                            onClick={() => setViewMode("pickup")}
                        >
                            Pickup
                        </button>
                        <button
                            className={`px-10 py-2 rounded-3xl border-orange-500 border ${
                                viewMode === "delivery" ? "bg-orange-500" : "bg-white text-orange-500"
                            }`}
                            onClick={() => setViewMode("delivery")}
                        >
                            Delivery
                        </button>
                    </div>
    
                    {/* Search Bar */}
                    {viewMode === "pickup" && (
                        <div className="flex p-4">
                            <input
                                ref={searchInputRef}
                                type="text"
                                placeholder="Search for a location"
                                className="p-2 border rounded text-zinc-800 w-full"
                                onFocus={handleSearch}
                            />
                        </div>
                    )}
                </div>
    
                {/* Pickup View */}
                {viewMode === "pickup" && (
                    <div className="flex-grow overflow-y-auto">
                        <ul>
                            {sortedLocations.length > 0 ? (
                                sortedLocations.map((location) => {
                                    const today = getDayOfWeek();
                                    const todayHours = location.schedule[today];
                                    const { isOpen, closingTime, reopeningTime } = getOpenStatus(
                                        todayHours,
                                        location.schedule
                                    );
    
                                    return (
                                        <li
                                            key={location.id}
                                            onClick={() => handleSidebarClick(location)}
                                            className={`text-zinc-800 text-sm cursor-pointer p-4 pl-10 rounded border-t-2 ${
                                                selectedLocation?.id === location.id
                                                    ? "bg-gray-200"
                                                    : "bg-white"
                                            } hover:bg-gray-100`}
                                        >
                                            <strong>{location.name}</strong>
                                            <br />
                                            {location.address}
                                            <br />
                                            {location.distance} km away &middot;
                                            <span
                                                className={isOpen ? "text-green-600" : "text-red-600"}
                                            >
                                                {isOpen
                                                    ? ` Open until ${closingTime}`
                                                    : ` Closed. Reopens ${
                                                          reopeningTime ? reopeningTime : "soon"
                                                      }`}
                                            </span>
                                            <br />
                                            {selectedLocation?.id === location.id && (
                                                <div className="mt-2">
                                                    <strong>Phone: </strong>
                                                    {location.phone}
                                                    <br />
                                                    <strong>Hours:</strong>
                                                    <ul className="pl-4">
                                                        {Object.entries(location.schedule).map(
                                                            ([day, hours]) => (
                                                                <li
                                                                    key={day}
                                                                    className={
                                                                        day === today
                                                                            ? "font-bold"
                                                                            : ""
                                                                    }
                                                                >
                                                                    {day}: {hours}
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            )}
                                        </li>
                                    );
                                })
                            ) : (
                                <div className="flex justify-center items-center h-full text-gray-500">
                                    Unfortunately there aren't any CoCo's within 100km.
                                </div>
                            )}
                        </ul>
                    </div>
                )}
    
                {/* Delivery View */}
                {viewMode === "delivery" && (
                    <div className="flex flex-col items-center pt-20 flex-grow">
                        < src="/images/CoCoLogoMascotOnlyGreyTransparent.png" alt="Logo" className="size-24 mb-5 opacity-75"/>
                        <p className="text-gray-700 text-lg mb-6 text-center">
                            Can't make the trip? Order delivery through our partners!
                        </p>
                    </div>
                )}
            </div>
    
            {/* Right Panel: Map */}
            <div className="flex-grow">
                <LoadScript
                    googleMapsApiKey="AIzaSyCDCozLjgMz3Vs2Yzrlj8oupzRarBXZbbE"
                    libraries={["places"]}
                    onLoad={() => setGoogleLoaded(true)}
                >
                    <GoogleMap
                        mapContainerClassName="w-full h-full"
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
                                    onClick={() => handleSidebarClick(location)}
                                    icon={{
                                        url: "http://localhost:3000/icons/mapstoreicon.png",
                                        scaledSize: new window.google.maps.Size(40, 40),
                                        anchor: new window.google.maps.Point(20, 40),
                                    }}
                                />
                            ))}
                        {googleLoaded && <MarkerF position={userLocation} />}
                    </GoogleMap>
                </LoadScript>
            </div>
        </div>
    );    

};
export default Map;
