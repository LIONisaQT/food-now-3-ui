import { useState } from "react";
import styles from "./RangePicker.module.css";
import { Slider } from "@mui/material";

export default function RangePicker() {
  const [distance, setDistance] = useState(10);

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
