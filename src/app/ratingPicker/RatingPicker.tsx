import { Rating } from "@mui/material";
import styles from "./RatingPicker.module.css";
import { useState } from "react";

export default function RatingPicker() {
  const [rating, setRating] = useState(0);

  const ratingPicked = (event: any, value: any) => {
    setRating(value);
  };

  return (
    <section className={styles.container}>
      <h1>5. Set minimum rating.</h1>
      <div className={styles.ratingContainer}>
        <Rating
          defaultValue={0}
          precision={0.5}
          className={styles.ratings}
          onChange={ratingPicked}
          size="large"
        />
      </div>
    </section>
  );
}
