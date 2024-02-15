import React from 'react'
import styles from "./articles.module.scss"
import { getArticles } from '../../../api/product'
import Article from './article'
import Heading from '../../../components/heading'

const Articles = () => {
  const [articles,setArticles] = React.useState([])

  React.useEffect(()=>{
    async function getAllArticles(){
      const articlesDB = await getArticles()
      setArticles(articlesDB)
    }
    getAllArticles()
    
  },[])

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <Heading title={"Lenny’s Article"} />
        <div className={styles.articles}>
          {articles?.data?.map(article =>{
            return (<Article key={article.id} id={article.id} image={`${import.meta.env.VITE_IMG_FILE}${article.attributes.image.data.attributes.url}`} date={`${article.attributes.date}`} description={article.attributes.description} title={article.attributes.title}/>)
          })}
        </div>
      </div>
    </section>
  )
}

export default Articles