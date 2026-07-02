import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  UsableExtractedText: "",
}

const pdfslice = createSlice({
    name: 'pdf',
    initialState,
    reducers:{
        setUsableExtractedText:(state, action) => {
            state.UsableExtractedText = action.payload;
        }
    }
})

export const {setUsableExtractedText} = pdfslice.actions;
export default pdfslice.reducer