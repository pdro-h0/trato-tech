import { configureStore } from "@reduxjs/toolkit";
import { categories } from "./slices/categories";
import { itens } from "./slices/itens";
import { useDispatch, useSelector } from "react-redux";
import { cart } from "./slices/cart";
import { search } from "./slices/search";

export const store = configureStore({
  reducer: {
    categories,
    itens,
    cart,
    search
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector = useSelector.withTypes<RootState>();

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
