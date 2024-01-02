"use client";

import { useEffect } from "react";
import styles from "./page.module.css";

const localServer = true;

export default function Home() {
  useEffect(() => {
    getFood();
  });

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
    </main>
  );
}
