/**
 * Phase 1: Advanced Core Architecture (CRDT / Timestamp Sync)
 * 
 * Simple implementation of a Last-Write-Wins (LWW) Register
 * for resolving offline synchronization conflicts when multiple
 * devices modify the user's bookmarked schemes or profile.
 */

export interface LWWRecord<T> {
  value: T;
  timestamp: number;
}

export class LWWRegister<T> {
  private state: LWWRecord<T>;

  constructor(initialValue: T, timestamp: number = Date.now()) {
    this.state = {
      value: initialValue,
      timestamp,
    };
  }

  // Local update to the register
  update(value: T, timestamp: number = Date.now()): void {
    if (timestamp > this.state.timestamp) {
      this.state = { value, timestamp };
    }
  }

  // Merge another device's state (CRDT resolve)
  merge(remoteState: LWWRecord<T>): void {
    if (remoteState.timestamp > this.state.timestamp) {
      this.state = remoteState;
    }
  }

  get value(): T {
    return this.state.value;
  }
}
