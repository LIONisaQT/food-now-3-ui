type CategoryProps = {
	callback: (selections: string[]) => void;
}

type LocationProps = {
	callback: (location: string) => void;
}

type FoodTypeData = {
  type: string;
  label: string;
  image: string;
};
