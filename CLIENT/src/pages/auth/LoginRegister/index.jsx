import React from 'react';
import styles from './loginRegister.module.scss';

const LoginRegister = ({ loginRegisterIsActive, setLoginRegisterIsActive, setLoginIsActive,setRegisterIsActive }) => {
  const modalRef = React.useRef();
  const [isOpen, setIsOpen] = React.useState(false);
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setLoginRegisterIsActive(false);
    }
  };
  const handleLoginOpen = (e) => {
    e.preventDefault();
    setLoginRegisterIsActive(false);
    setLoginIsActive(true);
  };
  const handleRegisterOpen = (e) => {
    e.preventDefault();
    setLoginRegisterIsActive(false);
    setRegisterIsActive(true);
  };
  React.useEffect(() => {
    if (loginRegisterIsActive) {
      document.addEventListener('mousedown', handleOutsideClick);
      setIsOpen(true);
      document.body.style.overflow = 'hidden';

    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
      setIsOpen(false);
      document.body.style.overflow = 'visible';
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.body.style.overflow = 'visible';
    };
  }, [loginRegisterIsActive]);
    

  return loginRegisterIsActive ? (
    <div className={styles.modal} >
      <div  className={`${styles.modalDialog} ${isOpen ? `${styles.modalDialogOpen}` : ''}`} >
        <div ref={modalRef} className={styles.modalContent}>
          <div className={styles.modalBox}>
            <div className={styles.modalButton}>
              <button onClick={handleRegisterOpen} className={styles.button}>Sign Up</button>
            </div>
            <div className={styles.modalButton}>
              <button onClick={handleLoginOpen} className={styles.button}>Sign In</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default LoginRegister;
