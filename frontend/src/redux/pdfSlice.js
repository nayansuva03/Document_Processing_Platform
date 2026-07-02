import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    extractedText:"",
}

const pdfSlice = createSlice({
    name: 'pdf',
    initialState,
    reducers:{
        setExtractedText:(state, action) => {
            state.extractedText = action.payload;
        }
    },
})

export const {setExtractedText} = pdfSlice.actions;
export default pdfSlice.reducer;