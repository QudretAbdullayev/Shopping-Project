import {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import styles from "./header.module.scss"
import logo from '../../assets/icon/Logo.svg'
import search from "../../assets/icon/search-normal.svg"
import shoppingCard from "../../assets/icon/shopping-cart.svg"
import notificationCard from "../../assets/icon/notification.svg"
import smsCard from "../../assets/icon/sms.svg"
import hamburgerMenu from "../../assets/icon/menu.svg"
import line from "../../assets/icon/Line 1.svg"
import userPhoto from "../../assets/icon/User.svg"
import userPhotoLogin from '../../assets/images/Header/Frame 3.svg'
import { Login, Register, Successful, UserParameter, LoginRegister } from "../../pages"
import useFetch from '../../hooks/useFetch';
import {Link} from 'react-router-dom'
import { roots } from "../../routes/constants";
import SearchCardList from './searchCardList'
import { getProfileData } from "../../api/basket"
import { updateBasket, updateTotalBasket } from "../../store/reducers/basket"


const Header = ({loginRegisterIsActive,setLoginRegisterIsActive}) => {
  const dispatch = useDispatch()
  const {token, userData} = useSelector((state) => state.auth)
  const {basket,total} = useSelector((state) => state.basket)
  const {allCategory} = useSelector((state) => state.category)
  const [registerIsActive, setRegisterIsActive] = useState(false);
  const [loginIsActive, setLoginIsActive] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [userParameter, setUserParameter] = useState(false);
  const [input, setInput] = useState("");
  const [categoryID, setCategoryID] = useState(0);
  const {data,loading,error} = useFetch(`/products?
  filters[title][$contains]=${input}
  ${categoryID > 0 ? `&[filters][categories][id][$eq]=${categoryID}` : ''}
  &populate=*`);
  const [products, setProducts] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  console.log(total)
  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  const handleChange = (e) =>{
    setInput(e.target.value);
  }

  const handleCategoryChange = (e) => {
  const selectedCategoryID = e.target.value;
  setCategoryID(selectedCategoryID);
};

  useEffect(() => {
    if(input!=""){
      setProducts(data?.data)
    }
    if(input==""){
      setProducts([])
    }
    const fetchProfileData = async () => {
    const profileData = await getProfileData(userData.id, token);
    if (profileData) {
    const totalQuantityInBasket = profileData.basket
      .filter((product) => product.checked)
      .reduce((total, product) => total + product.quantity, 0);
      dispatch(updateBasket(profileData.basket));
      dispatch(updateTotalBasket(totalQuantityInBasket));
    }
  };
    fetchProfileData();
  }, [loginRegisterIsActive,input,categoryID]);

  const toggleModal = () => {
    setLoginRegisterIsActive(!loginRegisterIsActive);
    document.body.style.overflow = loginRegisterIsActive ? 'visible' : 'hidden';
  };
  const toggleUserParameter = () => {
    setUserParameter(!userParameter);
    document.body.style.overflow = registerIsActive ? 'visible' : 'hidden';
  };

  return (
    <>
    <header className={styles.header}>
      <div className={styles.container}>
        <Link className={styles.siteLogoBox} to={roots.HOME}><img className={styles.siteLogo} src={logo} alt="" /></Link>
        <div className={styles.searchBarContainer} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div className={styles.searchBar}>
            <div className={styles.search}>
            <select className={styles.select} onChange={handleCategoryChange}>
              <option key={0} value={0}>All Categories</option>
              {Object.keys(allCategory).map((category) => (
                <option key={category} value={category}>{allCategory[category]}</option>
              ))}
            </select>
            <img className={styles.line} src={line} alt="" />
            <input type="text" placeholder="Search product" value={input} onChange={handleChange}/>
            </div>
            <img src={search} alt="" />
          </div>
          <div className={`${isHovering ? styles.searching : styles.searchingHidden}`}>
            {products && products.length > 0 && <SearchCardList products={products} setInput={setInput} setIsHovering={setIsHovering} setProducts={setProducts} />}
          </div>
        </div>
        <div className={styles.notificationBars}>
          {token ? (
            <Link to={`${roots.PAYMENT}`}>
              <div className={styles.notificationBar}>
                <img src={shoppingCard} alt="" />
                {total>0 ? <div className={styles.notification}>{total}</div> :<></>}
              </div>
            </Link>
          ) : (
            <div className={styles.notificationBar} onClick={() => setLoginRegisterIsActive(true)}>
              <img src={shoppingCard} alt="" />
            </div>
          )}
          {token && (
            <>
              <div className={styles.notificationBar}>
                <img src={notificationCard} alt="" />
                <div className={styles.notification}>6</div>
              </div>
              <div className={styles.notificationBar}>
                <img src={smsCard} alt="" />
                <div className={styles.notification}>6</div>
              </div>
            </>
          )}
        </div>
        <div className={styles.lineBar}>
          <img src={line} alt="" />
        </div>
        <div className={styles.auth}>
          {!token && (
            <>
              <div className={styles.hamburger} onClick={toggleModal}>
                <img src={hamburgerMenu} alt="hamburger" />
              </div>
              <div className={styles.user} onClick={toggleModal}>
              <img src={userPhoto} alt="" />
              <LoginRegister setRegisterIsActive={setRegisterIsActive} setLoginIsActive={setLoginIsActive} loginRegisterIsActive={loginRegisterIsActive} setLoginRegisterIsActive={setLoginRegisterIsActive}/>
            </div>
            </>
          )}
          {token && (
            <>
              <div className={styles.hamburger} onClick={toggleModal}>
                <img onClick={toggleUserParameter} src={hamburgerMenu} alt="hamburger" />
              </div>
              <div className={styles.user}>
                <img onClick={toggleUserParameter} src={userPhotoLogin} alt="" />
                <UserParameter userParameter={userParameter} setUserParameter={setUserParameter} userName={userData.username} setLoginRegisterIsActive={setLoginRegisterIsActive}/>
              </div>
            </>
          )}
          <Login loginIsActive={loginIsActive} setLoginIsActive={setLoginIsActive} setLoginRegisterIsActive={setLoginRegisterIsActive}/>
          <Register registerIsActive={registerIsActive} setRegisterIsActive={setRegisterIsActive} setIsSuccess={setIsSuccess} setLoginRegisterIsActive={setLoginRegisterIsActive}/>
          <Successful isSuccess={isSuccess} setIsSuccess={setIsSuccess} setLoginIsActive={setLoginIsActive}/>
        </div>
      </div>
    </header>
    </>
  )
}

export default Header