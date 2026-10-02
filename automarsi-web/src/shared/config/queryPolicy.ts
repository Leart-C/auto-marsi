/** Freshness windows in milliseconds; keep overrides explicit at their call sites. */
export const queryPolicy = {
  defaultStaleTime: 30_000,
  publicStaleTime: 60_000,
  catalogStaleTime: 5 * 60_000,
  activityStaleTime: 15_000,
  inventoryStaleTime: 20_000,
  garbageCollectionTime: 5 * 60_000,
} as const
