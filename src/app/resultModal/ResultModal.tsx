import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./ResultModal.module.css";
import Image from "next/image";
import { Rating } from "@mui/material";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "auto",
  height: "200px",
};

export default function ResultModal({ result, closeCallback }: ResultProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  const [placeCoords, setPlaceCoords] = useState({ lat: 0, lng: 0 });

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.GMAP_API_KEY ?? "",
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    map.setZoom(16);
    setMap(map);
  }, []);

  const onUnmount = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  useEffect(() => {
    console.log(result);
  });

  useEffect(() => {
    if (!result) return;

    dialog.current?.showModal();
    setPlaceCoords({
      lat: result.coordinates.latitude,
      lng: result.coordinates.longitude,
    });
  }, [result]);

  const closeModal = () => {
    dialog.current?.close();
    closeCallback(undefined);
  };

  return (
    <div>
      {result ? (
        <dialog className={styles.modal} ref={dialog}>
          <h1 className={styles.modalTitle}>Your random selection:</h1>
          <div className={styles.titleImage}>
            <p className={styles.title}>{result.name}</p>
            <Image
              src={result.image_url}
              alt={result.image_url}
              className={styles.image}
              width={0}
              height={0}
              unoptimized
            />
          </div>
          <section className={styles.modalBody}>
            <div className={styles.rating}>
              <Rating readOnly value={result.rating} size="large" />
              <p className={`${styles.ratingText} ${styles.bodyText}`}>
                {result.review_count} review
                {result.review_count === 1 ? "" : "s"}
              </p>
            </div>
            <div className={styles.priceCategories}>
              <p className={styles.bodyText}>
                {result.price}・
                {result.categories
                  ?.map((category) => category.title)
                  .join(", ")}
              </p>
            </div>
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={placeCoords}
                onLoad={onLoad}
                onUnmount={onUnmount}
              >
                <Marker position={placeCoords} />
              </GoogleMap>
            ) : (
              ""
            )}
            <section className={styles.appsGroup}>
              <button className={styles.appButton}>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                    result.name
                  )}`}
                >
                  Maps
                </a>
              </button>
              <button className={styles.appButton}>
                <a href={"tel:" + result.phone}>Call</a>
              </button>
              <button className={styles.appButton}>
                <a href={result.url}>Yelp</a>
              </button>
            </section>
          </section>
          <section className={styles.buttonGroup}>
            <button className={styles.button}>
              <h1 className={styles.buttonText}>Re-roll</h1>
            </button>
            <form className={styles.buttonGroup} method="dialog">
              <button className={styles.button} onClick={closeModal}>
                <h1 className={styles.buttonText}>Back</h1>
              </button>
            </form>
          </section>
        </dialog>
      ) : (
        ""
      )}
    </div>
  );
}
