// A key to use for storing and retrieving the data.
const PHONE_STORAGE_KEY = 'user_phone_number';

/**
 * Saves the provided phone number to session storage.
 * @param {string} phoneNumber The phone number to save.
 */
export function savePhoneToSession(phoneNumber) {
  if (!phoneNumber) {
    console.error('Cannot save an empty phone number.');
    return;
  }
  
  // Use setItem to save the data with your key
  sessionStorage.setItem(PHONE_STORAGE_KEY, phoneNumber);
  
  console.log(`Successfully saved "${phoneNumber}" to session storage.`);
}

/**
 * Retrieves the phone number from session storage.
 * @returns {string|null} The stored phone number, or null if it's not found.
 */
export function getPhoneFromSession() {
  // Use getItem to retrieve the data with your key
  const storedPhone = sessionStorage.getItem(PHONE_STORAGE_KEY);
  
  if (storedPhone) {
    console.log(`Retrieved phone number: ${storedPhone}`);
  } else {
    console.log('No phone number found in session storage.');
  }
  
  return storedPhone;
}

/**
 * Removes the phone number from session storage.
 */
export function clearPhoneFromSession() {
  // Use removeItem to delete the data associated with your key
  sessionStorage.removeItem(PHONE_STORAGE_KEY);
  
  console.log('Phone number has been cleared from session storage.');
}