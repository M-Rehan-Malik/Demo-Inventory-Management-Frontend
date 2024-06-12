import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import modalReducer from "../features/modal/modalSlice";
import adminReducer from "../features/admin/adminSlice";
import stockReducer from "../features/stock/stockSlice";
import supplyReducer from "../features/supplies/supplySlice";
import saleReducer from "../features/sales/saleSlice";

const store = configureStore({
    reducer: {
        products: productsReducer,
        modal: modalReducer,
        admin: adminReducer,
        stock: stockReducer,
        supply: supplyReducer,
        sale: saleReducer
    }
})

export default store;