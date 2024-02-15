import React from 'react'
import SearchCard from "./searchCard";
import styles from './searchCardList.module.scss'
import { Link } from 'react-router-dom';
import { roots } from '../../../routes/constants';

const SearcCardList = ({products,setInput,setIsHovering,setProducts}) => {
  const handleClick = () => {
    setIsHovering(false);
    setInput('');
    setProducts([])
  };
  return (
    <div className={styles.productsList}>
      {products?.map((product) => {
        return <Link key={product.id} to={`${roots.PRODUCT}${product.id}`} onClick={handleClick}><SearchCard title={product?.attributes?.title} price={product?.attributes?.price} image={`${import.meta.env.VITE_IMG_FILE}${product?.attributes?.image.data[0].attributes.url}`} /></Link>;
      })}
    </div>
  )
}

export default SearcCardList;
