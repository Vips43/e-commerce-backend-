import React, { useEffect } from 'react'
import { useAuthStore } from '../store/loginSignupStore'
import ProductCard from '../components/ProductCard'
import CategoryBar from '../components/CategoryBar'

function HomePage() {
  const user = useAuthStore(state => state.user)
  const getLoggedStatus = useAuthStore(state => state.getLoggedStatus)
  useEffect(() => {
    getLoggedStatus()
  }, [])

  return (
    <div>
      <CategoryBar/>
      <ProductCard />
    </div>
  )
}

export default HomePage