import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import * as Dialog from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { useState } from "react";
import type Restaurant from "../types/restaurant";

export default function NewRestaurantCard({ onUpdate, className, ...props }: {
    onUpdate: Function;
} & React.ComponentProps<"div">) {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [name, setName] = useState("");
    const [cuisineType, setCuisineType] = useState("");
    const [location, setLocation] = useState("");
    const [rating, setRating] = useState("");
    const [price, setPrice] = useState<"$" | "$$" | "$$$">("$");
    const [imgUrl, setImgUrl] = useState("");
    const [description, setDescription] = useState("");

    async function saveRestaurant() {
        const newRestaurant : Restaurant = {
            name,
            type: cuisineType,
            location,
            rating: parseFloat(rating),
            price,
            imgUrl,
            description
        }

        // console.log(`Before API: ${JSON.stringify(newRestaurant)}`)

        // TODO: Would be great to ensure that the imgUrl actually points to a real image but...
        // that's out of scope for the amount of time I'm spending on this

        // Save restaurant via API call
        try {
            const res = await fetch("/api/restaurants", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newRestaurant)
            });

            if(!res.ok) {
                throw new Error("Failed to save restaurant")
            }
            

            // clear fields
            setName("")
            setCuisineType("")
            setLocation("")
            setRating("")
            setPrice("$")
            setImgUrl("")
            setDescription("")
            setDialogOpen(false)
            onUpdate()
        } catch(err) {
            // Not doing anything fancy here
            alert(err)
        }
    }

  return (
    // Using the Card and Dialog components that came pre-made from the radix-ui library installed during bun init
    // Honestly the super deep nested HTML elements are a bit of an eyesore here, would definitely try to break some of this out
    // if I had more time
    <Card
      className={cn(
        "aspect-square flex-grow basis-full xs:basis-1/3 md:basis-1/4 max-w-full xs:max-w-1/3 md:max-w-1/4",
        className
      )}
      {...props}
    >
        <CardTitle className="text-center">
            Add New
        </CardTitle>
        <CardContent>
            <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
                <Dialog.Trigger asChild className="flex self-center">
                    <Button variant="secondary" className="aspect-square min-w-1/2 min-h-1/2">
                        +
                    </Button>
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-neutral-800 data-[state=open]:opacity-95 z-15" />
                    <Dialog.Content aria-describedby={undefined}
                        className="z-20 fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] min-w-[calc(2*var(--smallest-width))] -translate-x-1/2 -translate-y-1/2 rounded-md bg-neutral-900 p-[25px] shadow-[var(--shadow-6)] focus:outline-none">
                        <Dialog.Title className="mb-4 font-medium">
                            Add New Restaurant
                        </Dialog.Title>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            saveRestaurant();
                        }}>
                        <fieldset className="mb-4 flex items-center justify-between w-full">
                            <label
                                className="text-right text-md "
                                htmlFor="name"
                            >
                                Name
                            </label>
                            <input
                                className="inline-flex h-10 w-1/2 items-center justify-center rounded px-2 text-sm shadow-[0_0_0_1px] shadow-accent"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Restaurant Name"
                                minLength={3}
                                required
                            />
                        </fieldset>
                        <fieldset className="mb-4 flex items-center justify-between w-full">
                            <label
                                className="text-right text-md "
                                htmlFor="type"
                            >
                                Type of Cuisine
                            </label>
                            <input
                                className="inline-flex h-10 w-1/2 items-center justify-center rounded px-2 text-sm shadow-[0_0_0_1px] shadow-accent"
                                id="type"
                                value={cuisineType}
                                onChange={(e) => setCuisineType(e.target.value)}
                                placeholder="American, Italian, etc."
                                minLength={3}
                                required
                            />
                        </fieldset>
                        <fieldset className="mb-4 flex items-center justify-between w-full">
                            <label
                                className="text-right text-md "
                                htmlFor="location"
                            >
                                Location
                            </label>
                            <input
                                className="inline-flex h-10 w-1/2 items-center justify-center rounded px-2 text-sm shadow-[0_0_0_1px] shadow-accent"
                                id="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="San Francisco"
                                minLength={3}
                                required
                            />
                        </fieldset>
                        <fieldset className="mb-4 flex items-center justify-between w-full">
                            <label
                                className="text-right text-md "
                                htmlFor="rating"
                            >
                                Rating
                            </label>
                            <input
                                className="inline-flex h-10 w-1/2 items-center justify-center rounded px-2 text-sm shadow-[0_0_0_1px] shadow-accent"
                                id="rating"
                                type="number"
                                min="0" max="5" step=".5"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                placeholder="4.5"
                                required
                            />
                        </fieldset>
                        <fieldset className="mb-4 flex items-center justify-between w-full">
                            <label
                                className="text-right text-md "
                                htmlFor="price"
                            >
                                Price
                            </label>
                            <div className="flex w-1/2 justify-between">
                                {["$", "$$", "$$$"].map((value) => (
                                    <label key={value} className="flex items-center gap-1">
                                        <input
                                        type="radio"
                                        name="price"
                                        value={value}
                                        checked={price === value}
                                        onChange={() => setPrice(value as "$" | "$$" | "$$$")}
                                        required
                                        className="accent-accent"
                                        />
                                        <span className="text-sm">{value}</span>
                                    </label>
                                ))}
                            </div>
                            
                        </fieldset>
                        <fieldset className="mb-4 flex items-center justify-between w-full">
                            <label
                                className="text-right text-md "
                                htmlFor="imgUrl"
                            >
                                Image Location (url)
                            </label>
                            <input
                                className="inline-flex h-10 w-1/2 items-center justify-center rounded px-2 text-sm shadow-[0_0_0_1px] shadow-accent"
                                id="imgUrl"
                                value={imgUrl}
                                onChange={(e) => setImgUrl(e.target.value)}
                                minLength={3}
                                placeholder="https://images.unsplash.com/photo-1502998070258-dc1338445ac2"
                                required
                            />
                        </fieldset>
                        <fieldset className="mb-4 flex items-center justify-between w-full">
                            <label
                                className="text-right text-md "
                                htmlFor="description"
                            >
                                Description
                            </label>
                            <input
                                className="inline-flex h-10 w-1/2 items-center justify-center rounded px-2 text-sm shadow-[0_0_0_1px] shadow-accent"
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                maxLength={80}
                                placeholder="A great place for dinner!"
                            />
                        </fieldset>
                        <div className="mt-8 flex justify-end">
                            {/* <Dialog.Close asChild> */}
                                <button className="inline-flex h-8 items-center justify-center rounded bg-gray-700 hover:bg-gray-900 hover:border-gray-700 border-1 px-4 text-md"
                                    type="submit">
                                    Save Restaurant
                                </button>
                            {/* </Dialog.Close> */}
                        </div>
                        </form>

                        <Dialog.Close asChild>
                            <button
                                className="absolute right-2.5 top-2.5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full bg-gray-800"
                                aria-label="Close"
                            >
                                -
                            </button>
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>

            </Dialog.Root>
        </CardContent>
    </Card>
  )
}
