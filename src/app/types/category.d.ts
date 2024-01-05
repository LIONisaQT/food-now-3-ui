type CategoryProps = {
	callback: (selections: string[]) => void;
}

type LocationProps = {
	callback: (location: string) => void;
}

type DistanceProps = {
	callback: (distance: number) => void;
}

type PriceProps = {
	callback: (price: number[]) => void;
}

type FoodTypeData = {
  type: string;
  label: string;
  image: string;
};
