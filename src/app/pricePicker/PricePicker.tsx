import { Slider } from "@mui/material";
import styles from "./PricePicker.module.css";
import { useEffect, useState } from "react";

const marks = [
  {
    value: 1,
    label: "$",
  },
  {
    value: 2,
    label: "$$",
  },
  {
    value: 3,
    label: "$$$",
  },
  {
    value: 4,
    label: "$$$$",
  },
];

export default function PricePicker({ callback }: PriceProps) {
  const [priceRange, setPriceRange] = useState([1, 4]);

  useEffect(() => {
    callback(priceRange);
  }, [priceRange, callback]);

  const sliderMove = (event: Event, value: any) => {
    setPriceRange(value);
  };

  return (
    <section className={styles.container}>
      <h1>4. How cheap are you?</h1>
      <div className={styles.priceContainer}>
        <Slider
          className={styles.slider}
          marks={marks}
          min={1}
          max={4}
          value={priceRange}
          onChange={sliderMove}
          sx={{
            "& .MuiSlider-markLabel": {
              color: "white",
            },
          }}
        />
      </div>
    </section>
  );
}
