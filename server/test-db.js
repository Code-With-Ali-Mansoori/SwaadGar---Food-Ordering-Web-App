import mongoose from 'mongoose';
import 'dotenv/config';

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/Food_Delivery";
console.log("Connecting to:", mongoUrl);

try {
    await mongoose.connect(mongoUrl);
    console.log("DB Connected successfully");
    process.exit(0);
} catch (error) {
    console.error("DB connection error:", error.message);
    process.exit(1);
}
