import { useEffect, useState } from "react";
import styles from "./RangePicker.module.css";
import { Slider } from "@mui/material";

export default function RangePicker({ callback }: DistanceProps) {
  const [distance, setDistance] = useState(10);

  useEffect(() => {
    callback(distance);
  }, [distance, callback]);

  const sliderMove = (event: Event, value: any) => {
    setDistance(value);
  };

  return (
    <section className={styles.cotainer}>
      <h1>3. Set max distance.</h1>
      <div className={styles.sliderContainer}>
        <Slider
          className={styles.slider}
          min={1}
          max={25}
          value={distance}
          onChange={sliderMove}
        />
        <p className={styles.rangeText}>{distance} mi.</p>
      </div>
    </section>
  );
}
