import { setup, assign } from 'xstate';
import { Scheme } from '../types/scheme';

export interface SyncMachineContext {
  schemes: Scheme[];
  errorMessage: string | null;
  retries: number;
}

export const syncMachine = setup({
  types: {
    context: {} as SyncMachineContext,
    events: {} as
      | { type: 'START_SYNC' }
      | { type: 'SYNC_SUCCESS'; schemes: Scheme[] }
      | { type: 'SYNC_ERROR'; error: string }
      | { type: 'RETRY' },
  },
  actions: {
    assignSchemes: assign({
      schemes: ({ event }) => (event.type === 'SYNC_SUCCESS' ? event.schemes : []),
    }),
    assignError: assign({
      errorMessage: ({ event }) => (event.type === 'SYNC_ERROR' ? event.error : null),
    }),
    incrementRetry: assign({
      retries: ({ context }) => context.retries + 1,
    }),
    clearError: assign({
      errorMessage: null,
    }),
  },
}).createMachine({
  id: 'schemeSync',
  initial: 'idle',
  context: {
    schemes: [],
    errorMessage: null,
    retries: 0,
  },
  states: {
    idle: {
      on: {
        START_SYNC: 'fetching',
      },
    },
    fetching: {
      on: {
        SYNC_SUCCESS: {
          target: 'success',
          actions: 'assignSchemes',
        },
        SYNC_ERROR: {
          target: 'error',
          actions: 'assignError',
        },
      },
    },
    success: {
      type: 'final',
    },
    error: {
      on: {
        RETRY: {
          target: 'fetching',
          actions: ['incrementRetry', 'clearError'],
          guard: ({ context }) => context.retries < 3,
        },
      },
    },
  },
});
