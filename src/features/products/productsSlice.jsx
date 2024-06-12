import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { URL } from "../../App";


export const getProducts = createAsyncThunk("products/getProducts", async (thunkAPI) => {
  try {
    const response = await fetch(`${URL}/products/getproducts`,
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

export const addProduct = createAsyncThunk("products/addProduct", async (product, thunkAPI) => {
  try {
    const response = await fetch(`${URL}/products/addproduct`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("token")
      },
      body: JSON.stringify(product)
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

export const editProduct = createAsyncThunk("products/editproduct", async ({ id, productToEdit }, thunkAPI) => {
  try {
    const response = await fetch(`${URL}/products/updateproduct/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("token")
      },
      body: JSON.stringify(productToEdit)
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

export const deleteProduct = createAsyncThunk("products/deleteProduct", async (id, thunkAPI) => {
  try {
    const response = await fetch(`${URL}/products/deleteproduct/${id}`, {
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

export const getProductsNames = createAsyncThunk("products/getProductsNames", async (thunkAPI) => {
  try {
    const response = await fetch(`${URL}/products/getproducts`,
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

    const productsNames = [];
    data.forEach((product) => productsNames.push(product.name))
    return productsNames;

  } catch (error) {
    console.error("Error in fetching")
  }
}
)

export const filterProductsNames = createAsyncThunk("products/filterProductsNames", async (value, thunkAPI) => {
  try {
    const response = await fetch(`${URL}/products/getproducts`,
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

    const productsNames = [];
    data.forEach((product) => productsNames.push(product.name))
    return productsNames.filter(productName => productName.toLowerCase().includes(value.toLowerCase()))

  } catch (error) {
    console.error("Error in fetching")
  }
}
)

const initialState = {
  isLoading: false,
  data: new Array,
  error: null,
  successMsg: null
}

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.successMsg = null;
    }),
      builder.addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null
        state.data = action.payload;
        state.successMsg = action.payload.msg;
      }),
      builder.addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.successMsg = null;
      })

    builder.addCase(addProduct.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.successMsg = null;
    }),
      builder.addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.data = action.payload;
        state.successMsg = action.payload.msg;
      }),
      builder.addCase(addProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.successMsg = null;
      })

    builder.addCase(editProduct.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.successMsg = null;
    }),
      builder.addCase(editProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.data = action.payload;
        state.successMsg = action.payload.msg;
      }),
      builder.addCase(editProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.successMsg = null;
      })

    builder.addCase(deleteProduct.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.successMsg = null;
    }),
      builder.addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.data = action.payload;
        state.successMsg = action.payload.msg;
      }),
      builder.addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.successMsg = null;
      })

    builder.addCase(getProductsNames.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.successMsg = null;
    }),
      builder.addCase(getProductsNames.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null
        state.data = action.payload;
        state.successMsg = action.payload.msg;
      }),
      builder.addCase(getProductsNames.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.successMsg = null;
      })

      builder.addCase(filterProductsNames.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMsg = null;
      }),
        builder.addCase(filterProductsNames.fulfilled, (state, action) => {
          state.isLoading = false;
          state.error = null
          state.data = action.payload;
          state.successMsg = action.payload.msg;
        }),
        builder.addCase(filterProductsNames.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
          state.successMsg = null;
        })

  }
})


export default productsSlice.reducer;