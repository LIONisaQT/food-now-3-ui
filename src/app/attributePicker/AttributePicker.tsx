import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import styles from "./AttributePicker.module.css";
import { ChangeEvent, useEffect, useState } from "react";

type Attribute = {
  value: string;
  label: string;
  defaultChecked?: boolean;
};

const attributesList: Attribute[] = [
  {
    value: "hot_and_new",
    label: "Hot and new",
  },
  {
    value: "reservation",
    label: "Reservation",
  },
  {
    value: "waitlist_reservation",
    label: "Waitlist reservation",
  },
  {
    value: "deals",
    label: "Deals",
  },
  {
    value: "gender_neutral_restrooms",
    label: "Gender neutral restrooms",
  },
  {
    value: "wheelchair_accessible",
    label: "Wheelchair accessible",
  },
];

export default function AttributePicker({ callback }: AttributeProps) {
  const [attributes, setAttributes] = useState<string[]>([]);

  useEffect(() => {
    callback(attributes);
  }, [attributes, callback]);

  const toggleAttribute = ({
    target: { value, checked },
  }: ChangeEvent<HTMLInputElement>) => {
    if (checked) {
      if (!attributes.includes(value)) {
        setAttributes([...attributes, value]);
      }
    } else {
      setAttributes(attributes.filter((attr) => attr !== value));
    }
  };

  return (
    <section>
      <h1>6. Set additional attributes.</h1>
      <div className={styles.attributeContainer}>
        <FormGroup>
          {attributesList.map((attribute) => (
            <FormControlLabel
              key={attribute.value}
              control={
                <Checkbox
                  defaultChecked={attribute.defaultChecked}
                  value={attribute.value}
                  className={styles.checkbox}
                  onChange={toggleAttribute}
                  sx={{
                    "& .AttributePicker_checkbox": {
                      color: "white", // this doesn't work rip
                    },
                  }}
                />
              }
              label={attribute.label}
            />
          ))}
        </FormGroup>
      </div>
    </section>
  );
}
