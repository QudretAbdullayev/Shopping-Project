import { Rate } from "antd";
import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { addReview } from "../../../../store/reducers/reviews";
import { createPrivateInstance } from "../../../../api";
import styles from './comment.module.scss'


const Comment = () => {
  const privateInstance = createPrivateInstance()
  const {id}  = useParams();
  const [stars, setStars] = React.useState(0);
  const [text, setText] = React.useState("");
  const {token, userData} = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const data = {
        stars,
        productID: id,
        username: userData.username,
        text
    };
    newComment(data);
    setText(""); 
    setStars(0);
  };
  const newComment = async (data) => {
    try {
        const res = await privateInstance.post("/api/reviews/", { 
            data,
        });
        dispatch(addReview(res.data.data));
    }
    catch (error) {
        console.log(error);
    }
        
  }

  return (
    <div className={styles.commentContainer}>
      <p>Your Review</p>
      <div className={styles.comment}>
        <form className="new-review" onSubmit={handleFormSubmit}>
          <div className={styles.formBox}>
            <label htmlFor="">Your Message</label>
            <textarea 
            onChange={(e) => {
              setText(e.target.value);
            }}
            placeholder="Your review" 
            value={text} 
            cols="30" 
            rows="10"
            >
            </textarea>
          </div>
          <div className={styles.formBox}>
            <label htmlFor="">Your Rating</label>
            <Rate value={stars} onChange={setStars} />
            <button type="submit">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Comment;
