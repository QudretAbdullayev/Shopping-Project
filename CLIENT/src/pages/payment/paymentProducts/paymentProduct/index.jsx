import { useState } from 'react'
import styles from './paymentProduct.module.scss'
import remove from '../../../../assets/icon/trash.svg'
import decrement from '../../../../assets/icon/minus-square-grey.svg'
import increment from '../../../../assets/icon/plus-square-green.svg'
import {Checkbox} from 'antd';
import useFetch from '../../../../hooks/useFetch'
import { updateBasket, updateTotalBasket } from '../../../../store/reducers/basket'
import { useDispatch, useSelector } from 'react-redux'
const PaymentProduct = ({index,productID,handleUpdateUserBasket,user}) => {
  const dispatch = useDispatch();
  const {data,loading,error} = useFetch(`/products/${productID.id}/?populate=*`);

  const handleChecked = async (e, index) => {
    const updatedBasket = [...user.basket];
    updatedBasket[index].checked = e.target.checked;
    const totalQuantityInBasket = updatedBasket
      .filter((product) => product.checked)
      .reduce((total, product) => total + product.quantity, 0);
    
    dispatch(updateBasket(updatedBasket));
    dispatch(updateTotalBasket(totalQuantityInBasket));
    await handleUpdateUserBasket(updatedBasket, totalQuantityInBasket);
  };

  const handleDecrement = async (e,index) => {
    e.preventDefault()
    const updatedBasket = [...user.basket];
    console.log(index)
    if (updatedBasket[index].quantity > 1) {
      updatedBasket[index].quantity -= 1;

      const totalQuantityInBasket = updatedBasket
        .filter((product) => product.checked)
        .reduce((total, product) => total + product.quantity, 0);

      dispatch(updateBasket(updatedBasket));
      dispatch(updateTotalBasket(totalQuantityInBasket));
      await handleUpdateUserBasket(updatedBasket, totalQuantityInBasket);
    }
  };
  const handleIncrement = async (e,index) => {
    e.preventDefault()
    const updatedBasket = [...user.basket];
    const availablePieces = data?.data?.attributes?.variants?.slice(0, 1)[0][productID.variant]?.slice(0,1)[0]["pieces"] ;
    if (availablePieces > updatedBasket[index].quantity) {
      updatedBasket[index].quantity += 1;
    } else {
      updatedBasket[index].quantity = availablePieces;
    }

    const totalQuantityInBasket = updatedBasket
      .filter((product) => product.checked)
      .reduce((total, product) => total + product.quantity, 0);

    dispatch(updateBasket(updatedBasket));
    dispatch(updateTotalBasket(totalQuantityInBasket));
    await handleUpdateUserBasket(updatedBasket, totalQuantityInBasket);
  };
  
  const handleRemove = async (e,indexToRemove) => {
    e.preventDefault()
    const updatedBasket = [...user.basket].filter((_, index) => index !== indexToRemove);
    console.log(updateBasket)
    const totalQuantityInBasket = updatedBasket
      .filter((product) => product.checked)
      .reduce((total, product) => total + product.quantity, 0);
    dispatch(updateBasket(updatedBasket));
    dispatch(updateTotalBasket(totalQuantityInBasket));
    await handleUpdateUserBasket(updatedBasket, totalQuantityInBasket);
  };

  return (
    <div className={styles.paymentProduct}>
      {loading 
      ? <div>Loading ...</div> 
      : 
      <><div className={styles.paymentProductBox} key={index} value={data?.data?.attributes?.price * productID.quantity}>
          <Checkbox onChange={(e) => handleChecked(e,index)} checked={productID.checked}>
          </Checkbox>
        <div className={styles.imgBox}>
          <img src={`${import.meta.env.VITE_IMG_FILE}${data?.data?.attributes?.image.data[0].attributes.url}`} alt="" />
        </div>
        <div className={styles.paymentTitle}>
          <h4>{data?.data?.attributes?.title}</h4>
          <p>{productID.variant}</p>
          <h5>${data?.data?.attributes?.price * productID.quantity}</h5>
        </div>
      </div>
      <div className={styles.paymentCountProduct}>
        <p className={styles.favorite}>Add to Favourite</p>
        <div className={styles.buttons}>
          <div className={styles.counter}>
            <div className={styles.decrement} onClick={(e) => handleDecrement(e,index)}><img src={decrement} alt="" /></div>
            <p className={styles.number}>{productID.quantity}</p>
            <div className={styles.increment} onClick={(e) => handleIncrement(e,index)}><img src={increment} alt="" /></div>
          </div>
          <div className={styles.remove} onClick={(e) => handleRemove(e,index)}>
            <img src={remove} alt="" />
          </div>
        </div>
      </div></>}
    </div>
  )
}

export default PaymentProduct

