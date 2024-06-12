import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { URL } from "../../App";


const getFormattedDate = (date) => {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    const fullDate = `${month} ${day}, ${year}`;
    return fullDate;
};

export const getSales = createAsyncThunk("sales/getSales", async (thunkAPI) => {
    try {
        const response = await fetch(`${URL}/sale/getsales`,
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
        const data = await response.json();

        data.forEach((sale) => {
            sale.date = getFormattedDate(new Date(sale.date));
        })

        return data

    } catch (error) {
        console.error("Error in fetching")
    }
}
)

export const addSale = createAsyncThunk("sales/addSale", async (supply, thunkAPI) => {
    try {
        const response = await fetch(`${URL}/sale/addsale`, {
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

export const editSale = createAsyncThunk("sales/updateSale", async ({ id, saleToEdit }, thunkAPI) => {
    try {
        const response = await fetch(`${URL}/sale/updatesale/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify(saleToEdit)
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

export const deleteSale = createAsyncThunk("sales/deleteSale", async (id, thunkAPI) => {
    try {
        const response = await fetch(`${URL}/sale/deletesale/${id}`, {
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

export const generateBill = createAsyncThunk("sales/generateBill", async (id, thunkAPI) => {
    try {
        const response = await fetch(`${URL}/bill/getbill/${id}`, {
            method: "GET",
            headers: {
                'auth-token': localStorage.getItem("token")
            }
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

export const generateSalesReport = createAsyncThunk("sales/generateSaleReport", async (date, thunkAPI) => {
    try {
        const response = await fetch(`${URL}/salesreport/getsalesreport`, {
            method: "POST",
            headers: {
                'auth-token': localStorage.getItem("token"),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ date })
        });
        console.log(date)
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

export const generateMonthlyReport = createAsyncThunk("sales/generateMonthlyReport", async ({ month, year }, thunkAPI) => {
    try {
        const response = await fetch(`${URL}/monthlyreport/getmonthlyreport`, {
            method: "POST",
            headers: {
                'auth-token': localStorage.getItem("token"),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ month, year })
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

const initialState = {
    isLoading: false,
    data: new Array,
    error: null,
    successMsg: null
}

const saleSlice = createSlice({
    name: "sales",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getSales.pending, (state) => {
            state.isLoading = true;
            state.error = null;
            state.successMsg = null;
        }),
            builder.addCase(getSales.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null
                state.data = action.payload;
                state.successMsg = action.payload.msg;
            }),
            builder.addCase(getSales.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.successMsg = null;
            })

        builder.addCase(addSale.pending, (state) => {
            state.isLoading = true;
            state.error = null;
            state.successMsg = null;
        }),
            builder.addCase(addSale.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.data = action.payload;
                state.successMsg = action.payload.msg;
            }),
            builder.addCase(addSale.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.successMsg = null;
            })

        builder.addCase(editSale.pending, (state) => {
            state.isLoading = true;
            state.error = null;
            state.successMsg = null;
        }),
            builder.addCase(editSale.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.data = action.payload;
                state.successMsg = action.payload.msg;
            }),
            builder.addCase(editSale.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.successMsg = null;
            })

        builder.addCase(deleteSale.pending, (state) => {
            state.isLoading = true;
            state.error = null;
            state.successMsg = null;
        }),
            builder.addCase(deleteSale.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.data = action.payload;
                state.successMsg = action.payload.msg;
            }),
            builder.addCase(deleteSale.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.successMsg = null;
            })

        builder.addCase(generateBill.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        }),
            builder.addCase(generateBill.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.data = action.payload;
            }),
            builder.addCase(generateBill.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

        builder.addCase(generateSalesReport.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        }),
            builder.addCase(generateSalesReport.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.data = action.payload;
            }),
            builder.addCase(generateSalesReport.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

        builder.addCase(generateMonthlyReport.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        }),
            builder.addCase(generateMonthlyReport.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.data = action.payload;
            }),
            builder.addCase(generateMonthlyReport.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
})


export default saleSlice.reducer;