import "./index.css";
import RestaurantCard from "@/components/restaurantCard";
import NewRestaurantCard from "./components/newRestaurantCard";

import type Restaurant from "./types/restaurant";
import { useEffect, useState } from "react";

export function App() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])

  // At this point in a normal application's development, I would probably not have integrated with a proper
  // database yet and would just be using an in-memory list. But since I went to the trouble of setting up
  // my little SQLite db I'm going to treat it as the sole source of truth rather than keeping track of edits
  // in memory and flushing to the db every so often
  async function updateRestaurantsFromDb() {
      const res = await fetch("/api/restaurants", {
            method: "GET",
        });
      // TODO: some type checking would be nice if this was expanded
      const fromDb = await res.json()
      setRestaurants(fromDb)
  }

  // I believe useEffect w/ an empty array will just trigger on app start and never again
  useEffect(() => {
    (async () => {
      await updateRestaurantsFromDb()
    })()
  }, [])

  return (
    <div className="flex flex-col">
      <a href="https://unsplash.com/s/photos/restaurant-food?license=free" target="_blank" className="text-cyan-500 hover:text-cyan-800 underline mb-4 text-center">
        Find photos here!
      </a>
      <div className="flex flex-wrap justify-center gap-4 max-w-full m-0 bg-background text-foreground">
        {
          restaurants.map((restaurant, index) => (
            <RestaurantCard restaurant={restaurant} onUpdate={updateRestaurantsFromDb} key={index}/>
          ))
        }
        <NewRestaurantCard onUpdate={updateRestaurantsFromDb}/>
      </div>
    </div>
  );
}

export default App;
