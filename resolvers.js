import { connectToDatabase } from './lib/mongodb.js';

const resolvers = {
  Query: {
    products: async () => {
      const db = await connectToDatabase();
      return await db.collection('products').find().toArray();
    },
    logo: async () => {
      const db = await connectToDatabase();
      const logo = await db.collection('logos').findOne({});
      return logo || { url: '', altText: '' };
    },
    locationText: async () => {
      const db = await connectToDatabase();
      const location = await db.collection('locations').findOne({});
      return location ? location.text : '';
    },
    navLinks: async () => {
      const db = await connectToDatabase();
      return await db.collection('navLinks').find().toArray();
    },
    dropdownLinks: async () => {
      const db = await connectToDatabase();
      return await db.collection('dropdownLinks').find().toArray();
    },
    bannerImage: async () => {
      const db = await connectToDatabase();
      const banner = await db.collection('bannerImages').findOne({});
      return banner || { url: '', altText: '' };
    },
    boxes: async () => {
      const db = await connectToDatabase();
      return await db.collection('boxes').find().toArray();
    },
    categories: async () => {
      const db = await connectToDatabase();
      return await db.collection('categories').find().toArray();
    },
  },
  Mutation: {
    addProduct: async (_, { name, description, calories, price, image }) => {
      const db = await connectToDatabase();
      const product = { name, description, calories, price, image };
      const result = await db.collection('products').insertOne(product);
      return { ...product, id: result.insertedId };
    },
  },
};

export default resolvers;