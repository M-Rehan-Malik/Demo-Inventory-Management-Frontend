import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { URL } from "../../App";


const initialState = {
    isLoading: false,
    data: new Array,
    error: null
}

export const verifyAdmin = createAsyncThunk("admin/verifyadmin", async (credentials, thunkAPI) => {
    try {
        const response = await fetch(`${URL}/auth/verifyadmin`, {
            method: 'POST',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify(credentials)
        });
        if (!response.ok) {
            const error = await response.json()
            return thunkAPI.rejectWithValue(error.msg);
        }

        return await response.json();

    } catch (error) {
        console.error(error)
    }
})



const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(verifyAdmin.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        }),
            builder.addCase(verifyAdmin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null
                state.data = action.payload;
            }),
            builder.addCase(verifyAdmin.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
})


export default adminSlice.reducer
