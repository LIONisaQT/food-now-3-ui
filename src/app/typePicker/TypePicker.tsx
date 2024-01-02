import { useEffect, useState } from "react";
import styles from "./TypePicker.module.css";
import Image from "next/image";

type FoodTypeData = {
  type: string;
  label: string;
  image: string;
};

const cusinines: FoodTypeData[] = [
  {
    type: "breakfast",
    label: "Breakfast",
    image: "/breakfast.jpg",
  },
  {
    type: "brunch",
    label: "Brunch",
    image: "/brunch.jpg",
  },
  {
    type: "japanese",
    label: "Japanese",
    image: "/japanese.jpg",
  },
  {
    type: "korean",
    label: "Korean",
    image: "/korean.jpg",
  },
  {
    type: "chinese",
    label: "Chinese",
    image: "/chinese.jpg",
  },
  {
    type: "mexican",
    label: "Mexican",
    image: "/mexican.jpg",
  },
  {
    type: "american",
    label: "American",
    image: "/american.jpg",
  },
  {
    type: "boba",
    label: "Boba",
    image: "/boba.jpg",
  },
  {
    type: "ethiopian",
    label: "Ethiopian",
    image: "/ethiopian.jpg",
  },
];

export default function TypePicker() {
  const selectedStyle = {
    filter: "brightness(100%) grayscale(0)",
  };

  const unselectedStyle = {
    filter: "brightness(70%) grayscale(50%)",
  };

  const [selections, setSelections] = useState<string[]>([]);

  useEffect(() => {
    console.table(selections);
  }, [selections]);

  const typePicked = (type: string) => {
    if (selections.includes(type)) {
      setSelections((selections) =>
        selections.filter((selection) => selection !== type)
      );
    } else {
      setSelections([...selections, type]);
    }
  };

  return (
    <section className={styles.container}>
      <h1>1. Pick categories</h1>
      <div className={styles.categories}>
        {cusinines.map((cusinine) => (
          <div
            key={cusinine.type}
            className={styles.card}
            onClick={() => typePicked(cusinine.type)}
          >
            <h3 className={styles.label}>{cusinine.label}</h3>
            <Image
              src={cusinine.image}
              alt={cusinine.type}
              className={styles.image}
              style={
                selections.includes(cusinine.type)
                  ? selectedStyle
                  : unselectedStyle
              }
              width={0}
              height={0}
              unoptimized
            />
          </div>
        ))}
      </div>
      <div>
        <h4 className={styles.inputTitle}>Don&apos;t see one you like?</h4>
        <input
          className={styles.input}
          placeholder="Add your own! (comma separated)"
        ></input>
      </div>
    </section>
  );
}
