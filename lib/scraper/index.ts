import axios from 'axios';
import { cheerioExtractData } from '../utils';

export async function scrapeShopeeProduct(productUrl: string) {
	if (!productUrl) return;

	try {
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
		// Extract product data using cheerio
		// cheerioExtractData(response.data.browserHtml);

		// Extract product data using API
		const product = response.data.product;
		const url = product.url;
		const name = product.name;
		const brand = product.brand.name;
		const category = product.breadcrumbs.slice(1, -1);
		const currency = product.currencyRaw;
		const price = product.price;
		const regularPrice = product.regularPrice;
		const availability = product.availability;
		const mainImage = product.mainImage;
		const images = product.images;
		const description = product.descriptionHtml;
		const rating = product.aggregateRating.ratingValue;
		const reviewCount = product.reviewCount;

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
			highestPrice: Number(price) || Number(regularPrice),
			averagePrice: Number(price) || Number(regularPrice),
		};
		console.log(response.data.product);
		// consle.log(prooductData);

		return productData;
	} catch (error: any) {
		console.log(error.message);
	}
}

export async function scrapeTokopediaProduct(productUrl: string) {}

export async function scrapeBlibliProduct(productUrl: string) {}
