import { useState,useEffect } from 'react';
import styles from './filterOption.module.scss';
import arrowUp from '../../../assets/icon/arrow-up.svg';
import arrowDown from '../../../assets/icon/arrow-down.svg';
import exit from '../../../assets/icon/Exit.svg'
import {Checkbox, InputNumber,ConfigProvider} from 'antd';
import { getCategories } from '../../../api/product';

const FilterOption = ({handleExitFilter,setParams,searchParams,setSearchParams,checkedCheckboxesArray}) => {
  const [checkedCheckboxes, setCheckedCheckboxes] = checkedCheckboxesArray.length>0 ? useState(checkedCheckboxesArray.map((x) => Number(x))) : useState([]);
  const [isBestFilterVisible, setIsBestFilterVisible] = useState(false);
  const [isPriceFilterVisible, setIsPriceFilterVisible] = useState(false);
  const [categoriesData,setCategoriesData] = useState([]);
  const onChangeSearchParams = (e, categoryId) =>{
    const categoriesString = searchParams.get("categories") || "";
    const categories = categoriesString.split(',').filter(Boolean);
    const updatedCategories = [...categories.map(Number)];
    setParams("page", 1)
    if (e.target.checked) {
      if (!updatedCategories.includes(Number(categoryId))) {
        updatedCategories.push(Number(categoryId));
      }
    } else {
      const index = updatedCategories.indexOf(Number(categoryId));
      if (index !== -1) {
        updatedCategories.splice(index, 1);
      }
    }
    setCheckedCheckboxes((prevState) => {
      if (e.target.checked) {
        return [...prevState, categoryId]; // Add ID to checked checkboxes
      } else {
        return prevState.filter((id) => id !== categoryId); // Remove ID from checked checkboxes
      }
    });
    searchParams.set("categories", updatedCategories.join(',')); // Convert back to string for searchParams
    setSearchParams(searchParams);
  }

  const handlePriceRangeSearch = (min, max) => {
    setParams("minPrice", min);
    setParams("maxPrice", max);
    setParams("page", 1);
  };
  useEffect(()=>{
    async function getAllCategories(){
      const categoriesDB = await getCategories()
      setCategoriesData(categoriesDB)
    }
    getAllCategories()
  },[searchParams])
  
  const handleToggleVisibility = (type) => {
    if (type === 'best') {
      setIsBestFilterVisible(!isBestFilterVisible);
    } else if (type === 'price') {
      setIsPriceFilterVisible(!isPriceFilterVisible);
    }
  };

  const renderSubcategories = (options) => (
    <div className={styles.subcategories}>
      {options.map((option) => (
        <div key={option.id} className={styles.subcategory}>
          <ConfigProvider
            theme={{
              components: {
                Checkbox: {
                  colorPrimary: "#1D9E34",
                  colorPrimaryBorder: "#1D9E34",
                  colorPrimaryHover: "#1D9E34",
                  controlInteractiveSize: 24,
                  paddingXS: 8,
                  marginXS: 0,
                  colorText: "#818B9C",
                },
              },
            }}
          >
            <Checkbox name={`${option.id}`} onChange={(e) => onChangeSearchParams(e, option.id)} checked={checkedCheckboxes.includes(option.id)}>
            {option.attributes.title}
          </Checkbox>
          </ConfigProvider>
        </div>
      ))}
    </div>
  );

  const renderPriceRanges = () => (
    <div className={styles.priceCategories}>
      <div className={styles.input}>
          <InputNumber
            min={0}
            value={`${!isNaN(searchParams.get("minPrice")) && searchParams.get("minPrice")!=null ? `${searchParams.get("minPrice")}` : ''}`}
            onChange={(minPrice) => {setParams("minPrice", minPrice); setParams("page", 1)}}
          />
          <InputNumber
            min={0}
            value={`${!isNaN(searchParams.get("maxPrice")) && searchParams.get("maxPrice")!=null ? `${searchParams.get("maxPrice")}` : ''}`}
            onChange={(maxPrice) => {setParams("maxPrice", maxPrice); setParams("page", 1)}}
          />
      </div>
      <div className={styles.priceBoxs}>
          <div className={styles.priceBox} onClick={() => handlePriceRangeSearch(0, 200)}>$0 - $200</div>
          <div className={styles.priceBox} onClick={() => handlePriceRangeSearch(200, 500)}>$200 - $500</div>
          <div className={styles.priceBox} onClick={() => handlePriceRangeSearch(500, 1500)}>$500 - $1500</div>
        </div>
    </div>
  );

  return (
    <div className={styles.optionContainer}>
      <div className={styles.filterOption}>
        <div className={styles.filterTitle}>
          <h4>Filter Option</h4>
          <img onClick={handleExitFilter} src={exit} alt="" />
        </div>
        <div className={styles.category}>
          <div onClick={() => handleToggleVisibility('best')} className={styles.title}>
            <h2>Best Filter</h2>
            {isBestFilterVisible ? <img src={arrowUp} alt="" /> : <img src={arrowDown} alt="" />}
          </div>
          {isBestFilterVisible && renderSubcategories(categoriesData.data)}
        </div>
        <div className={styles.category}>
          <div onClick={() => handleToggleVisibility('price')} className={styles.title}>
            <h2>Price Range</h2>
            {isPriceFilterVisible ? <img src={arrowUp} alt="" /> : <img src={arrowDown} alt="" />}
          </div>
          {isPriceFilterVisible && renderPriceRanges()}
        </div>
      </div>
    </div>
  );
};

export default FilterOption;
