"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./page.module.css";
import TypePicker from "./typePicker/TypePicker";
import LocationPicker from "./locationPicker/LocationPicker";
import RangePicker from "./rangePicker/RangePicker";
import PricePicker from "./pricePicker/PricePicker";
import RatingPicker from "./ratingPicker/RatingPicker";
import AttributePicker from "./attributePicker/AttributePicker";

const localServer = true;

export default function Home() {
  const [categories, setCategories] = useState<string[]>([]);
  const [location, setLocation] = useState<string>("");
  const [distance, setDistance] = useState<number>();
  const [price, setPrice] = useState<number[]>();
  const [rating, setRating] = useState<number>();
  const [attributes, setAttributes] = useState<string[]>();

  useEffect(() => {
    console.log("=== BEGIN BUILDING REQUEST ===");
    console.log(categories);
    console.log(location);
    console.log(distance);
    console.log(price);
    console.log(rating);
    console.log(attributes);
    console.log("=== END BUILDING REQUEST ===");
  }, [categories, location, distance, price, rating, attributes]);

  const typePickedCallback = useCallback((selections: string[]) => {
    setCategories(selections);
  }, []);

  const locationCallback = useCallback((location: string) => {
    setLocation(location);
  }, []);

  const distanceCallback = useCallback((distance: number) => {
    setDistance(distance);
  }, []);

  const priceCallback = useCallback((price: number[]) => {
    setPrice(price);
  }, []);

  const ratingCallback = useCallback((rating: number) => {
    setRating(rating);
  }, []);

  const attributeCallback = useCallback((attributes: string[]) => {
    setAttributes(attributes);
  }, []);

  const getFood = async () => {
    const apiUrl = localServer
      ? "http://localhost:3001/api"
      : "https://food-now-3-server.onrender.com/api";

    fetch(apiUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        term: "boba",
        location: "san francisco, ca",
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <main className={styles.main}>
      <h1>Food Now!</h1>
      <div className={styles.categories}>
        <TypePicker callback={typePickedCallback} />
        <LocationPicker callback={locationCallback} />
        <RangePicker callback={distanceCallback} />
        <PricePicker callback={priceCallback} />
        <RatingPicker callback={ratingCallback} />
        <AttributePicker callback={attributeCallback} />
      </div>
    </main>
  );
}
