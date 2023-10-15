'use server';

import mongoose from 'mongoose';

let isConnected: boolean = false;

export async function connectToDB() {
	await mongoose.set('strict', true);

	if (!process.env.MONGO_URI) throw new Error('MONGO_URI is not defined');

	if (isConnected) return console.log('=> using existing MongoDB connection');

	try {
		await mongoose.connect(String(process.env.MONGO_URI));
		isConnected = true;
		console.log('MongoDB connected successfully');
	} catch (error: any) {
		console.log(error.message);
	}
}
