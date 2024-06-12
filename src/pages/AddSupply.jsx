import React, { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addSupply } from '../features/supplies/supplySlice'
import "../styles/AddSupply.css"
import Loader from '../components/Loader'
import DropdownInput from '../components/DropdownInput'
import { filterProductsNames, getProductsNames } from '../features/products/productsSlice'


const AddSupply = () => {

  const [supply, setSupply] = useState({
    products: [
      {
        name: '',
        quantity: 0,
        quantityInCtn: true
      }
    ],
    description: ""
  })

  const [inputs, setInputs] = useState([1])

  const [descriptionLength, setDescriptionLength] = useState(0)

  const { data, error, successMsg, isLoading } = useSelector((state) => state.supply);

  const productsNames = useSelector((state) => state.products.data)

  const dispatch = useDispatch();

  const handleChange = (name, value, index) => {
    const updatedSupply = { ...supply }
    updatedSupply.products[index][name] = value
    setSupply(updatedSupply)
    console.log(updatedSupply)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // If the description of supply is empty then set it to "No description"
    if (supply.description.trim() === "") supply.description = "No description";
    const result = await dispatch(addSupply(supply))
    if (!result.error) {
      setSupply({
        products: [
          {
            name: '',
            quantity: 0,
          }
        ],
        description: ""
      })
      setInputs([1])
    }
  }

  const addProduct = (e) => {
    e.preventDefault()
    setInputs(inputs.concat(inputs.length + 1));
    supply.products.push({
      name: '',
      quantity: 0
    });
  }

  useMemo(() => {
    dispatch(getProductsNames())
  }, [dispatch])

  return (
    isLoading ? <Loader /> :
      (<section id='addSupplySection'>
        <form action="" name="addSupplyForm">
          {inputs.map((input, index) => {
            return (
              <div className="product-group" key={input}>
                <h3>Product No. {input}</h3>
                <DropdownInput
                  label='Name'
                  options={productsNames}
                  onChange={(value) => handleChange('name', value, index)}
                  filterInputOnChange={(e) => {
                    dispatch(filterProductsNames(e.target.value))
                  }}
                />
                <div className="form-group quantityCtn">
                  <label htmlFor="quantityCtn">Quantity</label>
                  <input type="number" className="form-control" name="quantityCtn" placeholder='Quantity (In Ctn)' value={supply.products[index].quantity} onChange={(e) => { handleChange("quantity", Number(e.target.value), index) }} />
                </div>
                <div className="form-group quantityInCtn">
                  <select name="quantityInCtn" id="quantityInCtn" onChange={(e) => { handleChange("quantityInCtn", e.target.value === 'cotton', index) }}>
                    <option value='cotton' defaultValue>Cotton</option>
                    <option value='pieces'>Pieces</option>
                  </select>
                </div>
              </div>
            )
          })}
          <div className="form-group description">
            <label htmlFor="description">Description <i>(Optional)</i></label>
            <input type="text" className="form-control" name="desciption" maxLength={80} value={supply.description} onChange={(e) => {
              setSupply({ ...supply, description: e.target.value })
              setDescriptionLength(e.target.value.length)
            }} />
            <p className="descriptionLength">{descriptionLength} / 80</p>
          </div>
          {successMsg && <p className='successMessage'>{successMsg}</p>}
          {error && <p className='errorMessage'>{error}</p>}
          <button className='addBtn' type='submit' id='addSupplyBtn' onClick={handleSubmit} disabled={supply.products.some((product) => product.name === '')}>Add supply</button>
        </form>
        <button className="addBtn" onClick={addProduct}>
          Add one more Product
        </button>
      </section>)
  )
}

export default AddSupply
