import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE = "https://fakestoreapi.com/products";


export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
  const { data } = await axios.get(BASE);
  return data;
});

export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id) => {
    const { data } = await axios.get(`${BASE}/${id}`);
    return data;
  }
);

const initialState = {
  items: [],         
  byId: {},       
  listStatus: "idle",
  detailStatus: "idle",
  error: null,
};

const slice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProduct(state, action) {
      const id = action.payload;
      if (id) delete state.byId[id];
    },
  },
  extraReducers: (b) => {
    b 
      .addCase(fetchProducts.pending, (s) => { s.listStatus = "loading"; s.error = null; })
      .addCase(fetchProducts.fulfilled, (s, a) => { s.listStatus = "succeeded"; s.items = a.payload; })
      .addCase(fetchProducts.rejected, (s, a) => { s.listStatus = "failed"; s.error = a.error?.message || "Failed to load products"; })
      .addCase(fetchProductById.pending, (s) => { s.detailStatus = "loading"; s.error = null; })
      .addCase(fetchProductById.fulfilled, (s, a) => { s.detailStatus = "succeeded"; s.byId[a.payload.id] = a.payload; })
      .addCase(fetchProductById.rejected, (s, a) => { s.detailStatus = "failed"; s.error = a.error?.message || "Failed to load product"; });
  },
});

export const { clearProduct } = slice.actions;

export const selectProducts = (state) => state.products.items;
export const selectListStatus = (state) => state.products.listStatus; 
export const selectError = (state) => state.products.error;
export const selectDetailStatus = (state) => state.products.detailStatus;
export const selectDetailById = (id) => (state) => state.products.byId[id];

export default slice.reducer;
