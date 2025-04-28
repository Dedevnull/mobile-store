import React, { useEffect, useState } from 'react';

export const Select = ({ options = [], onChange, name, value, label, placeholder }) => {
    const [selectedValue, setSelectedValue] = useState(value || '');
    const handleChange = (event) => {
        const { value } = event.target;
        setSelectedValue(value);
        if (onChange) {
            onChange({ name, value: JSON.parse(value).code });
        }
    };

    useEffect(() => {
        if (options.length === 1 && !value) {
            setSelectedValue(JSON.stringify(options[0]));
        }
    }, [options, value]);

    return (
        <div>
            {label && (
                <div>
                    <label className='font-bold text-gray-700'>{label}</label>
                </div>
            )}
            <div>

                <select
                    value={selectedValue}
                    name={name}
                    onChange={handleChange}
                    className="border mx-1 p-2 rounded-md"
                >
                    <option value="" disabled>
                        {placeholder || 'Select…'}
                    </option>
                    {options.map((option) => (
                        <option
                            key={option.code}
                            value={JSON.stringify(option)}
                        >
                            {option.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};