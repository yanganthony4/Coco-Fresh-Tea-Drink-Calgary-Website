import express from 'express';
// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import type { Payload } from 'payload';

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { HomeCarousel } from './collections/HomeCarousel'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Extend the Payload interface to include the express instance.
interface ExtendedPayload extends Payload {
  express: express.Application;
}

export default buildConfig({
  serverURL: 'http://localhost:3000',
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, HomeCarousel],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  onInit: async (payload: Payload) => {
    // Cast payload to ExtendedPayload to access the express property
    const { express: app } = payload as ExtendedPayload;

    // Serve uploaded files on /images
    const uploadsPath = path.resolve(__dirname, '../uploads');
    app.use('/images', express.static(uploadsPath));

    // Serve the JSON cache on /cache
    const cachePath = path.join(__dirname, 'cache');
    app.use('/cache', express.static(cachePath));
  },
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
