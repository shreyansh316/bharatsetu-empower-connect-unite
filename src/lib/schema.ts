import { RxJsonSchema } from 'rxdb';

export const escrowSchema: RxJsonSchema<any> = {
  title: 'escrow schema',
  version: 0,
  description: 'describes an escrow transaction',
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 100
    },
    title: {
      type: 'string'
    },
    subtitle: {
      type: 'string'
    },
    amount: {
      type: 'string' // Store as formatted string for simplicity in mockup (e.g. "+₹3,500" or "Pending")
    },
    status: {
      type: 'string', // e.g. "completed", "pending"
    },
    timestamp: {
      type: 'number'
    }
  },
  required: ['id', 'title', 'amount', 'status', 'timestamp']
};

export const logisticsSchema: RxJsonSchema<any> = {
  title: 'logistics schema',
  version: 0,
  description: 'describes a logistics resource dispatch',
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 100
    },
    resourceType: {
      type: 'string'
    },
    quantity: {
      type: 'string'
    },
    destination: {
      type: 'string'
    },
    status: {
      type: 'string' // e.g. "Delivered", "In Transit", "Dispatched"
    }
  },
  required: ['id', 'resourceType', 'quantity', 'destination', 'status']
};
