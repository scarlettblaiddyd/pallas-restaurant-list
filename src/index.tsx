import { serve } from "bun";
import index from "./index.html";
import type Restaurant from "./types/restaurant";
import { deleteRestaurant, insertRestaurant, loadRestaurants, updateRating } from "./lib/database";

const rest = loadRestaurants()
console.log(rest)

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,
    "/api/restaurants": {
      async POST(req) {
        try {
          const restaurant = await req.json() as Restaurant
          // console.log(`In API: ${JSON.stringify(restaurant)}`)
          insertRestaurant(restaurant)
          
        } catch(err) {
          console.error(err)
          // TODO: Better error handling for sure if this was a full scale app
          return Response.error()
        }
        return Response.json({success: true});
      },

      async GET() {
        try{ 
          const restaurants = loadRestaurants()
          return Response.json(restaurants)
        } catch(err) {
          console.error(err)
          // TODO: Better error handling for sure if this was a full scale app
          return Response.error()
        }
      },
    },

    "/api/restaurants/:id": { 
      async POST(req) {
        console.log(req)
        const { rating } = await req.json()
        const id = parseFloat(req.params.id)
        console.log(`Update: '${id}' with rating '${rating}'`)

        try{ 
          updateRating(id, rating)
        } catch(err) {
          console.error(err)
          // TODO: Better error handling for sure if this was a full scale app
          return Response.error()
        }

        return Response.json({success: true})
      },
      async DELETE(req) {
        console.log(req)
        const id = parseFloat(req.params.id)
        console.log("Delete: '" + id + "'")

        try {
          deleteRestaurant(id)
        } catch(err) {
          console.error(err)
          return Response.error()
        }
        return Response.json({success: true})
      }
    },
  },

  development: process.env.NODE_ENV !== "production",
});

console.log(`🚀 Server running at ${server.url}`);
