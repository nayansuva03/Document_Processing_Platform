import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: "",
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        setusername: (state, action) => {
                state.username = action.payload;
        }
    }
});

export const {setusername} = userSlice.actions;
export default userSlice.reducer;