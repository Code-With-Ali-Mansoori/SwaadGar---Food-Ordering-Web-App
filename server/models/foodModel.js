import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  dish_name: { type: String, required: true },
  dish_description: { type: String, required: true },
  amount: { type: Number, required: true },
  dish_img: { type: String, required: true },
  dish_category: { type: String, required: true },
});

const foodModel= mongoose.model("food",foodSchema);

export default foodModel;