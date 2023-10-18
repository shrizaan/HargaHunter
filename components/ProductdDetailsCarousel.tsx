'use client';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';


const ProductDetailsCarousel = (props: any) => {
	const { images, productName } = props;
	console.log(images)

	return (
			<Carousel showThumbs={false} autoPlay infiniteLoop interval={2000}>
				{images.map((image: any) => (
					<Image
						src={image}
						alt={productName}
						style={{
							width: '100%',
							height: 'auto',
						}}
						width={999}
						height={999}
						layout='responsive'
						className="object-contain"
						key={image.alt}
						quality={100}
					/>
				))}
			</Carousel>
	);
};

export default ProductDetailsCarousel;
