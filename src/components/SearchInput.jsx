import React from 'react';

export const SearchInput = ({ onSearch, value }) => {

    const onChange = (event) => {
        const { target } = event;
        onSearch(target.value);
    };

    return (
        <input
            placeholder='Search'
            value={value}
            onChange={onChange}
            className="w-100 h-[50px] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition placeholder-gray-400"
        />
    );
};
