import mongoose from "mongoose";

const uri =
  import.meta.env.VITE_MONGO_URL || "mongodb://127.0.0.1:27017/usersDB";

export const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (err) {
    console.log("MongoDB error:", err);
  }
};

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  pass: {
    type: String,
    required: true,
    minlength: 5,
  },
  wishlist: [
    {
      productId: {
        type: Number,
        ref: "Product",
        required: true,
      },
    },
  ],
  cart: [
    {
      product: {
        type: Number,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, default: 1 },
    },
  ],
});

export const User = mongoose.model("User", userSchema);
