import React from 'react'
import styles from "./hero.module.scss"
import rectangle from "../../../assets/images/Home/Hero/Rectangle.svg"
import { getSliders } from '../../../api/product'
import HeroCard from './herocard'
const Hero = () => {
  const [sliders,setSliders] = React.useState([])
  React.useEffect(()=>{
    async function getAllSliders(){
      const slidersDB = await getSliders()
      setSliders(slidersDB)
    }
    getAllSliders()
    
  },[])
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.heroContainer}>
          <div className={styles.title}>Upgrade Your Wardrobe With Our Collection</div>
            <div className={styles.description}>Eget neque aenean viverra aliquam tortor diam nunc. Dis pellentesque lectus quis velit fusce aenean nunc dui consectetur. Eu lorem est ullamcorper nisl amet non mollis.</div>
            <div className={styles.buttons}>
              <button className={styles.buy}>Buy Now</button>
              <button className={styles.view}>View Detail</button>
          </div>
        </div>
      </div>
        {sliders?.data?.map(slider =>{
            return (
              console.log(slider.attributes),
              <div key={slider.id} className={styles.heroImage}>
                <img className={styles.background} src={`${import.meta.env.VITE_IMG_FILE}${slider.attributes.image.data.attributes.url}`} alt="" />
                <div className={styles.rectangle}>
                  <div className={styles.rectangleBox}>
                    <img className={styles.rectangleImage} src={rectangle} alt="" />
                    <div className={styles.lines}>
                      <div className={styles.line}></div>
                      <div className={styles.line}></div>
                      <div className={styles.line}></div>
                      <div className={styles.line}></div>
                    </div>
                    <div className={styles.cardContainer}>
                      <HeroCard title={slider.attributes.products.data[0].attributes.title} shortDescription={slider.attributes.products.data[0].attributes.shortDescription} rating={slider.attributes.products.data[0].attributes.rating} sold={slider.attributes.products.data[0].attributes.sold}/>
                    </div>
                  </div>
                </div>
              </div>
            )
        })}

    </section>
  )
}

export default Hero