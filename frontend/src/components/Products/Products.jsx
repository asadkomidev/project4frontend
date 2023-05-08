import React from 'react'
import ProductTable from './ProductTable.jsx'

const Products = ({ products, categories }) => {
  return (
    <>
      <ProductTable products={products} categories={categories} />
    </>
  )
}

export default Products
