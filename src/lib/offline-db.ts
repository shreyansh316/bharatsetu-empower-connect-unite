import { createRxDatabase, addRxPlugin } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
// import { RxDBUpdatePlugin } from 'rxdb/plugins/update'; // Optional, add if needed
// import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder';

// addRxPlugin(RxDBUpdatePlugin);
// addRxPlugin(RxDBQueryBuilderPlugin);

const draftSchema = {
  title: 'draft schema',
  version: 0,
  description: 'saves user drafts locally',
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 100
    },
    moduleName: {
      type: 'string'
    },
    formData: {
      type: 'object'
    },
    updatedAt: {
      type: 'string'
    }
  },
  required: ['id', 'moduleName', 'formData', 'updatedAt']
};

import { escrowSchema, logisticsSchema } from './schema';

let dbPromise: Promise<any> | null = null;

export const getDatabase = async () => {
  if (!dbPromise) {
    dbPromise = createRxDatabase({
      name: 'bharatsetudb',
      storage: getRxStorageDexie(),
    }).then(async (db) => {
      await db.addCollections({
        drafts: {
          schema: draftSchema
        },
        escrow_tx: {
          schema: escrowSchema
        },
        logistics: {
          schema: logisticsSchema
        }
      });

      // Seed mock data for ShramikKalyan Escrow if empty
      const existingTx = await db.escrow_tx.find().exec();
      if (existingTx.length === 0) {
        await db.escrow_tx.bulkInsert([
          {
            id: 'mock-1',
            title: 'Weekly Wage Released',
            subtitle: 'Credited to Bank Account ending 4451',
            amount: '+₹3,500',
            status: 'completed',
            timestamp: Date.now() - 100000
          },
          {
            id: 'mock-2',
            title: 'Contractor Deposit',
            subtitle: 'Funds locked in escrow for week 2',
            amount: 'Pending',
            status: 'pending',
            timestamp: Date.now()
          }
        ]);
      }

      // Seed mock data for ResQNet Logistics if empty
      const existingLogistics = await db.logistics.find().exec();
      if (existingLogistics.length === 0) {
        await db.logistics.bulkInsert([
          {
            id: 'log-1',
            resourceType: 'O-Negative Blood',
            quantity: '50 Units',
            destination: 'Camp Alpha',
            status: 'Delivered'
          },
          {
            id: 'log-2',
            resourceType: 'MRE Food Packets',
            quantity: '2,000 Packs',
            destination: 'Sector 4 Dropzone',
            status: 'In Transit'
          },
          {
            id: 'log-3',
            resourceType: 'Water Purifiers',
            quantity: '15 Units',
            destination: 'Camp Beta',
            status: 'Dispatched'
          }
        ]);
      }

      return db;
    });
  }
  return dbPromise;
};

export const saveDraft = async (id: string, moduleName: string, formData: any) => {
  const db = await getDatabase();
  await db.drafts.upsert({
    id,
    moduleName,
    formData,
    updatedAt: new Date().toISOString()
  });
};

export const getDraft = async (id: string) => {
  const db = await getDatabase();
  const doc = await db.drafts.findOne({ selector: { id } }).exec();
  return doc ? doc.toJSON() : null;
};
