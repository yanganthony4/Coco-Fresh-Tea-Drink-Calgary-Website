import mongoose from 'mongoose';
import { connectToDatabase } from '../lib/mongodb.js';
import Location from '../models/Locations.js';

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
]

async function seedDatabase() {
    try {
      // Connect to MongoDB
      await connectToDatabase();
  
      // Clear existing location data (optional)
      await Location.deleteMany({});
  
      // Insert new location data
      const result = await Location.insertMany(locations);
      console.log("Locations Inserted:", result);
  
      // Close connection after insert
      mongoose.connection.close();
    } catch (error) {
      console.error("Error inserting locations:", error);
      mongoose.connection.close();
    }
}

seedDatabase();