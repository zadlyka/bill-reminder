export const ROUTES = {
  HOME: "/(tabs)/",
  ANALYTICS: "/(tabs)/analytics",
  CALENDAR: "/(tabs)/calendar",
  SETTINGS: "/(tabs)/settings",
  BILL_DETAIL: (id: string) => `/bill/${id}` as const,
  BILL_CREATE: "/bill/create" as const,
} as const;