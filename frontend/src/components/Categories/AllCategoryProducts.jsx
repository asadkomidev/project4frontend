/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from '../UI/Loader.jsx'

export default function AllCategoryProducts({}) {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchProduct()
  }, [])

  const fetchProduct = async () => {
    setLoading(true)
    await axios
      .get(`${process.env.NEXT_PUBLIC_API}/api/all-products?cat=`)
      .then((res) => {
        setProducts(res.data.products)
      })
    setTimeout(() => {
      setLoading(false)
    }, 800)
  }

  return (
    <>
      {loading && <Loader />}
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-2  sm:py-1 lg:max-w-7xl ">
          <div className=" grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {products?.map((product, i) => (
              <div key={i} className="group relative">
                <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.color}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
