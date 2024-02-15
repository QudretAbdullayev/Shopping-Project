import {useEffect} from 'react'
import styles from './searchCard.module.scss'

const SearchCard = ({ price,title,image}) => {
  
  return (
      <div className={styles.searchCard}>
        <div className={styles.paymentProductBox}>
          <div className={styles.imgBox}>
            <img src={image} alt="" />
          </div>
          <div className={styles.paymentTitle}>
            <h4>{title}</h4>
            <h5>${price}</h5>
          </div>
        </div>
      </div>
  )
}
export default SearchCard;
