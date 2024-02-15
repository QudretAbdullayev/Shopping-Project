import React, { useEffect, useState } from 'react';
import styles from './payment.module.scss'
import Title from './title';
import PaymentProducts from './paymentProducts';
import ProductSummary from './productSummary';
import Products from './products';
const ShoppingChart = () => {
  return (
    <main className={styles.main}>
      <section className={styles.emptySection}></section>
      <section className={styles.titleSection}>
        <Title/>
      </section>
      <section className={styles.otherSection}>
        <div className={styles.paymentProducts}><PaymentProducts/></div>
        <Products/>
        <div className={styles.productSummary}><ProductSummary/></div>
      </section>
    </main>
  );
};

export default ShoppingChart;
