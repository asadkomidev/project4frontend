import React, { Fragment} from 'react'
import { Tab } from '@headlessui/react'

import DashboardHeader from '@/components/dashboard/DashboardHeader.jsx'
import Products from '@/components/Products/Products.jsx'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Dashboard = ({ products, categories, subcategories }) => {
  return (
    // <UserRoute>
    <>
      <DashboardHeader />
      <div className="mx-auto  w-full max-w-7xl lg:col-span-4 lg:mt-0 lg:max-w-7xl">
        <Tab.Group as="div">
          <div className="border-b border-gray-200">
            <Tab.List className="-mb-px flex space-x-8">
              <Tab
                className={({ selected }) =>
                  classNames(
                    selected
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800',
                    'whitespace-nowrap border-b-2 py-6 text-sm font-medium'
                  )
                }
              >
                Products
              </Tab>
            </Tab.List>
          </div>
          <Tab.Panels as={Fragment}>
            <Tab.Panel className="pt-10">
              <h3 className="sr-only">Products</h3>

              <Products
                products={products.products}
                categories={categories.categoryList}
              />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
    // </UserRoute>
  )
}

export default Dashboard

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/all-products?cat=`)
  const products = await res.json()
  const cat = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/all-categories`
  )
  const categories = await cat.json()
  const subcat = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/all-subcategories?cat=`
  )
  const subcategories = await subcat.json()

  return {
    props: { products, categories, subcategories },
  }
}
