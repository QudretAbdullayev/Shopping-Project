import React from 'react'
import styles from "./heading.module.scss"
import { Link } from 'react-router-dom'
const Heading = ({title,page}) => {
  return (
    <Link to={page}>
    <div className={styles.heading}>
        <div className={styles.container}>
          <h2 className={styles.title}>{title}</h2>
          <button className={styles.button}>View Detail</button>
        </div>
    </div>
    </Link>
  )
}

export default Heading