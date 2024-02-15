import React from 'react'
import styles from './title.module.scss'

const Title = () => {
  return (
    <div className={styles.titleContainer}>
      <div className={styles.container}>
          <div className={styles.titleBox}>
              <h2 className={styles.title}>Shopping Chart</h2>
              <p className={styles.description}>Showing your choices product</p>
          </div>
          <div className={styles.filterBar}>
              <p className={styles.sort}>Sort By:</p>
              <select name="filter">
              <option value="">Latest Added</option>
              </select>
          </div>
      </div>
    </div>
  )
}

export default Title