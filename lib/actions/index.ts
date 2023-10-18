'use server';

import { revalidatePath } from 'next/cache';
import Product from '../models/product.model';
import { connectToDB } from '../mongoose';
import { scrapeShopeeProduct } from '../scraper';
import { getAveragePrice, getHighestPrice, getLowestPrice } from '../utils';

export async function scrapeAndStoreProduct(productUrl: string) {
	if (!productUrl) return;

	connectToDB();

	const shopeeProduct = await scrapeShopeeProduct(productUrl);

	if (!shopeeProduct) return;

	let product = shopeeProduct;

	// Check if product already exists in the database
	const existingProduct = await Product.findOne({ url: shopeeProduct.url });
	if (existingProduct) {
		console.log('masuk if existing product')
		const updatedPriceHistory: any = [
			...existingProduct.priceHistory,
			{ price: shopeeProduct.price },
		];

		product = {
			...shopeeProduct,
			priceHistory: updatedPriceHistory,
			lowestPrice: getLowestPrice(updatedPriceHistory),
			highestPrice: getHighestPrice(updatedPriceHistory),
			averagePrice: getAveragePrice(updatedPriceHistory),
		};
	}

	const newProduct = await Product.findOneAndUpdate(
		{ url: shopeeProduct.url },
		product,
		{ upsert: true, new: true }
	);

	// Revalidates the path of the product page to ensure that the latest data is displayed.
	revalidatePath(`/products/${newProduct._id}`);
}

export async function getProductById(productId: string) {
	connectToDB();

	const product = await Product.findOne({ _id: productId });

	if(!product) return null;

	return product
};

export async function getAllProducts() {
	connectToDB();

	const products = await Product.find({});

	return products;
}

export async function getSimilarProducts(productId: string) {
	connectToDB();

	const currentProduct = await Product.findById(productId);

	if(!currentProduct) return null;

	const similarProducts = await Product.find({
		_id: { $ne: productId },
	}).limit(3);

	const similarProductsByCategory = await Product.find({
		category: { $in: currentProduct.category },
		_id: { $ne: productId },
	}).limit(6);

	return [...similarProductsByCategory, ...similarProducts];
}