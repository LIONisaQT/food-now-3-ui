import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import styles from "./LocationPicker.module.css";
import { TextField } from "@mui/material";

export default function LocationPicker({ callback }: LocationProps) {
  const [location, setLocation] = useState("");
  const locationInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    callback(location);
  }, [location, callback]);

  const locationTyped = (event: ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          setLocation(`${latitude}, ${longitude}`);
          console.table(`lat long: ${latitude}, ${longitude}`);
        },
        (error) => {
          console.error(error);
          alert(error.message);
        }
      );
    } else {
      const message = "Geolocation service unable on this device";
      console.error(message);
      alert(message);
    }
  };

  return (
    <section className={styles.container}>
      <h1>2. Where are you?</h1>
      <div className={styles.locationInput}>
        <TextField
          ref={locationInput}
          className={styles.input}
          variant="outlined"
          label="Location"
          placeholder="San Francisco"
          onChange={locationTyped}
          value={location}
        />
        <button className={styles.locationButton} onClick={() => getLocation()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
