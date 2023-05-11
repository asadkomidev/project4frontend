import React from 'react'

import ProductForm from '@/components/Products/Forms/ProductForm.jsx'

const EditProduct = ({ product }) => {
  return (
    <>
      <ProductForm product={product.product} title={'Edit Product'} />
    </>
  )
}

export default EditProduct

// export async function getStaticPaths() {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API}/api/all-products?cat=`
//   )
//   const { products } = await res.json()

//   const paths = products.map((product) => ({
//     params: { slug: product.slug },
//   }))

//   return {
//     paths,
//     fallback: false,
//   }
// }

// export async function getStaticProps({ params: { slug } }) {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API}/api/get-product/${slug}`
//   )
//   const product = await res.json()

//   return {
//     props: {
//       product,
//     },
//   }
// }

export async function getServerSideProps({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/get-product/${params.slug}`
  )
  const product = await res.json()

  return {
    props: { product },
  }
}
