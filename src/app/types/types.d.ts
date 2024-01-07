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

type ResultProps = {
	result: YelpResult | undefined;
	closeCallback: Dispatch<SetStateAction<YelpResult | undefined>>;
}

type FoodTypeData = {
  type: string;
  label: string;
  image: string;
};

type YelpRequestBody = {
	term: string;
	location?: string;
	latitude?: number;
	longitude?: number;
	radius: number;
	price: number[];
	open_now: boolean;
	attributes: string;
}

type YelpResult = {
	id: string;
	alias: string;
	name: string;
	image_url: string;
	is_closed: boolean;
	url: string;
	review_count: number;
	categories: [{}];
	rating: number;
	coordinates: {
		latitude: number;
		longitude: number;
	};
	transactions: [];
	price: string;
	location: {};
	phone: string;
	display_phone: string;
	distance: number;
}
