import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils"
import type Restaurant from "@/types/restaurant";


export default function RestaurantCard({ restaurant, className, ...props }: {
    restaurant: Restaurant;
} & React.ComponentProps<"div">) {
  return (
    <Card
      className={cn(
        "aspect-square flex-grow basis-full xs:basis-1/2 md:basis-1/4 max-w-full xs:max-w-1/2 md:max-w-1/4",
        className
      )}
      {...props}
    >
        <CardTitle className="text-center">
            { restaurant.name }
        </CardTitle>
        <CardContent>
            { restaurant.type }
            { restaurant.location }
            { restaurant.description }
        </CardContent>
    </Card>
  )
}

// aspect-square max-h-1/2 max-w-1/2 w-[90vw] min-w-[var(--smallest-width)]