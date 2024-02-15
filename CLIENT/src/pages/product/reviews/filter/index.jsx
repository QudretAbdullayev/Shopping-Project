import React from 'react'
import styles from './filter.module.scss'
import filter from '../../../../assets/icon/filter.svg'

const Filter = ({handleOpenFilter}) => {
  return (
    <div className={styles.filterBar}>
      <p>Review Lists</p>
      <div className={styles.optionContainer}>
        <div className={styles.reviewsOptions}>
          <div className={`${styles.review} ${styles.reviewActive}`}>All Reviews</div>
          <div className={styles.review}>With Photo & VIdeo</div>
          <div className={styles.review}>With Description</div>
        </div>
        <div className={styles.boxs}>
          <div onClick={handleOpenFilter} className={`${styles.box} ${styles.filter}`}><img src={filter} alt="" /></div>
        </div>
      </div>
    </div>
  )
}

export default Filter