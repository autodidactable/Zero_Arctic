import { drizzle } from 'drizzle-orm/postgres-js';
import postgres, { type Sql } from 'postgres';
import * as schema from './schema';

const createDrizzle = (conn: Sql) => drizzle(conn, { schema });

export const createDb = (url: string) => {
const conn = postgres(url);
  const db = createDrizzle(conn);
  return { db, conn };

  console.log('🐛 createDb called with:', url);
  const conn = postgres(url, {
    ssl: 'require',
    host: 'ep-solitary-butterfly-a5k6o5wv-pooler.us-east-2.aws.neon.tech',   // 👈 override .local redirect
    hostname: 'ep-solitary-butterfly-a5k6o5wv-pooler.us-east-2.aws.neon.tech', // 👈 resolve actual Neon host
  });

  const db = drizzle(conn, { schema, logger: true });
  
  return db;
};

export type DB = ReturnType<typeof createDrizzle>;
