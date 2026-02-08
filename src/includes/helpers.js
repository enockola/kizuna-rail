/**
 * Generates a unique Japan Rail like confirmation code for bookings.
 * @returns {string} A unique confirmation code.
 */
const generateConfirmationCode = () => {
    return 'JR' + Math.random().toString(36).substring(2, 10).toUpperCase();
};

/**
 * Converts kilometers to miles.
 * @param {number} km - The distance in kilometers.
 * @returns {number} The equivalent distance in miles.
 */
const kmToMiles = (km) => {
    const conversionFactor = 0.621371;
    return km * conversionFactor;
};

/**
 * Converts Japanese Yen to US Dollars.
 * @param {number} yen - The amount in Japanese Yen.
 * @returns {number} The equivalent amount in US Dollars.
 */
const yenToUsd = (yen) => {
    const exchangeRate = 0.0066; // Example rate: 1 Yen = 0.0066 USD
    return yen * exchangeRate;
};

export function monthAbbrev(monthNumber) {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const n = Number(monthNumber);

  if (!Number.isInteger(n) || n < 1 || n > 12) return '';
  return months[n - 1];
}

export function monthsToAbbrev(monthsArray) {
  return (monthsArray || [])
    .map(monthAbbrev)
    .filter(Boolean);
}


export { generateConfirmationCode, kmToMiles, yenToUsd };