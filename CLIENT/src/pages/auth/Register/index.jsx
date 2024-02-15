import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './register.module.scss';
import Facebook from '../../../assets/icon/Facebook.svg'
import { reg } from '../../../api/auth'; 
const Register = ({ registerIsActive, setRegisterIsActive, setIsSuccess }) => {

  const modalRef = React.useRef();

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setRegisterIsActive(false);
    }
  };

  React.useEffect(() => {
    if (registerIsActive) {
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
  }, [registerIsActive]);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });
  
  const onSubmit = async (data) => {
    const registeredUser = await reg(data);
    if(registeredUser){
      reset();
      setRegisterIsActive(false);
      setIsSuccess(true);
    }
    
  };

  const passwordValidation = (value) => {
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;

    if (!uppercaseRegex.test(value)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!lowercaseRegex.test(value)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!numberRegex.test(value)) {
      return 'Password must contain at least one number';
    }

    return true;
  };
  
  return registerIsActive ? (
    <div className={styles.modal}>
      <div className={styles.modalDialog}>
        <div ref={modalRef} className={styles.modalContent}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.modalTitle}>
              <h3>Sign Up</h3>
            </div>
            <div className={styles.inputAreas}>
              <div className={styles.inputArea}>
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  {...register("username", {
                    required: "Name is required field!",
                  })}
                />
                {errors?.username && (
                  <div className="error-text">{errors.username.message}</div>
                )}
              </div>
              <div className={styles.inputArea}>
                <label htmlFor="">Phone Number or Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is required field",
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Please enter valid email",
                    },
                  })}
                />
                {errors?.email && (
                  <div className="error-text">{errors.email.message}</div>
                )}
              </div>
              <div className={styles.inputArea}>
                <label htmlFor="">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  {...register('password', {
                    required: 'Password is required field',
                    minLength: { value: 7, message: '**Password must be more than 7 characters' },
                    maxLength: { value: 20, message: '**Password cannot exceed more than 20 characters' },
                    validate: passwordValidation,
                  })}
                />
                {errors?.password && (
                  <div className={styles.error}>{errors.password.message}</div>
                )}
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

export default Register;
