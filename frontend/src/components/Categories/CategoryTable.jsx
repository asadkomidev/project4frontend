import { useState } from 'react'
import { FaTrash, FaEdit } from 'react-icons/fa'
import DeleteModal from '../UI/DeleteModal.jsx'
import DeleteCatModal from './DeleteCatModal.jsx'

const CategoryTable = ({ categories, subcategories }) => {
  const [open, setOpen] = useState(false)
  const [id, setId] = useState('')

  const [name, setName] = useState('')

  const openModal = (pid, pname) => {
    setId(pid)
    // setCid(cid)
    setName(pname)
    setOpen(true)
  }
  return (
    <>
      <div className="">
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Parent
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {subcategories.map((category, categoryIdx) => (
                    <tr
                      key={categoryIdx}
                      className={
                        categoryIdx % 2 === 0 ? undefined : 'bg-gray-50'
                      }
                    >
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                        {category.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {category?.category?.name}
                      </td>

                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                        <div className="flex gap-4">
                          <a
                            href={'/dashboard/category/edit/'}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <FaEdit /> <span className="sr-only">, </span>
                          </a>
                          <a
                            onClick={() =>
                              openModal(category._id, category.name)
                            }
                            className="pr-2 text-red-600 hover:text-red-900"
                          >
                            <FaTrash /> <span className="sr-only">, </span>
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {open && (
        <DeleteCatModal open={open} setOpen={setOpen} id={id} name={name} />
      )}
    </>
  )
}

export default CategoryTable
