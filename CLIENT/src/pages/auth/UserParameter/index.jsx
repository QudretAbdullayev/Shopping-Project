import React from 'react';
import styles from './userParameter.module.scss';
import userPhoto from '../../../assets/icon/User.svg'
import money from '../../../assets/icon/moneys.svg'
import coin from '../../../assets/icon/coin.svg'
import purchase from '../../../assets/icon/receipt-item.svg'
import wishlist from '../../../assets/icon/heart.svg'
import settings from '../../../assets/icon/setting-2.svg'
import logoutLogo from '../../../assets/icon/logout.svg'
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../../../store/reducers/auth';
const UserParameter = ({ userParameter, setUserParameter,userName,setLoginRegisterIsActive }) => {
  const modalRef = React.useRef();
  const [isOpen, setIsOpen] = React.useState(false);
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setUserParameter(false);    }
  };
  React.useEffect(() => {
    if (userParameter) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.body.style.overflow = 'hidden';
      setIsOpen(true);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.body.style.overflow = 'visible';
      setIsOpen(false);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.body.style.overflow = 'visible';
    };
  }, [userParameter]);
  const { token, userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    const answer = confirm("Are u sure to logout");

    if (answer) {
      dispatch(logout());
      setUserParameter(false);
      setLoginRegisterIsActive(false);
    }
  };
  
  return userParameter ? (
    <div className={styles.modal}>
      <div className={styles.modalContainer}>
        <div className={`${styles.modalDialog} ${isOpen ? `${styles.modalDialogOpen}` : ''}`}>
          <div ref={modalRef} className={styles.modalContent}>
            <div className={styles.modalBox}>
                <div className={styles.modalUser}>
                  <img className={styles.userPhoto} src={userPhoto} alt="" />
                  <div className={styles.userDescription}>
                    <p className={styles.userName}>{userName}</p>
                    <p className={styles.membership}>Platinum Member</p>
                  </div>
                </div>
                <div className={styles.line}></div>
                <div className={styles.setting}>
                  <p className={styles.settingTitle}>Wallet</p>
                  <div className={styles.settingParameters}>
                    <div className={styles.settingParameter}>
                      <div className={styles.lennyCoin}>
                        <img src={money} alt="" />
                        <p className={styles.lennyCoinName}>Lenny Balance</p>
                      </div>
                      <p className={styles.lennyCoinCount}>$928,28</p>
                    </div>
                    <div className={styles.settingParameter}>
                      <div className={styles.lennyCoin}>
                        <img src={coin} alt="" />
                        <p className={styles.lennyCoinName}>Lenny Coins</p>
                      </div>
                      <p className={styles.lennyCoinCount}>0.092</p>
                    </div>
                  </div>
                </div>
                <div className={styles.line}></div>
                <div className={styles.setting}>
                  <p className={styles.settingTitle}></p>
                  <div className={styles.settingParameters}>
                    <div className={styles.settingParameter}>
                      <div className={styles.lennyCoin}>
                        <img src={purchase} alt="" />
                        <p className={styles.lennyCoinName}>Purchase</p>
                      </div>
                    </div>
                    <div className={styles.settingParameter}>
                      <div className={styles.lennyCoin}>
                        <img src={wishlist} alt="" />
                        <p className={styles.lennyCoinName}>Wishlist</p>
                      </div>
                    </div>
                    <div className={styles.settingParameter}>
                      <div className={styles.lennyCoin}>
                        <img src={settings} alt="" />
                        <p className={styles.lennyCoinName}>Settings</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.line}></div>
                <div className={styles.signOut}>
                  <img src={logoutLogo} alt="" />
                  <p onClick={handleLogout}>Sign Out</p>
                </div>
            </div>
          </div>
        </div>
      </div>
  </div>
  ) : null;
};

export default UserParameter;
