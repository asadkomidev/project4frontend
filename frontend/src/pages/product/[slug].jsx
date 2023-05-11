/* eslint-disable @next/next/no-img-element */
import { Tab } from '@headlessui/react'
import axios from 'axios'
import { useRouter } from 'next/router.js'
import { useEffect, useState } from 'react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Product({ product }) {
  const p = product.product

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
                  {p?.images?.map((image, i) => (
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
                {p?.images?.map((image, i) => (
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

            {/* p info */}
            <div className="mt-10 w-full sm:mt-16 sm:px-0 lg:mt-0 lg:w-80">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                {p?.name}
              </h1>

              <div className="mt-3">
                <h2 className="sr-only">p information</h2>
                <p className="text-lg tracking-tight text-gray-900">
                  ${p?.price}
                </p>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>

                <div
                  className="space-y-6 text-base text-gray-700"
                  dangerouslySetInnerHTML={{
                    __html: p?.description,
                  }}
                />
              </div>
              <div className="border-b pb-2 pt-8">
                <span className="text-lg font-bold">Details</span>
              </div>
              <div className="mt-3 flex justify-between ">
                <div className="flex w-80 flex-col gap-2 text-zinc-500">
                  {p?.model && (
                    <span>
                      {' '}
                      <span className="font-bold">Model:</span> {p?.model}{' '}
                    </span>
                  )}
                  {p?.make && (
                    <span>
                      <span className="font-bold">Make:</span> {p?.make}{' '}
                    </span>
                  )}
                  {p?.type && (
                    <span>
                      <span className="font-bold">Type:</span> {p?.type}{' '}
                    </span>
                  )}
                  {p?.year && (
                    <span>
                      <span className="font-bold">Year:</span> {p?.year}{' '}
                    </span>
                  )}
                </div>
                <div className="flex w-full flex-col items-start gap-2  text-zinc-500">
                  {p?.color && (
                    <span>
                      <span className="font-bold">Color:</span> {p?.color}{' '}
                    </span>
                  )}

                  {p?.condition && (
                    <span>
                      <span className="font-bold">Condition:</span>{' '}
                      {p?.condition}{' '}
                    </span>
                  )}
                  {p?.phone && (
                    <span>
                      <span className="font-bold">Phone:</span> {p?.phone}{' '}
                    </span>
                  )}
                  {p?.city && (
                    <span>
                      <span className="font-bold">City:</span> {p?.city}{' '}
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

// export async function getStaticPaths() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/all-products`)
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
