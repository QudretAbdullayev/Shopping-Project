import { useState } from 'react'
import styles from './productSummary.module.scss'
import discount from '../../../assets/icon/discount-shape.svg'
import right from '../../../assets/icon/arrow-right-payment.svg'
import { useDispatch, useSelector } from 'react-redux'
import useFetch from '../../../hooks/useFetch'
import { totalBasketPrice } from '../../../store/reducers/basket'
import ProductList from './productList'


const ProductSummary = () => {
  const {basket,totalPrice} = useSelector((state) => state.basket);
  const [total, setTotal] = useState(0);
  return (
    <div className={styles.productSummary}>
      <div className={styles.container}>
        <div className={styles.title}>Product Summary</div>
        {basket.length==0 
        ?
        <div className={styles.noProduct}>No Product Selected</div> 
        : 
        <ProductList basket={basket} setTotal={setTotal} total={total}/>
        }
        <div className={styles.line}></div>
        <div className={styles.totals}>
          <div className={styles.total}>
            <p className={styles.totalTitle}>Total Price</p>
            <p className={styles.totalPrice}>$280</p>
          </div>
          <div className={styles.total}>
            <p className={styles.totalTitle}>Total Price (Discount)</p>
            <p className={styles.totalPrice}>$98</p>
          </div>
          <div className={styles.total}>
            <p className={styles.totalTitle}>Tax & Fee</p>
            <p className={styles.totalPrice}>$46</p>
          </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.allTotal}>
          <div className={styles.allTotalTitle}>Total Price</div>
          {basket.length==0 && <div className={styles.allTotalPrice}>$0</div>
          }
        </div>
        <div className={styles.promoBox}>
          <div className={styles.promo}>
            <img className={styles.discount} src={discount} alt="" />
            <div className={styles.promoDescribe}>
              <div className={styles.promoApply}>Promo applied</div>
              <div className={styles.promoUsed}>1x shipping discount used</div>
            </div>
          </div>
          <img src={right} alt="" />
        </div>
        <button className={styles.button}>Checkout</button>
      </div>
    </div>
  );
}

export default ProductSummary