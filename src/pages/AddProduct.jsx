import React, { useState } from 'react'
import "../styles/AddProduct.css"
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from '../features/products/productsSlice'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'


const AddProduct = () => {

    const dispatch = useDispatch();

    const { data, isLoading, error, successMsg } = useSelector((state) => state.products);

    const navigate = useNavigate();

    const [nameLength, setNameLength] = useState(0)

    const [product, setProduct] = useState({
        name: "",
        mrpCtnPrice: 0,
        sellingCtnPrice: 0,
        piecesInCtn: 0,
    })

    const handleChange = (e) => {
        if (e.target.name === "name") setProduct({ ...product, name: e.target.value });
        else {
            setProduct({ ...product, [e.target.name]: Number(e.target.value) });
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(addProduct(product))
        if (!result.error) {
            setProduct({
                name: "",
                mrpCtnPrice: 0,
                sellingCtnPrice: 0,
                piecesInCtn: 0,
            })
        }
    }
    return (
        isLoading ? <Loader /> :
            (<section id='addProductSection'>
                <form action="" name="addProductForm" onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" autoComplete='off' name="name" maxLength={80} placeholder="Enter name" value={product.name} onChange={(e) => {
                            setNameLength(e.target.value.length)
                            handleChange(e)
                        }} />
                        <p className="length">{nameLength} / 80</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="mrpCtnPrice">MRP Ctn Price</label>
                        <input type="number" className="form-control" name="mrpCtnPrice" placeholder="Enter price" value={product.mrpCtnPrice} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="sellingCtnPrice">Selling Ctn Price</label>
                        <input type="number" className="form-control" name="sellingCtnPrice" placeholder="Enter price" value={product.sellingCtnPrice} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="piecesInCtn">Pieces / Ctn</label>
                        <input type="number" className="form-control" name="piecesInCtn" placeholder="Enter pieces number" value={product.piecesInCtn} onChange={handleChange} />
                    </div>
                    <button className="addBtn" disabled={product.name.length === 0}>
                        Add Product
                    </button>
                </form>
                {successMsg && <p className='successMessage'>{successMsg}</p>}
                {error && <p className='errorMessage'>{error}</p>}
            </section>)
    )
}

export default AddProduct
