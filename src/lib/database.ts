import { Database } from "bun:sqlite";
import type Restaurant from "../types/restaurant";

const db = new Database("restaurants.db", { create: true });

db.run(`
    CREATE TABLE IF NOT EXISTS restaurants (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        imgUrl TEXT NOT NULL,
        location TEXT NOT NULL,
        rating FLOAT NOT NULL,
        price TEXT NOT NULL,
        description TEXT
    );
`)

export function insertRestaurant(restaurant: Restaurant) {
    const insertQuery = db.query(`
        INSERT INTO restaurants (name, type, imgUrl, location, rating, description, price)
        VALUES ($name, $type, $imgUrl, $location, $rating, $description, $price);`);
    insertQuery.values(
        {
            $name: restaurant.name,
            $type: restaurant.type,
            $imgUrl: restaurant.imgUrl,
            $location: restaurant.location,
            $rating: restaurant.rating,
            $description: restaurant.description ?? "",
            $price: restaurant.price,
        }
    );
}

export function loadRestaurants() : Restaurant[] {
    const getQuery = db.query(`SELECT * FROM restaurants`)
    const res = getQuery.all()
    console.log(res)

    return res as Restaurant[]
}