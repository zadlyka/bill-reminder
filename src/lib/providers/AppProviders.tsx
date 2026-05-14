import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { queryClient } from "@/src/lib/query/client";
import { QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode="light">
        {children}
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}