import mongoose from "mongoose";

export const ProductSchema = new mongoose.Schema({
    title: {type: String, required: true},
    category: String,
    description: String,
    specs: String,
    price: {type: Number, required: true},
    ean: String,
}, {
    timestamps:true
});

export const ProductModel = mongoose.model("Product", ProductSchema)