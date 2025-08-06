import { getPhoneFromSession } from "./sessionStorage.js";

const API_BASE_URL = 'https://priority-api.jemmia.vn';
const AUTH_TOKEN = 'ce7f0e28c756d3c318b5b38fe0799eba'; 

/**
 * Sends a request to the API to send an OTP to the user's phone.
 * @param {string} phoneNumber The user's phone number in E.164 format (e.g., "+84123456789").
 * @returns {Promise<object>} The JSON response from the server.
 */
export async function sendOTPZalo(phoneNumber) {
  const url = `${API_BASE_URL}/zalo-otp/send-otp`;
  console.log(`Sending OTP to: ${phoneNumber}`);

  try {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AUTH_TOKEN}`
      },
      body: JSON.stringify({
        phone: phoneNumber
      })
    });

  } catch (error) {
    console.error('Error sending OTP:', error);
    throw error;
  }
}

/**
 * Sends the OTP code to the API for verification.
 * @param {string} phoneNumber The user's phone number.
 * @param {string} otpCode The OTP code entered by the user.
 * @returns {Promise<object>} The JSON response from the server, likely containing authentication tokens.
 */
export async function verifyOTPZalo(otpCode) {
  const url = `${API_BASE_URL}/auth/zaloauth`;

  const phoneNumber = getPhoneFromSession();
  if (!phoneNumber) return;
  
  console.log(`Verifying OTP for ${phoneNumber} with code: ${otpCode}`);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AUTH_TOKEN}`
      },
      body: JSON.stringify({
        phone: phoneNumber,
        otp: otpCode
      })
    });

    if (response.status !== 201) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`API request failed: ${response.status} ${response.statusText}. Details: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    console.log('Successfully verified OTP:', data);
    return data;

  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
}