import React, { lazy, Suspense, useEffect, useState } from 'react'
import { useAuthStore } from '../store/loginSignupStore'

const ProductCard = lazy(() => import('../components/ProductCard'))
const CategoryBar = lazy(() => import('../components/CategoryBar'))
const ImageSlider = lazy(() => import('../components/ImageSlider'))
const SliderContainer = lazy(() => import('../components/SliderContainer'))

function HomePage() {
  const getLoggedStatus = useAuthStore(state => state.getLoggedStatus)
  useEffect(() => {
    getLoggedStatus()
  }, [])

  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <ImageSlider />
        <SliderContainer />
        <CategoryBar />
        <ProductCard />
      </Suspense>
    </div>
  )
}

export default HomePage