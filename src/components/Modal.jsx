import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { closeModal } from '../features/modal/modalSlice'
import "../styles/Modal.css"

const Modal = (props) => {
    const dispatch = useDispatch();

    const { title, body = [], state, handleChange, error, successMsg, editProduct, productGroupTitle, additionalFields, additionalFieldsState } = props

    const onSubmit = (e) => {
        e.preventDefault();
        editProduct(state, additionalFieldsState)
    }

    return (
        <section id='modal'>
            <div id="modalOverlay">
                <div id="modalContainer">
                    <button onClick={() => dispatch(closeModal())} id='closeModalButton'><span className="material-symbols-outlined">
                        close
                    </span></button>
                    <h2>
                        {title}
                    </h2>
                    <form action="" onSubmit={onSubmit}>
                        {body.map((productGroup, index) => {
                            return (
                                <div className="product-group" key={index}>
                                    {productGroupTitle && <h3>{productGroupTitle} {index + 1}</h3>}
                                    {productGroup.map((item, uniqueKey) => {
                                        if (item.type==="select") {
                                            return (
                                                <div className="form-group" key={uniqueKey}>
                                                    <select name={item.name} id={item.name} onChange={(e)=>{handleChange(e, index)}} defaultValue={item.defaultValue} required>
                                                        {item.options.map((option, uniqueKey)=>{
                                                            return <option key={uniqueKey} value={option.value}>{option.name}</option>
                                                        })}
                                                    </select>
                                                    </div>
                                                    )
                                        }
                                        let { name, type, label, value, readOnly } = item;
                                        return (
                                            <div className="form-group" key={uniqueKey} name={name}>
                                                <label htmlFor={name}>{label}</label>
                                                <input type={type} className="form-control" name={name} value={state[index][value]} onChange={!readOnly ? (e) => { handleChange(e, index) } : undefined} readOnly={readOnly} />
                                            </div>
                                        )
                                    }
                                    )
                                    }
                                </div>
                            )
                        })}
                        {additionalFields && additionalFields.map((item, uniqueKey) => {
                            let { name, type, label, value, readOnly } = item;
                            return (
                                <div className="form-group" key={uniqueKey} name={name}>
                                    <label htmlFor={name}>{label}</label>
                                    <input type={type} className="form-control" name={name} value={additionalFieldsState[value]} onChange={!readOnly ? handleChange : undefined} readOnly={readOnly} />
                                </div>
                            )
                        })}
                        <div className="btnsDiv">
                            <button id="cancelBtn" type='button' onClick={() => { dispatch(closeModal()) }}>Cancel</button>
                            <button id="saveChangesBtn" type='submit'>Save Changes</button>
                        </div>
                    </form>
                    {error && <p className='errorMessage'>{error}</p>}
                    {successMsg && <p className='successMessage'>{successMsg}</p>}
                </div>
            </div>
        </section>
    )
}

export default Modal
