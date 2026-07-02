import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    extracteText="",
}

const pdfSlice = createSlice({
    name: 'pdf',
    initialState,
    reducers:{
        setExtractedText:(state, action) => {
            state.extracteText = action.payload;
        }
    },
})

export const {setExtractedText} = pdfSlice.actions;
export default pdfSlice.reducer;