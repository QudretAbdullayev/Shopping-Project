import React, { useState } from 'react'
import styles from './reviews.module.scss'
import star from '../../../assets/icon/star.svg'
import CircularProgressBar from './CircleProgressBar'
import { useDispatch, useSelector } from "react-redux";
import Comment from './comment'
import { deleteReview } from '../../../store/reducers/reviews'
import { createPrivateInstance } from '../../../api'
import FilterOption from './filterOption'
import Filter from './filter'
import Review from './review'
const Reviews = ({reviewsAttributes}) => {
  const dispatch = useDispatch()
  const starsArray = [];
  const privateInstance = createPrivateInstance()
  const [filterActive, setFilterActive] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const {token,userData} = useSelector((state) => state.auth)
  const {data} = useSelector((state) => state.reviews)
  console.log(reviewsAttributes)
  const reviewAverage = data
          .reduce((total, review) => (total + review.attributes.stars), 0);
  const reviewCount = data?.length

  const reviewOneStar = data
          .filter((review) => review.attributes.stars===1)
          .length;
  const reviewTwoStar = data
          .filter((review) => review.attributes.stars===2)
          .length;
  const reviewThreeStar = data
          .filter((review) => review.attributes.stars===3)
          .length;
  const reviewFourStar = data
          .filter((review) => review.attributes.stars===4)
          .length;
  const reviewFiveStar = data
          .filter((review) => review.attributes.stars===5)
          .length;

  for (let i = 0; i < Math.floor(reviewAverage/reviewCount); i++) {
    starsArray.push(<img key={i} src={star} alt="" />);
  }

  const handleDelete = async (id) => {
    try {
      await privateInstance.delete(`/api/reviews/${id}`);
      dispatch(deleteReview(id));
    } 
    catch (error) { 
      console.log(error);
    }
  };
  const handleOpenFilter = (e) => {
    
    e.preventDefault()
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
    setFilterActive(!filterActive);
  };
  const handleExitFilter = (e) => {
    e.preventDefault()
    window.scrollTo(0, scrollPosition); 
    document.body.style.overflow = 'visible';
    setFilterActive(!filterActive);
  }

  return (
    <div className={styles.reviewsSection}>
      <div className={styles.reviewsContainer}>
        <h2 className={styles.title}>Product Reviews</h2>
        <div className={styles.reviews}>
          <div className={styles.ratingTotal}>
            <CircularProgressBar average={Math.round(reviewAverage/reviewCount*10)/10} radius={32} progress={reviewAverage/reviewCount/5*100} strokeWidth={4} className={styles.circularrogress}/>
            <div className={styles.ratingTotalDescribe}>
              <div className={styles.stars}>
                {starsArray}
              </div>
              {reviewCount>0 ? 
              <p>from {reviewCount} reviews</p>
              :
              <p>There isn't review.</p>
              }
            </div>
          </div>
          <div className={styles.ratings}>
            <div className={styles.ratingBox}>
              <div className={styles.ratingArea}>
                <p className={styles.rating}>5.0</p>
                <img src={star} alt="" />
              </div>
              <progress id="file" value={reviewFiveStar} max={reviewCount}></progress>
              <p className={styles.ratingPoint}>{reviewFiveStar}</p>
            </div>
            <div className={styles.ratingBox}>
              <div className={styles.ratingArea}>
                <p className={styles.rating}>4.0</p>
                <img src={star} alt="" />
              </div>
              <progress id="file" value={reviewFourStar} max={reviewCount}></progress>
              <p className={styles.ratingPoint}>{reviewFourStar}</p>
            </div>
            <div className={styles.ratingBox}>
              <div className={styles.ratingArea}>
                <p className={styles.rating}>3.0</p>
                <img src={star} alt="" />
              </div>
              <progress id="file" value={reviewThreeStar} max={reviewCount}></progress>
              <p className={styles.ratingPoint}>{reviewThreeStar}</p>
            </div>
            <div className={styles.ratingBox}>
              <div className={styles.ratingArea}>
                <p className={styles.rating}>2.0</p>
                <img src={star} alt="" />
              </div>
              <progress id="file" value={reviewTwoStar} max={reviewCount}></progress>
              <p className={styles.ratingPoint}>{reviewTwoStar}</p>
            </div>
            <div className={styles.ratingBox}>
              <div className={styles.ratingArea}>
                <p className={styles.rating}>1.0</p>
                <img src={star} alt="" />
              </div>
              <progress id="file" value={reviewOneStar} max={reviewCount}></progress>
              <p className={styles.ratingPoint}>{reviewOneStar}</p>
            </div>
          </div>
        </div>
      </div>
     <div className={styles.container}>
        <Filter handleOpenFilter={handleOpenFilter}/>
     </div>
      <div className={styles.productsContainer}>
        <div className={`${styles.filterOption} ${filterActive ? styles.filterActive : styles.filterDeactive}`}>
            <FilterOption handleExitFilter={handleExitFilter}/>
        </div>
        {reviewsAttributes && 
        <div className={styles.reviewList}>
          {reviewsAttributes?.map((review) => (
            <>
            <Review key={review.id} starCount={review.attributes?.stars} message={review.attributes?.text} name={review.attributes?.username} userData={userData} deleteID={review?.id} handleDelete={handleDelete}/>
            <div className={styles.line}></div>
            </>
          ))}
        </div>
        }
      </div>
      {token ? <Comment/> : <></>}
    </div>
  )
}

export default Reviews




