import React from 'react'
import CategoryTable from './CategoryTable.jsx'
import CategoryForm from './Forms/CategoryForm.jsx'

const Category = ({ categories, subcategories }) => {
  return (
    <>
      <div className="gap-10 lg:flex">
        <div className="w-full ">
          <CategoryTable
            categories={categories}
            subcategories={subcategories}
          />
        </div>
        <div className="w-full ">
          <CategoryForm />
        </div>
      </div>
    </>
  )
}

export default Category
