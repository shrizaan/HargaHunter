import axios from 'axios';
import { cheerioExtractData, extractCategory, extractImages } from '../utils';

const avoidUrl = ['cvf.shopee.co.id'];

export async function scrapeShopeeProduct(productUrl: string) {
	if (!productUrl) return;

	

	const response = await axios.post(
		'https://api.zyte.com/v1/extract',
		{
			url: productUrl,
			product: true,
		},
		{
			auth: { username: String(process.env.ZYTE_USERNAME), password: '' },
		}
	);
	// Extract product data using API
	const product = response.data.product;
	const url = product.url;
	const name = product.name;
	const brand = product?.brand?.name;
	const category = extractCategory(product.breadcrumbs);
	const currency = product.currency;
	const price = product.price;
	const regularPrice = product.regularPrice;
	const availability = product.availability;

	let mainImage: string = product?.mainImage?.url;
	if (avoidUrl.some((url) => mainImage.includes(url))) {
		mainImage = product?.images[0].url;
	}

	let images = extractImages(product.images);
	images = images.filter((image: string) => !avoidUrl.some((url) => image.includes(url)));

	console.log(images)
	const description = product.description;
	const rating = product.aggregateRating.ratingValue;
	const reviewCount = product.aggregateRating.reviewCount;

	const productData = {
		url,
		name,
		category,
		brand,
		currency,
		price,
		regularPrice,
		priceHistory: [],
		availability,
		mainImage,
		images,
		description,
		rating,
		reviewCount,
		lowestPrice: Number(price) || Number(regularPrice),
		highestPrice: Number(regularPrice) || Number(price),
		averagePrice: Number(price) || Number(regularPrice),
	};

	return productData;
}

export async function scrapeTokopediaProduct(productUrl: string) {}

export async function scrapeBlibliProduct(productUrl: string) {}
