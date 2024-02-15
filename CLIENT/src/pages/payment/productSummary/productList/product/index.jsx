import React from 'react'
import styles from './product.module.scss'
import useFetch from '../../../../../hooks/useFetch';
import { useDispatch } from 'react-redux'
import { totalBasketPrice } from '../../../../../store/reducers/basket';

const Product = ({ productID,total,setTotal }) => {
  const dispatch = useDispatch();
  const { data, loading, error } = useFetch(`/products/${productID.id}/?populate=*`);
  if (productID.checked){
    if(loading){
      return (
      <div>Loading...</div>
    )
    }else{
      console.log(total)
      // let price =  data?.data?.attributes?.price * productID.quantity
      // dispatch(totalBasketPrice(total));
      // setTotal(++price)
      return (
      <div className={styles.product}>
        <p className={styles.productTitle}>{data?.data?.attributes?.title}</p>
        <p className={styles.productPrice}>
          ${data?.data?.attributes?.price * productID.quantity}
        </p>
      </div>
    )
    }
  }
}
export default Product
