'use server';

import { revalidatePath } from 'next/cache';
import Product from '../models/product.model';
import { connectToDB } from '../mongoose';
import { scrapeShopeeProduct } from '../scraper';
import { getAveragePrice, getHighestPrice, getLowestPrice } from '../utils';

export async function scrapeAndStoreProduct(productUrl: string) {
	if (!productUrl) return;

	try {
		connectToDB();

		const shopeeProduct = await scrapeShopeeProduct(productUrl);

		if (!shopeeProduct) return;

		let product = shopeeProduct;

		const existingProduct = await Product.findOne({ url: shopeeProduct.url });

		if (existingProduct) {
			const updatedPriceHistory: any = [
				...existingProduct.priceHistory,
				{ price: shopeeProduct.price },
			];

			product  = {
				...shopeeProduct,
				priceHistory: updatedPriceHistory,
				lowestPrice: getLowestPrice(updatedPriceHistory),
				highestPrice: getHighestPrice(updatedPriceHistory),
				averagePrice: getAveragePrice(updatedPriceHistory),
			};
			
			const newProduct = await Product.findOneAndUpdate(
				{ url: shopeeProduct.url},
				product,
				{ upsert: true, new: true }
			);

			revalidatePath(`/products/${newProduct._id}`);
		}
	} catch (error: any) {
		throw new Error(`Failed to create/update product ${error.message}`);
	}
}
