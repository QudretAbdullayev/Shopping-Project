import React, { useEffect, useState } from 'react'
import { getProducts } from '../../../api/product';
import { Link } from 'react-router-dom';
import Card from '../../../components/card';
import styles from './products.module.scss'
import { roots } from '../../../routes/constants';
import Heading from '../../../components/heading'
const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function getAllProducts() {
      const productsDB = await getProducts();
      setProducts(productsDB);
    }
    getAllProducts();
  }, []);
  return (
    <div className={styles.productsContainer}>
        <div className={styles.container}>
            <Heading title={"Related Product"} page={`${roots.PRODUCTS}`}/>
            <div className={styles.products}>
            {products?.data?.slice(0, 4).map((product) => {
                return (
                <Link key={product.id} to={`${roots.PRODUCT}${product.id}`}>
                    <Card
                    title={product.attributes.title}
                    price={product.attributes.price}
                    shortDescription={product.attributes.shortDescription}
                    sold={product.attributes.sold}
                    rating={product.attributes.rating}
                    image={`${import.meta.env.VITE_IMG_FILE}${product.attributes.image.data[0].attributes.url}`}
                    />
                </Link>
                );
            })}
            </div>
        </div>
    </div>
  )
}

export default Products