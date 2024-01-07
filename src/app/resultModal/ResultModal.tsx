import { useEffect, useRef } from "react";
import styles from "./ResultModal.module.css";
import Image from "next/image";
import { Rating } from "@mui/material";

export default function ResultModal({ result, closeCallback }: ResultProps) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!result) {
      console.log("null result");
      return;
    }

    console.log(result);
    dialog.current?.showModal();
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
            <p className={styles.bodyText}>{result.location.address1}</p>
            <a href={"tel:" + result.phone}>{result.display_phone}</a>
            <a href={result.url}>Open in Yelp</a>
          </section>
          <section className={styles.buttonGroup}>
            <button className={styles.button}>
              <h1 className={styles.buttonText}>Re-roll</h1>
            </button>
            <form className={styles.buttonGroup} method="dialog">
              <button className={styles.button} onClick={closeModal}>
                <h1 className={styles.buttonText}>OK</h1>
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
