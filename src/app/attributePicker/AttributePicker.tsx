import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import styles from "./AttributePicker.module.css";

type Attribute = {
  value: string;
  label: string;
  defaultChecked?: boolean;
};

const attributesList: Attribute[] = [
  {
    value: "open_now",
    label: "Open now",
    defaultChecked: true,
  },
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

export default function AttributePicker() {
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
                  className={styles.checkbox}
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
