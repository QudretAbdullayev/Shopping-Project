import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const getReviews = createAsyncThunk('review/fetchReview', async (url, { rejectWithValue}) => {
    try {
        const result = await axios.get(`${url}`) 
        return result.data.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
