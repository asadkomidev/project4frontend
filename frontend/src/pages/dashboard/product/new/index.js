import Layout from '@/components/layout/Layout.jsx'
import React, { useContext } from 'react'
import { useRef, useState } from 'react'

import ProductForm from '@/components/Products/Forms/ProductForm.jsx'

const NewProduct = () => {
  return (
    <Layout>
      <ProductForm title={'New Product'} />
    </Layout>
  )
}

export default NewProduct
