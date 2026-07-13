/**
 * Phase 8: Secure Document Vault (WebAuthn)
 * 
 * Implement biometric authentication (WebAuthn/FaceID/TouchID) 
 * as a primary gatekeeper to access the Document Vault.
 */

export const requestBiometricAuth = async (): Promise<boolean> => {
  // Check if WebAuthn is supported
  if (!window.PublicKeyCredential) {
    console.warn('WebAuthn not supported by this browser.');
    // Fallback to password or PIN in a real app
    return false;
  }

  try {
    // Generate a random challenge (in production, this comes from the server)
    const challenge = new Uint8Array(32);
    window.crypto.getRandomValues(challenge);

    // Prompt user for local biometric authentication (TouchID, FaceID, Windows Hello)
    const credential = await navigator.credentials.get({
      publicKey: {
        challenge,
        rpId: window.location.hostname,
        userVerification: 'required', // Strictly require biometric or PIN
      }
    });

    if (credential) {
      console.log('Biometric authentication successful!');
      return true;
    }
    return false;
  } catch (error) {
    console.error('Biometric auth failed or was cancelled:', error);
    return false;
  }
};
