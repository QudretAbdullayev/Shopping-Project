import React from 'react'
import styles from './merchant.module.scss'
import logo from '../../../assets/icon/Logitech-Symbol.png'
import message from '../../../assets/icon/message.svg'
import shop from '../../../assets/icon/shop.svg'
const Merchant = () => {
  return (
    <div className={styles.merchant}>
        <h2 className={styles.title}>Merchant Information</h2>
        <div className={styles.merchantBox}>
          <div className={styles.merchantCard}>
            <img src={logo} alt="" />
            <div className={styles.merchantDescription}>
              <h4>Logitech Indonesia</h4>
              <h6>Jakarta Pusat</h6>
              <div className={styles.merchantSuccesses}>
                <div className={styles.merchantSuccess}>Top Rated Merchant</div>
                <div className={styles.merchantSuccess}>Best Merchant</div>
              </div>
            </div>
          </div>
          <div className={styles.merchantButtons}>
            <div className={styles.merchantButton}>
              <img src={shop} alt="" />
              <p>Chat</p>
            </div>
            <div className={styles.merchantButton}>
              <img src={message} alt="" />
              <p>Visit Merchant</p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Merchant