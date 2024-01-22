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
  const dialog = useRef<HTMLDivElement>(null);
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
    if (!result) return;

    setPlaceCoords({
      lat: result.coordinates.latitude,
      lng: result.coordinates.longitude,
    });
  }, [result]);

  const reroll = async () => {
    console.log("reroll");
  };

  const closeModal = () => {
    closeCallback(undefined);
  };

  return (
    <div>
      {result ? (
        <div className={styles.modal} ref={dialog}>
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
              <Rating
                readOnly
                className={styles.ratingStars}
                value={result.rating}
                size="large"
                precision={0.5}
              />
              <p className={`${styles.ratingText} ${styles.bodyText}`}>
                {result.rating}{" "}
                <span className={styles.reviewCount}>
                  ({result.review_count} review
                  {result.review_count === 1 ? "" : "s"})
                </span>
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
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                  result.name
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className={styles.appButton}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={32}
                    height={32}
                    fill="#FF1A1A"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#FF1A1A"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
                    />
                  </svg>
                </button>
              </a>
              <a href={"tel:" + result.phone}>
                <button className={styles.appButton}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={32}
                    height={32}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#FF1A1A"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                      fill="#FF1A1A"
                    />
                  </svg>
                </button>
              </a>
              <a href={result.url} target="_blank" rel="noopener noreferrer">
                <button className={styles.appButton}>
                  <svg
                    width={32}
                    height={32}
                    viewBox="-8 0 200 225"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M61.5538 141.722L71.7053 139.376C71.9188 139.327 72.2715 139.246 72.7023 139.107C75.5033 138.353 77.9036 136.542 79.3976 134.053C80.8917 131.565 81.363 128.594 80.7122 125.767C80.698 125.705 80.6845 125.646 80.6702 125.584C80.3367 124.229 79.7526 122.948 78.948 121.809C77.8103 120.365 76.4025 119.158 74.8032 118.254C72.9206 117.18 70.9502 116.267 68.9132 115.526L57.7826 111.463C51.5362 109.141 45.2902 106.877 38.9854 104.669C34.8968 103.214 31.4327 101.937 28.4226 101.006C27.8544 100.831 27.2277 100.656 26.718 100.48C23.0791 99.3647 20.5223 98.9023 18.3585 98.8871C16.9133 98.834 15.4737 99.0966 14.1397 99.6564C12.7496 100.256 11.5011 101.142 10.4759 102.257C9.96594 102.837 9.48647 103.443 9.03945 104.072C8.61998 104.714 8.23529 105.377 7.88704 106.06C7.50358 106.793 7.17403 107.552 6.90106 108.332C4.83522 114.439 3.80619 120.848 3.8567 127.294C3.89394 133.121 4.05045 140.6 7.25339 145.67C8.02519 146.971 9.06091 148.096 10.2938 148.972C12.5756 150.547 14.8814 150.755 17.2803 150.928C20.8652 151.185 24.3382 150.304 27.8005 149.504L61.5255 141.712L61.5538 141.722Z"
                      fill="#FF1A1A"
                    />
                    <path
                      d="M174.81 87.8259C172.038 82.0089 168.312 76.6984 163.786 72.1148C163.201 71.5329 162.574 70.9945 161.91 70.504C161.297 70.0441 160.66 69.6166 160.002 69.2233C159.326 68.8524 158.63 68.518 157.918 68.2214C156.51 67.6688 155.001 67.4197 153.491 67.4902C152.046 67.5724 150.636 67.9682 149.359 68.6503C147.423 69.6127 145.328 71.1596 142.542 73.7498C142.157 74.1321 141.673 74.5635 141.239 74.9703C138.94 77.1316 136.383 79.7961 133.34 82.8989C128.639 87.6496 124.009 92.4263 119.408 97.2552L111.176 105.792C109.669 107.352 108.296 109.037 107.073 110.829C106.031 112.343 105.293 114.046 104.902 115.843C104.676 117.22 104.709 118.628 105 119.993C105.014 120.055 105.028 120.114 105.042 120.176C105.693 123.004 107.414 125.468 109.845 127.049C112.275 128.631 115.224 129.207 118.072 128.655C118.523 128.59 118.873 128.512 119.086 128.46L162.978 118.319C166.437 117.519 169.947 116.787 173.055 114.983C175.139 113.774 177.122 112.576 178.482 110.159C179.208 108.831 179.648 107.365 179.773 105.857C180.446 99.875 177.323 93.0815 174.81 87.8259Z"
                      fill="#FF1A1A"
                    />
                    <path
                      d="M96.2523 106.283C99.433 102.287 99.4251 96.3316 99.7096 91.4625C100.667 75.1943 101.675 58.9239 102.474 42.6467C102.779 36.4814 103.443 30.3996 103.076 24.1874C102.774 19.0626 102.737 13.1786 99.5013 8.9729C93.7897 1.55649 81.6107 2.16603 73.3008 3.31645C70.7553 3.66979 68.2052 4.14486 65.6758 4.75211C63.1463 5.35937 60.6427 6.02259 58.1932 6.80705C50.2195 9.41894 39.0097 14.2133 37.1115 23.401C36.0414 28.5951 38.5771 33.9083 40.5443 38.6484C42.9287 44.3944 46.1856 49.5703 49.154 54.9792C57.0018 69.2587 64.9952 83.4491 72.9661 97.6545C75.3463 101.895 77.941 107.266 82.5463 109.463C82.8507 109.596 83.1616 109.714 83.4779 109.815C85.543 110.597 87.7941 110.748 89.9457 110.248C90.0756 110.218 90.2025 110.189 90.3294 110.159C92.3162 109.619 94.1151 108.539 95.5265 107.038C95.7814 106.799 96.0237 106.547 96.2523 106.283Z"
                      fill="#FF1A1A"
                    />
                    <path
                      d="M92.4442 149.836C91.2027 148.09 89.4409 146.781 87.4106 146.097C85.3803 145.413 83.1855 145.388 81.1398 146.028C80.6593 146.187 80.191 146.382 79.7386 146.609C79.039 146.965 78.3715 147.381 77.7435 147.853C75.9143 149.208 74.3739 150.969 72.9714 152.735C72.6156 153.185 72.2909 153.785 71.8677 154.17L64.8077 163.882C60.8061 169.322 56.8597 174.776 52.9464 180.317C50.3931 183.894 48.1845 186.915 46.4399 189.588C46.1093 190.091 45.766 190.653 45.4519 191.101C43.361 194.336 42.1768 196.697 41.569 198.8C41.1125 200.198 40.968 201.678 41.1458 203.137C41.3401 204.657 41.8518 206.118 42.6476 207.427C43.0707 208.083 43.5267 208.718 44.0139 209.328C44.5202 209.916 45.0579 210.475 45.6246 211.004C46.2299 211.581 46.8772 212.113 47.5613 212.595C52.4343 215.985 57.7689 218.421 63.3803 220.303C68.0498 221.853 72.9035 222.781 77.8161 223.062C78.6518 223.105 79.4895 223.086 80.3227 223.008C81.0949 222.941 81.8631 222.833 82.6241 222.685C83.3846 222.508 84.135 222.289 84.8723 222.032C86.3069 221.495 87.6132 220.664 88.7068 219.591C89.742 218.554 90.5388 217.304 91.0415 215.927C91.8575 213.893 92.3942 211.31 92.7471 207.476C92.7781 206.931 92.8558 206.277 92.9101 205.677C93.1885 202.496 93.3162 198.759 93.5209 194.365C93.8661 187.607 94.1369 180.879 94.351 174.132C94.351 174.132 94.8057 162.142 94.8043 162.135C94.9084 159.372 94.8232 156.31 94.0567 153.559C93.7202 152.24 93.1759 150.984 92.4442 149.836Z"
                      fill="#FF1A1A"
                    />
                    <path
                      d="M172.135 168.61C170.661 166.994 168.573 165.383 165.28 163.391C164.805 163.126 164.248 162.772 163.734 162.464C160.992 160.815 157.689 159.08 153.831 156.985C147.904 153.731 141.973 150.559 135.986 147.413L125.408 141.803C124.86 141.642 124.303 141.246 123.786 140.997C121.754 140.025 119.599 139.118 117.363 138.702C116.592 138.554 115.81 138.473 115.026 138.459C114.519 138.453 114.014 138.484 113.512 138.551C111.397 138.879 109.439 139.866 107.917 141.373C106.395 142.879 105.387 144.827 105.036 146.94C104.875 148.284 104.924 149.644 105.182 150.973C105.699 153.788 106.956 156.572 108.256 159.011L113.905 169.598C117.048 175.569 120.229 181.506 123.491 187.424C125.594 191.284 127.345 194.588 128.985 197.326C129.296 197.841 129.648 198.395 129.914 198.872C131.91 202.164 133.514 204.236 135.14 205.722C136.193 206.739 137.456 207.513 138.839 207.991C140.293 208.473 141.833 208.644 143.357 208.493C144.133 208.401 144.903 208.268 145.664 208.093C146.414 207.892 147.153 207.652 147.877 207.373C148.66 207.079 149.42 206.728 150.151 206.323C154.446 203.915 158.404 200.951 161.925 197.508C166.147 193.353 169.879 188.823 172.782 183.636C173.186 182.902 173.535 182.14 173.828 181.356C174.102 180.63 174.339 179.891 174.538 179.141C174.709 178.379 174.841 177.608 174.932 176.833C175.077 175.309 174.9 173.773 174.413 172.322C173.934 170.933 173.156 169.665 172.135 168.61Z"
                      fill="#FF1A1A"
                    />
                  </svg>
                </button>
              </a>
            </section>
          </section>
          <section className={styles.buttonGroup}>
            {/* <button className={styles.button} onClick={reroll}>
              <h1 className={styles.buttonText}>Re-roll</h1>
            </button> */}
            <form className={styles.buttonGroup} method="dialog">
              <button className={styles.button} onClick={closeModal}>
                <h1 className={styles.buttonText}>Back</h1>
              </button>
            </form>
          </section>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
