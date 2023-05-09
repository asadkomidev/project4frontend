import Layout from '@/components/layout/Layout.jsx'

import Loader from '@/components/UI/Loader.jsx'

import { useSelector } from 'react-redux'
import Tabs from '@/components/UI/Tabs.jsx'

export default function Home({ products, categories, subcategories }) {
  // const [loading, setLoading] = useState(false)
  const { loading } = useSelector((state) => state.loaders)

  return (
    <>
      {loading && <Loader />}
      <Layout title="CL | Home">
        <div>
          <Tabs
            products={products.products}
            categories={categories.categoryList}
            subcategories={subcategories.subCategoryList}
          />
        </div>
      </Layout>
    </>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.API}/all-products?cat=`)
  const products = await res.json()
  const cat = await fetch(`${process.env.API}/all-categories`)
  const categories = await cat.json()
  const subcat = await fetch(`${process.env.API}/all-subcategories`)
  const subcategories = await subcat.json()

  return {
    props: { products, categories, subcategories },
  }
}
