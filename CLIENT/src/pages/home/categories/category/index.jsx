import React from 'react'
import styles from "./category.module.scss"

const Category = ({image,title,count}) => {
  return (
    <div className={styles.category}>
        <img className={styles.image} src={image} alt="" />
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.count}>{count} products</div>
    </div>
  )
}

export default Category