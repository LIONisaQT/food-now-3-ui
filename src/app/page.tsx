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
  const [location, setLocation] = useState<string>("san francisco");
  const [distance, setDistance] = useState<number>(10);
  const [price, setPrice] = useState<number[]>([1, 2, 3, 4]);
  const [rating, setRating] = useState<number>(4);
  const [attributes, setAttributes] = useState<string[]>([]);

  useEffect(() => {}, [
    categories,
    location,
    distance,
    price,
    rating,
    attributes,
  ]);

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

  // TODO: This has to get processed after receiving data from backend
  const ratingCallback = useCallback((rating: number) => {
    setRating(rating);
  }, []);

  const attributeCallback = useCallback((attributes: string[]) => {
    setAttributes(attributes);
  }, []);

  const buildRequestBody = () => {
    console.log("=== BEGIN BUILDING REQUEST ===");
    let requestBody: YelpRequestBody = {
      term: categories.join(","),
      radius: distance,
      price: price,
      open_now: true,
      attributes: attributes,
    };

    const determineLocation = () => {
      if (location?.includes(", ")) {
        const geoCoords = location.split(", ");
        const latitude = Number(geoCoords[0]);
        const longitude = Number(geoCoords[1]);
        requestBody = {
          ...requestBody,
          latitude: latitude,
          longitude: longitude,
        };
      } else {
        requestBody = { ...requestBody, location: location };
      }
    };
    determineLocation();

    console.table(requestBody);
    console.log("=== END BUILDING REQUEST ===");

    return requestBody;
  };

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
      body: JSON.stringify(buildRequestBody()),
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
      <button onClick={buildRequestBody}>Get food now!</button>
    </main>
  );
}
