import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import type {
  BusinessContact,
  BusinessHighlight,
  BusinessImagery,
  BusinessService,
  BusinessSocials,
  BusinessTheme,
  MenuGroup,
  SectionConfig,
} from "@/lib/types";

/**
 * One row per business concept. Adding business #101 is a database insert –
 * every route reads from this table at request time, so no rebuild is needed.
 */
export const businesses = pgTable(
  "businesses",
  {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 120 }).notNull().unique(),
    name: text("name").notNull(),
    category: varchar("category", { length: 60 }).notNull(),
    subcategory: varchar("subcategory", { length: 80 }).notNull(),
    country: varchar("country", { length: 60 }).notNull(),
    countrySlug: varchar("country_slug", { length: 60 }).notNull(),
    city: varchar("city", { length: 60 }).notNull(),
    citySlug: varchar("city_slug", { length: 60 }).notNull(),
    neighborhood: varchar("neighborhood", { length: 80 }),
    neighborhoodSlug: varchar("neighborhood_slug", { length: 80 }),
    address: text("address"),
    international: boolean("international").notNull().default(false),
    tagline: text("tagline").notNull(),
    description: text("description").notNull(),
    services: jsonb("services").$type<BusinessService[]>().notNull().default([]),
    highlights: jsonb("highlights").$type<BusinessHighlight[]>().notNull().default([]),
    menu: jsonb("menu").$type<MenuGroup[]>(),
    contact: jsonb("contact").$type<BusinessContact>().notNull().default({}),
    officialWebsite: text("official_website"),
    socials: jsonb("socials").$type<BusinessSocials>().notNull().default({}),
    imagery: jsonb("imagery").$type<BusinessImagery>().notNull(),
    theme: jsonb("theme").$type<BusinessTheme>().notNull(),
    websiteStyle: varchar("website_style", { length: 40 }).notNull(),
    sections: jsonb("sections").$type<SectionConfig[]>(),
    featured: boolean("featured").notNull().default(false),
    prospectingPriority: varchar("prospecting_priority", { length: 10 }).notNull().default("medium"),
    lastResearched: varchar("last_researched", { length: 40 }).notNull(),
    sources: jsonb("sources").$type<string[]>().notNull().default([]),
    conceptStatus: varchar("concept_status", { length: 20 }).notNull().default("published"),
    searchText: text("search_text").notNull(),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [
    index("businesses_search_text_gin_idx").using("gin", sql`to_tsvector('simple', ${t.searchText})`),
    index("businesses_published_category_idx").on(t.conceptStatus, t.category),
    index("businesses_published_location_idx").on(t.conceptStatus, t.countrySlug, t.citySlug, t.neighborhoodSlug),
    index("businesses_published_style_idx").on(t.conceptStatus, t.websiteStyle),
    index("businesses_published_international_idx").on(t.conceptStatus, t.international),
    index("businesses_category_idx").on(t.category),
    index("businesses_city_idx").on(t.citySlug),
    index("businesses_neighborhood_idx").on(t.neighborhoodSlug),
    index("businesses_featured_idx").on(t.featured),
  ],
);

/** Analytics-ready event log. A provider (GA4, Plausible…) can be wired later. */
export const analyticsEvents = pgTable(
  "analytics_events",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 80 }).notNull(),
    properties: jsonb("properties").$type<Record<string, string | number | boolean | null>>().notNull().default({}),
    path: text("path"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [index("analytics_events_created_at_idx").on(t.createdAt), index("analytics_events_name_idx").on(t.name)],
);

export type BusinessRow = typeof businesses.$inferSelect;
export type NewBusinessRow = typeof businesses.$inferInsert;
