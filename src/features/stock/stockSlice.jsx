import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { URL } from "../../App";


const initialState = {
    isLoading: false,
    error: null,
    data: new Array,
    successMsg: null
}

export const getStock = createAsyncThunk("stock/getStock", async (thunkAPI) => {
    try {
        const response = await fetch(`${URL}/stock`,
            {
                headers: {
                    'auth-token': localStorage.getItem("token")
                }
            }
        );

        if (!response.ok) {
            const error = await response.json()
            return thunkAPI.rejectWithValue(error.msg);
        }

        return await response.json()

    } catch (error) {
        console.error("Error in fetching")
    }
}
)

export const generateStockReport = createAsyncThunk("stock/generateStockReport", async (productsArr, thunkAPI) => {
    try {
        const response = await fetch(`${URL}/stockreport/getstockreport`, {
            method: "POST",
            headers: {
                'auth-token': localStorage.getItem("token"),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productsArr)
        });
        if (!response.ok) {
            const error = await response.json()
            return thunkAPI.rejectWithValue(error.msg);
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const printWindow = window.open(url);
        printWindow.onload = () => {
            printWindow.print();
        }

    } catch (error) {
        console.error("Error in fetching", error)
    }
})

const stockSlice = createSlice({
    name: "stock",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getStock.pending, (state) => {
            state.isLoading = true;
            state.error = null;
            state.successMsg = null;
        }),
            builder.addCase(getStock.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null
                state.data = action.payload;
                state.successMsg = action.payload.msg;
            }),
            builder.addCase(getStock.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.successMsg = null;
            })

        builder.addCase(generateStockReport.pending, (state) => {
            state.isLoading = true;
            state.error = null;
            state.successMsg = null;
        }),
            builder.addCase(generateStockReport.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null
            }),
            builder.addCase(generateStockReport.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.successMsg = null;
            })
    }
})

export default stockSlice.reducer;