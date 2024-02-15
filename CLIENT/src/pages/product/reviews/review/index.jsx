import styles from './review.module.scss';
import star from '../../../../assets/icon/star.svg'
import user from '../../../../assets/icon/User.svg'
import like from '../../../../assets/icon/like.svg'
import dislike from '../../../../assets/icon/dislike.svg'
import remove from '../../../../assets/icon/trash.svg'
const Review = ({starCount,message,name,userData,deleteID,handleDelete}) => {
  console.log(deleteID)
  const starsArray = [];
  for (let i = 0; i < parseInt(starCount); i++) {
    starsArray.push(<img key={i} src={star} alt="" />);
  }
  return (
    <div className={styles.review}>
        <div className={styles.stars}>
            {starsArray}
        </div>
        <p className={styles.message}>{message}</p>
        <p className={styles.date}>July 2, 2020 03:29 PM</p>
        <div className={styles.user}>
            <div className={styles.userData}>
                <img src={user} alt="" />
                <p className={styles.name}>{name}</p>
            </div>
            <div className={styles.isLike}>
              {userData?.username === name && (
                <div  className={styles.like} onClick={() => handleDelete(deleteID)}>
                  <img src={remove} alt="remove" />
                </div>
              )}
              <>
                  <div className={styles.like}>
                    <img src={like} alt="like" />
                  </div>
                  <div  className={styles.like}>
                    <img src={dislike} alt="dislike" />
                  </div>
                </>
            </div>
        </div>
    </div>
  )
}

export default Review