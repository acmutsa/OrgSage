import {drizzle} from "drizzle-orm/vercel-postgres"
import { sql } from "@vercel/postgres"
import * as schema from "./schema"
import { config} from "dotenv"
export * from "drizzle-orm"

export const db = drizzle(sql,{ schema});