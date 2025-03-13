"use client";

import { useEffect, useState } from "react";

export default function TestPage() {
  const [message, setMessage] = useState("Loading...");

  // Fetch the test message from Payload
  useEffect(() => {
    fetch("http://localhost:3000/api/test")
      .then((response) => response.json())
      .then((data) => {
        if (data.docs.length > 0) {
          setMessage(data.docs[0].message); // Get the first document's message
        }
      })
      .catch((error) => {
        console.error("Error fetching message:", error);
        setMessage("Failed to load message.");
      });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Test Message from Payload</h1>
        <p className="text-gray-700">{message}</p>
      </div>
    </div>
  );
}