import React from 'react'
import Hero from './Hero'
import Articles from './articles'
import Categories from './categories'
import Popular from './popular'
import Promo from './promo'

const Home = () => {
  return (
    <main>
      <Hero/>
      <Categories/>
      <Popular/>
      <Promo/>
      <Articles/>
    </main>
      
  )
}

export default Home