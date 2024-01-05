import { Rating } from "@mui/material";
import styles from "./RatingPicker.module.css";
import { useEffect, useState } from "react";

export default function RatingPicker({ callback }: RatingProps) {
  const [rating, setRating] = useState(4.5);

  useEffect(() => {
    callback(rating);
  }, [rating, callback]);

  const ratingPicked = (event: any, value: any) => {
    setRating(value);
  };

  return (
    <section className={styles.container}>
      <h1>5. Set minimum rating.</h1>
      <div className={styles.ratingContainer}>
        <Rating
          defaultValue={rating}
          precision={0.5}
          className={styles.ratings}
          onChange={ratingPicked}
          size="large"
        />
      </div>
    </section>
  );
}
