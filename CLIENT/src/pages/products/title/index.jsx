import React from 'react'
import styles from './title.module.scss'

const Title = () => {
  return (
    <div className={styles.title}>
        <h2 className={styles.productName}>Showing product for “Gaming Gear”</h2>
        <p className={styles.productCount}>Showing 1 - 60 Products</p>
    </div>
  )
}

export default Title