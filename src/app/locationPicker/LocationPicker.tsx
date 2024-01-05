import { FormEvent, useEffect, useRef, useState } from "react";
import styles from "./LocationPicker.module.css";

export default function LocationPicker({ callback }: LocationProps) {
  const [location, setLocation] = useState("San Francisco");
  const locationInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (locationInput && locationInput.current) {
      locationInput.current.value = location;
      callback(locationInput.current.value);
    }
  }, [location, callback]);

  const locationTyped = (event: FormEvent<HTMLInputElement>) => {
    setLocation(event.currentTarget.value);
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          setLocation(`${latitude}, ${longitude}`);
          console.table(`${latitude}, ${longitude}`);
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
        <input
          ref={locationInput}
          className={styles.locationText}
          placeholder="Enter location"
          onInput={locationTyped}
        ></input>
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
