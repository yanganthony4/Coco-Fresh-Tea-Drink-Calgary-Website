// src/refresh-json.ts
import fs from 'fs';
import path from 'path';
import { getPayload } from './payloadClient';

export async function refreshHomeMediaJSON() {
  try {
    const payload = await getPayload(); // Ensures Payload is initialized only once

    // Query the "home-media-images" collection
    const homeMediaData = await payload.find({
      collection: 'home-media-images',
      limit: 100,
    });

    // Define the path for the JSON file in the public folder
    const jsonPath = path.resolve(process.cwd(), 'public/json/home-media.json');

    // Create the directory if it doesn’t exist
    fs.mkdirSync(path.dirname(jsonPath), { recursive: true });

    // Write the data to the JSON file with pretty formatting
    fs.writeFileSync(jsonPath, JSON.stringify(homeMediaData, null, 2), 'utf-8');
    console.log('✅ Home media JSON updated at', jsonPath);
  } catch (err) {
    console.error('Error refreshing home media JSON:', err);
    throw err;
  }
}
