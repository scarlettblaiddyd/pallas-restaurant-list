import "./index.css";
import RestaurantCard from "@/components/restaurantCard";
import NewRestaurantCard from "./components/newRestaurantCard";

import type Restaurant from "./types/restaurant";
import { useEffect, useState } from "react";

export function App() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])

  // I believe useEffect w/ an empty array will just trigger on app start and never again
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/restaurants", {
            method: "GET",
        });
      // TODO: some type checking would be nice if this was expanded
      const fromDb = await res.json()
      setRestaurants(fromDb)
    })()
  }, [])

  return (
    <div className="flex flex-wrap justify-center gap-4 max-w-full m-0 bg-background text-foreground">
      {
        restaurants.map(restaurant => (
          <RestaurantCard restaurant={restaurant} key={restaurant.name}/>
        ))
      }
      <NewRestaurantCard setRestaurants={setRestaurants}/>
    </div>
  );
}

export default App;
