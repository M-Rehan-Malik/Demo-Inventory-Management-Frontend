import React from 'react'
import "../styles/ProductsSection.css"

const ProductSection = () => {
    return (
        <section id='productsSection'>
            <h2>Products we offer</h2>
            <div className="productsDiv">
                <div className="productCard">
                    <img src="/cosmetics.jpeg" alt="cosmetics image" />
                    <h3 className='productTitle'>Cosmetics items</h3>
                </div>
                <div className="productCard">
                    <img src="/diapers.jpeg" alt="diapers image" />
                    <h3 className='productTitle'>Diapers</h3>
                </div>
                <div className="productCard">
                    <img src="/surf.jpeg" alt="surf image" />
                    <h3 className='productTitle'>Laundry products</h3>
                </div>
                <div className="productCard">
                    <img src="/soap.jpeg" alt="soap image" />
                    <h3 className='productTitle'>Cleaning items</h3>
                </div>
            </div>
        </section>
    )
}

export default ProductSection
