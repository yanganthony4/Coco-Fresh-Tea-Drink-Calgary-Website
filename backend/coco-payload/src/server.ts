// src/server.ts
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import payload from 'payload';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ✅ Serve uploaded media files
app.use('/media', express.static(path.resolve(__dirname, '../media')));

const start = async () => {
  await payload.init({
    // @ts-expect-error: 'express' is valid in runtime even if types are outdated
    express: app,
    onInit: () => {
      console.log('✅ Payload Admin is live at http://localhost:3000/admin');
    },
  });

  app.listen(3000, () => {
    console.log('🚀 Server is running at http://localhost:3000');
  });
};

start();
