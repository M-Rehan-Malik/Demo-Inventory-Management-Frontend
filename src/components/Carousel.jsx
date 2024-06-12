import React, { useState } from "react"
import "../styles/Carousel.css"
import { Link } from "react-router-dom"

const Carousel = () => {

    const [imageNumber, setImageNumber] = useState(0)

    const images = ["/Carouselimg1.jpeg", "/Carouselimg2.jpeg", "/Carouselimg3.jpeg"]

    const showPreviousImg = () => {
        // If image Number is 0 set it to 2 else set Image Number to imageNumber - 1
        imageNumber === 0 ? setImageNumber(2) : setImageNumber(imageNumber - 1)
    }
    const showNextImg = () => {
        // If image Number is 2 set it to 0 else set Image Number to imageNumber + 1
        imageNumber === 2 ? setImageNumber(0) : setImageNumber(imageNumber + 1)
    }

    return (
        <section id="carousel">
            <h2>Our Shop</h2>
            <div className="carouselImgDiv">
                <div className="btnDiv" onClick={showPreviousImg}>
                    <span className="material-symbols-outlined">
                        arrow_back_ios
                    </span>
                </div>

                <img src={images[imageNumber]} alt="shop-img" />

                <div className="btnDiv" onClick={showNextImg}>
                    <span className="material-symbols-outlined">
                        arrow_forward_ios
                    </span>
                </div>
            </div>
            <h3 className="learnMore"><Link to="/about">Learn more about us</Link></h3>
        </section>
    )
}

export default Carousel
