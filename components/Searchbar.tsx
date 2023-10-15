'use client';
import { scrapeAndStoreProduct } from '@/lib/actions';
import { FormEvent, useState } from 'react';

const isValidAmazonLink = (link: string): boolean => {
	try {
		const parsedURL = new URL(link);
		const hostname = parsedURL.hostname;

		if (
			hostname.includes('shopee.com') ||
			hostname.includes('shopee.co') ||
			hostname.endsWith('shopee')
		) {
			return true;
		}
	} catch (error) {
		return false;
	}
	return false;
};

const Searchbar = () => {
	const [searchPrompt, setSearchPrompt] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const isValidLink = isValidAmazonLink(searchPrompt);

		if (!isValidLink) return alert('Please enter a valid Amazon link');

		try {
			setIsLoading(true);

			// Scrape the product page
			const product = await scrapeAndStoreProduct(searchPrompt);
		} catch (error) {
			console.error(error);
		} finally {	
			setIsLoading(false);
		}
	};

	return (
		<form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Enter product link"
				className="searchbar-input"
				value={searchPrompt}
				onChange={(e) => setSearchPrompt(e.target.value)}
			/>
			<button type="submit" className="searchbar-btn"
			disabled={searchPrompt === ''}>
				{isLoading ? 'Searching...' : 'Search'}
			</button>
		</form>
	);
};

export default Searchbar;
