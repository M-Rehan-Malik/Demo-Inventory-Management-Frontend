import React from 'react'
import '../styles/Home.css'
import Carousel from '../components/Carousel'
import ProductSection from '../components/ProductSection'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
      <section className="bgImage">
        <div className="bgGray"><h1>Welcome to our website</h1></div>
      </section>
      <main>
        <Carousel/>
        <ProductSection/>
        <Footer/>
      </main>
    </>
  )
}

export default Home
