import { refreshToken } from "@/app/lib/hostaway/auth";

/**
 * Base URL for the Hostaway listings endpoint
 * @constant {string}
 */
const LISTINGS_URL = "https://api.hostaway.com/v1/listings";

/**
 * API route handler for fetching Hostaway listings
 * @async
 * @function POST
 * @param {Request} req - The incoming request object
 * @returns {Promise<Response>} JSON response containing listings or error message
 */
export const POST = async (req) => {
  try {

    const {id, key} = await req.json();
    // console.log(id, key);

    // Step 1: Authenticate with Hostaway
    // Get a fresh access token for API requests
    const token = await refreshToken({id, key});
    // console.log(token);
    
    // Step 2: Fetch all property listings
    // Make authenticated request to Hostaway API
    const listingsResponse = await fetch(LISTINGS_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Include token in Authorization header
      },
    });

    // Verify the API response was successful
    if (!listingsResponse.ok) {
      throw new Error(`Failed to fetch listings. Status: ${listingsResponse.status}`);
    }

    // Parse the JSON response
    const listings = await listingsResponse.json();

    // Step 3: Send the response
    // Return listings data to the client
    return Response.json(listings);

  } catch (error) {
    // Log the full error for debugging
    console.error("Error:", error);
    // Return a sanitized error response to the client
    return Response.json({ error: error.message }, { status: 500 });
  }
};
