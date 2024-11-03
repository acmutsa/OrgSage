import { defineConfig } from "drizzle-kit";
import { config} from "dotenv"

config({
  path:"../../.env"
});

export default defineConfig({
  out:"./drizzle",
  schema:"./schema.ts",
  dialect:"postgresql",
  dbCredentials:{
    url: process.env.POSTGRES_URL!
  }
});