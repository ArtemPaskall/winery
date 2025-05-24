import mongoose, { Mongoose } from "mongoose"

/* eslint-disable no-var */
declare global {
  var mongoose:
    | {
        conn: Mongoose | null
        promise: Promise<Mongoose> | null
      }
    | undefined
}
/* eslint-enable no-var */

export {}

const _MONGODB_URI = process.env.MONGODB_URI

if (!_MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  )
}

const MONGODB_URI: string = _MONGODB_URI

// ✅ Явно задаємо тип, і одразу гарантуємо ініціалізацію
const cached: {
  conn: Mongoose | null
  promise: Promise<Mongoose> | null
} = global.mongoose ?? { conn: null, promise: null }

global.mongoose = cached

async function dbConnect(): Promise<Mongoose> {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    })
  }

  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect
