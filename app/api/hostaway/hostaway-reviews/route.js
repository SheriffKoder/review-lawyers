import { refreshToken } from "@/app/lib/hostaway/auth";

/**
 * Base URL for the Hostaway listings endpoint
 * @constant {string}
 */
const REVIEWS_URL = "https://api.hostaway.com/v1/reviews";

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
    const reviewsResponse = await fetch(REVIEWS_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Include token in Authorization header
      },
    });

    // Verify the API response was successful
    if (!reviewsResponse.ok) {
      throw new Error(`Failed to fetch reviews. Status: ${reviewsResponse.status}`);
    }

    // Parse the JSON response
    const reviews = await reviewsResponse.json();

    // Step 3: Send the response
    // Return listings data to the client
    return Response.json(reviews);

  } catch (error) {
    // Log the full error for debugging
    console.error("Error:", error);
    // Return a sanitized error response to the client
    return Response.json({ error: error.message }, { status: 500 });
  }
};
