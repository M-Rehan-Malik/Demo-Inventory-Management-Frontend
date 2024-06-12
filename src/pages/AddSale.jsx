import React, { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addSale } from '../features/sales/saleSlice'
import { filterProductsNames, getProductsNames } from '../features/products/productsSlice'
import Loader from '../components/Loader'
import DropdownInput from '../components/DropdownInput'
import "../styles/AddSale.css"



const AddSale = () => {

  const [sale, setSale] = useState({
    products: [
      {
        name: '',
        quantity: 0,
        discount: 0,
        tradeOffer: 0,
        quantityInCtn: true
      }
    ],
    deliveredTo: ""
  })

  const [inputs, setInputs] = useState([1])

  const [addressLength, setAddressLength] = useState(0)

  const { data, error, successMsg, isLoading } = useSelector((state) => state.sale);

  const productsNames = useSelector((state) => state.products.data)

  const dispatch = useDispatch();

  const handleChange = (name, value, index) => {
    const updatedSale = { ...sale }
    updatedSale.products[index][name] = value
    setSale(updatedSale)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(addSale(sale))
    if (!result.error) {
      setSale({
        products: [
          {
            name: '',
            quantity: 0,
            discount: 0,
            tradeOffer: 0,
            quantityInCtn: true
          }
        ],
        deliveredTo: ""
      })
      setInputs([1])
    }
  }

  const addProduct = (e) => {
    e.preventDefault()
    setInputs(inputs.concat(inputs.length + 1));
    sale.products.push({
      name: '',
      quantity: 0,
      discount: 0,
      tradeOffer: 0,
      quantityInCtn: true
    });
  }

  const removeProduct = (index) => {
    if (inputs.length !== 1) {
      const newInputs = inputs.filter((input) => input !== index + 1)
      setInputs(newInputs)
      const updatedSale = { ...sale };
      updatedSale.products = updatedSale.products.filter((product, i) =>  {
       return i !== index
      });
      setSale(updatedSale)
    }
  }
  useMemo(() => {
    dispatch(getProductsNames())
  }, [dispatch])

  return (
    isLoading ? <Loader /> :
      (<section id='addSaleSection'>
        <form action="" name="addSaleForm">
          {inputs.map((input, index) => {
            return (
              <div className="product-group" key={index}>
                <h3>Product No. {index + 1}</h3>
                <span className="material-symbols-outlined" id='removeProduct' onClick={() => { removeProduct(index) }}>
                  close
                </span>
                <DropdownInput
                  label='Name'
                  options={productsNames}
                  onChange={(value) => handleChange('name', value, index)}
                  filterInputOnChange={(e) => { dispatch(filterProductsNames(e.target.value)) }}
                />
                <div className="form-group quantity">
                  <label htmlFor="quantity">Quantity</label>
                  <input type="number" className="form-control" name="quantity" placeholder='Quantity' value={sale.products[index].quantity} onChange={(e) => { handleChange("quantity", Number(e.target.value), index) }} />
                </div>
                <div className="form-group quantityInCtn">
                  <select name="quantityInCtn" id="quantityInCtn" onChange={(e) => { handleChange("quantityInCtn", e.target.value === 'cotton', index) }}>
                    <option value='cotton' defaultValue>Cotton</option>
                    <option value='pieces'>Pieces</option>
                  </select>
                </div>
                <div className="form-group discount">
                  <label htmlFor="discount">Discount (%)</label>
                  <input type="number" className="form-control" name="discount" placeholder='Discount (in Rs.)' value={sale.products[index].discount} onChange={(e) => { handleChange("discount", Number(e.target.value), index) }} />
                </div>
                <div className="form-group tradeOffer">
                  <label htmlFor="tradeOffer">Trade Offer (Rs)</label>
                  <input type="number" className="form-control" name="tradeOffer" placeholder='Trade Offer (in Rs.)' value={sale.products[index].tradeOffer} onChange={(e) => { handleChange("tradeOffer", Number(e.target.value), index) }} />
                </div>
              </div>
            )
          })}
          <div className="form-group address">
            <label htmlFor="address">Address</label>
            <input type="text" className="form-control" name="address" maxLength={80} value={sale.deliveredTo} onChange={(e) => {
              setSale({ ...sale, deliveredTo: e.target.value })
              setAddressLength(e.target.value.length)
            }} />
            <p className="addressLength">{addressLength} / 80</p>
          </div>
          {successMsg && <p className='successMessage'>{successMsg}</p>}
          {error && <p className='errorMessage'>{error}</p>}
          <button className='addBtn' type='submit' id='addSaleBtn' onClick={handleSubmit} disabled={sale.products.some((product) => product.name === '') || sale.deliveredTo.trim().length === 0}>Add sale</button>
        </form>
        <button className="addBtn" onClick={addProduct} disabled={inputs.length >= 15}>
          Add one more Product
        </button>
      </section>)
  )

}

export default AddSale
