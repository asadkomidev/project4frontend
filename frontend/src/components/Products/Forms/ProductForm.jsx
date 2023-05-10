/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { ReactSortable } from 'react-sortablejs'

import axios from 'axios'
import { useRouter } from 'next/router'

import { Context } from '../../../../context/index.js'
import { FiUpload } from 'react-icons/fi'
import SelectSubCategory from '@/components/form/SelectSubCategory.jsx'

export const forsale = [
  { id: 1, name: 'Cars	+	Trucks' },
  { id: 2, name: 'Motorcycles' },
  { id: 3, name: 'Boats' },
  { id: 4, name: 'Books' },
  { id: 5, name: 'Furniture' },
]
export const housing = [
  { id: 1, name: 'Apartments' },
  { id: 2, name: 'Houses' },
  { id: 3, name: 'Room & Share' },
  { id: 4, name: 'Vacation Rental' },
  { id: 5, name: 'Parking & Storage' },
]
export const services = [
  { id: 1, name: 'Beauty Service' },
  { id: 2, name: 'Mobile Service' },
  { id: 3, name: 'Events Service' },
  { id: 4, name: 'Legal Service' },
  { id: 5, name: 'Pet Service' },
]
export const jobs = [
  { id: 1, name: 'Admin & Office' },
  { id: 2, name: 'Architect' },
  { id: 3, name: 'Engineer' },
  { id: 4, name: 'Government' },
  { id: 5, name: 'Healthcare' },
]
export const community = [
  { id: 1, name: 'Artists' },
  { id: 2, name: 'Childcare' },
  { id: 3, name: 'Pets' },
  { id: 4, name: 'Lost & Found' },
  { id: 5, name: 'Rideshare' },
]

import img from '../../../../public/logo.svg'

