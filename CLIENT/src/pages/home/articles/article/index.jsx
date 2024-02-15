import React from 'react'
import styles from './article.module.scss'
const Article = ({image,date,title,description}) => {
  return (
    <div className={styles.article}>
        <img src={image} alt="" />
        <div className={styles.date}>{date}</div>
        <h4 className={styles.title}>{title}</h4>
        <h5 className={styles.description}>{description}</h5>
    </div>
  )
}

export default Article