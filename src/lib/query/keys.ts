export const queryKeys = {
  bills: {
    all: () => ["bills"] as const,
    list: () => ["bills", "list"] as const,
    detail: (id: string) => ["bills", "detail", id] as const,
  },
  analytics: {
    all: () => ["analytics"] as const,
    summary: (period: string) => ["analytics", "summary", period] as const,
  },
} as const;