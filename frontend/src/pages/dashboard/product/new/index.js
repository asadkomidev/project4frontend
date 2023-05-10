import Layout from '@/components/layout/Layout.jsx'
import React, { useContext } from 'react'
import { useRef, useState } from 'react'

import ProductForm from '@/components/Products/Forms/ProductForm.jsx'

const NewProduct = () => {
  return (
    <>
      <ProductForm title={'New Product'} />
    </>
  )
}

export default NewProduct
