import Searchbar from '@/components/Searchbar';
import HeroCarousel from '@/components/HeroCarousel';
import Image from 'next/image';
import { getAllProducts } from '@/lib/actions';
import ProductCards from '@/components/ProductCards';

const Home = async () => {
	const allProducts = await getAllProducts();

	return (
		<>
			<section className="px-6 md:px-20 py-24">
				<div className="flex max-lg:flex-col gap-16">
					<div className="flex flex-col justify-center">
						<p className="small-text">
							Smart Shopping Starts Here:
							<Image
								src="/assets/icons/arrow-right.svg"
								alt="arrow-right"
								width={16}
								height={16}
							/>
						</p>
						<h1 className="head-text">
							Unleash the Power ofc
							<span className="text-primary"> HargaHunter</span>
						</h1>
						<p className="mt-6">
							Powerful, self-serve product and growth analytics to help you
							convert, engage, and retain more.
						</p>
						<Searchbar />
					</div>
					<HeroCarousel />
				</div>
			</section>

			<section className="trending-section">
				<h2 className="section-text">Trending</h2>

				<div className="flex flex-wrap gap-x-8 gap-y-16">
					{allProducts?.map((product) => (
						<ProductCards key={product._id} product={product} />
					))}
				</div>
			</section>
		</>
	);
};

export default Home;