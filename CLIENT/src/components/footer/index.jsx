import React from 'react'
import styles from "./footer.module.scss"
import logo from '../../assets/icon/Logo.svg'
const footer = () => {
  return (
    <footer className={styles.footer}>
        <div className={styles.footerTop}>
            <div className={styles.container}>
                <div className={styles.title}>
                    <img src={logo} alt="" />
                    <p>The biggest marketplace managed by Ideologist corp, which provides various kinds of daily needs and hobbies.</p>
                </div>
                <div className={styles.footerNavs}>
                    <div className={styles.footerNav}>
                        <div className={styles.footerNavTitle}>About Lenny</div>
                        <ul>
                            <li>Information</li>
                            <li>Store Lactor</li>
                            <li>Bulk Purchase</li>
                            <li>Alteration Services</li>
                            <li>Gift Delivery Service</li>
                            <li>Live Station</li>
                        </ul>
                    </div>
                    <div className={styles.footerNav}>
                        <div className={styles.footerNavTitle}>About Lenny</div>
                        <ul>
                            <li>FAQ</li>
                            <li>Return Policy</li>
                            <li>Privacy Policy</li>
                            <li>Accessibillity</li>
                            <li>Contact Us</li>
                        </ul>
                    </div>
                    <div className={styles.footerNav}>
                        <div className={styles.footerNavTitle}>Account</div>
                        <ul>
                            <li>Membership</li>
                            <li>Address</li>
                            <li>Cupons</li>
                        </ul>
                    </div>
                    <div className={styles.footerNav}>
                        <div className={styles.footerNavTitle}>Contact Us</div>
                        <ul>
                            <li>For  Lenny Consumer Complaint Services</li>
                            <li>(684) 555-0102 and curtis.weaver@example.com</li>
                            <li className={styles.line}></li>
                            <li>Customers Complaint Service</li>
                            <li>Directorate Generate of the Republic of Indonesia</li>
                            <li>(480) 555-0103</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.footerBottom}>
            <div className={styles.container}>
                <p>COPYRIGHT © LENNY CO., LTD. ALL RIGHTS RESERVED.</p>
                <div>
                    <p>Terms of use</p>
                    <p>Privacy Policy</p>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default footer