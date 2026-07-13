/**
 * Phase 8: Secure Document Vault
 * 
 * Implements strict Web Crypto API standards (AES-GCM encryption) 
 * to encrypt all documents before they touch local IndexedDB storage.
 */

const generateKey = async (): Promise<CryptoKey> => {
  return await window.crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256,
    },
    true,
    ['encrypt', 'decrypt']
  );
};

export const encryptDocument = async (fileBuffer: ArrayBuffer, key: CryptoKey): Promise<{ ciphertext: ArrayBuffer, iv: Uint8Array }> => {
  // Initialization vector must be strictly unique per encryption
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  
  const ciphertext = await window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv,
    },
    key,
    fileBuffer
  );

  return { ciphertext, iv };
};

export const decryptDocument = async (ciphertext: ArrayBuffer, key: CryptoKey, iv: Uint8Array): Promise<ArrayBuffer> => {
  const decrypted = await window.crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: iv,
    },
    key,
    ciphertext
  );

  return decrypted;
};
