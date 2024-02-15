import React from 'react'
import styles from './page.module.scss'
import arrowRight from '../../assets/icon/arrow-right.svg'
import { Link } from 'react-router-dom';
import { roots } from '../../routes/constants';
import { useSelector } from 'react-redux';
const Page = ({idx, productId,productName}) => {
  const {allCategory} = useSelector((state) => state.category);
  return (
    <div className={styles.container}>
      <Link className={styles.link} to={roots.HOME}>Home</Link>
      {allCategory.hasOwnProperty(idx) 
      ? 
      <>
      <img src={arrowRight} alt="" />
      <Link className={styles.link} to={`${roots.PRODUCTS}?categories=${idx}`}>{allCategory[idx]}</Link>
      </>
      : 
      <>
      </>}
      {productId 
      ? 
      <>
      <img src={arrowRight} alt="" />
      <Link className={styles.link} to={`${roots.PRODUCT}${productId}`}>{productName}</Link>
      </>
      : 
      <>
      </>}
    </div>
  )
}

export default Page