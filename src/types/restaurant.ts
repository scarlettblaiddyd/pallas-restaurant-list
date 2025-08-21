export default interface Restaurant {
    name: string;
    type: string;
    imgUrl: string;
    location: string;
    rating: number;
    description?: string;
    price: "$" | "$$" | "$$$"
}