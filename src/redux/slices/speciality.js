import { createSlice } from "@reduxjs/toolkit";

const specialtieslice = createSlice({
    name: 'speciality',
    initialState: {
        specialties: null,
        specialityData: null,
        categoryData: null
    },
    reducers: {
        setSpecialties(state, action) {
            state.specialties = action.payload;
        },
        addSpeciality(state, action) {
            if (state.specialties === null) {
                state.specialties = [];
            }
            state.specialties.push(action.payload);
        },
        updateSpeciality(state, action) {
            const index = state.specialties.findIndex(speciality => speciality._id === action.payload._id);
            state.specialties[index] = action.payload;
        },
        changeSpecialityState(state, action) {
            const updatedSpeciality = action.payload;
            const existingSpecialityIndex = state.specialties.findIndex(
                (speciality) => speciality._id === updatedSpeciality._id
            );
            if (existingSpecialityIndex !== -1) {
                state.specialties[existingSpecialityIndex] = updatedSpeciality;
            }
        },
        deleteSpeciality(state, action) {
            const deletedSpecialityId = action.payload || action;
            return {
                ...state,
                specialties: state.specialties.filter(speciality => speciality._id !== deletedSpecialityId)
            };
        },
        setSpecialityData(state, action) {
            state.specialityData = action.payload;
        },
        setCategoryData(state, action) {
            state.categoryData = action.payload;
        }
    }
});

export default specialtieslice;