import { moneyFormatter } from '@/lib/utils';
import { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
	product: Product;
}

const ProductCards = ({ product }: Props) => {

	return (
		<Link href={`/products/${product._id}`} className="product-card">
			<div className="product-card_img-container">
				<Image
					src={product?.mainImage || product.images[0]}
					alt={product.name}
					width={200}
					height={200}
					quality={100}
					className="product-card_img"
				/>
			</div>

			<div className="flex flex-col gap-3">
				<h3 className="product-title">{product.name}</h3>

				<div className="flex flex-col">
					<p className="text-black opacity-50 text-lg capitalize truncate">
						{product.category.join(', ')}
					</p>

					<p className="text-black text-lg font-semibold">
						{moneyFormatter(product?.price, product?.currency)}
					</p>
				</div>
			</div>
		</Link>
	);
};

export default ProductCards;
