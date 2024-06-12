import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { URL } from "../../App";


export const getSupplies = createAsyncThunk("supplies/getSupplies", async (thunkAPI) => {
    try {
        const response = await fetch(`${URL}/supply/getsupplies`,
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

export const addSupply = createAsyncThunk("supplies/addSupply", async (supply, thunkAPI) => {
    try {
        const response = await fetch(`${URL}/supply/addsupply`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify(supply)
        })

        if (!response.ok) {
            const error = await response.json()
            return thunkAPI.rejectWithValue(error.msg);
        }

        return await response.json()
    } catch (error) {
        console.error("Error in fetching")
    }
})

export const editSupply = createAsyncThunk("supplies/editSupply", async ({ id, supplyToEdit }, thunkAPI) => {
    try {
        const response = await fetch(`${URL}/supply/updatesupply/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify(supplyToEdit)
        })
        if (!response.ok) {
            const error = await response.json()
            return thunkAPI.rejectWithValue(error.msg);
        }
        return await response.json()
    } catch (error) {
        console.error(error)
    }
})

export const deleteSupply = createAsyncThunk("supplies/deleteSupply", async (id, thunkAPI) => {
    try {
        const response = await fetch(`${URL}/supply/deletesupply/${id}`, {
            method: "DELETE",
            headers: {
                'auth-token': localStorage.getItem("token")
            }
        });
        if (!response.ok) {
            const error = await response.json()
            return thunkAPI.rejectWithValue(error.msg);
        }
        return await response.json();
    } catch (error) {
        console.error("Error in fetching")
    }
})

const initialState = {
    isLoading: false,
    data: new Array,
    error: null,
    successMsg: null
}

const supplySlice = createSlice({
    name: "supplies",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getSupplies.pending, (state) => {
            state.isLoading = true;
            state.error = null;
            state.successMsg = null;
        }),
            builder.addCase(getSupplies.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null
                state.data = action.payload;
            }),
            builder.addCase(getSupplies.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.successMsg = null;
            })

        builder.addCase(addSupply.pending, (state) => {
            state.isLoading = true;
            state.error = null;
            state.successMsg = null;
        }),
            builder.addCase(addSupply.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.data = action.payload;
                state.successMsg = action.payload.msg;
            }),
            builder.addCase(addSupply.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.successMsg = null;
            })

        builder.addCase(editSupply.pending, (state) => {
            state.isLoading = true;
            state.error = null;
            state.successMsg = null;
        }),
            builder.addCase(editSupply.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.data = action.payload;
                state.successMsg = action.payload.msg;
            }),
            builder.addCase(editSupply.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.successMsg = null;
            })

        builder.addCase(deleteSupply.pending, (state) => {
            state.isLoading = true;
            state.error = null;
            state.successMsg = null;
        }),
            builder.addCase(deleteSupply.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.data = action.payload;
                state.successMsg = action.payload.msg;
            }),
            builder.addCase(deleteSupply.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.successMsg = null;
            })

    }
})


export default supplySlice.reducer;