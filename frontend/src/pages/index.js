import Layout from '@/components/layout/Layout.jsx'

import Loader from '@/components/UI/Loader.jsx'

import { useSelector } from 'react-redux'
import Tabs from '@/components/UI/Tabs.jsx'

export default function Home({ products, categories, subcategories }) {
  // const [loading, setLoading] = useState(false)
  const { loading } = useSelector((state) => state.loaders)

  console.log(products)

  return (
    <>
      {loading && <Loader />}
      <>
        <div>
          <Tabs
            products={products.products}
            categories={categories.categoryList}
            subcategories={subcategories.subCategoryList}
          />
        </div>
      </>
    </>
  )
}

export async function getServerSideProps() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/all-products?cat=`
  )
  const products = await res.json()
  const cat = await fetch(`${process.env.NEXT_PUBLIC_API}/api/all-categories`)
  const categories = await cat.json()
  const subcat = await fetch(
    `${process.env.NEXT_PUBLIC_API}/api/all-subcategories`
  )
  const subcategories = await subcat.json()

  return {
    props: { products, categories, subcategories },
  }
}
