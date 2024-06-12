import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import "../styles/SupplyDetails.css"
import { deleteSupply, editSupply } from '../features/supplies/supplySlice';
import { openModal, closeModal } from '../features/modal/modalSlice';
import Modal from '../components/Modal';


const SupplyDetails = () => {

    const { data, isLoading, successMsg, error } = useSelector((state) => state.supply);

    const { isModalOpen } = useSelector((state) => state.modal);

    const dispatch = useDispatch();

    const location = useLocation();
    const supply = location.state;

    const navigate = useNavigate();

    const showModal = (e) => {
        e.preventDefault();
        dispatch(openModal())
    }

    const editModalBody = supply.products.map((product) => {
        return (
            [
                { label: "Name", type: "text", name: "name", value: "name", readOnly: true },
                { label: "Quantity (Ctn)", type: "text", name: "quantity", value: "quantity", readOnly: false },
                { label: "", type: "select", name: "quantityInCtn", value: "quantityInCtn", readOnly: false, options: [{ name: "Cotton", value: "cotton" }, { name: "Pieces", value: "pieces" }], defaultValue: product.quantityInCtn ? "cotton" : "pieces" },
            ]
        )
    })
    const editModalAdditionalBody = [
        { label: "Description", type: "text", name: "description", value: "description", readOnly: false },
    ]

    const [editModalState, setEditModalState] = useState(
        supply.products.map((product) => {
            let { name, quantityInCtn, quantityCtn, quantityPcs } = product;
            return {
                name: name,
                quantity: quantityInCtn ? quantityCtn : quantityPcs,
                quantityInCtn
            }
        }
        )
    )
    const [editModalAdditionalState, setEditModalAdditionalState] = useState({
        description: supply.description
    })

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        if (name === "quantity") {
            let updatedState = [...editModalState];
            updatedState[index].quantity = Number(value);
            setEditModalState(updatedState);
        }
        else if (name === "quantityInCtn") {
            let updatedState = [...editModalState];
            updatedState[index][name] = value === "cotton";
            setEditModalState(updatedState)
        }
        else if (name === "description") {
            let updatedState = { ...editModalAdditionalState };
            updatedState.description = value;
            setEditModalAdditionalState(updatedState);
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        const confirm = window.confirm(`Are you sure you want to delete the supply?`)
        if (confirm) {
            const result = await dispatch(deleteSupply(supply._id))
            if (!result.ok) {
                navigate("/admin/supplies")
            }
        }
    }

    const handleEdit = async (state, additionalState) => {
        const supplyToEdit = {
            products: state,
            description: additionalState && additionalState.description
        }
        const result = await dispatch(editSupply({ id: supply._id, supplyToEdit }));
        if (result.meta.requestStatus === "fulfilled") {
            setTimeout(() => {
                dispatch(closeModal())
                navigate("/admin/supplies")
            }, 1500)
        }
    }

    return (
        isLoading ? <Loader /> :
            (<section id='supplyDetailsSection'>
                <h2>Supply Details</h2>
                <form action="" name="supplyDetailsForm">
                    {supply.products.map((product, index) => {
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
                            </div>
                        )
                    })}
                    <div className="form-group description">
                        <label htmlFor="description">Description</label>
                        <input type="text" className="form-control" name="desciption" value={supply.description} readOnly />
                    </div>
                    <div className="form-group date">
                        <label htmlFor="date">Date</label>
                        <input type="text" className="form-control" name="date" value={supply.date} readOnly />
                    </div>


                    {successMsg && <p className='successMessage'>{successMsg}</p>}
                    {error && <p className='errorMessage'>{error}</p>}
                    <div className="btnsDiv">
                        <button id="editSupplyBtn" onClick={showModal}>Edit Supply <span className="material-symbols-outlined">
                            edit
                        </span></button>
                        <button id="deleteSupplyBtn" onClick={handleDelete}>Delete Supply <span className="material-symbols-outlined">
                            delete
                        </span></button>
                    </div>
                </form>
                {isModalOpen && <Modal title="Edit a supply" body={editModalBody} state={editModalState} handleChange={(e, index) => { handleChange(e, index) }} error={error} successMsg={successMsg} editProduct={(state, additionalState) => { handleEdit(state, additionalState) }} productGroupTitle="Product no." additionalFields={editModalAdditionalBody} additionalFieldsState={editModalAdditionalState} />}
            </section>)
    )
}


export default SupplyDetails
