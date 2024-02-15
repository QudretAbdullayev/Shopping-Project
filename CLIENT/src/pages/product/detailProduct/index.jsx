import React from 'react'
import styles from './detailProduct.module.scss'
import tick from '../../../assets/icon/green-tick-circle.svg'

const DetailProduct = ({title,description,spesification,inTheBox,system,spesificationAll,inTheBoxAll,systemAll}) => {
  return (
    <div className={styles.detailProduct}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <div className={styles.spesifications}>
          {spesification ?
          <div className={styles.spesification}>
            <h4>{spesification}</h4>
            <table>
              <tbody>
                {spesificationAll && spesificationAll.map((product, index) => (
                  <tr key={index}>
                    <th>{Object.keys(product)[0]}</th>
                    <td>{Object.values(product)[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          : 
          <></>}
          {inTheBox ? 
            <div className={styles.inTheBox}>
              <h4>{inTheBox}</h4>
              <div className={styles.boxParameters}>
                {inTheBoxAll && inTheBoxAll.map((product, index) => (
                  <div key={index} className={styles.boxParameter}>
                  <div className={styles.tick}><img src={tick} alt="" /></div>
                  <p>{product}</p>
                </div>
                ))}
              </div>
            </div>
            : <></>
          }
          {system && systemAll ? 
            <div className={styles.system}>
              <h4>{system}</h4>
              <div className={styles.parameters}>
                {systemAll && systemAll.map((product, index) => (
                <div key={index} className={styles.parameter}>
                  <p>-</p>
                  <p>{product}</p>
                </div>
                ))}
              </div>
            </div>
            : <></>
          }
        </div>
    </div>
  )
}

export default DetailProduct