import { startRegistration, startAuthentication } from '@simplewebauthn/browser';

/**
 * WebAuthn utilities for biometric authentication.
 * Relies on a backend to generate options and verify responses.
 */

// Example: Register a new biometric credential
export const registerBiometric = async (fetchOptionsFromServer: () => Promise<any>, sendResponseToServer: (response: any) => Promise<boolean>) => {
  try {
    // 1. Get registration options from your backend
    const options = await fetchOptionsFromServer();
    
    // 2. Start WebAuthn registration (prompts user for fingerprint/FaceID)
    const attResp = await startRegistration(options);
    
    // 3. Send the response back to your backend for verification
    const success = await sendResponseToServer(attResp);
    return success;
  } catch (error: any) {
    if (error.name === 'InvalidStateError') {
      console.warn('Authenticator was probably already registered by user');
    } else {
      console.error('WebAuthn Registration Error:', error);
    }
    return false;
  }
};

// Example: Authenticate using an existing credential
export const authenticateBiometric = async (fetchOptionsFromServer: () => Promise<any>, sendResponseToServer: (response: any) => Promise<boolean>) => {
  try {
    // 1. Get authentication options from your backend
    const options = await fetchOptionsFromServer();
    
    // 2. Start WebAuthn authentication (prompts user for fingerprint/FaceID)
    const asseResp = await startAuthentication(options);
    
    // 3. Send the response back to your backend for verification
    const success = await sendResponseToServer(asseResp);
    return success;
  } catch (error) {
    console.error('WebAuthn Authentication Error:', error);
    return false;
  }
};
