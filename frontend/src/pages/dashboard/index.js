import DashboardHeader from '@/components/dashboard/DashboardHeader.jsx'
import Layout from '@/components/layout/Layout.jsx'
import React from 'react'

import { Fragment } from 'react'

import { Tab } from '@headlessui/react'
import Products from '@/components/Products/Products.jsx'
import UserRoute from '../../../routes/UserRoute.js'
import Category from '@/components/Categories/Category.jsx'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Dashboard = ({ products, categories, subcategories }) => {
  return (
    <UserRoute>
      <Layout>
        <DashboardHeader />
        <div className="mx-auto mt-16  w-full max-w-7xl lg:col-span-4 lg:mt-0 lg:max-w-7xl">
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
                  Categories
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

              <Tab.Panel className="pt-10">
                <h3 className="sr-only">Frequently Asked Questions</h3>

                <Category
                  categories={categories.categoryList}
                  subcategories={subcategories.subCategoryList}
                />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </Layout>
    </UserRoute>
  )
}

export default Dashboard

export async function getServerSideProps() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ABS_URL}/all-products?cat=`
  )
  const products = await res.json()
  const cat = await fetch(`${process.env.NEXT_PUBLIC_ABS_URL}/all-categories`)
  const categories = await cat.json()
  const subcat = await fetch(
    `${process.env.NEXT_PUBLIC_ABS_URL}/all-subcategories?cat=`
  )
  const subcategories = await subcat.json()

  return {
    props: { products, categories, subcategories },
  }
}
