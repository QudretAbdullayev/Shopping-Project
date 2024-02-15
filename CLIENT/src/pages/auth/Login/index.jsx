import React from 'react';
import styles from './login.module.scss';
import Facebook from '../../../assets/icon/Facebook.svg'
import { login } from "../../../api/auth";
import { useDispatch } from "react-redux";
import { getUserInfo } from "../../../store/reducers/auth";
const Login = ({ loginIsActive, setLoginIsActive }) => {
  React.useEffect(() => {
    if (loginIsActive) {
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
  }, [loginIsActive]);
  
  const dispatch = useDispatch();
  const [loginData, setLoginData] = React.useState({
    identifier: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginUser = await login(loginData);
    
    if (loginUser) {
      dispatch(getUserInfo(loginUser));
      setLoginIsActive(false);
      setLoginData(
        {
          identifier: "",
          password: "",
        });
    }
  };
  const modalRef = React.useRef();
  
  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setLoginIsActive(false);
    }
  };
  
  return loginIsActive ? (
    <div className={styles.modal}>
      <div className={styles.modalDialog}>
        <div ref={modalRef} className={styles.modalContent}>
          <form onSubmit={handleSubmit}  className={styles.form}>
            <div className={styles.modalTitle}>
              <h3>Sign In</h3>
            </div>
            <div className={styles.inputAreas}>
              <div className={styles.inputArea}>
                <label htmlFor="">Phone Number or Email</label>
                <input
                  type="name"
                  name="identifier"
                  value={loginData.identifier}
                  placeholder="Username or email"
                  onChange={handleChange}
                />
              </div>
              <div className={styles.inputArea}>
                <label htmlFor="">Password</label>
                <input
                    type="password"
                    name="password"
                    value={loginData.password}
                    placeholder="Password"
                    onChange={handleChange}
                  />
              </div>
            </div>
            <div className={styles.modalButton}>
              <button type='submit' className={styles.button}>Sign Up</button>
            </div>
            <div className={styles.method}>
            <div className={styles.line}></div>
              <div className={styles.text}>
                <p>Or using other method</p>
              </div>
            </div>
            <div className={styles.modalFacebookButton}>
              <img src={Facebook} alt="" />
              <p>
                Sign Up with Facebook
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : null;
};

export default Login;
