import { serve } from "bun";
import index from "./index.html";
import type Restaurant from "./types/restaurant";
import { insertRestaurant, loadRestaurants } from "./lib/database";

const rest = loadRestaurants()
console.log(rest)

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,
    "/api/restaurants": {
      async POST(req) {
        const restaurant = await req.json() as Restaurant
        insertRestaurant(restaurant)
        
        return Response.json({success: true});
      },

      async GET() {
        const restaurants = loadRestaurants()

        return Response.json(restaurants)
      }
    },
  },

  development: process.env.NODE_ENV !== "production",
});

console.log(`🚀 Server running at ${server.url}`);
