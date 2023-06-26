import {createSlice} from '@reduxjs/toolkit';

const reviewSlice = createSlice({
    name: 'review',
    initialState: {
        reviews: null,
        reviewsData:null

    },
    reducers: {
        setReviews(state, action) {
            state.reviews = action.payload;
        },
        setReviewsData(state, action) {
            state.reviewsData = action.payload;
        },
    }
});

export default reviewSlice;

