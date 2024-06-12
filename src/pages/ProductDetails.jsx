import React, { useState, useMemo, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import "../styles/ProductDetails.css"
import { useSelector, useDispatch } from 'react-redux'
import { deleteProduct, editProduct } from '../features/products/productsSlice'
import { closeModal, openModal } from '../features/modal/modalSlice'
import Modal from '../components/Modal'
import Loader from '../components/Loader'

const ProductDetails = () => {

    const dispatch = useDispatch();

    const { data, isLoading, error, successMsg } = useSelector((state) => state.products);

    const { isModalOpen } = useSelector((state) => state.modal);

    const location = useLocation();
    const product = location.state;

    const navigate = useNavigate();

    const editModalBody = [
        [
            { label: "Name", type: "text", name: "name", value: "name", readOnly: false },
            { label: "MRP Ctn Price", type: "number", name: "mrpCtnPrice", value: "mrpCtnPrice", readOnly: false },
            { label: "Selling Ctn Price", type: "number", name: "sellingCtnPrice", value: "sellingCtnPrice", readOnly: false },
            { label: "Pieces / Ctn", type: "number", name: "piecesInCtn", value: "piecesInCtn", readOnly: false },
        ]
    ]
    const [editModalState, setEditModalState] = useState([
        {
            name: product.name,
            mrpCtnPrice: product.mrpCtnPrice,
            sellingCtnPrice: product.sellingCtnPrice,
            piecesInCtn: product.piecesInCtn
        }
    ])

    const handleChange = (e, index) => {
        if (e.target.name === "name") setEditModalState((prevState) => [{ ...prevState[index], ["name"]: e.target.value }]);
        else {
            setEditModalState((prevState) => [{ ...prevState[index], [e.target.name]: Number(e.target.value) }]);
        }
    }

    const showModal = (e) => {
        e.preventDefault();
        dispatch(openModal())
    }
    const handleDelete = async (e) => {
        e.preventDefault();
        const confirm = window.confirm(`Are you sure you want to delete the product ${product.name}`)
        if (confirm) {
            const result = await dispatch(deleteProduct(product._id))
            if (!result.ok) {
                navigate("/admin/products")
            }
        }
    }
    const handleEdit = async (state) => {
        const productToEdit = state[0];
        const result = await dispatch(editProduct({ id: product._id, productToEdit }))
        if (result.meta.requestStatus === "fulfilled") {
            setTimeout(() => {
                dispatch(closeModal())
                navigate("/admin/products")
            },1500)
        }
    }
    if (!product) {
        return <h2>Product not found</h2>
    }

    return (
        isLoading ? <Loader /> :
            (<section id='productDetailsSection'>
                <h2>Product Details</h2>
                <form action="" name="productDetailsForm">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" name="name" value={product.name} readOnly />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mrpCtnPrice">MRP Ctn Price</label>
                        <input type="number" className="form-control" name="mrpCtnPrice" value={product.mrpCtnPrice} readOnly />
                    </div>
                    <div className="form-group">
                        <label htmlFor="sellingCtnPrice">Selling Ctn Price</label>
                        <input type="number" className="form-control" name="sellingCtnPrice" value={product.sellingCtnPrice} readOnly />
                    </div>
                    <div className="form-group">
                        <label htmlFor="piecesInCtn">Pieces / Ctn</label>
                        <input type="number" className="form-control" name="piecesInCtn" value={product.piecesInCtn} readOnly />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mrpItemPrice">MRP Item Price</label>
                        <input type="number" className="form-control" name="mrpItemPrice" value={product.mrpItemPrice} readOnly />
                    </div>
                    <div className="form-group">
                        <label htmlFor="sellingItemPrice">Selling Item price</label>
                        <input type="number" className="form-control" name="sellingItemPrice" value={product.sellingItemPrice} readOnly />
                    </div>
                    <div className="form-group">
                        <label htmlFor="profitPerCtn">Profit / Ctn</label>
                        <input type="number" className="form-control" name="profitPerCtn" value={product.profitPerCtn} readOnly />
                    </div>
                    <div className="form-group">
                        <label htmlFor="profitPerItem">Profit / Item</label>
                        <input type="number" className="form-control" name="profitPerItem" value={product.profitPerItem} readOnly />
                    </div>
                    {successMsg && <p className='successMessage'>{successMsg}</p>}
                    {error && <p className='errorMessage'>{error}</p>}
                    <div className="btnsDiv">
                        <button id="editProductBtn" onClick={showModal}>Edit Product <span className="material-symbols-outlined">
                            edit
                        </span></button>
                        <button id="deleteProductBtn" onClick={handleDelete}>Delete Product <span className="material-symbols-outlined">
                            delete
                        </span></button>
                    </div>
                </form>
                {isModalOpen && <Modal title="Edit a product" body={editModalBody} state={editModalState} handleChange={(e, index)=>{handleChange(e, index)}} error={error} successMsg={successMsg} editProduct={(state) => { handleEdit(state) }} productGroupTitle={null} additionalFields={null} additionalFieldsState={null}/>}
            </section>)
    )
}

export default ProductDetails
