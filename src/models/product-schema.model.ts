import mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: String,
    description: String,
    specs: String,
    price: { type: Number, required: true },
    ean: String,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_doc, ret) => {
        const { _id, createdAt, updatedAt, ...rest } = ret;
        return {
          id: _id.toString(),
          ...rest,
        };
      },
    },
  },
);

export const ProductModel =
  mongoose.models.Product || mongoose.model('Product', ProductSchema);
