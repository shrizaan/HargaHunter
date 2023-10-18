export type PriceHistoryItem = {
	price: number;
};

export type User = {
	email: string;
};

export type Product = {
	_id?: string;
	url: string;
	currency: string;
	mainImage: string;
	images: string[];
	name: string;
	brand: string;
	price: number;
	regularPrice: number;
	priceHistory: PriceHistoryItem[] | [];
	highestPrice: number;
	lowestPrice: number;
	averagePrice: number;
	description: string;
	category: [string];
	reviewCount: number;
	rating: number;
	availability: string;
	discountRate: number;
	users?: User[];
};

export type NotificationType =
	| 'WELCOME'
	| 'CHANGE_OF_STOCK'
	| 'LOWEST_PRICE'
	| 'THRESHOLD_MET';

export type EmailContent = {
	subject: string;
	body: string;
};

export type EmailProductInfo = {
	title: string;
	url: string;
};
