/* eslint-disable @next/next/no-img-element */

import { Tab } from '@headlessui/react'

import Layout from '@/components/layout/Layout.jsx'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Product({ product }) {
  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl  py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Image gallery */}
            <Tab.Group as="div" className="flex flex-col-reverse">
              {/* Image selector */}
              <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                <Tab.List className="grid grid-cols-4 gap-6">
                  {product.product.images.map((image, i) => (
                    <Tab
                      key={i}
                      className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                    >
                      {({ selected }) => (
                        <>
                          <span className="sr-only">{image.name}</span>
                          <span className="absolute inset-0 overflow-hidden rounded-md">
                            <img
                              src={image}
                              alt=""
                              className="h-full w-full object-cover object-center"
                            />
                          </span>
                          <span
                            className={classNames(
                              selected ? 'ring-blue-500' : 'ring-transparent',
                              'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </Tab>
                  ))}
                </Tab.List>
              </div>

              <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
                {product.product.images.map((image, i) => (
                  <Tab.Panel key={i}>
                    <img
                      src={image}
                      alt={image}
                      className="h-full w-full object-cover object-center sm:rounded-lg"
                    />
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>

            {/* Product info */}
            <div className="mt-10 w-full sm:mt-16 sm:px-0 lg:mt-0 lg:w-80">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                {product.product.name}
              </h1>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-lg tracking-tight text-gray-900">
                  ${product.product.price}
                </p>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>

                <div
                  className="space-y-6 text-base text-gray-700"
                  dangerouslySetInnerHTML={{
                    __html: product.product.description,
                  }}
                />
              </div>
              <div className="border-b pb-2 pt-8">
                <span className="text-lg font-bold">Details</span>
              </div>
              <div className="mt-3 flex justify-between ">
                <div className="flex w-80 flex-col gap-2 text-zinc-500">
                  {product.product.model && (
                    <span>
                      {' '}
                      <span className="font-bold">Model:</span>{' '}
                      {product.product.model}{' '}
                    </span>
                  )}
                  {product.product.make && (
                    <span>
                      <span className="font-bold">Make:</span>{' '}
                      {product.product.make}{' '}
                    </span>
                  )}
                  {product.product.type && (
                    <span>
                      <span className="font-bold">Type:</span>{' '}
                      {product.product.type}{' '}
                    </span>
                  )}
                  {product.product.year && (
                    <span>
                      <span className="font-bold">Year:</span>{' '}
                      {product.product.year}{' '}
                    </span>
                  )}
                </div>
                <div className="flex w-full flex-col items-start gap-2  text-zinc-500">
                  {product.product.color && (
                    <span>
                      <span className="font-bold">Color:</span>{' '}
                      {product.product.color}{' '}
                    </span>
                  )}

                  {product.product.condition && (
                    <span>
                      <span className="font-bold">Condition:</span>{' '}
                      {product.product.condition}{' '}
                    </span>
                  )}
                  {product.product.phone && (
                    <span>
                      <span className="font-bold">Phone:</span>{' '}
                      {product.product.phone}{' '}
                    </span>
                  )}
                  {product.product.city && (
                    <span>
                      <span className="font-bold">City:</span>{' '}
                      {product.product.city}{' '}
                    </span>
                  )}
                </div>
              </div>

              <form className="mt-6">
                <div className="sm:flex-col1 mt-10 flex">
                  <button
                    type="submit"
                    className="flex w-full  items-center justify-center rounded-md border border-transparent bg-blue-600 px-8 py-3 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                  >
                    Send offer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getStaticPaths() {
  const res = await fetch(
    `https://project4backend.herokuapp.com/api/all-products`
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
    `https://project4backend.herokuapp.com/api/get-product/${slug}`
  )
  const product = await res.json()

  return {
    props: {
      product,
    },
  }
}
