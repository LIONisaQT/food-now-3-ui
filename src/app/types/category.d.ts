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

type RatingProps = {
	callback: (rating: number) => void;
}

type AttributeProps = {
	callback: (attributes: string[]) => void;
}

type FoodTypeData = {
  type: string;
  label: string;
  image: string;
};

type YelpRequestBody = {
	term?: string;
	location?: string;
	latitude?: number;
	longitude?: number;
	radius: number;
	price: number[];
	open_now: boolean;
	attributes: string[];
}
