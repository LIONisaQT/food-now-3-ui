"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./page.module.css";
import TypePicker from "./typePicker/TypePicker";
import LocationPicker from "./locationPicker/LocationPicker";
import RangePicker from "./rangePicker/RangePicker";
import PricePicker from "./pricePicker/PricePicker";
import RatingPicker from "./ratingPicker/RatingPicker";
import AttributePicker from "./attributePicker/AttributePicker";
import ResultModal from "./resultModal/ResultModal";

import { sampleResult } from "./sampleResult";

const localServer = true;

export default function Home() {
  const [categories, setCategories] = useState<string[]>([]);
  const [location, setLocation] = useState<string>("san francisco");
  const [distance, setDistance] = useState<number>(10);
  const [price, setPrice] = useState<number[]>([1, 4]);
  const [rating, setRating] = useState<number>(4);
  const [attributes, setAttributes] = useState<string[]>([]);
  const [result, setResult] = useState<YelpResult>();

  useEffect(() => {
    scroll(0, 0);
    document.body.style.overflow = result ? "hidden" : "visible";
  }, [result]);

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
    const generatePriceRange = (priceRange: number[]) => {
      let range: number[] = [];
      for (let i = priceRange[0]; i <= priceRange[1]; i++) {
        range.push(i);
      }
      return range;
    };

    let requestBody: YelpRequestBody = {
      term: categories.join(","),
      radius: Math.floor(distance * 1609.34), // Miles to meters
      price: generatePriceRange(price),
      open_now: true,
      attributes: attributes.join(","),
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

    return requestBody;
  };

  const getFood = async () => {
    // setResult(sampleResult);
    // return;

    const apiUrl = localServer
      ? "http://localhost:3001/api"
      : "https://food-now-3-server.onrender.com/api";

    await fetch(apiUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(buildRequestBody()),
    })
      .then((response) => response.json())
      .then((data) => setResult(JSON.parse(data)))
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
        <button className={styles.foodButton} onClick={getFood}>
          <h1 className={styles.buttonText}>Get food now!</h1>
        </button>
      </div>
      <ResultModal result={result} closeCallback={setResult} />
    </main>
  );
}