const ProductForm = ({ title, product }) => {
  const [name, setName] = useState(product?.name || '')
  const [description, setDescription] = useState(product?.description || '')
  const [price, setPrice] = useState(product?.price || '')
  const [model, setModel] = useState(product?.model || '')
  const [make, setMake] = useState(product?.make || '')
  const [type, setType] = useState(product?.type || '')
  const [year, setYear] = useState(product?.year || '')
  const [color, setColor] = useState(product?.color || '')
  const [condition, setCondition] = useState(product?.condition || '')
  const [city, setCity] = useState(product?.city || '')
  const [phone, setPhone] = useState(product?.phone || '')

  const [error, setError] = useState('')
  const [cat, setCat] = useState(product?.subCategory || '')
  const [subcategory, setSubCategory] = useState(product?.subCategory || '')
  const [images, setImages] = useState([])
  const [subcategories, setSubCategories] = useState([])
  const [cats, setCats] = useState([])
  const [pics, setPics] = useState(product?.images || [])

  const { state, dispatch } = useContext(Context)
  const { user } = state

  console.log('Cat: ', cat)
  console.log('Sub Cat: ', subcategory)

  const router = useRouter()

  useEffect(() => {
    fetchCategories()
    fetchSubCategories()
  }, [])

  const fetchSubCategories = async () => {
    await axios
      .get('https://project4backend.herokuapp.com/api/all-subcategories?cat=')
      .then((res) => {
        setSubCategories(res.data.subCategoryList)
      })
  }
  const fetchCategories = async () => {
    await axios
      .get('https://project4backend.herokuapp.com/api/all-categories')
      .then((res) => {
        setCats(res.data.categoryList)
      })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    let data = new FormData()
    data.append('name', name)
    data.append('description', description)
    data.append('price', price)
    data.append('category', cat)
    data.append('subCategory', subcategory)
    data.append('model', model)
    data.append('make', make)
    data.append('type', type)
    data.append('year', year)
    data.append('color', color)
    data.append('condition', condition)
    data.append('phone', phone)
    data.append('city', city)

    for (const image of images) {
      data.append('images', image)
    }
    if (images.length === 0) {
      data.append('images', img)
    }

    try {
      if (product?._id) {
        const id = product._id

        await axios.put(
          'https://project4backend.herokuapp.com/api/edit-product/' + id,
          { ...data }
        )
      } else {
        await axios.post(
          `https://project4backend.herokuapp.com/api/add-product`,
          data
        )
      }

      router.push('/dashboard')
    } catch (err) {
      setError(err)
      console.log(err)
      // setLoading(false)
    }
  }

  const uploadImages = (e) => {
    let ImagesArray = Object.entries(e.target.files).map((e) =>
      URL.createObjectURL(e[1])
    )

    setPics([...pics, ...ImagesArray])

    setImages([...images, e.target.files[0]])
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center pb-60 pt-16 sm:px-1 lg:px-1 lg:pt-40  ">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-7xl">
          <div className="pb-10">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              {title}
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
                          required
                          className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="Mac Pro - M1"
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="price"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Price
                      </label>
                      <div className="mt-2">
                        <input
                          onChange={(e) => setPrice(e.target.value)}
                          value={price}
                          type="text"
                          required
                          // name="price"
                          // id="price"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Description */}
                  <div className="col-span-full pb-2">
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Description
                    </label>
                    <div className="mt-2">
                      <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        type="text"
                        // id="description"
                        // name="description"
                        required
                        rows={3}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  {/* Model, Make */}
                  <div className="gap-4 md:flex">
                    <div className="w-full">
                      <label
                        htmlFor="price"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Model
                      </label>
                      <div className="mb-2">
                        <input
                          onChange={(e) => setModel(e.target.value)}
                          value={model}
                          type="text"
                          // name="price"
                          // id="price"

                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="price"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Make
                      </label>
                      <div className="mb-2">
                        <input
                          onChange={(e) => setMake(e.target.value)}
                          value={make}
                          type="text"
                          // name="price"
                          // id="price"

                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Type, Year */}
                  <div className="gap-4 md:flex">
                    <div className="w-full">
                      <label
                        htmlFor="type"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Type
                      </label>
                      <div className="mb-2">
                        <input
                          onChange={(e) => setType(e.target.value)}
                          value={type}
                          type="text"
                          // name="price"
                          // id="price"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="year"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Year
                      </label>
                      <div className="mb-2">
                        <input
                          onChange={(e) => setYear(e.target.value)}
                          value={year}
                          type="text"
                          // name="price"
                          // id="price"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Color, Condition */}
                  <div className="gap-4 md:flex">
                    <div className="w-full">
                      <label
                        htmlFor="color"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Color
                      </label>
                      <div className="mb-2">
                        <input
                          onChange={(e) => setColor(e.target.value)}
                          value={color}
                          type="text"
                          // name="price"
                          // id="price"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="condition"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Condition
                      </label>
                      <div className="mb-2">
                        <input
                          onChange={(e) => setCondition(e.target.value)}
                          value={condition}
                          type="text"
                          // name="price"
                          // id="price"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Phone, City */}
                  <div className="gap-4 md:flex">
                    <div className="w-full">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone
                      </label>
                      <div className="mb-2">
                        <input
                          onChange={(e) => setPhone(e.target.value)}
                          value={phone}
                          type="text"
                          // name="price"
                          // id="price"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mb-2">
                        <input
                          onChange={(e) => setCity(e.target.value)}
                          value={city}
                          type="text"
                          // name="price"
                          // id="price"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>

                  {/* City */}
                  <div className="gap-4 md:flex">
                    <div className="w-full">
                      <label
                        htmlFor="price"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Category
                      </label>

                      <select
                        required
                        value={cat}
                        onChange={(e) => setCat(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      >
                        <option value="">Select Category</option>
                        {cats.length > 0 &&
                          cats.map((category) => (
                            <option key={category._id} value={category.name}>
                              {category.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="w-full">
                      {cat && cat === 'For Sale' && (
                        <SelectSubCategory
                          setSubCategory={setSubCategory}
                          subcategory={subcategory}
                          data={forsale}
                        />
                      )}
                      {cat && cat === 'Housing' && (
                        <SelectSubCategory
                          setSubCategory={setSubCategory}
                          subcategory={subcategory}
                          data={housing}
                        />
                      )}
                      {cat && cat === 'Services' && (
                        <SelectSubCategory
                          setSubCategory={setSubCategory}
                          subcategory={subcategory}
                          data={services}
                        />
                      )}
                      {cat && cat === 'Jobs' && (
                        <SelectSubCategory
                          setSubCategory={setSubCategory}
                          subcategory={subcategory}
                          data={jobs}
                        />
                      )}
                      {cat && cat === 'Community' && (
                        <SelectSubCategory
                          setSubCategory={setSubCategory}
                          subcategory={subcategory}
                          data={community}
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="w-full ">
                  <label
                    htmlFor="photos"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Photos
                  </label>
                  <div className="mt-2  flex-wrap gap-4 lg:flex">
                    <div className="flex  flex-wrap gap-4 ">
                      {pics.length > 0 &&
                        pics.map((item, i) => {
                          return (
                            <div className="" key={i}>
                              <img
                                className="h-32 rounded-md lg:h-40  "
                                src={item}
                                alt=""
                              />
                            </div>
                          )
                        })}
                      <div>
                        <label className="flex h-32 w-32  cursor-pointer items-center justify-center gap-4 rounded-md border bg-zinc-100 text-zinc-400 lg:h-40 lg:w-40">
                          <FiUpload size={24} />
                          <div>Upload</div>
                          <input
                            type="file"
                            className="hidden"
                            onChange={uploadImages}
                          />
                        </label>
                      </div>
                    </div>
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
                  <a
                    href="/dashboard"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Cancel
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductForm
