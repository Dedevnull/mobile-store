import React, { useEffect, useState } from 'react';

export const Select = ({ options = [], onChange, name, label, placeholder }) => {
    const [selectedValue, setSelectedValue] = useState('');
    const handleChange = (event) => {
        const { value } = event.target;
        setSelectedValue(value);
        if (onChange) {
            onChange({ name, value: JSON.parse(value).code });
        }
    };

    useEffect(() => {
        if (options.length === 1) {
            setSelectedValue(JSON.stringify(options[0]));
        }
    }, [options]);

    return (
        <div>
            {label && (
                <div>
                    <label className='font-bold text-gray-700'>{label}</label>
                </div>
            )}
            <select
                value={selectedValue}
                name={name}
                onChange={handleChange}
                className="border mx-1 p-2 rounded-md"
            >
                <option value="" disabled>
                    {placeholder || 'Select…'}
                </option>
                {options.map((option,index) => (
                    <option
                        key={`${name}_${option.code}_${index}`}
                        value={JSON.stringify(option)}
                    >
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
};