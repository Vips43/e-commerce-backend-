import Card from "@mui/material/Card";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, CardContent, CardMedia } from "@mui/material";
import RightSection from "../components/RightSection";
import LeftSection from "../components/LeftSection";

export default function ProductDetails() {
  const [item, setItem] = useState([])
  document.title = "Product | details";
  const { productName } = useParams();

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`https://dummyjson.com/products/search?q=${productName}`);
      const data = await res.json();

      if(!res.ok) return console.log(res)

      console.log(data,productName)
      localStorage.setItem("prdetails", JSON.stringify(data));
      setItem(data.products?.[0] || null);
    };
    getData();
  }, [productName]);

  if (!item) {
    return;
  }

  return (
    <Card>
      <Box>
        <Box
          sx={{
            display: "flex",
            maxWidth: "60rem",
            gap: "1rem",
            margin: "1rem auto",
            padding: ".5rem",
          }}
        >
          <CardMedia
            component="img"
            image={item?.thumbnail}
            alt={item?.title}
            sx={{ width: "17rem" }}
          />
          <CardContent sx={{ maxWidth: 600 }}>
            <RightSection item={item} />
          </CardContent>
        </Box>
        <Box>
          <LeftSection item={item} />
        </Box>
      </Box>
    </Card>
  );
}