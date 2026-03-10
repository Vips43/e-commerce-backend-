import express from "express";

const productRoute = express.Router();
const url = `https://dummyjson.com`;

productRoute.get("/categories", async (req, res) => {
  const data = await fetchFunc("category-list");
  res.status(200).json({ data });
});

productRoute.get("/categories/:id", async (req, res) => {
  let { id } = req.params;
  const data = await fetchFunc("category/", id);
  res.status(200).json({ data });
});

async function fetchFunc(params, id = "") {
  try {
    const URL = `${url}/products/${params}${id}`;
    console.log(URL)
    const res = await fetch(`${URL}`);
    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}
export default productRoute;
