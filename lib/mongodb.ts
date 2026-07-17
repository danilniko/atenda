import { MongoClient } from "mongodb";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export function getMongoClient(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri, { maxPoolSize: 5 });
    global._mongoClientPromise = client.connect();
  }
  return global._mongoClientPromise;
}

export const DB_NAME = process.env.MONGODB_DB || "atenda";
