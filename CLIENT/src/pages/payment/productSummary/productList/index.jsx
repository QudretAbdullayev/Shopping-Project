import Product from './product';
import styles from './productList.module.scss'

const ProductList = ({basket,total,setTotal}) => {

  return (
    <div className={styles.products}>
      {basket?.map((productID, index) => (
        <Product key={index} productID={productID}  setTotal={setTotal} total={total}/>
      ))}
    </div>
  );
}

export default ProductList