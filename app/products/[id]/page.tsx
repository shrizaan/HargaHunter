import ProductDetailsCarousel from '@/components/ProductdDetailsCarousel';
import { getProductById, getSimilarProducts } from '@/lib/actions';
import { Product } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { moneyFormatter } from '@/lib/utils';
import PriceInfoCard from '@/components/PriceInfoCard';
import ProductCard from '@/components/ProductCards';

interface Props {
	params: {
		id: string;
	};
}

const ProductDetails = async ({ params: { id } }: Props) => {
	const product: Product = await getProductById(id);

	if (!product) redirect('/');

	const similarProducts = await getSimilarProducts(id);

	return (
		<div className="product-container">
			<div className="flex gap-28 xl:flex row flex-col">
				<div className="product-image">
					<ProductDetailsCarousel
						images={product.images}
						productName={product.name}
					/>
				</div>

				<div className="flex flex-1 flex-col">
					<div className="flex justify-between items-start gap-5 flex-wrap pb-6">
						<div className="flex flex-col gap-3">
							<p className="text-[28px] text-secondary font-semibold">
								{product.name}
							</p>

							<Link
								href={product.url}
								target="_blank"
								className="text-base text-black opacity-50"
							>
								Lihat Produk
							</Link>
						</div>

						<div className="flex items-center gap-3">
							<div className="product-hearts">
								<Image
									src="/assets/icons/red-heart.svg"
									alt="heart"
									width={20}
									height={20}
								/>
								<p className="text-base font-semibold text-[#D46F77]">
									{product.reviewCount}
								</p>
							</div>

							<div className="p-2 bg-white-200 rounded-10">
								<Image
									src="/assets/icons/bookmark.svg"
									alt="bookmark"
									width={20}
									height={20}
								/>
							</div>

							<div className="p-2 bg-white-200 rounded-10">
								<Image
									src="/assets/icons/share.svg"
									alt="share"
									width={20}
									height={20}
								/>
							</div>
						</div>
					</div>
					<div className="product-info">
						<div className="flex flex-col gap-2">
							<p className="text-[34px] text-secondary font-bold">
								{moneyFormatter(product.price, product.currency)}
							</p>
							<p className="text-[21px] text-black opacity-50 line-through">
								{moneyFormatter(product.regularPrice, product.currency)}
							</p>
						</div>

						<div className="flex flex-col gap-4">
							<div className="flex gap-3">
								<div className="product-stars">
									<Image
										src="/assets/icons/star.svg"
										alt="star"
										width={16}
										height={16}
									/>

									<p className="text-[20px] text-black">
										{product.rating || 0}
									</p>
								</div>

								<div className="product-reviews">
									<Image
										src="/assets/icons/comment.svg"
										alt="comment"
										width={16}
										height={16}
									/>

									<p className="text-sm text-secondary font-semibold">
										{product.reviewCount} Ulasan
									</p>
								</div>
							</div>

							<p className="text-sm text-black opacity-50">
								<span className="text-primary-green font-semibold">93% </span>of
								buyers have recommended this.
							</p>
						</div>
					</div>
					<div className="my-7 flex flex-col gap-5">
						<div className="flex flex-col gap-5 flex-wrap">
							<PriceInfoCard
								title="Harga Produk Saat Ini"
								iconSrc="/assets/icons/price-tag.svg"
								value={moneyFormatter(product.price, product.currency)}
								borderColor="blue"
							/>
							<PriceInfoCard
								title="Harga Produk Rata-Rata"
								iconSrc="/assets/icons/chart.svg"
								value={moneyFormatter(product.averagePrice, product.currency)}
								borderColor="purple"
							/>
							<PriceInfoCard
								title="Harga Produk Tertinggi"
								iconSrc="/assets/icons/arrow-up.svg"
								value={moneyFormatter(product.highestPrice, product.currency)}
								borderColor="red"
							/>
							<PriceInfoCard
								title="Harga Produk Terendah"
								iconSrc="/assets/icons/arrow-down.svg"
								value={moneyFormatter(product.lowestPrice, product.currency)}
								borderColor="green"
							/>
						</div>
					</div>
					<Modal />
				</div>
			</div>

			<div className="flex flex-col gap-16 border-2 border-red-primary rounded-10">
				<div className="flex flex-col gap-8 px-3 py-8">
					<h3 className="text-2xl text-secondary font-semibold">
						Product Description
					</h3>
					<pre
						className="flex flex-col gap-1 [&_p]:mb-2 font-inter h-[500px] overflow-x-auto "
						dangerouslySetInnerHTML={{
							__html: product.description,
						}}
						style={{
							whiteSpace: 'pre-wrap',
						}}
					/>
					<button className="btn w-fit mx-auto flex items-center gap-1">
						<Image
							src="/assets/icons/bag.svg"
							alt="bag"
							width={22}
							height={22}
						/>
						<Link href={product.url} className="text-base text-white">
							Beli Sekarang
						</Link>
					</button>
				</div>
			</div>

			{similarProducts && similarProducts?.length > 0 && (
				<div className="flex flex-col gap-2 w-full py-14">
					<p className="section-text">Produk Lainnya</p>

					<div className="flex flex-wrap gap-10 mt-7 w-full">
						{similarProducts.map((product) => (
							<ProductCard key={product._id} product={product} />
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default ProductDetails;
