import React from 'react';
import styles from './popular.module.scss';
import { getProducts } from '../../../api/product';
import { Link } from "react-router-dom";
import Card from '../../../components/card';
import { roots } from "../../../routes/constants";

const Popular = () => {
  const [products, setProducts] = React.useState([]);
  const [displayCount, setDisplayCount] = React.useState(4);

  React.useEffect(() => {
    async function getAllProducts() {
      const productsDB = await getProducts();
      setProducts(productsDB);
    }
    getAllProducts();
  }, []);

  const loadMore = () => {
    setDisplayCount(displayCount + 4);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Popular Product on Lenny</h2>
        <h4 className={styles.description}>Lorem ipsum dolor sit amet consectetur. Integer cursus cursus in</h4>
        <div className={styles.products}>
          {products?.data?.slice(0, displayCount).map((product) => {
            return (
              <Link key={product.id} to={`${roots.PRODUCT}${product.id}`}>
                <Card
                  imageNew="imageNew"
                  cardNew="cardNew"
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
        {displayCount < products?.data?.length && (
          <div className={styles.buttonBox}>
            <button className={styles.button} onClick={loadMore}>
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Popular;
