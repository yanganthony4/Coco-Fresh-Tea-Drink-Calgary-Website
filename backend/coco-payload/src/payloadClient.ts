// src/payloadClient.ts
import payload from 'payload';
import config from './payload.config'; // Adjust the path as needed

export async function getPayload() {
  // Use our declared global variable to ensure initialization only happens once
  if (!globalThis.__PAYLOAD_INITIALIZED) {
    await payload.init({ config });
    globalThis.__PAYLOAD_INITIALIZED = true;
  }
  return payload;
}
