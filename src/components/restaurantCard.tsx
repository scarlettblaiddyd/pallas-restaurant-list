import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils"
import type Restaurant from "@/types/restaurant";


export default function RestaurantCard({ restaurant, onUpdate, className, ...props }: {
    restaurant: Restaurant;
    onUpdate: Function;
} & React.ComponentProps<"div">) {
    const [updateRating, setUpdateRating] = useState(false);
    const [rating, setRating] = useState("");
    const [showRealDelete, setShowRealDelete] = useState(false);

    async function updateRestaurantRating() {
        try {
            if(rating === restaurant.rating.toString()) {
                return
            }
            const res = await fetch(`/api/restaurants/${restaurant.id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({rating: rating || restaurant.rating})
            });

            if(!res.ok) {
                throw new Error("Failed to update restaurant rating")
            }

            // clear fields
            setRating("")
            setUpdateRating(false)
            onUpdate()
        } catch(err) {
            // Not doing anything fancy here
            alert(err)
        }
    }

    async function deleteRestaurant() {
        try {
            const res = await fetch(`/api/restaurants/${restaurant.id}`, {
                method: "DELETE"
            });

            if(!res.ok) {
                throw new Error("Failed to delete restaurant")
            }

            onUpdate()
        } catch(err) {
            // Not doing anything fancy here
            alert(err)
        }
    }

  return (
    <Card
      className={cn(
        "relative aspect-square flex-grow basis-full xs:basis-1/3 md:basis-1/4 max-w-full xs:max-w-1/3 md:max-w-1/4",
        className
      )}
      {...props}
    >
        <CardTitle className="text-2xl text-center border-b p-2 white whitespace-nowrap">
            { restaurant.name }
        </CardTitle>
        <CardContent className="relative flex-col justify-start h-full z-10"
            // Improve readability of text over images
            style={{
                textShadow: "black 0 2px 10px",
            }}>
            <div
                className="absolute inset-0 -z-10 bg-center bg-cover before:absolute before:inset-0 before:bg-black/30"
                style={{
                    backgroundImage: `url(${restaurant.imgUrl})`,
                    filter: "brightness(0.5) contrast(1.1)",
                }}
            />
            <span className="text-xl">
                { restaurant.type }
            </span>
            <span className="text-[clamp(1rem,2vw,1.5rem)]">
                { restaurant.location }<br/>
                { updateRating ? 
                    (<><input type="number" min={0} max={5} step={.5} defaultValue={restaurant.rating} 
                        onChange={(e) => setRating(e.target.value)}></input><br/></>) :
                    (<>{ restaurant.rating }★<br/></>)
                }
                { restaurant.price }<br/>
                <div className="overflow-ellipsis">
                    { restaurant.description }<br/>
                </div>
            </span>
        </CardContent>
        <CardFooter className="justify-center pb-1 pt-1">
            {
                showRealDelete ?
                    <div className="flex flex-1 justify-between">
                        <span className="text-destructive flex items-center">
                            Delete?
                        </span>
                        <Button variant="outline" onClick={() => setShowRealDelete(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={deleteRestaurant}>Yes, Delete</Button>
                    </div>
                    :
                    <div className="flex flex-1 justify-between">
                        {
                            updateRating ?
                                <Button variant="default" onClick={updateRestaurantRating}>Confirm new rating</Button> :
                                <Button variant="outline" onClick={() => setUpdateRating(true)}>Edit rating</Button>
                        }
                        <Button variant="outline" onClick={() => setShowRealDelete(true)}>Delete</Button>
                    </div>
            }
        </CardFooter>
    </Card>
  )
}

// aspect-square max-h-1/2 max-w-1/2 w-[90vw] min-w-[var(--smallest-width)]