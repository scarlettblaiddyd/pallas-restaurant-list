export default interface Restaurant {
    id?: number; // Eh could probably do this smarter, but for now just have optional ID param to make updates/deletes from DB easier
    name: string;
    type: string;
    imgUrl: string;
    location: string;
    rating: number;
    description?: string;
    price: "$" | "$$" | "$$$"
}