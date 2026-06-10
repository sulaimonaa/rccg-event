import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable.");
}

type MongooseCache = {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
};

declare global {
  var mongooseCache: MongooseCache | undefined;
}

// Reuse the cached connection across hot reloads in development.
const globalWithMongoose = globalThis as typeof globalThis & {
  mongooseCache?: MongooseCache;
};

const cached: MongooseCache = globalWithMongoose.mongooseCache ?? {
  conn: null,
  promise: null,
};

if (!globalWithMongoose.mongooseCache) {
  globalWithMongoose.mongooseCache = cached;
}

/**
 * Connect to MongoDB with a cached connection/promise to avoid
 * creating multiple connections during Next.js dev reloads.
 */
export async function connectToDatabase(): Promise<Mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

    if (!cached.promise) {
    // MONGODB_URI is validated above; use a non-null assertion to satisfy TS
    cached.promise = mongoose
      .connect(MONGODB_URI!, {
        bufferCommands: false,
      })
      .then((mongooseInstance) => mongooseInstance);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

