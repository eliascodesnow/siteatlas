import type { BusinessSeed } from "@/lib/types";
import { foodBusinesses } from "./food";
import { barberBusinesses, beautyBusinesses, hospitalityBusinesses } from "./beauty-hospitality";
import { automotiveBusinesses, propertyBusinesses, retailBusinesses } from "./property-retail-auto";
import {
  constructionBusinesses,
  creativeBusinesses,
  educationBusinesses,
  professionalBusinesses,
  technologyBusinesses,
  travelBusinesses,
  wellnessBusinesses,
} from "./services";

/**
 * Seed catalogue. The database is the source of truth at runtime;
 * this list is used to bootstrap it and can be re-synced with `syncSeed()`.
 */
export const BUSINESS_SEED: BusinessSeed[] = [
  ...foodBusinesses,
  ...beautyBusinesses,
  ...barberBusinesses,
  ...hospitalityBusinesses,
  ...propertyBusinesses,
  ...retailBusinesses,
  ...automotiveBusinesses,
  ...wellnessBusinesses,
  ...professionalBusinesses,
  ...educationBusinesses,
  ...travelBusinesses,
  ...creativeBusinesses,
  ...constructionBusinesses,
  ...technologyBusinesses,
];
