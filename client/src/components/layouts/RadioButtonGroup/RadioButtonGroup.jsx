import React, { useState } from 'react'
import axios from 'axios';
import { ButtonUI } from '../../UI/ButtonUI/ButtonUI'
import { InputUI } from '../../UI/InputUI/InputUI';

export const RadioButtonGroup = ({ groupId ,onOptionChange }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionChange = (e) => {
      const selectedValue = e.target.value;
      setSelectedOption(selectedValue);
      onOptionChange(groupId, selectedValue);
    };

    return (
        <div className='containerOptions'>
            <p>Elige el rol:</p>
            <label>
            <InputUI 
                typeInpt='radio'
                nameInpt={`radioGroup-${groupId}`}
                valueInpt="Mesero"
                checked={selectedOption === 'Mesero'}
                eventInpt={handleOptionChange}
            />
                <span className="radio-text">Mesero</span>
            </label>
            <label>
            <InputUI 
                typeInpt='radio'
                nameInpt={`radioGroup-${groupId}`}
                valueInpt="Jefe de cocina"
                checked={selectedOption === 'Jefe de cocina'}
                eventInpt={handleOptionChange}
            />
                <span className="radio-text">Jefe de cocina</span>
            </label>
            {/* <ButtonUI text='Asignar' style='btnAssignRole' onClicks={assignRole} /> */}
        </div>
    )
}
