import {
 pgTable,
 pgEnum,
 uuid,
 bigserial,
 text,
 varchar,
 boolean
} from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm";

export const rolesEnum = pgEnum("roles", ["owner", "member"]);

export const users = pgTable("users", {
  clerkID: varchar('clerk_id',{ length: 255 }).primaryKey(),
  firstName: varchar({ length: 255 }).notNull(),
  lastName: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
});

export const userRelations = relations(users,  ({ many }) => ({
  userOrgs: many(usersToOrgs),
  userChats:many(chats),
}));

export const orgs = pgTable("orgs", {
  orgID: uuid().defaultRandom().primaryKey(),
  orgName: varchar({ length: 255 }).notNull().unique(),
  profileUrl: varchar({ length: 255 }),
});

export const orgsRelations = relations(orgs,  ({ many }) => ({
  orgUsers: many(usersToOrgs),
  models: many(models),
}));

export const models = pgTable("models", {
  modelID: uuid().defaultRandom().primaryKey(),
  orgID: varchar({ length: 255 }).notNull(),
  modelString: varchar({ length: 255 }).notNull(),
});

export const modelsRelations = relations(models,  ({ one, many }) => ({
  orgs: one(orgs),
  userChats: many(chats),
}));

export const usersToOrgs = pgTable("users_to_orgs", {
  id: bigserial({ mode: "number" }).primaryKey(),
  orgID: varchar({ length: 255 })
    .notNull()
    .references(() => orgs.orgID, { onDelete: "cascade" }),
  userID: varchar({ length: 255 }).notNull(),
  roles: rolesEnum().notNull(),
  hasAccepted: boolean().notNull().default(false),
});

export const usersToOrgsRelations = relations(usersToOrgs,  ({ one }) => ({
  users: one(users,{
    fields:[usersToOrgs.userID],
    references:[users.clerkID]
  }),
  orgs: one(orgs,{
    fields:[usersToOrgs.orgID],
    references:[orgs.orgID]
  })
}));

export const chats = pgTable("chats", {
  ChannelSplitterNode: uuid().defaultRandom().primaryKey(),
  content: text(),
  userID: varchar({ length: 255 }).notNull(),
  orgID: varchar({ length: 255 }).notNull(),
});

export const chatsRelations = relations(chats,  ({ one }) => ({
  userChats:one(users,{
    fields:[chats.userID],
    references:[users.clerkID]
  }),
  modelChats:one(models,{
    fields:[chats.orgID],
    references:[models.orgID]
  })
}));
