"use strict";
import React from 'react'
import LinesEllipsis from 'react-lines-ellipsis'
import styles from "./heroCard.module.scss"
import heart from "../../../../assets/images/Home/Hero/heart.svg"
import ellipse from "../../../../assets/images/Home/Hero/Ellipse 4.svg"
import star from "../../../../assets/images/Home/Hero/star.svg"
import product from "../../../../assets/images/Home/Hero/shirt.png"

const HeroCard = ({title,shortDescription,rating,sold,image,imageNew,cardNew}) => {
  return (
    <div className={`${styles.card} ${cardNew}`}>
      <div className={`${styles.image} ${imageNew}`}>
        <div className={styles.imageBox}>
          <div className={styles.box}>
            <img className={styles.heart} src={heart} alt="" />
          </div>
          <div className={styles.productBox}><img className={styles.product} src={product} alt="" /></div>
        </div>
      </div>
      <div className={styles.description}>
        <div className={styles.descriptionBox}>
          <h4>
            <LinesEllipsis
              text={title}
              maxLine='1'
              ellipsis='...'
              trimRight
            />
          </h4>
          <h5>{shortDescription}</h5>
          <div className={styles.rating}>
            <img className={styles.star} src={star} alt="" />
            <h6>{rating}</h6>
            <img src={ellipse} alt="" />
            <h6>{sold} Sold</h6>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroCard