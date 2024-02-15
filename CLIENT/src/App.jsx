import React from 'react'
import './App.scss'
import MainRoutes from './routes'
import { getCategories } from './api/product'
import {useDispatch,useSelector} from "react-redux"
import {  getAllCategory } from './store/reducers/categories';
function App() {
  const dispatch = useDispatch();
  const {allCategory} = useSelector((state) => state.category);
  React.useEffect(() => {
    async function fetchCategories() {
      try {
        const {data} = await getCategories();
        dispatch(getAllCategory({data}));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    fetchCategories();
  }, [dispatch]);

  return (
    <>
      <MainRoutes />
    </>

  )
}

export default App
