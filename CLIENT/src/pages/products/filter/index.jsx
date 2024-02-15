import React from 'react'
import styles from './filter.module.scss'
import './filter.scss'
import line from '../../../assets/icon/Line 1.svg'
import filter from '../../../assets/icon/filter.svg'
import element from '../../../assets/icon/element-3.svg'
import menu from '../../../assets/icon/menu.svg'
import { Select } from 'antd'

const Filter = ({handleOpenFilter, setParams, defaultValue}) => {
  return (
    <div className={styles.filterBar}>
      <div className={`${styles.filterBox} antNewDesign`}>
        <p className={styles.sort}>Sort By:</p>
        <Select
        defaultValue={defaultValue}
        onChange={(sort) => {setParams("sort", sort);setParams("page", 1)}}
        options={[
          {value: "asc", label: "Price Asc"},
          {value: "desc", label: "Price Desc"},
        ]}
        />
      </div>
      <div className={styles.boxs}>
        <div onClick={handleOpenFilter} className={`${styles.box} ${styles.filter}`}><img src={filter} alt="" /></div>
        <div className={styles.line}><img src={line} alt="" /></div>
        <div className={styles.design}>
          <div className={`${styles.box} ${styles.active}`}><img src={element} alt="" /></div>
          <div className={styles.box}><img src={menu} alt="" /></div>
        </div>
      </div>
    </div>
  )
}

export default Filter