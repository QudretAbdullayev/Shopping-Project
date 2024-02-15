import React from 'react'
import styles from './categories.module.scss'
import Category from './category'
import { getCategories } from '../../../api/product'
import Heading from '../../../components/heading'
import { roots } from "../../../routes/constants";
import { Link } from 'react-router-dom'

const Categories = () => {
  const [categories,setCategories] = React.useState([])
  React.useEffect(()=>{
    async function getAllCategories(){
      const categoriesDB = await getCategories()
      setCategories(categoriesDB)
    }
    getAllCategories()
    
  },[])
  return (
    <section className={styles.section}>
        <div className={styles.container}>
            <Heading title={"Featured Category"} page={`${roots.PRODUCTS}`}/>
            <div className={styles.categories}>
                {categories?.data?.map(category =>{
                    return (<Link key={category.id} to={`${roots.PRODUCTS}?categories=${category.id}`} ><Category title={category.attributes.title} image={`${import.meta.env.VITE_IMG_FILE}${category.attributes.image.data.attributes.url}`} count={category.attributes.products.data.length}/></Link>)
                })}
            </div>
        </div>
    </section>
    
  )
}

export default Categories