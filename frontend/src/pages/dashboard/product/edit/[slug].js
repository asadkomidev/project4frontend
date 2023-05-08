import React, { useState } from 'react'
import Layout from '@/components/layout/Layout.jsx'

import ProductForm from '@/components/Products/Forms/ProductForm.jsx'

const EditProduct = ({ product }) => {
  // console.log('Product Image', product.product.images[0].img)
  return (
    <Layout>
      <ProductForm product={product.product} title={'Edit Product'} />
    </Layout>
  )
}

export default EditProduct

export async function getStaticPaths() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ABS_URL}/all-products?cat=`
  )
  const { products } = await res.json()

  const paths = products.map((product) => ({
    params: { slug: product.slug },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ABS_URL}/get-product/${slug}`
  )
  const product = await res.json()

  return {
    props: {
      product,
    },
  }
}
