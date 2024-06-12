import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { useLocation, useNavigate } from 'react-router-dom'
import "../styles/SaleDetails.css"
import { deleteSale, editSale, generateBill } from '../features/sales/saleSlice'
import { openModal, closeModal } from '../features/modal/modalSlice'
import Modal from '../components/Modal'


const SaleDetails = () => {

  const { data, isLoading, successMsg, error } = useSelector((state) => state.sale);

  const { isModalOpen } = useSelector((state) => state.modal);

  const dispatch = useDispatch();

  const location = useLocation();
  const sale = location.state;

  const navigate = useNavigate();

  const showModal = (e) => {
    e.preventDefault();
    dispatch(openModal())
  }

  const editModalBody = sale.products.map((product) => {
    return (
      [
        { label: "Name", type: "text", name: "name", value: "name", readOnly: true },
        { label: "Quantity", type: "text", name: "quantity", value: "quantity", readOnly: false },
        { label: "", type: "select", name: "quantityInCtn", value: "quantityInCtn", readOnly: false, options: [{ name: "Cotton", value: "cotton" }, { name: "Pieces", value: "pieces" }], defaultValue: product.quantityInCtn ? "cotton" : "pieces" },
        { label: "Discount (%)", type: "text", name: "discount", value: "discount", readOnly: false },
        { label: "Trade Offer (Rs)", type: "text", name: "tradeOffer", value: "tradeOffer", readOnly: false },
      ]
    )
  })
  const editModalAdditionalBody = [
    { label: "Address", type: "text", name: "address", value: "deliveredTo", readOnly: false },
  ]

  const [editModalState, setEditModalState] = useState(
    sale.products.map((product) => {
      let { name, quantityCtn, quantityPcs, discount, tradeOffer, quantityInCtn } = product
      return {
        name,
        quantity: quantityInCtn ? quantityCtn : quantityPcs,
        quantityInCtn,
        discount,
        tradeOffer
      }
    }
    )
  )
  const [editModalAdditionalState, setEditModalAdditionalState] = useState({
    deliveredTo: sale.deliveredTo
  })

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "discount" || name === "tradeOffer" || name === "quantity") {
      let updatedState = [...editModalState];
      updatedState[index][name] = Number(value);
      setEditModalState(updatedState);
    }
    else if (name === "quantityInCtn") {
      let updatedState = [...editModalState];
      updatedState[index][name] = value === "cotton";
      setEditModalState(updatedState)
    }
    else if (name === "address") {
      let updatedState = { ...editModalAdditionalState };
      updatedState.deliveredTo = value;
      setEditModalAdditionalState(updatedState);
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    const confirm = window.confirm(`Are you sure you want to delete the sale?`)
    if (confirm) {
      const result = await dispatch(deleteSale(sale._id))
      if (!result.ok) {
        navigate("/admin/sales")
      }
    }
  }

  const handleEdit = async (state, additionalState) => {
    const saleToEdit = {
      products: state,
      deliveredTo: additionalState && additionalState.deliveredTo
    }
    const result = await dispatch(editSale({ id: sale._id, saleToEdit }));
    if (result.meta.requestStatus === "fulfilled") {
      setTimeout(() => {
        dispatch(closeModal())
        navigate("/admin/sales")
      }, 1500)
    }
  }

  const printBill = async (e) => {
    e.preventDefault();
    dispatch(generateBill(sale._id))
  }

  return (
    isLoading ? <Loader /> :
      (<section id='saleDetailsSection'>
        <h2>Sale Details</h2>
        <form action="" name="saleDetailsForm">
          {sale.products.map((product, index) => {
            return (
              <div className="product-group" key={index}>
                <h3>Product No. {index + 1}</h3>
                <div className="form-group name">
                  <label htmlFor="name">Name</label>
                  <input type="text" className="form-control" name="name" value={product.name} readOnly />
                </div>
                <div className="form-group quantityCtn">
                  <label htmlFor="quantityCtn">Quantity (Ctn)</label>
                  <input type="text" className="form-control" name="quantityCtn" value={product.quantityCtn} readOnly />
                </div>
                <div className="form-group quantityPcs">
                  <label htmlFor="quantityPcs">Quantity (Pcs)</label>
                  <input type="text" className="form-control" name="quantityPcs" value={product.quantityPcs} readOnly />
                </div>
                <div className="form-group discount">
                  <label htmlFor="discount">Discount (%)</label>
                  <input type="text" className="form-control" name="discount" value={product.discount} readOnly />
                </div>
                <div className="form-group tradeOffer">
                  <label htmlFor="tradeOffer">Trade Offer (Rs)</label>
                  <input type="text" className="form-control" name="tradeOffer" value={product.tradeOffer} readOnly />
                </div>
                <div className="form-group amount">
                  <label htmlFor="amount">Amount (Rs)</label>
                  <input type="text" className="form-control" name="amount" value={product.amount} readOnly />
                </div>
              </div>
            )
          })}
          <div className="form-group address">
            <label htmlFor="address">Address</label>
            <input type="text" className="form-control" name="address" value={sale.deliveredTo} readOnly />
          </div>
          <div className="form-group totalAmount">
            <label htmlFor="totalAmount">Total Amount (Rs)</label>
            <input type="text" className="form-control" name="totalAmount" value={sale.totalAmount} readOnly />
          </div>
          <div className="form-group date">
            <label htmlFor="date">Date</label>
            <input type="text" className="form-control" name="date" value={sale.date} readOnly />
          </div>


          {successMsg && <p className='successMessage'>{successMsg}</p>}
          {error && <p className='errorMessage'>{error}</p>}
          <div className="btnsDiv">
            <button id="generateBillBtn" onClick={printBill}>Generate Bill <span className="material-symbols-outlined">
              payments
            </span></button>
            <button id="editSaleBtn" onClick={showModal}>Edit Sale <span className="material-symbols-outlined">
              edit
            </span></button>
            <button id="deleteSaleBtn" onClick={handleDelete}>Delete Sale <span className="material-symbols-outlined">
              delete
            </span></button>
          </div>
        </form>
        {isModalOpen && <Modal title="Edit a sale" body={editModalBody} state={editModalState} handleChange={(e, index) => { handleChange(e, index) }} error={error} successMsg={successMsg} editProduct={(state, additionalState) => { handleEdit(state, additionalState) }} productGroupTitle="Product no." additionalFields={editModalAdditionalBody} additionalFieldsState={editModalAdditionalState} />}
      </section>)
  )
}

export default SaleDetails
