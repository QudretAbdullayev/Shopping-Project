import { useState } from 'react'
import styles from './products.module.scss'
import Filter from './filter'
import Page from '../../components/page'
import Card from '../../components/card';
import Title from './title'
import FilterOption from './filterOption'
import {Pagination, Skeleton} from 'antd'
import useFetch from '../../hooks/useFetch';
import {useSearchParams,Link} from 'react-router-dom'
import { roots } from "../../routes/constants";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageSize = 2;
  const [scrollPosition, setScrollPosition] = useState(0);
  const {data,loading,error} = useFetch(`/products?pagination[page]=
  ${searchParams.get("page") || 1}
  &pagination[pageSize]=${pageSize}
  &sort[0]=price:${searchParams.get("sort") || "asc"}
  &${(!isNaN(searchParams.get("minPrice")) && searchParams.get("minPrice")!=null) ? `filters[$or][0][price][$gt]=${searchParams.get("minPrice")}` : ''}
  &${(!isNaN(searchParams.get("maxPrice"))&& searchParams.get("maxPrice")!=null) ? `filters[$or][0][price][$lt]=${searchParams.get("maxPrice")}` : ''}
  &${searchParams.get("categories")?.split(',').filter(Boolean).length>0 && `${searchParams.get("categories")
  .split(",")
  .map((filter) => `[filters][categories][id][$eq]=${filter}`)
  .join("&")}`}
  &populate=*`);
  const [filterActive, setFilterActive] = useState(false);
  const handleOpenFilter = (e) => {
    e.preventDefault()
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
    setFilterActive(!filterActive);
  };
  const handleExitFilter = (e) => {
    e.preventDefault()
    window.scrollTo(0, scrollPosition); 
    document.body.style.overflow = 'visible';
    setFilterActive(!filterActive);
  }
  const setParams = (page, name) =>{
    searchParams.set(page, name);
    setSearchParams(searchParams);
  }

  const checkedCheckboxesArray = searchParams.get("categories")?.split(',') || [];
  let newId = ''
  checkedCheckboxesArray.length==1 ? newId=checkedCheckboxesArray[0] : newId='';
  return (
    
    <main className={styles.main}>
        <section className={styles.section}>
          <Page idx={newId}/>
          <div className={styles.container}>
            <Title className={styles.titleBox}/>
            <Filter handleOpenFilter={handleOpenFilter} setParams={setParams} className={styles.filterBox} defaultValue={searchParams.get("sort") || "Price Asc"}/>
          </div>
        </section>
        <section className={styles.productsSection}>
          <div className={styles.productsContainer}>
            <div className={`${styles.filterOption} ${filterActive ? styles.filterActive : styles.filterDeactive}`}>
              <FilterOption handleExitFilter={handleExitFilter} setParams={setParams} searchParams={searchParams} setSearchParams={setSearchParams} checkedCheckboxesArray={checkedCheckboxesArray}/>
            </div>
            <div className={styles.productsBox}>
            {loading ? (
                <div className={styles.products}>
                    {[1, 2, 3, 4].map((product) => (
                      <div key={product}>
                        <Skeleton 
                          paragraph={{
                            rows: 4,
                          }}
                        />
                      </div>
                    ))}
                  </div>
                ):(
                  <>
                  <div className={styles.products}>
                    {data?.data?.map((product) => {
                    return (
                      <Link key={product.id} to={`${roots.PRODUCT}${product.id}`}>
                        <Card
                        key={product?.id}
                        title={product?.attributes?.title}
                        price={product?.attributes?.price}
                        shortDescription={product?.attributes?.shortDescription}
                        sold={product?.attributes?.sold}
                        rating={product?.attributes?.rating}
                        image={`${import.meta.env.VITE_IMG_FILE}${product?.attributes?.image.data[0].attributes.url}`}
                        />
                    </Link>
                    );
                  })}
                  </div>
                  <div className={styles.paginationBox}>
                    <Pagination 
                      defaultCurrent={`${searchParams.get("page") || 1}`}
                      total={data?.meta?.pagination?.total}
                      defaultPageSize={data?.meta?.pagination?.pageSize} 
                      onChange={(page)=>{setParams("page", page)}}
                    />
                  </div>
                  </>
                )}
            </div>
          </div>
        </section>
    </main>
  )
}

export default Products
