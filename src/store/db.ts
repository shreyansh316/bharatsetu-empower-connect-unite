import Dexie, { Table } from 'dexie';
import { Scheme } from '../types/scheme';

export class BharatSetuDB extends Dexie {
  // Define tables
  schemes!: Table<Scheme, string>; // Primary key is 'id' of type string
  
  // We can add tables for saved schemes, draft applications, etc later
  savedSchemes!: Table<{ id: string; savedAt: number }, string>;
  
  constructor() {
    super('BharatSetuDB');
    
    // Define schema version 1
    this.version(1).stores({
      // Primary key is &id (unique). We index pillar and tags for fast offline querying.
      schemes: '&id, pillar, *tags, isActive',
      savedSchemes: '&id, savedAt'
    });
  }
}

export const db = new BharatSetuDB();

// Helper to bulk put 200 schemes securely
export const syncSchemesToDB = async (schemesData: Scheme[]) => {
  try {
    // Clear and overwrite (for now, simpler than diffing)
    await db.transaction('rw', db.schemes, async () => {
      await db.schemes.clear();
      await db.schemes.bulkAdd(schemesData);
    });
    console.log(`Successfully synced ${schemesData.length} schemes to IndexedDB`);
  } catch (error) {
    console.error('Failed to sync schemes to DB:', error);
  }
};
