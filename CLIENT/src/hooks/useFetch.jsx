import { instance } from "../api";
import {useState,useEffect} from "react";

const useFetch = (url) =>{
    const [data,setData] = useState(null);
    const  [loading,setLoading] = useState(false);
    const  [error,setError] = useState(null);

    useEffect(()=>{
        const fetchData = async () => {
            setLoading(true);
            try{
                const {data} = await instance.get(url);
                setData(data);
            }
            catch(error){
                setError(error);
            }
            setLoading(false);
        }
        fetchData()
    },[url])
    return {data,loading,error}
}

export default useFetch