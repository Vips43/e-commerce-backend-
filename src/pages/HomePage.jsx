import React, { lazy, Suspense, useEffect, useState } from "react";
import { useAuthStore } from "../store/loginSignupStore";
import { useDummyStore } from "../store/dummyStore";

const ProductCard = lazy(() => import("../components/ProductCard"));
const CategoryBar = lazy(() => import("../components/CategoryBar"));
const ImageSlider = lazy(() => import("../components/ImageSlider"));
const SliderContainer = lazy(() => import("../components/SliderContainer"));

function HomePage() {
  const getLoggedStatus = useAuthStore((state) => state.getLoggedStatus);
  const isCategoryLoading = useDummyStore((state) => state.isCategoryLoading);
  const isRandomLoading = useDummyStore((state) => state.isRandomLoading);

  useEffect(() => {
    getLoggedStatus();
  }, []);

  if (isCategoryLoading || isRandomLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="w-20 aspect-square rounded-full border-t-4 border-blue-500 animate-spin"></p>
      </div>
    );
  }

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
