import { Fragment } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { Tab } from '@headlessui/react'

import CategoryLayout from '../Sections/AllCategoryLayout.jsx'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Tabs = ({ products, categories, subcategories }) => {
  // console.log('sub cat name: ', subcategories[0]?.category.name)
  return (
    <div className="mx-auto mt-16 w-full max-w-2xl  lg:mt-0 lg:max-w-7xl ">
      <Tab.Group as="div">
        <div className="overflow-x-auto border-b border-gray-200">
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
              All
            </Tab>
            {categories &&
              categories.map((c, i) => (
                <Tab
                  key={i}
                  className={({ selected }) =>
                    classNames(
                      selected
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800',
                      'whitespace-nowrap border-b-2 py-6 text-sm font-medium'
                    )
                  }
                >
                  {c.name}
                </Tab>
              ))}
          </Tab.List>
        </div>
        <Tab.Panels as={Fragment}>
          <Tab.Panel className="pt-10 ">
            <h3 className="sr-only">All</h3>
            <CategoryLayout
              item1={'All'}
              item2={''}
              item3={''}
              item4={''}
              item5={''}
              title={'All Products'}
            />

            {/* <AllProducts products={products} /> */}
          </Tab.Panel>
          <Tab.Panel className="pt-10">
            <h3 className="sr-only">For Sale</h3>

            <CategoryLayout
              item1={'Cars'}
              item2={'Motorcycles'}
              item3={'Boats'}
              item4={'Books'}
              item5={'Furniture'}
              title={'For Sale'}
            />
          </Tab.Panel>

          <Tab.Panel className="pt-10">
            <h3 className="sr-only">Housing</h3>

            <CategoryLayout
              item1={'Apartments'}
              item2={'Houses'}
              item3={'Room & Share'}
              item4={'Vacation Rental'}
              item5={'Parking & Storage'}
              title={'Housing'}
            />
          </Tab.Panel>

          <Tab.Panel className="pt-10">
            <h3 className="sr-only">Services</h3>
            <CategoryLayout
              item1={'Beauty Service'}
              item2={'Mobile Service'}
              item3={'Events Service'}
              item4={'Legal Service'}
              item5={'Pet Service'}
              title={'Services'}
            />
          </Tab.Panel>
          <Tab.Panel className="pt-10">
            <h3 className="sr-only">Jobs</h3>
            <CategoryLayout
              item1={'Admin & Office'}
              item2={'Architect'}
              item3={'Engineer'}
              item4={'Government'}
              item5={'Healthcare'}
              title={'Jobs'}
            />
          </Tab.Panel>
          <Tab.Panel className="pt-10">
            <h3 className="sr-only">Community</h3>
            <CategoryLayout
              item1={'Artists'}
              item2={'Childcare'}
              item3={'Pets'}
              item4={'Lost & Found'}
              item5={'Ride Share'}
              title={'Community'}
            />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default Tabs
