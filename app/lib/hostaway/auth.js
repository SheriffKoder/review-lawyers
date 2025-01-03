/**
 * Configuration object for Hostaway API authentication
 * @constant {Object} HOSTAWAY_CONFIG
 */
const HOSTAWAY_CONFIG = {
  tokenUrl: "https://api.hostaway.com/v1/accessTokens",
  clientId: "65753",
  clientSecret: "1cc8a83761e44739ee162d7d9f47c30e55f3a6338933c67f31b7fa4de80fd408",
};

/**
 * Retrieves a new access token from the Hostaway API
 * @async
 * @function refreshToken
 * @returns {Promise<string>} The access token for API authentication
 * @throws {Error} If the token request fails
 */
export async function refreshToken({id, key}) {
  // Prepare the OAuth2 credentials and parameters
  const data = new URLSearchParams({
    grant_type: "client_credentials", // OAuth2 grant type for client credentials flow
    client_id: id,
    client_secret: key,
    scope: "general", // Required scope for API access
  });

  // Make the token request to Hostaway
  const response = await fetch(HOSTAWAY_CONFIG.tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded", // Required for OAuth2 token requests
      "Cache-Control": "no-cache", // Prevent caching of credentials
    },
    body: data.toString(),
  });

  // Check if the request was successful
  if (!response.ok) {
    throw new Error(`Failed to fetch access token. Status: ${response.status}`);
  }

  const result = await response.json();
  
  // Extract and return just the access token
  return result.access_token;
} 