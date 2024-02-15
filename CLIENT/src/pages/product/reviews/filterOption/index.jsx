import { useState } from 'react';
import styles from './filterOption.module.scss';
import arrowUp from '../../../../assets/icon/arrow-up.svg';
import arrowDown from '../../../../assets/icon/arrow-down.svg';
import exit from '../../../../assets/icon/Exit.svg'
import {Checkbox,ConfigProvider} from 'antd';
import star from '../../../../assets/icon/star.svg'

const FilterOption = ({handleExitFilter}) => {
  const [isBestFilterVisible, setIsBestFilterVisible] = useState(false);
  const stars = [1,2,3,4,5]

  const handleToggleVisibility = (type) => {
    if (type === 'best') {
      setIsBestFilterVisible(!isBestFilterVisible);
    }
  };

  const renderSubcategories = (options) => (
    <div className={styles.subcategories}>
      {options.map((option,index) => (
        <div key={index} className={styles.subcategory}>
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
            <Checkbox checked>
            {option}
          </Checkbox>
          </ConfigProvider>
          <img src={star} alt="" />
        </div>
      ))}
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
          {isBestFilterVisible && renderSubcategories(stars)}
        </div>
      </div>
    </div>
  );
};

export default FilterOption;
