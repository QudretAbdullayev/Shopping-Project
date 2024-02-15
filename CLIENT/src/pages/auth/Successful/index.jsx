import React from 'react';
import styles from './successful.module.scss';
import successfulLogo from '../../../assets/icon/tick-circle.svg'
const Successful = ({ isSuccess, setIsSuccess, setLoginIsActive }) => {

  const modalRef = React.useRef();

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsSuccess(false);
    }
  };
  const handleSuccessClose = (e) => {
    e.preventDefault();
    console.log("salam")
    setIsSuccess(false);
    setLoginIsActive(true);
  };

  React.useEffect(() => {
    if (isSuccess) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.body.style.overflow = 'visible';
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.body.style.overflow = 'visible';
    };

  }, [isSuccess]);
    

  return isSuccess ? (
    <div className={styles.modal}>
      <div className={styles.modalDialog}>
        <div ref={modalRef} className={styles.modalContent}>
          <div className={styles.modalBox}>
            <div className={styles.modalTitle}>
              <img className={styles.successful} src={successfulLogo} alt="" />
              <h3 className={styles.title}>Create Account Successfull!</h3>
              <p className={styles.description}>Lorem ipsum dolor sit amet consectetur. Velit ut ipsum tortor diam nec blandit ultrices et magna nisl eu.</p>
            </div>
            <div className={styles.modalButton}>
              <button onClick={handleSuccessClose} className={styles.button}>Sign In</button>
            </div>
          </div>
        </div>
      </div>
  </div>
  ) : null;
};

export default Successful;
