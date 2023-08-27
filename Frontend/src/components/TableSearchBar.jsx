import React, { useState } from "react";

const TableSearchBar = ({ tableData, setTableData, allData, fields }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedField, setSelectedField] = useState(fields[0]);

    const search = (e) => {
        const inputValue = e.target.value;
        setSearchTerm(inputValue);

        if (inputValue === '') {
            setTableData(allData);
        } else {
            const filteredData = tableData.filter((item) => {
                const fieldValue = item[selectedField];

                if (typeof fieldValue === 'number') {
                    return fieldValue.toString().includes(inputValue);
                } else {
                    return fieldValue.toLowerCase().includes(inputValue.toLowerCase());
                }
            });

            setTableData(filteredData);
        }
    }


    const handleFieldChange = (e) => {
        setSelectedField(e.target.value);
    }

    return (
        <div className="w-full">
            <form className="flex items-center justify-start gap-6">
                <label htmlFor="simple-search" className="sr-only">Search</label>

                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        id="simple-search"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-[#7e4efc] outline-none block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Search"
                        required
                        value={ searchTerm }
                        onChange={ (e) => search(e) }
                    />
                </div>
                <div className="relative w-full">
                    <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-[#7e4efc] outline-none block w-1/2 pl-2 pr-10 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        value={ selectedField }
                        onChange={ handleFieldChange }
                        style={ { marginBottom: '0' } } // Remove the bottom margin
                    >
                        { fields.map((field) => (
                            <option key={ field } value={ field }>{ field }</option>
                        )) }
                    </select>
                </div>
            </form>
        </div>
    );
};

export default TableSearchBar;
