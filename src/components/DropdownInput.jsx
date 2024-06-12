import React, { useState } from 'react'
import "../styles/DropdownInput.css"

const DropdownInput = (props) => {

    const options = props.options

    const [selectedValue, setSelectedValue] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    const handleInputChange = (event) => {
        const value = event.target.value;
        if (options.includes(value)) {
            setSelectedValue(value);
        }
    };

    const handleOptionClick = (option) => {
        setSelectedValue(option);
        setShowDropdown(false);
        props.onChange(option)
    };

    const handleInputClick = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div className="custom-dropdown">
            <label htmlFor="selectname">{props.label}</label>
            <input
                type="text"
                value={selectedValue}
                onChange={handleInputChange}
                onClick={handleInputClick}
                placeholder="Select name"
                readOnly
            />
            {showDropdown && (
                <ul className="dropdown-options">
                    <input type="search" placeholder='Enter product name to search' onChange={(e) => { props.filterInputOnChange(e)}} className='searchProductInput' />
                    {options.length === 0 ? <p style={{ color: "red", textAlign: "center", margin: "20px 0px" }}>No products found</p> :

                        (options.map((option, index) => (
                            <li key={index} onClick={() => handleOptionClick(option)}>
                                {option}
                            </li>
                        )))}
                </ul>
            )}
        </div>
    );
};


export default DropdownInput
