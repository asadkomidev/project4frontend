import { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import { Dialog, Disclosure, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/20/solid'
import ProductList from '../Products/ProductList.jsx'
import Loader from '../UI/Loader.jsx'
import AllCategoryProducts from '../Categories/AllCategoryProducts.jsx'

export default function CategoryFilter({ cid }) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [id, setId] = useState('')

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchCategories()
  }, [cid])

  const fetchCategories = async () => {
    setLoading(true)
    await axios.get(`/api/all-subcategories?cat=${cid}`).then((res) => {
      setCategories(res.data.subCategoryList)
    })
    setTimeout(() => {
      setLoading(false)
    }, 800)
  }

  return (
    <>
      {loading && <Loader />}
      <div className="bg-white">
        <div>
          {/* Mobile filter dialog */}
          <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-40 lg:hidden"
              onClose={setMobileFiltersOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg font-medium text-gray-900">
                        Filters
                      </h2>
                      <button
                        type="button"
                        className="-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="ml-4 mt-10">
                      {categories.map((c, i) => (
                        <form
                          key={i}
                          className=" space-y-2 divide-y divide-gray-200"
                        >
                          <Disclosure as="div" className=" border-gray-200 ">
                            {({ open }) => (
                              <div>
                                <div className={i === 0 ? null : 'pt-2'}>
                                  <fieldset key={c.i}>
                                    <div className="space-y-3 ">
                                      <input
                                        id={`${c.id}-${i}`}
                                        name={`${c._id}[]`}
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      />
                                      <label
                                        htmlFor={`${c._id}-${i}`}
                                        className="ml-3 text-sm text-gray-600"
                                      >
                                        {c.name}
                                      </label>
                                    </div>
                                  </fieldset>
                                </div>
                              </div>
                            )}
                          </Disclosure>
                        </form>
                      ))}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          <main className="mx-auto max-w-7xl lg:max-w-7xl  ">
            <div className="border-b border-gray-200 pb-10">
              <h1 className="text-xl font-bold tracking-tight text-gray-900">
                For Sale
              </h1>
            </div>

            <div className=" pt-12 lg:grid lg:grid-cols-4 lg:gap-x-8  xl:grid-cols-4">
              <aside>
                <h2 className="sr-only">Filters</h2>

                <button
                  type="button"
                  className="inline-flex items-center lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="text-sm font-medium text-gray-700">
                    Filters
                  </span>
                  <PlusIcon
                    className="ml-1 h-5 w-5 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                </button>

                <div className="hidden  max-w-xl lg:block">
                  {categories.map((c, i) => (
                    <form
                      key={i}
                      className="space-y-2 divide-y divide-gray-200"
                    >
                      <div className={i === 0 ? null : 'pt-2'}>
                        <fieldset key={c.i}>
                          <div className="space-y-3 ">
                            {/* <input
                            id={`${c.id}-${i}`}
                            name={`${c._id}[]`}
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          /> */}
                            <label
                              htmlFor={`${c._id}-${i}`}
                              className="ml-3 cursor-pointer text-sm text-gray-600"
                              onClick={() => setId(c._id)}
                            >
                              {c.name}
                            </label>
                          </div>
                        </fieldset>
                      </div>
                    </form>
                  ))}
                </div>
              </aside>

              {/* Product grid */}
              <div className="mt-6  lg:col-span-3 lg:mt-0 xl:col-span-3">
                {id ? (
                  <ProductList productsList={products} id={id} />
                ) : (
                  <AllCategoryProducts />
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
