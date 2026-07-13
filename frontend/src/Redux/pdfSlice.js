import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  UsableExtractedText: "",
  generatedContent: { questions: [] }, // ← Object with questions property
  isLoading: false,
};

const pdfslice = createSlice({
  name: "pdf",
  initialState,
  reducers: {
    setUsableExtractedText: (state, action) => {
      state.UsableExtractedText = action.payload;
    },
    setGeneratedContent: (state, action) => {
      state.generatedContent = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUsableExtractedText, setGeneratedContent, setLoading } =
  pdfslice.actions;
export default pdfslice.reducer;
