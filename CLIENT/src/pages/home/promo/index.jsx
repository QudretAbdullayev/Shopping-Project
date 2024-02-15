import React from 'react';
import styles from './promo.module.scss';
import product from '../../../assets/images/Home/PromoBanner/iPad Air 2020.png'
const Promo = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.promoImage}>
          <div className={styles.box}>
            <img src={product} alt="" />
          </div>
        </div>
        <div className={styles.promoContainer}>
          <div className={styles.box}>
            <div className={styles.title}>Ipad Air Gen 5</div>
              <div className={styles.description}>Lorem ipsum dolor sit amet consectetur. Integer cursus cursus in sapien quam risus sed diam.</div>
              <div className={styles.buttons}>
                <button className={styles.buy}>Buy Now</button>
                <button className={styles.view}>View Detail</button>
            </div>
          </div>
        </div>
        {}
      </div>
    </section>
  )
}

export default Promo