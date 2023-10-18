import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
	{
		url: {
			type: String,
			required: true,
			unique: true,
		},
		name: {
			type: String,
			required: true,
		},
		brand: {
			type: String,
		},
		category: {
			type: [String],
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		currency: {
			type: String,
			required: true,
		},
		regularPrice: {
			type: Number,
		},
		priceHistory: [
			{
				price: { type: Number, required: true },
				date: { type: Date, default: Date.now },
			},
		],
		lowestPrice: { type: Number },
		highestPrice: { type: Number },
		averagePrice: { type: Number },
		availability: {
			type: String,
			required: true,
		},
		mainImage: {
			type: String,
			required: true,
		},
		images: {
			type: [String],
		},
		description: {
			type: String,
		},
		rating: {
			type: Number,
			required: true,
		},
		reviewCount: {
			type: Number,
			default: 0,
		},
		user: [{ email: { type: String, required: true } }],
		default: [],
	},
	{ timestamps: true }
);

const Product =
mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
