import { useEffect, useState } from 'react'
import styles from './paymentProducts.module.scss'
import logitech from '../../../assets/icon/Logitech-Symbol.png'
import PaymentProduct from './paymentProduct'
import { updateBasket, updateTotalBasket } from '../../../store/reducers/basket'
import { getProfileData, updateUserBasket } from '../../../api/basket'
import { useDispatch, useSelector } from 'react-redux'

const PaymentProducts = () => {
  const dispatch = useDispatch();
  const {token,userData} = useSelector((state) => state.auth);
  const [isUserUpdated, setIsUserUpdated] = useState(false);
   const [user, setUser] = useState({});
  const [productCount, setProductCount] = useState(0);

  const handleUpdateUserBasket = async (updatedBasket,updatedTotal) => {
    const success = await updateUserBasket({
      userId: userData.id,
      token,
      updatedBasket,
      updatedTotal,
    });
    if (success) {
      setIsUserUpdated(true);
      dispatch(updateBasket(updatedBasket));
      dispatch(updateTotalBasket(updatedTotal))
    } else {
      console.error('Failed to update user basket');
    }
  };
  useEffect(() => {
    const fetchProfileData = async () => {
      const profileData = await getProfileData(userData.id, token);
      if (profileData) {
        setUser(profileData);
        setProductCount(profileData.basketcount);
        setIsUserUpdated(false);
      }
    };
    fetchProfileData();
  }, [token, isUserUpdated, productCount]);
  console.log(user.basket)
  return (
    <div className={styles.paymentProductsContainer}>
      <div className={styles.paymentProducts}>
        <div className={styles.paymentTitleContainer}>
          <img src={logitech} alt="" />
          <div className={styles.paymentTitle}>
            <h4>Logitech Indonesia</h4>
            <p>Central Jakarta</p>
          </div>
        </div>
        <div className={styles.paymentProductList}>
          {user.basket?.map((productID, index) => (
            <>
            <PaymentProduct index={index} productID={productID} handleUpdateUserBasket={handleUpdateUserBasket} user={user} />
            <div className={styles.line}></div>
            </>
          ))}
        </div>
      </div>
    </div>
    
  )
}

export default PaymentProducts