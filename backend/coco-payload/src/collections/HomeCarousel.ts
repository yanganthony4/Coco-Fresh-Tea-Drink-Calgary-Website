import { CollectionConfig, PayloadRequest } from 'payload';
import fs from 'fs';
import path from 'path';
import type { Payload } from 'payload';

// Helper function to update the local JSON cache
const updateCache = async (payload: Payload): Promise<void> => {
    // Wait a short time (e.g., 100ms) to allow the database to fully commit the change.
    await new Promise((resolve) => setTimeout(resolve, 100));
  
    const { docs } = await payload.find({
      collection: 'home-carousel',
      limit: 0,
      overrideAccess: true,
    });
  
    const cacheDir = path.join(process.cwd(), 'public', 'cache');
  
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true });
    }
  
    fs.writeFileSync(
      path.join(cacheDir, 'home-carousel-images.json'),
      JSON.stringify(docs, null, 2)
    );
  
    console.log('Cache updated:', path.join(cacheDir, 'home-carousel-images.json'));
  };  

const afterChangeHook = async ({
  req,
}: {
  req: PayloadRequest;
}): Promise<void> => {
    setImmediate(() => updateCache(req.payload));
};

const afterDeleteHook = async ({
  req,
}: {
  req: PayloadRequest;
}): Promise<void> => {
    setImmediate(() => updateCache(req.payload));
};

export const HomeCarousel: CollectionConfig = {
  slug: 'home-carousel',
  labels: {
    singular: 'Home Carousel',
    plural: 'Home Carousel',
  },
  // Configure the collection as an upload collection.
  // Only the 'staticDir' property is used here.
  upload: {
    staticDir: path.resolve(__dirname, '../uploads'),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'alt',
      type: 'text',
    },
  ],
  hooks: {
    afterChange: [afterChangeHook],
    afterDelete: [afterDeleteHook],
  },
};

