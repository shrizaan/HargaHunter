"use server";

import mongoose from "mongoose";

let isConnected: boolean = false;

export async function connectToDB() {
	try {
		if (!process.env.MONGO_URI) throw new Error("MONGO_URI is not defined");

		if (isConnected) return console.log("=> using existing database connection");

		await mongoose.set("strict", true);
		await mongoose.connect(String(process.env.MONGO_URI));
		isConnected = true;
		console.log("Database connected successfully");
	} catch (error: any) {
		console.log(error.message);
	}
}