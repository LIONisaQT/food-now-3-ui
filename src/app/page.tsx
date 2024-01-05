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

  useEffect(() => {
    // getFood();
  });

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  const typePickedCallback = useCallback((selections: string[]) => {
    setCategories(selections);
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
        <TypePicker categories={categories} callback={typePickedCallback} />
        <LocationPicker />
        <RangePicker />
        <PricePicker />
        <RatingPicker />
        <AttributePicker />
      </div>
    </main>
  );
}
