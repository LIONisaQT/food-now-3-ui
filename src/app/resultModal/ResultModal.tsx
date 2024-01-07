import { useEffect, useRef } from "react";
import styles from "./ResultModal.module.css";
import Image from "next/image";

export default function ResultModal({ result, closeCallback }: ResultProps) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (result) dialog.current?.showModal();
  }, [result]);

  const closeModal = () => {
    dialog.current?.close();
    closeCallback(undefined);
  };

  return (
    <div>
      {result ? (
        <dialog className={styles.modal} ref={dialog}>
          <div className={styles.modalBody}>
            <h1>{result.name}</h1>
            <Image
              src={result.image_url}
              alt={result.image_url}
              width={100}
              height={100}
            />
            <form method="dialog">
              <button onClick={closeModal}>OK</button>
            </form>
          </div>
        </dialog>
      ) : (
        ""
      )}
    </div>
  );
}
