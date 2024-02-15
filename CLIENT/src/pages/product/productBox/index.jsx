import styles from './productBox.module.scss'
import star from '../../../assets/icon/star.svg'
import ellipse from '../../../assets/icon/Ellipse 4.svg'
import shoppingCart from '../../../assets/icon/shopping-cartNew.svg'
import {Select} from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBasket, updateTotalBasket } from '../../../store/reducers/basket'
import { updateUserBasket,getProfileData } from '../../../api/basket';

const ProductBox = ({title,description,ratings,price,sold,setLoginRegisterIsActive,variant,variantAllNames,variants,idx}) => {
  const dispatch = useDispatch();
  const {token,userData} = useSelector((state) => state.auth);
  const { basket } = useSelector((state) => state.basket);
  const [variantName, setVariantName] = useState('');
  const [variantsData, setVariantsData] = useState({});
  const [variantNames, setVariantNames] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [productCount, setProductCount] = useState(0);
  const [user, setUser] = useState({});
  const [isUserUpdated, setisUserUpdated] = useState(false);
  
  const handleChart = async (e) => {
  e.preventDefault();
  if (!token) {
    setLoginRegisterIsActive(true);
  } else {
    if (selectedValue === '') {
      alert("The product variant is not selected.");
    } 
    else{
      const selectedPieceCount = variantsData[selectedValue]?.[0]?.pieces || 0;
        let updatedBasket = [];

        if (user.basket && Array.isArray(user.basket)) {
          updatedBasket = [...user.basket];
        }

        let productIndex = -1;
        if (Array.isArray(updatedBasket)) {
          updatedBasket.forEach((product, index) => {
            if (product.variant === selectedValue && product.id === idx) {
              productIndex = index;
            }
          });
        }

        if (productIndex !== -1) {
          updatedBasket[productIndex].quantity += 1;
        } else {
          updatedBasket.push({
            id: idx,
            variant: selectedValue,
            quantity: 1,
            price: 1,
            checked: true,
          });
        }

        const totalQuantityInBasket = updatedBasket
          .filter((product) => product.variant === selectedValue)
          .reduce((total, product) => total + product.quantity, 0);

        if (totalQuantityInBasket <= selectedPieceCount) {
          let count = productCount+1
          dispatch(updateBasket(updatedBasket));
          dispatch(updateTotalBasket(count));
          console.log(count)
          await handleUpdateUserBasket(updatedBasket, count);
          setProductCount(count)
        } else {
          alert('There are no more products in stock.');
        }
    }
  }
};

  const reviewAverage = ratings
          .reduce((total, review) => (total + review.attributes.stars), 0);
  const reviewCount = ratings?.length

  useEffect(() => {
    if (variant &&variantAllNames && variants) {
      const name = Object.keys(variant)[0];
      const variantAll =variantAllNames[name];
      setVariantsData(variants)
      setVariantName(name);
      setVariantNames(variantAll);
    }
    const fetchProfileData = async () => {
    const profileData = await getProfileData(userData.id, token);
    if (profileData) {
      setUser(profileData);
      setProductCount(profileData.basketcount)
      setisUserUpdated(false);
    }
  };
    fetchProfileData();
  }, [variant,selectedValue,token,isUserUpdated,productCount]);

  const handleUpdateUserBasket = async (updatedBasket,updatedTotal) => {
  const success = await updateUserBasket({
    userId: userData.id,
    token,
    updatedBasket,
    updatedTotal,
  });

  if (success) {
    setisUserUpdated(true);
    dispatch(updateBasket(updatedBasket));
    dispatch(updateTotalBasket(updatedTotal))
  } else {
    console.error('Failed to update user basket');
  }
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleBox}>
        <h3 className={styles.title}>
          {title}
        </h3>
        <div className={styles.feature}>
          <div className={styles.imgBox}>
            <img src={star} alt="" className={styles.star}/>
          </div>
          <p className={styles.rating}>{Math.round(reviewAverage/reviewCount*10)/10}</p>
          <div className={styles.imgBox}>
            <img src={ellipse} alt="" className={styles.ellipse}/>
          </div>
          <p className={styles.sold}>{sold} Sold</p>
        </div>
        <p className={styles.price}>${price}</p>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.line}></div>
      <div className={styles.productVariants}>
        <p className={styles.productVariantTitle}>Product Variant:</p>
        <div className={styles.options}>
          <div className={styles.option}>
            <p>{variantName}</p>
            <Select
              onChange={(defaultValue) => setSelectedValue(defaultValue)}
              defaultValue={''}
              options={variantNames
                .filter((variant) => {
                  const pieces = variantsData[variant]?.[0]?.pieces || 0;
                  return pieces > 0;
                })
                .map((variant) => ({
                  value: variant,
                  label: variant,
                }))}
            />
          </div>
        </div>
      </div>
      <div className={styles.modalBox}>
        <div className={styles.modalButton}>
          <button className={styles.button}>Buy Now</button>
        </div>
        <div className={styles.modalButton} onClick={handleChart}>
          {/* Trigger the handleChart function on button click */}
          <button className={styles.button}>
            <img src={shoppingCart} alt="" /> Add to Chart
          </button>
        </div>
      </div>
    </div>
  );
}
  

export default ProductBox


