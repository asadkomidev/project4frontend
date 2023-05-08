import React, { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'

const DashboardHeader = () => {
  return (
    <>
      <div className="flex justify-between py-8 lg:py-16">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Dashboard
          </h2>
        </div>
        <div className=" flex md:ml-4 md:mt-0">
          <a
            href="./dashboard/product/new"
            type="button"
            className="ml-3 inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <AiOutlinePlus size={18} className="mr-2" />
            Add Product
          </a>
        </div>
      </div>
    </>
  )
}

export default DashboardHeader
