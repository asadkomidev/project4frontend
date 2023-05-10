/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'

import axios from 'axios'
import { useRouter } from 'next/router'

import { Context } from '../../../../context/index.js'

import SubCategoryForm from '@/components/SubCategory/Forms/SubCategoryForm.jsx'

const CategoryForm = ({ title, product }) => {
  const [name, setName] = useState(product?.name || '')
  const [parent, setParent] = useState(product?.category || '')
  const [categories, setCategories] = useState([])

  const { state, dispatch } = useContext(Context)
  const { user } = state

  const router = useRouter()

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API}/api/all-categories`)
      .then((res) => {
        setCategories(res.data.categoryList)
      })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (product?._id) {
        const id = product._id

        // await axios.put('/api/edit-product/' + id, { ...data })
      } else {
        await axios.post(`/api/add-category`, {
          name,
        })

        setName('')
        setParent('')
        // console.log(data)
      }

      router.push('/dashboard')
    } catch (err) {
      // setError(err)
      console.log(err)
      // setLoading(false)
    }
  }

  return (
    <>
      <div className="flex  flex-1 flex-col justify-center pb-10  sm:px-1 lg:px-1  ">
        <div className="sm:mx-auto sm:w-full sm:max-w-7xl">
          <div className="pb-3 pt-10">
            <h2 className="text-lg font-bold leading-7 text-gray-900 sm:truncate sm:text-lg sm:tracking-tight">
              Add Category
            </h2>
          </div>
          <div className="flex rounded-lg border border-zinc-200  px-4 py-12 ">
            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col  gap-10  "
            >
              <div className="gap-10 lg:flex">
                <div className="w-full ">
                  {/* Name, Price */}
                  <div className="items-center  justify-center gap-4 pb-2 md:flex">
                    <div className="w-full">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Name
                      </label>
                      <div className="mt-2">
                        <input
                          onChange={(e) => setName(e.target.value)}
                          value={name}
                          type="name"
                          // name="name"
                          // id="name"
                          className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="Mac Pro - M1"
                        />
                      </div>
                    </div>
                    {/* <div className="w-full">
                      <label
                        htmlFor="price"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Category
                      </label>
                      <div className="mt-2">
                        <select
                          value={parent}
                          onChange={(e) => setParent(e.target.value)}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                          <option value="">No category</option>
                          {categories.length > 0 &&
                            categories.map((category) => (
                              <option key={category._id} value={category._id}>
                                {category?.parent?.name}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
              <div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <SubCategoryForm />
    </>
  )
}

export default CategoryForm
