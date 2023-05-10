import React from 'react'

const SelectSubCategory = ({ setSubCategory, subcategory, data }) => {
  return (
    <>
      <label
        htmlFor="price"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Sub Categories
      </label>

      <select
        required
        value={subcategory}
        onChange={(e) => setSubCategory(e.target.value)}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      >
        <option value="">Select Sub Category</option>
        {data.length > 0 &&
          data.map((category, i) => (
            <option key={i} value={category.name}>
              {category.name}
            </option>
          ))}
      </select>
    </>
  )
}

export default SelectSubCategory
