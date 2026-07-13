import React, { ReactNode } from 'react';
import { useSchemesSync } from '../hooks/useSchemesSync';

export const SchemeSyncWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initiates the Web Worker JSON parsing and IndexedDB sync on mount
  const { isLoading, error } = useSchemesSync();

  // We don't block the UI rendering while syncing.
  // The Zustand store starts empty and hydrates automatically.
  // But we can log errors if the sync completely fails.
  if (error) {
    console.error('Failed to sync schemes:', error);
  }

  return <>{children}</>;
};
