import express from "express";
import { User } from "../conn.js";
import { useId } from "react";

const cwRoutes = express.Router();

cwRoutes.put("/add-to-wishlist", async (req, res) => {
  const { userId, productId } = req.body;
  if (typeof userId === "string" && userId.startsWith('"')) {
    userId = JSON.parse(useId);
  }

  try {
    const user = await User.findOneAndUpdate(
      { _id: userId, "whishlist.productId": { $ne: Number(productId) } },
      {
        $push: {
          wishlist: {
            $each: [{ productId: Number(productId) }],
            $position: 0,
          },
        },
      },
      { new: true },
    );

    if (!user) return res.status(404).json({ msg: "usernot found" });
    console.log("added to wishlist", productId);

    res.status(200).json({ wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

cwRoutes.put("/add-to-cart", async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }

    const existingPr = user.cart.findIndex(
      (item) => item.product === productId,
    );
    if (existingPr > -1) {
      user.cart[existingPr].quantity += Number(quantity);
    } else {
      user.cart.push({ product: productId, quantity: Number(quantity) });
    }

    await user.save();

    res.status(200).json(user.cart);
    console.log("cart updated successfully");
  } catch (error) {
    console.error("error in add to cart", error);
    res.status(500).json({ msg: error });
  }
});

cwRoutes.get("/cart/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ msg: "User not found" });

    res.status(200).json(user.cart);
  } catch (error) {
    res.status(500).json({ msg: "error fetching from cart", error });
  }
});

cwRoutes.get("/wishlist/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json(user.wishlist);
    console.log("wishlist fetched");
  } catch (error) {
    res.status(500).json({ msg: "error fetching from cart", error });
  }
});

cwRoutes.delete("/wishlist/remove", async (req, res) => {
  const { productId, userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.wishlist = user.wishlist.filter(
      (item) => item.productId !== Number(productId),
    );
    await user.save();

    console.log(`items remove from wishlist ${productId}`);
    res.status(200).json({ wishlist: user.wishlist, msg: `Item removed` });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ msg: error.message });
  }
});

cwRoutes.delete("/cart/remove", async (req, res) => {
  const { productId, userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.cart = user.cart.filter(
      (item) => item.product.toString() !== productId.toString(),
    );
    await user.save();

    console.log(`items remove from cart ${productId}`);
    res.status(200).json({ cart: user.cart, msg: `Item removed` });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ msg: error.message });
  }
});

cwRoutes.delete("/cart/empty", async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { cart: [] } },
      { new: true },
    );
    await user.save();
    res.status(200).json({ cart: user.cart, msg: `cart empty` });
  } catch (error) {
    console.error("cart empty Error:", error);
    res.status(500).json({ msg: error.message });
  }
});
cwRoutes.delete("/wishlist/empty", async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { wishlist: [] } },
      { new: true },
    );
    await user.save();
    res.status(200).json({ wishlist: user.wishlist, msg: `wishlist empty` });
  } catch (error) {
    console.error("wishlist empty Error:", error);
    res.status(500).json({ msg: error.message });
  }
});

export default cwRoutes;
