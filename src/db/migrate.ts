import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import {config} from "dotenv";

const runMigrations = async () => {
  config({
    path: "../../.env",
  });

  console.log("⏳ Running migrations...");
  const start = Date.now();

  // + "?sslmode=require"
  const sql = postgres(process.env.POSTGRES_URL as string, { max: 1 });
  const db = drizzle(sql);

  await migrate(db, { migrationsFolder: "drizzle" });

  console.log(`✅ Migrations completed in ${Date.now() - start}ms`);

  process.exit(0);
};

runMigrations().catch((err) => {
  console.error("❌ Migration failed");
  console.error(err);
  process.exit(1);
});
