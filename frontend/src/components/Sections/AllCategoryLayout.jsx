import { Fragment, useState } from 'react'
import axios from 'axios'
import { Dialog, Disclosure, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { PlusIcon } from '@heroicons/react/20/solid'

import CategoryProducts from './CategoryProducts.jsx'
import TitledProduct from './TitledProduct.jsx'

export default function CategoryLayout({
  item1,
  item2,
  item3,
  item4,
  item5,
  title,
}) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const [keyword, setKeyword] = useState('')

  return (
    <>
      <div className=" bg-white">
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
                        {/* Filters */}
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
                      <form className=" space-y-2 divide-y divide-gray-200">
                        <Disclosure as="div" className=" border-gray-200 ">
                          {({ open }) => (
                            <div>
                              <div className={'pt-2'}>
                                <fieldset>
                                  <div className="flex flex-col space-y-3">
                                    <label
                                      htmlFor=""
                                      className="ml-3 cursor-pointer text-base font-medium text-gray-600"
                                      onClick={() => setKeyword(item1)}
                                    >
                                      {item1}
                                    </label>
                                    <label
                                      htmlFor=""
                                      className="ml-3 cursor-pointer text-base font-medium text-gray-600"
                                      onClick={() => setKeyword(item2)}
                                    >
                                      {item2}
                                    </label>
                                    <label
                                      htmlFor=""
                                      className="ml-3 cursor-pointer text-base font-medium text-gray-600"
                                      onClick={() => setKeyword(item3)}
                                    >
                                      {item3}
                                    </label>
                                    <label
                                      htmlFor=""
                                      className="ml-3 cursor-pointer text-base font-medium text-gray-600"
                                      onClick={() => setKeyword(item4)}
                                    >
                                      {item4}
                                    </label>
                                    <label
                                      htmlFor=""
                                      className="ml-3 cursor-pointer text-base font-medium text-gray-600"
                                      onClick={() => setKeyword(item5)}
                                    >
                                      {item5}
                                    </label>
                                  </div>
                                </fieldset>
                              </div>
                            </div>
                          )}
                        </Disclosure>
                      </form>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          <main className="mx-auto max-w-7xl lg:max-w-7xl  ">
            <div className="border-b border-gray-200 pb-10">
              <h1 className="text-xl font-bold tracking-tight text-gray-900">
                {title}
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

                <div className="hidden max-w-xl border-r lg:block">
                  <form className="space-y-2 divide-y divide-gray-200 ">
                    <div className={'pt-2'}>
                      <fieldset>
                        <div className=" flex flex-col space-y-1">
                          <label
                            htmlFor=""
                            className="ml-3 cursor-pointer text-base font-medium text-gray-600"
                            onClick={() => setKeyword(item1)}
                          >
                            {item1}
                          </label>
                          <label
                            htmlFor=""
                            className="ml-3 cursor-pointer text-base font-medium text-gray-600"
                            onClick={() => setKeyword(item2)}
                          >
                            {item2}
                          </label>
                          <label
                            htmlFor=""
                            className="ml-3 cursor-pointer text-base font-medium text-gray-600"
                            onClick={() => setKeyword(item3)}
                          >
                            {item3}
                          </label>
                          <label
                            htmlFor=""
                            className="ml-3 cursor-pointer text-base font-medium text-gray-600"
                            onClick={() => setKeyword(item4)}
                          >
                            {item4}
                          </label>
                          <label
                            htmlFor=""
                            className="ml-3 cursor-pointer text-base font-medium text-gray-600"
                            onClick={() => setKeyword(item5)}
                          >
                            {item5}
                          </label>
                        </div>
                      </fieldset>
                    </div>
                  </form>
                </div>
              </aside>

              {/* Product grid */}
              <div className="mt-6  lg:col-span-3 lg:mt-0 xl:col-span-3">
                {keyword ? (
                  <CategoryProducts keyword={keyword} />
                ) : (
                  <TitledProduct title={title} />
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
