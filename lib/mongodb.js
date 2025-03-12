import mongoose from 'mongoose';

const MONGODB_URI = "mongodb+srv://yanganthony4:2%3D4%3D6%3D8Ynagocrazy@coco-fresh-tea-and-juic.nqh8e.mongodb.net/"

if (!MONGODB_URI) {
    throw new Error('Missing URI')
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = {conn: null, promise: null}
}

export async function connectToDatabase() {
    if(cached.conn) {
        return cached.conn;
    }

    if(!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then((mongoose) => mongoose);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}