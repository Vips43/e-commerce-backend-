import React, { lazy, Suspense, useEffect, useState } from "react";
import { useAuthStore } from "../store/loginSignupStore";
import { useDummyStore } from "../store/dummyStore";

const ImageSlider = lazy(() => import("../components/ImageSlider"));
const SliderContainer = lazy(() => import("../components/SliderContainer"));
const CategoryBar = lazy(() => import("../components/CategoryBar"));
const ProductCard = lazy(() => import("../components/ProductCard"));

function HomePage() {
  const getLoggedStatus = useAuthStore((state) => state.getLoggedStatus);
  
  useEffect(() => {
    getLoggedStatus();
  }, []);


  return (
    <div>
      <Suspense
        fallback={
          <div className="min-h-125 content-center">
            <p className="w-20 aspect-square rounded-full border-t-4 mx-auto animate-spin"></p>
          </div>
        }
      >
        <ImageSlider />
        <SliderContainer />
        <CategoryBar />
        <ProductCard />
      </Suspense>
    </div>
  );
}

export default HomePage;
