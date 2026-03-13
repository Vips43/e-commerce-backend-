import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../store/loginSignupStore'
import ProductCard from '../components/ProductCard'
import CategoryBar from '../components/CategoryBar'
import ImageSlider from '../components/ImageSlider'
import SliderContainer from '../components/SliderContainer'

function HomePage() {
  const getLoggedStatus = useAuthStore(state => state.getLoggedStatus)
  useEffect(() => {
    getLoggedStatus()
  }, [])

  return (
    <div>
      <ImageSlider />
      <SliderContainer />
      <CategoryBar />
      <ProductCard />
    </div>
  )
}

export default HomePage