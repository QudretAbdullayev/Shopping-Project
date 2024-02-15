import React from 'react'
import styles from './product.module.scss'
import DetailProduct from './detailProduct';
import { useParams } from "react-router-dom";
import useFetch from '../../hooks/useFetch';
import ProductBox from './productBox';
import Page from '../../components/page'
import Merchant from './merchant';
import Slider from './slider';
import Reviews from './reviews';
import { useSelector,useDispatch } from 'react-redux'
import { getReviews } from '../../store/actions/review';
import Products from './products'

const product = ({setLoginRegisterIsActive}) => {
  const { id } = useParams();
  const [activeSection, setActiveSection] = React.useState('DetailProduct');
  const {data,loading,error} = useFetch(`/products/${id}/?populate=*`);
  const handleClick = (section) => {
    setActiveSection(section);
  };
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews);
  const reviewsAttributes = reviews?.data;
  React.useEffect (() => { 
    dispatch(getReviews(`${import.meta.env.VITE_IMG_FILE}/api/reviews?filters[productID][$eq]=${id}`));
  }, [dispatch, id]);
  return (
    <>
    <section className={styles.section}>
      {
        loading ? 
        <div>Loading ...</div> 
        : 
        <>
        <Page idx={data?.data?.attributes?.categories?.data[0].id} productId={id} productName={data?.data?.attributes?.title}/>
      <div className={styles.productSection}>
        <div className='oneProduct'>
        {data?.data?.attributes?.image && (
          <Slider
            images={data?.data?.attributes?.image.data.map((product) => ({
              original: `${import.meta.env.VITE_IMG_FILE}${product.attributes.url}`,
              thumbnail: `${import.meta.env.VITE_IMG_FILE}${product.attributes.url}`
            }))}
          />
        )}
        </div>
        <ProductBox idx={id} variants={data?.data?.attributes?.variants?.slice(0, 1)[0]} variantAllNames={data?.data?.attributes?.variantsNames?.slice(0, 1)[0]} variant={data?.data?.attributes?.variantsNames?.slice(0, 1)[0]} setLoginRegisterIsActive={setLoginRegisterIsActive} title={data?.data?.attributes?.title} description={data?.data?.attributes?.describe} price={data?.data?.attributes?.price}  sold={data?.data?.attributes?.sold}  ratings={reviewsAttributes}/>
      </div>
      <div className={styles.container}>
        <div className={styles.tabContainer}>
          <div className={styles.tabs}>
            <div onClick={() => handleClick('DetailProduct')} className={`${activeSection === 'DetailProduct' ? styles.activeTab : styles.tab}`}>Detail Product</div>
            <div onClick={() => handleClick('Merchant')} className={`${activeSection === 'Merchant' ? styles.activeTab : styles.tab}`}>Merchant</div>
            <div onClick={() => handleClick('Reviews')} className={`${activeSection === 'Reviews' ? styles.activeTab : styles.tab}`}>Reviews</div>
            <div onClick={() => handleClick('RelatedProduct')} className={`${activeSection === 'RelatedProduct' ? styles.activeTab : styles.tab}`}>Related Product</div>
          </div>
          <div className={styles.line}></div>
        </div>
        {activeSection === 'DetailProduct' && (
          <DetailProduct 
          title={data?.data?.attributes?.title} 
          description={data?.data?.attributes.describe}
          spesification={
            data?.data?.attributes?.spesificationsNames?.slice(0, 1)[0].spesification[0] !== '' ?
            data?.data?.attributes?.spesificationsNames?.slice(0, 1)[0].spesification[0] : ''
          }
          inTheBox={
            data?.data?.attributes?.spesificationsNames?.slice(0, 1)[0].spesification[1] !== '' ?
            data?.data?.attributes?.spesificationsNames?.slice(0, 1)[0].spesification[1] : ''
          }
          system={
            data?.data?.attributes?.spesificationsNames?.slice(0, 1)[0].spesification[2] !== '' ?
            data?.data?.attributes?.spesificationsNames?.slice(0, 1)[0].spesification[2] : ''
          }
          spesificationAll={
            data?.data?.attributes?.spesifications?.[0]?.[data?.data?.attributes?.spesificationsNames?.[0]?.spesification?.[0]] || ''
          }
          inTheBoxAll={
            data?.data?.attributes?.spesifications?.[1]?.[data?.data?.attributes?.spesificationsNames?.[0]?.spesification?.[1]] || ''
          }
          systemAll={
            data?.data?.attributes?.spesifications?.[2]?.[data?.data?.attributes?.spesificationsNames?.[0]?.spesification?.[2]] || ''
          }
          />
        )}
        {activeSection === 'Merchant' && (
          <Merchant/>
        )}
        {activeSection === 'Reviews' && (
          <div>
            <Reviews reviewsAttributes={reviewsAttributes}/>
          </div>
        )}
        {activeSection === 'RelatedProduct' && (
          <div>
            <Products/>
          </div>
        )}
      </div>
      <div>
      </div>
        </>
      }
    </section>
    </>
  );
}

export default product